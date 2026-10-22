export type DeviceFamily = 'amazon-fire' | 'apple-tv' | 'chromecast' | 'homatics' | 'nvidia-shield' | 'onn' | 'roku' | 'xiaomi' | 'none';
export type VerificationLevel = 'historical-catalog' | 'requires-device-validation';
export type LaunchStrategy = 'package' | 'source' | 'command' | 'remote-command' | 'deep-link';
export type Lifecycle = 'active' | 'legacy';

export interface SourceEvidence {
  kind: string;
  url: string;
  value?: string;
}

export interface PlatformLaunch {
  appName?: string;
  androidName?: string;
  adbLaunchCommand?: string;
  remoteCommand?: string;
  'app-id'?: number | string;
  deepLink?: string;
  launchStrategy?: LaunchStrategy;
  sourceAliases?: string[];
  verification?: VerificationLevel;
  evidence?: SourceEvidence[];
}

export interface LauncherEntry extends PlatformLaunch {
  friendlyName: string;
  className: string;
  button: string;
  'button-round'?: string;
  deviceFamily: DeviceFamily[];
  lifecycle?: Lifecycle;
  catalogId?: string;
  catalogOrigin?: 'baseline' | 'supplemental';
  // Legacy data has both top-level and per-family fields. Do not flatten it.
  [key: string]: unknown;
}

export interface CatalogPatch {
  id: string;
  displayName?: string;
  aliases: string[];
  issues: number[];
  region?: string;
  lifecycle?: Lifecycle;
  typographicArtwork?: boolean;
  platforms: Partial<Record<DeviceFamily, PlatformLaunch>>;
  incompleteFamilies: Partial<Record<DeviceFamily, string>>;
  sources: string[];
  notes: string[];
  observedEvidence: {kind: string; value: string; source: string; issue: number}[];
}

export interface CatalogFamily {
  status: 'complete' | 'incomplete';
  verification: VerificationLevel;
  launch?: PlatformLaunch & {strategy: LaunchStrategy};
  blocker?: string;
  evidence: SourceEvidence[];
}

export interface CatalogEntry {
  id: string;
  aliases: string[];
  displayName: string;
  artwork: {kind: 'existing-svg' | 'typographic'; reference: string};
  supportedFamilies: DeviceFamily[];
  families: Partial<Record<DeviceFamily, CatalogFamily>>;
  region: string | null;
  lifecycle: Lifecycle;
  reviewedOn: string;
  hardwareVerifiedOn: null;
  sourceProvenance: SourceEvidence[];
  requestIssues: number[];
  notes: string[];
  observedEvidence: CatalogPatch['observedEvidence'];
}

export interface CatalogManifest {
  schemaVersion: 1;
  reviewedOn: string;
  entries: CatalogEntry[];
}

export interface CatalogProblem {
  id: string;
  family?: string;
  message: string;
}
