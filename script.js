'use strict';

/* Restore a saved preference when the document is ready; storage is optional. */
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
let storedTheme = null;
try {
  storedTheme = localStorage.getItem('luigi-portfolio-theme');
} catch {
  // The portfolio still works when a browser blocks local storage.
}

/** Synchronize the theme, browser chrome, and the button's accessible name. */
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeMeta.content = theme === 'light' ? '#f1f3f5' : '#171b20';
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
}

applyTheme(storedTheme === 'light' ? 'light' : 'dark');
themeButton.hidden = false;

/** Toggle the theme and remember it if the browser permits local storage. */
function toggleTheme() {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try {
    localStorage.setItem('luigi-portfolio-theme', theme);
  } catch {
    // Persisting a preference must never prevent changing the theme.
  }
}
themeButton.addEventListener('click', toggleTheme);

/* Navigation remains visible without JavaScript; enhance only once ready. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const mobileQuery = window.matchMedia('(max-width: 520px)');
root.classList.add('mobile-menu');
menuButton.hidden = false;

/** Keep visual menu state and screen-reader state in agreement. */
function setMenuOpen(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

/** Open or close the mobile menu using a native keyboard-operable button. */
function toggleMenu() {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
}
menuButton.addEventListener('click', toggleMenu);

/** Close navigation on Escape and restore focus to its trigger. */
function handleMenuEscape(event) {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
}
document.addEventListener('keydown', handleMenuEscape);

/** Close the menu after navigation without leaving focus in hidden content. */
function handleNavigation(event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const section = document.querySelector(link.getAttribute('href'));
  if (mobileQuery.matches && section) {
    setMenuOpen(false);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }
}
navigation.addEventListener('click', handleNavigation);

/** Clear an open menu after switching between phone and desktop layouts. */
function resetMenuAtBreakpoint() {
  const focusInsideNavigation = navigation.contains(document.activeElement);
  setMenuOpen(false);
  if (mobileQuery.matches && focusInsideNavigation) menuButton.focus();
}
mobileQuery.addEventListener('change', resetMenuAtBreakpoint);

/** Dismiss an open mobile menu when another area of the page is clicked. */
function handleOutsideMenuClick(event) {
  if (!event.target.closest('.header-controls')) {
    const focusInsideNavigation = navigation.contains(document.activeElement);
    setMenuOpen(false);
    if (mobileQuery.matches && focusInsideNavigation) menuButton.focus();
  }
}
document.addEventListener('click', handleOutsideMenuClick);

/* A small scroll indicator reflects the section without changing the URL. */
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href')));

/** Mark the visible section as the current location for all visitors. */
function updateCurrentSection(entries) {
  const visibleEntry = entries.find((entry) => entry.isIntersecting);
  if (!visibleEntry) return;
  sectionLinks.forEach((link) => {
    if (link.getAttribute('href') === `#${visibleEntry.target.id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(updateCurrentSection, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

/* Clipboard copy is offered only where the API exists; email links always work. */
const copyButton = document.querySelector('.copy-email');
const toast = document.querySelector('.toast');
let toastTimeout;

/** Announce an action result politely without disrupting keyboard focus. */
function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 4000);
}

/** Copy the actual email address, reporting failures with an available alternative. */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText('quitalouie3@gmail.com');
    showToast('Email copied. Say hello whenever you’re ready.');
  } catch {
    showToast('Couldn’t copy. Select the email address or use the email link instead.');
  }
}
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', copyEmail);
}
