# Third-party notices

## Qiaomu Design

Banana Design contains adaptations of the local Codex app-server bridge and provider preset data from [joeseesun/qiaomu-cover-design](https://github.com/joeseesun/qiaomu-cover-design), version 0.3.0. Its service-management and settings interaction informed this implementation. The reference checkout is read-only and is not the Banana Design source repository. The upstream material is MIT licensed; its complete notice follows. Current upstream license verified on 2026-10-19, main commit 62272849f382abae54cf13d0258e8c40f53ae1df. This is not an official Qiaomu product. Credit: 向阳乔木 (joeseesun), adapted upstream portions.

MIT License

Copyright (c) 2025-2026 向阳乔木 (joeseesun)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Preview assets and templates

`assets/neon-card.svg` is the original geometric layout preview supplied with Banana Design. `assets/dan-koe.png` is the AI-generated, untitled generic landscape preview supplied with Banana Design; it contains no article material and is not a work by Dan Koe. The template name describes a visual reference, not authorship or endorsement. Custom user templates, reference photos and generated article images are not bundled.

Both previews are embedded at build time. There are no bundled third-party fonts or runtime font downloads; the local Canvas renderer uses system fonts. Template prompts and cover-layout.js are authored for this plugin. Referenced external projects in the historical local README are design research references, not additional bundled dependencies.

## Host and tools

Obsidian supplies its API and Lucide icon rendering; Obsidian is not redistributed. Codex CLI is a user-installed external dependency and is not installed, updated or distributed by this plugin. esbuild is an MIT-licensed build-time dependency, pinned by package-lock.json; its runtime is not included in the plugin. No Fabric, React, Qiaomu templates, private account configuration, or external service SDK is bundled.

The Qiaomu notice above is also prepended verbatim to the distributed main.js so the standard three-file installer preserves it.

## Awesome GPT Image template research

The initial article-led recipes in `src/template-catalog.js` use the category structures and production constraints documented by freestylefly in [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2/blob/63e6176fa01be51c000108dacd72716d3e46784b/docs/templates.md), inspected 2026-10-19. The repository is MIT licensed; its notice follows. The recipes were rewritten for article evidence, independent output ratios and separate cover/body rules. Article-body previews are original geometric layout studies; seven cover directions use original AI-generated samples. The four newer editorial directions have independently written rules informed by the publication-design references recorded in notes/editorial-cover-research-2026-10-20.md. No upstream community image, publication cover, logo, real-person photograph or verbatim third-party case prompt is redistributed. The source repository separately disclaims ownership of third-party community cases; its MIT does not establish rights to those third-party works. See notes/template-catalog.md for the original category research and the editorial research note for later samples and typography.

MIT License

Copyright (c) 2026 freestylefly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
