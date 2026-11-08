import type { Artist, Event, Genre, MapVenue, SeatLayout, Venue, VenueType } from '../data/events';
import { regions } from '../data/events';

// 字段与 src/data/events.ts 的接口保持一致：venue.id 用 slug，event.artist/venue 存 slug。

type Row = Record<string, unknown>;

export async function fetchArtists(db: D1Database): Promise<Artist[]> {
  const { results } = await db.prepare('SELECT slug, name_original, name_local, genre FROM artists ORDER BY slug').all<Row>();
  return results.map((r) => ({ slug: r.slug as string, nameOriginal: r.name_original as string, nameLocal: r.name_local as string | undefined, genre: r.genre as Genre }));
}

export async function fetchVenues(db: D1Database): Promise<Venue[]> {
  const { results } = await db.prepare('SELECT * FROM venues ORDER BY country_code, city, name').all<Row>();
  return results.map((r) => ({
    id: r.slug as string,
    name: r.name as string,
    nameLocal: r.name_local as string | undefined,
    type: r.type as VenueType,
    city: r.city as string,
    citySlug: r.city_slug as string,
    cityZh: r.city_zh as string,
    countryCode: r.country_code as string,
    timezone: r.timezone as string,
    tzAbbr: r.tz_abbr as string,
    capacity: r.capacity as number,
    lat: r.lat as number,
    lng: r.lng as number,
    address: r.address as string,
    transit: r.transit as string,
    website: r.website as string | undefined,
  }));
}

export async function fetchEvents(db: D1Database): Promise<Event[]> {
  const { results } = await db
    .prepare(
      `SELECT e.id, a.slug AS artist, v.slug AS venue, e.tour_name, e.start_local,
              e.ticket_status, e.on_sale_local, e.ticket_url, e.source_url, e.verified_at
       FROM events e
       JOIN artists a ON a.id = e.artist_id
       JOIN venues  v ON v.id = e.venue_id
       ORDER BY e.start_local`,
    )
    .all<Row>();
  return results.map((r) => ({
    id: r.id as number,
    artist: r.artist as string,
    venue: r.venue as string,
    tourName: r.tour_name as string,
    startLocal: r.start_local as string,
    ticketStatus: r.ticket_status as Event['ticketStatus'],
    onSaleLocal: r.on_sale_local as string | undefined,
    ticketUrl: r.ticket_url as string | undefined,
    sourceUrl: r.source_url as string,
    verifiedAt: r.verified_at as string,
  }));
}

export async function fetchSeatLayouts(db: D1Database): Promise<Record<string, SeatLayout[]>> {
  try {
    const { results } = await db
      .prepare(
        `SELECT v.slug AS venue, l.zaseki_id, l.hall_no, l.name, l.name_alias, l.hall_label,
                l.seats, l.seatmap_url, l.seatmap_img, l.seatmap_pdf,
                l.livewalker_url, l.nearest_station, l.parking_url, l.match, l.fetched_at
         FROM venue_seat_layouts l JOIN venues v ON v.id = l.venue_id
         ORDER BY v.slug, l.hall_no`,
      )
      .all<Row>();
    const byVenue: Record<string, SeatLayout[]> = {};
    for (const r of results) {
      (byVenue[r.venue as string] ??= []).push({
        zasekiId: r.zaseki_id as number,
        hallNo: r.hall_no as number,
        name: r.name as string,
        nameAlias: r.name_alias as string | undefined,
        hallLabel: r.hall_label as string,
        seats: r.seats as number | null,
        seatmapUrl: r.seatmap_url as string,
        seatmapImg: r.seatmap_img as string | undefined,
        seatmapPdf: r.seatmap_pdf as string | undefined,
        livewalkerUrl: r.livewalker_url as string | undefined,
        nearestStation: r.nearest_station as string | undefined,
        parkingUrl: r.parking_url as string | undefined,
        match: r.match as string,
        fetchedAt: r.fetched_at as string,
      });
    }
    return byVenue;
  } catch {
    return {}; // 表不存在（老库）时静默降级
  }
}

export interface SiteData {
  artists: Artist[];
  venues: Venue[];
  events: Event[];
  artistBySlug: Record<string, Artist>;
  venueById: Record<string, Venue>;
  layoutsByVenue: Record<string, SeatLayout[]>;
}

async function loadData(db: D1Database): Promise<SiteData> {
  const [artists, venues, events, layoutsByVenue] = await Promise.all([
    fetchArtists(db),
    fetchVenues(db),
    fetchEvents(db),
    fetchSeatLayouts(db),
  ]);
  return {
    artists,
    venues,
    events,
    artistBySlug: Object.fromEntries(artists.map((a) => [a.slug, a])),
    venueById: Object.fromEntries(venues.map((v) => [v.id, v])),
    layoutsByVenue,
  };
}

// 数据缓存：边缘节点 5 分钟 TTL，减少 D1 读取（站点是低频更新数据）。
// 重新灌库后想立即生效，可把 CACHE_KEY 里的版本号 +1。
const CACHE_KEY = 'https://lvfind.internal/data-v2';
const CACHE_TTL = 300;

export async function getData(db: D1Database): Promise<SiteData> {
  try {
    const hit = await caches.default.match(CACHE_KEY);
    if (hit) return (await hit.json()) as SiteData;
  } catch {}
  const data = await loadData(db);
  try {
    await caches.default.put(
      CACHE_KEY,
      new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json', 'Cache-Control': `max-age=${CACHE_TTL}` } }),
    );
  } catch {}
  return data;
}

export const toMapVenue = (v: Venue): MapVenue => ({
  id: v.id,
  name: v.name,
  nameLocal: v.nameLocal ?? '',
  cityZh: v.cityZh,
  citySlug: v.citySlug,
  region: regions[v.countryCode],
  lng: v.lng,
  lat: v.lat,
});
