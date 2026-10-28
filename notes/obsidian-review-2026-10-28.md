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
- 0.12.1 was published after explicit user approval, with exactly the three supported assets. The downloaded bytes match the local build. Its official scan completed and reproduced `main.js` byte-for-byte; the original release/CSS findings were gone.

## Follow-up: newly visible release and behavior findings — 0.12.2 candidate

Once the compiled bundle could be reviewed, the official scan reported its size above 5 MB, missing GitHub artifact attestations, legacy dynamic compatibility probes and local capability notices.

- Retain the original landscape PNG in source but embed a 1000px WebP thumbnail. Re-encode the thirty style samples at WebP quality 75 without changing their dimensions, frame coordinates, words or composition. No templates are removed and no preview network requests are added.
- Import only twitter-text's weighted-length parser from the locked package, avoiding its unused linkification APIs. X counting and splitting still use the same parser.
- Replace the locked ssh2 BigInt syntax probe and core-js global-object fallback during the ES2022 build. Both transformations fail closed if dependency text changes. The shipped runtime no longer evaluates strings as code, and identifiers remain readable.
- Enforce a conservative 5,000,000-byte bundle budget in regression checks and the release workflow. Add GitHub's official `actions/attest` step and verification of all three assets before publication.
- Document the local CLI, filesystem, vault picker and clipboard capabilities. The user explicitly chose to retain the existing functionality and explain its permissions, rather than remove features to hide capability notices.

Candidate validation: `npm run check` passes 132 tests, with 0 failures and the same 1 optional native-Chrome skip. The actual built SSH relay also passes 6 additional checks, including local tunnel requests, fingerprint mismatch protection and authentication failure handling. The bundle is 4,763,012 bytes, under the conservative 5 MB limit, and has no runtime string-evaluation probes. Workflow YAML and version metadata agree; thumbnail and sheet samples were visually inspected and the original sheet frame metadata was verified unchanged.

Source preview and the subsequent release still need to be verified. The public 0.12.1 release remains unchanged while this candidate is prepared; provenance signing can only be confirmed in the authorized GitHub release run.
