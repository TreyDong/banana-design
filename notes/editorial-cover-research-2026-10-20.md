# 封面方向补充调研 — 2026-10-20

首轮用户反馈：上一轮样张“还行”，但模板整体偏科普。首轮仅筛选视觉系统并制作对比样张；其后的明确加入授权、代码集成及 AttentionVC 研究见文末更新。个人设置和当前模板选择保持不动。

## 判断

现有流程、尺度、拆解、微缩系统类适合解释正文；上一轮三张成图又集中在纸艺装置、空间雕塑与材质静物。继续增加物件或更换材质不足以覆盖个人叙事与观点表达。本轮优先考虑人物情绪、具体生活动作、视觉态度与文化气质。以下适用性是设计判断，不是来源方的使用量排名。

| 候选方向 | 更适合的文章 | 视觉方法 | 本轮结果 |
| --- | --- | --- | --- |
| 人物叙事 · 手绘编辑 | 创作经历、成长困境、工作与生活观察 | 有表现力的人物与一个具体动作；环境参与叙事；成熟绘画笔触、空间和自然光 | 已生成样张 A |
| 观点拼贴 · 视觉评论 | AI、产品、行业评论、审美和独立观点 | 两三个有意义的图像片段，尺度反差、黑白摄影与强色纸面；大标题形成明确态度 | 已生成样张 B |
| 生活摄影 · 安静纪实 | 日常、人物、旅行、生活方式 | 一个真实感瞬间、自然光与环境痕迹，标题借画面留白；减少戏剧化道具 | 参考方向，尚未生成样张 |
| 文学绘画 · 留白意象 | 读书、随笔、情绪与文化 | 一幅独立绘画意象、纸感和克制排版，不要求解释全文；仍须照顾文章长标题可读性 | 参考方向，尚未生成样张 |

推荐先验证 A、B。摄影方向需要随文章选择具体场景；文学方向的竖版封面不能直接裁成横版，且长标题需要重新组织层级。

## 真实作品和设计资料

1. [The New Yorker / Time for Reflection](https://www.newyorker.com/culture/cover-story/cover-story-2022-07-25)：原站公开展示了人在水中行走的封面；用人物、反射、空间与色彩传递夏日体验，而非解释水的原理。已在浏览器检查公开封面。其正文后续出现订阅门槛，未进行登录或解锁。
2. [Pentagram / The Baffler](https://www.pentagram.com/work/the-baffler)：设计方说明其文学与观点刊物的视觉系统；浏览器检查了人物绘画封面、强烈字体和图文组合。借鉴的是叙事与文字的关系，不复用其刊名或具体画面。
3. [Pentagram / Tablet Magazine](https://www.pentagram.com/work/tablet-magazine)：设计方强调个人化、有人味的编辑表达，以及摄影、插画、拼贴思路和灵活排版。作为观点拼贴的设计方法参考；未声称其现成封面可直接安装为插件模板。
4. [Pentagram / The Paris Review](https://www.pentagram.com/work/the-paris-review)：设计方以极简排版给封面艺术留出空间；浏览器检查了绘画封面。参考其图像优先与克制层级，不能直接照搬它减少封面文字的做法到中文长标题。
5. [Kinfolk 官方杂志目录](https://www.kinfolk.com/product-category/kinfolk-magazines/) 与 [Alex Hunting Studio 自述](https://alexhunting.studio/pages/about)：作为生活、工作、文化编辑摄影方向的后续参考。本轮没有为这一方向制作样张。

这些是设计研究来源，不是已下载的模板包。本轮图片均为内置 imagegen 独立生成，未下载或打包来源方作品、刊名、商标。

## 两张对比样张

统一示例标题：“审美不够，怎么用 AI 做出更有质感的产品？”；同为约 2.35:1 横版，便于和上一轮比较。本轮按示例标题探索视觉方向，没有新读取或外发文章全文。

- A：[人物叙事预览](../assets/gpt-human-narrative.webp)。创作者在工作桌前举起色纸观察自然光，保留人物表情、手部动作和环境；绘画质感与大黑体。主体从物件转向人的感受与选择。
- B：[观点拼贴预览](../assets/gpt-opinion-collage.webp)。黑白眼睛与手部裁片、朱红纸面和蓝色色块，表达观察与选择；大黑体，强烈但克制的色彩冲突。

已逐张检查完整标题、主体、比例、构图、人物和材质；样张不代表插件内当前模型已复现。两张均为视觉候选，未加入下拉菜单、未安装、未发布。预览副本仅缩放编码，不裁掉标题；完整分辨率原图仍保留在生成工具的默认输出目录。

## 可复用模板规则

画面内容从当前文章提取；保留用户完整标题、实际画幅与文字开关。预览中的人物、眼睛、色纸只是本次例子，不应成为每篇文章的固定主体。先确定一个核心动作或观点，再组织主视觉和标题。

### A：人物叙事 · 手绘编辑

策划：从文章里挑一个有依据的人物行为或处境，写清人物正在做什么、看向哪里、感受到什么，以及环境怎样参与；只保留一个主要动作。人物不能退化成装饰性小剪影，不固定为工作室、女性或举色纸。输出可绘制的英文场景。

视觉：成熟手绘编辑插画；水粉和色铅笔的覆盖、颗粒和不完美边缘；人物有表情、姿态与可信的手部；前中后景形成连续空间。根据文章选择少量有张力的颜色，标题用有分量的现代字体，落在安静、对比清楚的位置。避免通用企业扁平小人、教程图标、流程箭头与无关标签。

正文：保留同样的笔触和人物观察方式，围绕当前段落的单个动作或场景，不套用封面大标题，不虚构事件为真实记录。

### B：观点拼贴 · 视觉评论

策划：先用一句话写清文章立场或矛盾，再选择两到三个有明确关系的视觉片段，通过裁切、尺度反差、遮挡或形状呼应表达。说明片段之间的联系；没有观点联系的材料不拼。主体不固定为眼睛、手、色卡。

视觉：摄影裁片、纸张与印刷肌理形成一个有整体性的编辑构图；黑白与一两种强色对比，大标题有立场但不拥挤。保留清楚焦点与 6% 安全边距。避免随机素材板、多卡片拼图、营销海报、虚构数据与所有文章复用同一对象。

正文：用同样的裁切和材质表达该段落关系，标题与正文配图文字开关独立，不带入封面长标题。

## 样张实际生成提示词

使用内置 imagegen，未使用 CLI、未调用用户配置的付费接口。

### A

```text
Use case: illustration-story.
Asset: one finished Chinese editorial article COVER, landscape 2.35:1, full-bleed, not a magazine mockup.
Create a sophisticated human narrative illustration about a creator learning to see and make aesthetic choices while working with AI. It must feel like a cultural essay cover, warm, personal, candid and quietly witty.
Scene: on the right two-thirds, an adult Chinese creative person in a cobalt blue shirt is seated sideways at an ordinary wooden studio work table, leaning forward with real concentration, holding up a small translucent amber color sheet toward daylight. Their face, gaze and hands are important and expressive. The warm light cast through the sheet gives a single ordinary corner of the room a surprising rich color. A few loosely pinned abstract image experiments behind them, a simple closed laptop and paper on the table establish contemporary creative work. Asymmetrical crop, convincing foreground/middle/background, large human presence. The person occupies at least half the image height. Avoid a tiny lonely person in an enormous museum. This is an invented scene, not a documentary claim.
Medium: mature hand-painted editorial gouache and colored-pencil illustration, confident broad shapes with subtle overpaint and imperfect edges, sophisticated printed-ink texture. Dense ultramarine, burnt orange, pale peach, warm off-white, dark ink. Clear light and shadow, lively but controlled, no generic flat corporate illustration, no cute cartoon.
Reserve the upper-left ~45% as a quiet pale-peach painted wall for a strong Chinese headline; weave the room's diagonal light below the type. Keep the whole illustration as one continuous scene. The headline should be large, bold modern Chinese sans-serif in deep ink, expertly spaced, no labels or auxiliary copy.
Text verbatim, all characters and punctuation, natural line breaks:
审美不够，怎么用 AI 做出更有质感的产品？
Use 3–4 balanced lines; exact title must fit fully within 6% canvas safety margins. Deliver actual finished cover with readable headline. No logo, no masthead, no publication title, no date, no caption, no mockup, no explanatory arrows, no diagrams, no UI screenshots, no 3D blocks, no marble statue, no museum, no neon robot or brain. This is original art; do not reproduce any existing magazine cover or a particular artist's composition.
```

### B

```text
Use case: stylized-concept.
Asset: one finished Chinese editorial OPINION article cover, wide landscape 2.35:1. Bold, cultured, arresting, confident graphic art direction. No brand or masthead. Original art, not an imitation of an existing publication.
Main idea: aesthetic judgment is a human act of looking and selecting, rather than an automatic flood of output. Express this with a single witty physical collage: a large black-and-white analog photographic crop of an anonymous adult human eye and brow, cut with an angular torn-paper edge, looking through an irregular aperture in a vivid vermilion paper sheet. A second cropped hand holds one small beautiful ultramarine rectangle at an oblique angle, visually framing the act of choosing. The eye should feel alive, curious and discerning, not medical, threatening or surveillance-related. Keep only these two related image fragments, never a random moodboard or many tiny panels.
Composition: radical scale and crop, the eye fills the right half, the hand touches the lower central edge; ample continuous warm ivory at the left for enormous precisely set title. Overlap the red paper and photographic cutout in a single carefully controlled composition. No separate cards or grids. A narrow cobalt painted stroke can unite the image and title. Print texture, visible paper fibers, sharp scissor contours, coarse photographic halftone; asymmetrical deliberate tension, two bold flat colors plus monochrome. Editorial intellect and tactile humanity. NOT glossy 3D, NOT educational poster, NOT stock business presentation.
Typography: substantial compact modern Chinese grotesk / black sans-serif, optical spacing, clear hierarchy; deep black text at upper left over warm ivory, line breaks set as a single block with enough breathing room, never a book mockup.
Text EXACTLY:
审美不够，怎么用 AI 做出更有质感的产品？
Preserve every character and punctuation, fit whole title in 3–4 natural lines, headline readable as a thumbnail, minimum 6% safe margin. Only this text.
No additional text, no logo, no watermark, no fake author/date/statistic, no eyes diagram, no arrows or labels, no robot, no brain, no technical schematics, no tutorial steps, no museum, no stone block, no generic gradient background. Deliver one complete original cover.
```

## 用户确认后的集成与 AttentionVC 提取

用户在本轮明确认可上述四个方向，并要求加入模板，同时研究 [AttentionVC 的 AI 中英文章列表](https://www.attentionvc.ai/article?category=ai&lang=en%2Czh)。本节更新了前面“仅候选”的状态：四类已接入本地代码。生活摄影沿用已有 ID `gpt-documentary-lens`，另新增 `gpt-human-narrative`、`gpt-opinion-collage` 和 `gpt-literary-painting`。旧 ID、自定义覆盖、当前选择、历史、正文规则、目录和服务配置均不迁移。

补齐了 [生活摄影样张 C](../assets/gpt-quiet-photo.webp) 与 [文学绘画样张 D](../assets/gpt-literary-painting.webp)，均为内置 imagegen 对同一示例标题的原创成图。原始完整分辨率图保留在工具输出中；副本完整缩放为 960×408 WebP。A、B 沿用上一轮 1200×510 WebP。预览是具体示例，运行时策划必须按文章重新选择人、物件、地点和配色。

本地默认封面库现在为 10 种：原有 3 种、前一轮 3 种和本轮 4 种；正文库为 18 种。7 个生成封面方向均内嵌离线 WebP。文字开关优先于画风中的标题建议，关闭文字后不应因模板的排版指导强行加字。

### AttentionVC 样本与方法

- 检查时筛选为 AI、en/zh、7 天、按 Views 排序，页面实际显示 20 篇；其中 18 篇有封面、2 篇没有。只研究这个可见样本，不代表全站或历史全部文章。
- 使用 agent-reach 的 Jina Reader 读取公开目录，并通过浏览器逐一打开页面已提供的 18 个媒体原图检查。正文和列表的暗色渐变、文章标题叠字、排名标识分别处理。没有下载、打包或复用第三方封面文件。
- 展示量是聚合页当时显示的数值，未独立核对 X 原帖，也没有点击率、曝光实验或收益数据，不能推出“这个封面导致爆款”。本次也未验证文章涉及的模型、版本、产品功能或事件事实。
- 网站行标题和图片有时并不直接对应：例如第 8 行讨论 CoreWeave，缩略原图却是标有 Anthropic 的行情界面。此类仅归入“截图/成果展示”，不当作公司或产品的真实证据。
- 各类可复用的是构图与视觉方法。品牌、账号头像、人物身份、具体作品、数值和宣传承诺不从原图移植到新封面。

### 八类可复用视觉规则

这八类是对此次样本的设计归纳，不是网站自己的分类，也不是八个已经新增的插件选项。四种已获认可的编辑方向已加入模板；下列差异化做法作为后续模板与当前自由设计的可复用 brief。

| 提取方向 | 样本序号与出处 | 实际观察 | 更适合 |
| --- | --- | --- | --- |
| 人物专访 · 留白大字 | #4，Mai Yang，[原图](https://pbs.twimg.com/media/HU3jTdUbYAAr8dx.jpg) | 暖白底、左侧三行黑体、一个赭色重点、右侧圆形头像；层级少、人物和标题明确 | 人物故事、经历、成长 |
| 黑白叙事 · 暗场聚光 | #3，Melvin Vivas，[原图](https://pbs.twimg.com/media/HUfJzMrakAAfrOK.jpg) | 一个人物与一个陪伴角色、低机位台阶、黑白明暗和单焦点；原图没有文章标题 | 人与 AI 的关系、工作方式、观点 |
| 实物大字 · 微缩剧场 | #6，想风，[原图](https://pbs.twimg.com/media/HUmqw86agAANPVb.jpg) | 标题成为有厚度的实体招牌，角色和一个可操作物件进入同一真实透视场景；木、绿、奶油色与暖光 | 轻松的创作、工具入门、故事化教程 |
| 柔光绘画 · 情绪场景 | #5，[原图](https://pbs.twimg.com/media/HUec_dVXoAAEwEH.jpg)；#11，[原图](https://pbs.twimg.com/media/HUqwAreaUAEJ474.jpg) | 人物、光带或远景传递情绪；大空间、冷暖关系；一张无字、一张只放简短白标题 | 随笔、未来感、学习与创造 |
| 抽象材质 · 形态转化 | #1，[原图](https://pbs.twimg.com/media/HU1wTd5bsAAKErn.jpg)；#14，[原图](https://pbs.twimg.com/media/HU2F5gsa8AAInxJ.jpg) | 雾蓝点阵人像，或从散乱纸片向透光立方体的连续转化；减少标签，以材料与形态表达概念 | AI、信息、认知与系统观察 |
| 高对比大字 · 单点强调 | #7，[原图](https://pbs.twimg.com/media/HUp3joybwAAEuRO.jpg)；#13，[原图](https://pbs.twimg.com/media/HUeIzEgbAAAXal9.jpg)；#18，[原图](https://pbs.twimg.com/media/HUfaYkSXwAARVHF.jpg) | 黑白大字主导，只强调一个关键词或正文已有数字，右侧配一个主视觉；有暖白、蓝紫、黑绿三种执行 | 观点、清单、方法与产品文章 |
| 极简发布 · 名称为主 | #16，[原图](https://pbs.twimg.com/media/HUhQhn4W4AAcADc.jpg)；#17，[原图](https://pbs.twimg.com/media/HUhbQ37WsAA7lsR.jpg) | 极少元素、名称与一个符号、黑底或浅色柔光底；名称就是主视觉 | 短名称的产品介绍、版本发布 |
| 成果展示 · 真实素材 | #2、#8、#9、#10、#12、#20 | 分别为作品多视角拼贴、行情截图、手绘过程、作品界面、工具页面、活动实物照片 | 工具演示、作品展示、活动记录 |

最后一类的图像出处：[多视角作品](https://pbs.twimg.com/media/HUj3ucpbsAAUGNH.jpg)、[界面截图](https://pbs.twimg.com/media/HUrnfL_XQAAOZad.jpg)、[手绘过程](https://pbs.twimg.com/media/HUgoo7zasAAUhId.jpg)、[作品界面](https://pbs.twimg.com/media/HUwreNmb0AARhFp.jpg)、[工具页面](https://pbs.twimg.com/media/HUpM1LRaYAAXBFc.jpg)、[活动实物](https://pbs.twimg.com/media/HUwyH-IWEAA8LqM.jpg)。未配图的第 15、19 行不作风格样本。

### 可直接复用的 brief

共同规则：按当前文章重新选择场景与物件；画幅采用用户输入，不锁定本次原图比例。标题开关独立；开启时完整保留用户标题，关闭时不加任何字。所有数字、身份、结论和宣传内容必须有文章或用户素材依据。以下 `{concept}` 代表从当前文章生成的场景。

1. **人物专访**：先写清要讲的人物处境、标题焦点和可用人物素材；没有经用户提供的真人素材时，使用明确的概念人物或匿名插画，不伪造采访照片。视觉 brief：`Warm off-white editorial field, substantial black Chinese headline with semantic line breaks, one muted ochre emphasis, one article-specific portrait or human subject as the counterweight, deliberate negative space and minimal auxiliary detail. Scene: {concept}.`
2. **黑白叙事**：把文章核心关系变成一个可读动作，保留人物与环境、前中后景和单一光源；不是给画面塞一排功能卡。视觉 brief：`Monochrome cinematic editorial scene, deep blacks, sculptural side or back light, one meaningful human action within a coherent environment, readable silhouette and spatial depth, controlled soft grain. Scene: {concept}. Avoid generic robots unless the article requires one.`
3. **实物大字**：标题或用户指定短词成为场景中的实体字牌，材质、接触阴影与透视一致，角色必须在做具体事情。不加入原作的小机器人、品牌或既有角色。视觉 brief：`Tactile dimensional Chinese typography integrated as a physical sign within one richly detailed miniature stage, convincing thickness, grounded shadows, warm timber and deep green, one purposeful original character interacting with an article-specific object. Scene: {concept}. Avoid exploded diagrams and random miniature props.`
4. **柔光绘画**：从文章情绪提炼一个主关系，用空间和光色承载，不把所有文章变成相同的云海或发光人物。视觉 brief：`Painterly editorial scene with gentle luminous atmosphere, considered cool-warm color relationship, a purposeful human presence, layered depth and restrained detail; let light and scale carry the meaning. Scene: {concept}. No obligatory diagram or technology symbols.`
5. **抽象材质**：明确“什么在向什么转化”，只保留一种主材质和一个连续变化；不要把装饰粒子当作信息。视觉 brief：`One concept-led continuous material transformation, restrained frosted or translucent surfaces, fine dot texture or tactile paper, a coherent silhouette, soft directional light and generous breathing space. Scene: {concept}. No invented charts, labels or random floating UI.`
6. **高对比大字**：先提取文章最重要的一句话，保留完整标题；只强调一个真实关键词或已有数字，配一个相关主体，不自动增加夸大承诺。视觉 brief：`Headline-led editorial composition, strong black-white contrast, one carefully limited accent color, substantial precise Chinese typography, one coherent supporting visual, clear hierarchy and thumbnail readability. Scene: {concept}. No fabricated percentage, income, outcome, ranking or testimonial.`
7. **极简发布**：仅在用户允许短标题或已给产品短名称时采用；长文章标题不能为了模仿发布图被擅自缩写。视觉 brief：`Minimal editorial release cover, the supplied exact title as the main visual, ample negative space, crisp restrained typography, one original article-related mark or shape, black or softly tinted field. Scene: {concept}. Never imitate another brand logo.`
8. **成果展示**：优先用用户实际提供的作品、截图或照片，再做裁切、比例、留白和标题层级；没有素材时提出需要何种素材，不让图像模型伪造已完成的产品界面、市场图或活动证据。保留原素材意义，不编造小字、价格、数据和功能。此类使用现有导入/参考图能力，不声称本轮新增了自动截图拼版功能。

### C、D 实际生成提示词

使用内置 imagegen；预览主体仅用于展示画风，不硬编码进运行时策划。

#### C：生活摄影

```text
Use case: photorealistic-natural.
Asset: one completed editorial Chinese article cover, landscape 2.35:1. A quiet, sophisticated photographic magazine feature, personal and observed rather than an educational illustration.
Scene: a close, candid oblique view of an anonymous adult creator's two hands thoughtfully arranging three small paper studies on a warm ordinary wooden work table by a large window. One hand is gently moving a swatch, the other rests naturally near a closed plain laptop; soft everyday wear on the table, no pristine luxury showroom. The small abstract studies have restrained color and no words, UI, statistics or diagrams. The visual story is a moment of choosing, looking carefully and refining rather than depicting a mechanism. Let warm morning side-light and long soft shadows carry the atmosphere. Large crop, foreground tactile paper, natural cloth sleeve, 35mm editorial photography, fine honest film grain, cream, desaturated olive, amber and charcoal; photographic realism, not painted, not overprocessed, not sepia.
Composition: human action predominantly right half and lower-right. Left 45% is a quiet naturally lit wall/table region with generous breathing space, carrying a large elegant deep-charcoal Chinese headline. One continuous natural scene, no text box, no separate panels. Typeface: contemporary Chinese serif with confident heavier strokes, expertly spaced, 3–4 natural balanced lines. Maintain strong readability at thumbnail size. Respect at least 6% safe margin on all sides.
Text verbatim:
审美不够，怎么用 AI 做出更有质感的产品？
All characters and punctuation must be present. No other words, brand, masthead, logo, captions, fake author, date or watermark.
Avoid studio product render, marble sculpture, exploded diagram, robots, neon technology, infographic, fake charts or screenshots, a desk full of random decor, stock-photo business handshake. This is an original invented editorial illustration, not documentation of a real person or event.
```

#### D：文学绘画

```text
Use case: illustration-story.
Asset: one finished literary editorial article cover, landscape 2.35:1. A poetic original painting, rich color, confident mature brushwork and contemplative emotional depth. It should feel like a cultural essay or a beautiful book, never an educational infographic or 3D technology render.
Scene: on the right half, a solitary anonymous adult in an everyday rust-orange coat sits on a low seawall at blue hour, holding a large cream sheet of paper. Through a simple irregular aperture cut in the paper they are attentively looking at a small warm-lit house on the opposite shore; the framing and quiet attention reveal beauty within an ordinary scene. Make the figure and paper visually legible, not a tiny decorative silhouette. The cream paper, person's gesture, warm distant window and sea form one thoughtful visual relationship. An original imagined scene, not a claim about the article author's life.
Medium: layered gouache and oil pastel with expressive, tactile strokes and uneven printed-paper grain. Saturated ultramarine water, navy-purple shadows, burnt-sienna coat, a few warm golden window accents and pale peach sky. Atmospheric flat color masses with carefully placed detail. Embrace painterly ambiguity and imperfect edges, avoid polished CGI, no technical diagrams, no model nodes, no robot, no marble block or museum.
Composition: horizon runs behind the figure; calm deep-ultramarine region dominates the left 45%, composed specifically to support a warm-ivory Chinese title in large assured contemporary serif, thoughtful spacing and 3–4 balanced lines. Image and words should feel like a single literary cover. Keep every character complete, sufficiently bold to read at thumbnail size, 6% safety margin. Do not put a boxed caption on top.
Text verbatim:
审美不够，怎么用 AI 做出更有质感的产品？
No other words, logo, masthead, subtitle, fabricated date or byline, quote, watermark or signature. No decorative stars or irrelevant icons. No publication mockup or collage contact sheet. Deliver one completed original cover.
```

### 验证状态

本轮构建成功，13 项回归检查通过；覆盖 10 种默认封面选择、18 种正文配图选择、自定义覆盖和旧 ID、无字模式、任意尺寸、正文不带封面标题，以及在仅有三个发布文件的临时安装目录中加载全部 7 个 WebP 封面预览。源代码没有新增第三方图片下载或参考站运行时请求。个人 Obsidian 界面验收仍按用户先前要求稍后进行；当前安装和公开 Release 未替换。当时的本地 bundle 为 6,527,458 字节，仍超过此前已知的 Standard Sync 5 MB 限制。

## 文字排版校正 — 用户确认画面都可保留

用户明确反馈“都还行，文字不太行”。问题聚焦于文字，不将它解释为需要重做画面或改写标题。对同一幅文学绘画原图使用内置 imagegen 的参考图编辑模式，保留场景、主体和画风，仅请求重排文字。生成编辑仍可能带来细微笔触变化，因此不声称像素级背景完全一致。

- [A：现代编辑横排](../assets/typography-magazine-study.webp)：现代黑体，缩小引题，主句分为两行并加强层级，中英文重量更一致。
- [B：文学书封竖排](../assets/typography-literary-study.webp)：三列从右至左，主次区分，收窄文字占据的区域。竖排仅是对比方向，不自动成为文学模板默认值。

两版已逐字检查，均保留“审美不够，怎么用 AI 做出更有质感的产品？”完整标题、阅读顺序和标点，未增添副标题。它们是待用户评价的排版探索，不声称用户已经认可哪一版，也未替换现有默认预览。

四种新编辑模板的策划和生成规则已增加：按语义分组和区分主次，字体与画风匹配，中英文字形与重量协调，控制字距、行距和文字占比；避免所有封面都套相同字号的三行大字。原有三种成图方向、三个基础模板、正文规则和用户自定义覆盖不作此轮改动。默认横排，竖排需要用户明确要求；无字开关仍优先。没有新增布局控件或安装操作。

### A 实际编辑提示词

```text
Use case: text-localization.
Edit target: the provided blue-hour painterly seaside article cover.
Change ONLY its typography. Preserve the complete painted scene: same person, pose, paper aperture, houses, light, sea, brushwork, palette and framing. Reconstruct the water behind removed letters in the same brushwork; do not redraw or reinterpret the illustration. Keep the exact 2.35:1 landscape aspect ratio.
The user likes the imagery but dislikes the current large generic Songti title and its equal-size three-line block.
Typography direction A: contemporary editorial magazine, confident but refined modern Chinese sans-serif (humanist Heiti, substantial medium-bold to bold, crisp optical spacing). Chinese and Latin AI must share the same contemporary type family and weight; no Times New Roman Latin mixed with Chinese serif.
Remove ALL existing lettering and set the exact complete title with a deliberate two-level hierarchy:
Small lead-in line: 审美不够，
Main line 1: 怎么用 AI 做出
Main line 2: 更有质感的产品？
Keep these words and punctuation exactly, in this reading order. No paraphrase, omission or added words.
Composition: left text group, about 6.5% inset, slightly below vertical center of the empty left sea area. Main headline about 5% of canvas width in cap/character height, lead-in about 45% of that size. Main lines close, measured line spacing about 1.15; slightly more breathing room between lead-in and headline. Text occupies roughly 43–46% canvas width and 30–35% canvas height, significantly less than the original huge title block. All left-aligned with a clear optical edge. Comfortable quiet space surrounds the block; let the painting remain visible. Main weight carries the idea, lead-in is visibly secondary, avoid a short giant first line.
Color warm ivory, high legibility against the original deep blue. No text panels, outlines, shadow, gradient lettering, decorative underline, rules, pill badges, all-caps extra copy, publication name, date, logo or watermark. Render one complete edited cover, not a side-by-side comparison.
```

### B 实际编辑提示词

```text
Use case: text-localization.
Edit target: the provided original blue painterly seaside article cover.
Change ONLY the lettering and its arrangement. Preserve the illustration's person, posture, coat, paper aperture, houses, sunset, blue sea, rocks, palette, brushwork and whole wide framing. Remove all original lettering, restoring the underlying sea in the same painted style. Do not redesign, crop, add objects or reinterpret the scene. Keep landscape aspect ratio 2.35:1.
Typography direction B: restrained literary BOOK COVER, a careful vertical Chinese typographic composition, not a corporate headline block. The illustration should have substantially more breathing room and visual presence than the previous huge three-line horizontal title.
Set the FULL original title, exactly:
审美不够，怎么用 AI 做出更有质感的产品？
No rewritten copy, no omissions, no new words or added punctuation.
Use three vertical columns, read right to left, each column top to bottom:
Right column: 审美不够，
Middle column: 怎么用 AI 做出
Left column: 更有质感的产品？
The right column is a quieter lead-in, about 60% the size of the other two columns. The two main columns are elegant robust contemporary Chinese Song / humanist serif with moderate stroke contrast, finely drawn but readable, neither hairline nor calligraphy. Warm ivory type, no effects. Set AI upright as one horizontal Latin unit within the middle column, optically matched to the Chinese character size; do not split or rotate A and I. Chinese punctuation must use correct vertical placement. Natural carefully measured vertical character spacing and generous column spacing.
Placement: left half of the sea; main columns around x=12% and x=24% of canvas, small lead-in around x=35%. Shared top optical anchor at about 17% canvas height. Main character height approximately 7–8% canvas height; longest column fits comfortably above 86% canvas height. Total type uses only about the left third of the canvas, not half the image. Keep comfortable edge margins, no image occlusion, no separate text panel.
The effect must feel deliberate, calm, cultured, like a contemporary Chinese literary jacket. No title-sized equal-weight preamble, default office-document appearance, underlines, border, artificial texture on letters, publisher name, cover badge, logo, extra subtitle, date, byline or watermark. Output one complete edited cover, not a comparison or mockup.
```
