// 把 src/data/events.ts 的示例数据导出为 D1 可执行的 SQL。
// 用法：node scripts/seed.ts > db/seed.sql
//       npx wrangler d1 execute lvfind --remote --file=db/seed.sql
import { artists, venues, events } from '../src/data/events.ts';

const q = (v: string | number | null | undefined) =>
  v === null || v === undefined ? 'NULL' : typeof v === 'number' ? String(v) : `'${v.replace(/'/g, "''")}'`;

const artistId = Object.fromEntries(artists.map((a, i) => [a.slug, i + 1]));
const venueId = Object.fromEntries(venues.map((v, i) => [v.id, i + 1]));

const lines: string[] = [
  '-- 由 scripts/seed.ts 生成，勿手改',
  'DELETE FROM events;',
  'DELETE FROM artists;',
  'DELETE FROM venues;',
];

for (const a of artists) {
  lines.push(
    `INSERT INTO artists (slug, name_original, name_local, genre) VALUES (${q(a.slug)}, ${q(a.nameOriginal)}, ${q(a.nameLocal)}, ${q(a.genre)});`,
  );
}

for (const v of venues) {
  lines.push(
    `INSERT INTO venues (slug, name, name_local, type, city, city_slug, city_zh, country_code, timezone, tz_abbr, capacity, lat, lng, address, transit, website) VALUES (${q(v.id)}, ${q(v.name)}, ${q(v.nameLocal)}, ${q(v.type)}, ${q(v.city)}, ${q(v.citySlug)}, ${q(v.cityZh)}, ${q(v.countryCode)}, ${q(v.timezone)}, ${q(v.tzAbbr)}, ${q(v.capacity)}, ${q(v.lat)}, ${q(v.lng)}, ${q(v.address)}, ${q(v.transit)}, ${q(v.website)});`,
  );
}

for (const e of events) {
  lines.push(
    `INSERT INTO events (artist_id, venue_id, tour_name, start_local, ticket_status, on_sale_local, ticket_url, source_url, verified_at) VALUES (${artistId[e.artist]}, ${venueId[e.venue]}, ${q(e.tourName)}, ${q(e.startLocal)}, ${q(e.ticketStatus)}, ${q(e.onSaleLocal)}, ${q(e.ticketUrl)}, ${q(e.sourceUrl)}, ${q(e.verifiedAt)});`,
  );
}

console.log(lines.join('\n'));
