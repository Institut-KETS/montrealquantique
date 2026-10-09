const splitValues = (value) => (value || '').split(',').filter(Boolean);

export function countFacet(members, facet) {
  const counts = new Map();
  const key = facet === 'topic' ? 'topics' : 'institutions';
  members.forEach((member) => {
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
  const selectedInstitutions = new Set(new URLSearchParams(window.location.search).getAll('institution'));
  ['topic', 'institution'].forEach((facet) => {
    const members = facet === 'institution' ? allMembers : filteredMembers;
    const counts = countFacet(members, facet);
    document.querySelectorAll(`[data-cloud-item][data-facet="${facet}"]`).forEach((item) => {
      const count = counts.get(item.dataset.value) || 0;
      item.hidden = count === 0;
      if (facet === 'institution' && selectedInstitutions.has(item.dataset.value)) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
      const label = item.querySelector('.cloud-label').textContent;
      item.setAttribute('aria-label', label);
    });
  });
}

document.addEventListener('directory:updated', updateClouds);
document.addEventListener('mq:languagechange', updateClouds);
updateClouds();
