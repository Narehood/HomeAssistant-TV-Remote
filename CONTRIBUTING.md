# Contributing to Home Assistant TV Remote

Contributions belong in [Narehood/HomeAssistant-TV-Remote](https://github.com/Narehood/HomeAssistant-TV-Remote). This is an independently maintained fork of PRProd's Firemote. Preserve the original author and contributor credit, GPL license, Git history, third-party notices, physical remote designs, and working YAML configurations.

## Repository boundary

Read [AGENTS.md](AGENTS.md) and the [modernization plan](docs/MODERNIZATION_PLAN.md) before changing the project. **PRProd/HA-Firemote is permanently read-only.** Reading upstream code, issues, and pull requests for historical evidence is welcome. Do not push there, open pull requests or issues there, comment, react, dispatch workflows, publish releases, or make any other upstream write.

Before any GitHub mutation, explicitly verify that its owner and repository are `Narehood/HomeAssistant-TV-Remote`. Check `git remote -v`; never rely on GitHub CLI fork-network defaults. Always specify `--repo Narehood/HomeAssistant-TV-Remote` for GitHub CLI writes and set that repository explicitly in API calls. Check the base repository in the pull request UI before submitting. Use full upstream URLs in local/fork issue references.

## Report a problem or request

Start with [installation and troubleshooting](docs/INSTALLATION.md). Use the [fork's issue forms](https://github.com/Narehood/HomeAssistant-TV-Remote/issues/new/choose) and include the card version, Home Assistant version, installation method, integration, device model/firmware, and steps to reproduce. Include minimal YAML and relevant errors with credentials and private addresses removed. App requests also need region, app version, and a device-observed launch identifier; see [collecting device information](docs/INSTALLATION.md#collect-device-information).

Use the fork's issue tracker for reports; do not redirect reports to upstream. Existing upstream reports are requirements and historical evidence, rather than proof that this fork has reproduced or fixed a problem.

## Develop a change

Follow the [development guide](docs/DEVELOPMENT.md) for Node.js 24, npm, the local preview, and validation. Keep `custom:firemote-card`, the `HA-Firemote.js` installation filename, valid legacy YAML, and the physical remote designs compatible. Edit authored files in `src/` and rebuild the distribution; do not manually synchronize version strings. Explain any configuration migration in the pull request.

Add regression coverage when a behavior change needs it. Run `npm run check` and `npm run test:browser` before submitting. For prose-only changes, check links and any JSON/YAML you changed. Report precisely which checks ran. A browser mock or service-payload test does not establish device behavior: claims about integration or hardware fixes need Home Assistant, integration, device, firmware, and observed-result evidence.

## Releases and repository administration

Only maintainers prepare releases in this fork. The [release procedure](docs/DEVELOPMENT.md#prepare-a-release) builds from a version tag, includes the GPL and dependency notices, and creates a reviewable artifact. Optional GitHub release creation produces a draft; publication is a separate maintainer action.

Repository settings, issue labels, and PR routing are maintainer tasks listed in the [administration checklist](docs/DEVELOPMENT.md#repository-administration). Do not change them as a side effect of documentation or code work.
