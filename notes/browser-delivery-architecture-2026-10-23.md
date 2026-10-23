# 自研浏览器发布：本机直连与服务器同步

日期：2026-10-23。

## 已确认与待明确

用户要求借鉴第三方方法、自行实现，并明确选择“Obsidian 和 Chrome 在不同设备，或希望关闭 Obsidian 后也能处理”。因此采用服务器队列与自研扩展。部署服务器与 HTTPS 域名尚待用户提供；未选择或操作任何已有服务器。只交接主动发送的文章，不同步整库、不导出浏览器登录凭据。

此前为兼容 MultiPost 而提出的“本机网页 → 第三方扩展”方案不再作为自研默认设计。自研可以让扩展直接收任务，取消交接页和第三方确认窗口。只参考架构和公开接口，本轮新模块为独立实现，没有复制候选平台适配器。

## 两条传输路线

```text
同机：Banana → 本机服务 ← 自研 Chrome 扩展 → 目标平台
跨设备：Banana → 服务器任务队列 ← 自研 Chrome 扩展 → 目标平台
```

两条路线的最后一步相同：Chrome 扩展操作用户已登录的平台。服务器队列不会自动获得浏览器登录态，也不会让关闭的 Chrome 执行任务。服务器后台直接发布属于另一条平台 API 路线，需要对应平台支持、账号权限和凭据配置。

| 关注点 | 本机直连 | 服务器任务队列 |
| --- | --- | --- |
| 日常界面 | 点击发送，浏览器直接进入目标编辑器 | 点击发送，配对浏览器领取任务进入编辑器 |
| 首次连接 | 本机配对；插件自动启停服务 | 配对设备；配置托管服务或自建地址 |
| 同机使用 | 路径短，不依赖额外云服务 | 多一次网络传输和远端依赖 |
| 不同设备 | 不直接支持 | 适合 |
| Obsidian 关闭 | 不能继续接收新任务；已送到扩展的任务可由扩展持有 | 已上传任务可由在线浏览器继续处理 |
| Chrome 关闭或退出登录 | 暂停，等待浏览器可用 | 任务可以保留，但网页登录执行仍要等待 |
| 图片与未发布稿 | 保持本机 | 需要上传和暂存，管理容量与清理 |
| 维护 | 配对、端口冲突、断线重连、扩展生命周期 | 再增加服务部署、设备授权、任务租约、存储和可用性 |

用户已确认跨设备与关闭 Obsidian 后保留任务，因此本轮实现服务器路线。扩展使用周期性 HTTPS 请求领取任务，无需额外打开交接网页，也不需要服务器主动连入用户电脑。

Chrome 官方提供扩展 service worker 中 WebSocket 保活示例：Chrome 116 起，定期消息可延长生命周期；实现仍需断线重连和任务恢复。Native Messaging 也能直连本机应用，但需要额外注册 native host，首版未选用。[WebSocket 文档](https://developer.chrome.com/docs/extensions/how-to/web-platform/websockets)、[Native Messaging 文档](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging)。

## 本轮实现

`src/publishing/article-package.js` 提供 `buildArticlePackage()`：输入当前标题、Markdown、已排版 HTML、本地图片引用、封面引用和读取回调，输出可序列化的文章快照。

- 文章 HTML 中的本地图片换成 `banana-asset://id`，以 `imageBindings` 保留每次出现的位置；原始 Markdown 作为来源保留，不宣称已完成跨平台 Markdown 转换。
- 附件携带文件名、MIME、字节数、校验值和 base64；相同内容与 MIME 去重，封面可以引用同一份附件。读取回调中的绝对文件路径不写入附件元数据。
- 缺图、空图、格式不支持、图片过大、文章包过大、位置绑定缺失都在发送前失败。暂定单图 12 MiB、序列化快照 32 MiB，属于我们自己的交接限制，不是平台限制。
- `requestId` 标识一次请求，`snapshotHash` 标识内容快照。相同内容重新打包会有新的请求 ID；是否重试旧任务应由任务层决定，不能拿新请求 ID 当成“不会重复发布”的保证。
- 远程图片保留原链接，本模块不抓取远程内容。浏览器接收端仍需处理实际上传、格式检查和失效链接。

该模块本身没有网络请求、账号凭据、笔记写入或发布副作用。已接入公众号工作台的浏览器发送分支；现有 API 方式继续作为已有配置的默认选择。

- `server/publish-relay.cjs`：单用户私有服务，零第三方运行依赖。一次性配对码区分 Obsidian producer 与 Chrome browser，设备令牌只保存哈希，指定目标浏览器，角色限制、撤销设备、有效期及任务领取租约。任务元数据与文章快照分文件持久化，定时轮询不会重复重写全部图片；结果确定或到期后清除快照。
- `browser-companion/`：独立 Chrome MV3 扩展，首次填写服务器地址及 browser 配对码，按需授予该服务器的访问权限，再主动启用领取任务。使用 `chrome.alarms` 每 30 秒检查，执行期间续约；Chrome 120 起。新建公众号标签页，不覆盖用户正在编辑的稿件。
- 公众号执行代码在公众号页面中读当前登录态、上传附件，保留正文图片位置、使用当前选定封面，调用网页草稿创建接口。只创建草稿，不执行发布/群发。服务端只接收不带网页登录 token 的草稿链接，浏览器内部使用完整编辑链接。未实测公众号当前页面与接口，封面字段和排版仍须账号验收。
- 插件设置新增发送方式及服务器配对/目标浏览器选择，设备密钥放 Obsidian SecretStorage。公众号页复用原底部主按钮，选浏览器方式后变为“发送到浏览器”；任务状态可手动检查，不自动宣称草稿成功。
- 插件先保存任务身份再上传，响应丢失时重用同一 requestId。只领取尚未开始的任务可以超时重排；开始执行后的中断进入 `uncertain`，禁止自动再创建。登录失败等明确未建稿情况可在用户再次发送时重试；结果不明须先检查目标草稿箱。

当前代码为未发行的开发快照，尚未更新现有 BRAT 发行版，也未修改原项目或原 vault。

## 后续实现边界

1. 部署到明确选定的 HTTPS 服务后，做真实跨设备链路；部署目标尚未确定。
2. 当前是每服务实例一个用户空间，不是公开多租户 SaaS。设备令牌限定角色，浏览器只能领取定向给自己的任务；不宣称可直接开放公众注册。
3. 当前默认保留待处理快照 7 天，结果确定后清理；最多 40 个持有快照的任务。使用独立持久化目录，部署时按文章图片量规划容量。后续大图可改对象存储字节上传，不把 base64 JSON 当作最终大规模存储方式。
4. 任务 ID、快照哈希和阶段记录持久化；返回“收到/编辑器已填入/草稿已保存”等实际结果。超时或断线进入待核对，先查询状态再决定重试；不承诺跨平台严格一次发布。
5. 公众号首轮验收：标题、选定封面、两张正文图、段落位置、排版、目标草稿链接。X 单条动态、X Articles、线程另行验收。

## 验证

- 文章包测试覆盖实际公众号排版产物、正文图片顺序与封面去重、缺图中止、单图/总包限制、TypedArray 范围和快照变化。
- 真实 loopback HTTP 集成测试覆盖服务重启持久化、发送端离线后领取、并发领取唯一性、设备角色和定向、一次性配对/撤销、租约、过期清理和结果不明防重。
- 实际插件方法连接测试服务：SecretStorage 保存设备密钥；模拟上传成功但响应丢失，再次点击只恢复原任务，不多建一份。
- 独立临时 Chrome 配置的无头测试运行原生 DOMParser/图片解码，验证附件替换、封面引用、可执行 HTML 移除，以及草稿接口响应丢失返回 `uncertain`。所有平台 HTTP 响应为模拟，没有使用真实账号。
- 构建通过；带独立 Chrome 用例的顺序全回归 **121/121 通过**。一次并行全回归中，原有 X 代理测试未退出，已停止该测试子进程；原测试单独复核通过，随后有超时保护的顺序全回归通过。没有因此修改 X 功能或测试。真实平台落稿、跨设备 HTTPS、扩展安装/休眠恢复、BRAT 实机仍待部署后验收。

## 部署与配对

服务端要求 Node.js 20+，运行文件可单独部署。默认仅监听 `127.0.0.1:39281`，前置 HTTPS 反向代理；代理请求体上限需至少 33 MiB，超时至少 60 秒。环境变量由部署系统注入，密钥不写入仓库：

```sh
# 设置 BANANA_RELAY_ADMIN_TOKEN（至少 24 字符）、BANANA_RELAY_DATA（持久化目录）后运行
node server/publish-relay.cjs
```

管理端为两台设备分别生成一次性配对码，有效期 10 分钟。下面只展示请求形状；没有运行这些命令或生成真实配对码：

```sh
curl -X POST "$BANANA_RELAY_URL/v1/pairing" \
  -H "Authorization: Bearer $BANANA_RELAY_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"role":"producer","label":"我的 Obsidian"}'

curl -X POST "$BANANA_RELAY_URL/v1/pairing" \
  -H "Authorization: Bearer $BANANA_RELAY_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"role":"browser","label":"发布电脑 Chrome"}'
```

Obsidian 在“公众号发布”选择“服务器 → Chrome 浏览器（测试版）”，填写服务地址和 producer 码连接。另一台电脑在 `chrome://extensions` 加载 `browser-companion/`，扩展弹窗填写相同服务地址与 browser 码，主动勾选领取任务。回到 Obsidian 刷新浏览器列表并选择该设备。配置完成后，日常只在公众号预览页点击发送。

本地原生浏览器与全部测试的复现命令（Chrome 使用临时 Profile，不读用户现有 Profile）：

```sh
BANANA_CHROME_TEST_BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run check
# 若并行临时网络测试互相影响，可用顺序且有超时的全回归：
BANANA_CHROME_TEST_BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node --test --test-concurrency=1 --test-timeout=30000 tests/*.test.cjs
```
