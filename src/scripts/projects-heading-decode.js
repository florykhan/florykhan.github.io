/**
 * Projects heading decode: show gibberish, then reveal "Projects" letter by letter.
 * Respects prefers-reduced-motion (shows final text immediately).
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heading = document.querySelector('.projects-heading-decode');
  if (!heading) return;

  var target = heading.textContent.trim();
  if (!target) return;

  if (prefersReducedMotion) return;

  var GIBBERISH_CHARS = '!@#$%^&*<>?/\\{}[]|~`+=;_' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var GIBBERISH_CYCLES = 18;
  var GIBBERISH_INTERVAL = 40;
  var REVEAL_DELAY = 70;

  function randomChar() {
    return GIBBERISH_CHARS[Math.floor(Math.random() * GIBBERISH_CHARS.length)];
  }

  function randomString(len) {
    var s = '';
    for (var i = 0; i < len; i++) s += randomChar();
    return s;
  }

  var srSpan = document.createElement('span');
  srSpan.className = 'sr-only';
  srSpan.textContent = target;

  var span = document.createElement('span');
  span.className = 'projects-heading-decode-text';
  span.setAttribute('aria-hidden', 'true');
  heading.textContent = '';
  heading.appendChild(srSpan);
  heading.appendChild(span);

  var len = target.length;
  var cycle = 0;

  function runGibberish() {
    span.textContent = randomString(len);
    cycle += 1;
    if (cycle < GIBBERISH_CYCLES) {
      setTimeout(runGibberish, GIBBERISH_INTERVAL);
    } else {
      revealLetters();
    }
  }

  function revealLetters() {
    var i = 0;
    function tick() {
      if (i <= len) {
        span.textContent = target.slice(0, i) + randomString(len - i);
        i += 1;
        setTimeout(tick, REVEAL_DELAY);
      } else {
        span.textContent = target;
        srSpan.remove();
        span.removeAttribute('aria-hidden');
        heading.classList.add('projects-heading-decode-done');
      }
    }
    tick();
  }

  runGibberish();
})();
