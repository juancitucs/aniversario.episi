/* ═══════════════════════════════════════════════════════════════
   19.º Aniversario EPISI · UNAM 2026
   Interacciones: portada, cuenta regresiva, programa, lightbox,
   calendario, compartir y animaciones de scroll.
   ═══════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ───────────────────────── Datos del programa ───────────────────────── */

  const program = [
    {
      id: "sab-21",
      num: "21",
      short: "Sáb",
      day: "Sábado",
      date: "21 de noviembre",
      events: [
        {
          time: "09:00 — 13:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
      ],
    },
    {
      id: "lun-23",
      num: "23",
      short: "Lun",
      day: "Lunes",
      date: "23 de noviembre",
      events: [
        {
          time: "08:30 — 13:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
        {
          time: "14:00 — 17:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
      ],
    },
    {
      id: "mar-24",
      num: "24",
      short: "Mar",
      day: "Martes",
      date: "24 de noviembre",
      events: [
        {
          time: "08:30 — 13:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
        {
          time: "14:00 — 17:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
      ],
    },
    {
      id: "mie-25",
      num: "25",
      short: "Mié",
      day: "Miércoles",
      date: "25 de noviembre",
      events: [
        {
          time: "09:00 — 13:00",
          title: "Gincana",
          tag: "Cultura",
          tone: "cultura",
        },
        {
          time: "14:00 — 16:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
      ],
    },
    {
      id: "jue-26",
      num: "26",
      short: "Jue",
      day: "Jueves",
      date: "26 de noviembre",
      events: [
        {
          time: "08:30 — 13:00",
          title: "Campeonato Intercódigos",
          tag: "Deporte",
          tone: "deporte",
        },
        {
          time: "10:00 — 12:00",
          title: "Concurso de Proyectos de Innovación Tecnológica — 2026",
          tag: "Innovación",
          tone: "innovacion",
        },
        {
          time: "14:00 — 20:00",
          title: "Campeonato Videojuegos E-Sport EPISI 2026",
          tag: "E-Sport",
          tone: "esport",
        },
        {
          time: "15:30 — 17:30",
          title: "Concurso de Programación",
          tag: "Programación",
          tone: "programacion",
        },
      ],
    },
    {
      id: "vie-27",
      num: "27",
      short: "Vie",
      day: "Viernes",
      date: "27 de noviembre",
      events: [],
    },
    {
      id: "dom-29",
      num: "29",
      short: "Dom",
      day: "Domingo",
      date: "29 de noviembre",
      events: [
        {
          time: "07:30 — 09:30",
          title: "Desfile Institucional",
          tag: "Desfile",
          tone: "desfile",
        },
        {
          time: "19:00 — 22:00",
          title: "Ceremonia Central y Cena de Confraternidad",
          tag: "Ceremonia",
          tone: "ceremonia",
        },
      ],
    },
  ];

  /* ───────────────────────── Utilidades ───────────────────────── */

  const toastEl = $("#toast");
  let toastTimer;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  function pad(value) {
    return String(Math.max(0, value)).padStart(2, "0");
  }

  /* ───────────────────────── Portada ───────────────────────── */

  const cover = $("#cover");
  const openButton = $("#openInvitation");
  const main = $("#inicio");

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  function openInvitation() {
    if (!cover || cover.classList.contains("is-leaving")) return;

    cover.classList.add("is-leaving");
    document.body.classList.remove("is-locked");

    setTimeout(() => {
      cover.setAttribute("aria-hidden", "true");
      cover.removeAttribute("role");
      cover.removeAttribute("aria-modal");
      cover.style.display = "none";
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
    }, reduceMotion.matches ? 30 : 950);
  }

  if (cover && openButton) {
    openButton.addEventListener("click", openInvitation);
  }

  /* ───────────────────────── Navegación y progreso ───────────────────────── */

  const nav = $("#nav");
  const progressBar = $("#scrollProgress");
  let ticking = false;

  function onScrollFrame() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) nav.classList.toggle("is-scrolled", scrollTop > 40);

    if (progressBar) {
      progressBar.style.width = `${height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0}%`;
    }

    if (!reduceMotion.matches && window.innerWidth > 980) {
      const heroImg = $("[data-parallax]");
      if (heroImg && scrollTop < window.innerHeight * 1.2) {
        heroImg.style.setProperty("--parallax", `${Math.min(scrollTop * 0.1, 26)}px`);
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScrollFrame);
      }
    },
    { passive: true },
  );

  onScrollFrame();

  const navLinks = $$("[data-nav]");
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.nav === entry.target.id);
          });
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ───────────────────────── Apariciones ───────────────────────── */

  const revealEls = $$(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  $$(".hero__title span").forEach((span, index) => {
    span.style.setProperty("--delay", `${index * 0.09}s`);
  });

  /* ───────────────────────── Cuenta regresiva ───────────────────────── */

  const countdown = $("#countdown");
  const targetDate = new Date("2026-11-29T19:00:00-05:00");

  function updateCountdown() {
    if (!countdown) return;

    const diff = targetDate.getTime() - Date.now();
    const units = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    Object.entries(units).forEach(([key, value]) => {
      const el = $(`[data-unit="${key}"]`, countdown);
      if (el) el.textContent = diff > 0 ? pad(value) : "00";
    });

    if (diff <= 0) {
      const label = $(".countdown__label");
      if (label) label.textContent = "El aniversario ya está aquí";
      countdown.setAttribute(
        "aria-label",
        "La ceremonia central del 29 de noviembre de 2026 ha comenzado",
      );
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ───────────────────────── Programa interactivo ───────────────────────── */

  const tabsEl = $("#programTabs");
  const panelEl = $("#programPanel");

  function renderPanel(index) {
    const dayData = program[index];
    if (!panelEl || !dayData) return;

    const eventsMarkup = dayData.events.length
      ? dayData.events
          .map(
            (event) => `
            <div class="event">
              <span class="event__time">${event.time}</span>
              <span class="event__title">${event.title}</span>
              <span class="event__tag tone--${event.tone}">${event.tag}</span>
            </div>`,
          )
          .join("")
      : `<p class="panel__empty">Sin actividades programadas.<br>Nos vemos en el desfile del domingo 29.</p>`;

    panelEl.innerHTML = `
      <div class="panel__body" role="group" aria-label="${dayData.day} ${dayData.date}">
        <div class="panel__head">
          <h3 class="panel__title">${dayData.day}</h3>
          <span class="panel__date">${dayData.date} · 2026</span>
        </div>
        ${eventsMarkup}
      </div>`;
  }

  function selectDay(index, { focus = false } = {}) {
    const tabs = $$(".tab", tabsEl);

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        panelEl.setAttribute("aria-labelledby", tab.id);
        if (focus) tab.focus();
      }
    });

    renderPanel(index);
  }

  if (tabsEl && panelEl) {
    program.forEach((dayData, index) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab";
      tab.id = `tab-${dayData.id}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "programPanel");
      tab.setAttribute("aria-selected", String(index === 0));
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.innerHTML = `
        <span class="tab__num">${dayData.num}</span>
        <span class="tab__day">${dayData.short}</span>
        <span class="tab__dot" aria-hidden="true"></span>`;

      tab.addEventListener("click", () => selectDay(index));
      tab.addEventListener("keydown", (event) => {
        const keys = {
          ArrowDown: index + 1,
          ArrowRight: index + 1,
          ArrowUp: index - 1,
          ArrowLeft: index - 1,
          Home: 0,
          End: program.length - 1,
        };

        if (!(event.key in keys)) return;
        event.preventDefault();

        const next = (keys[event.key] + program.length) % program.length;
        selectDay(next, { focus: true });
      });

      tabsEl.appendChild(tab);
    });

    selectDay(0);
  }

  /* ───────────────────────── Lightbox ───────────────────────── */

  const pieces = [
    {
      key: "invitacion",
      title: "Invitación",
      caption: "Invitación oficial · Aniversario de la Carrera · EPISI 2026",
      src: "images/invitacion.png",
      file: "EPISI-19-invitacion.png",
      alt: "Invitación oficial del 19.º aniversario de EPISI",
    },
    {
      key: "cronograma",
      title: "Cronograma",
      caption: "Programa oficial de actividades · 21—29 de noviembre de 2026",
      src: "images/cronograma.jpg",
      file: "EPISI-19-cronograma.jpg",
      alt: "Cronograma oficial de actividades del 21 al 29 de noviembre",
    },
    {
      key: "aviso",
      title: "Aviso de desfile",
      caption: "Ensayo: viernes 20 de noviembre · Desfile: domingo 29 de noviembre",
      src: "images/aviso-desfile.jpg",
      file: "EPISI-19-aviso-desfile.jpg",
      alt: "Aviso oficial de ensayo y desfile institucional",
    },
  ];

  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxCaption = $("#lightboxCaption");
  const lightboxCount = $("#lightboxCount");
  const lightboxDownload = $("#lightboxDownload");
  const lightboxDialog = $(".lightbox__dialog");
  let currentPiece = 0;
  let lastFocused = null;

  function renderPiece(index) {
    const piece = pieces[index];
    if (!piece || !lightbox) return;

    currentPiece = index;
    lightboxImg.classList.add("is-loading");
    lightboxImg.src = piece.src;
    lightboxImg.alt = piece.alt;
    lightboxTitle.textContent = piece.title;
    lightboxCaption.textContent = piece.caption;
    lightboxCount.textContent = `${index + 1} / ${pieces.length}`;
    lightboxDownload.href = piece.src;
    lightboxDownload.setAttribute("download", piece.file);
  }

  if (lightboxImg) {
    lightboxImg.addEventListener("load", () => lightboxImg.classList.remove("is-loading"));
  }

  function openLightbox(key) {
    if (!lightbox) return;

    const index = Math.max(
      0,
      pieces.findIndex((piece) => piece.key === key),
    );

    lastFocused = document.activeElement;
    renderPiece(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");

    const closeButton = $(".lightbox__close", lightbox);
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
  }

  function stepLightbox(direction) {
    renderPiece((currentPiece + direction + pieces.length) % pieces.length);
  }

  $$("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger.dataset.lightbox));
  });

  $$("[data-close]", lightbox || document).forEach((button) => {
    button.addEventListener("click", closeLightbox);
  });

  const prevButton = $("[data-prev]", lightbox || document);
  const nextButton = $("[data-next]", lightbox || document);

  if (prevButton) prevButton.addEventListener("click", () => stepLightbox(-1));
  if (nextButton) nextButton.addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    }

    if (event.key === "Tab" && lightboxDialog) {
      const focusables = $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        lightboxDialog,
      ).filter((el) => el.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ───────────────────────── Calendario (.ics) ───────────────────────── */

  function icsDate(date) {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  function calendarFile() {
    const stamp = icsDate(new Date());
    const events = [
      {
        uid: "desfile-19-episi-2026@unam.edu.pe",
        start: "20261129T073000",
        end: "20261129T093000",
        summary: "Desfile institucional — 19.º Aniversario EPISI",
        description:
          "Desfile institucional por el 19.º aniversario de la Escuela Profesional de Ingenieria de Sistemas e Informatica (EPISI), Universidad Nacional de Moquegua.",
      },
      {
        uid: "ceremonia-19-episi-2026@unam.edu.pe",
        start: "20261129T190000",
        end: "20261129T220000",
        summary: "Ceremonia central y cena — 19.º Aniversario EPISI",
        description:
          "Ceremonia central y cena de confraternidad por el 19.º aniversario de EPISI, Universidad Nacional de Moquegua.",
      },
    ];

    const body = events
      .map(
        (event) => `BEGIN:VEVENT
UID:${event.uid}
DTSTAMP:${stamp}
DTSTART;TZID=America/Lima:${event.start}
DTEND;TZID=America/Lima:${event.end}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:Moquegua\\, Peru
END:VEVENT`,
      )
      .join("\r\n");

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EPISI UNAM//19 Aniversario//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:America/Lima
X-LIC-LOCATION:America/Lima
BEGIN:STANDARD
DTSTART:19700101T000000
TZOFFSETFROM:-0500
TZOFFSETTO:-0500
TZNAME:PET
END:STANDARD
END:VTIMEZONE
${body}
END:VCALENDAR`.replace(/\n/g, "\r\n");
  }

  $$("[data-calendar]").forEach((button) => {
    button.addEventListener("click", () => {
      const blob = new Blob([calendarFile()], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "EPISI-19-aniversario.ics";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast("Calendario descargado · 29 de noviembre");
    });
  });

  /* ───────────────────────── Compartir ───────────────────────── */

  async function copyLink() {
    const shareData = {
      title: "19.º Aniversario EPISI · UNAM 2026",
      text: "Diecinueve años de futuro. Del 21 al 29 de noviembre de 2026.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast("Enlace copiado");
    } catch (error) {
      if (error && error.name === "AbortError") return;

      try {
        const field = document.createElement("textarea");
        field.value = window.location.href;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
        toast("Enlace copiado");
      } catch {
        toast("No se pudo compartir el enlace");
      }
    }
  }

  $$("[data-share]").forEach((button) => {
    button.addEventListener("click", copyLink);
  });

  /* ───────────────────────── Enlaces internos ───────────────────────── */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", id);
    });
  });
})();
