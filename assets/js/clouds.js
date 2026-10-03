const splitValues = (value) => (value || '').split(',').filter(Boolean);

export function countFacet(members, facet, facultyOnly = false) {
  const counts = new Map();
  const key = facet === 'topic' ? 'topics' : 'institutions';
  members.forEach((member) => {
    if (facultyOnly && member.dataset.role !== 'pi') return;
    new Set(splitValues(member.dataset[key])).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  });
  return counts;
}

function memberSource() {
  const visibleCards = [...document.querySelectorAll('[data-member-card]:not([hidden])')];
  if (visibleCards.length || document.querySelector('[data-member-card]')) return visibleCards;
  return [...document.querySelectorAll('[data-cloud-member]')];
}

function updateClouds() {
  const members = memberSource();
  const facultyOnly = Boolean(document.querySelector('[data-cloud-faculty-only]:checked'));
  ['topic', 'institution'].forEach((facet) => {
    const counts = countFacet(members, facet, facultyOnly);
    document.querySelectorAll(`[data-cloud-item][data-facet="${facet}"]`).forEach((item) => {
      const count = counts.get(item.dataset.value) || 0;
      item.hidden = count === 0;
      const counter = item.querySelector('.cloud-count');
      if (counter) counter.textContent = `(${count})`;
      const label = item.querySelector('.cloud-label').textContent;
      const accessible = document.documentElement.lang === 'fr'
        ? `${label}, ${count} membre${count === 1 ? '' : 's'} répertorié${count === 1 ? '' : 's'}`
        : `${label}, ${count} listed ${count === 1 ? 'member' : 'members'}`;
      item.setAttribute('aria-label', accessible);
    });
  });
}

document.querySelectorAll('[data-cloud-faculty-only]').forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    document.querySelectorAll('[data-cloud-faculty-only]').forEach((peer) => { peer.checked = event.currentTarget.checked; });
    updateClouds();
  });
});

document.addEventListener('directory:updated', updateClouds);
document.addEventListener('mq:languagechange', updateClouds);
updateClouds();
