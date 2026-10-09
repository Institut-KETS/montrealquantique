const form = document.querySelector('[data-news-submission]');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const french = document.documentElement.lang.toLowerCase().startsWith('fr');
    const title = String(data.get('title') || '').trim();
    const subjectLead = french ? 'Proposition d’actualité' : 'News submission';
    const subject = `Montréal Quantique — ${subjectLead}: ${title}`;
    const labels = french
      ? { type: 'Type', title: 'Titre', date: 'Date', source: 'Source officielle', summary: 'Résumé', submitter: 'Proposé par' }
      : { type: 'Type', title: 'Title', date: 'Date', source: 'Official source', summary: 'Summary', submitter: 'Submitted by' };
    const lines = [
      `${labels.type}: ${data.get('type')}`,
      `${labels.title}: ${title}`,
      `${labels.date}: ${data.get('date') || '—'}`,
      `${labels.source}: ${data.get('source')}`,
      '',
      `${labels.summary}:`,
      String(data.get('summary') || '').trim(),
      '',
      `${labels.submitter}: ${data.get('submitter') || '—'}`
    ];

    window.location.href = `mailto:jacob.biamonte@etsmtl.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  });
}
