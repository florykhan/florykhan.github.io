(function () {
  function initScrollArrow() {
    var arrow = document.querySelector('.scroll-arrow');
    var target = document.getElementById('intro');
    if (!arrow || !target) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var delay = reducedMotion ? 0 : 2000;

    function showArrow() {
      arrow.classList.add('scroll-arrow--visible');
    }

    function scrollToTarget() {
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }

    if (delay > 0) {
      setTimeout(showArrow, delay);
    } else {
      showArrow();
    }

    arrow.addEventListener('click', function () {
      scrollToTarget();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollArrow);
  } else {
    initScrollArrow();
  }
})();
