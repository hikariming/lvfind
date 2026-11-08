# lvfind 产品与技术规划（v2）

> **一句话定位**：全球 K-pop / J-pop 演出信息展示站。打开就能看到整理好的近期演出，帮自己和朋友规划“追星 + 出国旅行”的行程。
>
> 数据由后台 Agent 定期核对维护，**用户侧零 AI、零等待**。

---

## 0. 关键决策速览

| 项目 | 决策 |
| --- | --- |
| 产品形态 | 纯展示站，只读，不做搜索框、不做票务交易 |
| 覆盖范围 | 全球：韩国、日本、中国大陆、香港、澳门、台湾、东南亚、北美、欧洲、大洋洲 |
| 前端框架 | **Astro**（2026 年已并入 Cloudflare，官方一等支持） |
| 部署 | Cloudflare Workers（Static Assets）或 Pages + `@astrojs/cloudflare` 适配器 |
| 数据库 | Cloudflare D1（SQLite） |
| 数据维护 | MVP 阶段：**本地 Agent 脚本**整理 → 人工审阅 → `wrangler d1` 写入；Cron + DeepSeek 自动巡检放到第二阶段 |
| 设计语言 | Material Design 3（M3 Expressive），**蓝色主色**，亲切、动感 |
| 主语言 | 简体中文（艺人名保留原文 + 常用中文名） |

---

## 1. 产品规划

### 1.1 目标用户与场景

1. **我自己**：明年出国旅游，想知道“某个月去某个城市，能顺便看哪场演出”，或者“某个艺人巡演到哪些城市，哪个最方便去”。
2. **朋友们**：打开链接扫一眼，看看最近有没有喜欢的艺人来自己所在城市/附近国家。

核心问题只有一个：**“什么时候、在哪里、谁在演、票能不能买？”**

### 1.2 MVP 功能（只做这些）

1. **演出列表页（首页）**
   - 默认展示今天起未来 90 天的演出，按日期升序。
   - 按月份分组（如 “2027 年 3 月”），月份标题吸顶，便于行程规划。
   - **高信息密度**：默认“紧凑列表”，每场一行（日期 / 时间+时区 / 艺人+巡演 / 城市+场馆 / 票务状态 / 核对时间），一屏可看 12–15 场；可切换“卡片”视图，偏好记在本地。
   - **世界地图联动**（桌面端右侧吸顶，移动端在列表上方）：场馆点位按当前筛选显示场次数，缩小时自动聚合；点击场馆弹出该场馆的场次与“只看这个城市”；鼠标悬停列表行时地图高亮对应场馆。
2. **筛选**
   - 艺人筛选（支持多选 Chip）。
   - **国家/地区筛选**（为旅行规划新增，属于 MVP 必需）。
   - 类型筛选：K-pop / J-pop。
   - 城市筛选（从地图点选）、“只看可购票”。
   - 筛选状态写入 URL Query（如 `/?artist=ive&region=JP&city=tokyo`），方便直接分享给朋友。
3. **演出卡片字段**
   - 艺人（原文名 + 中文名）
   - 演出名称 / 巡演名称
   - 日期 + 开演时间（**显示当地时间**，标注时区，如 `19:00 JST`）
   - 城市 · 国家/地区 · 场馆
   - 票务状态（未开售 / 预售中 / 售票中 / 已售罄 / 已延期 / 已取消）
   - 开售时间（如有）
   - 官方信息链接 / 票务平台链接（只外链，不交易）
   - **“信息最近核对于 X 月 X 日”** 时间戳
4. **演出详情页**（`/events/[id]`）：便于单独分享一场演出，含完整信息、来源链接、关联场馆卡片、同艺人其他场次。
5. **场馆库**
   - `/venues`：全部场馆的世界地图 + 按国家/地区分组的场馆表（城市、类型、容量、即将举行场次）。
   - `/venues/[id]`：场馆详情（地图定位、容量、地址、交通、时区、导航 / 官网链接）、该场馆即将举行的演出、同城其他场馆。
   - 场馆信息是长期维护的“基础数据”，演出通过 `venue_id` 关联；场馆资料一次录入，后续演出复用。
6. **关于页**：说明数据来源、更新频率、免责声明（“以官方公告为准”）。

### 1.3 为旅行规划补充的增强点（按优先级）

| 优先级 | 功能 | 说明 |
| --- | --- | --- |
| ✅ 已做 | 城市视图 `/city/[slug]` | 城市地图 + 本地场馆 + 按月分组演出，适合“我要去东京，看看那周有啥” |
| ✅ 已做 | 艺人视图 `/artist/[slug]` | 统计 + **巡演动线地图**（虚线按日期连接各城市场馆）+ 全部场次 |
| P2 | 日期区间筛选 | 输入出行日期，只看这段时间的演出 |
| P2 | 加入日历（.ics 下载） | 纯静态生成，无需登录 |
| ✅ 已做 | 地图视图 + 场馆库 | 首页地图联动、`/venues` 场馆页 |

### 1.4 明确不做（v1）

- 搜索框 / 实时 AI 查询
- 登录、收藏、提醒推送（放到 v2）
- 票务交易、二手票信息
- 评论 / UGC

### 1.5 内容覆盖与数据来源

| 地区 | 主要信息来源（人工/Agent 核对用） |
| --- | --- |
| 韩国 | 经纪公司官网 / 官方 SNS、Weverse 公告、Interpark Ticket、Melon Ticket、YES24 |
| 日本 | 官方 FC 站、ぴあ（Ticket Pia）、e+、Lawson Ticket |
| 中国大陆 | 大麦、猫眼、主办方官方微博 |
| 香港 / 澳门 | Cityline、HK Ticketing、主办方 SNS |
| 台湾 | KKTIX、拓元（tixcraft）、ibon |
| 东南亚 | Ticketmaster SG、Thai Ticket Major、主办方 SNS |
| 欧美 / 澳洲 | Ticketmaster、AXS、Live Nation |

> 原则：**以艺人/经纪公司官方公告为第一来源**，票务平台为辅。每条记录保存来源 URL。

---

## 2. 技术架构

### 2.1 总体链路

```
                ┌──────────────────────────────┐
  浏览器  ───▶  │ Cloudflare 边缘 (Astro SSR)   │ ──▶ D1 SELECT ──▶ HTML
                │  + Cache API / CDN 缓存       │
                └──────────────────────────────┘
                          ▲
                          │ wrangler d1 execute（审阅后写入）
                          │
              ┌───────────┴────────────┐
              │ 本地 Agent（MVP 阶段）   │  ← 你手动触发
              │ 整理/核对 → 生成 SQL/JSON│
              └────────────────────────┘
```

- 用户请求不触发任何 AI，响应毫秒级。
- 数据每几天才变化一次，页面可在边缘缓存（如 `Cache-Control: s-maxage=3600`），D1 读取量极低，基本落在免费额度内。

### 2.2 渲染策略

两种都可行，推荐 **方案 A**：

- **方案 A（已采用）：Astro SSR + 边缘缓存**
  - `output: 'server'` + `@astrojs/cloudflare`，页面在 Worker 中查询 D1 后渲染；绑定通过 `import { env } from 'cloudflare:workers'` 的 `env.DB` 访问（Astro 6+ 不再用 `Astro.locals.runtime.env`）。
  - 本地开发 `astro dev` 走 platformProxy + 本地 D1（数据用 `wrangler d1 execute --local` 灌入）。
  - 目前筛选用 DOM 属性在客户端完成；演出量过大后（如 >300 场）可切换为 URL Query + 服务端 WHERE。
  - 数据写入后，缓存最长 1 小时内自动生效（或主动 purge）。
- **方案 B：纯静态构建**
  - 构建时从 D1 拉数据生成全部页面，数据更新后触发重新部署。
  - 更极致的性能，但每次改数据都要重新构建；筛选需前端 JS 实现。

> 小的交互（如筛选 Chip 的动画、展开/收起）用 Astro Islands 加少量原生 JS 或 Preact 即可，不引入重型框架。

### 2.3 技术栈

| 层 | 选型 | 备注 |
| --- | --- | --- |
| 框架 | Astro（最新稳定版） | `@astrojs/cloudflare` 适配器 |
| 语言 | TypeScript | |
| 样式 | 原生 CSS + M3 Design Tokens（CSS 变量） | 可选 Tailwind，但 token 仍以 CSS 变量为源 |
| 配色生成 | `@material/material-color-utilities` 或 Material Theme Builder 导出 | 从蓝色种子色生成完整 M3 色板 |
| 组件 | `@material/web`（官方 Web Components）+ 少量自建组件 | 官方库处于维护模式，用于 Tabs / Chips / Buttons / FAB / Ripple 等基础组件；列表行、日期块等自建 |
| 地图 | MapLibre GL JS + OpenFreeMap 矢量瓦片 | 免费、无需 API Key；按主题切换 positron / dark 底图，运行时把水域/陆地染成蓝色系，地名优先显示中文；地图模块动态加载，不阻塞列表首屏 |
| 数据库 | Cloudflare D1 | 通过 binding 访问 |
| 查询 | 原生 SQL 或 Drizzle ORM | MVP 原生 SQL 足够 |
| 部署 | `wrangler deploy` / Git 集成自动部署 | |
| 字体 | Google Sans Flex / Roboto Flex + Noto Sans SC / JP / KR | 中日韩字形都要正确显示 |

### 2.4 目录结构（建议）

```
lvfind/
├─ src/
│  ├─ pages/
│  │  ├─ index.astro            # 演出列表 + 筛选 + 地图联动
│  │  ├─ events/[id].astro      # 演出详情
│  │  ├─ venues/index.astro     # 场馆库（地图 + 表格）
│  │  ├─ venues/[id].astro      # 场馆详情
│  │  ├─ artist/[slug].astro    # 艺人视图
│  │  ├─ city/[slug].astro      # 城市视图
│  │  └─ about.astro
│  ├─ components/EventRow.astro # 演出行（紧凑列表 / 卡片两种形态共用一份 DOM）
│  ├─ scripts/material.ts       # @material/web 组件注册 + 主题切换
│  ├─ scripts/map.ts            # MapLibre 地图封装（聚合、弹窗、高亮、主题）
│  ├─ data/events.ts            # 原型示例数据（之后替换为 D1 查询）
│  ├─ layouts/BaseLayout.astro
│  ├─ lib/db.ts                 # D1 查询封装
│  ├─ lib/format.ts             # 日期/时区格式化
│  └─ styles/
│     ├─ tokens.css             # M3 色彩 / 字体 / 形状 / 动效 token
│     └─ global.css
├─ db/
│  ├─ schema.sql
│  └─ seed/                     # 初始数据（JSON / SQL）
├─ agent/                       # 本地数据维护脚本与 prompt
├─ astro.config.mjs
├─ wrangler.jsonc
└─ PLAN.md
```

### 2.5 数据模型（D1）

```sql
-- 艺人
CREATE TABLE artists (
  id            INTEGER PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,      -- 'ive', 'yoasobi'
  name_original TEXT NOT NULL,             -- '아이브' / 'YOASOBI'
  name_en       TEXT,
  name_zh       TEXT,                      -- '艾薇'
  genre         TEXT NOT NULL CHECK (genre IN ('kpop','jpop')),
  agency        TEXT,
  official_url  TEXT
);

-- 场馆
CREATE TABLE venues (
  id            INTEGER PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,      -- 'tokyo-dome'（场馆页 URL）
  name          TEXT NOT NULL,             -- 'Tokyo Dome'
  name_local    TEXT,                      -- '東京ドーム'
  type          TEXT NOT NULL CHECK (type IN ('dome','stadium','arena','hall')),
  city          TEXT NOT NULL,             -- 'Tokyo'
  city_slug     TEXT NOT NULL,             -- 'tokyo'
  city_zh       TEXT,                      -- '东京'
  country_code  TEXT NOT NULL,             -- ISO 3166-1：'JP' 'KR' 'CN' 'HK' 'TW' 'US'
  timezone      TEXT NOT NULL,             -- IANA：'Asia/Tokyo'
  capacity      INTEGER,
  lat           REAL NOT NULL,             -- 地图点位必填
  lng           REAL NOT NULL,
  address       TEXT,                      -- 当地语言地址
  transit       TEXT,                      -- 交通方式（中文，面向旅行者）
  website       TEXT,
  notes         TEXT,                      -- 座位图、入场注意事项等
  verified_at   TEXT                       -- 场馆资料最近核对时间
);

CREATE INDEX idx_venues_city ON venues(city_slug);

-- 演出（每一场 = 一条记录）
CREATE TABLE events (
  id              INTEGER PRIMARY KEY,
  artist_id       INTEGER NOT NULL REFERENCES artists(id),
  venue_id        INTEGER NOT NULL REFERENCES venues(id),
  tour_name       TEXT,
  title           TEXT NOT NULL,
  start_local     TEXT NOT NULL,           -- 当地时间 '2027-03-14T18:00'
  start_utc       TEXT NOT NULL,           -- 用于排序/过滤
  ticket_status   TEXT NOT NULL CHECK (ticket_status IN
                    ('announced','presale','on_sale','sold_out','postponed','cancelled')),
  on_sale_at_utc  TEXT,
  ticket_url      TEXT,
  source_url      TEXT NOT NULL,           -- 信息来源
  verified_at     TEXT NOT NULL,           -- 最近核对时间（UTC）
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_events_start   ON events(start_utc);
CREATE INDEX idx_events_artist  ON events(artist_id, start_utc);
CREATE INDEX idx_events_venue   ON events(venue_id, start_utc);

-- 变更日志（方便追溯 Agent 改了什么）
CREATE TABLE event_changes (
  id         INTEGER PRIMARY KEY,
  event_id   INTEGER NOT NULL REFERENCES events(id),
  field      TEXT NOT NULL,
  old_value  TEXT,
  new_value  TEXT,
  changed_by TEXT NOT NULL,                -- 'manual' / 'agent:local' / 'agent:deepseek'
  changed_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

**时区要点**：全球演出必须同时存 `start_local` + `timezone` + `start_utc`。页面始终显示**演出当地时间**（旅行者最关心这个），可选附带“北京时间”换算。

### 2.6 首页查询示例

```sql
SELECT e.*, a.name_original, a.name_zh, a.slug AS artist_slug,
       v.name AS venue_name, v.city_zh, v.country_code, v.timezone
FROM events e
JOIN artists a ON a.id = e.artist_id
JOIN venues  v ON v.id = e.venue_id
WHERE e.start_utc >= datetime('now')
  AND e.start_utc <  datetime('now', '+90 days')
  AND (?1 IS NULL OR a.slug = ?1)
  AND (?2 IS NULL OR v.country_code = ?2)
ORDER BY e.start_utc ASC;
```

---

## 3. 数据维护方案

### 3.1 阶段一（MVP）：本地 Agent + 人工审阅

1. 在 `agent/` 下维护一个 prompt + 脚本：给定艺人清单，让本地 Agent（Devin / Claude / DeepSeek 等）查官方公告并输出**严格 JSON**（字段与 `events` 表一致，必须附 `source_url`）。
2. 脚本将 JSON 与现有数据做 diff，输出可读的变更清单（新增 / 修改 / 取消）。
3. **人工确认后**，生成 SQL 并执行：
   ```bash
   wrangler d1 execute lvfind --remote --file=db/patches/2027-01-10.sql
   ```
4. 同时写入 `event_changes`，更新 `verified_at`。

频率：每周 1–2 次，或有大型巡演公布时手动跑一次。

### 3.2 阶段二：Cron 自动巡检（原规划保留）

- Cloudflare Cron Trigger（如每 3 天）唤醒巡检 Worker。
- 拉取未来 60 天的记录，分批发给 DeepSeek 核对：时间、场馆、票务状态、新增场次。
- DeepSeek 返回 JSON → 校验（Zod schema）→ 写回 D1 + 记录变更日志。
- **安全阀**：涉及“取消 / 改期 / 新增”的变更先进入待审核表，不直接上线；仅“票务状态推进”类低风险变更自动生效。
- 注意：DeepSeek 本身不能联网检索，需要在 Worker 中先抓取来源页面内容再交给模型判断，或换用具备联网能力的模型/API。

---

## 4. 设计规范（Material 3 · 蓝色 · 亲切动感）

### 4.1 设计关键词

**亲切、轻快、有节奏感、像应援棒一样明亮。** 参考 M3 Expressive：更大的圆角、更饱满的色彩、弹性动效、强调重点信息的字重对比。

### 4.2 色彩

以蓝色作为 Source/Seed Color，用 Material Theme Builder 或 `material-color-utilities` 生成完整色板（含 Light / Dark 两套）。

| 角色 | 建议值（Light，最终以工具生成为准） | 用途 |
| --- | --- | --- |
| Seed | `#3A7BFF` | 种子色（明亮应援蓝） |
| primary | `#1D5BBF` 左右 | 主按钮、选中的 Chip、链接 |
| on-primary | `#FFFFFF` | |
| primary-container | `#D7E3FF` | 卡片高亮、选中态背景 |
| on-primary-container | `#001849` | |
| secondary | 灰蓝 | 次要标签 |
| tertiary | 暖琥珀色 | 点缀：“即将开售”提示（蓝色系的互补点缀） |
| surface | `#F8F9FD` | 页面底色（带一点蓝调的白） |
| surface-container | `#ECEDF5` 一系 | 卡片底色 |

**票务状态色**（语义色，统一和谐地融入蓝色体系）：

| 状态 | 视觉 |
| --- | --- |
| 未开售 announced | outline 中性 Chip |
| 预售中 presale | tertiary-container（琥珀色） |
| 售票中 on_sale | primary 实心（蓝色，最醒目） |
| 已售罄 sold_out | surface-variant 灰调 + 删除线日期弱化 |
| 延期 / 取消 | error-container |

支持 `prefers-color-scheme` 自动切换暗色模式（暗色下主色变为亮蓝，仍保持应援棒般的点亮感）。

### 4.3 字体

| M3 角色 | 用法 |
| --- | --- |
| Display Small | 首页大标题 “最近有什么演出？” |
| Headline Small | 月份分组标题 “2027 · 3 月” |
| Title Medium（加粗） | 艺人名 |
| Body Medium | 场馆、城市 |
| Label Large | Chip、状态标签、按钮 |

- 拉丁字符：Google Sans Flex / Roboto Flex（可变字重，便于做强调）。
- 中日韩：Noto Sans SC / JP / KR，按 `lang` 属性切换，保证韩文、日文假名、中文简体都显示正确。

### 4.4 形状

- 演出卡片：Extra Large 圆角（28px）。
- 筛选 Chip：Full（胶囊形）。
- 日期块：卡片左侧一个大号圆角方块，显示“14 / MAR / SUN”，日期数字用粗体大字号，形成节奏感。
- 可在空状态 / 页头使用 M3 Expressive 的趣味形状（花瓣、星形、圆角多边形）作为装饰元素。

### 4.5 动效（“动感”的来源）

- 使用 M3 的 **spring（弹性）动效** token：Chip 选中时轻微弹跳缩放，卡片悬停时轻微上浮 + 阴影加深。
- 筛选结果变化时，列表项错落淡入（stagger 30–50ms）。
- 页面切换使用 Astro View Transitions：从列表卡片平滑过渡到详情页。
- “售票中”状态的 Badge 可带一个缓慢呼吸的光点。
- 遵守 `prefers-reduced-motion`，关闭非必要动画。

### 4.6 页面布局草图

```
┌────────────────────────────────────────────┐
│  lvfind ♪                         [☀/☾]    │  ← Top App Bar（粉色调 surface）
├────────────────────────────────────────────┤
│  最近有什么演出？                            │  ← Display
│  已核对 128 场 · 最近更新 1 月 10 日          │
│                                            │
│  [全部] [K-pop] [J-pop]                     │  ← Segmented / Filter Chips
│  地区：(韩国)(日本)(中国)(香港)(台湾)(+)      │
│  艺人：(IVE)(SEVENTEEN)(YOASOBI)(+更多)      │
├────────────────────────────────────────────┤
│  2027 · 3 月                                │  ← Headline
│ ╭──────────────────────────────────────╮   │
│ │ ┌────┐  IVE 아이브                   │   │
│ │ │ 14 │  SHOW WHAT I HAVE World Tour  │   │
│ │ │MAR │  东京 · 日本 · Tokyo Dome      │   │
│ │ │SUN │  18:00 JST     [● 售票中]     │   │
│ │ └────┘  核对于 1 月 10 日   官方 ↗    │   │
│ ╰──────────────────────────────────────╯   │
│ ╭──────────────────────────────────────╮   │
│ │ ...                                  │   │
└────────────────────────────────────────────┘
```

- 移动端优先（朋友们大多用手机打开）；桌面端卡片两列网格。
- 筛选区在移动端可折叠为底部 Sheet。

---

## 5. 路线图

| 阶段 | 内容 | 产出 |
| --- | --- | --- |
| **M0 准备** | 初始化 Astro + Cloudflare 适配器、建 D1、写 schema、生成 M3 粉色 token | 可部署的空站 |
| **M1 MVP** | 首页列表 + 艺人/地区/类型筛选 + 详情页 + 关于页；手工录入 20–30 位艺人、首批演出 | 上线可分享的链接 |
| **M1.5** | 城市视图、艺人视图、暗色模式、View Transitions 动效 | 更适合旅行规划 |
| **M2** | 本地 Agent 脚本 + diff 审阅流程固化；.ics 日历导出；日期区间筛选 | 维护效率提升 |
| **M3** | Cron + DeepSeek 自动巡检、待审核队列 | 半自动维护 |
| **v2** | 登录、收藏艺人、开售提醒（邮件 / Telegram）、多语言（EN / 繁中 / 日 / 韩） | 社交与提醒 |

---

## 6. 风险与注意事项

1. **准确性**：演出信息变动频繁，页面必须显著展示“核对时间”并声明“以官方公告为准”。
2. **版权**：不使用官方宣传图 / 艺人照片（MVP 用纯文字 + 色彩设计即可），避免侵权。
3. **抓取合规**：遵守各票务平台 robots.txt 和服务条款，优先使用官方公告与人工核对。
4. **时区错误**：最常见的 bug 来源。统一以 IANA 时区存储，展示与排序分别使用 local / UTC 字段。
5. **成本**：Workers + D1 + Pages 免费额度对个人展示站绰绰有余；AI 成本只在后台巡检时产生，与访问量无关。

---

## 7. 下一步行动清单

- [ ] 确定首批收录艺人名单（建议 K-pop 15 位 + J-pop 10 位）
- [ ] 用 Material Theme Builder 以 `#3A7BFF` 生成色板并导出 CSS token
- [ ] `npm create cloudflare@latest -- lvfind --framework=astro` 初始化项目
- [ ] `wrangler d1 create lvfind` 并执行 `db/schema.sql`
- [ ] 录入首批种子数据
- [ ] 实现首页 + 筛选，部署上线
