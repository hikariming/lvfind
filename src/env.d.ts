/// <reference path="../.astro/types.d.ts" />

// Cloudflare Workers binding（wrangler.jsonc 中的 d1_databases），
// 页面中通过 import { env } from 'cloudflare:workers' 使用 env.DB
interface Env {
  DB: D1Database;
}
