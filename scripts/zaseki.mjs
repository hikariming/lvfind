// 从 zaseki.music-mdata.com（座席表ガイド）抓取日本场馆的座位表数据。
// 站点有 Cloudflare challenge：用本机 Chrome 正常启动（CDP），Playwright 接管。
// 用法：
//   node scripts/zaseki.mjs map    —— 用站内 Google CSE 搜索把 venues.json 的 JP 场馆映射到 detail ID → db/zaseki/map.json
//   node scripts/zaseki.mjs fetch  —— 按 map.json 抓详情页 → db/zaseki/{slug}.json
//   node scripts/zaseki.mjs all    —— map + fetch
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const MODE = process.argv[2] ?? 'all';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223;
const PROFILE = '/tmp/lvfind-chrome-profile';
const BASE = 'https://zaseki.music-mdata.com';
const OUT_DIR = new URL('../db/zaseki/', import.meta.url).pathname;
const MAP_FILE = join(OUT_DIR, 'map.json');

const venues = JSON.parse(readFileSync(new URL('../src/data/venues.json', import.meta.url), 'utf8'))
  .filter((v) => v.countryCode === 'JP');

mkdirSync(OUT_DIR, { recursive: true });

const norm = (s) =>
  (s ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s　「」『』（）()\[\]【】・･\-‐ー―~～:：.。,'’'"]/g, '');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--no-default-browser-check',
    `${BASE}/`,
  ], { stdio: 'ignore' });
  await sleep(3000);
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const page = browser.contexts()[0].pages()[0];
  // 等 CF challenge
  for (let i = 0; i < 40; i++) {
    const t = await page.title().catch(() => '');
    if (t && !t.includes('Just a moment')) break;
    await sleep(1500);
  }
  return { chrome, browser, page };
}

async function goto(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  for (let i = 0; i < 30; i++) {
    const t = await page.title().catch(() => '');
    if (t && !t.includes('Just a moment') && !t.startsWith('Loading ')) break;
    await sleep(1000);
  }
  await sleep(1200); // 懒加载
}

// ---------- map：CSE 搜索 → detail URL ----------
async function searchCse(page, query) {
  const input = page.locator('.gsc-input input[name="search"]').first();
  await input.click();
  await input.fill('');
  await input.fill(query);
  await input.press('Enter');
  await sleep(3000);
  // CSE 结果
  return page.evaluate(() =>
    [...document.querySelectorAll('.gsc-results a.gs-title, .gsc-webResult a.gs-title')]
      .map((a) => ({ title: a.textContent.trim(), href: a.getAttribute('href') }))
      .filter((r) => r.href && /\/detail\/\d+\/\d+/.test(r.href)),
  );
}

function scoreMatch(venue, title) {
  const t = norm(title);
  const keys = [venue.nameLocal, venue.name].filter(Boolean).map(norm);
  if (!t) return 0;
  // 结果标题里完整包含场馆名 → 高分；反之亦然
  for (const k of keys) {
    if (k && (t.includes(k) || k.includes(t))) return 2;
  }
  // 部分重合：取较长 key 的覆盖率
  let best = 0;
  for (const k of keys) {
    if (!k) continue;
    const chars = [...new Set(k)];
    const hit = chars.filter((c) => t.includes(c)).length / chars.length;
    best = Math.max(best, hit);
  }
  return best;
}

async function doMap(page) {
  const map = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, 'utf8')) : {};
  for (const v of venues) {
    if (map[v.id]?.detail) continue; // 已匹配过
    const q = v.nameLocal || v.name;
    console.log(`[map] ${v.id} ← "${q}"`);
    let results = [];
    try {
      results = await searchCse(page, q);
    } catch (e) {
      console.log('  search failed:', e.message);
    }
    const scored = results.map((r) => ({ ...r, score: scoreMatch(v, r.title) }))
      .sort((a, b) => b.score - a.score);
    const top = scored[0];
    map[v.id] = {
      query: q,
      candidates: scored.slice(0, 3),
      detail: top && top.score >= 1 ? top.href : null,
      match: top ? (top.score >= 2 ? 'auto' : top.score >= 1 ? 'weak' : 'none') : 'none',
    };
    console.log(`  → ${map[v.id].match}: ${map[v.id].detail ?? '（无结果）'} ${top?.title ?? ''}`);
    writeFileSync(MAP_FILE, JSON.stringify(map, null, 2));
    await sleep(1500);
  }
  return map;
}

// ---------- fetch：解析详情页 ----------
async function fetchDetail(page, detailPath) {
  const url = detailPath.startsWith('http') ? detailPath : BASE + detailPath;
  await goto(page, url);
  const notFound = await page.evaluate(() =>
    !!document.querySelector('.error-message') || document.title.includes('404'));
  if (notFound) return null;
  return page.evaluate(() => {
    const txt = (el) => el?.textContent.replace(/\s+/g, ' ').trim() ?? null;
    const venueName = txt(document.querySelector('h1.hall-name'));
    const alias = txt(document.querySelector('.hall-name-alias .official-name'));
    const facEl = document.querySelector('h2.hall-facility');
    const facility = facEl ? txt(facEl.childNodes[0]) : null;
    const capacity = txt(document.querySelector('h2.hall-facility .capacity'))?.replace(/[^\d]/g, '');
    const pdf = document.querySelector('.seat-pdf a, .seat-large a')?.getAttribute('href');
    const seatImg = document.querySelector('.seat-large img')?.getAttribute('src');
    const links = {};
    for (const a of document.querySelectorAll('.mdata-link-flex a')) {
      const label = a.textContent.trim();
      links[label] = { href: a.href, title: a.getAttribute('title') };
    }
    // 日程：按月分组，逐 event 行，一行可能多日
    const events = [];
    let ym = null;
    for (const el of document.querySelectorAll('.event-data .month, .event-data a.event-data-flex')) {
      if (el.classList.contains('month')) {
        const m = el.textContent.trim().match(/(\d{4})年(\d{1,2})月/);
        ym = m ? `${m[1]}-${m[2].padStart(2, '0')}` : null;
      } else if (ym) {
        const days = [...el.querySelectorAll('.date em')].map((e) => e.textContent.trim());
        const name = txt(el.querySelector('.event-name'));
        const slug = el.getAttribute('href');
        for (const d of days) events.push({ date: `${ym}-${d.padStart(2, '0')}`, name, slug });
      }
    }
    return { venueName, alias, facility, capacity: capacity ? +capacity : null, pdf, seatImg, links, events };
  });
}

async function doFetch(page, map) {
  for (const v of venues) {
    const m = map[v.id];
    if (!m?.detail) continue;
    const outFile = join(OUT_DIR, `${v.id}.json`);
    if (existsSync(outFile)) continue;
    console.log(`[fetch] ${v.id} ${m.detail}`);
    try {
      const mm = m.detail.match(/\/detail\/(\d+)\/(\d+)/);
      const zid = mm[1], baseHall = +mm[2];
      const halls = [];
      // 抓映射到的 hall，再向后探 2..6 号厅（多厅/多布局场馆），连续 2 个 404 停止
      for (let h = baseHall, misses = 0; h <= baseHall + 6 && misses < 2; h++) {
        const data = await fetchDetail(page, `${BASE}/detail/${zid}/${h}`);
        if (!data) { misses++; continue; }
        misses = 0;
        halls.push({ hallNo: h, ...data });
        await sleep(1200);
      }
      writeFileSync(outFile, JSON.stringify({
        venue: v.id, zasekiId: +zid, url: `${BASE}/detail/${zid}`,
        match: m.match, note: m.note ?? null, fetchedAt: new Date().toISOString(), halls,
      }, null, 2));
      const ev = halls.reduce((s, h) => s + h.events.length, 0);
      console.log(`  ✓ ${halls.map((h) => `${h.facility}${h.capacity}席`).join(' + ')} · ${ev} events`);
    } catch (e) {
      console.log(`  ✗ ${e.message}`);
    }
    await sleep(1500);
  }
}

const { chrome, page } = await launch();
try {
  const map = MODE === 'fetch' ? JSON.parse(readFileSync(MAP_FILE, 'utf8')) : await doMap(page);
  if (MODE !== 'map') await doFetch(page, map);
} finally {
  chrome.kill();
}
process.exit(0);
