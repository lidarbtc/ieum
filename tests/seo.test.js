import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { buildApp, root, outputDirectory } from '../scripts/build.mjs';
import { createSiteServer } from '../scripts/serve.mjs';
import { analyze, scopedData, shortestPath } from '../src/core.js';
import { site } from '../site.config.js';
import { createGroupCatalog, groupMapPath, groupPath, pathMapPath } from '../src/groups.js';

let head, origin, server, catalog, homepage;
before(async () => {
  await buildApp();
  const html = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
  homepage = html;
  catalog = createGroupCatalog(JSON.parse(await readFile(resolve(root, 'data/girl-group-graph.json'), 'utf8')));
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

test('build copies public assets and emits a sitemap for all published pages', async () => {
  const source = await readFile(resolve(root, 'public/og-image.png'));
  assert.deepEqual(await readFile(resolve(outputDirectory, 'og-image.png')), source);
  assert.match(await readFile(resolve(outputDirectory, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/ieum\.lidar\.blog\/sitemap\.xml/);
  const sitemap = await readFile(resolve(outputDirectory, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 169);
  for (const group of catalog) assert.ok(sitemap.includes(new URL(group.path, site.url).href));
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


test('home exposes group navigation, GitHub and one requested analytics script', () => {
  assert.match(homepage, /<a[^>]+href="\/groups\/"/);
  assert.match(homepage, /href="https:\/\/github.com\/lidarbtc\/ieum"[^>]+aria-label="GitHub 저장소"/);
  assert.equal((homepage.match(/data-website-id=/g) || []).length, 1);
  assert.ok(head.includes('<script defer src="https://m.lidar.blog/script.js" data-website-id="b71b2849-7487-4800-a0f6-9b08c514501a"></script>'));
  const about = homepage.match(/<dialog id="about-dialog"[\s\S]*?<\/dialog>/)[0];
  assert.match(about, /권은비.*예아.*IZ\*ONE.*Feverse/);
  assert.doesNotMatch(about, /어디까지 조사|2026년|1차 조사/);
});

test('only source-backed groups get records, with stable unique URLs', () => {
  assert.equal(catalog.length, 167);
  assert.equal(new Set(catalog.map(group => group.path)).size, 167);
  assert.ok(!catalog.some(group => group.id === 'BLACKPINK'));
  assert.equal(groupPath('IZ*ONE'), '/groups/izone/');
  assert.equal(groupPath('이달의 소녀'), '/groups/loona/');
  assert.equal(new URL(groupMapPath('이달의 소녀 1/3'), site.url).searchParams.get('group'), '이달의 소녀 1/3');
});

test('every static group page has distinct metadata, member names, evidence and analytics', async () => {
  for (const group of catalog) {
    const html = await readFile(resolve(outputDirectory, 'groups', group.slug, 'index.html'), 'utf8');
    assert.ok(html.includes(`rel="canonical" href="${new URL(group.path, site.url).href}"`), group.id);
    assert.match(html, /공유 멤버와 연결 그룹 \| 이음/);
    for (const member of group.sharedMembers) assert.ok(html.includes(member.replace(/&/g, '&amp;')), `${group.id}: ${member}`);
    assert.equal((html.match(/data-website-id=/g) || []).length, 1, group.id);
    assert.ok(html.includes(groupMapPath(group.id).replace(/&/g, '&amp;')), group.id);
    assert.doesNotMatch(html, /__SEO_HEAD__|__GITHUB_LINK__|WebGLRenderer|middle\.json/);
    for (const {node} of group.links) assert.ok(html.includes(`href="${groupPath(node.id)}"`), `${group.id}: ${node.id}`);
  }
});

test('group index links every record in initial HTML', async () => {
  const html = await readFile(resolve(outputDirectory, 'groups/index.html'), 'utf8');
  for (const group of catalog) assert.ok(html.includes(`href="${group.path}"`), group.id);
  assert.equal((html.match(/data-website-id=/g) || []).length, 1);
});

test('detail routes and Korean slugs work without JavaScript', async () => {
  for (const id of ['Feverse', 'IZ*ONE', '마이달링']) {
    const response = await fetch(origin + groupPath(id));
    assert.equal(response.status, 200, id);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.ok(html.includes(id));
    assert.ok(html.includes('공유 멤버'));
  }
  const withoutSlash = await fetch(origin + '/groups/izone', {redirect:'manual'});
  assert.equal(withoutSlash.status, 301);
  assert.equal(withoutSlash.headers.get('location'), '/groups/izone/');
  const indexAlias = await fetch(origin + '/groups/izone/index.html', {redirect:'manual'});
  assert.equal(indexAlias.status, 301);
  assert.equal(indexAlias.headers.get('location'), '/groups/izone/');
  const missing = await fetch(origin + '/groups/missing-group/');
  assert.equal(missing.status, 404);
});


test('group pages contain matching navigation and local about/path dialogs', async () => {
  const about = homepage.match(/<dialog id="about-dialog"[\s\S]*?<\/dialog>/)[0];
  for (const file of ['groups/index.html', 'groups/feverse/index.html']) {
    const html = await readFile(resolve(outputDirectory, file), 'utf8');
    assert.match(html, /<button[^>]+data-open-dialog="content-path-dialog"[^>]*>경로 찾기<\/button>/);
    assert.match(html, /<button[^>]+data-open-dialog="about-dialog"[^>]*>이음 소개<\/button>/);
    assert.ok(html.includes(about));
    assert.match(html, /<dialog id="content-path-dialog"/);
    assert.match(html, /<script id="content-navigation-script">/);
    assert.ok(html.indexOf('<dialog id="content-path-dialog"') < html.indexOf('<script id="content-navigation-script">'));
    assert.doesNotMatch(html, /<script[^>]+src="\/content-navigation\.js"/);
    assert.doesNotMatch(html, /href="\/#about"|__ABOUT_DIALOG__/);
  }
  const navigation = await readFile(resolve(outputDirectory, 'content-navigation.js'), 'utf8');
  assert.ok(navigation.length < 50_000);
  assert.doesNotMatch(navigation, /WebGLRenderer/);
});

test('content path data preserves graph scope and existing shortest paths', async () => {
  const response = await fetch(origin + '/path-data.json');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  const data = await response.json();
  assert.equal(data.nodes.length, 626);
  const core = scopedData(data);
  assert.equal(core.nodes.length, 617);
  assert.equal(core.edges.length, 159);
  const { adjacency } = analyze(core.nodes, core.edges);
  const path = shortestPath(adjacency, '버스터즈', 'aespa');
  assert.equal(path.length, 8);
  assert.equal(shortestPath(adjacency, 'BLACKPINK', 'aespa'), null);
  assert.deepEqual(shortestPath(adjacency, 'BLACKPINK', 'BLACKPINK'), ['BLACKPINK']);
  assert.equal(data.nodes.find(node => node.id === 'Feverse').recordPath, '/groups/feverse/');
  assert.equal(data.nodes.find(node => node.id === 'BLACKPINK').recordPath, null);
  assert.equal((await fetch(origin + '/content-navigation.js')).status, 200);
});

test('map path links preserve endpoints and expansion without fragment navigation', () => {
  const url = new URL(pathMapPath('이달의 소녀 1/3', 'ARTMS', true), site.url);
  assert.equal(url.searchParams.get('from'), '이달의 소녀 1/3');
  assert.equal(url.searchParams.get('to'), 'ARTMS');
  assert.equal(url.searchParams.get('expanded'), '1');
  assert.equal(url.hash, '');
});
