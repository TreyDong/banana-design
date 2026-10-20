# Banana Design

Create article-led covers and illustrations in Obsidian desktop. Choose an article, a visual template, and independent planning and image services. Preview results, export PNGs, and insert illustrations at approved locations.

**Desktop only · Obsidian 1.11.4 or later · Version 0.10.1**

## Use

1. Enable the plugin and run **Open illustration workspace** (`banana-design:open`, displayed in Chinese as 打开配图工作台), or select its ribbon icon.
2. Select a Markdown article. Choose a format and a template, including the built-in blank, engraving-inspired, and local card layouts. Dimensions and visual style are independent.
3. For a cover, enter the request and choose 1–4 candidates. Generated images are saved as new files; old results remain in history.
4. For article illustrations, generate a plan, review or edit the complete batch, then confirm generation. Owned markers reserve the chosen paragraphs; batch insertion replaces only valid markers. Missing or ambiguous targets stop insertion and never silently append images.
5. Export the selected PNG, insert a cover, or return to an earlier batch. Restarting the workspace clears the current view while retaining saved images and history.

The interface is currently in Chinese. The plugin does not replace the Markdown editor or provide a general autonomous agent. Local card layouts export a flattened PNG; generated image edits use an entire reference image, without a layer or mask editor.

## Models and connections

In plugin settings, configure **Planning** and **Image generation** independently. Use an already installed and signed-in Codex CLI, or add your own API connection. Available API formats include OpenAI Chat Completions, Responses, Anthropic Messages, OpenAI-compatible Images, Gemini native images, Seedream and OpenRouter images. Presets are editable endpoint suggestions; they do not establish that an account has model access. A fetched model list is not an entitlement guarantee.

New installations default to Codex CLI connections; enabling the plugin does not start a model call or install a CLI. Model discovery runs only when requested. The user must install and authenticate external tools separately. API credentials use Obsidian SecretStorage; plugin data stores secret references rather than key values. HTTPS is required for remote endpoints; loopback HTTP is supported for local services.

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

Open the official [Obsidian Community listing](https://community.obsidian.md/plugins/banana-design) and choose **Add to Obsidian**. Version 0.10.1 was published on 2026-10-19; its automated review completed with **Health: Excellent** and **Review: Satisfactory**, including a byte-for-byte reproduced build. Review warnings remain visible on the listing.

The published 0.10.1 `main.js` is 5,507,343 bytes; the expanded local catalog is larger. Obsidian Sync Standard cannot sync files larger than 5 MB, so install the plugin separately on each desktop if you use that plan. The release embeds the offline template previews in the standard three-file package.

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
  services/model-services.js   Model connections and provider protocols
  illustrations/figure-agent.js Article planning, anchors and insertion
  rendering/cover-layout.js    Local cover rendering
  templates/catalog.js         Cover and illustration recipes
scripts/build.mjs              Bundle and embed previews and notices
tests/release.test.cjs          Release and behavior regression tests
assets/                        Offline preview images and type studies
manifest.json                  Obsidian plugin metadata
versions.json                  Version compatibility
styles.css                     Plugin styles
```

`npm run build` runs `scripts/build.mjs` to create an unminified CommonJS `main.js` in the project root, embeds previews and third-party notices, and leaves Obsidian as a host dependency. Upload `main.js`, `manifest.json`, and `styles.css` as Release assets under a tag exactly matching the manifest version, without a `v` prefix. Compiled output and `node_modules` are excluded from source Git.

Tests cover standalone three-file installation, migration, source/marker ownership, no append fallback, path traversal and symlink rejection, local API context, cancellation and key redaction. Mock tests do not certify access to every provider or platform. Publication checks used synthetic fixtures on Obsidian 1.14.4 for macOS; they do not establish Windows/Linux or minimum-version compatibility, or access to paid providers.

## License and credits

[MIT](LICENSE), with original upstream attribution retained. Banana Design includes adapted Codex bridge and provider preset portions from [Qiaomu Design](https://github.com/joeseesun/qiaomu-cover-design) by 向阳乔木 (joeseesun). Full upstream MIT terms and the precise adaptation scope are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and embedded in the distributed plugin. Local article illustration planning, anchor and layout modules were authored for Banana Design.

The engraving template is a style reference; its AI-generated generic preview is not Dan Koe's artwork and implies no endorsement. Custom user assets are not bundled. This is an independent community plugin, not an official Obsidian, Qiaomu, OpenAI or Dan Koe product.

## Expanded local template catalog

The local source adds 15 article-led recipes to the existing 3. They cover conceptual typography, paper, watercolor, diagrams, cinematic scenes, lifestyle photography, ink, still life, human narrative, opinion collage and literary painting. Covers and body illustrations have separate prompts, independent dimensions and saved custom overrides. The source link appears in the template library when selected. Body previews are labeled **layout studies**; the seven sampled cover directions use actual generated-cover previews.

The original category recipes are informed by a popular GPT Image repository's documented categories and production rules. The four new editorial directions use independently written rules informed by real publication-design references. Repository stars and article views are not per-template use counts or proof of a cover's causal effect. No runtime reference-site request or fixed image provider is added. See [template sources and attribution](THIRD_PARTY_NOTICES.md#awesome-gpt-image-template-research) and the source links in [the catalog](src/templates/catalog.js). This local addition has not been published as a new community Release.

## Changes

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

## Cover samples and illustration recipes

The cover library includes the existing blank, engraving and neon layouts plus seven generated-cover directions: conceptual paper typography, cinematic spatial storytelling, tactile metaphorical still life, human narrative, opinion collage, quiet lifestyle photography and literary painting. Their offline previews are actual generated covers, using the same example article title. Each selected article supplies a new scene; the sample person, object and setting are not imposed on later covers. The four newer directions also support title-free images; the selected text rule takes priority over typography guidance.

Process, comparison, scale and other diagram recipes remain available in the article-illustration library. Existing active choices and saved user customizations remain accessible. A sample demonstrates one generated result, not a guarantee that every model produces an identical image. Current reusable prompts are in [the catalog](src/templates/catalog.js), with offline samples in `assets/` and regression coverage in `tests/`.
