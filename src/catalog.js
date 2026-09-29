import { normalize } from './core.js';
import { languageOf, text } from './i18n.js';
const language = languageOf(location.pathname);
const field = document.querySelector('#group-filter');
const rows = [...document.querySelectorAll('[data-group-search]')];
const empty = document.querySelector('#filter-empty');
if (field) {
  document.querySelector('#catalog-filter').hidden = false;
  function filter() {
    const query = normalize(field.value);
    let count = 0;
    for (const row of rows) {
      row.hidden = !normalize(row.dataset.groupSearch).includes(query);
      if (!row.hidden) count++;
    }
    for (const section of document.querySelectorAll('[data-catalog-section]')) {
      section.hidden = ![...section.querySelectorAll('[data-group-search]')].some((row) => !row.hidden);
    }
    empty.hidden = count !== 0;
    document.querySelector('#filter-status').textContent = query ? text('groupCount', language, {count}) : '';
  }
  field.addEventListener('input', filter);
  const query = new URLSearchParams(location.search).get('q');
  if (query) field.value = query;
  filter();
}
