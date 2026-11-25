(() => {
  const nav = document.querySelector('.about-nav');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);

  if (!sections.length) return;

  const updateActiveLink = () => {
    const header = document.querySelector('.site-header');
    const checkpoint = (header?.getBoundingClientRect().bottom ?? 0)
      + Math.min(window.innerHeight * 0.25, 180);
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= checkpoint) activeSection = section;
    });

    links.forEach((link) => {
      const isActive = link.hash === `#${activeSection.id}`;
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      updateActiveLink();
    });
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateActiveLink();
})();
