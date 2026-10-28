# Obsidian automated review fixes — 0.12.1

The official 0.12.0 review failed because its GitHub Release contained only a ZIP archive. Obsidian requires `main.js` and `manifest.json` as individual release assets, alongside `styles.css`; it ignores the ZIP. The review also flagged `clip-path`, `!important`, and the two `:has()` selectors in the plugin stylesheet. Dependencies passed.

## Changes

- Use a transparent, non-interactive one-pixel label for icon buttons. Text remains available to accessibility APIs without requiring CSS clipping support.
- Control button transition duration through a CSS variable. Reduced-motion preferences set it to zero; generation animations retain their existing reduced-motion rules.
- Assign `bd-service-modal` directly to the two service dialog containers when opening them. A scoped class selector preserves their 660px width and viewport limit without ancestor matching.
- Keep the newly merged English README. Synchronize package, lockfile, manifest and compatibility metadata to 0.12.1.
- Add a stable-tag release workflow that validates metadata, builds and tests, uploads only the three supported assets, checks their names and sizes, and compares downloaded bytes before publishing.

## Validation

- `npm run check`: 132 tests, 131 passed, 0 failed, 1 existing optional native-Chrome integration test skipped because `BANANA_CHROME_TEST_BIN` was not configured. This includes the standalone three-file installation test and settings/publishing regressions. Local networking tests required permission to bind temporary loopback ports.
- Workflow YAML parses successfully. Package, lockfile, manifest, tag version and compatibility metadata agree. The stylesheet contains none of the three flagged CSS constructs.
- An additional DOM harness exercised the real service-manager opening and provider-gallery-to-connection-form flow without network calls; both dialogs retain their explicit width class.
- Published assets and the official review must still be verified after release publication; local tests alone do not establish marketplace acceptance.
