const normalize = (value) => value.normalize('NFKC').toLowerCase().replace(/[\s.*:_!()·/\-]/g, '');
const field = document.querySelector('#group-filter');
const rows = [...document.querySelectorAll('[data-group-search]')];
const empty = document.querySelector('#filter-empty');
if (field) {
  document.querySelector('#catalog-filter').hidden = false;
  field.addEventListener('input', () => {
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
    document.querySelector('#filter-status').textContent = query ? `${count}개 그룹` : '';
  });
}
