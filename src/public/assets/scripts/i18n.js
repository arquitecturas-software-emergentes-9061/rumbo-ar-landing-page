/* =====================================================
   RUMBO-AR — INTERACTIVE JAVASCRIPT & COMPLETE I18N
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DICCIONARIO COMPLETO DE TRADUCCIÓN ES / EN ────── */
  const translations = {
    es: {
      nav_benefits: "Beneficios",
      nav_product: "El Producto",
      nav_plans: "Planes",
      nav_team: "Equipo",
      nav_contact: "Contacto",

      hero_badge: "Navegación indoor para clínicas",
      hero_title: "Encuentra tu camino dentro de la clínica",
      hero_desc: "Rumbo-AR ayuda a pacientes y acompañantes a encontrar consultorios, servicios y áreas dentro de la clínica mediante mapas interiores, rutas guiadas y realidad aumentada.",
      hero_btn_demo: "Solicitar demo →",
      aud_patients_label: "PARA PACIENTES Y ACOMPAÑANTES",
      aud_patients_text: "Explora la clínica con mayor autonomía",
      aud_clinics_label: "PARA CLÍNICAS",
      aud_clinics_text: "Mejora la orientación dentro de tus instalaciones",

      comp_title: "Orientarse dentro de una clínica no debería ser complicado",
      comp_desc: "Las clínicas de gran tamaño pueden contar con múltiples pisos, consultorios, laboratorios, farmacias y áreas de atención. Para quienes visitan el establecimiento por primera vez, encontrar un destino puede generar pérdida de tiempo, recorridos innecesarios y consultas frecuentes al personal.",
      comp_bad_badge: "Recorrido convencional",
      comp_bad_time: "Tiempo prom: 18 min",
      comp_bad_p1: "Desorientación recurrente en intersecciones y pasillos gemelos.",
      comp_bad_p2: "Interrupciones constantes al personal médico y administrativo.",
      comp_bad_p3: "Retrasos en consultas e incremento de estrés en pacientes.",
      comp_good_badge: "Recorrido con Rumbo-AR",
      comp_good_time: "Tiempo prom: 4 min (-78%)",
      comp_good_p1: "Ruta continua en ángulo recto con hitos visuales identificables.",
      comp_good_p2: "Transición clara entre pisos guiada por balizas BLE.",
      comp_good_p3: "Puntualidad en turnos médicos y autonomía asistencial plena.",

      feat_group1_badge: "Pacientes y acompañantes",
      feat_group1_title: "Muévete con mayor confianza",
      feat_card1_title: "Encuentra tu destino",
      feat_card1_desc: "Búsqueda rápida de consultorios, médicos, laboratorios y áreas específicas sin perder tiempo preguntando.",
      feat_card1_tag: "◇ Índice directo de consultorios",
      feat_card2_title: "Sigue una ruta clara",
      feat_card2_desc: "Trazo continuo paso a paso sin dudas en cruces de pasillos o intersecciones complejas dentro del edificio.",
      feat_card2_tag: "♪ Giros calibrados en 90°",
      feat_card3_title: "Recibe indicaciones",
      feat_card3_desc: "Avisos sonoros o visuales en pantalla anticipando cambios de nivel, pasajes y llegada al consultorio.",
      feat_card3_tag: "☑ Cambios de piso asistidos",
      feat_card4_title: "Rutas adaptadas",
      feat_card4_desc: "Modo accesible universal: trayectorias 100% libres de escalones y desniveles para sillas de ruedas y coches.",
      feat_card4_tag: "⊙ Cumple estándar de accesibilidad",

      feat_group2_badge: "Clínicas y administradores",
      feat_group2_title: "Mejora la experiencia de orientación",
      feat_card5_title: "Reduce consultas",
      feat_card5_desc: "Descongestiona los mesones de admisión y permite al personal médico enfocarse plenamente en la atención.",
      feat_card5_tag: "-60% preguntas de ubicación en recepción",
      feat_card6_title: "Gestiona tus espacios",
      feat_card6_desc: "Mapeo interior intuitivo: carga planos CAD, define recintos y actualiza balizas lógicas sin fricciones.",
      feat_card6_tag: "Editor modular de pisos y nodos",
      feat_card7_title: "Información actualizada",
      feat_card7_desc: "Comunica al instante obras en pasillos, reubicación temporal de consultorios o cierres de mantenimiento.",
      feat_card7_tag: "Sincronización en tiempo real",
      feat_card8_title: "Analiza el uso",
      feat_card8_desc: "Métricas anónimas de desplazamientos, áreas con mayor demanda de orientación y tiempos de flujo.",
      feat_card8_tag: "Telemetría agregada 100% privada",


      prod_badge: "EL PRODUCTO",
      prod_title: "Acerca del Sistema Rumbo-AR",
      prod_demo_alt: "Vista de la ruta en realidad aumentada",
      prod_demo_caption: "Vista ilustrativa: la ruta indica continuar recto 12 metros y muestra Cardiología a 18 metros.",
      prod_desc: "Rumbo-AR combina navegación guiada en interiores, planos de planta inteligentes y realidad aumentada para brindar una orientación autónoma y sin estrés en centros de salud.",
      prod_f1_title: "Posicionamiento BLE",
      prod_f1_desc: "Microbalizas Bluetooth de bajo consumo que determinan la ubicación milimétrica dentro de la clínica sin depender de señal GPS.",
      prod_f2_title: "Planos Interactivos",
      prod_f2_desc: "Visualización vectorial de plantas, consultorios y servicios con cambio ágil entre niveles y filtros de especialidades médicas.",
      prod_f3_title: "Indicaciones en Tiempo Real",
      prod_f3_desc: "Avisos anticipados de giros en 90°, aproximación a ascensores y llegada exacta a la puerta del consultorio o ventanilla.",
      prod_f4_title: "Telemetría y Reportes",
      prod_f4_desc: "Métricas de flujo, congestión de pasillos y tiempos medios de llegada para que la administración optimice sus instalaciones.",


      price_main_title: "Planes diseñados para cada clínica",
      price_main_desc: "Elige el plan que mejor se adapte al tamaño de tu organización, número de sedes y necesidades de navegación.",
      plan1_name: "BÁSICO",
      plan1_desc: "Para clínicas pequeñas y centros de atención única.",
      plan1_bill: "Facturación mensual",
      plan1_sect: "INFRAESTRUCTURA INCLUIDA",
      plan1_f1: "Una sede de referencia",
      plan1_f2: "Configuración de pisos y niveles",
      plan1_f3: "Mapas y destinos",
      plan1_f4: "Registro de referencias BLE",
      plan1_btn: "Comenzar",
      plan2_badge: "MÁS ELEGIDO",
      plan2_name: "PROFESIONAL",
      plan2_desc: "Para clínicas en crecimiento y centros multiespecialidad.",
      plan2_bill: "Facturación semestral · S/ 299.94",
      plan2_sect: "TODO LO DEL PLAN BÁSICO, MÁS:",
      plan2_f1: "Mayor capacidad de sedes y pisos",
      plan2_f2: "Gestión avanzada de espacios y recintos",
      plan2_f3: "Analíticas de afluencia y navegación",
      plan2_f4: "Soporte técnico prioritario",
      plan2_btn: "Elegir Profesional",
      plan3_name: "ENTERPRISE",
      plan3_desc: "Para redes de clínicas, complejos hospitalarios y campus médicos.",
      plan3_bill: "Facturación anual · S/ 719.88",
      plan3_sect: "CAPACIDAD INSTITUCIONAL COMPLETA",
      plan3_f1: "Gestión ilimitada de múltiples sedes",
      plan3_f2: "Límites de infraestructura personalizados",
      plan3_f3: "Analíticas avanzadas de telemetría y flujos",
      plan3_f4: "Integraciones empresariales (EHR / HIS)",
      plan3_f5: "Configuración según requerimientos",
      plan3_btn: "Contactar ventas",


      team_title: "Personas que hacen posible Rumbo-AR",
      team_desc: "Somos un equipo de estudiantes de Ingeniería de Software enfocado en diseñar una solución que combine arquitectura de software, experiencia de usuario y tecnologías de navegación indoor.",
      team_role: "Ingeniería de Software",


      contact_badge: "Atención institucional",
      contact_desc: "Descubre cómo Rumbo-AR puede adaptarse a la distribución y necesidades de orientación de tu establecimiento.",
      contact_b1: "Presentación personalizada para tu equipo técnico",
      contact_b2: "Revisión general de las necesidades de tu sede",
      contact_b3: "Orientación para integrar infraestructura BLE existente",
      contact_b4: "Recomendaciones iniciales de configuración de pisos",
      contact_b5: "Espacio para resolver preguntas técnicas y operativas",
      contact_box_tag: "MAPEO LÓGICO",
      contact_box_title: "Integración sin obras civiles",
      contact_box_desc: "Configuración 100% sobre software y hardware previo.",
      contact_title: "Solicita una demo para tu clínica",
      form_label_name: "Nombre completo",
      form_label_email: "Correo institucional",
      form_label_clinic: "Nombre de la clínica",
      form_label_role: "Cargo",
      form_label_sedes: "Número de sedes",
      form_opt_1: "1 sede",
      form_opt_2: "2 a 3 sedes",
      form_opt_3: "Red multisede (4 o más)",
      form_label_msg: "Mensaje",
      form_ph_name: "Ej. Dra. Carmen Mendoza",
      form_ph_email: "carmen.mendoza@clinica.com",
      form_ph_clinic: "Clínica San Lucas",
      form_ph_role: "Director de Operaciones / TI",
      form_ph_msg: "Cuéntanos brevemente sobre las necesidades de navegación en tu clínica...",
      form_terms: "Acepto la Política de Privacidad y el tratamiento de datos institucionales.",
      form_btn: "Solicitar demo",


    },

    en: {
      nav_benefits: "Benefits",
      nav_product: "The Product",
      nav_plans: "Plans",
      nav_team: "Team",
      nav_contact: "Contact",

      hero_badge: "Indoor navigation for clinics",
      hero_title: "Find your way inside the clinic",
      hero_desc: "Rumbo-AR helps patients and companions easily locate doctors' offices, clinical services, and departments through indoor maps, turn-by-turn routes, and augmented reality.",
      hero_btn_demo: "Request a demo →",
      aud_patients_label: "FOR PATIENTS & VISITORS",
      aud_patients_text: "Navigate the clinic with complete autonomy",
      aud_clinics_label: "FOR HEALTHCARE FACILITIES",
      aud_clinics_text: "Enhance orientation across all your facilities",

      comp_title: "Navigating inside a clinic shouldn't be complicated",
      comp_desc: "Large hospitals and clinics feature multiple floors, exam rooms, laboratories, and waiting areas. First-time visitors frequently suffer from lost time, unnecessary walking, and constant inquiries to staff.",
      comp_bad_badge: "Conventional Wayfinding",
      comp_bad_time: "Avg. time: 18 min",
      comp_bad_p1: "Recurring disorientation at complex intersections and identical hallways.",
      comp_bad_p2: "Constant interruptions to clinical and front-desk administrative staff.",
      comp_bad_p3: "Consultation delays and increased anxiety among patients and families.",
      comp_good_badge: "Navigation with Rumbo-AR",
      comp_good_time: "Avg. time: 4 min (-78%)",
      comp_good_p1: "Continuous orthogonal paths with clear visual landmark guidance.",
      comp_good_p2: "Effortless multi-floor transitions enabled by Bluetooth BLE beacons.",
      comp_good_p3: "On-time medical appointments and full personal mobility autonomy.",

      feat_group1_badge: "Patients & Companions",
      feat_group1_title: "Move with greater confidence",
      feat_card1_title: "Find your destination",
      feat_card1_desc: "Instant search for doctors, specialties, diagnostics, and wards without needing to ask around.",
      feat_card1_tag: "◇ Direct medical directory",
      feat_card2_title: "Follow clear paths",
      feat_card2_desc: "Unbroken step-by-step trajectories eliminating confusion at hallway bifurcations.",
      feat_card2_tag: "♪ Calibrated 90° turns",
      feat_card3_title: "Real-time prompts",
      feat_card3_desc: "Audio and visual on-screen alerts anticipating elevators, floor changes, and arrival.",
      feat_card3_tag: "☑ Assisted level transitions",
      feat_card4_title: "Accessible routes",
      feat_card4_desc: "Universal barrier-free mode: 100% step-free pathways for wheelchairs and strollers.",
      feat_card4_tag: "⊙ Full ADA accessibility compliance",

      feat_group2_badge: "Clinics & Facility Managers",
      feat_group2_title: "Elevate the orientation experience",
      feat_card5_title: "Reduce desk inquiries",
      feat_card5_desc: "Alleviate reception bottleneck, allowing clinical personnel to focus entirely on patient care.",
      feat_card5_tag: "-60% location inquiries at front desk",
      feat_card6_title: "Manage your floor plans",
      feat_card6_desc: "Intuitive indoor layout manager: import CAD maps, define zones, and calibrate beacons seamlessly.",
      feat_card6_tag: "Modular node & floor editor",
      feat_card7_title: "Up-to-date notifications",
      feat_card7_desc: "Instantly notify temporary corridor closures, maintenance works, or relocated offices.",
      feat_card7_tag: "Real-time synchronization",
      feat_card8_title: "Analyze movement telemetry",
      feat_card8_desc: "Anonymized mobility metrics, high-traffic corridors, and navigation bottleneck analysis.",
      feat_card8_tag: "100% private aggregated telemetry",


      prod_badge: "THE PRODUCT",
      prod_title: "About the Rumbo-AR System",
      prod_demo_alt: "Augmented reality route preview",
      prod_demo_caption: "Illustrative preview: the route prompts you to continue straight for 12 meters and shows Cardiology 18 meters away.",
      prod_desc: "Rumbo-AR combines guided indoor navigation, intelligent floor plans, and augmented reality to provide autonomous, stress-free wayfinding in healthcare centers.",
      prod_f1_title: "BLE Positioning",
      prod_f1_desc: "Low-energy Bluetooth micro-beacons determining sub-meter indoor clinic positioning without depending on GPS satellites.",
      prod_f2_title: "Interactive Floor Plans",
      prod_f2_desc: "Vector visualization of floors, exam rooms, and clinical services with fast level switching and medical specialty filters.",
      prod_f3_title: "Real-Time Turn Prompts",
      prod_f3_desc: "Proactive notifications for 90-degree turns, elevator arrivals, and exact arrival at the doctor's office door.",
      prod_f4_title: "Telemetry & Analytics",
      prod_f4_desc: "Flow metrics, hallway congestion analytics, and average transit times enabling facility managers to optimize their clinic.",


      price_main_title: "Plans designed for every clinic",
      price_main_desc: "Choose the plan that best fits your organization's scale, campus count, and wayfinding needs.",
      plan1_name: "BASIC",
      plan1_desc: "For small clinics and single-location facilities.",
      plan1_bill: "Billed monthly",
      plan1_sect: "INCLUDED INFRASTRUCTURE",
      plan1_f1: "One reference campus",
      plan1_f2: "Floors and levels setup",
      plan1_f3: "Maps and destinations",
      plan1_f4: "BLE reference registration",
      plan1_btn: "Get Started",
      plan2_badge: "MOST POPULAR",
      plan2_name: "PROFESSIONAL",
      plan2_desc: "For growing clinics and multi-specialty healthcare centers.",
      plan2_bill: "Billed semi-annually · S/ 299.94",
      plan2_sect: "EVERYTHING IN BASIC, PLUS:",
      plan2_f1: "Higher capacity of floors & campuses",
      plan2_f2: "Advanced space and room management",
      plan2_f3: "Foot-traffic and wayfinding analytics",
      plan2_f4: "Priority technical support",
      plan2_btn: "Select Professional",
      plan3_name: "ENTERPRISE",
      plan3_desc: "For hospital networks, healthcare clusters, and university medical centers.",
      plan3_bill: "Billed annually · S/ 719.88",
      plan3_sect: "FULL INSTITUTIONAL CAPABILITIES",
      plan3_f1: "Unlimited multi-campus management",
      plan3_f2: "Custom infrastructure limits",
      plan3_f3: "Advanced telemetry & flow analytics",
      plan3_f4: "Enterprise integrations (EHR / HIS)",
      plan3_f5: "Custom setup tailored to requirements",
      plan3_btn: "Contact Sales",


      team_title: "The team behind Rumbo-AR",
      team_desc: "We are a passionate team of Software Engineering students combining software architecture, user experience, and indoor positioning technologies.",
      team_role: "Software Engineering",


      contact_badge: "Institutional Inquiries",
      contact_desc: "Discover how Rumbo-AR adapts to your facility's architectural layout and patient wayfinding needs.",
      contact_b1: "Tailored technical presentation for your operational team",
      contact_b2: "Comprehensive review of your clinic's wayfinding bottlenecks",
      contact_b3: "Consultation on leveraging existing BLE & Wi-Fi infrastructure",
      contact_b4: "Preliminary floorplan and zone configuration recommendations",
      contact_b5: "Dedicated Q&A session covering IT, privacy, and clinical workflow",
      contact_box_tag: "LOGICAL MAPPING",
      contact_box_title: "Zero construction works required",
      contact_box_desc: "100% configured through cloud software and pre-existing hardware.",
      contact_title: "Request a guided demo for your clinic",
      form_label_name: "Full name",
      form_label_email: "Work email",
      form_label_clinic: "Clinic / Hospital name",
      form_label_role: "Job title",
      form_label_sedes: "Number of campuses",
      form_opt_1: "1 campus",
      form_opt_2: "2 to 3 campuses",
      form_opt_3: "Multi-campus network (4+)",
      form_label_msg: "Message",
      form_ph_name: "e.g. Dr. Carmen Mendoza",
      form_ph_email: "carmen.mendoza@hospital.com",
      form_ph_clinic: "Saint Luke Medical Center",
      form_ph_role: "Chief of Operations / IT",
      form_ph_msg: "Tell us briefly about navigation challenges in your medical facility...",
      form_terms: "I agree to the Privacy Policy and institutional data processing terms.",
      form_btn: "Request demo",


    }
  };

  let currentLang = 'es';
  const langSwitch = document.getElementById('langSwitch');
  const currentLangLabel = document.getElementById('currentLangLabel');

  function setLanguage(lang) {
    currentLang = lang;
    if (currentLangLabel) {
      currentLangLabel.textContent = lang.toUpperCase();
    }

    // Text translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    // Placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const value = translations[lang]?.[el.dataset.i18nAlt];
      if (value !== undefined) el.alt = value;
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }

  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const nextLang = currentLang === 'es' ? 'en' : 'es';
      setLanguage(nextLang);
    });
  }


});
