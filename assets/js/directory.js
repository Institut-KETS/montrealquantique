export function normalizeText(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, '').replace(/[-_/]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
}

const values = (value = '') => value.split(',').filter(Boolean);

export function matchesMember(member, state) {
  const search = normalizeText(member.searchText || `${member.name || ''} ${member.summary || ''}`);
  if (state.q && !search.includes(normalizeText(state.q))) return false;
  const checks = [['roles', [member.role]], ['institutions', member.institutions || []], ['families', member.families || []], ['topics', member.topics || []], ['supervisors', member.supervisors || []]];
  return checks.every(([facet, memberValues]) => {
    const selected = state[facet] || [];
    return selected.length === 0 || selected.some((value) => memberValues.includes(value));
  });
}

export function stateFromParams(params) {
  return { q: params.get('q') || '', roles: params.getAll('role'), institutions: params.getAll('institution'), families: params.getAll('family'), topics: params.getAll('topic'), supervisors: params.getAll('supervisor') };
}

export function paramsFromState(state) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  [['role', state.roles], ['institution', state.institutions], ['family', state.families], ['topic', state.topics], ['supervisor', state.supervisors]].forEach(([key, selected]) => [...(selected || [])].sort().forEach((value) => params.append(key, value)));
  return params;
}

const cards = typeof document === 'undefined' ? [] : [...document.querySelectorAll('[data-member-card]')];
const query = typeof document === 'undefined' ? null : document.querySelector('[data-filter-query]');
const controls = typeof document === 'undefined' ? [] : [...document.querySelectorAll('[data-filter]')];
const filterPanel = typeof document === 'undefined' ? null : document.querySelector('.filter-panel');

if (filterPanel) {
  const mobileDirectory = window.matchMedia('(max-width: 900px)');
  const syncFilterPanel = ({ matches }) => { filterPanel.open = !matches; };
  syncFilterPanel(mobileDirectory);
  mobileDirectory.addEventListener('change', syncFilterPanel);
}

function cardData(card) {
  return { searchText: card.textContent, role: card.dataset.role, institutions: values(card.dataset.institutions), families: values(card.dataset.families), topics: values(card.dataset.topics), supervisors: values(card.dataset.supervisors) };
}

function stateFromControls() {
  const selected = (name) => controls.filter((input) => input.dataset.filter === name && input.checked).map((input) => input.value);
  return { q: query?.value.trim() || '', roles: selected('role'), institutions: selected('institution'), families: selected('family'), topics: selected('topic'), supervisors: selected('supervisor') };
}

function setControls(state) {
  if (query) query.value = state.q;
  const map = { role: state.roles, institution: state.institutions, family: state.families, topic: state.topics, supervisor: state.supervisors };
  controls.forEach((input) => { input.checked = map[input.dataset.filter].includes(input.value); });
}

function controlLabel(facet, value) {
  const control = controls.find((input) => input.dataset.filter === facet && input.value === value);
  return control?.parentElement?.textContent.trim() || value;
}

function renderChips(state) {
  const container = document.querySelector('[data-active-filters]');
  if (!container) return;
  container.replaceChildren();
  const entries = [];
  if (state.q) entries.push(['q', state.q, `Search: ${state.q}`]);
  [['role', state.roles], ['institution', state.institutions], ['family', state.families], ['topic', state.topics], ['supervisor', state.supervisors]].forEach(([facet, list]) => list.forEach((value) => entries.push([facet, value, controlLabel(facet, value)])));
  entries.forEach(([facet, value, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = `${label} ×`;
    button.setAttribute('aria-label', `Remove ${label} filter`);
    button.addEventListener('click', () => {
      if (facet === 'q') query.value = '';
      else controls.find((input) => input.dataset.filter === facet && input.value === value).checked = false;
      applyFilters();
    });
    container.append(button);
  });
}

function applyFilters({ replace = false } = {}) {
  const state = stateFromControls();
  let count = 0;
  cards.forEach((card) => {
    const match = matchesMember(cardData(card), state);
    card.hidden = !match;
    if (match) count += 1;
  });
  document.querySelectorAll('[data-result-count]').forEach((node) => { node.textContent = String(count); });
  const empty = document.querySelector('[data-empty-state]');
  if (empty) empty.hidden = count !== 0;
  renderChips(state);
  const params = paramsFromState(state).toString();
  const url = `${window.location.pathname}${params ? `?${params}` : ''}`;
  window.history[replace ? 'replaceState' : 'pushState']({}, '', url);
  document.dispatchEvent(new CustomEvent('directory:updated', { detail: { count } }));
}

function clearAll() {
  if (query) query.value = '';
  controls.forEach((input) => { input.checked = false; });
  applyFilters();
}

if (cards.length) {
  setControls(stateFromParams(new URLSearchParams(window.location.search)));
  applyFilters({ replace: true });
  query?.addEventListener('input', () => applyFilters({ replace: true }));
  controls.forEach((input) => input.addEventListener('change', () => applyFilters()));
  document.querySelectorAll('[data-clear-all]').forEach((button) => button.addEventListener('click', clearAll));
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
    const list = button.dataset.view === 'list';
    document.querySelector('[data-member-grid]').classList.toggle('is-list', list);
    document.querySelectorAll('[data-view]').forEach((peer) => peer.setAttribute('aria-pressed', String(peer === button)));
  }));
  window.addEventListener('popstate', () => {
    setControls(stateFromParams(new URLSearchParams(window.location.search)));
    applyFilters({ replace: true });
  });
}
