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

  /* ── 7. FORMULARIO DE SOLICITUD ──────────────────── */
  // Sin servicio externo conectado: no se envía ni se guarda ningún dato
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const formNotice = document.getElementById('formNotice');
    const submitLabels = contactForm.querySelectorAll('[data-request-label]');

    contactForm.addEventListener('change', (event) => {
      if (event.target.name !== 'request_type') return;
      submitLabels.forEach(label => {
        label.hidden = label.dataset.requestLabel !== event.target.value;
      });
    });

    // El evento submit solo se dispara si la validación nativa del formulario pasa
    contactForm.addEventListener('submit', () => {
      formNotice.hidden = false;
    });

    contactForm.addEventListener('input', () => {
      formNotice.hidden = true;
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
