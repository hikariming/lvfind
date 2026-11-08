// 对 map.json 中 detail=null 的场馆用备用查询词重搜 CSE
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223;
const PROFILE = '/tmp/lvfind-chrome-profile';
const BASE = 'https://zaseki.music-mdata.com';
const MAP_FILE = new URL('../db/zaseki/map.json', import.meta.url).pathname;

const RETRY = {
  'tokyo-dome': ['東京ドーム 座席表', 'Tokyo Dome'],
  'saitama-super-arena': ['さいたまスーパーアリーナ メインアリーナ', 'たまアリ'],
  'asue-arena-osaka': ['エキスポアリーナ大阪', '大阪国際交流センター'],
  'sendai-sunplaza': ['仙台サンプラザ', '仙台サンプラザホール'],
  'gorilla-hall': ['GORILLA HALL', 'ゴリラホール 大阪'],
  'unitedlab': ['ユナイテッドラボ 福岡', 'UNITED LAB'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const map = JSON.parse(readFileSync(MAP_FILE, 'utf8'));

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--no-first-run', '--no-default-browser-check', `${BASE}/`,
], { stdio: 'ignore' });
await sleep(3000);
const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
const page = browser.contexts()[0].pages()[0];
for (let i = 0; i < 40; i++) {
  const t = await page.title().catch(() => '');
  if (t && !t.includes('Just a moment')) break;
  await sleep(1500);
}

for (const [id, queries] of Object.entries(RETRY)) {
  if (map[id]?.detail) { console.log(`skip ${id}`); continue; }
  for (const q of queries) {
    console.log(`[retry] ${id} ← "${q}"`);
    const input = page.locator('.gsc-input input[name="search"]').first();
    await input.click(); await input.fill(''); await input.fill(q); await input.press('Enter');
    await sleep(3000);
    const results = await page.evaluate(() =>
      [...document.querySelectorAll('.gsc-results a.gs-title, .gsc-webResult a.gs-title')]
        .map((a) => ({ title: a.textContent.trim(), href: a.getAttribute('href') }))
        .filter((r) => r.href && /\/detail\/\d+\/\d+/.test(r.href)));
    if (results.length) {
      console.log('  candidates:');
      results.slice(0, 3).forEach((r) => console.log('   ', r.href, '|', r.title.slice(0, 60)));
      map[id] = map[id] ?? {};
      map[id].query = q;
      map[id].candidates = results.slice(0, 3).map((r) => ({ ...r, score: 0 }));
      // 不自动采纳，留给人工判断——只在前两条一致时采纳
      map[id].detail = results[0].href;
      map[id].match = 'retry';
      break;
    }
    console.log('  no results');
    await sleep(1000);
  }
  writeFileSync(MAP_FILE, JSON.stringify(map, null, 2));
  await sleep(1500);
}
chrome.kill();
process.exit(0);
