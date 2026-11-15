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
contactForm.addEventListener('change', (event) => {
  if (event.target.name === 'request_type') updateRequestLabel();
});
contactForm.addEventListener('input', () => {
  if (!sending) formNotice.hidden = true;
});
selectRequest(location.hash);

/* ── PR-4: send the demo or onboarding request to rumbo-api ── */
const config = window.RUMBO_CONFIG || {};
const submitButton = contactForm.querySelector('.btn-submit');
const formReceipt = document.getElementById('formReceipt');
const sitesRanges = { '1 sede': 'ONE', '2-3 sedes': 'TWO_TO_THREE', '4+ sedes': 'FOUR_OR_MORE' };
let sending = false;

function currentLanguage() {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

// The notice keeps its i18n key, so switching the language also translates the last message.
function showNotice(key, state, receiptId) {
  formNotice.dataset.i18n = key;
  formNotice.dataset.state = state;
  formNotice.textContent = window.rumboI18n ? window.rumboI18n.t(key) : key;
  formNotice.setAttribute('role', state === 'error' ? 'alert' : 'status');
  formNotice.hidden = false;
  formReceipt.hidden = !receiptId;
  formReceipt.querySelector('code').textContent = receiptId || '';
}

function setSending(value) {
  sending = value;
  submitButton.disabled = value;
  submitButton.setAttribute('aria-busy', String(value));
  contactForm.setAttribute('aria-busy', String(value));
}

function requestPayload() {
  const fields = contactForm.elements;
  const optional = (text) => text.trim() || null;
  return {
    type: fields.request_type.value.toUpperCase(),
    fullName: fields.namedItem('name').value.trim(),
    email: fields.email.value.trim(),
    clinicName: fields.clinic.value.trim(),
    role: fields.role.value.trim(),
    sitesRange: sitesRanges[fields.sedes.value] || null,
    message: optional(fields.message.value),
    privacyConsent: fields.privacyConsent.checked
  };
}

async function submitRequest(event) {
  event.preventDefault();
  if (sending) return;
  const payload = requestPayload();
  setSending(true);
  showNotice('form_notice_sending', 'pending');
  try {
    const response = await fetch(config.apiBaseUrl + '/api/v1/onboarding-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',
        'Accept-Language': currentLanguage() },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(config.requestTimeoutMs || 15000)
    });
    if (response.status === 201) {
      const receipt = await response.json();
      const type = payload.type.toLowerCase();
      contactForm.reset();
      document.getElementById('request-type-' + type).checked = true;
      updateRequestLabel();
      showNotice('form_notice_sent_' + type, 'success', receipt.id);
    } else if (response.status === 400) {
      // The browser already validated the form, so this only happens if the API is stricter; the data stays.
      showNotice('form_notice_invalid', 'error');
    } else {
      showNotice('form_notice_failed', 'error');
    }
  } catch (error) {
    // Network failure, CORS refusal or timeout: nothing was stored and the data stays in the form.
    showNotice('form_notice_failed', 'error');
  } finally {
    setSending(false);
  }
}

contactForm.addEventListener('submit', submitRequest);

/* ── PR-10: a section whose image cannot load says so and the page keeps working ── */
function markMediaUnavailable(image) {
  if (image.dataset.mediaFailed) return;
  image.dataset.mediaFailed = 'true';
  image.hidden = true;
  const message = document.createElement('p');
  message.className = 'media-unavailable';
  message.setAttribute('role', 'status');
  message.dataset.i18n = 'media_unavailable';
  message.textContent = window.rumboI18n ? window.rumboI18n.t('media_unavailable') : 'Imagen no disponible por ahora.';
  image.insertAdjacentElement('afterend', message);
}

document.querySelectorAll('main img, section img').forEach(image => {
  image.addEventListener('error', () => markMediaUnavailable(image), { once: true });
  if (image.complete && image.naturalWidth === 0 && image.getAttribute('src')) markMediaUnavailable(image);
});

/* ── PR-14: the product video shows a clear state while it does not exist ── */
const productVideo = document.getElementById('productVideo');
if (productVideo && config.productVideoUrl) {
  const link = productVideo.querySelector('[data-video-link]');
  link.href = config.productVideoUrl;
  link.hidden = false;
  productVideo.querySelector('[data-video-pending]').hidden = true;
  productVideo.dataset.state = 'available';
}

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
