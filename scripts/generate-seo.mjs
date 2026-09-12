/** Generates sitemap.xml and robots.txt into dist/ at build time, using the
 * deploy target's own external URL so nothing here hardcodes a guessed domain.
 * This is a single-page app with hash-based client routing (#view?field=..),
 * which search engines do not index as separate pages, so the sitemap
 * intentionally lists just the one real document rather than every hash
 * route — that would misrepresent routes as crawlable pages they are not. */
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = (process.env.RENDER_EXTERNAL_URL || '').trim().replace(/\/$/, '');

if (!baseUrl) {
  console.log('RENDER_EXTERNAL_URL not set (local/dev build): skipping sitemap.xml and robots.txt generation.');
  process.exit(0);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
`;
fs.writeFileSync(path.join('dist', 'sitemap.xml'), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join('dist', 'robots.txt'), robots);

console.log(`Generated dist/sitemap.xml and dist/robots.txt for ${baseUrl}`);
