// 把 db/zaseki/*.json 转成 D1 可执行的 SQL（引用 venues.slug 做关联，幂等重灌）。
// 用法：node scripts/zaseki-sql.mjs > db/zaseki.sql
//       npx wrangler d1 execute lvfind --local --file=db/zaseki.sql
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = new URL('../db/zaseki/', import.meta.url).pathname;
const q = (v) =>
  v === null || v === undefined ? 'NULL' : typeof v === 'number' ? String(v) : `'${String(v).replace(/'/g, "''")}'`;

const station = (links) => {
  const t = links?.['最寄り駅']?.title ?? '';
  const m = t.match(/(.+?駅)からの/);
  return m ? m[1] : null;
};

const lines = [
  '-- 由 scripts/zaseki-sql.mjs 生成，勿手改',
  'DELETE FROM venue_schedule;',
  'DELETE FROM venue_seat_layouts;',
];

for (const f of readdirSync(DIR).filter((f) => f.endsWith('.json') && f !== 'map.json')) {
  const d = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  const vid = `(SELECT id FROM venues WHERE slug=${q(d.venue)})`;
  const fetched = d.fetchedAt;
  for (const h of d.halls) {
    lines.push(
      `INSERT INTO venue_seat_layouts (venue_id, zaseki_id, hall_no, name, name_alias, hall_label, seats, seatmap_url, seatmap_img, seatmap_pdf, livewalker_url, nearest_station, parking_url, match, fetched_at) VALUES (${vid}, ${d.zasekiId}, ${h.hallNo}, ${q(h.venueName)}, ${q(h.alias)}, ${q(h.facility)}, ${q(h.capacity)}, ${q(`${d.url}/${h.hallNo}`)}, ${q(h.seatImg)}, ${q(h.pdf)}, ${q(h.links?.['施設情報']?.href)}, ${q(station(h.links))}, ${q(h.links?.['駐車場']?.href)}, ${q(d.match)}, ${q(fetched)});`,
    );
    for (const e of h.events) {
      lines.push(
        `INSERT INTO venue_schedule (venue_id, zaseki_id, hall_no, event_date, event_name, event_slug, fetched_at) VALUES (${vid}, ${d.zasekiId}, ${h.hallNo}, ${q(e.date)}, ${q(e.name)}, ${q(e.slug)}, ${q(fetched)});`,
      );
    }
  }
}

console.log(lines.join('\n'));
