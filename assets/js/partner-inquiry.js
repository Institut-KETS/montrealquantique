const form = document.querySelector('[data-partner-inquiry]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const french = document.documentElement.lang.toLowerCase().startsWith('fr');
  if (form.hasAttribute('data-direct-submission')) {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[data-inquiry-status]');
    if (button.disabled) return;
    button.disabled = true;
    status.hidden = false;
    status.textContent = french ? 'Envoi en cours…' : 'Sending…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission rejected');
      form.reset();
      status.textContent = french ? 'Votre demande a été envoyée.' : 'Your request was sent.';
    } catch {
      status.textContent = french
        ? 'Impossible d’envoyer la demande. Réessayez ou écrivez directement à Melissa.'
        : 'The request could not be sent. Please try again or email Melissa directly.';
    } finally {
      button.disabled = false;
    }
    return;
  }

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
