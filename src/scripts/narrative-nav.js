/**
 * Injects prev/next navigation on narrative detail pages.
 * Run after DOM ready. Expects body[data-narrative] and elements #narrative-prev, #narrative-next.
 * If body lacks data-narrative, sets it from the current page path so narrative-specific CSS (e.g. justified text) applies.
 */
(function () {
  var slug = document.body.getAttribute('data-narrative');
  if (!slug && typeof NARRATIVE_ROUTE_MAP !== 'undefined') {
    var pathname = window.location.pathname || '';
    var match = pathname.match(/\/([^/]+)\.html$/);
    var pageSlug = match ? match[1] : null;
    if (pageSlug && NARRATIVE_ROUTE_MAP[pageSlug]) {
      document.body.setAttribute('data-narrative', pageSlug);
      slug = pageSlug;
    }
  }
  if (!slug) return;

  function getStep(currentSlug) {
    if (typeof NARRATIVE_ROUTE_MAP !== 'undefined' && NARRATIVE_ROUTE_MAP[currentSlug]) {
      return NARRATIVE_ROUTE_MAP[currentSlug];
    }
    if (Array.isArray(NARRATIVE_STEPS)) {
      return NARRATIVE_STEPS.find(function (s) { return s.slug === currentSlug; });
    }
    return null;
  }

  function resolvePage(slugName) {
    if (!slugName) return null;
    if (typeof NARRATIVE_ROUTE_MAP !== 'undefined' && NARRATIVE_ROUTE_MAP[slugName]) {
      const page = NARRATIVE_ROUTE_MAP[slugName].page;
      if (page) return page;
    }
    return slugName + '.html';
  }

  const step = getStep(slug);
  if (!step) return;

  const prevEl = document.getElementById('narrative-prev');
  const nextEl = document.getElementById('narrative-next');

  if (prevEl) {
    const prevHref = resolvePage(step.prev);
    if (prevHref) {
      prevEl.href = prevHref;
    } else {
      prevEl.remove();
    }
  }

  if (nextEl) {
    const nextHref = resolvePage(step.next);
    if (nextHref) {
      nextEl.href = nextHref;
    } else {
      nextEl.remove();
    }
  }

  function setupKeyboardNav() {
    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('[contenteditable="true"]'))) return;
      var prev = document.getElementById('narrative-prev');
      var next = document.getElementById('narrative-next');
      if (e.key === 'ArrowLeft' && prev && prev.href && prev.href !== '#' && !prev.hasAttribute('aria-disabled')) {
        e.preventDefault();
        window.location.href = prev.href;
      }
      if (e.key === 'ArrowRight' && next && next.href && next.href !== '#' && !next.hasAttribute('aria-disabled')) {
        e.preventDefault();
        window.location.href = next.href;
      }
    });
  }
  setupKeyboardNav();
})();
