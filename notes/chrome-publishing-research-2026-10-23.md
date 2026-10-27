# Chrome 发布扩展与 Banana Design 接入调研

核验时间：2026-10-23。此次仅阅读公开文档、GitHub 元数据和源码；没有安装扩展、启动桥接、读取账号凭据或执行发布。以下“支持”除特别说明外是代码路径存在，未完成平台登录后的端到端实测。

## 结论

值得结合，建议优先验证 MultiPost 的平台执行能力，参考 Obsidian to Publish 的本地文章/附件交接结构。Wechatsync 是桥接开发量较小的备选，但公众号封面、排版改写和本地转发入口需要先处理。现阶段不建议把任何候选整套嵌入 Banana Design，也不需要引入 MCP/LLM 才能传文章。

产品流程仍保持“选当前文章 → 配图 → 现有平台预览 → 送到浏览器 → 检查草稿”。复用现有公众号/X 菜单及底部操作；连接方式放设置中，不在原文区新增平台按钮，不另做文章编辑器。以下是源码比较与工程建议，不是已接通的功能。

## 两个主要候选的源码快照

| 项目 | 当前默认分支与核验 commit | 维护证据 | 许可证 |
| --- | --- | --- | --- |
| [Wechatsync](https://github.com/wechatsync/Wechatsync) | `v2` / `a98e42865387285afcc027c61836488748f3b30f` | 默认分支最近提交为 2026-05-27；仓库 `pushed_at` 为 2026-10-17，不能把它解释为默认分支适配器刚维护过 | 根目录 GPL-3.0；CLI 包单独声明 MIT |
| [MultiPost-Extension](https://github.com/leaperone/MultiPost-Extension) | `main` / `a63a5de63d562b13d60bdbc8a8c04998132d82d7` | 2026-10-22 修复依赖覆盖，2026-10-06 优化侧栏管理；代码 package 版本 1.5.1 | 根目录 Apache-2.0 |

以上维护信息来自 [Wechatsync 当前 commit](https://github.com/wechatsync/Wechatsync/commit/a98e42865387285afcc027c61836488748f3b30f)、[MultiPost 当前 commit](https://github.com/leaperone/MultiPost-Extension/commit/a63a5de63d562b13d60bdbc8a8c04998132d82d7) 及 GitHub repository API。许可证直接核对 [Wechatsync LICENSE](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/LICENSE)、[CLI package](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/cli/package.json)、[MultiPost LICENSE](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/LICENSE)。不把 CLI 的 MIT 声明扩展到整个 Wechatsync，也不把任何许可证判断替代具体复用前的审查。Banana Design 当前根包声明 MIT；优先进程/协议互操作，避免直接复制 GPL 适配器进插件。

## Wechatsync：现成桌面桥接比较完整，需补安全边界

### 接入能力

- 已有 CLI、MCP server、Chrome 扩展三部分。CLI 启动 WebSocket 等待扩展连接，默认 9527；后续实例经 HTTP 9528 转发。扩展用户需手动开启 MCP/同步桥接并设置同一 token。MCP 可以 `list_platforms`、`check_auth`、`sync_article`、`extract_article`、`upload_image_file`。[官方 MCP 说明](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/mcp-server/README.md)、[CLI 说明](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/cli/README.md)。
- 这与 Obsidian 桌面插件天然更接近：不要求 Obsidian Electron 里面安装 Chrome 扩展，可以让外部 Chrome 保持登录，由独立桥接承担传输。此处是基于协议的实现判断，未做 Banana Design 接入。
- 核心消息 `syncArticle` 接收 `platforms` 与 `{title, content?, markdown?, cover?}`；`markdown` 非空时优先转 HTML，因此需要保留 Banana Design 已排版 HTML 时应提供 `content`，不要同时传入会覆盖它的 Markdown。返回 `{results, syncId}`，其结果可以包含目标草稿 URL。[扩展 MCP handler](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/extension/src/mcp/client.ts#L325-L371)。
- 网页侧也有兼容 API：`window.$syncer / $poster`、`getAccounts`、`addTask`、`uploadImage`；经 `window.postMessage` 转给扩展。当前代码将普通账户查询、添加同步、上传标为任意页面可调用，敏感白名单仅用于已废弃驱动接口。不能简单认为“有 token”就覆盖了这条网页通道。[注入 API](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/extension/public/inject-api.js)、[content API](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/extension/src/content/api.ts#L148-L281)。

### 图片与文章

- CLI 会识别标准 Markdown `![](path)` 与 HTML `<img src="path">`，按文章文件目录解析相对路径，读取本地图片为 base64，先传到第一个目标平台，再把 URL 改入同步内容。大图有分片上传协议。代码没有识别 Obsidian `![[图片.png]]` 的分支；Banana Design 必须先通过 vault metadata 解析图片，并输出标准 HTML/Markdown 或明确的附件映射。[本地图片解析](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/cli/src/index.ts#L118-L179)、[上传与 URL 改写](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/cli/src/index.ts#L709-L759)、[分片](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/mcp-server/src/ws-bridge.ts#L534-L580)。
- 公众号代码从已登录的 `mp.weixin.qq.com` 页面提取 token/ticket，上传至 `cgi-bin/filetransfer`，调用 `cgi-bin/operate_appmsg?sub=create&type=77` 创建图文，返回 `appmsg_edit` 编辑链接。代码实际完成的是草稿创建；不是群发或正式发布，也不是 `api.weixin.qq.com` 的 AppID/AppSecret 开放接口。[公众号适配器](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/core/src/adapters/platforms/weixin.ts#L89-L331)。README 把这些称为“官方 API”，产品文案应更准确地写“使用浏览器登录态的网页编辑器接口”。
- 公众号非微信来源会重新内联一套默认 CSS、移除外链并上传图片；因此不能直接承诺 Banana Design 预览与最终稿完全一致。源码中公众号封面字段为空，未见使用 `article.cover` 填封面，应单独验收封面是否带入。[内容处理与表单](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/core/src/adapters/platforms/weixin.ts#L163-L306)、[默认排版](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/core/src/adapters/platforms/weixin.ts#L347-L375)。
- README 列有 X、简书、小红书、抖音等支持，但公开适配器目录不含 X，`.gitmodules` 引入 `wechatsync-private-adapters` 私有仓库。可以确认公开公众号实现；不能从开源部分确认 X 的发布模式、长文/线程能力和商店成品一致性。[README 平台表](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/README.md#支持-29-主流平台)、[私有子模块声明](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/.gitmodules)、[公开导出](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/core/src/adapters/platforms/index.ts)。

### 不能直接照搬的地方

- 桥接 `new WebSocketServer({port})` 与 HTTP `.listen(port)` 都没有绑定 `127.0.0.1`；官方文档也明确默认监听所有网卡。HTTP `/request` 接受 `{method,params}`，没有校验请求 token/origin，CORS 为 `*`，随后使用服务端配置 token 转发给扩展。扩展确实会校验 token，但这不能保护前面未鉴权的 HTTP 入口。这是静态代码发现，未进行攻击验证。若选此方案，应先修为 loopback 绑定、HTTP/WS 双向配对鉴权、origin allowlist、长度限制；或完全禁用 HTTP 转发通道。[桥接 server](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/mcp-server/src/ws-bridge.ts#L66-L164)、[扩展 token 校验](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/extension/src/mcp/client.ts#L261-L299)、[服务端附 token](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/mcp-server/src/ws-bridge.ts#L420-L433)。
- README“数据不离开设备”只能理解为账号和文章传输的主链路宣称，不是整个产品无外联的证明：源码有可配置 GA4 模块，构建有 GA 参数且用户未关闭时会发事件。此次未审计商店构建的配置或事件内容，不应宣称成品绝不连第三方。[analytics 模块](https://github.com/wechatsync/Wechatsync/blob/a98e42865387285afcc027c61836488748f3b30f/packages/extension/src/lib/analytics.ts#L1-L85)。

## MultiPost：公众号与 X 两条路径可见，网页接入较清楚

### 接入能力

- TypeScript/React + Plasmo MV3 扩展。`package.json` 配置 `externally_connectable` 只列 `paiban.md` 和 `localhost:2663`；不能理解为任意 Obsidian 窗口可直接 `chrome.runtime.sendMessage`。实际通用网页接入另有 content script 在所有网页接收结构化 `window.postMessage`：`{type:'request',traceId,action,data}`，返回对应 `response`。来源需先经过扩展后台判定信任域名；可用 `MULTIPOST_EXTENSION_REQUEST_TRUST_DOMAIN` 打开扩展授权窗口。[manifest 配置](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/package.json#L72-L86)、[content bridge](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/contents/extension.ts)、[信任域授权](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/background/services/trust-domain.ts)。
- 动作有 `CHECK_SERVICE_STATUS`、`PLATFORMS`、`GET_ACCOUNT_INFOS`、`PUBLISH` 等。`MULTIPOST_EXTENSION_PUBLISH` 立即返回 `{status:'received'}` 并打开扩展发布窗口。它表示任务收到，不是图片已传、草稿成功或内容已发布。后续 `PUBLISH_NOW` 回调主要是已打开的标签页列表，源码还明确指出发布窗口会把任何 callback 当完成；不能直接用于 Banana Design 的“发布成功”状态。[后台消息](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/background/index.ts#L63-L185)。
- `SyncData` 包含 `platforms`、`isAutoPublish` 和内容；文章是 `{title,digest,cover,htmlContent,markdownContent,...}`，动态是 `{title,content,images,videos,tags,...}`。文件为 `{name,url,type?,size?}`。[类型定义](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/common.ts#L8-L64)。
- README 同时宣传扩展 API 与 REST API。当前公开扩展源码中的服务逻辑会在配置 `apiKey` 后每 30 秒向 `multipost.app/api/extension/ping` 通信，可上报精简后的平台资料并接收任务 URL。因此“直接使用扩展”与“使用其云端 REST API”应分开评估；后者不等于本地桥接。此次没有核验云服务计费、服务端实现或数据保留政策。[服务实现](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/background/services/api.ts)、[README](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/docs/README-zh.md#主要功能)。

### 图片与公众号

- 扩展发布窗口通过 `fetch(file.url)` 读取素材并生成自身的 Blob URL；文章内 `<img>` 也先 fetch 再替换。Banana Design 的 `app://`、vault 路径和 Electron 进程 Blob URL 无法原样当成 Chrome 可读资源。推荐在浏览器交接页接收图片字节/data URI，然后由扩展建立本地 Blob；这是对代码的工程判断，需真实跨进程验收，不是已支持 Obsidian 的承诺。[图片处理](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/tabs/publish.tsx#L82-L167)。
- 公众号实现同样抓取网页版 token/ticket，上传正文图片、封面，调用 `operate_appmsg` 创建草稿，最终跳转 `appmsg_edit`，没有看到正式群发操作。它要求提供封面，会做 16:9、1:1、3:4 裁剪；与用户此前“跨尺寸用 AI 重新生成、不直接裁图”的约定不同，需要区分平台强制缩略图裁切与 Banana 原始封面版本。[公众号源码](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/article/weixin.ts#L34-L78)、[创建表单](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/article/weixin.ts#L278-L446)、[主流程与跳转](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/article/weixin.ts#L478-L609)。

### X：默认按填写编辑器理解

- `DynamicX` 等待编辑器，派发 ClipboardEvent 粘贴文字，再把最多 4 个媒体文件读为 File 填入 `<input type=file>`。`isAutoPublish === false` 时到此结束；为 true 时会自动找 Post/发帖按钮点击，或尝试 Cmd/Ctrl+Enter。[X 动态源码](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/dynamic/x.ts)。这条路径是 DOM 自动化，不是 X OAuth 开放 API；页面选择器改变会影响可用性。
- 动态源码未见按长文本自动拆线程；不能把它当 Banana Design 当前 X 线程发布器的直接替代。另有 `ArticleXArticle` DOM 填充路径，但代码自身标注需线上回归，且 X Articles 权限/账号能力未实测。[X Articles 源码](https://github.com/leaperone/MultiPost-Extension/blob/a63a5de63d562b13d60bdbc8a8c04998132d82d7/src/sync/article/xarticle.ts)。

## 初步选择判断

- 要先验证“Obsidian → 公众号草稿”的最短链路：Wechatsync 的桌面 CLI/MCP 接口最现成，但必须先处理桥接监听与鉴权，另验收封面和 CSS 保真。
- 要“公众号 + X 单条图文 + 后续小红书等”并希望公开适配器都可读：MultiPost 的覆盖更适合研究，需一个外部 Chrome 交接页/桥接，不宜把云端 REST API 直接设为默认。
- 两者都不能仅凭消息 `received` 或“已打开编辑页”显示“发布成功”。建议区分：已交给浏览器、图片传输中、草稿已保存、待手动确认；只有可复核的平台响应/URL才记录最终状态。
- 用户授权范围当前是调研。下一步的扩展安装、配对和真实草稿测试应单列为实现/验收工作，本文不代表已经接通。

## Obsidian to Publish：最贴近我们的本地交接参考

仓库 [nextcaicai/obsidian-to-publish](https://github.com/nextcaicai/obsidian-to-publish)，核验快照 `3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e`，根许可证 Apache-2.0。这个项目同时公开 Obsidian 插件和 `chrome-companion/`，可以沿着发送端、传输、接收端查看完整链路。

- `PublishPackageV1` 把文章的标题、Markdown、HTML、纯文本、封面与 `assets[]` 一起发送；每个附件包含 ID、原始引用、文件名、MIME、字节数、base64 等。封面和正文使用 `asset://id` 关联，适合解决 Obsidian `![[图片]]` 到外部浏览器的跨进程问题。[发布包类型](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/src/publishing/types.ts)、[构建发布包](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/src/publishing/package.ts)。
- 本地服务明确绑定 `127.0.0.1`，配对令牌校验，不是把 Obsidian 当成一个已经安装扩展的 Chrome 页面。Chrome 接收后打开目标编辑器、重试填入并返回任务结果。[本地桥接](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/src/publishing/chrome-bridge.ts)、[扩展后台](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/chrome-companion/src/background.js)。这里有手写 WebSocket 解析实现，只借鉴结构，复用前仍需专门审查。
- 不适合当成我们的现成公众号浏览器执行器：它的公众号仍走 Obsidian 中的官方 API；Chrome companion 主要用于其他平台。文档中的 X 是 **X Articles**，不能等同于我们已有的短推线程。[配套扩展说明](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/chrome-companion/README.md)。
- 图片支持有平台差异；companion README 仍写 X/知乎会省略本地图片，而主 README 对部分路径的说明更积极。未逐个平台实测，不能据此承诺本地图片通用可用。后台遇扩展存储过大还会去掉二进制资产并产生 `assets_stripped_for_storage` 警告，Banana 应把这类降级明确作为待处理结果，避免正文无图却显示成功。[后台缓存降级](https://github.com/nextcaicai/obsidian-to-publish/blob/3c9732eac4ebebdc491fc7a59cdb55a0921bfb3e/chrome-companion/src/background.js)。

## SyncCaster：任务协议可参考，macOS 接入还需补齐

仓库 [RyanYipeng/SyncCaster](https://github.com/RyanYipeng/SyncCaster)，快照 `7ba05f4870b9ae25d55ca8acdf1bfeba08045802`，根许可证 MIT。

- 已有 HTTP/MCP → Native Messaging host → Chrome 扩展的桥接，公开协议包含文章创建、目标平台发布、查询任务、取消任务。结果区分 `pending`、`running`、`done`、`failed`、`pending_manual_confirm`，比单一“received”回执更适合借鉴。[协议](https://github.com/RyanYipeng/SyncCaster/blob/7ba05f4870b9ae25d55ca8acdf1bfeba08045802/packages/agent-protocol/src/index.ts)、[扩展任务入口](https://github.com/RyanYipeng/SyncCaster/blob/7ba05f4870b9ae25d55ca8acdf1bfeba08045802/apps/extension/src/background/agent-rpc.ts)。但协议有 `published` 状态，不证明每个平台都有远端落稿验证；公众号适配器的 DOM 填入成功也不能直接解释为正式发布成功。
- HTTP 默认 `127.0.0.1:39123`，比监听所有网卡收敛；该 HTTP 文件未见 token/origin 校验或请求体大小限制，仍需补配对鉴权后再考虑集成。[HTTP 服务](https://github.com/RyanYipeng/SyncCaster/blob/7ba05f4870b9ae25d55ca8acdf1bfeba08045802/apps/agent-bridge/src/http-server.ts)。
- 仓库提供的 native host 安装脚本写入 Linux 的 `~/.config/.../NativeMessagingHosts`，此次未发现对应 macOS 安装器。用户当前在 Mac 上，不应推荐成“装完就能接”。[安装脚本](https://github.com/RyanYipeng/SyncCaster/blob/7ba05f4870b9ae25d55ca8acdf1bfeba08045802/apps/agent-bridge/scripts/install-native-host-linux.mjs)。
- 公众号走 DOM 自动填入；公开 agent 创建文章接口以 `body_md` 为主，没有像前一个候选那样明确的本地附件包字段。保留 Banana 排版和本地图片需另做适配。未在此次公开适配器列表找到 X 短推线程实现。[公众号适配器](https://github.com/RyanYipeng/SyncCaster/blob/7ba05f4870b9ae25d55ca8acdf1bfeba08045802/packages/adapters/src/wechat.ts)。

因此把它放在任务状态和 Native Messaging 架构参考位置，优先级低于前述两条。

## 另一个直接先例：Obsidian WeChat Converter

[DavidLam-oss/obsidian-wechat-converter](https://github.com/DavidLam-oss/obsidian-wechat-converter)，快照 `fa9989c5af48698cb71f6c7b753de1c2ce36dc2f`，根许可证 MIT。它已把浏览器发布助手桥接放进 Obsidian，默认 loopback、配对客户端凭据哈希、HTTP Bearer 校验、超时及异步任务等实现值得参考。[桥接服务](https://github.com/DavidLam-oss/obsidian-wechat-converter/blob/fa9989c5af48698cb71f6c7b753de1c2ce36dc2f/services/wechatsync-bridge.js)、[常量](https://github.com/DavidLam-oss/obsidian-wechat-converter/blob/fa9989c5af48698cb71f6c7b753de1c2ce36dc2f/services/wechatsync-constants.js)。

但是项目也包含扩展授权/远程策略/Pro 许可缓存相关代码；根仓库 MIT 不代表配套商店扩展、远端服务及所有平台能力都已公开且免费。此次未完整审计配套扩展，所以只当桥接代码先例，不把整个产品直接作为依赖。[策略代码](https://github.com/DavidLam-oss/obsidian-wechat-converter/blob/fa9989c5af48698cb71f6c7b753de1c2ce36dc2f/services/obsidian-publisher-policy.js)。

## Banana Design 如何结合

### 已有能力可以复用

核对当前隔离分支 `design/visual-system` 的 `src/main.js`：

- `wechatMarkdown()`、`wechatFormatted()` 已能读取当前文章并生成公众号 HTML；`resolveVaultImage()` 已通过 vault metadata 解析本地图片。
- `copyWechatRichText()` 已把图片读为字节并嵌入 HTML。需要抽出“文章与素材打包”能力供浏览器交接使用，不必再建编辑器或让用户手动导出整篇文章。
- 公众号 `publishWechat()` 当前使用 AppID/AppSecret 的开放接口；浏览器方案是另一条传输方式，使用浏览器已有登录态与网页编辑器接口。二者不能共用一个含糊的“已发布”结果。
- X 已有逐条 `xTweets`、图片和 `postedId`。不能把整篇文章简单塞进扩展就宣布保留线程；必须保留每条顺序、配图、回复关系与重试边界。首轮暂不替换现有线程路径。
- `src/x/oauth2.js` 的 `127.0.0.1:8765` 只是 OAuth 回调服务，不能直接当成浏览器发布桥接。

### 建议结构

```text
当前文章 + 当前选定封面 + 正文配图
           ↓ Banana 打包标题 / 排版 HTML / 原文 / 附件字节
本地配对桥接（仅 loopback；任务 ID；鉴权；大小限制）
           ↓
Chrome 扩展 → 已登录的平台编辑器 / 草稿箱
           ↓ 具体结果：待检查 / 草稿链接 / 缺图 / 失败
Banana 在现有平台页显示结果和打开草稿入口
```

Obsidian 是 Electron 应用；外部 Chrome 的 content script、`chrome.runtime` 和登录态不在同一上下文。MultiPost 的网页 API 可以通过一个受信任的本机交接页调用，或未来开发专用 companion；这两者是可选实现设计，尚未实现。[Chrome 消息机制](https://developer.chrome.com/docs/extensions/develop/concepts/messaging)、[externally_connectable](https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable)。

**优先试验顺序：**

1. 以 MultiPost 做公众号单平台原型：当前文章、选定封面、两张正文图片一起送入浏览器，关闭自动正式发布；核验图片在原段落、封面正确、排版未二次覆盖。
2. 只有打开编辑器，文案写“已送到浏览器，待检查”；拿到并核实草稿结果，才写“已保存草稿”。保留任务 ID，超时后先查询/提示用户检查，不自动重复创建。
3. 若 MultiPost 无法保留样式或可靠回传，改评估 Wechatsync；其封面缺口与本地 HTTP 入口先解决。连接方式均复用现有平台页的最后一步，不在原文添加公众号/X 按钮。
4. 公众号整条链路通过后再单独做 X 短推线程验证；X Articles、单条动态、线程分别验收。

**本次边界：**研究笔记完成；未改插件行为，未安装候选扩展，未做登录态或真实文章投递。源码存在某功能不等于商店构建或当前平台页面已实测通过。
