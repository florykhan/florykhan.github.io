/**
 * Resume preview: open PDF in a modal overlay instead of downloading.
 * Binds to all links whose href points to Ilian-Khankhalaev-Resume.pdf.
 */
(function () {
  var modal = null;
  var iframe = null;
  var closeBtn = null;
  var downloadLink = null;
  var escapeHandler = null;

  function createModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'resume-preview-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Resume preview');
    modal.innerHTML =
      '<div class="resume-preview-backdrop" aria-hidden="true"></div>' +
      '<div class="resume-preview-box">' +
        '<div class="resume-preview-header">' +
          '<a href="#" class="resume-preview-download" target="_blank" rel="noopener noreferrer">Download PDF</a>' +
          '<button type="button" class="resume-preview-close" aria-label="Close preview">&times;</button>' +
        '</div>' +
        '<div class="resume-preview-iframe-wrap">' +
          '<iframe class="resume-preview-iframe" title="Resume (PDF)"></iframe>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    iframe = modal.querySelector('.resume-preview-iframe');
    closeBtn = modal.querySelector('.resume-preview-close');
    downloadLink = modal.querySelector('.resume-preview-download');
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
    return modal;
  }

  function openPreview(url) {
    createModal();
    var absoluteUrl = new URL(url, window.location.href).href;
    var separator = absoluteUrl.indexOf('#') === -1 ? '#' : '&';
    var pdfUrlWithView = absoluteUrl + separator + 'view=FitH';
    iframe.setAttribute('src', pdfUrlWithView);
    downloadLink.setAttribute('href', absoluteUrl);
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
