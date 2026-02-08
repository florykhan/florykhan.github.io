/**
 * Type-on-scroll: when a heading with .type-on-scroll enters the viewport,
 * type its text letter-by-letter once, with a blinking caret. Respects
 * prefers-reduced-motion (no animation).
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var headings = document.querySelectorAll('.type-on-scroll');

  if (prefersReducedMotion || !headings.length) return;

  var CHAR_DELAY = 65;
  var THRESHOLD = 0.35;

  function initHeading(el) {
    var fullText = el.textContent;
    if (!fullText) return;

    var measurer = document.createElement('span');
    measurer.setAttribute('aria-hidden', 'true');
    measurer.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:nowrap;pointer-events:none;';
    measurer.textContent = fullText;
    el.appendChild(measurer);
    var w = measurer.offsetWidth;
    measurer.remove();

    var textSpan = document.createElement('span');
    textSpan.className = 'type-on-scroll-text';

    var caret = document.createElement('span');
    caret.className = 'type-on-scroll-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.innerHTML = '';

    el.textContent = '';
    el.style.minWidth = w + 'px';
    el.appendChild(textSpan);
    el.appendChild(caret);

    el.dataset.typeOnScrollFull = fullText;
  }

  function runTyping(el) {
    if (el.classList.contains('type-on-scroll-done')) return;

    var fullText = el.dataset.typeOnScrollFull;
    if (!fullText) return;

    var textSpan = el.querySelector('.type-on-scroll-text');
    var caret = el.querySelector('.type-on-scroll-caret');
    if (!textSpan || !caret) return;

    var index = 0;

    function tick() {
      if (index <= fullText.length) {
        textSpan.textContent = fullText.slice(0, index);
        index += 1;
        setTimeout(tick, CHAR_DELAY);
      } else {
        caret.remove();
        el.classList.add('type-on-scroll-done');
      }
    }

    tick();
  }

  headings.forEach(initHeading);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runTyping(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: THRESHOLD, rootMargin: '0px' }
  );

  headings.forEach(function (el) {
    observer.observe(el);
  });
})();
