import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { site, siteFor } from '../site.config.js';
import { icon } from '../src/icons.js';
import { groupPath, groupMapPath, createGroupCatalog } from '../src/groups.js';
import { groupName, memberName } from '../src/names-en.js';
import { text, localizedPath } from '../src/i18n.js';
import { displayNotes } from '../src/notes.js';
import { languageLink } from './templates.mjs';
import { escapeAttribute as escape, renderSeoHead } from './seo.mjs';

function context(language) {
  return {
    language,
    t: (key, values) => text(key, language, values),
    g: (id) => groupName(id, language),
    m: (name) => memberName(name, language),
    home: localizedPath('/', language),
    groups: localizedPath('/groups/', language),
  };
}
export function githubLink(className = 'github-link', language = 'ko') {
  const label = text('github', language);
  return `<a class="${className}" href="${escape(site.repository)}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon('github')}<span class="sr-only">${label}</span></a>`;
}
function pageShell({ title, description, path, body, css, javascript = '', schemas, aboutMarkup, pathMarkup, navigationJavascript, groupId = '', groupCategory = '', language = 'ko' }) {
  const { t, home, groups } = context(language);
  return `<!doctype html>
<html lang="${language}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#eff7f8">
${renderSeoHead({ title, description, path, schemas, language })}
<style>${css}</style></head>
<body class="content-page" data-group-id="${escape(groupId)}" data-group-category="${escape(groupCategory)}">
<header><a class="brand" href="${home}" aria-label="${t('mapHomeLabel')}"><span class="brand-mark" aria-hidden="true"><i></i><i></i></span><span>${t('brand')}</span></a><nav id="content-nav" aria-label="${t('mainMenu')}"><a class="nav-item" href="${home}">${t('map')}</a><a class="nav-item active" href="${groups}"${groupId ? '' : ' aria-current="page"'}>${t('groups')}</a><button class="nav-item" type="button" data-open-dialog="content-path-dialog" aria-haspopup="dialog" aria-controls="content-path-dialog">${t('findPath')}</button><button class="nav-item" type="button" data-open-dialog="about-dialog" aria-haspopup="dialog" aria-controls="about-dialog">${t('about')}</button></nav>${languageLink(path, language)}${githubLink('github-link', language)}<button id="content-menu-toggle" class="icon-button content-menu-toggle" type="button" aria-label="${t('openMenu')}" aria-expanded="false" aria-controls="content-nav">${icon('menu')}</button></header>
<main class="content-main">${body}</main>
<footer class="content-footer"><a href="${home}">${t('brand')}</a><a href="${groups}">${t('groups')}</a><a href="${escape(site.repository)}" target="_blank" rel="noopener noreferrer">${t('codeAndData')}</a></footer>
${aboutMarkup}
${pathMarkup}
${navigationJavascript ? `<script id="content-navigation-script">${navigationJavascript.replace(/<\/script/gi, '<\\/script')}</script>` : ''}
${javascript ? `<script>${javascript.replace(/<\/script/gi, '<\\/script')}</script>` : ''}
</body></html>\n`;
}
function groupAnchor(node, ctx) {
  return `<a href="${groupPath(node.id, ctx.language)}">${escape(ctx.g(node.id))}</a>`;
}
function sources(edge, ctx) {
  const labels = { 'en.wikipedia.org': ctx.t('wikipedia'), 'ko.wikipedia.org': ctx.t('wikipedia'), 'www.soompi.com': 'Soompi', 'kprofiles.com': 'Kprofiles', 'kpopping.com': 'kpopping', 'kpop.fandom.com': 'Kpop Wiki' };
  return edge.sources.filter((source) => /^https?:\/\//.test(source)).map((source) => {
    const host = new URL(source).hostname;
    return `<li><a href="${escape(source)}" target="_blank" rel="noopener noreferrer">${escape(labels[host] || host.replace(/^www\./, ''))}${icon('up')}</a></li>`;
  }).join('');
}
function connectionArticle({ node, edge }, ctx) {
  const notes = displayNotes(edge.notes || [], ctx.language);
  return `<article class="record-connection" id="connection-${encodeURIComponent(node.id)}">
<div class="record-heading"><h3>${groupAnchor(node, ctx)}</h3><a class="map-jump" href="${escape(groupMapPath(node.id, ctx.language))}">${ctx.t('viewMap')}${icon('up')}</a></div>
<p class="record-members">${ctx.t('sharedMembers')} <span>${escape(edge.members.map(ctx.m).join(' · '))}</span></p>
${notes.length ? `<div class="record-notes">${notes.map((note) => `<p>${escape(note)}</p>`).join('')}</div>` : ''}
<div class="record-evidence"><span>${ctx.t(edge.evidence === 'profile' ? 'profileEvidence' : 'newsEvidence')}</span><ul>${sources(edge, ctx)}</ul></div>
</article>`;
}
function memberRows(group, ctx) {
  return [...group.sharedMembers].sort((a, b) => ctx.m(a).localeCompare(ctx.m(b), ctx.language)).map((member) => {
    const links = group.primary.filter(({ edge }) => edge.members.includes(member));
    return `<tr><th scope="row">${escape(ctx.m(member))}</th><td>${links.map(({ node }) => groupAnchor(node, ctx)).join('<span class="link-separator">, </span>')}</td></tr>`;
  }).join('');
}
function detailPage(group, css, dialogs, language) {
  const ctx = context(language), { t, g, home, groups } = ctx;
  const title = t('detailTitle', { name: group.displayName });
  const description = t('detailDescription', { name: group.displayName });
  const url = new URL(group.path, site.url).href;
  const homeUrl = new URL(home, site.url).href;
  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: title, description, inLanguage: siteFor(language).language, isPartOf: { '@id': `${homeUrl}#website` }, mainEntity: { '@type': 'MusicGroup', name: g(group.id), alternateName: [...new Set([group.name, ...group.aliases])].filter(name => name !== g(group.id)) } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('brand'), item: homeUrl },
        { '@type': 'ListItem', position: 2, name: t('groups'), item: new URL(groups, site.url).href },
        { '@type': 'ListItem', position: 3, name: g(group.id), item: url },
      ] },
    ],
  };
  const body = `<nav class="breadcrumbs" aria-label="${t('breadcrumbs')}"><a href="${home}">${t('brand')}</a><span>/</span><a href="${groups}">${t('groups')}</a><span>/</span><span>${escape(g(group.id))}</span></nav>
<section class="record-intro"><p class="record-kicker">${t('sharedActivity')}</p><h1>${escape(group.displayName)}</h1><p class="record-lead">${escape(t('recordLead', { name: g(group.id) }))}</p><a class="record-primary" href="${escape(groupMapPath(group.id, language))}">${icon('map')}${t('view3d')}</a></section>
<section class="member-record"><h2>${t('otherMemberships')}</h2><div class="record-table"><table><thead><tr><th scope="col">${t('member')}</th><th scope="col">${t('otherGroups')}</th></tr></thead><tbody>${memberRows(group, ctx)}</tbody></table></div></section>
<section class="connection-record"><h2>${t('evidence')}</h2><div class="record-connections">${group.primary.map(link => connectionArticle(link, ctx)).join('')}</div></section>
${group.additional.length ? `<details class="additional-connections"><summary>${t('expandedConnections')}</summary>${group.additional.map(link => connectionArticle(link, ctx)).join('')}</details>` : ''}
<div class="record-bottom"><a href="${groups}">${t('browseOther')}${icon('arrow')}</a><a href="${escape(site.repository)}/blob/main/docs/research-notes.md" target="_blank" rel="noopener noreferrer">${t('researchNotes')}${icon('up')}</a></div>`;
  return pageShell({ title, description, path: group.path, body, css, schemas, ...dialogs, groupId: group.id, groupCategory: group.category, language });
}
function indexPage(catalog, css, javascript, dialogs, language) {
  const ctx = context(language), { t, m, home, groups: path } = ctx;
  const sections = [
    [t('groupSection'), catalog.filter((group) => !['external', 'unit'].includes(group.category))],
    [t('extraSection'), catalog.filter((group) => ['external', 'unit'].includes(group.category))],
  ];
  const body = `<section class="catalog-intro"><h1>${t('directoryHeading')}</h1><p>${t('directoryIntro')}</p><div class="catalog-filter" id="catalog-filter" hidden><label class="sr-only" for="group-filter">${t('directorySearch')}</label>${icon('search')}<input id="group-filter" type="search" placeholder="${t('directorySearch')}" autocomplete="off"><span id="filter-status" aria-live="polite"></span></div></section>
<p id="filter-empty" class="filter-empty" hidden>${t('emptyDirectory')} <a href="${home}">${t('searchMap')}</a></p>
${sections.filter(([, groups]) => groups.length).map(([title, groups]) => `<section class="catalog-section" data-catalog-section><h2>${title}</h2><ul class="group-directory">${groups.map((group) => `<li data-group-search="${escape([group.name, groupName(group.id, 'en'), ...group.aliases, ...group.sharedMembers, ...group.sharedMembers.map(name => memberName(name, 'en'))].join(' '))}"><a href="${group.path}"><strong>${escape(group.displayName)}</strong><span>${escape(group.sharedMembers.slice(0, 4).map(m).join(' · '))}${group.sharedMembers.length > 4 ? t('moreMembers') : ''}</span>${icon('chevron')}</a></li>`).join('')}</ul></section>`).join('')}`;
  const title = t('directoryTitle'), description = t('directoryDescription');
  const schemas = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: new URL(path, site.url).href, description, inLanguage: siteFor(language).language, isPartOf: { '@id': `${new URL(home, site.url).href}#website` } };
  return pageShell({ title, description, path, body, css, javascript, schemas, ...dialogs, language });
}
export async function writeGroupPages({ data, outputDirectory, css, javascript, aboutMarkup, pathMarkup, navigationJavascript, language = 'ko' }) {
  const dialogs = { aboutMarkup, pathMarkup, navigationJavascript };
  const catalog = createGroupCatalog(data, language);
  const groupsDirectory = resolve(outputDirectory, language === 'en' ? 'en/groups' : 'groups');
  await mkdir(groupsDirectory, { recursive: true });
  await writeFile(resolve(groupsDirectory, 'index.html'), indexPage(catalog, css, javascript, dialogs, language));
  for (const group of catalog) {
    const directory = resolve(groupsDirectory, group.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), detailPage(group, css, dialogs, language));
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
