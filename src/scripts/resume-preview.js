/**
 * Resume / Portfolio preview: open PDF in a modal overlay.
 * Binds to all links whose href points to Ilian-Khankhalaev-Resume.pdf.
 * Modal includes a toggle to flip between Resume and Portfolio PDFs.
 */
(function () {
  var modal = null;
  var iframe = null;
  var closeBtn = null;
  var downloadLink = null;
  var escapeHandler = null;
  var resumeUrl = null;
  var portfolioUrl = null;
  var btnResume = null;
  var btnPortfolio = null;

  function setPdfView(url, label) {
    var separator = url.indexOf('#') === -1 ? '#' : '&';
    var pdfUrlWithView = url + separator + 'view=FitH';
    iframe.setAttribute('src', pdfUrlWithView);
    iframe.setAttribute('title', label);
    downloadLink.setAttribute('href', url);
  }

  function createModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'resume-preview-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Resume and portfolio preview');
    modal.innerHTML =
      '<div class="resume-preview-backdrop" aria-hidden="true"></div>' +
      '<div class="resume-preview-box">' +
        '<div class="resume-preview-header">' +
          '<div class="resume-preview-toggle" role="tablist" aria-label="Choose document">' +
            '<button type="button" class="resume-preview-tab is-active" role="tab" aria-selected="true" data-doc="resume">Resume</button>' +
            '<button type="button" class="resume-preview-tab" role="tab" aria-selected="false" data-doc="portfolio">Portfolio</button>' +
          '</div>' +
          '<div class="resume-preview-header-right">' +
            '<a href="#" class="resume-preview-download" target="_blank" rel="noopener noreferrer">Download PDF</a>' +
            '<button type="button" class="resume-preview-close" aria-label="Close preview">&times;</button>' +
          '</div>' +
        '</div>' +
        '<div class="resume-preview-iframe-wrap">' +
          '<iframe class="resume-preview-iframe" title="Resume (PDF)"></iframe>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    iframe = modal.querySelector('.resume-preview-iframe');
    closeBtn = modal.querySelector('.resume-preview-close');
    downloadLink = modal.querySelector('.resume-preview-download');
    btnResume = modal.querySelector('.resume-preview-tab[data-doc="resume"]');
    btnPortfolio = modal.querySelector('.resume-preview-tab[data-doc="portfolio"]');
    var backdrop = modal.querySelector('.resume-preview-backdrop');

    function close() {
      modal.classList.remove('resume-preview-open');
      iframe.removeAttribute('src');
      document.body.style.overflow = '';
      if (escapeHandler) {
        document.removeEventListener('keydown', escapeHandler, true);
      }
    }

    escapeHandler = function (e) {
      if (e.key !== 'Escape' || !modal.classList.contains('resume-preview-open')) return;
      e.preventDefault();
      e.stopPropagation();
      close();
    };

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    downloadLink.addEventListener('click', function (e) {
      e.stopPropagation();
      downloadLink.setAttribute('href', iframe.getAttribute('src') || '#');
    });

    btnResume.addEventListener('click', function () {
      if (!resumeUrl) return;
      btnResume.classList.add('is-active');
      btnResume.setAttribute('aria-selected', 'true');
      btnPortfolio.classList.remove('is-active');
      btnPortfolio.setAttribute('aria-selected', 'false');
      setPdfView(resumeUrl, 'Resume (PDF)');
    });
    btnPortfolio.addEventListener('click', function () {
      if (!portfolioUrl) return;
      btnPortfolio.classList.add('is-active');
      btnPortfolio.setAttribute('aria-selected', 'true');
      btnResume.classList.remove('is-active');
      btnResume.setAttribute('aria-selected', 'false');
      setPdfView(portfolioUrl, 'Portfolio (PDF)');
    });

    return modal;
  }

  function openPreview(resumeHref) {
    createModal();
    resumeUrl = new URL(resumeHref, window.location.href).href;
    portfolioUrl = resumeUrl.replace('Ilian-Khankhalaev-Resume.pdf', 'Ilian-Khankhalaev-Portfolio.pdf');

    btnResume.classList.add('is-active');
    btnResume.setAttribute('aria-selected', 'true');
    btnPortfolio.classList.remove('is-active');
    btnPortfolio.setAttribute('aria-selected', 'false');
    setPdfView(resumeUrl, 'Resume (PDF)');

    modal.classList.add('resume-preview-open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', escapeHandler, true);
  }

  function init() {
    var links = document.querySelectorAll('a[href*="Ilian-Khankhalaev-Resume.pdf"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openPreview(link.getAttribute('href'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
