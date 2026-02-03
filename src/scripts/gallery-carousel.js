(function () {
  var carousel = document.querySelector('.gallery-carousel');
  if (!carousel) return;

  var track = carousel.querySelector('.gallery-carousel-track');
  var slides = carousel.querySelectorAll('.gallery-carousel-slide');
  var dots = carousel.querySelectorAll('.gallery-carousel-dot');
  var prevBtn = carousel.querySelector('.gallery-carousel-prev');
  var nextBtn = carousel.querySelector('.gallery-carousel-next');
  var total = slides.length;
  var current = 0;

  function goTo(index) {
    index = (index + total) % total;
    current = index;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  prevBtn.addEventListener('click', function () {
    prev();
  });

  nextBtn.addEventListener('click', function () {
    next();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goTo(i);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var target = e.target && e.target.nodeType === 1 ? e.target : null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;
    if (!target || !target.closest('.gallery-carousel')) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'ArrowLeft') prev();
    else next();
  });
})();
