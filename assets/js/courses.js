import { courseMatches } from './course-filter.js';
const cards = [...document.querySelectorAll('.course-card')];
const search = document.querySelector('#course-search');
const checks = [...document.querySelectorAll('[data-filter]')];
const count = document.querySelector('#course-count');
const empty = document.querySelector('#course-empty');
function stateFromUI() { const filters = {}; checks.forEach(box => { (filters[box.dataset.filter] ||= []); if (box.checked) filters[box.dataset.filter].push(box.value); }); return { q: search.value.trim().toLowerCase(), filters }; }
function apply() { const state = stateFromUI(); let visible = 0; cards.forEach(node => { const data = { search: node.dataset.search.toLowerCase(), ...node.dataset }; const show = courseMatches(data, state); node.hidden = !show; visible += show ? 1 : 0; }); count.textContent = visible; empty.hidden = visible !== 0; const params = new URLSearchParams(); if (state.q) params.set('q', state.q); Object.entries(state.filters).forEach(([key, values]) => values.forEach(value => params.append(key, value))); const language = new URLSearchParams(location.search).get('lang'); if (language === 'en' || language === 'fr') params.set('lang', language); history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`); }
function load() { const params = new URLSearchParams(location.search); search.value = params.get('q') || ''; checks.forEach(box => { box.checked = params.getAll(box.dataset.filter).includes(box.value); }); apply(); }
search?.addEventListener('input', apply); checks.forEach(box => box.addEventListener('change', apply));
document.querySelector('#course-clear')?.addEventListener('click', () => { search.value = ''; checks.forEach(box => { box.checked = false; }); apply(); });
if (cards.length) load();
