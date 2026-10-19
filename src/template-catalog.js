// Article-led recipes informed by the cited public template categories.
// See notes/template-catalog.md and THIRD_PARTY_NOTICES.md. All previews are original layout diagrams.
const SOURCE_BASE = "https://github.com/freestylefly/awesome-gpt-image-2/blob/63e6176fa01be51c000108dacd72716d3e46784b/docs/templates.md#tpl-";
const RECIPES = [
  [
    "concept-type",
    "概念字体 · 编辑海报",
    "让标题成为画面的一部分",
    "poster",
    "type",
    "#eee6d4",
    "#191d22",
    "#d64b35",
    "用文章核心矛盾决定字形、尺度和负空间，让一个明确物件与标题产生有意义的穿插关系。",
    "Editorial conceptual typography, monumental legible letterforms, one interacting metaphor, restrained vermilion and warm ivory, subtle lithographic grain. Typography and subject share a deliberate visual hierarchy; no word-art effects."
  ],
  [
    "paper-world",
    "层叠纸雕 · 微型世界",
    "适合成长、方法与生活主题",
    "illustration",
    "paper",
    "#efe7d4",
    "#204c49",
    "#d78953",
    "把文章观点变成有前中后景的纸雕场景，明确每层轮廓、遮挡关系与人物动作。",
    "Hand-cut layered paper illustration, visible paper thickness and clean cut edges, sculpted overlapping silhouettes, soft contact shadows, forest teal, apricot and warm cream. Build a coherent small world, never a scrapbook of unrelated icons."
  ],
  [
    "watercolor-field",
    "水彩手记 · 轻盈叙事",
    "适合旅行、自然与生活观察",
    "illustration",
    "watercolor",
    "#f4efe4",
    "#385d63",
    "#dba671",
    "用文章中的地点、物件或行为构成疏朗水彩场景，保留明确焦点和充足呼吸。",
    "Transparent watercolor washes on cold-pressed white paper, pigment blooms, sparse graphite detail, muted sea green and ochre. Preserve crisp focal details within soft edges, generous unpainted space, no glossy digital finish."
  ],
  [
    "knowledge-flow",
    "知识流程 · 清晰路径",
    "解释方法、流程与因果关系",
    "infographic",
    "flow",
    "#f0f3ec",
    "#244749",
    "#d69a39",
    "只从正文提取3至5个真实步骤或因果节点，说明连接方向；不是流程的内容不要硬编顺序。",
    "Precise editorial process infographic with three to five distinct nodes, directional connectors, consistent pictograms, disciplined spacing, ivory field, deep teal and one ochre accent. Few short labels, clear reading order, no decorative dashboard."
  ],
  [
    "side-by-side",
    "双向对比 · 观点对照",
    "解释两种机制或选择的差异",
    "infographic",
    "compare",
    "#f3eee4",
    "#30596a",
    "#d7775b",
    "只比较文章明确出现的两种方案，保持比较维度一致；没有数值就用结构与场景对照，不生成统计图。",
    "Balanced two-part comparison with matched scale and aligned visual criteria, one coherent conceptual contrast, navy versus terracotta on cream. Show structural differences, not unsupported winner badges or numerical superiority."
  ],
  [
    "science-scale",
    "科学尺度 · 由微至宏",
    "适合分层系统与科普解释",
    "infographic",
    "scale",
    "#eaf0f1",
    "#253c54",
    "#d29843",
    "将正文明确存在的层级组织为3至6个递进观察框；单位和倍率只采用正文事实，不编造精确测量。",
    "Scientific editorial atlas with progressive nested observation windows, fine leader lines, detailed focal specimens, calm blue-gray and amber accents. Distinct observable scales, accurate relationships, compact labels rather than paragraphs."
  ],
  [
    "exploded-system",
    "结构拆解 · 原理图解",
    "解释组件、连接与工作原理",
    "other",
    "exploded",
    "#ecf0ef",
    "#31536a",
    "#d99442",
    "挑选文章中的一个真实系统，展示3至5个部件及其连接或分层关系；抽象比喻明确按概念图表达，不捏造产品规格。",
    "Clean exploded technical illustration, aligned layers separated along one assembly axis, precise orthographic or gentle axonometric view, restrained blue-gray linework and amber functional highlights. White technical-paper field, logical connections, no invented dimensions."
  ],
  [
    "isometric-room",
    "等距微缩 · 系统场景",
    "将协作、空间和系统可视化",
    "architecture",
    "iso",
    "#ede9df",
    "#285554",
    "#d48c55",
    "把正文的系统或协作关系变成一个可读的剖切空间，固定等距视角，明确人物与设施的关系。",
    "Isometric cutaway miniature environment, consistent parallel projection, readable rooms and functional pathways, detailed solid materials, warm timber, muted teal and soft daylight. One connected environment, no disconnected floating interface cards."
  ],
  [
    "cinematic-story",
    "电影叙事 · 冲突瞬间",
    "用正在发生的事件承载观点",
    "scene",
    "cinema",
    "#14262c",
    "#ebddbd",
    "#d97842",
    "把文章核心矛盾安排为一个正在发生的动作，明确主体、阻力、前景中景远景和定向光源。",
    "Cinematic editorial still, decisive human action, foreground framing, atmospheric depth, strong directional light, deep petrol shadows and warm amber highlights, subtle film grain. One meaningful event, no montage, no generic AI symbols."
  ],
  [
    "documentary-lens",
    "纪实镜头 · 真实质感",
    "适合人物、工作与日常场景",
    "photo",
    "photo",
    "#dfdad0",
    "#304148",
    "#be8152",
    "从文章提取可观察的真实日常情境，不把比喻伪装成新闻证据；指定人物动作、环境痕迹和自然光。",
    "Editorial documentary photograph aesthetic, natural 35mm perspective, physically plausible daylight, honest material textures, quiet environmental detail, restrained film grain. Deliberate but unforced composition; generated conceptual illustration, never fabricated documentary proof."
  ],
  [
    "ink-landscape",
    "水墨留白 · 东方意境",
    "适合阅读、思考与长期主义",
    "history",
    "ink",
    "#f2efe4",
    "#263c3a",
    "#b65943",
    "用山水、器物或人的行动表达文章观点，黑墨浓淡形成空间，朱色仅作一点强调；不冒用书法家签名或名作构图。",
    "Contemporary ink-wash editorial landscape, expressive wet and dry brush, layered tonal mountains, asymmetric open space, warm rice-paper surface and one restrained cinnabar accent. A small purposeful human presence, no copied masterwork, seals or signature."
  ],
  [
    "object-editorial",
    "物件隐喻 · 棚拍静物",
    "让单个物件解释一个清楚观点",
    "product",
    "object",
    "#e9e2d6",
    "#36534f",
    "#b37d46",
    "选择文章中有依据的一个物件或有清楚解释的物件变形，写明它怎样呈现观点；不要凭空添加品牌、卖点或价格。",
    "Premium editorial still life, one thoughtfully transformed physical object, tactile material detail, sculptural side light, subtle grounded shadow, restrained warm neutral backdrop with muted teal. Concept-led rather than generic e-commerce display; no brand logos, pricing or sales claims."
  ]
];
function previewSvg(kind, bg, ink, accent) {
  const shapes = {
    type: `<text x="28" y="105" font-size="69" font-weight="900" fill="${ink}">IDEA</text><circle cx="246" cy="94" r="44" fill="${accent}" opacity=".8"/><path d="M58 150H278" stroke="${ink}" stroke-width="7"/>`,
    paper: `<path d="M0 140Q90 32 190 115T360 85V220H0" fill="${ink}"/><path d="M0 168Q150 68 360 150V220H0" fill="${accent}"/><path d="M0 192Q200 130 360 185V220H0" fill="#faf4e4"/><circle cx="272" cy="56" r="25" fill="${accent}"/>`,
    watercolor: `<ellipse cx="155" cy="117" rx="115" ry="59" fill="${ink}" opacity=".18"/><ellipse cx="226" cy="100" rx="65" ry="49" fill="${accent}" opacity=".32"/><path d="M53 153Q135 60 212 150T305 113" fill="none" stroke="${ink}" stroke-width="3"/>`,
    flow: [40,145,250].map((x,i)=>`<rect x="${x}" y="80" width="68" height="62" rx="12" fill="${i===1?accent:ink}"/><text x="${x+24}" y="119" fill="white" font-size="22">${i+1}</text>${i<2?`<path d="M${x+74} 111h25m-7-6 7 6-7 6" fill="none" stroke="${ink}" stroke-width="3"/>`:''}`).join(''),
    compare: `<rect x="30" y="48" width="135" height="130" rx="5" fill="${ink}"/><rect x="190" y="48" width="135" height="130" rx="5" fill="${accent}"/><path d="M55 143l27-55 28 55 27-55M215 90h83m-83 25h60m-60 25h83" stroke="${bg}" stroke-width="7" fill="none"/>`,
    scale: [26,43,65].map((r,i)=>`<circle cx="${65+i*111}" cy="112" r="${r}" fill="none" stroke="${i===1?accent:ink}" stroke-width="3"/><circle cx="${65+i*111}" cy="112" r="8" fill="${accent}"/>`).join(''),
    exploded: [0,1,2].map(i=>`<path d="M180 ${43+i*50}l83 31-83 31-83-31z" fill="${i===1?accent:ink}" opacity="${1-i*.18}"/>`).join(''),
    iso: `<path d="M180 35l111 61v77l-111 44-111-62V96z" fill="${accent}"/><path d="M180 35v120l111-59M180 155l-111-59v59l111 62z" fill="${ink}"/><path d="M180 155l111-59v77l-111 44z" fill="#c6d7c9"/>`,
    cinema: `<path d="M0 174L108 43l86 131 95-114 71 114V220H0" fill="${ink}"/><path d="M230 15L130 220H360z" fill="${accent}" opacity=".35"/><circle cx="181" cy="128" r="9" fill="${bg}"/><path d="M181 139v37m0-22-18 12m18-12 17 9m-17 13-12 27m12-27 12 27" stroke="${bg}" stroke-width="5"/>`,
    photo: `<rect x="48" y="35" width="266" height="155" fill="${ink}"/><path d="M53 165L150 70l75 112M207 38v145m22-145v145" stroke="${accent}" stroke-width="7"/><circle cx="134" cy="101" r="22" fill="${bg}"/><path d="M95 178q5-64 40-49t43 49" fill="${bg}"/>`,
    ink: `<path d="M18 176L96 51l37 75 50-93 74 116 49-49 44 76" stroke="${ink}" stroke-width="6" fill="${ink}" opacity=".65"/><path d="M10 202Q167 145 350 195" stroke="${ink}" stroke-width="2" fill="none"/><circle cx="283" cy="50" r="16" fill="${accent}"/>`,
    object: `<ellipse cx="182" cy="179" rx="89" ry="12" fill="${ink}" opacity=".13"/><path d="M132 74h100l-13 100h-74z" fill="${ink}"/><path d="M156 84l28-37 28 37-28 38z" fill="${accent}"/><path d="M239 91q62-5 38 50h-44" stroke="${ink}" stroke-width="13" fill="none"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="230" viewBox="0 0 360 230"><rect width="360" height="230" fill="${bg}"/>${shapes[kind]}<rect y="210" width="360" height="20" fill="${bg}"/><text x="12" y="224" font-family="sans-serif" font-size="10" fill="${ink}">LAYOUT STUDY / 构图示意 · 非生成效果</text></svg>`;
}
const ARTICLE_RULES = '从当前文章提取一个有依据的观点和可绘制主体。尊重用户指定画幅，不固定为竖版海报。不得编造数字、收益、评价、引语或文章未支持的事实；资料不足时少放标签。每次只策划一张，多个候选改变核心场景而不只换颜色。';
const EXTRA_TEMPLATES = RECIPES.map(([id,name,description,category,kind,bg,ink,accent,planning,visual]) => ({
  id: 'gpt-'+id, name, description, titleTreatment: 'adaptive',
  sourceUrl: SOURCE_BASE+category, sourceLabel: 'Awesome GPT Image · 分类参考',
  previewSvg: previewSvg(kind,bg,ink,accent), previewKind: 'schematic',
  planningPrompt: ARTICLE_RULES+planning+'封面只使用用户标题，不添加虚构副标题；用英文描述可绘制场景。',
  imagePrompt: 'Create one finished article cover.\nScene: {concept}\n'+visual+'\nCanvas: {width} x {height} px, aspect ratio {ratio}. Compose specifically for this ratio with 6 percent safe margins.\n{text_rule}\nNo watermarks, signatures, unrelated labels, fake metrics, brands, multi-option moodboards or reference-site UI.',
  figurePlanningPrompt: ARTICLE_RULES+planning+'为当前正文段落解释关系，不复制封面版式，不放文章标题。短标签只能来自该段落，除非用户要求，不加入其他文字。',
  figurePrompt: 'Create one article-body illustration explaining the supplied paragraph.\nScene: {concept}\n'+visual+'\nCanvas: {width} x {height} px, aspect ratio {ratio}, with 6 percent safe margins.\n{text_rule}\nNever render the article headline or carry over a fixed cover layout. For the typography style, express the concept with shapes and objects when short labels are not requested. No invented data, quotes, numerical scales, logos or watermarks.',
  defaults: {textLevel: 'title'}
}));
module.exports = { EXTRA_TEMPLATES };
