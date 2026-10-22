import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { catalogManifest, launcherCSS, launcherData } from '../src/launcher-buttons.js';
import { augmentLauncherData, createCatalogManifest, isCompleteLaunch, recommendedCatalogEntries, resolveCatalogId, resolveCatalogSource, resolvePlatformLaunch, typographicArtwork, validateCatalogManifest, providerApprovals, legacyUtilities } from '../src/catalog';
import { legacyCatalogIds } from '../src/catalog/legacy-ids';
import { issueProvenance } from '../src/catalog/provenance';
import type { CatalogManifest, CatalogPatch, DeviceFamily, LauncherEntry } from '../src/catalog';

const entry = (id: string) => catalogManifest.entries.find(app => app.id === id)!;
const launch = (id: string, family: DeviceFamily) => resolvePlatformLaunch(launcherData[id]!, family);
const fixture = (overrides: Partial<LauncherEntry> = {}): LauncherEntry => ({
  friendlyName: 'Test', button: '<svg></svg>', className: 'testButton', deviceFamily: ['chromecast'], ...overrides,
});

describe('catalog integrity and compatibility', () => {
  it('retains the four reviewed provider IDs and their issue provenance', () => {
    for (const id of ['sky-news', 'prime-video', 'sky-plus-br', 'sky-go']) {
      expect(launcherData[id], id).toBeDefined();
      expect(entry(id).requestIssues, id).toEqual(expect.arrayContaining(issueProvenance[id]!));
    }
  });

  it('rejects provenance that no longer has any launcher record', () => {
    const data = { test: fixture() };
    const manifest = createCatalogManifest(data, []);
    expect(validateCatalogManifest(manifest, data, { test: [1], orphan: [2] }))
      .toContainEqual({id:'orphan',message:'Issue provenance has no launcher data.'});
  });

  it('preserves every baseline YAML ID and gives all choices artwork and a validated manifest', () => {
    expect(legacyCatalogIds).toHaveLength(385);
    for (const id of legacyCatalogIds) expect(launcherData[id], id).toBeDefined();
    expect(validateCatalogManifest(catalogManifest, launcherData)).toEqual([]);
    expect(catalogManifest.entries).toHaveLength(385 + Object.keys(providerApprovals).length);
    expect(launcherCSS).toContain('.catalog-label');
  });

  it('preserves whole-record family selection, including the historical Twitch root-command trap', () => {
    const original = fixture({
      appName: 'Fire source', adbLaunchCommand: 'adb shell am start -n fire.package/.FireActivity',
      chromecast: {appName: 'Twitch', androidName: 'tv.twitch.android.app'},
    });
    expect(resolvePlatformLaunch(original, 'chromecast')).toEqual({appName: 'Twitch', androidName: 'tv.twitch.android.app'});
    expect(createCatalogManifest({test: original}, []).entries[0]!.families.chromecast!.launch!.strategy).toBe('source');
    expect(resolvePlatformLaunch(original, 'amazon-fire').adbLaunchCommand).toContain('fire.package');
    expect(resolvePlatformLaunch(fixture({appName: 'Root', chromecast: {androidName: 'com.example.metadata'}}), 'chromecast')).toEqual({appName: 'Root'});
  });

  it('applies package repairs as whole replacements and keeps the supplied baseline immutable', () => {
    const baseline = {test: fixture({chromecast: {appName: 'Old', adbLaunchCommand: 'obsolete.activity'}})};
    const patch: CatalogPatch = {id: 'test', aliases: [], issues: [], sources: [], notes: [], observedEvidence: [], incompleteFamilies: {}, platforms: {chromecast: {appName: 'com.example.tv', androidName: 'com.example.tv', launchStrategy: 'package'}}};
    const merged = augmentLauncherData(baseline, [patch]);
    expect(resolvePlatformLaunch(merged.test!, 'chromecast')).toEqual({appName: 'com.example.tv', androidName: 'com.example.tv', launchStrategy: 'package'});
    expect((baseline.test.chromecast as {adbLaunchCommand: string}).adbLaunchCommand).toBe('obsolete.activity');
    expect(merged.test!.deviceFamily).not.toBe(baseline.test.deviceFamily);
  });

  it('records every advertised Pathé Thuis Android gap and omits it from new recommendations', () => {
    for (const family of ['chromecast', 'nvidia-shield', 'onn', 'xiaomi'] as const) {
      expect(entry('pathe-thuis').families[family]).toMatchObject({status: 'incomplete', blocker: expect.stringContaining('without any launch data')});
      expect(recommendedCatalogEntries(catalogManifest, family).some(app => app.id === 'pathe-thuis')).toBe(false);
    }
    expect(entry('pathe-thuis').families['apple-tv']!.status).toBe('complete');
    expect(launcherData['pathe-thuis']!.deviceFamily).toContain('chromecast');
  });

  it('never claims device verification from metadata or an upstream report', () => {
    for (const app of catalogManifest.entries) {
      expect(app.hardwareVerifiedOn).toBeNull();
      for (const family of Object.values(app.families)) {
        expect(['historical-catalog', 'requires-device-validation']).toContain(family!.verification);
      }
    }
  });

  it('detects duplicate identities, absent artwork, invalid launches and family inconsistencies', () => {
    const broken: CatalogManifest = structuredClone(catalogManifest);
    const first = broken.entries[0]!;
    broken.entries.push(structuredClone(first));
    first.aliases.push(broken.entries[1]!.id);
    first.supportedFamilies.push('none');
    const invalidLaunch = broken.entries.find(app => app.families.chromecast?.status === 'complete')!;
    invalidLaunch.families.chromecast!.launch = {strategy: 'package', launchStrategy: 'package', androidName: 'not a package; shell text'};
    const data = {...launcherData, [first.id]: {...launcherData[first.id]!, button: ''}};
    const messages = validateCatalogManifest(broken, data).map(problem => problem.message).join('\n');
    expect(messages).toContain('Duplicate catalog ID');
    expect(messages).toContain('Ambiguous ID/alias');
    expect(messages).toContain('Missing artwork');
    expect(messages).toContain('Advertised family has no manifest record');
    expect(messages).toContain('invalid launch metadata');
  });

  it('renders untrusted labels as escaped typographic artwork', () => {
    const label = '<img src=x onerror="alert(1)"> & \'brand\'';
    const container = document.createElement('div');
    container.innerHTML = typographicArtwork(label);
    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).not.toContain('<img');
    expect(container.firstElementChild!.getAttribute('aria-label')).toBe(label);
  });
});

describe('reviewed app repairs and distinct variants', () => {
  it('updates the inherited SmartTube stable/beta IDs without adding unofficial-client variants', () => {
    expect(launch('smart-tube-next', 'nvidia-shield')).toMatchObject({androidName: 'org.smarttube.stable', launchStrategy: 'package'});
    expect(launch('smart-tube-next-beta', 'amazon-fire')).toMatchObject({androidName: 'org.smarttube.beta', launchStrategy: 'package'});
    expect(launch('smart-tube-next-beta', 'amazon-fire').adbLaunchCommand).toBeUndefined();
  });

  it('keeps platform-specific rename sources and Roku IDs without deleting old YAML IDs', () => {
    expect(launch('my5', 'roku')).toMatchObject({appName: '5', 'app-id': 27424, sourceAliases: ['My5']});
    expect(launch('my5', 'apple-tv')).toMatchObject({appName: 'Channel 5', sourceAliases: ['My5']});
    expect(launch('uktv-play', 'roku')).toMatchObject({appName: 'U', 'app-id': 181173, sourceAliases: ['UKTV Play']});
    expect(launch('uktv-play', 'apple-tv').appName).toBe('UKTV Play');
    expect(launch('myCanal', 'apple-tv')).toMatchObject({appName: 'CANAL+', sourceAliases: ['myCANAL']});
    expect(resolveCatalogId(catalogManifest, 'mycanal-fr')).toBe('myCanal');
    expect(launch('swiftfin', 'apple-tv')).toMatchObject({appName: 'Swiftfin tvOS', sourceAliases: ['Jellyfin']});
    expect(resolveCatalogSource(launch('my5', 'roku'), ['My5'])).toBe('My5');
    expect(resolveCatalogSource(launch('apple-tv-music', 'apple-tv'), ['Musik'])).toBe('Musik');
    expect(resolveCatalogSource(launch('apple-tv-music', 'apple-tv'), ['Musique'])).toBe('Musique');
    expect(resolveCatalogSource(launch('apple-tv-photos', 'apple-tv'), ['Fotos'])).toBe('Fotos');
  });

  it('repairs BBC wrapper metadata and uses package launches for reported obsolete components', () => {
    expect(launch('bbc-iplayer', 'chromecast').adbLaunchCommand).toBe('adb shell am start -n bbc.iplayer.android/external.androidtv.psbwrapper.deeplinking.DeepLinkActivity');
    expect(launch('now-tv', 'chromecast')).toMatchObject({androidName: 'com.bskyb.nowtv.beta', launchStrategy: 'package'});
    expect(launch('now-tv-it', 'amazon-fire').androidName).toBe('com.nowtv.it');
    for (const id of ['plex', 'twitch']) expect(launch(id, 'chromecast').adbLaunchCommand).toBeUndefined();
    expect(launch('twitch', 'chromecast').androidName).toBe('tv.twitch.android.app');
    expect(launch('twitch', 'amazon-fire').androidName).toBe('tv.twitch.android.viewer');
    expect(launch('discovery-plus', 'chromecast').deepLink).toBeUndefined();
  });

  it('keeps provider region, generation and TV builds separate', () => {
    expect(launch('free-tv-fr', 'apple-tv').appName).toBe('Free TV');
    expect(launch('free-tv', 'chromecast').androidName).toBe('tv.freetv.androidtv');
    expect(launch('magenta-tv-gen1', 'nvidia-shield').androidName).toBe('de.telekom.magentatv.atv');
    expect(launch('magenta-tv', 'nvidia-shield').androidName).toBe('de.telekom.magentatv.androidtv');
    expect(launch('vk-video-tv', 'xiaomi').androidName).toBe('com.vk.tv');
    expect(launch('rutube-tv', 'xiaomi').androidName).toBe('ru.rutube.app');
    expect(launch('o2tv', 'apple-tv').appName).toBe('O₂ TV');
    expect(entry('soop').requestIssues).toContain(798);
    expect(launch('soop', 'nvidia-shield').androidName).toBe('kr.co.afreecatv.atv');
  });

  it('deduplicates issue families and resolves new primary-source identifiers', () => {
    expect(entry('frndly-tv').requestIssues).toEqual(expect.arrayContaining([655, 860]));
    expect(entry('tivify').requestIssues).toEqual(expect.arrayContaining([626, 627]));
    expect(launch('waipuTV', 'roku')).toMatchObject({appName: 'waipu.tv', 'app-id': 677369});
    expect(launch('now-tv', 'nvidia-shield')).toMatchObject({androidName: 'com.bskyb.nowtv.beta', verification: 'requires-device-validation'});
  });

  it('never launches a foreground playback activity or the fabricated Magic TV component', () => {
    for (const [id, family] of [['magic-tv-ocilion', 'amazon-fire'], ['fizztv', 'amazon-fire'], ['vodafone-tv-pt', 'xiaomi'], ['soop', 'nvidia-shield'], ['tcm', 'amazon-fire']] as const) {
      const candidate = launch(id, family);
      expect(candidate.launchStrategy).toBe('package');
      expect(candidate.adbLaunchCommand).toBeUndefined();
      expect(isCompleteLaunch(candidate, family)).toBe(true);
    }
    expect(launch('magic-tv-ocilion', 'amazon-fire').androidName).toBe('com.ocilion.magictv');
    expect(entry('magic-tv-ocilion').notes.join(' ')).toContain('fabricated');
  });

  it('preserves retired SHOWTIME identities and launch data with explicit retirement evidence', () => {
    for (const id of ['showtime', 'showtime-anytime']) {
      expect(launcherData[id]!.lifecycle).toBe('legacy');
      expect(entry(id).lifecycle).toBe('legacy');
      expect(entry(id).sourceProvenance.some(source => source.url.includes('showtime.com'))).toBe(true);
      expect(recommendedCatalogEntries(catalogManifest, 'apple-tv').some(app => app.id === id)).toBe(false);
    }
    expect(launch('showtime', 'amazon-fire').androidName).toBe('com.showtime.standalone');
    expect(launch('showtime-anytime', 'amazon-fire').androidName).toBe('com.showtime.showtimeanytime');
    expect(launch('showtime', 'apple-tv').appName).toBe('Showtime');
  });

  it('keeps unsupported identifier/platform requests as explicit incomplete records', () => {
    expect(entry('zitotv2go').families['amazon-fire']!.status).toBe('incomplete');
    expect(entry('zitotv2go').families.roku!.status).toBe('complete');
    expect(entry('implayer-tv').families.roku!.status).toBe('incomplete');
    expect(entry('implayer-tv').families.chromecast!.status).toBe('complete');
  });
});

describe('TV-provider review gate', () => {
  const review = JSON.parse(readFileSync(resolve('docs/PROVIDER_REVIEW.json'), 'utf8')) as {
    entries: {id: string; decision: 'keep' | 'exclude'; reason: string; sources: string[]}[];
  };
  it('accounts for every proposed addition and excludes each rejected identity from the installed catalog', () => {
    expect(review.entries).toHaveLength(102);
    expect(new Set(review.entries.map(row => row.id)).size).toBe(102);
    expect(review.entries.filter(row => row.decision === 'keep')).toHaveLength(51);
    const additions = catalogManifest.entries.filter(app => !(legacyCatalogIds as readonly string[]).includes(app.id)).map(app => app.id).sort();
    expect(additions).toEqual(review.entries.filter(row => row.decision === 'keep').map(row => row.id).sort());
    expect(additions).toEqual(Object.keys(providerApprovals).sort());
    for (const row of review.entries) {
      expect(row.reason).toBeTruthy();
      expect(row.sources.length).toBeGreaterThan(0);
      if (row.decision === 'exclude') expect(launcherData[row.id], row.id).toBeUndefined();
      else expect(entry(row.id).sourceProvenance.some(source => source.kind === 'provider-identity'), row.id).toBe(true);
    }
  });
  it('rejects an unknown addition even when it claims baseline origin', () => {
    const data = { unreviewed: fixture({catalogOrigin:'baseline',appName:'Example'}) };
    const manifest = createCatalogManifest(data, []);
    expect(validateCatalogManifest(manifest, data, {})).toContainEqual({id:'unreviewed',message:'New launcher lacks a primary-source TV-provider approval.'});
  });
  it('preserves inherited VPN launch metadata while omitting every VPN from provider recommendations', () => {
    for (const id of Object.keys(legacyUtilities)) {
      expect(launcherData[id]!.legacyReason).toBe('VPN utility');
      expect(entry(id).lifecycle).toBe('legacy');
      for (const family of entry(id).supportedFamilies) {
        expect(isCompleteLaunch(launch(id, family), family), id).toBe(true);
        expect(recommendedCatalogEntries(catalogManifest, family).some(app => app.id === id), id).toBe(false);
      }
    }
  });
});

describe('issue implementation ledger', () => {
  interface Row { issue: number; state: string; labels: string[]; catalogIds: string[]; implementationStatus: string; auditStatus: string; hardwareVerification: string; familyStates: {catalogId: string; family: DeviceFamily; status: string; blocker: string | null}[] }
  const ledger = JSON.parse(readFileSync(resolve('docs/APP_IMPLEMENTATION_STATUS.json'), 'utf8')) as {rows: Row[]};
  const context = new Set(['system_function', 'localization', 'transport_integration', 'ui_requirement']);

  it('tracks all 529 app requests plus 14 context requests, including every 131 labeled open request', () => {
    expect(ledger.rows).toHaveLength(543);
    expect(new Set(ledger.rows.map(row => row.issue)).size).toBe(543);
    const apps = ledger.rows.filter(row => !context.has(row.auditStatus));
    expect(apps).toHaveLength(529);
    expect(apps.filter(row => row.state === 'open')).toHaveLength(145);
    expect(apps.filter(row => row.state === 'open' && row.labels.some(label => /New App Shortcut|App Shortcut Update/i.test(label)))).toHaveLength(131);
    for (const row of ledger.rows) {
      expect(row.hardwareVerification).toBe('not-performed');
      expect(row.implementationStatus).toBeTruthy();
      for (const state of row.familyStates) {
        if (state.status === 'candidate-implemented') expect(entry(state.catalogId).families[state.family]!.status).toBe('complete');
        if (state.status === 'blocked-missing-evidence') expect(state.blocker).toBeTruthy();
      }
    }
  });
});
