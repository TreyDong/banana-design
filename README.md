# Banana Design

> Design lab: isolated workspace on `design/visual-system`. UI and template changes follow [DESIGN.md](DESIGN.md).

Create article-led covers and illustrations in Obsidian desktop. Choose an article, a visual template, and independent planning and image services. Preview results, export PNGs, and insert illustrations at approved locations.

**Desktop only · Obsidian 1.11.4 or later · Version 0.12.0**

## Use

1. Enable the plugin and run **Open illustration workspace** (`banana-design:open`), or select its ribbon icon.
2. Open a Markdown note and click the Banana Design ribbon icon to use that note automatically. The workspace has two stages: **Create images** (Cover / Body illustrations) and **Preview & publish** (Original article / WeChat / X). Each stage keeps the last subpage while the workspace stays open. Select a Markdown article. Choose a format and a template. Dimensions and visual style are independent.
3. The paperclip opens your computer’s image picker (PNG / JPEG / WebP, multiple selection). Images follow the vault attachment folder setting and remain attached as references to that article; the adjacent menu also offers existing vault images. For a cover, enter the request and choose 1–4 candidates. Generated images are saved as new files; old results remain in history.
4. Canvas text is authored, not copied: while planning each cover, the text model also writes a short headline (and a supporting line for title+subtitle mode) from the article body instead of reusing the article title. The compose panel shows this canvas text with its source; edit it inline or switch back to the article title before generating.
5. Region editing: with a generated cover open, choose “Region edit”, drag a rectangle over the preview, and describe the change. The marked region is sent through the reference-image editing path so only that area changes; the result is saved as a new candidate with its origin recorded.
6. For article illustrations, generate a plan, review or edit the complete batch, then confirm generation. Owned markers reserve the chosen paragraphs; batch insertion replaces only valid markers. Missing or ambiguous targets stop insertion and never silently append images.
7. Export the selected PNG, insert a cover, or return to an earlier batch. Restarting the workspace clears the current view while retaining saved images and history.

The interface supports Simplified Chinese and English and follows Obsidian's own language setting (Settings → About → Language); Chinese-language Obsidian installs see Chinese, everything else English. Articles, titles, prompts, custom template names, service names and existing history retain their original wording. The language setting controls the interface; it does not request translation of article or image content.

The plugin does not replace the Markdown editor or provide a general autonomous agent. Local card layouts export a flattened PNG; generated image edits use an entire reference image, without a layer or mask editor.

## Models and connections

In plugin settings, configure **Planning** and **Image generation** independently. Use an already installed and signed-in Codex CLI, or add your own API connection. Available API formats include OpenAI Chat Completions, Responses, Anthropic Messages, OpenAI-compatible Images, Gemini native images, Seedream and OpenRouter images. Presets are editable endpoint suggestions; they do not establish that an account has model access. A fetched model list is not an entitlement guarantee.

New installations default to Codex CLI connections; enabling the plugin does not start a model call or install a CLI. Model discovery runs only when requested. The user must install and authenticate external tools separately. API credentials use Obsidian SecretStorage; plugin data stores secret references rather than key values. HTTPS is required for remote endpoints; loopback HTTP is supported for local services.

## WeChat formatting and publishing

The workspace gains a **WeChat tab** for turning the current article into WeChat Official Account compatible rich text: Markdown is parsed with the bundled marked parser and every element receives inline styles from a selectable theme (four built-in themes), because the WeChat editor strips classes and external CSS. Obsidian specifics are normalized — `![[embeds]]` and local images become placeholders that are uploaded to WeChat on publish, `[[wikilinks]]` become plain text, `==highlights==` become styled marks, and callouts become styled quotes. A phone-width preview renders in the workspace stage.

Publishing requires a **verified** Official Account: set the AppID and AppSecret in **Settings → Banana Design → WeChat** (the secret is stored in Obsidian SecretStorage, never in `data.json`). Publishing uploads article images (`uploadimg`), uploads the selected cover as permanent material (`add_material`, PNG/JPG/GIF; WebP images are re-encoded locally), and creates a draft (`draft/add`) that appears in the account's draft box at mp.weixin.qq.com — final publishing stays a manual step in the WeChat admin. The WeChat API checks the caller IP against the account whitelist when issuing an `access_token`. Because home broadband IPs change, the settings page offers a **fixed-IP relay over SSH**: enter the address, username and password or private key of any server you own, and the plugin opens an SSH tunnel (bundled [ssh2](https://github.com/mscdex/ssh2), equivalent to `ssh -D` but built in) so that single token request leaves from the server's fixed IP — the server needs no configuration beyond default `AllowTcpForwarding`. Image uploads and draft creation go direct; if WeChat ever answers 40164 on one of them, that request is retried through the tunnel. The first connection records the server's host-key fingerprint and later mismatches are refused. SSH password, pasted private key and passphrase live in Obsidian SecretStorage. A **connectivity test** makes one real token request and, when the caller IP is not whitelisted, parses the effective egress IP from WeChat's error message and copies it (with the relay configured, that is the server IP to whitelist). "Copy rich text" provides a fallback that places the themed HTML on the clipboard for manual pasting. Cover candidates come from covers generated in the cover tab or the article's first image; a draft cannot be pushed without a cover.

## Accounts, payment, network and privacy

- The plugin itself is MIT licensed and has no payment gate, ads, author-operated service, or client-side telemetry. AI features require an external provider account, API credentials or a signed-in CLI; that service may charge for usage. Local card rendering is local, while AI-assisted card copy still uses the planning model.
- Explicit model requests send the selected article text, instructions and necessary context to the chosen planning service. Image generation sends the design prompt and selected reference images to the chosen image service. Generated-image URLs returned by that service are downloaded. Refreshing models requests the selected service's model list. No background scan sends the whole vault.
- Presets include OpenAI, Anthropic, Google, OpenRouter, SiliconFlow, DeepSeek, Moonshot/Kimi, Zhipu, MiniMax, Alibaba Cloud, Volcengine/Seedream and other configurable API services; only the selected connection is used. Ollama and loopback-compatible local services are supported. No article data goes to Qiaomu or Dan Koe. Provider retention and billing are governed by that provider's terms; this plugin has no independent server-side data store.
- Codex runs as a local subprocess over stdio and uses its existing authentication and provider configuration. The plugin checks common executable locations, the user-specified binary and the shell command lookup. Planning uses a read-only sandbox in the system temporary directory; image generation uses a per-job temporary directory with writes restricted to it and network disabled in its execution sandbox. Inference still uses the CLI's provider network. These are CLI sandbox controls, not a guarantee that an external CLI has no additional access; review the CLI configuration you choose to use.
- Image output files are read only from the job directory or the CLI's `~/.codex/generated_images` directory, after resolving symlinks and checking image signatures and size. Job directories are removed after completion. The CLI may retain its own authentication, logs or generated-image cache outside the vault.
- Article paths, prompts, conversation, history, custom templates and session snapshots remain in `<vault>/.obsidian/plugins/banana-design/data.json`. Generated PNGs stay in the configured vault folder. Syncing these locations may also sync their private content. None is part of the source repository or Release.
- Export uses a temporary in-memory download URL. System fonts are used for Canvas rendering; bundled preview images are embedded offline and do not cause CDN requests.

## Files and compatibility

The default output folder is `Banana Design` inside the vault. Settings support article, date and task variables and preview the resulting path. Existing names are never silently overwritten; new versions receive a suffix. Generated assets and source notes stay separate.

The plugin ID remains `banana-design`, the command remains `open`, and the settings schema and SecretStorage references are preserved. For an existing installation, retain `data.json` and existing image folders when updating. The 0.10.1 publication build bundles the previous sibling modules and preview assets into `main.js`; no migration of user data is required. Old extra files may remain harmlessly in a manually installed folder.

## Install

Open the official [Obsidian Community listing](https://community.obsidian.md/plugins/banana-design) and choose **Add to Obsidian**. The initial 0.10.1 publication completed automated review on 2026-10-19 with **Health: Excellent** and **Review: Satisfactory**, including a byte-for-byte reproduced build. Those results describe 0.10.1; consult the listing for the current version's review status. GitHub Releases and marketplace review may update at different times.

The expanded plugin bundle exceeds 5 MB. Obsidian Sync Standard cannot sync files larger than 5 MB, so install the plugin separately on each desktop if you use that plan. The release embeds offline preview assets in the standard three-file package.

For a manual install, download **main.js**, **manifest.json** and **styles.css** from the matching [GitHub Release](https://github.com/TreyDong/banana-design/releases) and place them in `<vault>/.obsidian/plugins/banana-design/`. Enable Banana Design in Community plugins. Do not copy source folders or any other person's `data.json` into the vault.

## Build and check

Requires Node.js 20 or later and npm.

```sh
npm ci
npm run check
```

The project separates source modules, build tooling, tests and preview assets:

```text
src/
  main.js                      Plugin entry, workspace and settings
  i18n.js                      Chinese / English interface messages
  services/model-services.js   Model connections and provider protocols
  illustrations/figure-agent.js Article planning, anchors and insertion
  rendering/cover-layout.js    Local cover rendering
  templates/                   Cover and illustration templates
scripts/build.mjs              Bundle and embed previews and notices
tests/release.test.cjs          Release and behavior regression tests
assets/                        Offline preview assets
manifest.json                  Obsidian plugin metadata
versions.json                  Version compatibility
styles.css                     Plugin styles
```

`npm run build` runs `scripts/build.mjs` to create an unminified CommonJS `main.js` in the project root, embeds previews and third-party notices, and leaves Obsidian as a host dependency. Upload `main.js`, `manifest.json`, and `styles.css` as Release assets under a tag exactly matching the manifest version, without a `v` prefix. Compiled output and `node_modules` are excluded from source Git.

Tests cover standalone three-file installation, migration, source/marker ownership, no append fallback, path traversal and symlink rejection, local API context, cancellation and key redaction. Mock tests do not certify access to every provider or platform. Publication checks used synthetic fixtures on Obsidian 1.14.4 for macOS; they do not establish Windows/Linux or minimum-version compatibility, or access to paid providers.

## License and credits

[MIT](LICENSE), with original upstream attribution retained. Banana Design includes adapted Codex bridge and provider preset portions from [Qiaomu Design](https://github.com/joeseesun/qiaomu-cover-design) by Xiangyang Qiaomu (joeseesun). Full upstream MIT terms and the precise adaptation scope are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and embedded in the distributed plugin. Local article illustration planning, anchor and layout modules were authored for Banana Design.

Custom user assets are not bundled. This is an independent community plugin, not an official Obsidian, Qiaomu, OpenAI or Dan Koe product.

## Changes

### Unreleased

- Removed the interface-language dropdown from plugin settings; the interface now simply follows Obsidian's own language setting. `settings.language` and its persistence behavior are unchanged for existing installs.
- X publishing supports **both OAuth 2.0 (Authorization Code + PKCE, the officially recommended flow) and OAuth 1.0a**, selectable in settings. OAuth 2.0 needs only a Client ID/Secret: the plugin starts a one-shot local callback server, opens the browser authorization (scopes tweet.read/write, users.read, media.write, offline.access), exchanges the code within its 30-second window, stores tokens in SecretStorage and refreshes automatically before the 2-hour expiry (rotated refresh tokens persisted). The token endpoints travel through the same direct/proxy/SSH transports as the API calls.
- Added **X (Twitter) publishing**: a fifth workspace tab turns the current article into a thread — AI rewrite through the configured planning model or deterministic splitting with the official twitter-text weighted-length rules (CJK counts 2, URLs count 23, never bisecting a URL or grapheme) — then per-post editing with live counters (280, or 25000 with the Premium long-post option), lead-image attachment from generated covers, numbering styles and an optional sign-off. Publishing uses the official API v2 over OAuth 1.0a (four keys in SecretStorage; signature cross-checked against Twitter's canonical vector): chunked-safe `POST /2/media/upload` (one-shot for images, initialize/append/finalize for GIFs), reply-chained `POST /2/tweets` with automatic resume after failures, delete support and Chinese error hints for 401/403/429. Mainland access offers direct / HTTP proxy (CONNECT tunnel) / reuse of the WeChat SSH relay. New tests cover the signature vector, splitting, client flows and the proxy tunnel.

- Settings pages (Files, WeChat, About) now use bordered group cards with a heading row, matching the Banana Reader settings layout; the SSH relay group carries an enable toggle in its heading and keeps its fields collapsed until switched on.
- Added a **fixed-IP relay over SSH** for WeChat publishing: provide a server's SSH address plus password or private key and the plugin tunnels the `access_token` request through it (bundled `ssh2`, no server-side setup), so the whitelist needs only the server's fixed IP. Uploads and drafts stay direct, with an automatic tunnel retry on error 40164. Host-key fingerprints are pinned on first use; SSH secrets are stored in SecretStorage. Replaced the egress-IP lookup with a **connectivity test** that performs a real token request and, on 40164, parses and copies the effective egress IP. An end-to-end regression test runs a mock SSH server and TLS endpoint through the real tunnel code.
- Added **WeChat formatting and publishing**: a fourth workspace tab renders the current article into WeChat-compatible rich text with four built-in inline-style themes, a phone-width preview, image placeholder upload and draft-box push for verified accounts. AppID/AppSecret live in Obsidian SecretStorage; the secret never enters `data.json`. Publishing follows the official draft flow (`token` → `uploadimg` → `add_material` → `draft/add`); final publishing remains a manual step at mp.weixin.qq.com. `Copy rich text` is the fallback for accounts without API access. Markdown parsing uses the bundled [marked](https://github.com/markedjs/marked) 18.1.1 (MIT; see THIRD_PARTY_NOTICES.md). New regression tests cover theme structure, the formatting pipeline (including Obsidian syntax handling) and the API client with a stubbed network.
### 0.10.2 — 2026-10-20

- Added an interface language setting with automatic, Simplified Chinese and English modes, including settings help, workspace controls, model dialogs and authored status/error messages.
- Language changes persist and refresh the workspace. User-authored content, saved image names and paths retain their original wording. Language changes are disabled during active generation or insertion.
- Simplified provider cards to names and aligned marks.
- Validation: all 15 regression checks pass, including saved language choices, automatic host-language selection, save-failure rollback and unchanged generation prompts/output paths. Native Obsidian 1.14.4 checks covered Chinese/English settings, model forms and workspace tabs, plus persistence across plugin reload.

### Source organization — 2026-10-20

- Grouped model services, article illustrations, local rendering and templates under their respective `src/` directories; moved build tooling into `scripts/` and updated imports and tests.
- Removed the engineering process directory at the author's request. Source references and full license notices remain in `THIRD_PARTY_NOTICES.md`; earlier process records remain available in Git history at commit `0b45996e61c8115230a51abf7c9d78096b06dbc3`.
- This is a source organization change. The three-file installation format, version, plugin behavior and user data schema are unchanged.

### 0.10.1

- Added a reproducible standard three-file release with embedded modules, previews and third-party notices.
- Restricted remote APIs to HTTPS and limited agent-provided image paths to validated output directories.
- Fixed template dialogs overwriting Obsidian's internal keyboard scope.
- Removed routine startup logging and preserved existing IDs, settings, history and output paths.
- Created a clean source repository from the user-confirmed readable vault modules; excluded private data and local backups.
