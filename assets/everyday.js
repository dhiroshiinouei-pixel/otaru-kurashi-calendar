/* Shared, progressively enhanced navigation. No third-party dependency. */
(() => {
  const stateKeys = ['month', 'q', 'category', 'view', 'range', 'limit'];
  const langRoot = /^\/(en|zh-hant|zh-hans|ko)\//.exec(location.pathname)?.[0] || '/';
  const isHome = document.body.classList.contains('calendar-home');
  const picker = document.querySelector('.language-picker');
  document.addEventListener('click', (event) => {
    if (picker && !picker.contains(event.target)) picker.open = false;
    const link = event.target.closest('a[href]');
    if (!link || !isHome) return;
    const target = new URL(link.href, location.href);
    if ([location.origin, 'https://otaru.spady.net'].includes(target.origin) && /\/events\/[^/]+\/$/.test(target.pathname)) {
      try {
        sessionStorage.setItem('otaru-browse-return', JSON.stringify({ path: location.pathname, search: location.search, y: scrollY }));
      } catch (_) { /* Storage may be disabled; query-state links still work. */ }
      for (const key of stateKeys) {
        const value = new URLSearchParams(location.search).get(key);
        if (value) target.searchParams.set(key, value);
      }
      link.href = target.pathname + target.search;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && picker?.open) {
      picker.open = false;
      picker.querySelector('summary').focus();
    }
  });
  const detail = document.querySelector('.event-detail[data-event-end]');
  if (detail) {
    const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    if (detail.dataset.eventEnd < today && !['EventCancelled', 'EventPostponed'].includes(detail.dataset.eventStatus)) {
      detail.querySelector('[data-status-label]').textContent = detail.dataset.endedLabel;
      detail.classList.add('is-ended');
    }
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem('otaru-browse-return')); } catch (_) {}
    const current = new URLSearchParams(location.search);
    const params = new URLSearchParams();
    for (const key of stateKeys) {
      const value = current.get(key) || (saved?.path === langRoot ? new URLSearchParams(saved.search).get(key) : null);
      if (value) params.set(key, value);
    }
    if (!params.has('month') && detail.dataset.eventStart) params.set('month', detail.dataset.eventStart.slice(0, 7));
    document.querySelectorAll('.back-to-results').forEach(link => {
      link.href = `${langRoot}?${params}#calendar`;
      link.addEventListener('click', () => {
        try { sessionStorage.setItem('otaru-restore-scroll', '1'); } catch (_) {}
      });
    });
    document.querySelectorAll('[data-lang-link]').forEach(link => {
      const url = new URL(link.href, location.href);
      url.search = params.toString();
      link.href = url.pathname + url.search;
    });
    // Remove related cards once their dates have elapsed; never recommend an old July event in October.
    document.querySelectorAll('.detail-section .event-card[data-event-end]').forEach(card => {
      if (card.dataset.eventEnd < today) card.remove();
    });
  }
  if (isHome) {
    try {
      if (sessionStorage.getItem('otaru-restore-scroll') === '1') {
        sessionStorage.removeItem('otaru-restore-scroll');
        const saved = JSON.parse(sessionStorage.getItem('otaru-browse-return'));
        if (saved?.path === location.pathname && Number.isFinite(saved.y)) requestAnimationFrame(() => scrollTo({ top: saved.y, behavior: 'instant' }));
      }
    } catch (_) {}
  }
})();
