import { text, localizedPath } from '../src/i18n.js';
import { escapeAttribute as escape } from './seo.mjs';

export function renderTemplate(template, language) {
  const routes = { lang: language, homePath: localizedPath('/', language), groupsPath: localizedPath('/groups/', language) };
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => escape(routes[key] ?? text(key, language)));
}

export function languageLink(path, language) {
  const other = language === 'en' ? 'ko' : 'en';
  return `<a class="language-link" data-language-link href="${escape(localizedPath(path, other))}" lang="${other}" hreflang="${other}" aria-label="${other === 'en' ? 'Switch to English' : '한국어로 보기'}">${other === 'en' ? 'EN' : '한국어'}</a>`;
}
