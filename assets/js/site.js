// Mobile navigation.
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const setMenu = (open) => {
  mobileMenu.classList.toggle('hidden', !open);
  burger.setAttribute('aria-expanded', String(open));
};
burger.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    burger.focus();
  }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));

// Mark the story panel currently passing the middle of the viewport.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  document.querySelectorAll('.story-step').forEach((step) => observer.observe(step));
}

// Signup happens in MAX. There are no name/phone fields or lead submissions here.
// Missing or invalid configuration keeps the unavailable message visible.
const signupLink = document.getElementById('maxSignupLink');
const signupUnavailable = document.getElementById('maxSignupUnavailable');
try {
  const url = new URL(window.GOROD_CONFIG?.maxBotUrl);
  if (
    url.protocol === 'https:' && url.hostname === 'max.ru' && !url.port &&
    !url.username && !url.password && !url.search && !url.hash &&
    /^\/[a-z][a-z0-9_]*bot\/?$/i.test(url.pathname)
  ) {
    signupLink.href = url.href;
    signupLink.classList.remove('hidden');
    document.getElementById('maxSignupReady').classList.remove('hidden');
    signupUnavailable.classList.add('hidden');
  }
} catch {
  // The published bot link has not been configured yet.
}
