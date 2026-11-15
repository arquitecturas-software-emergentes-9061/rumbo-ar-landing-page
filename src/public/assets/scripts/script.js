const contactForm = document.querySelector('.contact-form');
const formNotice = document.getElementById('formNotice');
const requestModes = {
  '#contacto': 'demo',
  '#request-type-onboarding': 'onboarding'
};

function updateRequestLabel() {
  const type = contactForm.elements.request_type.value;
  contactForm.querySelectorAll('[data-request-label]').forEach(label => {
    label.hidden = label.dataset.requestLabel !== type;
  });
  formNotice.hidden = true;
}

function selectRequest(fragment) {
  const type = requestModes[fragment];
  if (!type) return;
  document.getElementById('request-type-' + type).checked = true;
  updateRequestLabel();
}

document.querySelectorAll('a[href="#contacto"], a[href="#request-type-onboarding"]').forEach(link => {
  link.addEventListener('click', () => selectRequest(link.hash));
});
window.addEventListener('hashchange', () => selectRequest(location.hash));
contactForm.addEventListener('change', updateRequestLabel);
contactForm.addEventListener('input', () => { formNotice.hidden = true; });
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formNotice.hidden = false;
});
selectRequest(location.hash);

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
