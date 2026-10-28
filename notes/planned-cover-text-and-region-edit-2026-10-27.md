# 图面文案规划 + 圈选局部修改（2026-10-27，分支 feature/planned-cover-text-and-region-edit）

用户报告的核心问题：封面生成把文章标题原样渲染进图片。要求 AI 根据正文规划适合图面的文字与排版，再配合模板生成；并新增对已生成图片的圈选局部修改。

## 决策 1：图面文案在规划阶段一并产出，而不是独立第二次调用

`TEMPLATE_PLAN_SYSTEM` / `DIRECTION_SYSTEM` 的 JSON 输出扩展 `cover_text {headline, sub}`，与场景规划同一次调用产出。理由：省一次模型调用；文案与场景同源，隐喻和留白互相配合。规划请求里文章原标题改标注为「仅供理解，不要照搬」，并去掉旧的 `templateTextRule` 渲染指令（它会把原标题硬编码进请求，模型必然照抄）。

- 兜底：`parseTemplatePlan` / `parseDirectionBrief` 拿不到可用 `cover_text` 时回退文章标题（`source:'title'`），弱模型不致命。
- 排版仍由模板的 `templateTextRule` 控制（titleTreatment 分支不变），只是输入换成规划的 headline；`title-sub` 新增副文案渲染要求（原来模板模式没有副文案实现，只有自由模式从摘要取一句）。
- UI：封面对话 compose 区新增「图面文案」行（headline/sub 输入 + 来源标记 + 沿用原标题按钮）。改动文案时若 promptSource 为 ai 且有 scene，自动重算 promptDraft；`promptContext` 纳入 coverText 使过期判断正确。cover 对象与 session 均持久化 coverText，编辑/历史恢复时带回。
- 正文配图不受影响（其 text_rule 本就禁止文章标题）；neon-card 本地渲染模板已有独立的文案规划（COPY_PLAN_SYSTEM），不接入本机制。

## 决策 2：圈选修改复用参考图编辑链路，区域用「高亮矩形标注图」表达

所有已接后端（Gemini 内联图、Seedream、OpenRouter、SiliconFlow Qwen-Image-Edit、OpenAI images/edits、Codex CLI）都支持指令式参考图编辑，但 mask 参数只有 OpenAI 一家。为跨后端通用，选**标注图方案**：在原图副本上画半透明橙色矩形 + 边框，作为唯一参考图发送，prompt 给出归一化百分比坐标、只改标记区、区外逐像素保持、结果不得保留标记。

- 备选（未采用）：OpenAI 专属真 mask（`images/edits` 的 mask 字段）精度更高但仅单后端；裁剪-重绘-贴回有接缝问题。真 mask 可作为后续增强，接口处加 options 即可。
- 交互：预览工具栏「圈选修改」按钮 → 自动切到原图预览（canvas 画布模式叠加坐标换算复杂，不值得）→ pointer 拖拽画框（归一化存储，>2% 才生效，防误触点击）→ 图内底部面板输入指令 → `editRegion()` 走 `plugin.image` 单参考图调用，结果存为新候选（cover 记 `regionEdit` 溯源字段，沿用源图 coverText）。
- 限制：neon-card 本地排版封面不支持（重绘会破坏可再编辑的排版属性）。

## 测试

`tests/cover-text.test.cjs`（11 例）：normalize/fallback/长度清理、三档 textLevel 要求、parseDirectionBrief 降级、displayTitle、regionEditPrompt 坐标与保护条款、renderTemplatePrompt 渲染规划文案且旧标题断言措辞更新、title-sub 副文案、buildCoverPrompt 标题仅作上下文。全量 `npm run check` 132 测试 131 通过 1 跳过 0 失败。

## 已知边界

- 规划质量依赖所选文本模型；headline 超 40 字截断，空则回退原标题。
- 标注图方案下模型偶尔仍可能轻微改动区外区域（指令式编辑的固有误差），重要结果可再圈选修正。
- 版本号未 bump：分支未发布，避免与后续发布节奏冲突；合并发布时再统一处理。
