const form = document.querySelector('[data-contact-inquiry]');

if (form) {
  const type = form.elements.type;
  const options = Array.from(type.options);
  const requestedType = new URLSearchParams(window.location.search).get('type');
  if (options.some((option) => option.value === requestedType)) type.value = requestedType;
  const updateLabels = () => {
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    options.forEach((option) => { option.textContent = option.dataset[language]; });
  };
  updateLabels();
  document.addEventListener('mq:languagechange', updateLabels);
}

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

  const labels = french
    ? { name: 'Nom', email: 'Courriel', organization: 'Organisation', details: 'Message' }
    : { name: 'Name', email: 'Email', organization: 'Organization', details: 'Message' };
  const option = form.elements.type.selectedOptions[0];
  const subject = `Montréal Quantique — ${option.dataset[french ? 'fr' : 'en']}`;
  const body = Object.entries(labels)
    .map(([field, label]) => `${label}: ${String(data.get(field) || '').trim()}`)
    .join('\r\n');
  window.location.href = `${form.getAttribute('action')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
