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

function allMemberSource() {
  const members = [...document.querySelectorAll('[data-cloud-member]')];
  return members.length ? members : [...document.querySelectorAll('[data-member-card]')];
}

function updateClouds() {
  const filteredMembers = memberSource();
  const allMembers = allMemberSource();
  const facultyOnly = Boolean(document.querySelector('[data-cloud-faculty-only]:checked'));
  const selectedInstitutions = new Set(new URLSearchParams(window.location.search).getAll('institution'));
  ['topic', 'institution'].forEach((facet) => {
    const members = facet === 'institution' ? allMembers : filteredMembers;
    const counts = countFacet(members, facet, facultyOnly);
    document.querySelectorAll(`[data-cloud-item][data-facet="${facet}"]`).forEach((item) => {
      const count = counts.get(item.dataset.value) || 0;
      item.hidden = count === 0;
      if (facet === 'institution' && selectedInstitutions.has(item.dataset.value)) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
      const counter = item.querySelector('.cloud-count');
      if (counter) counter.textContent = `(${count})`;
      const label = item.querySelector('.cloud-label').textContent;
      const accessible = document.documentElement.lang === 'fr'
        ? `${label}, ${count} personne${count === 1 ? '' : 's'} répertoriée${count === 1 ? '' : 's'}`
        : `${label}, ${count} listed ${count === 1 ? 'person' : 'people'}`;
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
