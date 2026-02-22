/**
 * Projects listing only: on first load show static background, preload the GIF, then fade in the GIF.
 * If the GIF is already cached, add .gif-ready immediately so no delay.
 */
(function () {
  var body = document.body;
  if (!body.classList.contains('page-projects-listing')) return;
  var gifUrl = '../assets/background-slow.gif';

  var img = new Image();
  function ready() {
    body.classList.add('gif-ready');
    sessionStorage.setItem('projects-bg-gif-seen', '1');
  }
  img.onload = ready;
  img.onerror = ready;
  if (img.complete) {
    ready();
  } else {
    img.src = gifUrl;
  }
})();
