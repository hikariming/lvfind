# lvfind

Astro 7 + @astrojs/cloudflare SSR site (K-pop / J-pop concert listings). Product plan: `PLAN.md`.

## Commands
- `npm run dev` — dev server at http://localhost:4321 (SSR via platformProxy + local D1)
- `npm run build` — build to `dist/` (must pass before finishing a change)
- `node scripts/seed.ts > db/seed.sql` — regenerate seed SQL from `src/data/events.ts`
- `npx wrangler d1 execute lvfind --local --file=db/seed.sql` — seed **local** D1 for `astro dev`
- `npx wrangler d1 execute lvfind --remote --file=db/seed.sql` — seed **remote** D1 (prod)
- `npx wrangler d1 execute lvfind --remote --command "SELECT ..."` — query remote DB

## Conventions
- UI: Material 3 via `@material/web` (registered in `src/scripts/material.ts`); color tokens in `src/styles/tokens.css` (blue seed `#3A7BFF`, light + dark via `data-theme` on `<html>`).
- Map: MapLibre GL + OpenFreeMap tiles, wrapper in `src/scripts/map.ts`; always load it with dynamic `import()` so it doesn't block first paint.
- Data: pages read Cloudflare D1 via `env.DB` (`import { env } from 'cloudflare:workers'`) through `src/lib/db.ts` (`getData`). `src/data/events.ts` holds the types, constants, and seed data (mirrors `db/schema.sql`); event times are venue-local + IANA timezone.
- Pin new dependencies to exact versions published ≥ 7 days ago.
