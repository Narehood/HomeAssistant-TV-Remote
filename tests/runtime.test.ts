import { afterEach, describe, expect, it, vi } from 'vitest';
import { FiremoteCard, FiremoteCardEditor, createAppMap } from '../src/HA-Firemote.js';
import { normalizeConfig, deviceAttribute, freeze, configuredSlots, STYLES } from '../src/runtime/config.js';
import { adbTextCommand, customActionArgs, resolveSource, ServiceExecutor } from '../src/runtime/services.js';
import { resolveAppAction, resolveLaunchMetadata } from '../src/runtime/launch.js';
import { appIsActive } from '../src/runtime/apps.js';
import { Gesture } from '../src/runtime/input.js';
import { translate, direction } from '../src/runtime/locale.js';
import { devices } from '../src/supported-devices.js';

const base = {entity:'media_player.tv',device_family:'amazon-fire',device_type:'fire_tv_4_series'};
const mockService = () => vi.fn(() => Promise.resolve());
function hass(callService = mockService()) {
  return {language:'en',config:{language:'en'},states:{
    'media_player.tv':{state:'on',attributes:{friendly_name:'TV',source_list:['Photos','Music','Search'],app_id:'Home'}},
    'remote.tv':{state:'on',attributes:{friendly_name:'Remote',supported_features:4,current_activity:'Home'}},
  },callService};
}
async function mount(config: Record<string, unknown> = base, environment = hass()) {
  const card = new FiremoteCard();
  card.setConfig(config);
  Reflect.set(card,'hass',environment);
  document.body.append(card);
  await card.updateComplete;
  return {card,service:environment.callService};
}
function pointer(target: EventTarget, type: string, id = 1, primary = true) {
  target.dispatchEvent(new PointerEvent(type,{bubbles:true,composed:true,pointerId:id,button:0,isPrimary:primary}));
}
const flush = async () => { for (let i=0;i<8;i++) await Promise.resolve(); };
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('immutable compatible configuration', () => {
  it('validates identifiers and numeric forms with actionable fields', () => {
    expect(() => normalizeConfig({...base,device_type:'typo'})).toThrow(/device_type/);
    expect(() => normalizeConfig({...base,device_family:'typo'})).toThrow(/device_family/);
    expect(() => normalizeConfig({...base,defaultRemoteStyle_override:'typo'})).toThrow(/defaultRemoteStyle/);
    expect(() => normalizeConfig({...base,scale:'NaN'})).toThrow(/scale/);
    expect(() => normalizeConfig({...base,scale:Infinity})).toThrow(/scale/);
    expect(() => normalizeConfig({...base,button_overrides:{'home-button':{action:'toggle'}}})).toThrow(/home-button/);
    expect(normalizeConfig({...base,scale:'160',app_launcher_relative_size:'0'})).toMatchObject({scale:160,app_launcher_relative_size:0,control_mode:'legacy'});
    expect(normalizeConfig({...base,app_launcher_relative_size:0})).toEqual(normalizeConfig({...base,app_launcher_relative_size:'0'}));
  });
  it('keeps meaningful false and zero overrides and does not freeze caller objects', () => {
    const raw = {...base,tuner_override:false,hdmiInputs_override:0,custom_launchers:{friendly_name:'Scene',action:'scene.turn_on',target:{entity_id:'scene.movie'}}};
    const config = normalizeConfig(raw);
    expect(deviceAttribute('tuner',config)).toBe(false);
    expect(deviceAttribute('hdmiInputs',config)).toBe(0);
    expect(Object.isFrozen(config.custom_launchers[0].target)).toBe(true);
    expect(Object.isFrozen(raw.custom_launchers.target)).toBe(false);
    expect(raw.custom_launchers).not.toBeInstanceOf(Array);
    expect(configuredSlots({...base,app_launch_99:'netflix'})).toBe(99);
  });
  it('has independent derived app maps including exact input capacities', () => {
    const one = createAppMap(normalizeConfig({...base,hdmiInputs_override:1,custom_launchers:{friendly_name:'One',script:'one'}}));
    const two = createAppMap(normalizeConfig({...base,hdmiInputs_override:0,custom_launchers:{friendly_name:'Two',script:'two'}}));
    expect(one.has('hdmi_1')).toBe(true); expect(one.has('hdmi_2')).toBe(false);
    expect(two.has('hdmi_1')).toBe(false); expect(two.has('customlauncher One')).toBe(false);
    expect(one.has('customlauncher Two')).toBe(false);
    expect(() => normalizeConfig({...base,custom_launchers:[{friendly_name:'Same',script:'one'},{friendly_name:'Same',script:'two'}]})).toThrow(/duplicate/);
  });
});

describe('safe launcher content and state recovery', () => {
  it('highlights updated family packages and aliases without stale root identities', async () => {
    const environment = hass(); environment.states['media_player.tv'].attributes.app_id = 'org.smarttube.stable';
    const {card} = await mount({...base,app_launch_1:'smart-tube-next'},environment);
    expect(card.shadowRoot!.getElementById('smart-tube-next-button')!.classList.contains('appActive')).toBe(true);
    expect(card.shadowRoot!.getElementById('smart-tube-next-button')!.getAttribute('aria-pressed')).toBe('true');
    const entry = {androidName:'old.package',roku:{appName:'5',sourceAliases:['My5']},chromecast:{androidName:'new.package',appName:'new.package'}};
    expect(appIsActive(entry,{device_family:'chromecast'},'old.package')).toBe(false);
    expect(appIsActive(entry,{device_family:'chromecast'},'new.package')).toBe(true);
    expect(appIsActive(entry,{device_family:'roku'},'My5')).toBe(true);
    expect(appIsActive(entry,{device_family:'roku'},'5')).toBe(true);
  });
  it('renders configured labels and icon attributes literally through Lit bindings', async () => {
    const label = '<img src=x onerror=alert(1)>';
    const {card} = await mount({...base,app_launch_1:`customlauncher ${label}`,custom_launchers:{friendly_name:label,label,script:'example',icon:'mdi:home" onload="alert(1)',color:'var(--primary-color)'}});
    const button = [...card.shadowRoot!.querySelectorAll('button')].find(node => node.id === `customlauncher ${label}-button`)!;
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-label')).toContain(label);
    expect(button.querySelector('ha-icon')!.getAttribute('icon')).toBe('mdi:home" onload="alert(1)');
    expect(button.querySelector('[onload], [onerror], script')).toBeNull();
    expect(() => normalizeConfig({...base,custom_launchers:{script:'x',image_path:'javascript:alert(1)'}})).toThrow(/image_path/);
    expect(() => normalizeConfig({...base,skin:'red;display:none'})).toThrow(/skin/);
  });
  it('renders input labels as text and hidden launchers as absent controls', async () => {
    const {card} = await mount({...base,hdmi_1:'<img>',app_launch_1:'hdmi_1',app_launch_2:'hidden'});
    expect(card.shadowRoot!.getElementById('hdmi_1-button')!.textContent).toContain('<img>');
    expect(card.shadowRoot!.getElementById('hdmi_1-button')!.querySelector('img')).toBeNull();
    expect(card.shadowRoot!.getElementById('netflix-button')).toBeNull();
    expect(card.shadowRoot!.getElementById('hidden-button')).toBeNull();
  });
  it('recovers a temporarily missing associated state without a registry', async () => {
    const environment = hass();
    const {card} = await mount({...base,device_family:'chromecast',device_type:'chromecast-hd',android_tv_remote_entity:'remote.missing'}, environment);
    expect(card.getOpenAppID()).toBe('Home');
    expect(card.shadowRoot!.querySelector('[role=status]')!.textContent).toContain('remote.missing');
    Reflect.set(card,'hass',{...environment,states:{...environment.states,'remote.missing':{state:'on',attributes:{current_activity:'com.example'}}}});
    await card.updateComplete;
    expect(card.getOpenAppID()).toBe('com.example');
    expect(card.shadowRoot!.querySelector('[role=status]')!.textContent).toBe('');
  });
});

describe('dispatch and service outcomes', () => {
  it.each(['paused', 'playing', undefined])('handles Apple play/pause with entity state %s', async state => {
    const environment = hass();
    const {card,service} = await mount({...base,device_family:'apple-tv',device_type:'appletv-4k-gen2',apple_tv_remote_entity:'remote.tv'}, environment);
    if (state === undefined) Reflect.deleteProperty(environment.states, 'media_player.tv');
    else environment.states['media_player.tv'].state = state;
    expect(() => card._executeAction('playpause-button')).not.toThrow();
    await flush();
    expect(service).toHaveBeenCalledWith('remote','send_command',expect.objectContaining({command:state === 'paused' ? 'play' : 'pause'}),{entity_id:'remote.tv'});
  });

  it.each([false,true])('uses the entity ID in reboot confirmation and honors confirmation %s', async answer => {
    const environment = hass();
    Reflect.deleteProperty(environment.states['media_player.tv'].attributes, 'friendly_name');
    const confirm = vi.fn(() => answer); vi.stubGlobal('confirm',confirm);
    const {card,service} = await mount(base,environment);
    card._executeAction('reboot-button'); await flush();
    expect(confirm).toHaveBeenCalledWith('Are you sure you want to reboot media_player.tv');
    if (answer) expect(service).toHaveBeenCalledWith('androidtv','adb_command',{command:'adb shell reboot'},{entity_id:'media_player.tv'});
    else expect(service).not.toHaveBeenCalled();
  });

  it('preserves whole family routes and honors explicit strategies without root ADB inheritance', () => {
    const environment = hass();
    const entry = {adbLaunchCommand:'ROOT ADB',appName:'Root',chromecast:{appName:'com.example'},'apple-tv':{appName:'Photos'}};
    expect(resolveLaunchMetadata(entry,'chromecast')).toEqual({appName:'com.example'});
    expect(resolveAppAction(entry,{...base,device_family:'chromecast'},environment)).toMatchObject({domain:'media_player',service:'select_source',data:{source:'com.example'}});
    expect(resolveAppAction({...entry,chromecast:{launchStrategy:'package',androidName:'com.fixed'}},{...base,device_family:'chromecast'},environment)).toMatchObject({domain:'media_player',data:{source:'com.fixed'}});
    expect(resolveAppAction({...entry,roku:{launchStrategy:'source',appName:'5',sourceAliases:['My5']}},{...base,device_family:'roku'},environment)).toMatchObject({domain:'media_player',data:{source:'5'}});
    expect(resolveSource('5',{sourceAliases:['My5']},['My5'])).toBe('My5');
    expect(resolveAppAction({...entry,'apple-tv':{launchStrategy:'deep-link',deepLink:'example://play'}},{...base,device_family:'apple-tv'},environment)).toMatchObject({domain:'media_player',service:'play_media',data:{media_content_type:'url',media_content_id:'example://play'}});
  });
  it('routes the Toshiba live button through its intended model match', async () => {
    const {card,service} = await mount({...base,device_type:'fire_tv_toshiba_v35'});
    card._executeAction('live-button'); await flush();
    expect(service).toHaveBeenCalledWith('androidtv','adb_command',{command:'adb shell input keyevent KEYCODE_TV'},{entity_id:'media_player.tv'});
  });
  it('never falls through from unsupported Apple mute into ADB', async () => {
    const {card,service} = await mount({...base,device_family:'apple-tv',device_type:'appletv-4k-gen2',apple_tv_remote_entity:'remote.tv'});
    card._executeAction('mute-button'); await flush();
    expect(service).not.toHaveBeenCalled();
    expect(Reflect.get(card,'_actionMessage')).toMatch(/unsupported/);
  });
  it.each([{action:'scene.turn_on',target:{entity_id:'scene.movie'}},{script:'movie',data:{volume:0}}])('dispatches singleton custom action with -button in its friendly name: %j', async definition => {
    const {card,service} = await mount({...base,custom_launchers:{friendly_name:'My-button scene',...definition}});
    card._executeAction('customlauncher My-button scene-button'); await flush();
    expect(service).toHaveBeenCalledTimes(1);
    expect(service.mock.calls).toEqual(definition.script ? [['script','movie',{volume:0},undefined]] : [['scene','turn_on',{}, {entity_id:'scene.movie'}]]);
  });
  it('preserves action/service/script precedence and targeting collisions explicitly', async () => {
    expect(customActionArgs({script:'script.movie',action:'scene.turn_on',data:{level:0}})).toEqual(['script','movie',{level:0},undefined]);
    const report = vi.fn(); const executor = new ServiceExecutor(report); const environment = hass();
    await executor.call(environment,...customActionArgs({action:'light.turn_on',service:'scene.turn_on',target:{entity_id:'light.old',area_id:'living'},data:{entity_id:'light.new',brightness:0}}));
    expect(environment.callService).toHaveBeenCalledWith('light','turn_on',{brightness:0},{entity_id:'light.new',area_id:'living'});
  });
  it('preserves targeting-named script variables as data', async () => {
    const variables = {entity_id:'a script variable',device_id:0,area_id:'another variable',floor_id:false,label_id:['a','b']};
    const {card,service} = await mount({...base,button_overrides:{'home-button':{script:'movie',data:variables}}});
    card._executeAction('home-button'); await flush();
    expect(service).toHaveBeenCalledWith('script','movie',variables,undefined);
  });
  it('catches rejected promises and does not retry toggles', async () => {
    const service = vi.fn(() => Promise.reject(new Error('offline')));
    const {card} = await mount({...base,button_overrides:{'home-button':{action:'light.toggle',target:{entity_id:'light.tv'}}}},hass(service));
    card._executeAction('home-button'); await flush(); await card.updateComplete;
    expect(service).toHaveBeenCalledTimes(1);
    expect(card.shadowRoot!.querySelector('[role=status]')!.textContent).toContain('light.toggle failed');
  });
  it('uses the restart-button alias and keeps source identities independent of UI locale', async () => {
    const environment = {...hass(),language:'de-DE'};
    environment.states['media_player.tv'].attributes.source_list = ['Fotos','Musik'];
    const {card,service} = await mount({...base,device_family:'apple-tv',device_type:'appletv-4k-gen2',button_overrides:{'restart-button':{script:'restart_tv'}}},environment);
    card._executeAction('reboot-button'); await flush();
    expect(service).toHaveBeenCalledWith('script','restart_tv',{},undefined);
    expect(resolveSource('Photos',{},['Fotos'])).toBe('Fotos');
    expect(resolveSource('Music',{},['Musik'])).toBe('Musik');
    expect(translate(environment,'Photos')).toBe('Fotos');
  });
  it('bounds/coalesces repeat queues and prioritizes release while preserving another target', async () => {
    let complete!: () => void;
    const service = vi.fn(() => new Promise<void>(resolve => { complete = resolve; }));
    const executor = new ServiceExecutor(vi.fn()); const environment = hass(service); const gesture = new Gesture();
    const down = executor.call(environment,'remote','send_command',{command:'down'},{entity_id:'remote.one'},{gesture});
    for (let i=0;i<100;i++) await executor.call(environment,'remote','send_command',{command:'repeat'},{entity_id:'remote.one'},{gesture,repeat:true});
    const up = executor.call(environment,'remote','send_command',{command:'up'},{entity_id:'remote.one'},{gesture,release:true});
    const other = executor.call({...environment,callService:mockService()},'remote','send_command',{command:'other'},{entity_id:'remote.two'});
    await other;
    expect(service).toHaveBeenCalledTimes(1);
    gesture.finish(); complete(); await down; await flush();
    expect(service).toHaveBeenLastCalledWith('remote','send_command',{command:'up'},{entity_id:'remote.one'});
    complete(); await up;
  });
});

describe('pointer/keyboard lifecycle', () => {
  it('cancels keyboard focus departure before the hold threshold without delayed dispatch', async () => {
    const {card,service} = await mount(); vi.useFakeTimers();
    const button = card.shadowRoot!.getElementById('up-button') as HTMLButtonElement;
    button.focus(); button.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    await vi.advanceTimersByTimeAsync(100);
    const outside = document.createElement('button'); document.body.append(outside); outside.focus();
    outside.dispatchEvent(new KeyboardEvent('keyup',{key:'Enter',bubbles:true}));
    await vi.advanceTimersByTimeAsync(1000);
    expect(service).not.toHaveBeenCalled(); expect(vi.getTimerCount()).toBe(0);
  });
  it.each([
    ['fire','focus'],['fire','document keyup'],['roku','focus'],['roku','document keyup'],
  ])('releases %s keyboard holds on %s outside the card', async (family,termination) => {
    const config = family === 'roku' ? {...base,device_family:'roku',device_type:'roku-ultra-2020',roku_remote_entity:'remote.tv'} : base;
    const {card,service} = await mount(config); vi.useFakeTimers();
    const button = card.shadowRoot!.getElementById('up-button') as HTMLButtonElement;
    button.focus(); button.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}));
    await vi.advanceTimersByTimeAsync(800);
    if (termination === 'focus') { const outside = document.createElement('button'); document.body.append(outside); outside.focus(); }
    else document.dispatchEvent(new KeyboardEvent('keyup',{key:' ',bubbles:true}));
    await flush();
    const count = service.mock.calls.length;
    if (family === 'fire') expect((service.mock.calls[service.mock.calls.length - 1] as unknown as [string,string,{command:string}])[2].command).toContain('1 103 0');
    await vi.advanceTimersByTimeAsync(2000);
    expect(service).toHaveBeenCalledTimes(count); expect(vi.getTimerCount()).toBe(0);
  });
  it('activates Enter and Space once, names controls, and blocks hidden controls', async () => {
    const {card,service} = await mount({...base,button_overrides:{'power-button':{hidden:true}}});
    const button = card.shadowRoot!.getElementById('home-button')!;
    expect(button.getAttribute('aria-label')).toBe('Home');
    for (const key of ['Enter',' ']) {
      button.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true}));
      button.dispatchEvent(new KeyboardEvent('keyup',{key,bubbles:true}));
      button.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:0}));
      await flush();
    }
    expect(service).toHaveBeenCalledTimes(2);
    const hidden = card.shadowRoot!.getElementById('power-button') as HTMLButtonElement;
    expect(hidden.tabIndex).toBe(-1); expect(hidden.disabled).toBe(true);
    hidden.dispatchEvent(new MouseEvent('click',{bubbles:true}));
    expect(service).toHaveBeenCalledTimes(2);
  });
  it.each(['pointercancel','lostpointercapture','blur','disconnect','config'])('terminates Roku repeats on %s', async termination => {
    const config = {...base,device_family:'roku',device_type:'roku-ultra-2020',roku_remote_entity:'remote.tv'};
    const {card,service} = await mount(config);
    vi.useFakeTimers();
    const button = card.shadowRoot!.getElementById('up-button')!;
    pointer(button,'pointerdown'); await vi.advanceTimersByTimeAsync(1050);
    expect(service.mock.calls.length).toBeGreaterThan(1);
    if (termination === 'disconnect') card.remove();
    else if (termination === 'config') card.setConfig(config);
    else if (termination === 'blur') window.dispatchEvent(new Event('blur'));
    else pointer(button,termination);
    const count = service.mock.calls.length;
    await vi.advanceTimersByTimeAsync(3000);
    expect(service).toHaveBeenCalledTimes(count);
    expect(vi.getTimerCount()).toBe(0);
  });
  it('pairs a legacy sendevent held key with release on document pointerup', async () => {
    const {card,service} = await mount(); vi.useFakeTimers();
    const button = card.shadowRoot!.getElementById('up-button')!;
    pointer(button,'pointerdown'); await vi.advanceTimersByTimeAsync(501);
    pointer(document,'pointerup'); await flush();
    const calls = service.mock.calls as unknown as [string,string,{command:string}][];
    expect(calls[0][2].command).toContain('1 103 1');
    expect(calls[1][2].command).toContain('1 103 0');
    expect(vi.getTimerCount()).toBe(0);
  });
  it('ignores secondary touches and cancels a tap before hold without dispatch', async () => {
    const {card,service} = await mount(); vi.useFakeTimers();
    const button = card.shadowRoot!.getElementById('up-button')!;
    pointer(button,'pointerdown',2,false); pointer(document,'pointerup',2,false);
    pointer(button,'pointerdown',1); pointer(document,'pointercancel',1);
    await vi.advanceTimersByTimeAsync(1000);
    expect(service).not.toHaveBeenCalled(); expect(vi.getTimerCount()).toBe(0);
  });
  it('does not accumulate gesture listeners over 1,000 interactions and restores hidden controls after edits', async () => {
    const {card,service} = await mount({...base,button_overrides:{'power-button':{hidden:true}}});
    const button = card.shadowRoot!.getElementById('home-button')!;
    const local = vi.spyOn(button,'addEventListener'); const global = vi.spyOn(document,'addEventListener');
    for (let i=0;i<1000;i++) { pointer(button,'pointerdown'); pointer(document,'pointerup'); await flush(); }
    expect(service).toHaveBeenCalledTimes(1000);
    expect(local).not.toHaveBeenCalled(); expect(global).not.toHaveBeenCalled();
    card.setConfig(base); await card.updateComplete;
    const power = card.shadowRoot!.getElementById('power-button') as HTMLButtonElement;
    expect(power.disabled).toBe(false); expect(power.tabIndex).toBe(0); expect(power.style.visibility).toBe('');
  });
});

describe('explicit Android TV Remote transport and safe text', () => {
  const remote = {...base,device_family:'chromecast',device_type:'chromecast-hd',control_mode:'android-tv-remote',android_tv_remote_entity:'remote.tv'};
  it('sends keys, deep links and structured text without ADB', async () => {
    const {card,service} = await mount(remote);
    card._executeAction('up-button'); await flush();
    expect(service).toHaveBeenLastCalledWith('remote','send_command',{command:'DPAD_UP'},{entity_id:'remote.tv'});
    (card.shadowRoot!.getElementById('center-button') as HTMLButtonElement).click(); await flush();
    expect(service).toHaveBeenLastCalledWith('remote','send_command',{command:'DPAD_CENTER'},{entity_id:'remote.tv'});
    card._appmap!.set('test',{friendlyName:'Test',className:'',button:'Test',deviceFamily:['chromecast'],deepLink:'test://example',androidName:'com.example'});
    card._executeAction('test-button'); await flush();
    expect(service).toHaveBeenLastCalledWith('remote','turn_on',{activity:'test://example'},{entity_id:'remote.tv'});
    vi.stubGlobal('prompt',() => 'quotes "$()\ntext');
    card._executeAction('keyboard-button'); await flush();
    expect(service).toHaveBeenLastCalledWith('remote','send_command',{command:'text:quotes "$()\ntext'},{entity_id:'remote.tv'});
    expect((service.mock.calls as unknown as string[][]).some(call => call[0] === 'androidtv')).toBe(false);
  });
  it('gates launch on capabilities and reports unsupported functions without fallback', async () => {
    const environment = hass(); environment.states['remote.tv'].attributes.supported_features = 0;
    const {card,service} = await mount(remote,environment);
    card._executeAction('netflix-button'); card._executeAction('reboot-button'); await flush();
    expect(service).not.toHaveBeenCalled();
    expect(Reflect.get(card,'_actionMessage')).toContain('unsupported');
  });
  it('serializes shell metacharacters as one literal argument and rejects multiline ADB input', () => {
    expect(adbTextCommand('a b"$()`\\; &')).toBe('input text \'a%sb"$()`\\;%s&\'');
    expect(adbTextCommand("Bob's TV")).toBe("input text 'Bob'\\''s%sTV'");
    expect(adbTextCommand('café')).toBe("input text 'café'");
    expect(() => adbTextCommand('line\nnext')).toThrow(/newlines/);
  });
});

describe('pure editor, localization and layout', () => {
  it('opens and focuses a frozen configuration without mutations and emits one deliberate immutable edit', async () => {
    const raw = freeze({...base,device_family:'apple-tv',device_type:'appletv-4k-gen2',apple_tv_remote_entity:'remote.tv',extension:{keep:42}});
    const editor = new FiremoteCardEditor(); editor.setConfig(raw); Reflect.set(editor,'hass',hass());
    const changed = vi.fn(); editor.addEventListener('config-changed',changed); document.body.append(editor); await editor.updateComplete;
    const select = editor.shadowRoot!.getElementById('apple_tv_remote_entity') as HTMLSelectElement;
    expect(select.value).toBe('remote.tv'); select.dispatchEvent(new FocusEvent('focusout',{bubbles:true}));
    expect(changed).not.toHaveBeenCalled();
    const name = editor.shadowRoot!.getElementById('visible_name_text') as HTMLInputElement;
    name.value = 'Living room'; name.dispatchEvent(new Event('change',{bubbles:true})); await editor.updateComplete;
    expect(changed).toHaveBeenCalledTimes(1);
    const event = changed.mock.calls[0][0] as CustomEvent;
    expect(event.detail.config).toMatchObject({extension:{keep:42},apple_tv_remote_entity:'remote.tv',visible_name_text:'Living room'});
    expect(raw).not.toHaveProperty('visible_name_text');
  });
  it('preserves sparse high-index app slots while creating only requested editor controls', async () => {
    const editor = new FiremoteCardEditor();
    editor.setConfig({...base,defaultRemoteStyle_override:'AL2',app_launch_99:'netflix',app_launch_2:''}); Reflect.set(editor,'hass',hass());
    document.body.append(editor); await editor.updateComplete;
    expect(editor.shadowRoot!.querySelectorAll('select[name^=app_launch_]')).toHaveLength(7);
    expect((editor.shadowRoot!.getElementById('app_launch_99') as HTMLSelectElement).value).toBe('netflix');
    (editor.shadowRoot!.querySelector('button') as HTMLButtonElement).click(); await editor.updateComplete;
    expect(editor.shadowRoot!.querySelectorAll('select[name^=app_launch_]')).toHaveLength(8);
    expect(Reflect.get(editor,'_config').app_launch_99).toBe('netflix');
  });
  it('hides VPN utilities in new launcher fields and preserves an explicitly configured VPN', async () => {
    const editor = new FiremoteCardEditor();
    editor.setConfig({...base,defaultRemoteStyle_override:'AL2'}); Reflect.set(editor,'hass',hass());
    document.body.append(editor); await editor.updateComplete;
    expect(editor.shadowRoot!.querySelector('option[value="nordvpn"]')).toBeNull();
    expect(editor.shadowRoot!.querySelector('option[value="adguardvpn"]')).toBeNull();
    editor.setConfig({...base,defaultRemoteStyle_override:'AL2',app_launch_1:'nordvpn'}); await editor.updateComplete;
    const select = editor.shadowRoot!.getElementById('app_launch_1') as HTMLSelectElement;
    expect(select.value).toBe('nordvpn');
    expect(select.selectedOptions[0]!.textContent).toContain('VPN utility; existing configuration');
    expect(editor.shadowRoot!.querySelector('#app_launch_2 option[value="nordvpn"]')).toBeNull();
    const card = await mount({...base,defaultRemoteStyle_override:'AL2',app_launch_1:'nordvpn'});
    (card.card.shadowRoot!.getElementById('nordvpn-button') as HTMLElement).click(); await flush();
    expect(card.service).toHaveBeenCalledWith('androidtv','adb_command',expect.objectContaining({command:expect.stringContaining('com.nordvpn.android')}),{entity_id:'media_player.tv'});
  });
  it('skips unrelated entity updates in both card and editor', async () => {
    const environment = hass(); const {card} = await mount(base,environment);
    const editor = new FiremoteCardEditor(); editor.setConfig(base); Reflect.set(editor,'hass',environment); document.body.append(editor); await editor.updateComplete;
    const cardRender = vi.spyOn(card,'render'); const editorRender = vi.spyOn(editor,'render');
    Reflect.set(card,'hass',{...environment,states:{...environment.states,'sensor.weather':{state:'sunny',attributes:{}}}});
    Reflect.set(editor,'hass',{...environment,states:{...environment.states,'sensor.weather':{state:'sunny',attributes:{}}}});
    await card.updateComplete; await editor.updateComplete;
    expect(cardRender).not.toHaveBeenCalled(); expect(editorRender).not.toHaveBeenCalled();
  });
  it('normalizes locales using user language and base/English fallback', () => {
    expect(translate({language:'pt-PT',config:{language:'de'}},'Scale')).toBe('Escala');
    expect(translate({language:'pt-BR'},'Keyboard')).toBe('Teclado');
    expect(translate({language:'de-DE'},'Photos')).toBe('Fotos');
    expect(translate({language:'zz-ZZ'},'Scale')).toBe('Scale');
    expect(direction({language:'ar-EG'})).toBe('rtl');
  });
  it('returns Sections and masonry sizes for every style and reserves additional launcher rows', async () => {
    const {card} = await mount();
    for (const style of STYLES) {
      card.setConfig({...base,defaultRemoteStyle_override:style});
      expect(card.getCardSize()).toBeGreaterThan(0); expect(card.getGridOptions().rows).toBeGreaterThan(0);
      expect(card.getGridOptions()).not.toHaveProperty('grid_rows');
    }
    card.setConfig({...base,defaultRemoteStyle_override:'AL2'}); const small = card.getCardSize();
    card.setConfig({...base,defaultRemoteStyle_override:'AL2',app_launch_50:'netflix'}); expect(card.getCardSize()).toBeGreaterThan(small);
  });
  it('renders Homatics with its declared capacity', async () => {
    const family = devices.homatics;
    const model = Object.values(family).flatMap(group => Object.entries(group)).find(([,entry]) => typeof entry === 'object' && entry.defaultRemoteStyle === 'HO1')?.[0];
    expect(model).toBeDefined();
    const {card} = await mount({...base,device_family:'homatics',device_type:model});
    expect(card.shadowRoot!.querySelectorAll('.srcButton').length).toBeLessThanOrEqual(6);
  });
  it('renders and reserves additional physical launcher rows', async () => {
    const {card} = await mount(); const original = card.getCardSize(); const rows = card.getGridOptions().rows;
    const launchers = Object.fromEntries(Array.from({length:12},(_,index) => [`app_launch_${index + 1}`,'youtube']));
    card.setConfig({...base,...launchers}); await card.updateComplete;
    expect(card.shadowRoot!.querySelectorAll('.srcButton')).toHaveLength(12);
    expect(card.getCardSize()).toBeGreaterThan(original); expect(card.getGridOptions().rows).toBeGreaterThan(rows);
  });
  it('uses actual rendered bounds and modern 56px rows with 8px gaps after rendering', async () => {
    const {card} = await mount();
    const body = card.shadowRoot!.querySelector('ha-card')!;
    vi.spyOn(body,'getBoundingClientRect').mockReturnValue(DOMRect.fromRect({width:210,height:848}));
    expect(card.getCardSize()).toBe(17);
    expect(card.getGridOptions()).toMatchObject({rows:14,columns:3});
    card.setConfig({...base,defaultRemoteStyle_override:'AL1'});
    expect(card.getCardSize()).not.toBe(17); // stale DOM from the previous config is ignored
  });
});
