/* =====================================================
   RUMBO-AR — INTERACTIVE JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HAMBURGER MENU ───────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  if (hamburger) {
    const setMenuOpen = (isOpen) => {
      navMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!navMenu.classList.contains('open'));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        setMenuOpen(false);
        hamburger.focus();
      }
    });

    // Mismo punto de corte que el panel desplegable en styles.css
    window.matchMedia('(min-width: 1321px)').addEventListener('change', (event) => {
      if (event.matches) setMenuOpen(false);
    });
  }

  /* ── 2. ACTIVE NAV LINK ON SCROLL ────────────────── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navItems.forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (href && href === `#${current}`) {
        a.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── 3. SCROLL REVEAL ANIMATIONS ─────────────────── */
  const animEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, parseInt(delay, 10));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  animEls.forEach(el => observer.observe(el));

  /* ── 4. FAQ ACCORDION ────────────────────────────── */
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const header = card.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');

        // Cerrar todos los demás
        faqCards.forEach(c => {
          c.classList.remove('open');
          const arrow = c.querySelector('.faq-arrow');
          if (arrow) arrow.textContent = '▼';
        });

        // Abrir este si estaba cerrado
        if (!isOpen) {
          card.classList.add('open');
          const arrow = card.querySelector('.faq-arrow');
          if (arrow) arrow.textContent = '▲';
        }
      });
    }
  });

  /* ── 5. ACCESSIBILITY SWITCH INTERACTIVO ─────────── */
  const adaToggle = document.querySelector('.toggle-switch');
  if (adaToggle) {
    adaToggle.addEventListener('click', () => {
      adaToggle.classList.toggle('active');
    });
  }

  /* ── 6. SELECTOR DE NIVELES INTERACTIVO ──────────── */
  const levelBtns = document.querySelectorAll('.level-btn');
  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      levelBtns.forEach(b => b.classList.remove('level-active'));
      btn.classList.add('level-active');
    });
  });

  /* ── 7. FORMULARIO DE SOLICITUD (PR-4) ───────────── */
  // Envía la solicitud a rumbo-api (POST /api/v1/onboarding-requests). La URL está en config.js
  const config = window.RUMBO_CONFIG || {};
  const t = (key) => (window.rumboI18n ? window.rumboI18n.t(key) : key);
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const formNotice = document.getElementById('formNotice');
    const formReceipt = document.getElementById('formReceipt');
    const submitButton = contactForm.querySelector('.btn-submit');
    const submitLabels = contactForm.querySelectorAll('[data-request-label]');
    const sitesRanges = { '1': 'ONE', '2-3': 'TWO_TO_THREE', '4+': 'FOUR_OR_MORE' };
    let sending = false;

    const updateRequestLabel = () => {
      const type = contactForm.elements.request_type.value;
      submitLabels.forEach(label => {
        label.hidden = label.dataset.requestLabel !== type;
      });
    };

    // El aviso guarda su clave de i18n, así que al cambiar de idioma también se traduce
    const showNotice = (key, state, receiptId) => {
      formNotice.dataset.i18n = key;
      formNotice.dataset.state = state;
      formNotice.textContent = t(key);
      formNotice.setAttribute('role', state === 'error' ? 'alert' : 'status');
      formNotice.hidden = false;
      formReceipt.hidden = !receiptId;
      formReceipt.querySelector('code').textContent = receiptId || '';
    };

    const setSending = (value) => {
      sending = value;
      submitButton.disabled = value;
      submitButton.setAttribute('aria-busy', String(value));
      contactForm.setAttribute('aria-busy', String(value));
    };

    const requestPayload = () => {
      const fields = contactForm.elements;
      return {
        type: fields.request_type.value.toUpperCase(),
        fullName: fields.contact_name.value.trim(),
        email: fields.contact_email.value.trim(),
        clinicName: fields.organization_name.value.trim(),
        role: fields.contact_role.value.trim(),
        sitesRange: sitesRanges[fields.site_count.value] || null,
        message: fields.message.value.trim() || null,
        privacyConsent: fields.privacy_accepted.checked
      };
    };

    contactForm.addEventListener('change', (event) => {
      if (event.target.name === 'request_type') updateRequestLabel();
    });

    contactForm.addEventListener('input', () => {
      if (!sending) {
        formNotice.hidden = true;
        formReceipt.hidden = true;
      }
    });

    // El evento submit solo se dispara si la validación nativa del formulario pasa
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending) return;
      const payload = requestPayload();
      setSending(true);
      showNotice('form_notice_sending', 'pending');
      try {
        const response = await fetch(config.apiBaseUrl + '/api/v1/onboarding-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json',
            'Accept-Language': document.documentElement.lang === 'en' ? 'en' : 'es' },
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
          // El navegador ya validó el formulario: solo pasa si la API es más estricta. Los datos se quedan
          showNotice('form_notice_invalid', 'error');
        } else {
          showNotice('form_notice_failed', 'error');
        }
      } catch (error) {
        // Sin red, CORS rechazado o tiempo agotado: no se guardó nada y los datos siguen en el formulario
        showNotice('form_notice_failed', 'error');
      } finally {
        setSending(false);
      }
    });
  }

  /* ── 7b. VIDEO DEL PRODUCTO (PR-14) ──────────────── */
  // Sin productVideoUrl en config.js la sección queda "en preparación" (así viene en el HTML)
  const productVideo = document.getElementById('productVideo');
  if (productVideo && config.productVideoUrl) {
    const playButton = productVideo.querySelector('.video-play-btn');
    const overlay = productVideo.querySelector('.video-overlay-preview');
    const slot = productVideo.querySelector('.video-embed-slot');
    productVideo.dataset.state = 'available';
    productVideo.querySelector('[data-video-pending]').hidden = true;
    playButton.hidden = false;
    playButton.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = config.productVideoUrl;
      frame.title = t('prod_video_badge');
      frame.allow = 'fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      slot.replaceChildren(frame);
      slot.style.display = 'block';
      overlay.style.display = 'none';
      productVideo.dataset.state = 'playing';
    });
  }

  /* ── 8. IMÁGENES NO DISPONIBLES ──────────────────── */
  document.querySelectorAll('.phone-mockup-img, .team-photo').forEach(img => {
    const markUnavailable = () => img.parentElement.classList.add('image-unavailable');
    img.addEventListener('error', markUnavailable);
    if (img.complete && img.naturalWidth === 0) markUnavailable();
  });

  // Confirma que las interacciones están activas (ver el script de <head> en index.html)
  document.documentElement.classList.add('js-ready');

});
