/**
 * Projects listing only: on first load (session) show static bg, then long transition to GIF.
 * On later visits in the same session, show the GIF right away (no transition). Scroll fade unchanged.
 */
(function () {
  var body = document.body;
  if (!body.classList.contains('page-projects-listing')) return;
  var gifUrl = '../assets/background-slow.gif';
  var storageKey = 'projects-bg-gif-seen';

  if (sessionStorage.getItem(storageKey)) {
    body.classList.add('gif-ready', 'gif-no-transition');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        body.classList.remove('gif-no-transition');
      });
    });
    return;
  }

  var img = new Image();
  function ready() {
    body.classList.add('gif-ready');
    sessionStorage.setItem(storageKey, '1');
  }
  img.onload = ready;
  img.onerror = ready;
  if (img.complete) {
    ready();
  } else {
    img.src = gifUrl;
  }
})();
