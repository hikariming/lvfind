# lvfind

Astro 7 + @astrojs/cloudflare SSR site (K-pop / J-pop concert listings). Product plan: `PLAN.md`.

## Commands
- `npm run dev` — dev server at http://localhost:4321 (SSR via platformProxy + local D1)
- `npm run build` — build to `dist/` (must pass before finishing a change)
- `node scripts/seed.ts > db/seed.sql` — regenerate seed SQL from `src/data/events.ts`（会连带清空 zaseki 两表，之后需重跑 `db/zaseki.sql`）
- `npx wrangler d1 execute lvfind --local --file=db/seed.sql` — seed **local** D1 for `astro dev`
- `npx wrangler d1 execute lvfind --remote --file=db/seed.sql` — seed **remote** D1 (prod)
- `npx wrangler d1 execute lvfind --remote --command "SELECT ..."` — query remote DB
- `node scripts/zaseki.mjs map|fetch|all` — 抓 zaseki.music-mdata.com 日本场馆座位表数据 → `db/zaseki/*.json`（用本机 Chrome CDP 过 CF challenge；`map` = 站内 CSE 搜索映射 detail ID）
- `node scripts/zaseki-retry.mjs` — 对 map.json 里没匹配上的场馆换查询词重试
- `node scripts/zaseki-sql.mjs > db/zaseki.sql` — zaseki JSON → SQL（venue_seat_layouts / venue_schedule，幂等重灌）

## Conventions
- UI: Material 3 via `@material/web` (registered in `src/scripts/material.ts`); color tokens in `src/styles/tokens.css` (blue seed `#3A7BFF`, light + dark via `data-theme` on `<html>`).
- Map: MapLibre GL + OpenFreeMap tiles, wrapper in `src/scripts/map.ts`; always load it with dynamic `import()` so it doesn't block first paint.
- Data: pages read Cloudflare D1 via `env.DB` (`import { env } from 'cloudflare:workers'`) through `src/lib/db.ts` (`getData`). `src/data/events.ts` holds the types, constants, and seed data (mirrors `db/schema.sql`); event times are venue-local + IANA timezone.
- zaseki 数据（第三方快照，use=reference）：`db/zaseki/*.json` 是原始抓取结果（可重跑 `zaseki.mjs` 刷新）；`venue_seat_layouts` = 精确席数/座位图链接/最近车站，`venue_schedule` = 场馆全类型日程（用于交叉核对查漏）。`map.json` 里 `match: weak/retry` 的映射需人工复核。
- Pin new dependencies to exact versions published ≥ 7 days ago.
