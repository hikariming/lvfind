-- lvfind 数据库 schema（与 PLAN.md §2.5 一致）
-- 执行：wrangler d1 execute lvfind --remote --file=db/schema.sql

-- 艺人
CREATE TABLE IF NOT EXISTS artists (
  id            INTEGER PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,      -- 'ive', 'yoasobi'（URL）
  name_original TEXT NOT NULL,             -- '아이브' / 'YOASOBI'
  name_local    TEXT,                      -- 当地写法
  name_zh       TEXT,                      -- 常用中文名（可选）
  genre         TEXT NOT NULL CHECK (genre IN ('kpop','jpop','cpop')),
  agency        TEXT,
  official_url  TEXT
);

-- 场馆（基础数据，一次录入长期复用）
CREATE TABLE IF NOT EXISTS venues (
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
  tz_abbr       TEXT NOT NULL,             -- 显示用缩写：'JST'
  capacity      INTEGER,
  lat           REAL NOT NULL,             -- 地图点位必填
  lng           REAL NOT NULL,
  address       TEXT,                      -- 当地语言地址
  transit       TEXT,                      -- 交通方式（中文，面向旅行者）
  website       TEXT,
  notes         TEXT,                      -- 座位图、入场注意事项等
  verified_at   TEXT                       -- 场馆资料最近核对时间
);

CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city_slug);

-- 演出（每一场 = 一条记录）
CREATE TABLE IF NOT EXISTS events (
  id              INTEGER PRIMARY KEY,
  artist_id       INTEGER NOT NULL REFERENCES artists(id),
  venue_id        INTEGER NOT NULL REFERENCES venues(id),
  tour_name       TEXT,
  title           TEXT,                    -- 单场命名时的演出名（可空，取巡演名展示）
  start_local     TEXT NOT NULL,           -- 当地时间 '2027-03-14T18:00'
  ticket_status   TEXT NOT NULL CHECK (ticket_status IN
                    ('announced','presale','on_sale','sold_out','postponed','cancelled')),
  on_sale_local   TEXT,                    -- 开售时间（当地）
  ticket_url      TEXT,
  source_url      TEXT NOT NULL,           -- 信息来源
  verified_at     TEXT NOT NULL,           -- 最近核对时间
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 跨洲行程的排序统一按当地日期字面顺序做（同一个月内的列表够用）；
-- 如需精确排序再按 start_local + timezone 换算 UTC。
CREATE INDEX IF NOT EXISTS idx_events_start  ON events(start_local);
CREATE INDEX IF NOT EXISTS idx_events_artist ON events(artist_id, start_local);
CREATE INDEX IF NOT EXISTS idx_events_venue  ON events(venue_id, start_local);

-- zaseki.music-mdata.com（座席表ガイド）快照：日本场馆的精确席数 / 座位图 / 日程。
-- 第三方参考数据（robots: use=reference），用于核对 venues.capacity、给用户外链座位图、交叉查漏场次。
CREATE TABLE IF NOT EXISTS venue_seat_layouts (
  id              INTEGER PRIMARY KEY,
  venue_id        INTEGER NOT NULL REFERENCES venues(id),
  zaseki_id       INTEGER NOT NULL,        -- /detail/{zaseki_id}/{hall_no}
  hall_no         INTEGER NOT NULL,
  name            TEXT,                    -- zaseki 上的场馆名（可能是冠名，如 'GMOアリーナさいたま'）
  name_alias      TEXT,                    -- 别名行的正式名（如 'さいたまスーパーアリーナ'）
  hall_label      TEXT,                    -- 厅/布局名：'ホール' 'メインアリーナモード' '大ホール'
  seats           INTEGER,                 -- 精确席数
  seatmap_url     TEXT NOT NULL,           -- 座位图详情页（外链给用户）
  seatmap_img     TEXT,                    -- 座位图 PNG（cdn）
  seatmap_pdf     TEXT,                    -- 座位表 PDF（cdn）
  livewalker_url  TEXT,                    -- 施設情報（姊妹站）
  nearest_station TEXT,                    -- 从「最寄り駅」链接提取：'高島町駅'
  parking_url     TEXT,
  match           TEXT NOT NULL,           -- 匹配置信度：auto / weak / retry（weak 需人工复核）
  fetched_at      TEXT NOT NULL,
  UNIQUE(venue_id, zaseki_id, hall_no)
);

CREATE INDEX IF NOT EXISTS idx_layouts_venue ON venue_seat_layouts(venue_id);

-- zaseki 上的场馆日程快照（全类型活动，不限 kpop/jpop；用于交叉核对与发现漏收场次）
CREATE TABLE IF NOT EXISTS venue_schedule (
  id          INTEGER PRIMARY KEY,
  venue_id    INTEGER REFERENCES venues(id),
  zaseki_id   INTEGER NOT NULL,
  hall_no     INTEGER NOT NULL,
  event_date  TEXT NOT NULL,
  event_name  TEXT NOT NULL,
  event_slug  TEXT,                        -- /event/{slug}
  fetched_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vsched_venue ON venue_schedule(venue_id, event_date);
CREATE INDEX IF NOT EXISTS idx_vsched_date  ON venue_schedule(event_date);

-- 音乐节（多舞台拼盘演出）：与 events 里的艺人出演行并存
CREATE TABLE IF NOT EXISTS festivals (
  id            INTEGER PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,        -- 'countdown-japan-2627'
  name          TEXT NOT NULL,
  venue_id      INTEGER NOT NULL REFERENCES venues(id),
  start_date    TEXT NOT NULL,
  end_date      TEXT NOT NULL,
  hours_local   TEXT,                        -- 开场/开演时间说明
  ticket_status TEXT NOT NULL CHECK (ticket_status IN
                    ('announced','presale','on_sale','sold_out','postponed','cancelled')),
  ticket_note   TEXT,
  source_url    TEXT NOT NULL,
  verified_at   TEXT NOT NULL,
  days_json     TEXT NOT NULL,               -- [{date, note?, artists:[...]}]
  links_json    TEXT                         -- 阵容名 -> artist slug
);

-- 变更日志（方便追溯 Agent / 人工改了什么）
CREATE TABLE IF NOT EXISTS event_changes (
  id         INTEGER PRIMARY KEY,
  event_id   INTEGER NOT NULL REFERENCES events(id),
  field      TEXT NOT NULL,
  old_value  TEXT,
  new_value  TEXT,
  changed_by TEXT NOT NULL,                -- 'manual' / 'agent:local' / 'agent:deepseek'
  changed_at TEXT NOT NULL DEFAULT (datetime('now'))
);
