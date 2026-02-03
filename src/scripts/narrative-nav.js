/**
 * Injects prev/next navigation on narrative detail pages.
 * Run after DOM ready. Expects body[data-narrative] and elements #narrative-prev, #narrative-next.
 */
(function () {
  const slug = document.body.getAttribute('data-narrative');
  if (!slug) return;

  const step = NARRATIVE_STEPS.find(function (s) { return s.slug === slug; });
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
    if (step.prev) {
      prevEl.href = step.prev + '.html';
    } else {
      replaceWithDisabled(prevEl, prevEl.textContent);
    }
  }

  if (nextEl) {
    if (step.next) {
      nextEl.href = step.next + '.html';
    } else {
      replaceWithDisabled(nextEl, nextEl.textContent);
    }
  }
})();
