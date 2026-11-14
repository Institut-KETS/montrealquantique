const form = document.querySelector('[data-partner-inquiry]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const french = document.documentElement.lang.toLowerCase().startsWith('fr');
  const types = french
    ? { delegation: 'Délégation', partnership: 'Partenariat', general: 'Demande générale' }
    : { delegation: 'Delegation', partnership: 'Partnership', general: 'General inquiry' };
  const labels = french
    ? { name: 'Nom', email: 'Courriel', organization: 'Organisation', timing: 'Dates ou période', details: 'Objectifs et détails' }
    : { name: 'Name', email: 'Email', organization: 'Organization', timing: 'Dates or timeframe', details: 'Goals and details' };
  const subject = `Montréal Quantique — ${types[data.get('type')]}`;
  const body = Object.entries(labels)
    .map(([field, label]) => `${label}: ${String(data.get(field) || '').trim()}`)
    .join('\r\n');
  window.location.href = `${form.getAttribute('action')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
