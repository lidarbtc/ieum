import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { site } from '../site.config.js';
import { icon } from '../src/icons.js';
import { groupPath, groupMapPath, createGroupCatalog } from '../src/groups.js';
import { displayNotes } from '../src/notes.js';
import { escapeAttribute as escape, renderSeoHead } from './seo.mjs';

export function githubLink(className = 'github-link') {
  return `<a class="${className}" href="${escape(site.repository)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub 저장소">${icon('github')}<span class="sr-only">GitHub 저장소</span></a>`;
}
function pageShell({ title, description, path, body, css, javascript = '', schemas, aboutMarkup, pathMarkup, navigationJavascript, groupId = '', groupCategory = '' }) {
  return `<!doctype html>
<html lang="ko"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eff7f8">
${renderSeoHead({ title, description, path, schemas })}
<style>${css}</style></head>
<body class="content-page" data-group-id="${escape(groupId)}" data-group-category="${escape(groupCategory)}">
<header><a class="brand" href="/" aria-label="이음, 지도로"><span class="brand-mark" aria-hidden="true"><i></i><i></i></span><span>이음</span></a><nav id="content-nav" aria-label="주요 메뉴"><a class="nav-item" href="/">지도</a><a class="nav-item active" href="/groups/" aria-current="page">그룹 목록</a><button class="nav-item" type="button" data-open-dialog="content-path-dialog" aria-haspopup="dialog" aria-controls="content-path-dialog">경로 찾기</button><button class="nav-item" type="button" data-open-dialog="about-dialog" aria-haspopup="dialog" aria-controls="about-dialog">이음 소개</button></nav>${githubLink()}<button id="content-menu-toggle" class="icon-button content-menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="content-nav">${icon("menu")}</button></header>
<main class="content-main">${body}</main>
<footer class="content-footer"><a href="/">이음</a><a href="/groups/">그룹 목록</a><a href="${escape(site.repository)}" target="_blank" rel="noopener noreferrer">자료와 코드</a></footer>
${aboutMarkup}
${pathMarkup}
${navigationJavascript ? `<script id="content-navigation-script">${navigationJavascript.replace(/<\/script/gi, '<\\/script')}</script>` : ''}
${javascript ? `<script>${javascript.replace(/<\/script/gi, '<\\/script')}</script>` : ''}
</body></html>\n`;
}
function groupAnchor(node) {
  return `<a href="${groupPath(node.id)}">${escape(node.name)}</a>`;
}
function sources(edge) {
  const labels = { 'en.wikipedia.org': '위키백과', 'ko.wikipedia.org': '위키백과', 'www.soompi.com': 'Soompi', 'kprofiles.com': 'Kprofiles', 'kpopping.com': 'kpopping', 'kpop.fandom.com': 'Kpop Wiki' };
  return edge.sources.filter((source) => /^https?:\/\//.test(source)).map((source) => {
    const host = new URL(source).hostname;
    return `<li><a href="${escape(source)}" target="_blank" rel="noopener noreferrer">${escape(labels[host] || host.replace(/^www\./, ''))}${icon('up')}</a></li>`;
  }).join('');
}
function connectionArticle({ node, edge }) {
  const notes = displayNotes(edge.notes || []);
  return `<article class="record-connection" id="connection-${encodeURIComponent(node.id)}">
<div class="record-heading"><h3>${groupAnchor(node)}</h3><a class="map-jump" href="${escape(groupMapPath(node.id))}">지도에서 보기${icon('up')}</a></div>
<p class="record-members">공유 멤버 <span>${escape(edge.members.join(' · '))}</span></p>
${notes.length ? `<div class="record-notes">${notes.map((note) => `<p>${escape(note)}</p>`).join('')}</div>` : ''}
<div class="record-evidence"><span>${edge.evidence === 'profile' ? '프로필·위키' : '기사·공식 자료'}</span><ul>${sources(edge)}</ul></div>
</article>`;
}
function memberRows(group) {
  return group.sharedMembers.map((member) => {
    const links = group.primary.filter(({ edge }) => edge.members.includes(member));
    return `<tr><th scope="row">${escape(member)}</th><td>${links.map(({ node }) => groupAnchor(node)).join('<span class="link-separator">, </span>')}</td></tr>`;
  }).join('');
}
function detailPage(group, css, dialogs) {
  const title = `${group.displayName} 공유 멤버와 연결 그룹 | 이음`;
  const description = `${group.displayName}에서 활동한 멤버들이 함께했던 그룹과 출처를 확인할 수 있습니다.`;
  const url = new URL(group.path, site.url).href;
  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: title, description, inLanguage: site.language, isPartOf: { '@id': `${site.url}#website` }, mainEntity: { '@type': 'MusicGroup', name: group.name } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: '이음', item: site.url },
        { '@type': 'ListItem', position: 2, name: '그룹 목록', item: new URL('groups/', site.url).href },
        { '@type': 'ListItem', position: 3, name: group.name, item: url },
      ] },
    ],
  };
  const body = `<nav class="breadcrumbs" aria-label="현재 위치"><a href="/">이음</a><span>/</span><a href="/groups/">그룹 목록</a><span>/</span><span>${escape(group.name)}</span></nav>
<section class="record-intro"><p class="record-kicker">공유 멤버와 그룹 활동</p><h1>${escape(group.displayName)}</h1><p class="record-lead">${escape(group.name)}에서 활동한 멤버들의 다른 그룹 활동을 모았습니다.</p><a class="record-primary" href="${escape(groupMapPath(group.id))}">${icon('map')}3D 지도에서 보기</a></section>
<section class="member-record"><h2>다른 그룹에서도 활동한 멤버</h2><div class="record-table"><table><thead><tr><th scope="col">멤버</th><th scope="col">함께 활동한 그룹</th></tr></thead><tbody>${memberRows(group)}</tbody></table></div></section>
<section class="connection-record"><h2>연결 근거</h2><div class="record-connections">${group.primary.map(connectionArticle).join('')}</div></section>
${group.additional.length ? `<details class="additional-connections"><summary>유닛·해외·혼성 그룹 연결도 보기</summary>${group.additional.map(connectionArticle).join('')}</details>` : ''}
<div class="record-bottom"><a href="/groups/">다른 그룹 보기${icon('arrow')}</a><a href="${escape(site.repository)}/blob/main/docs/research-notes.md" target="_blank" rel="noopener noreferrer">전체 조사 기록${icon('up')}</a></div>`;
  return pageShell({ title, description, path: group.path, body, css, schemas, ...dialogs, groupId: group.id, groupCategory: group.category });
}
function indexPage(catalog, css, javascript, dialogs) {
  const sections = [
    ['그룹', catalog.filter((group) => !['external', 'unit'].includes(group.category))],
    ['유닛·해외·혼성 그룹', catalog.filter((group) => ['external', 'unit'].includes(group.category))],
  ];
  const body = `<section class="catalog-intro"><h1>그룹별 활동 기록</h1><p>이름을 고르면 공유 멤버와 연결 근거를 볼 수 있어요.</p><div class="catalog-filter" id="catalog-filter" hidden><label class="sr-only" for="group-filter">그룹이나 공유 멤버 찾기</label>${icon('search')}<input id="group-filter" type="search" placeholder="그룹이나 공유 멤버 찾기" autocomplete="off"><span id="filter-status" aria-live="polite"></span></div></section>
<p id="filter-empty" class="filter-empty" hidden>검색 결과가 없어요. <a href="/">지도에서 검색하기</a></p>
${sections.filter(([, groups]) => groups.length).map(([title, groups]) => `<section class="catalog-section" data-catalog-section><h2>${title}</h2><ul class="group-directory">${groups.map((group) => `<li data-group-search="${escape([group.name, ...group.aliases, ...group.sharedMembers].join(' '))}"><a href="${group.path}"><strong>${escape(group.displayName)}</strong><span>${escape(group.sharedMembers.slice(0, 4).join(' · '))}${group.sharedMembers.length > 4 ? ' 외' : ''}</span>${icon('chevron')}</a></li>`).join('')}</ul></section>`).join('')}`;
  const path = '/groups/';
  const title = '그룹별 공유 멤버와 활동 기록 | 이음';
  const description = '같은 멤버가 활동한 여자 아이돌 그룹의 기록. 그룹별 공유 멤버와 연결 근거를 찾아볼 수 있습니다.';
  const schemas = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: new URL(path, site.url).href, description, inLanguage: site.language, isPartOf: { '@id': `${site.url}#website` } };
  return pageShell({ title, description, path, body, css, javascript, schemas, ...dialogs });
}
export async function writeGroupPages({ data, outputDirectory, css, javascript, aboutMarkup, pathMarkup, navigationJavascript }) {
  const dialogs = { aboutMarkup, pathMarkup, navigationJavascript };
  const catalog = createGroupCatalog(data);
  const groupsDirectory = resolve(outputDirectory, 'groups');
  await mkdir(groupsDirectory, { recursive: true });
  await writeFile(resolve(groupsDirectory, 'index.html'), indexPage(catalog, css, javascript, dialogs));
  for (const group of catalog) {
    const directory = resolve(groupsDirectory, group.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), detailPage(group, css, dialogs));
  }
  return catalog;
}

export function createPathData(data, catalog) {
  const paths = new Map(catalog.map((group) => [group.id, group.path]));
  return {
    nodes: data.nodes.map(({ id, name, category }) => ({ id, name, category, recordPath: paths.get(id) || null })),
    edges: data.edges.map(({ a, b, members }) => ({ a, b, members })),
  };
}
