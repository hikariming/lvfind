# lvfind 数据维护工作流

`agent/` 下是**巡检清单**：Agent 定期扫描这些 List，到官方渠道核对演出信息，产出结构化数据，人工审阅后写入 D1。

## 清单

| 文件 | 内容 | Agent 拿它做什么 |
| --- | --- | --- |
| `artists.md` | 艺人名单 + 官方信息渠道 | 逐个查官方公告：新巡演、加场、票务状态、改期/取消 |
| `venues.md`  | 场馆名单 | 新增演出用到的场馆若不在表内，先补场馆资料再入库 |
| `festivals.md` | 音乐节 / 拼盘 / 颁奖礼 | 查阵容和日期，以独立条目录入（artist 可挂拼盘名） |

## Agent 输出格式

产出 `events` JSON 数组（与 `db/schema.sql` 的 events 表对应，人工 diff 后入库）：

```json
[
  {
    "artist_slug": "yoasobi",
    "venue_slug": "tokyo-dome",
    "tour_name": "YOASOBI … TOUR 2026-2027",
    "start_local": "2027-03-14T18:00",
    "ticket_status": "on_sale",
    "on_sale_local": "2027-01-10T12:00",
    "ticket_url": "https://…",
    "source_url": "https://…（官方公告，必填）"
  }
]
```

- `ticket_status` ∈ `announced | presale | on_sale | sold_out | postponed | cancelled`
- 时间一律**演出当地时间**；场馆不在 venues.md 时先补场馆条目（slug/lat/lng/timezone 必填）
- 每条必须带 `source_url`（官方公告 / 票务平台），没有来源不录入
- 取消、改期、新场次 → 列入待审清单；票务状态推进可自动生效
- 变更记录写入 `event_changes`（`changed_by` = `agent:xxx`）

## 入库

```bash
# 生成 seed（src/data/events.ts → SQL）
node scripts/seed.ts > db/seed.sql

# 本地开发库 / 线上库
npx wrangler d1 execute lvfind --local  --file=db/seed.sql
npx wrangler d1 execute lvfind --remote --file=db/seed.sql

# 单场修正
npx wrangler d1 execute lvfind --remote --command \
  "UPDATE events SET ticket_status='sold_out', verified_at=datetime('now') WHERE id=123;"
```
