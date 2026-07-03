/**
 * P999 Micro-Site — Main Script
 * Replace DOWNLOAD_URL with your real download link before launch.
 */
const DOWNLOAD_URL = 'https://777p999.com/?dl=9dscuj';
const PLACEHOLDER_URL = 'https://777p999.com/?dl=9dscuj';

document.addEventListener('DOMContentLoaded', () => {
  initDownloadButtons();
  initMobileMenu();
  initScrollToTop();
  initFaqAccordion();
});

/**
 * Wire all download buttons to DOWNLOAD_URL.
 * Shows alert if link is still a placeholder.
 */
function initDownloadButtons() {
  const buttons = document.querySelectorAll('[data-download]');
  const isPlaceholder = !DOWNLOAD_URL || DOWNLOAD_URL === PLACEHOLDER_URL;

  buttons.forEach((btn) => {
    if (!isPlaceholder) {
      btn.setAttribute('href', DOWNLOAD_URL);
      btn.setAttribute('rel', 'noopener noreferrer');

      if (isExternalUrl(DOWNLOAD_URL)) {
        btn.setAttribute('target', '_blank');
      }
    } else {
      btn.setAttribute('href', '#');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (isPlaceholder) {
        alert('Download link will be added soon.');
        return;
      }

      if (isExternalUrl(DOWNLOAD_URL)) {
        window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = DOWNLOAD_URL;
      }
    });
  });
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

/**
 * Mobile hamburger menu toggle
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a:not([data-download])').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Scroll-to-top button visibility and behavior
 */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) return;

  const toggleVisibility = () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * FAQ accordion toggle
 */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
