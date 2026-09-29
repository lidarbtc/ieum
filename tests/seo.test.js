import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { buildApp, root, outputDirectory } from '../scripts/build.mjs';
import { createSiteServer } from '../scripts/serve.mjs';
import { site } from '../site.config.js';

let head, origin, server;
before(async () => {
  await buildApp();
  const html = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
  head = html.slice(0, html.indexOf('</head>'));
  server = createSiteServer(outputDirectory);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server) {
    server.closeAllConnections();
    await new Promise((done) => server.close(done));
  }
});
const meta = (key) => head.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]+)"`))?.[1];

test('initial HTML contains one canonical URL and complete sharing metadata', () => {
  assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(head.includes('href="https://ieum.lidar.blog/"'));
  assert.equal(meta('og:url'), site.url);
  assert.equal(meta('og:title'), site.title);
  assert.equal(meta('og:type'), 'website');
  assert.equal(meta('og:site_name'), '이음');
  assert.equal(meta('og:locale'), 'ko_KR');
  assert.equal(meta('og:image'), 'https://ieum.lidar.blog/og-image.png');
  assert.equal(meta('og:image:width'), '1200');
  assert.equal(meta('og:image:height'), '630');
  assert.equal(meta('twitter:image'), meta('og:image'));
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert.equal(meta('description'), site.description);
  assert.doesNotMatch(head, /__SEO_HEAD__|noindex|naver-site-verification|google-site-verification/);
});

test('WebSite structured data agrees with the canonical site identity', () => {
  const match = head.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(match);
  const schema = JSON.parse(match[1]);
  assert.equal(schema['@type'], 'WebSite');
  assert.equal(schema.name, '이음');
  assert.equal(schema.url, site.url);
  assert.equal(schema.inLanguage, 'ko-KR');
});

test('favicon and sharing image dimensions match their declarations', async () => {
  for (const [name, width, height] of [
    ['favicon-96x96.png', 96, 96],
    ['apple-touch-icon.png', 180, 180],
    ['og-image.png', 1200, 630],
  ]) {
    const file = await readFile(resolve(outputDirectory, name));
    assert.equal(file.subarray(1, 4).toString(), 'PNG');
    assert.equal(file.readUInt32BE(16), width);
    assert.equal(file.readUInt32BE(20), height);
    assert.ok(file.length < 1_000_000);
  }
  const svg = await readFile(resolve(outputDirectory, 'favicon.svg'), 'utf8');
  assert.match(svg, /viewBox="0 0 96 96"/);
  const ico = await readFile(resolve(outputDirectory, 'favicon.ico'));
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  assert.deepEqual([ico[6], ico[22], ico[38]], [16, 32, 48]);
});

test('build copies public assets and emits a sitemap for the real page only', async () => {
  const source = await readFile(resolve(root, 'public/og-image.png'));
  assert.deepEqual(await readFile(resolve(outputDirectory, 'og-image.png')), source);
  assert.match(await readFile(resolve(outputDirectory, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/ieum\.lidar\.blog\/sitemap\.xml/);
  const sitemap = await readFile(resolve(outputDirectory, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
  assert.match(sitemap, /<loc>https:\/\/ieum\.lidar\.blog\/<\/loc>/);
  assert.doesNotMatch(sitemap, /lastmod|localhost|pages\.dev/);
});

test('static server returns crawler assets with the correct content types', async () => {
  for (const [path, type] of [
    ['/favicon.svg', 'image/svg+xml'],
    ['/favicon.ico', 'image/x-icon'],
    ['/og-image.png', 'image/png'],
    ['/robots.txt', 'text/plain'],
    ['/sitemap.xml', 'application/xml'],
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get('content-type').startsWith(type), path);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  const response = await fetch(origin + '/og-image.png', { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

test('index alias redirects and missing files return a real noindex 404', async () => {
  const alias = await fetch(origin + '/index.html', { redirect: 'manual' });
  assert.equal(alias.status, 301);
  assert.equal(alias.headers.get('location'), '/');
  for (const path of ['/missing-page', '/missing-image.png', '/_redirects']) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
    assert.match(await response.text(), /name="robots" content="noindex"/);
  }
});
