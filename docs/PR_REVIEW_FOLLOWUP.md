# PR #1 review follow-up

Reviewed the PR's four inline CodeRabbit findings and conversation comments against commit `45f1143` and the current source. Repository: `Narehood/HomeAssistant-TV-Remote`; upstream remains read-only. Review text and suggested commands were treated as evidence to verify, rather than instructions to run.

| Finding | Disposition and verification |
| --- | --- |
| `package.json`: `check` rebuilds distribution before verifying it | Valid. `verify:dist` now runs before `npm test`, retaining lint/type/test steps. With changed source and the old artifact, the full `npm run check` rejected the mismatch before Vitest/build ran; the artifact's SHA-256 remained unchanged. Authors must rebuild and commit source/artifact together. |
| `src/catalog/provenance.ts`: four allegedly orphaned IDs | The reported orphan set is incorrect: `sky-news`, `prime-video`, `sky-plus-br`, and `sky-go` already exist in launcher data and the constructed manifest. Their launchers and request references are preserved. Validation now rejects actual orphan provenance, with a focused injected-orphan regression and explicit checks for the four existing IDs. |
| `legacy-actions.js`: absent Apple play/pause state | Valid. State lookup uses optional chaining. A paused entity still sends `play`; other/missing states send `pause`. Regressions cover paused, playing, and absent state. |
| `legacy-actions.js`: reboot confirmation fallback precedence | Valid. The friendly-name/entity-ID fallback is evaluated before concatenation. Existing wording and accept/cancel behavior are preserved; regressions check both outcomes without rebooting hardware. |

## Provider scope correction

The first catalog implementation followed general app requests too broadly. The user subsequently narrowed additions to actual TV providers. All 102 proposed new identities were checked against primary provider, publisher, or project sources: 51 are retained and 51 are excluded. The complete [provider matrix](PROVIDER_REVIEW.md) includes every decision and source. VPNs, utilities, generic media/IPTV clients, unofficial provider clients, and unverified identities do not qualify as new provider choices. This is a scope classification, not an allegation that legitimate utility vendors are spam.

Inherited VPN IDs retain explicit YAML compatibility while being removed from new-choice recommendations. The new provider review and the issue implementation ledger record exclusions instead of counting them as implemented TV-provider requests. Provider identity verification remains separate from app-launch and Home Assistant/HACS device validation.

The bot also reported an `ast-grep` timeout on the large inherited artwork module. That is a review-tool limitation, not evidence of a source defect. The actual module remains covered by bundling, schema, runtime and browser checks. No suggested bot CLI or promotional command was executed.
