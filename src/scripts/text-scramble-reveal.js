/**
 * Text scramble reveal: each character cycles through random chars before settling.
 * Slot-machine / hacker-style, left-to-right, with stagger.
 * Trigger: when element enters viewport, once per page load.
 * Respects prefers-reduced-motion.
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var elements = document.querySelectorAll('.text-scramble-reveal');
  if (prefersReducedMotion || !elements.length) return;

  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  var SCRAMBLE_DURATION = 650;
  var SCRAMBLE_INTERVAL = 50;
  var STAGGER_MS = 95;
  var THRESHOLD = 0.3;

  function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function initElement(el) {
    var text = el.textContent.trim();
    if (!text) return;

    var measurer = document.createElement('span');
    measurer.setAttribute('aria-hidden', 'true');
    measurer.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:nowrap;pointer-events:none;';
    measurer.textContent = text;
    el.appendChild(measurer);
    var minWidth = measurer.offsetWidth;
    measurer.remove();

    el.style.minWidth = minWidth + 'px';
    el.textContent = '';

    var srSpan = document.createElement('span');
    srSpan.className = 'sr-only';
    srSpan.textContent = text;
    el.appendChild(srSpan);

    var wrapper = document.createElement('span');
    wrapper.className = 'text-scramble-reveal-inner';
    wrapper.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'text-scramble-char';
      span.textContent = randomChar();
      span.dataset.final = text[i];
      wrapper.appendChild(span);
    }
    el.appendChild(wrapper);

    el.dataset.textScrambleText = text;
    el.dataset.textScrambleReady = '1';
  }

  function runScramble(el) {
    if (el.dataset.textScrambleDone === '1') return;
    el.dataset.textScrambleDone = '1';

    var wrapper = el.querySelector('.text-scramble-reveal-inner');
    var srSpan = el.querySelector('.sr-only');
    if (!wrapper || !srSpan) return;

    var chars = wrapper.querySelectorAll('.text-scramble-char');
    var len = chars.length;

    function scrambleChar(index) {
      var span = chars[index];
      var final = span.dataset.final;
      var start = Date.now();

      function tick() {
        var elapsed = Date.now() - start;
        if (elapsed >= SCRAMBLE_DURATION) {
          span.textContent = final;
          span.classList.add('resolved');
          if (index === len - 1) {
            srSpan.remove();
            wrapper.removeAttribute('aria-hidden');
            el.classList.add('text-scramble-done');
          }
          return;
        }
        span.textContent = randomChar();
        setTimeout(tick, SCRAMBLE_INTERVAL);
      }
      tick();
    }

    for (var i = 0; i < len; i++) {
      (function (idx) {
        setTimeout(function () {
          scrambleChar(idx);
        }, idx * STAGGER_MS);
      })(i);
    }
  }

  elements.forEach(initElement);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target.dataset.textScrambleReady === '1') {
          runScramble(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: THRESHOLD, rootMargin: '0px' }
  );

  elements.forEach(function (el) {
    if (el.dataset.textScrambleReady === '1') {
      observer.observe(el);
    }
  });
})();
