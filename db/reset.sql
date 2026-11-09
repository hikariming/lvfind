-- 全量重建（库内数据均由 seed 文件生成，可直接删表重建）
-- 用于 schema 变更（如 genre CHECK 增加 'cpop'）：先跑本文件，再 schema/seed/zaseki
DROP TABLE IF EXISTS event_changes;
DROP TABLE IF EXISTS venue_schedule;
DROP TABLE IF EXISTS venue_seat_layouts;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS venues;
