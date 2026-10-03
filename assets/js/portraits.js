(() => {
  document.querySelectorAll('[data-portrait]').forEach((image) => {
    const reveal = () => {
      if (image.naturalWidth > 0) image.classList.add('is-loaded');
    };
    image.addEventListener('load', reveal, { once: true });
    image.addEventListener('error', () => image.classList.remove('is-loaded'), { once: true });
    if (image.complete) reveal();
  });
})();
