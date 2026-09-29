import { site, siteFor } from '../site.config.js';
import { localizedPath, languageOf } from '../src/i18n.js';

export const escapeAttribute = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

export function renderAnalyticsScript() {
  return `<script defer src="${escapeAttribute(site.analytics.script)}" data-website-id="${escapeAttribute(site.analytics.websiteId)}"></script>`;
}

export function renderSeoHead({ title, description, path = '/', schemas, language = languageOf(path) } = {}) {
  const identity = siteFor(language);
  title ??= identity.title;
  description ??= identity.description;
  const url = new URL(path, site.url).href;
  const image = new URL(site.image, site.url).href;
  const metadata = [
    ['name', 'description', description],
    ['name', 'robots', 'index, follow, max-image-preview:large'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', identity.name],
    ['property', 'og:locale', identity.locale],
    ['property', 'og:locale:alternate', siteFor(language === 'ko' ? 'en' : 'ko').locale],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', identity.imageAlt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', identity.imageAlt],
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${new URL(localizedPath('/', language), site.url).href}#website`,
    name: identity.name,
    alternateName: identity.alternateName,
    url: new URL(localizedPath('/', language), site.url).href,
    description: identity.description,
    inLanguage: identity.language,
  };
  return [
    `<title>${escapeAttribute(title)}</title>`,
    ...metadata.map(([attribute, name, content]) => `<meta ${attribute}="${name}" content="${escapeAttribute(content)}">`),
    `<link rel="canonical" href="${escapeAttribute(url)}">`,
    ...['ko', 'en', 'x-default'].map(code => `<link rel="alternate" hreflang="${code}" href="${escapeAttribute(new URL(localizedPath(path, code === 'en' ? 'en' : 'ko'), site.url).href)}">`),
    '<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">',
    '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
    `<script type="application/ld+json">${JSON.stringify(schemas || schema).replace(/</g, '\\u003c')}</script>`,
    renderAnalyticsScript(),
  ].join('\n');
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`;
}

export function renderSitemap(paths = ['/']) {
  const entries = [...new Set(paths)].map((path) =>
    `  <url><loc>${escapeAttribute(new URL(path, site.url).href)}</loc>${['ko', 'en', 'x-default'].map(code => `<xhtml:link rel="alternate" hreflang="${code}" href="${escapeAttribute(new URL(localizedPath(path, code === 'en' ? 'en' : 'ko'), site.url).href)}"/>`).join('')}</url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}
