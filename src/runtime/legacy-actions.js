import {Gesture} from './input.js';
import {deviceAttribute as deviceAttributeQuery} from './config.js';
import {customActionArgs,adbTextCommand,resolveSource} from './services.js';
import {fireEvent} from './events.js';
import {androidRemoteAction} from './android-remote.js';
import {resolveAppAction} from './launch.js';

// Device event mappings are retained from Firemote; gesture/service lifecycles are shared.
export function executeAction(buttonID, actionType = 'click', gesture = new Gesture()) {
    buttonID = buttonID === 'restart-button' ? 'reboot-button' : buttonID;
    if (this._config.button_overrides?.[buttonID]?.hidden || gesture.cancelled) return;
    if (!gesture.repeating) this.reportAction('');
    const _config = this._config;
    const call = (domain, service, data, target) => this._executor.call(this.hass, domain, service, data, target, {gesture, repeat: gesture.repeating, release: gesture.releasing,extractLegacyTargets:true});
    const callCustom = (domain, service, data, target) => this._executor.call(this.hass, domain, service, data, target, {gesture,repeat:gesture.repeating,release:gesture.releasing});
    const _hass = {states: this.hass.states, callService: call};
    const deviceType = _config.device_type;
    const deviceFamily = _config.device_family;
    const entity = _config.entity;
    const compatibility_mode = _config.compatibility_mode || 'default';
    const atvRemoteEntity = _config.android_tv_remote_entity;
    const rokuRemoteEntity = _config.roku_remote_entity;
    const activityLight = this.renderRoot?.querySelector('.activityLight');
    const appmap = this._appmap;
    const that = this;
    // Function for buttons that need overrides because HA integration support is lacking
    function unsupportedButton(){
      that.reportAction(`${buttonID} is unsupported. Configure a button override: https://github.com/Narehood/HomeAssistant-TV-Remote#button-overrides`);
      return;
    }

    // Check for user set Associated Android TV Remote Integration entity
    var hasATVAssociation = true;
    if(atvRemoteEntity == '' || typeof atvRemoteEntity == 'undefined' || deviceFamily == 'amazon-fire' ) {
        hasATVAssociation = false;
    }

    // Choose event listener path for client android device
    var eventListenerBinPath = '';
    if(compatibility_mode == 'default' || compatibility_mode == 'strong' || compatibility_mode == '') {
        eventListenerBinPath = deviceAttributeQuery("defaultEventListenerBinPath", this._config) ?? 'undefined';
    }
    else {
        var eventListenerBinPath = '/dev/input/'+compatibility_mode;
    }

    const override = _config.button_overrides?.[buttonID];
    const appkey = buttonID.replace(/-button$/, '');
    const launcher = appmap.get(appkey);
    const custom = override || launcher?.custom;
    if (custom) {
      const definition = actionType === 'hold' ? custom.hold_action || (custom.repeat ? custom : undefined) : custom;
      if (definition && (definition.script || definition.action || definition.service)) {
        fireEvent(this, 'haptic', 'light');
        callCustom(...customActionArgs(definition));
        if (actionType === 'hold' && custom.repeat) gesture.setInterval(() => callCustom(...customActionArgs(definition)), custom.repeat === true ? 250 : Number(custom.repeat));
      }
      return;
    }
    if (launcher) {
      if (actionType !== 'click') return;
      if (entity === 'none') { unsupportedButton(); return; }
      fireEvent(this, 'haptic', 'light');
      const resolved = resolveAppAction(launcher,_config,this.hass);
      if (resolved.unsupported) { this.reportAction(resolved.unsupported); return; }
      if (resolved.domain === 'androidtv' && resolved.data.command === 'adb shell reboot' && !confirm(`Reboot ${_hass.states[entity]?.attributes?.friendly_name || entity}?`)) return;
      call(resolved.domain,resolved.service,resolved.data,resolved.target); return;
    }
    if (_config.control_mode === 'android-tv-remote') {
      fireEvent(this, 'haptic', 'light');
      androidRemoteAction(this, buttonID, actionType, gesture, call); return;
    }
    // Catch-all for none/other configurations where a button hasn't been defined in YAML config
    if(_config.entity === 'none') {
        unsupportedButton();
        return;
    }


        // Flash activity light if it exists
        if (activityLight) {
          activityLight.style.opacity = '1';
          clearTimeout(that._activityTimer);
          that._activityTimer = setTimeout(function() {activityLight.style.opacity = '0'}, 100);
        }

        // provide haptic feedback for button press
        fireEvent(that, 'haptic', 'light')



        // Power Button Click
        if(buttonID == 'power-button' && actionType == 'click') {
          const state = _hass.states[entity];
          const stateStr = state ? state.state : 'off';
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            if(stateStr != 'off' && stateStr != 'unavailable' && stateStr != 'standby') {
              _hass.callService("media_player", "turn_off", { entity_id: entity});
            }
            else {
              _hass.callService("media_player", "turn_on", { entity_id: entity});
            }
              return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_POWER' });
          }
          else if (compatibility_mode == 'strong' && eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'POWER' });
          }
          else if(compatibility_mode == 'strong') {
            _hass.callService("media_player", "toggle", { entity_id: entity});
          }
          else if(deviceType == 'fire_stick_4k'   || deviceType == 'fire_tv_stick_4k_max' ||
                  deviceType == 'fire_tv_3rd_gen' || deviceType =='fire_stick_second_gen' ||
                  deviceType == 'fire_tv_stick_4k_second_gen' ) {
            if(stateStr != 'off' && stateStr != 'unavailable') {
              _hass.callService("media_player", "turn_off", { entity_id: entity});
            }
            else {
              _hass.callService("media_player", "turn_on", { entity_id: entity});
            }
          }
          else if (deviceType == 'fire_tv_cube_third_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 116 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 116 0 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent /dev/input/event2 1 9 1 && sendevent /dev/input/event2 0 0 0 && sendevent /dev/input/event2 1 9 0 && sendevent /dev/input/event2 0 0 0' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'POWER' });
          }
          return;
        }
        // Power Button Hold
        if(buttonID == 'power-button' && actionType == 'hold') {
          if(['amazon-fire', 'apple-tv', 'chromecast', 'nvidia-shield', 'onn', 'roku'].includes(deviceFamily)) {
            return;
          }
          if(deviceFamily == 'xiaomi'){
            if(hasATVAssociation) {
              _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_POWER', num_repeats: 1, delay_secs: 0, hold_secs: 0.75 });
            }
            else {
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent --longpress POWER'});
            }
            return;
          }
        }



        // Account Button (Google TV) Click
        if(buttonID == 'profile-button' && actionType == 'click') {
          _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent KEYCODE_PROFILE_SWITCH' });
          return;
        };
        // Account Button (Google TV) Hold
        if(buttonID == 'profile-button' && actionType == 'hold') {
          // no special behaviors found for this yet
          return;
        }



        // Magic Button / Star Button (Google TV / onn pro) Click
        if(buttonID == 'magic-star-button' && actionType == 'click') {
          if (deviceType == 'onn-streaming-device-4k-pro') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent 313' });
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        };
        // Magic Button / Star Button (Google TV / onn pro) Hold
        if(buttonID == 'magic-star-button' && actionType == 'hold') {
          if (deviceType == 'onn-streaming-device-4k-pro') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent --longpress 313' });
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        };



        // Keyboard button click
        if(buttonID == 'keyboard-button' && actionType == 'click') {
          if(['apple-tv'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          var text = prompt("Enter text to send");
          if (text && text != '') {
            if(['roku'].includes(deviceFamily)) {
              _hass.callService("remote", "send_command", { entity_id: rokuRemoteEntity, command: 'Lit_'+text, num_repeats: 1, delay_secs: 0, hold_secs: 0});
            }
            else {
              if (hasATVAssociation) call('remote','send_command',{command:`text:${text}`},{entity_id:atvRemoteEntity});
              else { try { call('androidtv','adb_command',{command:adbTextCommand(text)},{entity_id:entity}); } catch (error) { that.reportAction(error.message); } }
            }
          }
          return;
        };
        // Keyboard button hold
        if(buttonID == 'keyboard-button' && actionType == 'hold') {
          // no special behaviors dreamed up for this yet
          return;
        }



        // Up Button click
        if(buttonID == 'up-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_UP' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'UP' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 103 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 103 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Up Button hold
        if(buttonID == 'up-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // needs to be at least 1sec hold time for Apple TV
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'up', num_repeats: 1, delay_secs: 0, hold_secs: 1});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'up', num_repeats: 1, delay_secs: 0, hold_secs: 1});
                  }, 1025);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 1/4 sec repeat is an ok substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_UP', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_UP', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
                  }, 525);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'UP' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'UP' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 103 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 103 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Left Button Click
        if(buttonID == 'left-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'left', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_LEFT' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'LEFT' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 105 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 105 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Left Button Hold
        if(buttonID == 'left-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // needs to be at least 1sec hold time for Apple TV
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'left', num_repeats: 1, delay_secs: 0, hold_secs: 1});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'left', num_repeats: 1, delay_secs: 0, hold_secs: 1});
                  }, 1025);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 1/4 sec repeat is an ok substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'left', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'left', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_LEFT', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_LEFT', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
                  }, 525);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'LEFT' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'LEFT' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 105 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 105 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Right Button Click
        if(buttonID == 'right-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'right', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_RIGHT' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'RIGHT' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 106 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 106 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Right Button Hold
        if(buttonID == 'right-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // needs to be at least 1sec hold time for Apple TV
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'right', num_repeats: 1, delay_secs: 0, hold_secs: 1});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'right', num_repeats: 1, delay_secs: 0, hold_secs: 1});
                  }, 1025);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 1/4 sec repeat is an ok substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'right', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'right', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_RIGHT', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_RIGHT', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
                  }, 525);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'RIGHT' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'RIGHT' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 106 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 106 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Down Button Click
        if(buttonID == 'down-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_DOWN' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'DOWN' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 108 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 108 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Down Button Hold
        if(buttonID == 'down-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // needs to be at least 1sec hold time for Apple TV
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'down', num_repeats: 1, delay_secs: 0, hold_secs: 1});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'down', num_repeats: 1, delay_secs: 0, hold_secs: 1});
                  }, 1025);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 1/4 sec repeat is an ok substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_DOWN', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_DOWN', num_repeats: 1, delay_secs: 0, hold_secs: 0.5});
                  }, 525);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'DOWN' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'DOWN' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 108 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 108 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Center Button Click
        if(buttonID == 'center-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'select', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_CENTER' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'CENTER' });
          }
          else {
            if(deviceType == 'fire_tv_4_series' || deviceType == 'fire_tv_toshiba_v35' || deviceType == 'fire_tv_jvc-4k-2021') {
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 28 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 28 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
            else if(deviceType == 'mi-box-s') {
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 353 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 353 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
            else {
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 96 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 96 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
          }
          return;
        }
        // Center Button Hold
        if(buttonID == 'center-button' && actionType == 'hold') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            // This strategy does not work with Roku - https://github.com/home-assistant/core/issues/123999
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'select', num_repeats: 1, delay_secs: 0, hold_secs: 1});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_DPAD_CENTER', num_repeats: 1, delay_secs: 0, hold_secs: 0.75 });
            return;
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            // This adb shell input keyevent --longpress 23 strategy does not seem to work with the NVIDIA Shield, onn. or Chromecast through ADB
            // need to rapidfire the center button like we do the other dpad buttons
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent 23' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'adb shell input keyevent 23' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            if(deviceType == 'fire_tv_4_series' || deviceType == 'fire_tv_toshiba_v35' || deviceType == 'fire_tv_jvc-4k-2021') {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 28 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 28 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            else if(deviceType == 'mi-box-s') {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 353 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 353 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            else {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 96 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 96 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
          }
          return;
        }



        // Replay Button Click
        if(buttonID == 'replay-button' && actionType == 'click') {
          if(['roku'].includes(deviceFamily)) {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'replay', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        }
        // Replay Button Hold
        if(buttonID == 'replay-button' && actionType == 'hold') {
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 1/4 sec repeat is an ok substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'replay', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'replay', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          return;
        }



        // Options Button Click
        if(buttonID == 'options-button' && actionType == 'click') {
          if(['roku'].includes(deviceFamily)) {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'info', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
        }
        // Options Button Hold
        if(buttonID == 'options-button' && actionType == 'hold') {
          // no special behaviors found for this yet
          return;
        }



        // Apps Button Click
        if(buttonID == 'apps-button' && actionType == 'click') {
          if (deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start -n com.google.android.tvlauncher/.appsview.AppsViewActivity' });
          }
          else if (deviceFamily == 'nvidia-shield') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_APP_SWITCH' });
          }
          else if (deviceFamily == 'amazon-fire') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'am start -n com.amazon.venezia/com.amazon.venezia.grid.AppsGridLauncherActivity' });
          }
          else if (deviceFamily == 'onn') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_ALL_APPS' });
          }
          else if (deviceFamily == 'roku') {
            unsupportedButton();
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'RECENTS' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 757 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 757 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Apps Button Hold
        if(buttonID == 'apps-button' && actionType == 'hold') {
          // no special behaviors found for this yet
          return;
        }



        // Back Button Click
        if(buttonID == 'back-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'menu', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'back', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_BACK' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'BACK' });
          }
          return;
        }
        // Back Button Hold
        if(buttonID == 'back-button' && actionType == 'hold') {
          // no special behaviors found for this with Chromecast, FireTV, onn., NVIDIA Shield, Roku, or Xiaomi mi
          if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'home', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          return;
        }



        // Home Button Click
        if(buttonID == 'home-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'top_menu', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'home', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_HOME' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'HOME' });
          }
          return;
        }
        // Home Button Hold
        if(buttonID == 'home-button' && actionType == 'hold') {
          // no special behavior noticed for Roku
          if(deviceFamily == 'amazon-fire') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent SETTINGS' });
          }
          else if(['chromecast', 'onn'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 83' });
          }
          else if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'home', num_repeats: 1, delay_secs: 0, hold_secs: 1});
          }
          else if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_HOME', num_repeats: 1, delay_secs: 0, hold_secs: 0.75});
          }
          else if(['nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_ALL_APPS' });
          }
          return;
        }



        // Hamburger Button Click
        if(buttonID == 'hamburger-button' && actionType == 'click') {
          if(['apple-tv', 'roku', 'onn'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if(deviceType == 'shield-tv-pro-2019' || deviceType == 'shield-tv-2019') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'am start -a android.settings.SETTINGS' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'MENU' });
          }
          else if(['xiaomi'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start -n com.android.tv.settings/com.android.tv.settings.MainSettings' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 139 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 139 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Hamburger Button Hold
        if(buttonID == 'hamburger-button' && actionType == 'hold') {
          // no special behaviors found for this with FireTV, or NVIDIA Shield
          // the hamburger button for Xiaomi isn't actually real
          return;
        }



        // Rewind Button Click
        if(buttonID == 'rewind-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'skip_backward', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'reverse', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_MEDIA_REWIND' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined' || deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'REWIND' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 168 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 168 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Rewind Button Hold
        if(buttonID == 'rewind-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // n/a for Apple TV (assuming rewind translates to skip_backward)
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 0.15 sec repeat is an ok-ish substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'reverse', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'reverse', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 150);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_MEDIA_REWIND', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_MEDIA_REWIND', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 100);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'REWIND' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'REWIND' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 168 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 168 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Play/Pause Button Click
        if(buttonID == 'playpause-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            var playpausecommand = 'pause';
            if(_hass.states[_config.entity]?.state=='paused'){ playpausecommand = 'play'; };
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: playpausecommand, num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'play', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_MEDIA_PLAY_PAUSE' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined' || deviceType == 'mi-box-s') {
            _hass.callService("media_player", "media_play_pause", { entity_id: _config.entity});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 164 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 164 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Play/Pause Button Hold
        if(buttonID == 'playpause-button' && actionType == 'hold') {
          // Button does not exist for apple tv, chromecast, onn., or xiaomi - so no hold behaviors are emulated
          // No special behaviors noticed for this with FireTV, NVIDIA Shield, or Roku
          return;
        }



        // Fast Forward Button Click
        if(buttonID == 'fastforward-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'skip_forward', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'forward', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_MEDIA_FAST_FORWARD' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined' || deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'FAST_FORWARD' });
          }
          else {
            if(deviceType == 'fire_tv_4_series' || deviceType == 'fire_tv_toshiba_v35' || deviceType == 'fire_tv_jvc-4k-2021') {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 159 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 159 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
            else {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 208 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 208 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
          }
          return;
        }
        // Fast Forward Button Hold
        if(buttonID == 'fastforward-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            // n/a for Apple TV (assuming fast forward translates to skip_forward)
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            // hold does not work with Roku - https://github.com/home-assistant/core/issues/123999 - using a 0.15 sec repeat is an ok-ish substitute for now
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'forward', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'forward', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 150);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_MEDIA_FAST_FORWARD', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("remote", "send_command", { entity_id: atvRemoteEntity, command: 'KEYCODE_MEDIA_FAST_FORWARD', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 100);
            function rls() {
              clearInterval(rpt);
            }
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'FAST_FORWARD' });
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
                    _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'FAST_FORWARD' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
          }
          else {
            if(deviceType == 'fire_tv_4_series' || deviceType == 'fire_tv_toshiba_v35' || deviceType == 'fire_tv_jvc-4k-2021') {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 159 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 159 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            else {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 208 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 208 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            return;
          }
        }



        // Volume Up Button Click
        if(buttonID == 'volume-up-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'volume_up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_VOLUME_UP' });
          }
          else if(deviceFamily == 'nvidia-shield') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell cmd media_session volume --show --adj raise' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'VOLUME_UP' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 115 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 115 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Volume Up Button Hold
        if(buttonID == 'volume-up-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'volume_up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'volume_up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_VOLUME_UP' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else if(deviceFamily == 'nvidia-shield') {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell cmd media_session volume --show --adj raise' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'VOLUME_UP' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 115 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 115 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Volume Down Button Click
        if(buttonID == 'volume-down-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            var t = deviceFamily+"_remote_entity";
            var confname = t.replace(/\-/, "_");
            _hass.callService("remote", "send_command", { entity_id: _config[confname], command: 'volume_down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_VOLUME_DOWN' });
          }
          else if(deviceFamily == 'nvidia-shield') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell cmd media_session volume --show --adj lower' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'VOLUME_DOWN' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 114 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 114 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Volume Down Button Hold
        if(buttonID == 'volume-down-button' && actionType == 'hold') {
          if(['apple-tv'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.apple_tv_remote_entity, command: 'volume_down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'volume_down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          if(hasATVAssociation) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_VOLUME_DOWN' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else if(deviceFamily == 'nvidia-shield') {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell cmd media_session volume --show --adj lower' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'VOLUME_DOWN' });
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else {
            gesture.onRelease(rls);
            _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 114 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
            function rls() {

              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 114 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
            }
          }
          return;
        }



        // Mute Button Click
        if(buttonID == 'mute-button' && actionType == 'click') {
          if(deviceFamily == 'apple-tv') {
            unsupportedButton(); return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'volume_mute', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if(hasATVAssociation) {
            _hass.callService("remote", "send_command", { entity_id: _config.android_tv_remote_entity, command: 'KEYCODE_VOLUME_MUTE' });
          }
          else if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'MUTE' });
          }
          else if (deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 164'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 113 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 113 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Mute Button Hold
        if(buttonID == 'mute-button' && actionType == 'hold') {
          // Button does not exist for chromecast, NVIDIA Shield, or xiaomi - so no hold behaviors are emulated
          // No special behaviors noticed for this with Apple TV, FireTV, onn., or Roku
          return;
        }



        // Channel Up Button Click
        if(buttonID == 'channel-up-button' && actionType == 'click') {
          if(['apple-tv', 'chromecast', 'nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'channel_up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if (['homatics'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_UP'});
            return;
          }
          if (['fire_tv_stick_4k_second_gen', 'fire_tv_stick_4k_max_second_gen', 'onn-streaming-device-4k-pro', 'onn-4k-streaming-box', 'onn-full-hd-streaming-stick'].includes(deviceType)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_UP'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 402 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 402 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Channel Up Button Hold
        if(buttonID == 'channel-up-button' && actionType == 'hold') {
          // No special behaviors noticed for this with onn.
          // Button does not exist for Apple TV, Chromecast, Homatics, NVIDIA Shield, or Xiaomi - so no hold behaviors are emulated
          if(['onn', 'apple-tv', 'chromecast', 'homatics', 'nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'channel_up', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else {
            if (['fire_tv_stick_4k_second_gen', 'fire_tv_stick_4k_max_second_gen'].includes(deviceType)) {
              gesture.onRelease(rls);
              let rpt = gesture.setInterval( function() {
                _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_UP'});
                    }, 250);
              function rls() {
                clearInterval(rpt);
              }
              return;
            }
            else {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 402 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 402 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            return;
          }
        }



        // Channel Down Button Click
        if(buttonID == 'channel-down-button' && actionType == 'click') {
          if(['apple-tv', 'chromecast', 'nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'channel_down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          if (['homatics'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_DOWN'});
            return;
          }
          if (['fire_tv_stick_4k_second_gen', 'fire_tv_stick_4k_max_second_gen', 'onn-streaming-device-4k-pro', 'onn-4k-streaming-box', 'onn-full-hd-streaming-stick'].includes(deviceType)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_DOWN'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 403 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 403 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Channel Down Button Hold
        if(buttonID == 'channel-down-button' && actionType == 'hold') {
          // No special behaviors noticed for this with onn.
          // Button does not exist for Apple TV, Chromecast, NVIDIA Shield, or Xiaomi - so no hold behaviors are emulated
          if(['onn', 'apple-tv', 'chromecast', 'homatics', 'nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
            return;
          }
          if(['roku'].includes(deviceFamily)) {
            gesture.onRelease(rls);
            let rpt = gesture.setInterval( function() {
              _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'channel_down', num_repeats: 1, delay_secs: 0, hold_secs: 0});
                  }, 250);
            function rls() {
              clearInterval(rpt);
            }
            return;
          }
          else {
            if (['fire_tv_stick_4k_second_gen', 'fire_tv_stick_4k_max_second_gen'].includes(deviceType)) {
              gesture.onRelease(rls);
              let rpt = gesture.setInterval( function() {
                _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_CHANNEL_DOWN'});
                    }, 250);
              function rls() {
                clearInterval(rpt);
              }
              return;
            }
            else {
              gesture.onRelease(rls);
              _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 403 1 && sendevent '+eventListenerBinPath+' 0 0 0' });
              function rls() {

                _hass.callService("androidtv", "adb_command", { entity_id: entity, command: 'sendevent '+eventListenerBinPath+' 1 403 0 && sendevent '+eventListenerBinPath+' 0 0 0 '});
              }
            }
            return;
          }
        }



        // TV Button Click
        if(buttonID == 'tv-button' && actionType == 'click') {
          if(['apple-tv', 'roku', 'nvidia-shield'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if (deviceType == 'fire_tv_cube_third_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 297'});
          }
          else if (deviceType == 'fire_tv_stick_4k_second_gen' || deviceType == 'fire_tv_stick_4k_max_second_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 300'});
          }
          else if (deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start -n com.google.android.tv/com.android.tv.MainActivity' });
          }
          else if (['onn', 'homatics'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_GUIDE'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 362 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 362 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // TV Button Button Hold
        if(buttonID == 'tv-button' && actionType == 'hold') {
          // no special behaviors found for this
          return;
        }



        // Settings Button Click
        if(buttonID == 'settings-button' && actionType == 'click') {
          if(['roku', 'nvidia-shield'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if (['onn'].includes(deviceFamily)) {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 83' });
          }
          else if(compatibility_mode == 'strong'  || eventListenerBinPath == 'undefined' || deviceType == 'fire_tv_cube_third_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'SETTINGS' });
          }
          else if(deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start -n com.android.tv.settings/com.android.tv.settings.MainSettings' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 249 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 249 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Settings Button Button Hold
        if(buttonID == 'settings-button' && actionType == 'hold') {
          // no special behaviors found for this
          return;
        }



        // App Switch (recents) Button
        if(buttonID == 'app-switch-button' && actionType == 'click') {
          if(compatibility_mode == 'strong') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'RECENTS' });
          }
          else if (deviceType == 'fire_tv_stick_4k_second_gen' || deviceType == 'fire_tv_stick_4k_max_second_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 307'});
          }
          else if(eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'RECENTS' });
          }
          else if (deviceType == 'fire_tv_cube_third_gen') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 304'});
          }
          else if (deviceType == 'mi-box-s') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_APP_SWITCH' });
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 757 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 757 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // App Switch (recents) Button Hold
        if(buttonID == 'app-switch-button' && actionType == 'hold') {
          // no special behaviors found for this
          return;
        }



        // Headset Button Click
        if(buttonID == 'headset-button' && actionType == 'click') {
          if (['amazon-fire'].includes(deviceFamily)) {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent BUTTON_3'});
          }
          else if (['onn'].includes(deviceFamily)) {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_PAIRING'});
          }
          else if (['chromecast', 'nvidia-shield', 'xiaomi'].includes(deviceFamily)) {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start -n com.android.tv.settings/com.android.tv.settings.accessories.AddAccessoryActivity'});
          }
          else {
            unsupportedButton();
            return;
          }
          return;
        }
        // Headset Button Hold
        if(buttonID == 'headset-button' && actionType == 'hold') {
          // no special behaviors found for this
          return;
        }



        // Programmable 1 Button Click
        if(buttonID == 'programmable-one-button' && actionType == 'click') {
          if(['amazon-fire'].includes(deviceFamily)) {
            if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent BUTTON_1'});
            }
            else {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 638 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 638 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
            }
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        }
        // Programmable 1 Button Hold
        if(buttonID == 'programmable-one-button' && actionType == 'hold') {
          if(['amazon-fire'].includes(deviceFamily)) {
            if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
              //TODO: - (spent too much time here already)
            }
            else {
              //_hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 638 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sleep 1 && sendevent '+eventListenerBinPath+' 1 638 0 && sendevent '+eventListenerBinPath+' 0 0 0' }); // TODO: sleep does not work as expected? (spent too much time here already)
            }
            return;
          }
        }



        // Programmable 2 Button Click
        if(buttonID == 'programmable-two-button' && actionType == 'click') {
          if(['amazon-fire'].includes(deviceFamily)) {
            if(compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent BUTTON_2'}); // this is wrong for fire_tv_4_series
            }
            else {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 4 4 787071 && sendevent '+eventListenerBinPath+' 1 639 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 4 4 787071 && sendevent '+eventListenerBinPath+' 1 639 0 && sendevent '+eventListenerBinPath+' 0 0 0' }); // wrong w/event0 on ftv 4
            }
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        }
        // Programmable 2 Button Hold
        if(buttonID == 'programmable-two-button' && actionType == 'hold') {
          // TODO - (spent too much time here already)
          return;
        }



        // Info Button Click
        if(buttonID == 'info-button' && actionType == 'click') {
          if(!(['homatics'].includes(deviceFamily))) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 165'});
          }
          return;
        }
        // Info Button Click
        if(buttonID == 'info-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }


        // Bookmark Button Click
        if(buttonID == 'bookmark-button' && actionType == 'click') {
          if(!(['homatics'].includes(deviceFamily))) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_BOOKMARK'});
          }
          return;
        }
        // Bookmark Button Click
        if(buttonID == 'bookmark-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }


        // Numeric 1 Button Click
        if(buttonID == 'num1-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 8'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 2 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 2 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 1 Button Hold
        if(buttonID == 'num1-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 2 Button Click
        if(buttonID == 'num2-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 9'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 3 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 3 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 2 Button Hold
        if(buttonID == 'num2-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 3 Button Click
        if(buttonID == 'num3-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 10'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 4 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 4 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 3 Button Hold
        if(buttonID == 'num3-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 4 Button Click
        if(buttonID == 'num4-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 11'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 5 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 5 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 4 Button Hold
        if(buttonID == 'num4-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 5 Button Click
        if(buttonID == 'num5-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 12'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 6 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 6 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 5 Button Hold
        if(buttonID == 'num5-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 6 Button Click
        if(buttonID == 'num6-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 13'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 7 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 7 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 6 Button Hold
        if(buttonID == 'num6-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 7 Button Click
        if(buttonID == 'num7-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 14'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 8 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 8 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 7 Button Hold
        if(buttonID == 'num7-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 8 Button Click
        if(buttonID == 'num8-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 15'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 9 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 9 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 8 Button Hold
        if(buttonID == 'num8-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 9 Button Click
        if(buttonID == 'num9-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 16'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 10 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 10 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 9 Button Hold
        if(buttonID == 'num9-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Numeric 0 Button Click
        if(buttonID == 'num0-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 7'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 11 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 11 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // Numeric 0 Button Hold
        if(buttonID == 'num0-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // SUBT Button Click
        if(buttonID == 'subtitle-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else if (compatibility_mode == 'strong' || eventListenerBinPath == 'undefined') {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 175'});
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+eventListenerBinPath+' 1 469 1 && sendevent '+eventListenerBinPath+' 0 0 0 && sendevent '+eventListenerBinPath+' 1 469 0 && sendevent '+eventListenerBinPath+' 0 0 0' });
          }
          return;
        }
        // SUBT Button Hold
        if(buttonID == 'subtitle-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // LIVE Button Click
        if(buttonID == 'live-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            if(deviceType == 'fire_tv_jvc-4k-2021') {
              var tempbinpath = '/dev/input/event4'
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'sendevent '+tempbinpath+' 1 358 1 && sendevent '+tempbinpath+' 0 0 0 && sendevent '+tempbinpath+' 1 358 0 && sendevent '+tempbinpath+' 0 0 0' });
            }
            else if (['fire_tv_4_series', 'fire_tv_toshiba_v35'].includes(deviceType)) {
               _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent KEYCODE_TV'});
            }
            else {
              unsupportedButton();
            }
          }
          return;
        }
        // LIVE Button Hold
        if(buttonID == 'live-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Red Button Click
        if(buttonID == 'red-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 183'});
          }
          return;
        }
        // Red Button Hold
        if(buttonID == 'red-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Green Button Click
        if(buttonID == 'green-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 184'});
          }
          return;
        }
        // Green Button Hold
        if(buttonID == 'green-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Yellow Button Click
        if(buttonID == 'yellow-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 185'});
          }
          return;
        }
        // Yellow Button Hold
        if(buttonID == 'yellow-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Blue Button Click
        if(buttonID == 'blue-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 186'});
          }
          return;
        }
        // Blue Button Hold
        if(buttonID == 'blue-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Voice Button Click
        if(buttonID == 'voice-button' && actionType == 'click') {
            unsupportedButton();
            return;
        }
        // Voice Button Hold
        if(buttonID == 'voice-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Sleep Button Click
        if(buttonID == 'sleep-button' && actionType == 'click') {
          if(deviceFamily == 'roku') {
            _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: 'sleep', num_repeats: 1, delay_secs: 0, hold_secs: 0});
            return;
          }
          else {
            unsupportedButton();
            return;
          }
        }
        // Sleep Button Hold
        if(buttonID == 'sleep-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // PatchWall Button Click
        if(buttonID == 'patchwall-button' && actionType == 'click') {
          if(['xiaomi'].includes(deviceFamily)) {
              _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell am start com.mitv.tvhome.atv'});
          }
          else {
            unsupportedButton();
          }
          return;
        }
        // PatchWall Button Hold
        if(buttonID == 'patchwall-button' && actionType == 'hold') {
          // no special behaviors known for this - I'm unable to test in my region
          return;
        }



        // Input Button Click
        if(buttonID == 'input-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
          }
          else {
            _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell input keyevent 178'});
          }
          return;
        }
        // Input Button Hold
        if(buttonID == 'input-button' && actionType == 'hold') {
          // no special behaviors known for this
          return;
        }



        // Reboot Button Click
        if(buttonID == 'reboot-button' && actionType == 'click') {
          if(['apple-tv', 'roku'].includes(deviceFamily)) {
            unsupportedButton();
            return;
          }
          if(confirm('Are you sure you want to reboot '+(_hass.states[_config.entity]?.attributes?.friendly_name || _config.entity)) == false) {
            return;
          }
          _hass.callService("androidtv", "adb_command", { entity_id: _config.entity, command: 'adb shell reboot' });
          return;
        }
        // Reboot Button Hold
        if(buttonID == 'reboot-button' && actionType == 'hold') {
          // no special actions imagined for this yet
          return;
        }



        // Search Button Click (Apple TV Remote style 2)
        if(buttonID == 'search-button' && actionType == 'click') {
          if(['apple-tv'].includes(deviceFamily)) {
            _hass.callService("media_player", "select_source", { entity_id: _config.entity, source: resolveSource('Search', {}, _hass.states[entity]?.attributes?.source_list)});
          }
          else {
            unsupportedButton();
          }
          return;
        }
        // Search Button Hold (Apple TV Remote style 2)
        if(buttonID == 'search-button' && actionType == 'hold') {
          // no special behaviors known for this - I do not own this, so I'm unable to test
          return;
        }


// TODO: Not important, but also not working with the refactor
//        // Roku Function: Secret Screen Click
//        if(buttonID == 'roku-secret-screen-button' && actionType == 'click') {
//          if(['roku'].includes(deviceFamily)) {
//            var command = ['home', 'home', 'home', 'home', 'home', 'forward', 'forward', 'forward', 'reverse', 'reverse'];
//            for (let index = 0, len = command.length; index < len; ++index) {
//              setTimeout(() =>
//                _hass.callService("remote", "send_command", { entity_id: _config.roku_remote_entity, command: command[index], num_repeats: 1, delay_secs: 0, hold_secs: 0}),
//                index*50);
//            }
//          }
//          else {
//            unsupportedButton();
//          }
//          return;
//        }
//        // Roku Function: Secret Screen Hold
//        if(buttonID == 'roku-secret-screen-button' && actionType == 'hold') {
//          // no special actions imagined for this yet
//          return;
//        }


  }
