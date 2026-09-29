import { mountIcons, icon } from './icons.js';
import { analyze, scopedData, shortestPath } from './core.js';
import { resolveGroup, localizeData } from './localized-data.js';
import { languageOf, localizedPath, text } from './i18n.js';
import { groupName, memberName } from './names-en.js';
import { initializeNavigation } from './navigation.js';
import { groupMapPath, pathMapPath } from './groups.js';

const language = languageOf(location.pathname);
const t = (key, values) => text(key, language, values);
const g = (id) => groupName(id, language);
const m = (name) => memberName(name, language);
const initialParams = new URLSearchParams(location.search);
mountIcons();
const menu = document.querySelector('#content-nav');
const menuToggle = document.querySelector('#content-menu-toggle');
const dialogs = [...document.querySelectorAll('dialog')];
const returnFocus = new Map();
const form = document.querySelector('#content-path-form');
const from = document.querySelector('#content-path-from');
const to = document.querySelector('#content-path-to');
const expanded = document.querySelector('#content-path-expanded');
const status = document.querySelector('#content-path-status');
const result = document.querySelector('#content-path-result');
let data, dataPromise;
let defaultsSet = false;

function fallbackFocus() {
  return menuToggle.getClientRects().length ? menuToggle : document.querySelector('header .brand');
}
function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', t(open ? 'closeMenu' : 'openMenu'));
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('pointerdown', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
});

function populateGroups() {
  if (!data) return;
  const { nodes } = scopedData(data, expanded.checked);
  document.querySelector('#content-group-names').replaceChildren(...nodes.map((node) => new Option(node.name, node.name)));
}
async function loadData() {
  if (data) return data;
  status.textContent = t('loading');
  form.querySelector('button[type="submit"]').disabled = true;
  try {
    if (!dataPromise) {
      dataPromise = fetch('/path-data.json').then((response) => {
        if (!response.ok) throw new Error('Path data unavailable');
        return response.json().then(raw => localizeData(raw, language));
      });
    }
    data = await dataPromise;
    populateGroups();
    status.textContent = '';
    return data;
  } catch (error) {
    dataPromise = null;
    status.textContent = t('loadError');
    throw error;
  } finally {
    form.querySelector('button[type="submit"]').disabled = false;
  }
}
function setDefaults() {
  if (defaultsSet) return;
  from.value = g(initialParams.get('from') || document.body.dataset.groupId || '버스터즈');
  to.value = g(initialParams.get('to') || 'aespa');
  expanded.checked = initialParams.get('expanded') === '1' || ['unit', 'external'].includes(document.body.dataset.groupCategory);
  defaultsSet = true;
}
function openDialog(id, trigger) {
  const dialog = document.getElementById(id);
  if (!dialog || dialog.open) return;
  const visibleTrigger = trigger && trigger.getClientRects().length ? trigger : fallbackFocus();
  returnFocus.set(dialog, visibleTrigger);
  setMenu(false);
  dialogs.forEach((other) => { if (other !== dialog && other.open) other.close(); });
  dialog.showModal();
  if (id === 'content-path-dialog') {
    setDefaults();
    loadData().catch(() => {});
  }
}
for (const trigger of document.querySelectorAll('[data-open-dialog]')) {
  trigger.addEventListener('click', () => openDialog(trigger.dataset.openDialog, trigger));
}
for (const dialog of dialogs) {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (dialogs.some((other) => other.open)) return;
    const trigger = returnFocus.get(dialog);
    (trigger?.getClientRects().length ? trigger : fallbackFocus()).focus();
  });
}
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
expanded.addEventListener('change', () => { populateGroups(); result.replaceChildren(); status.textContent = ''; });

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  result.replaceChildren();
  try { await loadData(); } catch { return; }
  const scope = scopedData(data, expanded.checked);
  const resolve = (value) => resolveGroup(scope, value);
  const start = resolve(from.value), end = resolve(to.value);
  if (!start || !end) {
    status.textContent = t('invalidGroup');
    return;
  }
  const { adjacency } = analyze(scope.nodes, scope.edges);
  const path = shortestPath(adjacency, start, end);
  if (!path) {
    status.textContent = t('noPath');
    return;
  }
  status.textContent = '';
  const summary = document.createElement('p');
  summary.className = 'path-summary';
  summary.textContent = t('pathSummary', {edges: path.length - 1, groups: path.length});
  result.append(summary);
  const nodes = new Map(scope.nodes.map((node) => [node.id, node]));
  path.forEach((id, index) => {
    const item = document.createElement('div');
    item.className = 'path-item';
    const link = document.createElement('a');
    link.href = nodes.get(id).recordPath ? localizedPath(nodes.get(id).recordPath, language) : groupMapPath(id, language);
    link.textContent = nodes.get(id).name;
    item.append(link);
    if (index < path.length - 1) {
      const member = document.createElement('p');
      member.textContent = adjacency.get(id).find((entry) => entry.id === path[index + 1]).edge.members.map(m).join(' · ');
      item.append(member);
    }
    result.append(item);
  });
  const mapLink = document.createElement('a');
  mapLink.className = 'dialog-map-link';
  mapLink.href = pathMapPath(start, end, expanded.checked, language);
  mapLink.innerHTML = `${t('pathOnMap')}${icon('up')}`;
  result.append(mapLink);
});
function openLinkedDialog() {
  if (location.hash === '#about') openDialog('about-dialog');
  if (location.hash === '#path') {
    openDialog('content-path-dialog');
    if (initialParams.has('from') && initialParams.has('to')) form.requestSubmit();
  }
}
window.addEventListener('hashchange', openLinkedDialog);
openLinkedDialog();

initializeNavigation(() => {
  const pathOpen = document.querySelector('#content-path-dialog').open;
  const endpoint = (field) => pathOpen ? (data && resolveGroup(data, field.value)) || field.value : null;
  return {
    q: document.querySelector('#group-filter')?.value || null,
    from: endpoint(from),
    to: endpoint(to),
    expanded: expanded.checked ? '1' : null,
    hash: document.querySelector('#about-dialog').open ? '#about' : pathOpen ? '#path' : '',
  };
});
