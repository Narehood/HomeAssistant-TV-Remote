import { catalogPatches } from './supplemental';
import { issueProvenance } from './provenance';
import type { CatalogEntry, CatalogFamily, CatalogManifest, CatalogPatch, CatalogProblem, DeviceFamily, LauncherEntry, LaunchStrategy, PlatformLaunch, SourceEvidence } from './types';

export type * from './types';
export { catalogPatches } from './supplemental';

const REVIEWED_ON = '2026-10-22';
const BASELINE_SOURCE = 'https://github.com/Narehood/HomeAssistant-TV-Remote/blob/b856a45e684775fd477dbcd8d1342ff65bb97e38/dist/launcher-buttons.js';
const ANDROID_PACKAGE = /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/;
const FAMILIES = new Set<DeviceFamily>(['amazon-fire', 'apple-tv', 'chromecast', 'homatics', 'nvidia-shield', 'onn', 'roku', 'xiaomi', 'none']);
const STRATEGIES = new Set<LaunchStrategy>(['package', 'source', 'command', 'remote-command', 'deep-link']);

export function escapeCatalogLabel(label: string): string {
  return label.replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]!));
}

/** Controlled text artwork; this never interpolates unescaped labels into markup. */
export function typographicArtwork(label: string): string {
  const escaped = escapeCatalogLabel(label);
  const visible = label.length > 24
    ? label.replace(/^Function:\s*/, '').split(/\s+/).slice(0, 3).map(word => [...word][0] ?? '').join('').toUpperCase()
    : label;
  return `<span class="catalog-label" role="img" aria-label="${escaped}" title="${escaped}">${escapeCatalogLabel(visible)}</span>`;
}

export const supplementalCSS = `
  .catalogTextButton { background: #20242c; color: #f5f5f5; }
  .catalog-label {
    display: inline-flex; align-items: center; justify-content: center;
    box-sizing: border-box; width: 92%; min-height: 1.5em; padding: .2em;
    color: inherit; font: 600 calc(var(--sz, 1) * .7rem)/1.15 system-ui, sans-serif;
    text-align: center; white-space: normal; overflow-wrap: anywhere;
  }
`;

/** Pure merge: retained SVG artwork and legacy IDs are not rewritten. */
export function augmentLauncherData(baseline: Record<string, LauncherEntry>, patches: CatalogPatch[] = catalogPatches): Record<string, LauncherEntry> {
  const data: Record<string, LauncherEntry> = {};
  for (const [id, original] of Object.entries(baseline)) {
    const copy: LauncherEntry = {...original, deviceFamily: [...original.deviceFamily], catalogOrigin: 'baseline'};
    for (const family of original.deviceFamily) {
      const platform = original[family];
      if (platform && typeof platform === 'object') copy[family] = {...platform};
    }
    data[id] = copy;
  }
  for (const patch of patches) {
    const existing = data[patch.id];
    const label = patch.displayName ?? existing?.friendlyName ?? patch.id;
    const entry: LauncherEntry = existing ?? {
      friendlyName: label, className: 'catalogTextButton', button: typographicArtwork(label), deviceFamily: [], catalogOrigin: 'supplemental',
    };
    entry.friendlyName = label;
    entry.catalogId = patch.id;
    entry.lifecycle = patch.lifecycle ?? 'active';
    if (patch.typographicArtwork) {
      entry.className = 'catalogTextButton';
      entry.button = typographicArtwork(label);
      delete entry['button-round'];
    }
    for (const [family, platform] of Object.entries(patch.platforms)) {
      // A patch is a complete replacement for this family. In particular, an
      // obsolete activity must not survive a deliberate package-level repair.
      entry[family] = {...platform};
      if (!entry.deviceFamily.includes(family as DeviceFamily)) entry.deviceFamily.push(family as DeviceFamily);
    }
    // An incomplete historical advertisement is retained for legacy YAML, but
    // recorded explicitly in the manifest rather than given an invented route.
    data[patch.id] = entry;
  }
  return data;
}

/** Select a whole family launch record, matching the original dispatcher. */
export function resolvePlatformLaunch(entry: LauncherEntry, family: DeviceFamily): PlatformLaunch {
  const platform = entry[family];
  const local = platform && typeof platform === 'object' ? platform as PlatformLaunch : {};
  const selected = local.adbLaunchCommand || local.appName || local.remoteCommand || local.launchStrategy || local.deepLink ? local : entry;
  const output: PlatformLaunch = {};
  for (const key of ['appName', 'androidName', 'adbLaunchCommand', 'remoteCommand', 'app-id', 'deepLink', 'launchStrategy', 'sourceAliases', 'verification', 'evidence'] as const) {
    const value = selected[key];
    if (value !== undefined) Object.assign(output, {[key]: value});
  }
  // An explicit strategy can deliberately supersede a historical route.
  if (selected.launchStrategy === 'package') delete output.adbLaunchCommand;
  if (selected.launchStrategy === 'source') { delete output.adbLaunchCommand; delete output.androidName; }
  return output;
}

function strategyFor(launch: PlatformLaunch, family: DeviceFamily): LaunchStrategy | undefined {
  if (launch.launchStrategy) return launch.launchStrategy;
  if (launch.deepLink) return 'deep-link';
  if (launch.remoteCommand && (family === 'apple-tv' || family === 'roku')) return 'remote-command';
  if (launch.adbLaunchCommand) return 'command';
  if (launch.appName) return 'source';
  return undefined;
}

/** Structural completeness only; it says nothing about launch success. */
export function isCompleteLaunch(launch: PlatformLaunch, family: DeviceFamily): boolean {
  const strategy = strategyFor(launch, family);
  switch (strategy) {
    case 'package': return ANDROID_PACKAGE.test(launch.androidName ?? launch.appName ?? '');
    case 'source': return typeof launch.appName === 'string' && launch.appName.trim().length > 0;
    case 'command': return typeof launch.adbLaunchCommand === 'string' && launch.adbLaunchCommand.trim().length > 0;
    case 'remote-command': return typeof launch.remoteCommand === 'string' && launch.remoteCommand.trim().length > 0;
    case 'deep-link': return typeof launch.deepLink === 'string' && /^[a-z][a-z0-9+.-]*:\/\//i.test(launch.deepLink);
    default: return false;
  }
}

export function createCatalogManifest(data: Record<string, LauncherEntry>, patches: CatalogPatch[] = catalogPatches): CatalogManifest {
  const patchMap = new Map(patches.map(patch => [patch.id, patch]));
  const entries: CatalogEntry[] = Object.entries(data).map(([id, entry]) => {
    const patch = patchMap.get(id);
    const issues = [...new Set([...(issueProvenance[id] ?? []), ...(patch?.issues ?? [])])].sort((a, b) => a - b);
    const baselineEvidence: SourceEvidence[] = entry.catalogOrigin === 'supplemental' ? [] : [{kind: 'baseline-catalog', url: BASELINE_SOURCE}];
    const provenance: SourceEvidence[] = [
      ...baselineEvidence,
      ...issues.map(issue => ({kind: 'request', url: `https://github.com/PRProd/HA-Firemote/issues/${issue}`})),
      ...(patch?.sources ?? []).map(url => ({kind: 'reviewed-source', url})),
    ];
    const families: CatalogEntry['families'] = {};
    const requested = new Set([...entry.deviceFamily, ...Object.keys(patch?.incompleteFamilies ?? {}) as DeviceFamily[]]);
    for (const family of requested) {
      const launch = resolvePlatformLaunch(entry, family);
      const blocker = patch?.incompleteFamilies[family];
      const complete = !blocker && isCompleteLaunch(launch, family);
      const verification = launch.verification ?? (patch?.incompleteFamilies[family] ? 'requires-device-validation' : 'historical-catalog');
      const record: CatalogFamily = {
        status: complete ? 'complete' : 'incomplete', verification,
        evidence: launch.evidence ?? ((patch?.sources.length ?? 0) > 0 ? patch!.sources.map(url => ({kind: 'reviewed-source', url})) : baselineEvidence),
      };
      if (complete) record.launch = {...launch, strategy: strategyFor(launch, family)!};
      else record.blocker = blocker ?? 'No complete launch route is recorded for this family.';
      families[family] = record;
    }
    return {
      id, aliases: patch?.aliases ?? [], displayName: entry.friendlyName,
      artwork: {kind: entry.className === 'catalogTextButton' ? 'typographic' : 'existing-svg', reference: id},
      supportedFamilies: [...entry.deviceFamily], families, region: patch?.region ?? null,
      lifecycle: entry.lifecycle ?? 'active', reviewedOn: REVIEWED_ON, hardwareVerifiedOn: null,
      sourceProvenance: provenance, requestIssues: issues, notes: patch?.notes ?? [], observedEvidence: patch?.observedEvidence ?? [],
    };
  });
  return {schemaVersion: 1, reviewedOn: REVIEWED_ON, entries};
}

/** Return all defects so CI can report the complete problem set in one run. */
export function validateCatalogManifest(manifest: CatalogManifest, data: Record<string, LauncherEntry>): CatalogProblem[] {
  const problems: CatalogProblem[] = [];
  const ids = new Set<string>();
  const identities = new Map<string, string>();
  for (const entry of manifest.entries) {
    const add = (message: string, family?: string) => problems.push({id: entry.id, ...(family ? {family} : {}), message});
    if (ids.has(entry.id)) add('Duplicate catalog ID.');
    ids.add(entry.id);
    for (const identity of [entry.id, ...entry.aliases]) {
      const owner = identities.get(identity);
      if (owner && owner !== entry.id) add(`Ambiguous ID/alias: ${identity}.`);
      identities.set(identity, entry.id);
    }
    const launcher = data[entry.id];
    if (!launcher) { add('Missing launcher data.'); continue; }
    if (!entry.displayName || !launcher.friendlyName) add('Missing display name.');
    if (!launcher.button?.trim()) add('Missing artwork.');
    if (entry.artwork.reference !== entry.id) add('Artwork reference does not resolve to this launcher.');
    if (!entry.sourceProvenance.length || entry.sourceProvenance.some(source => !/^https:\/\//.test(source.url))) add('Missing or invalid source provenance.');
    if (!['active', 'legacy'].includes(entry.lifecycle)) add('Invalid lifecycle.');
    if (entry.hardwareVerifiedOn !== null) add('Hardware verification needs a separately reviewed device-evidence schema.');
    if (new Set(entry.supportedFamilies).size !== entry.supportedFamilies.length) add('Duplicate supported family.');
    for (const family of new Set([...entry.supportedFamilies, ...Object.keys(entry.families) as DeviceFamily[]])) {
      if (!FAMILIES.has(family)) add('Unknown device family.', family);
      const record = entry.families[family];
      if (!record) { add('Advertised family has no manifest record.', family); continue; }
      if (!record.evidence.length || record.evidence.some(source => !/^https:\/\//.test(source.url))) add('Missing or invalid family evidence.', family);
      if (!['historical-catalog', 'requires-device-validation'].includes(record.verification)) add('Invalid verification level.', family);
      if (record.status === 'incomplete') {
        if (!record.blocker?.trim()) add('Incomplete family needs an exact blocker.', family);
        if (record.launch) add('Incomplete family must not advertise a launch route.', family);
      } else if (record.status === 'complete') {
        if (!entry.supportedFamilies.includes(family)) add('Complete family is absent from supportedFamilies.', family);
        if (!record.launch || !STRATEGIES.has(record.launch.strategy) || !isCompleteLaunch(record.launch, family)) add('Complete family has invalid launch metadata.', family);
        const resolved = resolvePlatformLaunch(launcher, family);
        if (!isCompleteLaunch(resolved, family)) add('Manifest launch does not resolve in legacy data.', family);
        if (record.launch) {
          const {strategy, ...metadata} = record.launch;
          if (strategy !== strategyFor(resolved, family) || JSON.stringify(metadata) !== JSON.stringify(resolved)) add('Manifest launch disagrees with resolved launcher data.', family);
        }
      } else add('Invalid family status.', family);
    }
    if (entry.supportedFamilies.join('|') !== launcher.deviceFamily.join('|')) add('Manifest and launcher family declarations disagree.');
  }
  for (const id of Object.keys(data)) if (!ids.has(id)) problems.push({id, message: 'Launcher is missing from the manifest.'});
  return problems;
}

export const validateManifest = validateCatalogManifest;

export function resolveCatalogId(manifest: CatalogManifest, idOrAlias: string): string | undefined {
  return manifest.entries.find(entry => entry.id === idOrAlias || entry.aliases.includes(idOrAlias))?.id;
}

/** New recommendations omit retired and incomplete choices; YAML remains valid. */
export function recommendedCatalogEntries(manifest: CatalogManifest, family: DeviceFamily): CatalogEntry[] {
  return manifest.entries.filter(entry => entry.lifecycle === 'active' && entry.families[family]?.status === 'complete');
}

/** Exact installed sources win over the preferred current branding. */
export function resolveCatalogSource(launch: PlatformLaunch, installedSources: readonly string[]): string | undefined {
  return [launch.appName, ...(launch.sourceAliases ?? [])].find(source => source !== undefined && installedSources.includes(source));
}
