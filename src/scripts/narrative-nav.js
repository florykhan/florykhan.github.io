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

  function replaceWithDisabled(el, text) {
    const span = document.createElement('span');
    span.className = el.className + ' narrative-btn-disabled';
    span.setAttribute('aria-disabled', 'true');
    span.textContent = text;
    el.parentNode.replaceChild(span, el);
  }

  const prevEl = document.getElementById('narrative-prev');
  const nextEl = document.getElementById('narrative-next');

  if (prevEl) {
    const prevHref = resolvePage(step.prev);
    if (prevHref) {
      prevEl.href = prevHref;
    } else {
      replaceWithDisabled(prevEl, prevEl.textContent);
    }
  }

  if (nextEl) {
    const nextHref = resolvePage(step.next);
    if (nextHref) {
      nextEl.href = nextHref;
    } else {
      replaceWithDisabled(nextEl, nextEl.textContent);
    }
  }
})();
