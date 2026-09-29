import { site } from '../site.config.js';

const escapeAttribute = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

export function renderSeoHead() {
  const image = new URL(site.image, site.url).href;
  const metadata = [
    ['name', 'description', site.description],
    ['name', 'robots', 'index, follow, max-image-preview:large'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', site.name],
    ['property', 'og:locale', site.locale],
    ['property', 'og:title', site.title],
    ['property', 'og:description', site.description],
    ['property', 'og:url', site.url],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/png'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', site.imageAlt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', site.title],
    ['name', 'twitter:description', site.description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', site.imageAlt],
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    name: site.name,
    alternateName: site.alternateName,
    url: site.url,
    description: site.description,
    inLanguage: site.language,
  };
  return [
    `<title>${escapeAttribute(site.title)}</title>`,
    ...metadata.map(([attribute, name, content]) => `<meta ${attribute}="${name}" content="${escapeAttribute(content)}">`),
    `<link rel="canonical" href="${escapeAttribute(site.url)}">`,
    '<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">',
    '<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`;
}

export function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeAttribute(site.url)}</loc></url>\n</urlset>\n`;
}
