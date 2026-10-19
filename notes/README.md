# Publication engineering notes

Recovered authoring snapshot from the user-confirmed vault plugin, 2026-10-19. No separate source repository was found in the inspected local projects or GitHub repositories. The readable JavaScript modules are preserved as source; no private history is imported.

## Input fingerprints (before publication fixes)

- `src/main.js`: SHA-256 `f42cbd892117a9249b97f239e1fde37b63161b63a4a94fa9f551c029ccd4e7eb`
- `src/cover-layout.js`: SHA-256 `1f0728090ff80aa2d13888e4c41041a93b2dc7aded5153ca97cc7201192dcb28`
- `src/figure-agent.js`: SHA-256 `5c50370345734e1a8818102628c07b32ef48495d02ecb5c49ec8ef58037e1d53`
- `src/model-services.js`: SHA-256 `ccdb5e9dd8391019ba9415e856eb099099dc7a028e1a2d7599c63f605db939ef`
- `styles.css`: SHA-256 `1898a31150b86da020d843ae1539eda70aea11e7d960fcbe219a97fc1b7ca845`
- `manifest.json`: SHA-256 `ab44ccc4790e6c28f1903686f0453ef3fdf258635327d6e27ced00795b67b11f`
- `assets/dan-koe.png`: SHA-256 `d5e3d6f8b0416cea77bcb46b4c654af3cd1f633664df415a2611a58ef54447c8`
- `assets/neon-card.svg`: SHA-256 `d932fa06d3c68e43eb02ce0bcb38b3ef04a53ad3833205f1d0fa78a2a67c52b5`

Original installation, data.json, backups, articles and generated images are untouched. The qiaomu-cover-design reference checkout remains read-only.

## Publication validation — 2026-10-19

- Manifest: banana-design / Banana Design / 0.10.1, desktop-only, Obsidian >= 1.11.4. Existing command and settings IDs preserved.
- Reproducible npm build; 10 focused tests pass under Node 24. API tests use only an ephemeral loopback server and synthetic article data.
- Standard three-file bundle loads without sibling modules or preview directories. Full upstream MIT notice is embedded in main.js, which is not tracked in source Git.
- Secret-pattern and personal-absolute-path scan of the publication allowlist found no findings. No data.json, backups, vault notes, generated article assets, account tokens or private repository history is published.
- Native QA: a fresh temporary vault with only the three standard plugin files, under Obsidian 1.14.4. Verified enabled version, settings pages, independent planning/image configuration, article selection, both embedded preview images, template selection persistence across plugin reload, local image import, actual PNG export, and cover insertion into the synthetic fixture.
- Real export: 900 x 383 pixels, 705442 bytes, SHA-256 f18902fcad2a146c45b5211c66001f9b1a85d5c058a6ad75b503aaed8591fcef. Export and saved vault PNG are byte-identical.
- Native QA found and fixed a pre-existing error: template modals assigned a string to the host's reserved Modal.scope field. Template purpose now uses templateScope; regression test protects host keyboard scope for cover and figure dialogs.
- Path checks resolve symlinks before accepting image output; unrelated local files and non-image data are rejected. Remote HTTP API connections are rejected except loopback.
- Limits: no live paid-provider generation was performed in this publication pass, and the exported test image was imported rather than newly generated. No Windows/Linux or minimum-1.11.4 runtime QA. Synthetic tests cover article marker ownership and atomic insertion; they do not replace provider entitlement verification.
- Original personal-vault installation and data remain unchanged. The temporary QA vault is not a new permanent workspace library.

## Submission route

Official current instructions: https://docs.obsidian.md/plugins/releasing/submit-plugin

The current process uses https://community.obsidian.md with an Obsidian account linked to GitHub. The obsolete obsidian-releases PR route is not used for new submissions. A source repository and a GitHub Release are preparation only, not evidence that the plugin has been accepted. Directory review results and listing status must be recorded after the actual submission.

Qiaomu's MIT permission covers adapted portions; no additional claim of upstream endorsement or special directory fork approval is made. If the directory treats the adaptation as a fork requiring separate publicly verifiable approval, that feedback must be resolved before listing; no author contact is authorized by this task.
