export function initializeNavigation(languageState = () => ({})) {
  const languageLink = document.querySelector('[data-language-link]');
  function updateLanguageLink() {
    if (!languageLink) return;
    const target = new URL(languageLink.href);
    target.search = location.search;
    target.hash = location.hash;
    const state = languageState();
    for (const [key, value] of Object.entries(state)) {
      if (key === 'hash') target.hash = value;
      else if (value == null || value === '') target.searchParams.delete(key);
      else target.searchParams.set(key, value);
    }
    languageLink.href = target.pathname + target.search + target.hash;
  }
  updateLanguageLink();
  // Leave navigation to the browser so new tabs, back/forward and no-JS links work.
  for (const event of ['pointerenter', 'focus', 'pointerdown', 'click']) languageLink?.addEventListener(event, updateLanguageLink);
  window.addEventListener('hashchange', updateLanguageLink);

  const prefetched = new Set();
  function prefetch(event) {
    if (navigator.connection?.saveData || /(^|-)2g$/.test(navigator.connection?.effectiveType || '')) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target || link.hasAttribute('download')) return;
    if (link === languageLink) updateLanguageLink();
    const url = new URL(link.href);
    if (url.origin !== location.origin || !/^\/(?:en\/)?(?:groups\/.*)?$/.test(url.pathname)) return;
    if (url.pathname === location.pathname || prefetched.has(url.pathname) || prefetched.size >= 6) return;
    prefetched.add(url.pathname);
    const hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.as = 'document';
    hint.href = url.pathname;
    document.head.append(hint);
  }
  document.addEventListener('pointerover', prefetch);
  document.addEventListener('focusin', prefetch);
}
