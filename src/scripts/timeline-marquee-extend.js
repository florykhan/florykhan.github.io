/**
 * Extends the timeline marquee with copies before and after.
 * 6 sets to the left (back-up cycle) + 6 sets to the right. Start position shows first card.
 * Also handles pause-on-hover via JS to avoid scroll-position jump when pausing.
 */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var marquee = document.querySelector('.timeline-marquee');
  var track = document.querySelector('.timeline-marquee .timeline-track');
  var firstSet = document.querySelector('.timeline-marquee .timeline-set:first-child');
  if (!track || !firstSet) return;

  function makeClone(set) {
    var clone = set.cloneNode(true);
    clone.classList.add('timeline-set-duplicate');
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('.timeline-node').forEach(function (link) {
      link.setAttribute('tabindex', '-1');
    });
    return clone;
  }

  /* Prepend 6 sets to the left so user can scroll left from the first card */
  for (var i = 0; i < 6; i++) {
    track.insertBefore(makeClone(firstSet), track.firstChild);
  }

  /* Append 4 more sets to the right (we now have 2 from HTML + 4 = 6 on the right) */
  for (var j = 0; j < 4; j++) {
    track.appendChild(makeClone(firstSet));
  }

  track.classList.add('timeline-track-extended');

  /* Start scrolled so the "main" first card is in view (past the 6 left sets) */
  function setInitialScroll() {
    var setWidth = firstSet.offsetWidth;
    if (marquee && setWidth > 0) {
      marquee.scrollLeft = setWidth * 6;
    }
  }
  setInitialScroll();
  requestAnimationFrame(setInitialScroll);

  /* Pause on hover/focus via JS to avoid scroll jump (CSS animation-play-state can cause it) */
  var nodes = track.querySelectorAll('.timeline-node');
  var pauseCount = 0;

  function freeze() {
    pauseCount++;
    if (pauseCount === 1) {
      var style = window.getComputedStyle(track);
      var tx = style.transform;
      track.style.transform = tx || 'none';
      track.classList.add('timeline-track-paused');
    }
  }

  function unfreeze() {
    pauseCount = Math.max(0, pauseCount - 1);
    if (pauseCount === 0) {
      track.style.transform = '';
      track.classList.remove('timeline-track-paused');
    }
  }

  nodes.forEach(function (node) {
    node.addEventListener('mouseenter', freeze);
    node.addEventListener('mouseleave', unfreeze);
    node.addEventListener('focus', freeze);
    node.addEventListener('blur', unfreeze);
  });
})();
