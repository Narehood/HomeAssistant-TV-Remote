import { describe, expect, it } from 'vitest';
import { launcherData, catalogManifest } from '../src/launcher-buttons.js';
import { resolveAppAction } from '../src/runtime/launch.js';
import { mockHass, modelConfig, models } from './fixtures';
import type { DeviceFamily } from '../src/catalog';

describe('advertised catalog and runtime integration', () => {
  it('resolves every structurally complete family to a service action', () => {
    const environment = mockHass();
    let combinations = 0;
    for (const app of catalogManifest.entries) {
      for (const [family, record] of Object.entries(app.families)) {
        if (record?.status !== 'complete') continue;
        const model = models.find(model => model.family === family)!;
        expect(model, `${app.id}/${family} needs a device fixture`).toBeDefined();
        const config = { ...modelConfig(model), control_mode: 'legacy' };
        const action = resolveAppAction(launcherData[app.id]!, config, environment);
        expect(action, `${app.id}/${family} advertises ${record.launch?.strategy}`).not.toHaveProperty('unsupported');
        expect(action.domain, `${app.id}/${family}`).toBeTruthy();
        expect(action.service, `${app.id}/${family}`).toBeTruthy();
        expect(action.data, `${app.id}/${family}`).toBeTypeOf('object');
        if (action.service === 'select_source') expect(action.data.source, `${app.id}/${family}`).toBeTruthy();
        combinations++;
      }
    }
    expect(combinations).toBeGreaterThan(1500);
    expect(environment.callService).not.toHaveBeenCalled();
  });

  it('keeps incomplete platforms out of recommendations and produces actionable runtime status', () => {
    const environment = mockHass();
    const incomplete = catalogManifest.entries.find(app => app.id === 'pathe-thuis')!;
    for (const family of ['chromecast', 'nvidia-shield', 'onn', 'xiaomi'] as DeviceFamily[]) {
      expect(incomplete.families[family]?.status).toBe('incomplete');
      const model = models.find(model => model.family === family)!;
      expect(resolveAppAction(launcherData[incomplete.id]!, { ...modelConfig(model), control_mode: 'legacy' }, environment))
        .toHaveProperty('unsupported', expect.stringContaining('launch strategy'));
    }
  });
});
