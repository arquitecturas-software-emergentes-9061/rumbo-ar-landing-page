document.querySelector(".contact-form").addEventListener("submit", (event) => {
  // Keep form data local until the real submission endpoint is integrated.
  event.preventDefault();
});

const menuButton = document.getElementById('hamburger');
const menuLinks = document.getElementById('navLinks');
function setMenuOpen(open) {
  menuLinks.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}
menuButton.addEventListener('click', () => setMenuOpen(!menuLinks.classList.contains('open')));
menuLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});
menuLinks.closest('nav').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuLinks.classList.contains('open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
