import { mountIcons, icon } from './icons.js';
import { analyze, normalize, scopedData, shortestPath } from './core.js';
import { aliases } from './group-names.js';
import { groupMapPath, pathMapPath } from './groups.js';

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
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
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
  status.textContent = '연결 자료를 불러오고 있어요.';
  form.querySelector('button[type="submit"]').disabled = true;
  try {
    if (!dataPromise) {
      dataPromise = fetch('/path-data.json').then((response) => {
        if (!response.ok) throw new Error('Path data unavailable');
        return response.json();
      });
    }
    data = await dataPromise;
    populateGroups();
    status.textContent = '';
    return data;
  } catch (error) {
    dataPromise = null;
    status.textContent = '연결 자료를 불러오지 못했어요. 경로 찾기를 다시 눌러 주세요.';
    throw error;
  } finally {
    form.querySelector('button[type="submit"]').disabled = false;
  }
}
function setDefaults() {
  if (defaultsSet) return;
  from.value = document.body.dataset.groupId || '버스터즈';
  expanded.checked = ['unit', 'external'].includes(document.body.dataset.groupCategory);
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
  const resolve = (value) => scope.nodes.find((node) => normalize(node.name) === normalize(value) || (aliases[node.id] || []).some((name) => normalize(name) === normalize(value)))?.id;
  const start = resolve(from.value), end = resolve(to.value);
  if (!start || !end) {
    status.textContent = '그룹 이름과 표시 범위를 확인해 주세요.';
    return;
  }
  const { adjacency } = analyze(scope.nodes, scope.edges);
  const path = shortestPath(adjacency, start, end);
  if (!path) {
    status.textContent = '현재 자료에서 두 그룹의 연결을 찾지 못했어요.';
    return;
  }
  status.textContent = '';
  const summary = document.createElement('p');
  summary.className = 'path-summary';
  summary.textContent = `${path.length - 1}개 연결 · ${path.length}개 그룹`;
  result.append(summary);
  const nodes = new Map(scope.nodes.map((node) => [node.id, node]));
  path.forEach((id, index) => {
    const item = document.createElement('div');
    item.className = 'path-item';
    const link = document.createElement('a');
    link.href = nodes.get(id).recordPath || groupMapPath(id);
    link.textContent = nodes.get(id).name;
    item.append(link);
    if (index < path.length - 1) {
      const member = document.createElement('p');
      member.textContent = adjacency.get(id).find((entry) => entry.id === path[index + 1]).edge.members.join(' · ');
      item.append(member);
    }
    result.append(item);
  });
  const mapLink = document.createElement('a');
  mapLink.className = 'dialog-map-link';
  mapLink.href = pathMapPath(start, end, expanded.checked);
  mapLink.innerHTML = `지도에서 경로 보기${icon('up')}`;
  result.append(mapLink);
});
function openLinkedDialog() {
  if (location.hash === '#about') openDialog('about-dialog');
  if (location.hash === '#path') openDialog('content-path-dialog');
}
window.addEventListener('hashchange', openLinkedDialog);
openLinkedDialog();
