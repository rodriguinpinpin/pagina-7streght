function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// 7 Strength Center — landing inmersiva con efectos 3D.
// Versión anterior: /respaldo-version-anterior/App.jsx
// Textos, precios, horarios, reels y entrenadores: src/site-config.js
import { useScroll, useSpring, motion, React, AnimatePresence, MenuIcon, XIcon, ArrowRightIcon, DumbbellIcon, TargetIcon, UsersIcon, ShieldCheckIcon, ClockIcon, CheckIcon, ZapIcon, MapPinIcon, PhoneIcon, InstagramIcon, MessageCircleIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, EyeIcon, Volume2Icon, VolumeXIcon, CalendarIcon, NavigationIcon, SparklesIcon, AccessibilityIcon, ReactDOM } from "./runtime-imports.js";
import { siteConfig } from "./site-config.js";
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const IMG = {
  heroBg: `/assets/aistudio/image_cab5cadb.png`,
  hero: `/assets/personas/heroe.png`,
  interior: `/assets/aistudio/image_993ddb80.png`,
  racks: `/assets/aistudio/image_f8a8200a.png`,
  discos: `/assets/aistudio/image_e767c3d6.png`,
  maquinas: `/assets/aistudio/image_19a15b40.png`
};
const wa = (msg = siteConfig.phone.whatsappMessageGeneral) => `https://wa.me/${siteConfig.phone.raw}?text=${encodeURIComponent(msg)}`;
const EASE = [0.23, 1, 0.32, 1];

// ---------- utilidades de movimiento ----------
const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const lerp = (a, b, t) => a + (b - a) * t;

// Inclinación 3D que sigue al mouse, con inercia.
function useTilt(max = 10) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const glare = el.querySelector(":scope > .glare");
    let raf = 0,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      gx = 50,
      gy = 50;
    const tick = () => {
      cx = lerp(cx, tx, 0.14);
      cy = lerp(cy, ty, 0.14);
      el.style.transform = `perspective(1000px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      if (glare) glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 55%)`;
      raf = Math.abs(cx - tx) > 0.01 || Math.abs(cy - ty) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = e => {
      if (motionReduced()) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width,
        py = (e.clientY - r.top) / r.height;
      tx = (px - 0.5) * 2 * max;
      ty = (0.5 - py) * 2 * max;
      gx = Math.round(px * 100);
      gy = Math.round(py * 100);
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}
const Tilt = ({
  children,
  className = "",
  max,
  as = "div",
  ...rest
}) => {
  const ref = useTilt(max);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: `tilt ${className}`
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "glare",
    "aria-hidden": "true"
  }));
};

// Botón "magnético": se acerca un poco al cursor.
function Magnetic({
  children,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("a", _extends({
    ref: ref,
    className: `magnetic ${className}`
  }, rest), children);
}
const reveal = {
  hidden: {
    opacity: 0,
    y: 36
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE
    }
  }
};
const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: {
    once: true,
    amount: 0.2
  }
};
const Reveal = ({
  children,
  className,
  as = "div",
  delay = 0
}) => {
  const Tag = motion[as];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    variants: reveal
  }, inView, {
    transition: {
      delay
    }
  }), children);
};

// Título de sección que sube desde una máscara.
function Title({
  children,
  accent,
  center,
  lead
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `title-block${center ? " center" : ""}`
  }, /*#__PURE__*/React.createElement("h2", {
    className: "title"
  }, /*#__PURE__*/React.createElement(motion.span, {
    className: "mask",
    initial: "hidden",
    whileInView: "show",
    viewport: {
      once: true,
      amount: 0.5
    }
  }, /*#__PURE__*/React.createElement(motion.span, {
    className: "mask-inner",
    variants: {
      hidden: {
        y: "105%"
      },
      show: {
        y: "0%",
        transition: {
          duration: 0.8,
          ease: EASE
        }
      }
    }
  }, children, " ", accent && /*#__PURE__*/React.createElement("em", null, accent)))), lead && /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "lead-text",
    delay: 0.15
  }, lead));
}

// Título que aparece letra por letra en 3D.
const SplitText = ({
  text,
  className = "",
  delay = 0
}) => /*#__PURE__*/React.createElement("span", {
  className: `split ${className}`,
  "aria-label": text
}, [...text].map((ch, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  "aria-hidden": "true",
  style: {
    animationDelay: `${delay + i * 0.03}s`
  }
}, ch === " " ? " " : ch)));

// Número que cuenta hacia arriba cuando aparece.
function CountUp({
  to,
  suffix = ""
}) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now(),
        dur = 1400;
      const step = t => {
        const p = Math.min((t - start) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, {
      threshold: 0.6
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "num"
  }, n, suffix);
}

// ---------- horarios: estado en vivo (hora de Lima) ----------
const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const fmtTime = (h, m = 0) => {
  const suffix = h < 12 ? "a. m." : "p. m.";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
};
// "a la 1:00 p. m." pero "a las 9:00 p. m."
const atTime = (h, m = 0) => `${h % 12 === 1 ? "a la" : "a las"} ${fmtTime(h, m)}`;
const shiftsFor = day => {
  const {
    weekdays,
    saturday
  } = siteConfig.hours;
  if (day === 0) return [];
  return (day === 6 ? saturday.shifts : weekdays.shifts).map(s => ({
    from: s.openHour * 60 + s.openMinute,
    to: s.closeHour * 60 + s.closeMinute,
    name: s.name,
    label: s.timeRange
  }));
};
function limaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t)?.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    day,
    minutes: Number(get("hour")) % 24 * 60 + Number(get("minute"))
  };
}
function getStatus() {
  const {
    day,
    minutes
  } = limaNow();
  const today = shiftsFor(day);
  const current = today.find(s => minutes >= s.from && minutes < s.to);
  if (current) {
    const left = current.to - minutes;
    return {
      open: true,
      day,
      minutes,
      label: "Abierto ahora",
      detail: `Cierra ${atTime(Math.floor(current.to / 60), current.to % 60)}${left <= 60 ? ` · quedan ${left} min` : ""}`
    };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const next = shiftsFor(d).find(s => i > 0 || s.from > minutes);
    if (next) {
      const when = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${DAY_NAMES[d].toLowerCase()}`;
      const paused = i === 0 && today.some(s => s.to <= minutes);
      return {
        open: false,
        day,
        minutes,
        label: paused ? "En pausa" : "Cerrado ahora",
        detail: `Abre ${when} ${atTime(Math.floor(next.from / 60), next.from % 60)}`
      };
    }
  }
  return {
    open: false,
    day,
    minutes,
    label: "Cerrado",
    detail: "Consulta por WhatsApp"
  };
}

// ---------- intro y cursor ----------
// ---------- ACCESIBILIDAD: preferencias del visitante ----------
const A11Y_DEFAULT = {
  text: 0,
  contrast: false,
  links: false,
  motion: false,
  font: false,
  theme: "dark",
  colorblind: false
};
function readA11y() {
  try {
    return {
      ...A11Y_DEFAULT,
      ...JSON.parse(localStorage.getItem("accesibilidad") || "{}")
    };
  } catch {
    return {
      ...A11Y_DEFAULT
    };
  }
}
function applyA11y(s) {
  const root = document.documentElement;
  root.dataset.colorblind = s.colorblind ? "on" : "";
  root.style.fontSize = ["100%", "112.5%", "125%", "137.5%"][s.text] || "100%";
  root.dataset.contrast = s.contrast ? "high" : "";
  root.dataset.links = s.links ? "underline" : "";
  root.dataset.motion = s.motion ? "reduce" : "";
  root.dataset.font = s.font ? "readable" : "";
  root.dataset.theme = s.theme === "light" ? "light" : "dark";
}
// Se aplica antes de pintar la página para evitar parpadeos.
applyA11y(readA11y());
const motionReduced = () => document.documentElement.dataset.motion === "reduce";
function A11yToggle({
  on,
  label,
  hint,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    className: `a11y-toggle${on ? " on" : ""}`,
    onClick: onChange
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, label), /*#__PURE__*/React.createElement("small", null, hint)), /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true"
  }));
}
function A11yPanel() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState(readA11y);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // ---------- ASISTENTE DE VOZ ----------
  const [voiceStatus, setVoiceStatus] = useState("Voz lista");
  const [voiceMessage, setVoiceMessage] = useState("");
  const [whatsappPending, setWhatsappPending] = useState(false);
  const speak = message => {
    if (!("speechSynthesis" in window)) {
      setVoiceMessage("Tu navegador no admite lectura en voz alta.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "es-PE";
    utterance.rate = 0.95;
    utterance.onstart = () => setVoiceStatus("Leyendo...");
    utterance.onend = () => setVoiceStatus("Voz lista");
    utterance.onerror = () => setVoiceStatus("Error de reproducción");
    window.speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setVoiceStatus("Lectura detenida");
  };
  const goToSection = (id, message) => {
    const section = document.getElementById(id);
    if (!section) {
      speak("No encontré esa sección.");
      return;
    }
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    speak(message);
  };
  const readPage = () => {
    const content = document.querySelector("main") || document.body;
    const text = content.innerText.replace(/\s+/g, " ").trim().slice(0, 12000);
    if (text) speak(text);else speak("No hay contenido para leer.");
  };
  const processVoiceCommand = command => {
    const text = command.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (/\b(detener|parar|silencio)\b/.test(text)) {
      stopSpeaking();
      return;
    }
    if (text.includes("leer la pagina") || text === "leer") {
      readPage();
      return;
    }
    if (text.includes("inscrib") || text.includes("precio") || text.includes("plan")) {
      goToSection("planes", "Te llevo a nuestros planes de entrenamiento. Puedes revisar las opciones y precios. ¿Deseas consultar por WhatsApp?");
      setWhatsappPending(true);
      return;
    }
    if (text.includes("entrenador")) {
      goToSection("entrenadores", "Aquí puedes conocer a nuestros entrenadores.");
      return;
    }
    if (text.includes("horario")) {
      goToSection("horarios", "Aquí puedes consultar nuestros horarios.");
      return;
    }
    if (text.includes("contacto") || text.includes("hablar con alguien") || text.includes("ubicacion")) {
      goToSection("contacto", "Te llevo a la sección de contacto.");
      return;
    }
    if (text.includes("inicio")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      speak("Has vuelto al inicio.");
      return;
    }
    speak("No reconocí el comando. Puedes decir ir a planes, horarios, contacto o inicio.");
  };
  const startVoiceRecognition = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus("Micrófono no compatible");
      speak("Prueba con Google Chrome o Microsoft Edge.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "es-PE";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => {
      setVoiceStatus("Escuchando...");
      setVoiceMessage("Te escucho. Di un comando.");
    };
    recognition.onresult = event => {
      const command = event.results[0][0].transcript;
      setVoiceMessage(`Escuché: ${command}`);
      processVoiceCommand(command);
    };
    recognition.onerror = event => {
      setVoiceStatus("No se pudo escuchar");
      setVoiceMessage(event.error === "not-allowed" ? "Debes permitir el acceso al micrófono." : "Inténtalo nuevamente.");
    };
    recognition.onend = () => setVoiceStatus("Voz lista");
    recognition.start();
  };
  const openWhatsAppFromVoice = () => {
    if (!whatsappPending) return;
    window.open(wa("Hola, deseo información para inscribirme en 7 Strength Center."), "_blank", "noopener,noreferrer");
    setWhatsappPending(false);
  };
  useEffect(() => {
    applyA11y(s);
    try {
      localStorage.setItem("accesibilidad", JSON.stringify(s));
    } catch {}
  }, [s]);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector("button")?.focus();
    const onKey = e => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClick = e => {
      if (!panelRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false);
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onClick);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onClick);
    };
  }, [open]);
  const set = (k, v) => setS(p => ({
    ...p,
    [k]: v
  }));
  const toggle = (k, label, hint) => /*#__PURE__*/React.createElement(A11yToggle, {
    on: s[k],
    label: label,
    hint: hint,
    onChange: () => set(k, !s[k])
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "a11y"
  }, /*#__PURE__*/React.createElement("button", {
    ref: btnRef,
    type: "button",
    className: "a11y-btn",
    "aria-expanded": open,
    "aria-controls": "panel-accesibilidad",
    "aria-label": "Opciones de accesibilidad",
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement(AccessibilityIcon, {
    size: 22
  })), /*#__PURE__*/React.createElement(AnimatePresence, null, open && /*#__PURE__*/React.createElement(motion.div, {
    ref: panelRef,
    id: "panel-accesibilidad",
    className: "a11y-panel glass",
    role: "dialog",
    "aria-label": "Opciones de accesibilidad",
    initial: {
      opacity: 0,
      y: -8,
      scale: 0.97
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: EASE
      }
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: {
        duration: 0.12
      }
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "a11y-title"
  }, "Accesibilidad"), /*#__PURE__*/React.createElement(A11yToggle, {
    on: s.theme === "dark",
    label: "Modo oscuro",
    hint: "Alterna entre el modo oscuro y el modo claro",
    onChange: () => set("theme", s.theme === "dark" ? "light" : "dark")
  }), /*#__PURE__*/React.createElement("div", {
    className: "a11y-size",
    role: "group",
    "aria-label": "Tama\xF1o del texto"
  }, /*#__PURE__*/React.createElement("span", null, "Tama\xF1o del texto"), /*#__PURE__*/React.createElement("div", null, ["A", "A+", "A++", "A+++"].map((l, i) => /*#__PURE__*/React.createElement("button", {
    key: l,
    type: "button",
    "aria-pressed": s.text === i,
    "aria-label": ["Normal", "Grande", "Muy grande", "Máximo"][i],
    onClick: () => set("text", i)
  }, l)))), toggle("contrast", "Alto contraste", "Texto más claro y fondos sólidos"), toggle("colorblind", "Ayuda para daltonismo", "Colores alternativos y marcas en las opciones activas"), toggle("links", "Subrayar enlaces", "Distingue los enlaces del texto"), toggle("font", "Letra fácil de leer", "Cambia los títulos a una letra simple"), toggle("motion", "Detener animaciones", "Quita movimientos y la intro"), /*#__PURE__*/React.createElement("div", {
    className: "a11y-voice"
  }, /*#__PURE__*/React.createElement("p", {
    className: "a11y-voice-title"
  }, "Asistente de voz"), /*#__PURE__*/React.createElement("small", null, "Interact\xFAa con nuestra p\xE1gina utilizando tu voz."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: startVoiceRecognition
  }, "\uD83C\uDFA4 Hablar con la p\xE1gina"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: readPage
  }, "\uD83D\uDD0A Leer p\xE1gina en voz alta"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: stopSpeaking
  }, "\u23F9 Detener lectura"), /*#__PURE__*/React.createElement("p", {
    role: "status",
    "aria-live": "polite"
  }, voiceStatus), /*#__PURE__*/React.createElement("small", {
    "aria-live": "polite"
  }, voiceMessage), whatsappPending && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: openWhatsAppFromVoice
  }, "S\xED, abrir WhatsApp")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "a11y-reset",
    onClick: () => setS({
      ...A11Y_DEFAULT
    })
  }, "Restablecer"))));
}

// ---------- INTRO: contador 000→100 que se llena, palabra que se parte en dos ----------
function Digit({
  value
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "odo",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "odo-strip",
    style: {
      transform: `translateY(${-value * 10}%)`
    }
  }, "0123456789".split("").map(d => /*#__PURE__*/React.createElement("span", {
    key: d
  }, d))));
}
function Intro() {
  const [phase, setPhase] = useState(() => {
    if (motionReduced()) return "done";
    try {
      return sessionStorage.getItem("intro-vista") ? "done" : "count";
    } catch {
      return "count";
    }
  });
  const [n, setN] = useState(0);
  const skipRef = useRef(null);
  useEffect(() => {
    if (phase === "done" || phase === "split") document.documentElement.dataset.ready = "1";
    if (phase === "done") {
      try {
        sessionStorage.setItem("intro-vista", "1");
      } catch {}
    }
  }, [phase]);

  // Contador: avanza con el tiempo, pero espera a que carguen la foto principal y la tipografía.
  useEffect(() => {
    if (phase !== "count") return;
    let loaded = 0.15,
      raf;
    const parts = [new Promise(r => {
      const i = new Image();
      i.onload = i.onerror = r;
      i.src = IMG.hero;
    }), new Promise(r => {
      const i = new Image();
      i.onload = i.onerror = r;
      i.src = IMG.heroBg;
    }), document.fonts ? document.fonts.ready : Promise.resolve()];
    parts.forEach(p => p.then(() => {
      loaded += 0.85 / parts.length;
    }));
    const giveUp = setTimeout(() => {
      loaded = 1;
    }, 5000);
    const start = performance.now(),
      DUR = 1900;
    const tick = t => {
      const time = Math.min((t - start) / DUR, 1);
      const eased = time < 0.5 ? 4 * time ** 3 : 1 - (-2 * time + 2) ** 3 / 2;
      const v = Math.round(Math.min(eased, loaded) * 100);
      setN(v);
      if (v >= 100) setTimeout(() => setPhase("word"), 200);else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(giveUp);
    };
  }, [phase]);
  useEffect(() => {
    if (phase === "word") {
      const t = setTimeout(() => setPhase("split"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "split") {
      const t = setTimeout(() => setPhase("done"), 1100);
      return () => clearTimeout(t);
    }
  }, [phase]);
  if (phase === "done") return null;
  const digits = String(n).padStart(3, "0").split("").map(Number);
  const left = "SIN",
    right = "LÍMITES";
  return /*#__PURE__*/React.createElement("div", {
    className: `intro intro-${phase}`,
    role: "status",
    "aria-label": "Cargando 7 Strength Center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "intro-line",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "intro-half intro-left",
    "aria-hidden": "true"
  }, phase !== "count" && /*#__PURE__*/React.createElement("span", {
    className: "intro-word"
  }, [...left].map((ch, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      animationDelay: `${i * 0.05}s`
    }
  }, ch)))), /*#__PURE__*/React.createElement("div", {
    className: "intro-half intro-right",
    "aria-hidden": "true"
  }, phase !== "count" && /*#__PURE__*/React.createElement("span", {
    className: "intro-word"
  }, [...right].map((ch, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      animationDelay: `${0.15 + i * 0.05}s`
    }
  }, ch)))), phase === "count" && /*#__PURE__*/React.createElement("div", {
    className: "intro-counter",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "intro-label"
  }, "Cargando"), /*#__PURE__*/React.createElement("div", {
    className: "intro-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "intro-outline"
  }, digits.map((d, i) => /*#__PURE__*/React.createElement(Digit, {
    key: i,
    value: d
  }))), /*#__PURE__*/React.createElement("span", {
    className: "intro-fill",
    style: {
      clipPath: `inset(${100 - n}% 0 0 0)`
    }
  }, digits.map((d, i) => /*#__PURE__*/React.createElement(Digit, {
    key: i,
    value: d
  })))), /*#__PURE__*/React.createElement("span", {
    className: "intro-label right"
  }, "7 Strength")), /*#__PURE__*/React.createElement("button", {
    ref: skipRef,
    type: "button",
    className: "intro-skip",
    onClick: () => setPhase("done")
  }, "Saltar intro"));
}
const NAV = [["Nosotros", "#nosotros"], ["Entrenadores", "#entrenadores"], ["Reels", "#reels"], ["Zonas", "#zonas"], ["Planes", "#planes"], ["Horarios", "#horarios"], ["Contacto", "#contacto"]];
function ScrollProgress() {
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });
  return /*#__PURE__*/React.createElement(motion.div, {
    className: "scroll-progress",
    style: {
      scaleX
    }
  });
}
function Logo({
  size = 48
}) {
  return /*#__PURE__*/React.createElement("img", {
    className: "logo",
    src: siteConfig.logoPath,
    alt: "",
    width: size,
    height: size
  });
}
function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuBtn = useRef(null);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  return /*#__PURE__*/React.createElement("header", {
    className: `header${solid ? " solid" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "container header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    className: "brand",
    "aria-label": "7 Strength Center, ir al inicio"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "7 ", /*#__PURE__*/React.createElement("b", null, "Strength"))), /*#__PURE__*/React.createElement("nav", {
    className: "nav-desktop",
    "aria-label": "Principal"
  }, NAV.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href
  }, label))), /*#__PURE__*/React.createElement(A11yPanel, null), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-sm hide-mobile",
    href: wa(),
    target: "_blank",
    rel: "noreferrer"
  }, "Inscr\xEDbete"), /*#__PURE__*/React.createElement("button", {
    ref: menuBtn,
    type: "button",
    className: "menu-btn",
    "aria-label": open ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": open,
    "aria-controls": "menu-movil",
    onClick: () => setOpen(!open)
  }, open ? /*#__PURE__*/React.createElement(XIcon, {
    size: 26
  }) : /*#__PURE__*/React.createElement(MenuIcon, {
    size: 26
  }))), /*#__PURE__*/React.createElement(AnimatePresence, null, open && /*#__PURE__*/React.createElement(motion.nav, {
    id: "menu-movil",
    className: "nav-mobile",
    "aria-label": "Men\xFA",
    initial: {
      opacity: 0,
      y: -12,
      scale: 0.97
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.22,
        ease: EASE
      }
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.15
      }
    }
  }, NAV.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    onClick: () => setOpen(false)
  }, label)), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: wa(),
    target: "_blank",
    rel: "noreferrer"
  }, "Inscr\xEDbete por WhatsApp"))));
}

// ---------- HERO 3D: personaje al centro, STRENGTH detrás ----------
function Hero() {
  const sceneRef = useRef(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const layers = [...scene.querySelectorAll("[data-depth]")].map(el => ({
      el,
      d: parseFloat(el.dataset.depth)
    }));
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      sy = 0,
      raf;
    const move = e => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    const scroll = () => {
      sy = Math.min(scrollY, innerHeight);
    };
    const loop = () => {
      if (motionReduced()) {
        tx = 0;
        ty = 0;
        sy = 0;
      }
      cx = lerp(cx, tx, 0.07);
      cy = lerp(cy, ty, 0.07);
      const p = sy / innerHeight;
      for (const {
        el,
        d
      } of layers) {
        el.style.transform = `translate3d(${(-cx * d).toFixed(1)}px, ${(-cy * d * 0.6 + sy * d * 0.01).toFixed(1)}px, ${(d * p * 3).toFixed(0)}px)`;
      }
      scene.style.transform = `rotateX(${(cy * -3 + p * 6).toFixed(2)}deg) rotateY(${(cx * 5).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    if (finePointer()) addEventListener("pointermove", move);
    addEventListener("scroll", scroll, {
      passive: true
    });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-scene",
    ref: sceneRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "layer hero-bg",
    "data-depth": "8"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.heroBg,
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "layer smoke smoke-1",
    "data-depth": "14"
  }), /*#__PURE__*/React.createElement("div", {
    className: "layer smoke smoke-2",
    "data-depth": "20"
  }), /*#__PURE__*/React.createElement("div", {
    className: "layer hero-word-wrap",
    "data-depth": "18",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-word"
  }, [..."Strength"].map((ch, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      animationDelay: `${0.15 + i * 0.06}s`
    }
  }, ch)))), /*#__PURE__*/React.createElement("div", {
    className: "layer hero-glow",
    "data-depth": "26",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "layer hero-person",
    "data-depth": "38"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.hero,
    alt: "Atleta de espaldas mostrando la musculatura trabajada"
  })), /*#__PURE__*/React.createElement("div", {
    className: "layer smoke smoke-3",
    "data-depth": "50"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sparks",
    "aria-hidden": "true"
  }, Array.from({
    length: 18
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      left: `${i * 53 % 100}%`,
      animationDelay: `${i * 0.7 % 6}s`,
      animationDuration: `${5 + i % 5}s`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-shade"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "social-rail",
    "aria-label": "Redes"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: siteConfig.social.instagramUrl,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement(InstagramIcon, {
    size: 16
  }))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: wa(),
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "WhatsApp"
  }, /*#__PURE__*/React.createElement(MessageCircleIcon, {
    size: 16
  }))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: siteConfig.googleMapsUrl,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "Ubicaci\xF3n"
  }, /*#__PURE__*/React.createElement(MapPinIcon, {
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    className: "container hero-content"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement(SplitText, {
    text: "La fuerza",
    className: "accent",
    delay: 0.5
  }), " ", /*#__PURE__*/React.createElement(SplitText, {
    text: "no se regala",
    delay: 0.75
  })), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Se construye repetici\xF3n tras repetici\xF3n, en el centro de alto rendimiento de ", siteConfig.city.split(",")[0], ".")));
}

// Dos cintas cruzadas que se mueven en sentidos opuestos.
function Ribbons() {
  const words = ["Fuerza", "Disciplina", "Técnica", "Power Team", "Constancia", "Sin límites"];
  const row = [...words, ...words, ...words, ...words];
  return /*#__PURE__*/React.createElement("div", {
    className: "ribbons",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ribbon ribbon-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ribbon-track reverse"
  }, row.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, w, /*#__PURE__*/React.createElement("i", null, "/"))))), /*#__PURE__*/React.createElement("div", {
    className: "ribbon ribbon-red"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ribbon-track"
  }, row.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, w, /*#__PURE__*/React.createElement(DumbbellIcon, {
    size: 22
  }))))));
}

// Video de presentación (reel de Instagram descargado). Se reproduce solo al verse.
const PauseIcon = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}));
const PlayGlyph = ({
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"
}));
const ABOUT_REEL = "DGLxhrDMFSn";
function AboutVideo() {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(() => motionReduced());
  const pausedRef = useRef(paused);
  const mutedRef = useRef(true);
  useEffect(() => {
    pausedRef.current = paused;
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause();else v.play().catch(() => {});
  }, [paused]);
  useEffect(() => {
    mutedRef.current = muted;
    if (ref.current) ref.current.muted = muted;
  }, [muted]);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (pausedRef.current) return;
        if (v.muted !== mutedRef.current) v.muted = mutedRef.current;
        v.play().catch(() => {
          v.muted = true;
          setTimeout(() => v.play().catch(() => {}), 300);
        });
      } else v.pause();
    }, {
      threshold: 0.25
    });
    io.observe(boxRef.current || v);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: boxRef
  }, /*#__PURE__*/React.createElement(Tilt, {
    className: "about-video glass liquid",
    max: 6
  }, /*#__PURE__*/React.createElement("video", {
    ref: ref,
    src: `/assets/reels/${ABOUT_REEL}.mp4`,
    poster: `/assets/reels/${ABOUT_REEL}.jpg`,
    muted: muted,
    loop: true,
    playsInline: true,
    preload: "metadata",
    "aria-label": "Video de presentaci\xF3n de 7 Strength Center"
  }), /*#__PURE__*/React.createElement("span", {
    className: "about-controls"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "round-btn small glass",
    onClick: () => setPaused(!paused),
    "aria-label": paused ? "Reproducir video" : "Pausar video"
  }, paused ? /*#__PURE__*/React.createElement(PlayGlyph, null) : /*#__PURE__*/React.createElement(PauseIcon, null)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "round-btn small glass",
    onClick: () => setMuted(!muted),
    "aria-label": muted ? "Activar sonido" : "Silenciar"
  }, muted ? /*#__PURE__*/React.createElement(VolumeXIcon, {
    size: 18
  }) : /*#__PURE__*/React.createElement(Volume2Icon, {
    size: 18
  })))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "nosotros",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container about-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title, {
    accent: "somos"
  }, "Qui\xE9nes"), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(AboutVideo, null))), /*#__PURE__*/React.createElement(Reveal, {
    className: "about-text",
    delay: 0.15
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, siteConfig.description), /*#__PURE__*/React.createElement("p", null, "Racks de potencia, barras ol\xEDmpicas, discos calibrados, m\xE1quinas de biomec\xE1nica y una zona de c\xE9sped para empuje de trineo. Entrenamiento presencial y virtual, con el respaldo del Power Team."), /*#__PURE__*/React.createElement("dl", {
    className: "facts"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement(CountUp, {
    to: 2
  })), /*#__PURE__*/React.createElement("dd", null, "niveles de entrenamiento")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement(CountUp, {
    to: 1000,
    suffix: "+"
  })), /*#__PURE__*/React.createElement("dd", null, "seguidores en Instagram")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement(CountUp, {
    to: 6
  })), /*#__PURE__*/React.createElement("dd", null, "d\xEDas a la semana"))), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "#entrenadores"
  }, "Conoce al equipo ", /*#__PURE__*/React.createElement(ArrowRightIcon, {
    size: 18
  })))));
}
const FEATURES = [[DumbbellIcon, "Equipamiento pro", "Racks de uso rudo, barras olímpicas y discos de competición."], [TargetIcon, "Técnica primero", "Progresas con la forma correcta y sin lesiones."], [UsersIcon, "Power Team", "Una comunidad donde cada repetición cuenta."], [ClockIcon, "Horario flexible", "Turno mañana y tarde, de lunes a sábado."]];
function WhyUs() {
  return /*#__PURE__*/React.createElement("section", {
    className: "why"
  }, /*#__PURE__*/React.createElement("div", {
    className: "why-bg"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG.racks,
    alt: "",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "smoke smoke-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container why-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title, {
    accent: "nosotros"
  }, "Por qu\xE9"), /*#__PURE__*/React.createElement(motion.ul, _extends({
    className: "features",
    variants: stagger
  }, inView), FEATURES.map(([Icon, title, text]) => /*#__PURE__*/React.createElement(motion.li, {
    key: title,
    variants: reveal
  }, /*#__PURE__*/React.createElement(Tilt, {
    className: "feature",
    max: 12
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, text))))))), /*#__PURE__*/React.createElement("div", {
    className: "why-big",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Entrena"), " ", /*#__PURE__*/React.createElement("span", null, "Ahora"), " ", /*#__PURE__*/React.createElement("span", {
    className: "outline"
  }, "Mismo"))));
}

// ---------- ENTRENADORES ----------
function TrainerCard({
  t
}) {
  return /*#__PURE__*/React.createElement(motion.li, {
    variants: reveal
  }, /*#__PURE__*/React.createElement(Tilt, {
    as: "a",
    href: `#/entrenador/${t.slug}`,
    className: "trainer",
    max: 10,
    "aria-label": `Ver perfil de ${t.name}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "trainer-bgname",
    "aria-hidden": "true"
  }, t.name.split(" ")[0]), /*#__PURE__*/React.createElement("img", {
    className: "trainer-photo",
    src: t.photo,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "trainer-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "trainer-name"
  }, t.name), /*#__PURE__*/React.createElement("span", {
    className: "trainer-role"
  }, t.role), /*#__PURE__*/React.createElement("span", {
    className: "trainer-cta"
  }, "Ver perfil ", /*#__PURE__*/React.createElement(ArrowRightIcon, {
    size: 16
  })))));
}
function Trainers() {
  return /*#__PURE__*/React.createElement("section", {
    id: "entrenadores",
    className: "section trainers-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Title, {
    center: true,
    accent: "entrenadores",
    lead: "Cada entrenador tiene su propido perfil: entra y descubre en qu\xE9 te puede ayudar."
  }, "Conoce a los"), /*#__PURE__*/React.createElement(motion.ul, _extends({
    className: "trainers",
    variants: stagger
  }, inView), siteConfig.trainers.map(t => /*#__PURE__*/React.createElement(TrainerCard, {
    key: t.slug,
    t: t
  })))));
}
function TrainerProfile({
  t
}) {
  const others = siteConfig.trainers.filter(o => o.slug !== t.slug);
  return /*#__PURE__*/React.createElement("main", {
    id: "contenido",
    tabIndex: -1,
    className: "profile"
  }, /*#__PURE__*/React.createElement("section", {
    className: "profile-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container profile-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-text"
  }, /*#__PURE__*/React.createElement(motion.a, {
    className: "back-link",
    href: "#entrenadores",
    initial: {
      opacity: 0,
      x: -12
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.4,
      ease: EASE
    }
  }, /*#__PURE__*/React.createElement(ChevronLeftIcon, {
    size: 18
  }), " Todos los entrenadores"), /*#__PURE__*/React.createElement("h1", {
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(SplitText, {
    text: t.name,
    delay: 0.1
  })), /*#__PURE__*/React.createElement(motion.p, {
    className: "profile-role",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    transition: {
      delay: 0.5
    }
  }, t.role), /*#__PURE__*/React.createElement(motion.blockquote, {
    initial: {
      opacity: 0,
      y: 16
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.6,
      duration: 0.6,
      ease: EASE
    }
  }, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement(motion.dl, {
    className: "facts",
    initial: {
      opacity: 0,
      y: 16
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.75,
      duration: 0.6,
      ease: EASE
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement(CountUp, {
    to: t.years
  })), /*#__PURE__*/React.createElement("dd", null, "a\xF1os entrenando")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, /*#__PURE__*/React.createElement(CountUp, {
    to: t.athletes,
    suffix: "+"
  })), /*#__PURE__*/React.createElement("dd", null, "personas acompa\xF1adas"))), /*#__PURE__*/React.createElement(motion.div, {
    className: "hero-ctas",
    initial: {
      opacity: 0,
      y: 16
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.9,
      duration: 0.6,
      ease: EASE
    }
  }, /*#__PURE__*/React.createElement(Magnetic, {
    className: "btn",
    href: wa(`Hola, quiero reservar una sesión con ${t.name} en 7 Strength Center.`),
    target: "_blank",
    rel: "noreferrer"
  }, "Reservar con ", t.name.split(" ")[0], " ", /*#__PURE__*/React.createElement(ArrowRightIcon, {
    size: 18
  })))), /*#__PURE__*/React.createElement(motion.div, {
    className: "profile-photo-wrap",
    initial: {
      opacity: 0,
      scale: 0.94,
      y: 40
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    transition: {
      duration: 0.9,
      ease: EASE,
      delay: 0.15
    }
  }, /*#__PURE__*/React.createElement(Tilt, {
    className: "profile-photo",
    max: 12
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile-initial",
    "aria-hidden": "true"
  }, t.name.split(" ")[0]), /*#__PURE__*/React.createElement("span", {
    className: "profile-ring",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("img", {
    src: t.photo,
    alt: t.name
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container profile-body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title, {
    accent: "el entrenador"
  }, "Sobre"), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "profile-bio"
  }, t.bio), /*#__PURE__*/React.createElement(motion.ul, _extends({
    className: "chips",
    variants: stagger
  }, inView), t.specialties.map(s => /*#__PURE__*/React.createElement(motion.li, {
    key: s,
    variants: reveal
  }, s))), /*#__PURE__*/React.createElement(Reveal, {
    className: "profile-schedule"
  }, /*#__PURE__*/React.createElement(CalendarIcon, {
    size: 20
  }), " ", /*#__PURE__*/React.createElement("span", null, t.schedule))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title, {
    accent: "ayuda a entrenar"
  }, "Te"), /*#__PURE__*/React.createElement(motion.ol, _extends({
    className: "helps",
    variants: stagger
  }, inView), t.helps.map(h => /*#__PURE__*/React.createElement(motion.li, {
    key: h,
    variants: reveal
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 20
  }), " ", /*#__PURE__*/React.createElement("span", null, h))))))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Title, {
    center: true,
    accent: "entrenadores"
  }, "Otros"), /*#__PURE__*/React.createElement(motion.ul, _extends({
    className: "trainers trainers-small",
    variants: stagger
  }, inView), others.map(o => /*#__PURE__*/React.createElement(TrainerCard, {
    key: o.slug,
    t: o
  }))))));
}

// ---------- REELS: videos propios, se reproducen solos ----------
function Reels() {
  const reels = siteConfig.reels;
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(() => motionReduced());
  const [visible, setVisible] = useState(false);
  const vids = useRef([]);
  const wrapRef = useRef(null);
  const startX = useRef(null);
  const go = d => setActive(a => (a + d + reels.length) % reels.length);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && visible && !paused) {
        v.muted = muted;
        v.play().catch(() => {});
      } else {
        v.pause();
        if (i !== active) v.currentTime = 0;
      }
    });
  }, [active, visible, muted, paused]);
  return /*#__PURE__*/React.createElement("section", {
    id: "reels",
    className: "section reels-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Title, {
    center: true,
    accent: "en Instagram",
    lead: `Los reels con más vistas de ${siteConfig.social.instagramHandle}. Se reproducen solos: toca el altavoz para escuchar.`
  }, "Lo m\xE1s visto"), /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "coverflow",
    role: "region",
    "aria-roledescription": "carrusel",
    "aria-label": "Reels m\xE1s vistos",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    onPointerDown: e => {
      startX.current = e.clientX;
    },
    onPointerUp: e => {
      if (startX.current == null) return;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      startX.current = null;
    }
  }, reels.map((r, i) => {
    let off = i - active;
    if (off > reels.length / 2) off -= reels.length;
    if (off < -reels.length / 2) off += reels.length;
    const abs = Math.abs(off);
    const isActive = off === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: r.code,
      className: `reel${isActive ? " active" : ""}`,
      style: {
        transform: `translateX(calc(-50% + ${off * 64}%)) translateZ(${-abs * 170}px) rotateY(${off * -36}deg)`,
        zIndex: 10 - abs,
        opacity: abs > 2 ? 0 : 1,
        pointerEvents: abs > 2 ? "none" : "auto"
      },
      onClick: () => !isActive && setActive(i)
    }, /*#__PURE__*/React.createElement("video", {
      ref: el => vids.current[i] = el,
      src: `/assets/reels/${r.code}.mp4`,
      poster: `/assets/reels/${r.code}.jpg`,
      muted: true,
      playsInline: true,
      preload: abs <= 1 ? "auto" : "metadata",
      onEnded: () => isActive && go(1),
      "aria-label": `Reel ${i + 1} de ${reels.length}: ${r.title}, ${r.views} vistas`,
      "aria-hidden": !isActive
    }), /*#__PURE__*/React.createElement("span", {
      className: "reel-views"
    }, /*#__PURE__*/React.createElement(EyeIcon, {
      size: 14
    }), " ", r.views), /*#__PURE__*/React.createElement("span", {
      className: "reel-title"
    }, r.title), isActive && /*#__PURE__*/React.createElement("span", {
      className: "reel-actions"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "round-btn small",
      onClick: e => {
        e.stopPropagation();
        setPaused(!paused);
      },
      "aria-label": paused ? "Reproducir reel" : "Pausar reel"
    }, paused ? /*#__PURE__*/React.createElement(PlayGlyph, null) : /*#__PURE__*/React.createElement(PauseIcon, null)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "round-btn small",
      onClick: e => {
        e.stopPropagation();
        setMuted(!muted);
      },
      "aria-label": muted ? "Activar sonido" : "Silenciar"
    }, muted ? /*#__PURE__*/React.createElement(VolumeXIcon, {
      size: 18
    }) : /*#__PURE__*/React.createElement(Volume2Icon, {
      size: 18
    })), /*#__PURE__*/React.createElement("a", {
      className: "round-btn small",
      href: `https://www.instagram.com/reel/${r.code}/`,
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Abrir en Instagram",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(ExternalLinkIcon, {
      size: 16
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "reel-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "round-btn",
    onClick: () => go(-1),
    "aria-label": "Reel anterior"
  }, /*#__PURE__*/React.createElement(ChevronLeftIcon, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "dots"
  }, reels.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: r.code,
    className: i === active ? "on" : "",
    onClick: () => setActive(i),
    "aria-label": `Ir al reel ${i + 1}`
  }))), /*#__PURE__*/React.createElement("button", {
    className: "round-btn",
    onClick: () => go(1),
    "aria-label": "Reel siguiente"
  }, /*#__PURE__*/React.createElement(ChevronRightIcon, {
    size: 22
  }))), /*#__PURE__*/React.createElement(Reveal, {
    className: "center-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost",
    href: siteConfig.social.instagramUrl,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(InstagramIcon, {
    size: 18
  }), " S\xEDguenos ", siteConfig.social.instagramHandle))));
}

// ---------- ZONAS: paneles que se expanden ----------
const ZONES = [{
  img: IMG.discos,
  title: "Powerlifting",
  text: "Sentadilla, banca y peso muerto sobre plataformas, con discos bumper calibrados.",
  gear: ["Barras olímpicas", "Discos bumper", "Plataformas", "Banco de competición"]
}, {
  img: IMG.racks,
  title: "Peso libre",
  text: "Power racks de uso rudo y espacio para entrenar pesado sin esperar turno.",
  gear: ["Power racks", "Mancuernas", "Barras", "Bancos ajustables"]
}, {
  img: IMG.maquinas,
  title: "Máquinas",
  text: "Biomecánica para aislar cada músculo con control y seguridad.",
  gear: ["Prensa inclinada", "Hack squat", "Poleas", "Espejos panorámicos"]
}, {
  img: IMG.interior,
  title: "Funcional",
  text: "Césped sintético en dos niveles para trineo, acondicionamiento y movilidad.",
  gear: ["Césped sintético", "Trineo", "TRX", "Dos niveles"]
}];
function Zones() {
  const [active, setActive] = useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "zonas",
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Title, {
    center: true,
    accent: "zonas",
    lead: "Pasa el mouse o toca cada zona para ver qu\xE9 equipo encontrar\xE1s."
  }, "Nuestras"), /*#__PURE__*/React.createElement(motion.div, _extends({
    className: "zones",
    variants: stagger
  }, inView), ZONES.map((z, i) => {
    const on = i === active;
    return /*#__PURE__*/React.createElement(motion.button, {
      key: z.title,
      variants: reveal,
      className: `zone${on ? " on" : ""}`,
      onMouseEnter: () => finePointer() && setActive(i),
      onFocus: () => setActive(i),
      onClick: () => setActive(i),
      "aria-expanded": on
    }, /*#__PURE__*/React.createElement("img", {
      src: z.img,
      alt: "",
      loading: "lazy"
    }), /*#__PURE__*/React.createElement("span", {
      className: "zone-shade"
    }), /*#__PURE__*/React.createElement("span", {
      className: "zone-vertical",
      "aria-hidden": "true"
    }, z.title), /*#__PURE__*/React.createElement("span", {
      className: "zone-body"
    }, /*#__PURE__*/React.createElement("span", {
      className: "zone-title"
    }, z.title), /*#__PURE__*/React.createElement("span", {
      className: "zone-text"
    }, z.text), /*#__PURE__*/React.createElement("span", {
      className: "zone-gear"
    }, z.gear.map(g => /*#__PURE__*/React.createElement("span", {
      key: g
    }, g)))));
  }))));
}
function Plans() {
  return /*#__PURE__*/React.createElement("section", {
    id: "planes",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Title, {
    center: true,
    accent: "plan"
  }, "Elige tu"), /*#__PURE__*/React.createElement(motion.div, _extends({
    className: "plans",
    variants: stagger
  }, inView), siteConfig.plans.map(p => /*#__PURE__*/React.createElement(motion.div, {
    key: p.id,
    variants: reveal
  }, /*#__PURE__*/React.createElement(Tilt, {
    as: "article",
    className: `plan${p.isFeatured ? " featured" : ""}`,
    max: 7
  }, p.isFeatured && /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, /*#__PURE__*/React.createElement(ZapIcon, {
    size: 14
  }), " M\xE1s elegido"), /*#__PURE__*/React.createElement("h3", null, p.name), /*#__PURE__*/React.createElement("p", {
    className: "plan-tag"
  }, p.tagline), /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, /*#__PURE__*/React.createElement("small", null, p.currency), p.price, /*#__PURE__*/React.createElement("span", null, "/ ", p.period)), /*#__PURE__*/React.createElement("ul", null, p.features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 18
  }), " ", f))), /*#__PURE__*/React.createElement("a", {
    className: `btn${p.isFeatured ? "" : " btn-ghost"}`,
    href: p.whatsappUrl,
    target: "_blank",
    rel: "noreferrer"
  }, p.buttonText)))))));
}

// ---------- HORARIOS: estado en vivo + línea de tiempo semanal ----------
// ---------- HORARIOS: tres tarjetas simples ----------
const shortHour = min => {
  const h = Math.floor(min / 60),
    m = min % 60;
  return {
    num: `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""}`,
    ampm: h < 12 ? "AM" : "PM"
  };
};
function TimeRange({
  s
}) {
  const a = shortHour(s.from),
    b = shortHour(s.to);
  const spoken = `de ${fmtTime(Math.floor(s.from / 60), s.from % 60)} a ${fmtTime(Math.floor(s.to / 60), s.to % 60)}`;
  return /*#__PURE__*/React.createElement("li", {
    className: "shift"
  }, /*#__PURE__*/React.createElement("span", {
    className: "shift-name"
  }, s.name.replace("Turno ", "")), /*#__PURE__*/React.createElement("span", {
    className: "shift-time",
    "aria-label": spoken
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, a.num, /*#__PURE__*/React.createElement("small", null, a.ampm)), /*#__PURE__*/React.createElement("span", {
    className: "shift-sep",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, b.num, /*#__PURE__*/React.createElement("small", null, b.ampm))));
}
function Schedule() {
  const [status, setStatus] = useState(getStatus);
  useEffect(() => {
    const t = setInterval(() => setStatus(getStatus()), 30000);
    return () => clearInterval(t);
  }, []);
  const {
    weekdays,
    saturday,
    sunday
  } = siteConfig.hours;
  const groups = [{
    title: weekdays.days,
    days: [1, 2, 3, 4, 5],
    shifts: shiftsFor(1),
    note: "Pausa de 1 a 3 p. m."
  }, {
    title: "Sábados",
    days: [6],
    shifts: shiftsFor(6)
  }, {
    title: "Domingos",
    days: [0],
    shifts: []
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "horarios",
    className: "section schedule-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "schedule-head"
  }, /*#__PURE__*/React.createElement(Title, null, "Horarios"), /*#__PURE__*/React.createElement(Reveal, {
    className: `status${status.open ? " open" : ""}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    role: "status"
  }, /*#__PURE__*/React.createElement("strong", null, status.label), /*#__PURE__*/React.createElement("small", null, status.detail)))), /*#__PURE__*/React.createElement(motion.ul, _extends({
    className: "hours-grid",
    variants: stagger
  }, inView), groups.map(g => {
    const today = g.days.includes(status.day);
    return /*#__PURE__*/React.createElement(motion.li, {
      key: g.title,
      variants: reveal,
      className: `hours-card glass${today ? " today" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "hours-card-head"
    }, /*#__PURE__*/React.createElement("h3", null, g.title), today && /*#__PURE__*/React.createElement("span", {
      className: "today-badge"
    }, "Hoy")), g.shifts.length ? /*#__PURE__*/React.createElement("ul", {
      className: "shifts"
    }, g.shifts.map(s => /*#__PURE__*/React.createElement(TimeRange, {
      key: s.name,
      s: s
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "shifts-empty"
    }, /*#__PURE__*/React.createElement("p", null, sunday.statusNote), /*#__PURE__*/React.createElement("a", {
      href: wa("Hola, ¿abren este domingo?"),
      target: "_blank",
      rel: "noreferrer"
    }, "Pregunta por WhatsApp ", /*#__PURE__*/React.createElement(ArrowRightIcon, {
      size: 16
    }))), g.note && /*#__PURE__*/React.createElement("p", {
      className: "hours-note"
    }, /*#__PURE__*/React.createElement(ClockIcon, {
      size: 16,
      "aria-hidden": "true"
    }), " ", g.note));
  }))));
}
function CtaBand() {
  return /*#__PURE__*/React.createElement("section", {
    className: "cta-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container cta-inner"
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "h2"
  }, "Tu primer d\xEDa cuesta solo S/ 15"), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement(Magnetic, {
    className: "btn btn-dark",
    href: siteConfig.plans[0].whatsappUrl,
    target: "_blank",
    rel: "noreferrer"
  }, "Reservar pase diario ", /*#__PURE__*/React.createElement(ArrowRightIcon, {
    size: 18
  })))));
}
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title, {
    accent: "encontrarnos"
  }, "Ven a"), /*#__PURE__*/React.createElement(Reveal, {
    as: "ul",
    className: "contact-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(MapPinIcon, {
    size: 20
  }), /*#__PURE__*/React.createElement("a", {
    href: siteConfig.googleMapsUrl,
    target: "_blank",
    rel: "noreferrer"
  }, siteConfig.address)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(PhoneIcon, {
    size: 20
  }), /*#__PURE__*/React.createElement("a", {
    href: wa(),
    target: "_blank",
    rel: "noreferrer"
  }, siteConfig.phone.display)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(InstagramIcon, {
    size: 20
  }), /*#__PURE__*/React.createElement("a", {
    href: siteConfig.social.instagramUrl,
    target: "_blank",
    rel: "noreferrer"
  }, siteConfig.social.instagramHandle)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ShieldCheckIcon, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Sin contratos de permanencia"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: siteConfig.googleMapsUrl,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(NavigationIcon, {
    size: 18
  }), " C\xF3mo llegar"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "map",
    delay: 0.15
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Mapa de 7 Strength Center",
    src: `https://www.google.com/maps?q=${siteConfig.googleMapsEmbedQuery}&output=embed`,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  }))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container footer-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    className: "brand"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 44
  }), /*#__PURE__*/React.createElement("span", null, "7 ", /*#__PURE__*/React.createElement("b", null, "Strength"), " Center")), /*#__PURE__*/React.createElement("p", null, "\xA9 ", new Date().getFullYear(), " ", siteConfig.name, " \xB7 ", siteConfig.city), /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    className: "to-top",
    "aria-label": "Volver arriba"
  }, /*#__PURE__*/React.createElement(ArrowUpIcon, {
    size: 18
  }))));
}

// ---------- ASISTENTE CON IA ----------
// Respuestas básicas cuando la IA no está disponible (sin clave o sin internet).
function localAnswer(q) {
  const t = q.toLowerCase();
  const c = siteConfig;
  const h = c.hours;
  if (/horario|hora|abre|cierra|abierto|domingo|sábado|sabado/.test(t)) return `${h.weekdays.days}: ${h.weekdays.shifts.map(s => s.timeRange).join(" y ")}. ${h.saturday.days}: ${h.saturday.shifts[0].timeRange}. Domingos: ${h.sunday.statusNote.toLowerCase()}.`;
  if (/precio|cuesta|costo|plan|mensual|pase|pagar|membres/.test(t)) return c.plans.map(p => `${p.name}: ${p.formattedPrice} (${p.period})`).join(" · ") + ". Sin contratos de permanencia.";
  if (/dónde|donde|direcci|ubica|llegar|mapa/.test(t)) return `Estamos en ${c.address}. Toca “Cómo llegar” en la sección de contacto para abrir Google Maps.`;
  if (/entrenador|coach|profe|personal/.test(t)) return `Nuestro equipo: ${c.trainers.map(tr => `${tr.name} (${tr.role})`).join(", ")}. Entra a su perfil en la sección Entrenadores.`;
  if (/whatsapp|tel[eé]fono|contacto|inscrib|reserv/.test(t)) return `Escríbenos por WhatsApp al ${c.phone.display} y te ayudamos a inscribirte.`;
  return `Puedo contarte sobre horarios, planes, entrenadores y cómo llegar. Para algo más específico, escríbenos por WhatsApp al ${c.phone.display}.`;
}
const SUGGESTIONS = ["¿Cuál es el horario?", "¿Cuánto cuesta el plan mensual?", "Soy principiante, ¿con quién entreno?", "¿Dónde están?"];
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: "¡Hola! Soy el asistente de 7 Strength. Pregúntame por horarios, planes o entrenadores."
  }]);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [msgs, busy]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = e => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  const ask = async text => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...msgs, {
      role: "user",
      content: q
    }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    let reply;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: next.slice(1)
        })
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.reply) reply = data.reply;else if (r.status === 429) reply = "Estás preguntando muy rápido. Espera unos segundos y vuelve a intentarlo.";else reply = localAnswer(q);
    } catch {
      reply = localAnswer(q);
    }
    setMsgs(m => [...m, {
      role: "assistant",
      content: reply
    }]);
    setBusy(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "chat-root"
  }, /*#__PURE__*/React.createElement(AnimatePresence, null, open && /*#__PURE__*/React.createElement(motion.section, {
    className: "chat-panel glass liquid",
    role: "dialog",
    "aria-label": "Asistente de 7 Strength Center",
    initial: {
      opacity: 0,
      y: 16,
      scale: 0.96
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.28,
        ease: EASE
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.97,
      transition: {
        duration: 0.18
      }
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "chat-head"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 40
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Asistente 7 Strength"), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("span", {
    className: "chat-online"
  }), " Responde al instante")), /*#__PURE__*/React.createElement("button", {
    className: "round-btn small",
    onClick: () => setOpen(false),
    "aria-label": "Cerrar chat"
  }, /*#__PURE__*/React.createElement(XIcon, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chat-list",
    ref: listRef,
    "aria-live": "polite"
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(motion.p, {
    key: i,
    className: `bubble ${m.role}`,
    initial: {
      opacity: 0,
      y: 8
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.25,
      ease: EASE
    }
  }, m.content)), busy && /*#__PURE__*/React.createElement("p", {
    className: "bubble assistant typing",
    "aria-label": "Escribiendo"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), msgs.length === 1 && /*#__PURE__*/React.createElement("div", {
    className: "chat-suggest"
  }, SUGGESTIONS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => ask(s)
  }, s)))), /*#__PURE__*/React.createElement("form", {
    className: "chat-form",
    onSubmit: e => {
      e.preventDefault();
      ask(input);
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: input,
    onChange: e => setInput(e.target.value),
    placeholder: "Escribe tu pregunta\u2026",
    maxLength: 500,
    "aria-label": "Tu pregunta"
  }), /*#__PURE__*/React.createElement("button", {
    className: "chat-send",
    disabled: !input.trim() || busy,
    "aria-label": "Enviar"
  }, /*#__PURE__*/React.createElement(ArrowUpIcon, {
    size: 20
  }))), /*#__PURE__*/React.createElement("a", {
    className: "chat-wa",
    href: wa(),
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(MessageCircleIcon, {
    size: 15
  }), " Prefiero hablar por WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    className: "fab-stack"
  }, /*#__PURE__*/React.createElement("button", {
    className: `fab fab-ai${open ? " on" : ""}`,
    onClick: () => setOpen(!open),
    "aria-expanded": open,
    "aria-label": open ? "Cerrar asistente" : "Abrir asistente con IA"
  }, open ? /*#__PURE__*/React.createElement(XIcon, {
    size: 24
  }) : /*#__PURE__*/React.createElement(SparklesIcon, {
    size: 24
  }), !open && /*#__PURE__*/React.createElement("span", {
    className: "fab-label"
  }, "Preg\xFAntame"))));
}
function Home() {
  // Al volver desde un perfil, baja a la sección pedida (#entrenadores, etc.).
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id && !id.startsWith("/")) {
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
      return () => clearTimeout(t);
    }
  }, []);
  return /*#__PURE__*/React.createElement("main", {
    id: "contenido",
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Ribbons, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(WhyUs, null), /*#__PURE__*/React.createElement(Trainers, null), /*#__PURE__*/React.createElement(Reels, null), /*#__PURE__*/React.createElement(Zones, null), /*#__PURE__*/React.createElement(Plans, null), /*#__PURE__*/React.createElement(Schedule, null), /*#__PURE__*/React.createElement(CtaBand, null), /*#__PURE__*/React.createElement(Contact, null));
}
function useHash() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const f = () => setHash(location.hash);
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return hash;
}
function App() {
  const hash = useHash();
  const slug = hash.startsWith("#/entrenador/") ? hash.slice("#/entrenador/".length) : null;
  const trainer = useMemo(() => siteConfig.trainers.find(t => t.slug === slug), [slug]);
  useEffect(() => {
    if (!trainer) return;
    window.scrollTo(0, 0);
    // Lleva el foco al nombre del entrenador para lectores de pantalla.
    setTimeout(() => document.querySelector(".profile h1")?.focus(), 50);
  }, [trainer]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    className: "skip-link",
    href: "#contenido"
  }, "Saltar al contenido"), /*#__PURE__*/React.createElement(Intro, null), /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Header, null), trainer ? /*#__PURE__*/React.createElement(TrainerProfile, {
    key: trainer.slug,
    t: trainer
  }) : /*#__PURE__*/React.createElement(Home, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(ChatBot, null));
}
ReactDOM.createRoot(document.getElementById(`root`)).render(/*#__PURE__*/React.createElement(App, null));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VTY3JvbGwiLCJ1c2VTcHJpbmciLCJtb3Rpb24iLCJSZWFjdCIsIkFuaW1hdGVQcmVzZW5jZSIsIk1lbnVJY29uIiwiWEljb24iLCJBcnJvd1JpZ2h0SWNvbiIsIkR1bWJiZWxsSWNvbiIsIlRhcmdldEljb24iLCJVc2Vyc0ljb24iLCJTaGllbGRDaGVja0ljb24iLCJDbG9ja0ljb24iLCJDaGVja0ljb24iLCJaYXBJY29uIiwiTWFwUGluSWNvbiIsIlBob25lSWNvbiIsIkluc3RhZ3JhbUljb24iLCJNZXNzYWdlQ2lyY2xlSWNvbiIsIkFycm93VXBJY29uIiwiQ2hldnJvbkxlZnRJY29uIiwiQ2hldnJvblJpZ2h0SWNvbiIsIkV4dGVybmFsTGlua0ljb24iLCJFeWVJY29uIiwiVm9sdW1lMkljb24iLCJWb2x1bWVYSWNvbiIsIkNhbGVuZGFySWNvbiIsIk5hdmlnYXRpb25JY29uIiwiU3BhcmtsZXNJY29uIiwiQWNjZXNzaWJpbGl0eUljb24iLCJSZWFjdERPTSIsInNpdGVDb25maWciLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZU1lbW8iLCJJTUciLCJoZXJvQmciLCJoZXJvIiwiaW50ZXJpb3IiLCJyYWNrcyIsImRpc2NvcyIsIm1hcXVpbmFzIiwid2EiLCJtc2ciLCJwaG9uZSIsIndoYXRzYXBwTWVzc2FnZUdlbmVyYWwiLCJyYXciLCJlbmNvZGVVUklDb21wb25lbnQiLCJFQVNFIiwiZmluZVBvaW50ZXIiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImxlcnAiLCJhIiwiYiIsInQiLCJ1c2VUaWx0IiwibWF4IiwicmVmIiwiZWwiLCJjdXJyZW50IiwiZ2xhcmUiLCJxdWVyeVNlbGVjdG9yIiwicmFmIiwidHgiLCJ0eSIsImN4IiwiY3kiLCJneCIsImd5IiwidGljayIsInN0eWxlIiwidHJhbnNmb3JtIiwidG9GaXhlZCIsImJhY2tncm91bmQiLCJNYXRoIiwiYWJzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwia2ljayIsIm1vdmUiLCJlIiwibW90aW9uUmVkdWNlZCIsInIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJweCIsImNsaWVudFgiLCJsZWZ0Iiwid2lkdGgiLCJweSIsImNsaWVudFkiLCJ0b3AiLCJoZWlnaHQiLCJyb3VuZCIsImxlYXZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlRpbHQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFzIiwicmVzdCIsIlRhZyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk1hZ25ldGljIiwieCIsInkiLCJyZXZlYWwiLCJoaWRkZW4iLCJvcGFjaXR5Iiwic2hvdyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImVhc2UiLCJzdGFnZ2VyIiwic3RhZ2dlckNoaWxkcmVuIiwiaW5WaWV3IiwiaW5pdGlhbCIsIndoaWxlSW5WaWV3Iiwidmlld3BvcnQiLCJvbmNlIiwiYW1vdW50IiwiUmV2ZWFsIiwiZGVsYXkiLCJ2YXJpYW50cyIsIlRpdGxlIiwiYWNjZW50IiwiY2VudGVyIiwibGVhZCIsInNwYW4iLCJTcGxpdFRleHQiLCJ0ZXh0IiwibWFwIiwiY2giLCJpIiwia2V5IiwiYW5pbWF0aW9uRGVsYXkiLCJDb3VudFVwIiwidG8iLCJzdWZmaXgiLCJuIiwic2V0TiIsImlvIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiZGlzY29ubmVjdCIsInN0YXJ0IiwicGVyZm9ybWFuY2UiLCJub3ciLCJkdXIiLCJzdGVwIiwicCIsIm1pbiIsInBvdyIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJEQVlfTkFNRVMiLCJmbXRUaW1lIiwiaCIsIm0iLCJoaCIsIlN0cmluZyIsInBhZFN0YXJ0IiwiYXRUaW1lIiwic2hpZnRzRm9yIiwiZGF5Iiwid2Vla2RheXMiLCJzYXR1cmRheSIsImhvdXJzIiwic2hpZnRzIiwicyIsImZyb20iLCJvcGVuSG91ciIsIm9wZW5NaW51dGUiLCJjbG9zZUhvdXIiLCJjbG9zZU1pbnV0ZSIsIm5hbWUiLCJsYWJlbCIsInRpbWVSYW5nZSIsImxpbWFOb3ciLCJwYXJ0cyIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsInRpbWVab25lIiwid2Vla2RheSIsImhvdXIiLCJtaW51dGUiLCJob3VyMTIiLCJmb3JtYXRUb1BhcnRzIiwiRGF0ZSIsImdldCIsImZpbmQiLCJ0eXBlIiwidmFsdWUiLCJpbmRleE9mIiwibWludXRlcyIsIk51bWJlciIsImdldFN0YXR1cyIsInRvZGF5Iiwib3BlbiIsImRldGFpbCIsImZsb29yIiwiZCIsIm5leHQiLCJ3aGVuIiwidG9Mb3dlckNhc2UiLCJwYXVzZWQiLCJzb21lIiwiQTExWV9ERUZBVUxUIiwiY29udHJhc3QiLCJsaW5rcyIsImZvbnQiLCJ0aGVtZSIsImNvbG9yYmxpbmQiLCJyZWFkQTExeSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcHBseUExMXkiLCJyb290IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJkYXRhc2V0IiwiZm9udFNpemUiLCJBMTF5VG9nZ2xlIiwib24iLCJoaW50Iiwib25DaGFuZ2UiLCJyb2xlIiwib25DbGljayIsIkExMXlQYW5lbCIsInNldE9wZW4iLCJzZXRTIiwiYnRuUmVmIiwicGFuZWxSZWYiLCJ2b2ljZVN0YXR1cyIsInNldFZvaWNlU3RhdHVzIiwidm9pY2VNZXNzYWdlIiwic2V0Vm9pY2VNZXNzYWdlIiwid2hhdHNhcHBQZW5kaW5nIiwic2V0V2hhdHNhcHBQZW5kaW5nIiwic3BlYWsiLCJtZXNzYWdlIiwic3BlZWNoU3ludGhlc2lzIiwiY2FuY2VsIiwidXR0ZXJhbmNlIiwiU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIiwibGFuZyIsInJhdGUiLCJvbnN0YXJ0Iiwib25lbmQiLCJvbmVycm9yIiwic3RvcFNwZWFraW5nIiwiZ29Ub1NlY3Rpb24iLCJpZCIsInNlY3Rpb24iLCJnZXRFbGVtZW50QnlJZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsInJlYWRQYWdlIiwiY29udGVudCIsImJvZHkiLCJpbm5lclRleHQiLCJyZXBsYWNlIiwidHJpbSIsInNsaWNlIiwicHJvY2Vzc1ZvaWNlQ29tbWFuZCIsImNvbW1hbmQiLCJub3JtYWxpemUiLCJ0ZXN0IiwiaW5jbHVkZXMiLCJzY3JvbGxUbyIsInN0YXJ0Vm9pY2VSZWNvZ25pdGlvbiIsIlJlY29nbml0aW9uIiwiU3BlZWNoUmVjb2duaXRpb24iLCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbiIsInJlY29nbml0aW9uIiwiY29udGludW91cyIsImludGVyaW1SZXN1bHRzIiwib25yZXN1bHQiLCJldmVudCIsInJlc3VsdHMiLCJ0cmFuc2NyaXB0IiwiZXJyb3IiLCJvcGVuV2hhdHNBcHBGcm9tVm9pY2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZm9jdXMiLCJvbktleSIsImNvbnRhaW5zIiwidGFyZ2V0Iiwic2V0IiwiayIsInYiLCJ0b2dnbGUiLCJzaXplIiwiZGl2Iiwic2NhbGUiLCJhbmltYXRlIiwiZXhpdCIsImwiLCJEaWdpdCIsInNwbGl0IiwiSW50cm8iLCJwaGFzZSIsInNldFBoYXNlIiwic2Vzc2lvblN0b3JhZ2UiLCJza2lwUmVmIiwicmVhZHkiLCJsb2FkZWQiLCJQcm9taXNlIiwiSW1hZ2UiLCJvbmxvYWQiLCJzcmMiLCJmb250cyIsInJlc29sdmUiLCJmb3JFYWNoIiwidGhlbiIsImxlbmd0aCIsImdpdmVVcCIsInNldFRpbWVvdXQiLCJEVVIiLCJ0aW1lIiwiZWFzZWQiLCJjbGVhclRpbWVvdXQiLCJkaWdpdHMiLCJyaWdodCIsImNsaXBQYXRoIiwiTkFWIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJzY3JvbGxZUHJvZ3Jlc3MiLCJzY2FsZVgiLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicmVzdERlbHRhIiwiTG9nbyIsImxvZ29QYXRoIiwiYWx0IiwiSGVhZGVyIiwic29saWQiLCJzZXRTb2xpZCIsIm1lbnVCdG4iLCJvblNjcm9sbCIsInNjcm9sbFkiLCJwYXNzaXZlIiwiaHJlZiIsInJlbCIsIm5hdiIsIkhlcm8iLCJzY2VuZVJlZiIsInNjZW5lIiwibGF5ZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnNlRmxvYXQiLCJkZXB0aCIsInN5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwic2Nyb2xsIiwibG9vcCIsIkFycmF5IiwiXyIsImFuaW1hdGlvbkR1cmF0aW9uIiwic29jaWFsIiwiaW5zdGFncmFtVXJsIiwiZ29vZ2xlTWFwc1VybCIsImNpdHkiLCJSaWJib25zIiwid29yZHMiLCJyb3ciLCJ3IiwiUGF1c2VJY29uIiwidmlld0JveCIsImZpbGwiLCJyeCIsIlBsYXlHbHlwaCIsIkFCT1VUX1JFRUwiLCJBYm91dFZpZGVvIiwiYm94UmVmIiwibXV0ZWQiLCJzZXRNdXRlZCIsInNldFBhdXNlZCIsInBhdXNlZFJlZiIsIm11dGVkUmVmIiwicGF1c2UiLCJwbGF5IiwiY2F0Y2giLCJwb3N0ZXIiLCJwbGF5c0lubGluZSIsInByZWxvYWQiLCJBYm91dCIsImRlc2NyaXB0aW9uIiwiRkVBVFVSRVMiLCJXaHlVcyIsImxvYWRpbmciLCJ1bCIsIkljb24iLCJ0aXRsZSIsImxpIiwiVHJhaW5lckNhcmQiLCJzbHVnIiwicGhvdG8iLCJUcmFpbmVycyIsInRyYWluZXJzIiwiVHJhaW5lclByb2ZpbGUiLCJvdGhlcnMiLCJmaWx0ZXIiLCJvIiwidGFiSW5kZXgiLCJibG9ja3F1b3RlIiwicXVvdGUiLCJkbCIsInllYXJzIiwiYXRobGV0ZXMiLCJiaW8iLCJzcGVjaWFsdGllcyIsInNjaGVkdWxlIiwib2wiLCJoZWxwcyIsIlJlZWxzIiwicmVlbHMiLCJhY3RpdmUiLCJzZXRBY3RpdmUiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsInZpZHMiLCJ3cmFwUmVmIiwic3RhcnRYIiwiZ28iLCJjdXJyZW50VGltZSIsImluc3RhZ3JhbUhhbmRsZSIsIm9uS2V5RG93biIsIm9uUG9pbnRlckRvd24iLCJvblBvaW50ZXJVcCIsImR4Iiwib2ZmIiwiaXNBY3RpdmUiLCJjb2RlIiwiekluZGV4IiwicG9pbnRlckV2ZW50cyIsIm9uRW5kZWQiLCJ2aWV3cyIsInN0b3BQcm9wYWdhdGlvbiIsIlpPTkVTIiwiaW1nIiwiZ2VhciIsIlpvbmVzIiwieiIsImJ1dHRvbiIsIm9uTW91c2VFbnRlciIsIm9uRm9jdXMiLCJnIiwiUGxhbnMiLCJwbGFucyIsImlzRmVhdHVyZWQiLCJ0YWdsaW5lIiwiY3VycmVuY3kiLCJwcmljZSIsInBlcmlvZCIsImZlYXR1cmVzIiwiZiIsIndoYXRzYXBwVXJsIiwiYnV0dG9uVGV4dCIsInNob3J0SG91ciIsIm51bSIsImFtcG0iLCJUaW1lUmFuZ2UiLCJzcG9rZW4iLCJTY2hlZHVsZSIsInN0YXR1cyIsInNldFN0YXR1cyIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInN1bmRheSIsImdyb3VwcyIsImRheXMiLCJub3RlIiwic3RhdHVzTm90ZSIsIkN0YUJhbmQiLCJDb250YWN0IiwiYWRkcmVzcyIsImRpc3BsYXkiLCJnb29nbGVNYXBzRW1iZWRRdWVyeSIsInJlZmVycmVyUG9saWN5IiwiRm9vdGVyIiwiZ2V0RnVsbFllYXIiLCJsb2NhbEFuc3dlciIsInEiLCJjIiwiam9pbiIsImZvcm1hdHRlZFByaWNlIiwidHIiLCJTVUdHRVNUSU9OUyIsIkNoYXRCb3QiLCJpbnB1dCIsInNldElucHV0IiwiYnVzeSIsInNldEJ1c3kiLCJtc2dzIiwic2V0TXNncyIsImxpc3RSZWYiLCJpbnB1dFJlZiIsInNjcm9sbEhlaWdodCIsImFzayIsInJlcGx5IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwibWVzc2FnZXMiLCJkYXRhIiwianNvbiIsIm9rIiwib25TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsInBsYWNlaG9sZGVyIiwibWF4TGVuZ3RoIiwiZGlzYWJsZWQiLCJIb21lIiwibG9jYXRpb24iLCJoYXNoIiwic3RhcnRzV2l0aCIsInVzZUhhc2giLCJzZXRIYXNoIiwiQXBwIiwidHJhaW5lciIsIkZyYWdtZW50IiwiY3JlYXRlUm9vdCIsInJlbmRlciJdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gNyBTdHJlbmd0aCBDZW50ZXIg4oCUIGxhbmRpbmcgaW5tZXJzaXZhIGNvbiBlZmVjdG9zIDNELlxyXG4vLyBWZXJzacOzbiBhbnRlcmlvcjogL3Jlc3BhbGRvLXZlcnNpb24tYW50ZXJpb3IvQXBwLmpzeFxyXG4vLyBUZXh0b3MsIHByZWNpb3MsIGhvcmFyaW9zLCByZWVscyB5IGVudHJlbmFkb3Jlczogc3JjL3NpdGUtY29uZmlnLmpzXHJcbmltcG9ydCB7XHJcbiAgdXNlU2Nyb2xsLFxyXG4gIHVzZVNwcmluZyxcclxuICBtb3Rpb24sXHJcbiAgUmVhY3QsXHJcbiAgQW5pbWF0ZVByZXNlbmNlLFxyXG4gIE1lbnVJY29uLFxyXG4gIFhJY29uLFxyXG4gIEFycm93UmlnaHRJY29uLFxyXG4gIER1bWJiZWxsSWNvbixcclxuICBUYXJnZXRJY29uLFxyXG4gIFVzZXJzSWNvbixcclxuICBTaGllbGRDaGVja0ljb24sXHJcbiAgQ2xvY2tJY29uLFxyXG4gIENoZWNrSWNvbixcclxuICBaYXBJY29uLFxyXG4gIE1hcFBpbkljb24sXHJcbiAgUGhvbmVJY29uLFxyXG4gIEluc3RhZ3JhbUljb24sXHJcbiAgTWVzc2FnZUNpcmNsZUljb24sXHJcbiAgQXJyb3dVcEljb24sXHJcbiAgQ2hldnJvbkxlZnRJY29uLFxyXG4gIENoZXZyb25SaWdodEljb24sXHJcbiAgRXh0ZXJuYWxMaW5rSWNvbixcclxuICBFeWVJY29uLFxyXG4gIFZvbHVtZTJJY29uLFxyXG4gIFZvbHVtZVhJY29uLFxyXG4gIENhbGVuZGFySWNvbixcclxuICBOYXZpZ2F0aW9uSWNvbixcclxuICBTcGFya2xlc0ljb24sXHJcbiAgQWNjZXNzaWJpbGl0eUljb24sXHJcbiAgUmVhY3RET00sXHJcbn0gZnJvbSBcIi4vcnVudGltZS1pbXBvcnRzLmpzXCI7XHJcbmltcG9ydCB7IHNpdGVDb25maWcgfSBmcm9tIFwiLi9zaXRlLWNvbmZpZy5qc1wiO1xyXG5cclxuY29uc3QgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZU1lbW8gfSA9IFJlYWN0O1xyXG5jb25zdCBJTUcgPSB7XHJcbiAgaGVyb0JnOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV9jYWI1Y2FkYi5wbmdgLFxyXG4gIGhlcm86IGAvYXNzZXRzL3BlcnNvbmFzL2hlcm9lLnBuZ2AsXHJcbiAgaW50ZXJpb3I6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlXzk5M2RkYjgwLnBuZ2AsXHJcbiAgcmFja3M6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlX2Y4YTgyMDBhLnBuZ2AsXHJcbiAgZGlzY29zOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV9lNzY3YzNkNi5wbmdgLFxyXG4gIG1hcXVpbmFzOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV8xOWExNWI0MC5wbmdgLFxyXG59O1xyXG5jb25zdCB3YSA9IChtc2cgPSBzaXRlQ29uZmlnLnBob25lLndoYXRzYXBwTWVzc2FnZUdlbmVyYWwpID0+XHJcbiAgYGh0dHBzOi8vd2EubWUvJHtzaXRlQ29uZmlnLnBob25lLnJhd30/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChtc2cpfWA7XHJcbmNvbnN0IEVBU0UgPSBbMC4yMywgMSwgMC4zMiwgMV07XHJcblxyXG4vLyAtLS0tLS0tLS0tIHV0aWxpZGFkZXMgZGUgbW92aW1pZW50byAtLS0tLS0tLS0tXHJcbmNvbnN0IGZpbmVQb2ludGVyID0gKCkgPT5cclxuICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5tYXRjaE1lZGlhKFwiKGhvdmVyOiBob3ZlcikgYW5kIChwb2ludGVyOiBmaW5lKVwiKS5tYXRjaGVzO1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKyAoYiAtIGEpICogdDtcclxuXHJcbi8vIEluY2xpbmFjacOzbiAzRCBxdWUgc2lndWUgYWwgbW91c2UsIGNvbiBpbmVyY2lhLlxyXG5mdW5jdGlvbiB1c2VUaWx0KG1heCA9IDEwKSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCB8fCAhZmluZVBvaW50ZXIoKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgZ2xhcmUgPSBlbC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlID4gLmdsYXJlXCIpO1xyXG4gICAgbGV0IHJhZiA9IDAsIHR4ID0gMCwgdHkgPSAwLCBjeCA9IDAsIGN5ID0gMCwgZ3ggPSA1MCwgZ3kgPSA1MDtcclxuICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGN4ID0gbGVycChjeCwgdHgsIDAuMTQpO1xyXG4gICAgICBjeSA9IGxlcnAoY3ksIHR5LCAwLjE0KTtcclxuICAgICAgZWwuc3R5bGUudHJhbnNmb3JtID0gYHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWCgke2N5LnRvRml4ZWQoMil9ZGVnKSByb3RhdGVZKCR7Y3gudG9GaXhlZCgyKX1kZWcpYDtcclxuICAgICAgaWYgKGdsYXJlKSBnbGFyZS5zdHlsZS5iYWNrZ3JvdW5kID0gYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgJHtneH0lICR7Z3l9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjE2KSwgdHJhbnNwYXJlbnQgNTUlKWA7XHJcbiAgICAgIHJhZiA9IE1hdGguYWJzKGN4IC0gdHgpID4gMC4wMSB8fCBNYXRoLmFicyhjeSAtIHR5KSA+IDAuMDEgPyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaykgOiAwO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGtpY2sgPSAoKSA9PiB7IGlmICghcmFmKSByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7IH07XHJcbiAgICBjb25zdCBtb3ZlID0gKGUpID0+IHtcclxuICAgICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGNvbnN0IHB4ID0gKGUuY2xpZW50WCAtIHIubGVmdCkgLyByLndpZHRoLCBweSA9IChlLmNsaWVudFkgLSByLnRvcCkgLyByLmhlaWdodDtcclxuICAgICAgdHggPSAocHggLSAwLjUpICogMiAqIG1heDtcclxuICAgICAgdHkgPSAoMC41IC0gcHkpICogMiAqIG1heDtcclxuICAgICAgZ3ggPSBNYXRoLnJvdW5kKHB4ICogMTAwKTsgZ3kgPSBNYXRoLnJvdW5kKHB5ICogMTAwKTtcclxuICAgICAga2ljaygpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGxlYXZlID0gKCkgPT4geyB0eCA9IDA7IHR5ID0gMDsga2ljaygpOyB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG1vdmUpO1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBsZWF2ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xyXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybGVhdmVcIiwgbGVhdmUpO1xyXG4gICAgfTtcclxuICB9LCBbbWF4XSk7XHJcbiAgcmV0dXJuIHJlZjtcclxufVxyXG5jb25zdCBUaWx0ID0gKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9IFwiXCIsIG1heCwgYXMgPSBcImRpdlwiLCAuLi5yZXN0IH0pID0+IHtcclxuICBjb25zdCByZWYgPSB1c2VUaWx0KG1heCk7XHJcbiAgY29uc3QgVGFnID0gYXM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxUYWcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHRpbHQgJHtjbGFzc05hbWV9YH0gey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdsYXJlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgIDwvVGFnPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBCb3TDs24gXCJtYWduw6l0aWNvXCI6IHNlIGFjZXJjYSB1biBwb2NvIGFsIGN1cnNvci5cclxuZnVuY3Rpb24gTWFnbmV0aWMoeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gXCJcIiwgLi4ucmVzdCB9KSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCB8fCAhZmluZVBvaW50ZXIoKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgbW92ZSA9IChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgeCA9IChlLmNsaWVudFggLSAoci5sZWZ0ICsgci53aWR0aCAvIDIpKSAqIDAuMjU7XHJcbiAgICAgIGNvbnN0IHkgPSAoZS5jbGllbnRZIC0gKHIudG9wICsgci5oZWlnaHQgLyAyKSkgKiAwLjM1O1xyXG4gICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgbGVhdmUgPSAoKSA9PiB7IGVsLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7IH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmxlYXZlXCIsIGxlYXZlKTtcclxuICAgIHJldHVybiAoKSA9PiB7IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTsgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBsZWF2ZSk7IH07XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiA8YSByZWY9e3JlZn0gY2xhc3NOYW1lPXtgbWFnbmV0aWMgJHtjbGFzc05hbWV9YH0gey4uLnJlc3R9PntjaGlsZHJlbn08L2E+O1xyXG59XHJcblxyXG5jb25zdCByZXZlYWwgPSB7XHJcbiAgaGlkZGVuOiB7IG9wYWNpdHk6IDAsIHk6IDM2IH0sXHJcbiAgc2hvdzogeyBvcGFjaXR5OiAxLCB5OiAwLCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjcsIGVhc2U6IEVBU0UgfSB9LFxyXG59O1xyXG5jb25zdCBzdGFnZ2VyID0geyBoaWRkZW46IHt9LCBzaG93OiB7IHRyYW5zaXRpb246IHsgc3RhZ2dlckNoaWxkcmVuOiAwLjA4IH0gfSB9O1xyXG5jb25zdCBpblZpZXcgPSB7IGluaXRpYWw6IFwiaGlkZGVuXCIsIHdoaWxlSW5WaWV3OiBcInNob3dcIiwgdmlld3BvcnQ6IHsgb25jZTogdHJ1ZSwgYW1vdW50OiAwLjIgfSB9O1xyXG5jb25zdCBSZXZlYWwgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBhcyA9IFwiZGl2XCIsIGRlbGF5ID0gMCB9KSA9PiB7XHJcbiAgY29uc3QgVGFnID0gbW90aW9uW2FzXTtcclxuICByZXR1cm4gKFxyXG4gICAgPFRhZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmFyaWFudHM9e3JldmVhbH0gey4uLmluVmlld30gdHJhbnNpdGlvbj17eyBkZWxheSB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9UYWc+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFTDrXR1bG8gZGUgc2VjY2nDs24gcXVlIHN1YmUgZGVzZGUgdW5hIG3DoXNjYXJhLlxyXG5mdW5jdGlvbiBUaXRsZSh7IGNoaWxkcmVuLCBhY2NlbnQsIGNlbnRlciwgbGVhZCB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgdGl0bGUtYmxvY2ske2NlbnRlciA/IFwiIGNlbnRlclwiIDogXCJcIn1gfT5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgPG1vdGlvbi5zcGFuIGNsYXNzTmFtZT1cIm1hc2tcIiBpbml0aWFsPVwiaGlkZGVuXCIgd2hpbGVJblZpZXc9XCJzaG93XCIgdmlld3BvcnQ9e3sgb25jZTogdHJ1ZSwgYW1vdW50OiAwLjUgfX0+XHJcbiAgICAgICAgICA8bW90aW9uLnNwYW5cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFzay1pbm5lclwiXHJcbiAgICAgICAgICAgIHZhcmlhbnRzPXt7IGhpZGRlbjogeyB5OiBcIjEwNSVcIiB9LCBzaG93OiB7IHk6IFwiMCVcIiwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC44LCBlYXNlOiBFQVNFIH0gfSB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59IHthY2NlbnQgJiYgPGVtPnthY2NlbnR9PC9lbT59XHJcbiAgICAgICAgICA8L21vdGlvbi5zcGFuPlxyXG4gICAgICAgIDwvbW90aW9uLnNwYW4+XHJcbiAgICAgIDwvaDI+XHJcbiAgICAgIHtsZWFkICYmIDxSZXZlYWwgYXM9XCJwXCIgY2xhc3NOYW1lPVwibGVhZC10ZXh0XCIgZGVsYXk9ezAuMTV9PntsZWFkfTwvUmV2ZWFsPn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFTDrXR1bG8gcXVlIGFwYXJlY2UgbGV0cmEgcG9yIGxldHJhIGVuIDNELlxyXG5jb25zdCBTcGxpdFRleHQgPSAoeyB0ZXh0LCBjbGFzc05hbWUgPSBcIlwiLCBkZWxheSA9IDAgfSkgPT4gKFxyXG4gIDxzcGFuIGNsYXNzTmFtZT17YHNwbGl0ICR7Y2xhc3NOYW1lfWB9IGFyaWEtbGFiZWw9e3RleHR9PlxyXG4gICAge1suLi50ZXh0XS5tYXAoKGNoLCBpKSA9PiAoXHJcbiAgICAgIDxzcGFuIGtleT17aX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IGAke2RlbGF5ICsgaSAqIDAuMDN9c2AgfX0+XHJcbiAgICAgICAge2NoID09PSBcIiBcIiA/IFwiwqBcIiA6IGNofVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApKX1cclxuICA8L3NwYW4+XHJcbik7XHJcblxyXG4vLyBOw7ptZXJvIHF1ZSBjdWVudGEgaGFjaWEgYXJyaWJhIGN1YW5kbyBhcGFyZWNlLlxyXG5mdW5jdGlvbiBDb3VudFVwKHsgdG8sIHN1ZmZpeCA9IFwiXCIgfSkge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBbbiwgc2V0Tl0gPSB1c2VTdGF0ZSgwKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZWwgPSByZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGNvbnN0IGlvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbZW50cnldKSA9PiB7XHJcbiAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHJldHVybjtcclxuICAgICAgaW8uZGlzY29ubmVjdCgpO1xyXG4gICAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpLCBkdXIgPSAxNDAwO1xyXG4gICAgICBjb25zdCBzdGVwID0gKHQpID0+IHtcclxuICAgICAgICBjb25zdCBwID0gTWF0aC5taW4oKHQgLSBzdGFydCkgLyBkdXIsIDEpO1xyXG4gICAgICAgIHNldE4oTWF0aC5yb3VuZCh0byAqICgxIC0gTWF0aC5wb3coMSAtIHAsIDQpKSkpO1xyXG4gICAgICAgIGlmIChwIDwgMSkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xyXG4gICAgICB9O1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XHJcbiAgICB9LCB7IHRocmVzaG9sZDogMC42IH0pO1xyXG4gICAgaW8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gaW8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFt0b10pO1xyXG4gIHJldHVybiA8c3BhbiByZWY9e3JlZn0gY2xhc3NOYW1lPVwibnVtXCI+e259e3N1ZmZpeH08L3NwYW4+O1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIGhvcmFyaW9zOiBlc3RhZG8gZW4gdml2byAoaG9yYSBkZSBMaW1hKSAtLS0tLS0tLS0tXHJcbmNvbnN0IERBWV9OQU1FUyA9IFtcIkRvbWluZ29cIiwgXCJMdW5lc1wiLCBcIk1hcnRlc1wiLCBcIk1pw6lyY29sZXNcIiwgXCJKdWV2ZXNcIiwgXCJWaWVybmVzXCIsIFwiU8OhYmFkb1wiXTtcclxuY29uc3QgZm10VGltZSA9IChoLCBtID0gMCkgPT4ge1xyXG4gIGNvbnN0IHN1ZmZpeCA9IGggPCAxMiA/IFwiYS4gbS5cIiA6IFwicC4gbS5cIjtcclxuICBjb25zdCBoaCA9IGggJSAxMiA9PT0gMCA/IDEyIDogaCAlIDEyO1xyXG4gIHJldHVybiBgJHtoaH06JHtTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpfSAke3N1ZmZpeH1gO1xyXG59O1xyXG4vLyBcImEgbGEgMTowMCBwLiBtLlwiIHBlcm8gXCJhIGxhcyA5OjAwIHAuIG0uXCJcclxuY29uc3QgYXRUaW1lID0gKGgsIG0gPSAwKSA9PiBgJHtoICUgMTIgPT09IDEgPyBcImEgbGFcIiA6IFwiYSBsYXNcIn0gJHtmbXRUaW1lKGgsIG0pfWA7XHJcbmNvbnN0IHNoaWZ0c0ZvciA9IChkYXkpID0+IHtcclxuICBjb25zdCB7IHdlZWtkYXlzLCBzYXR1cmRheSB9ID0gc2l0ZUNvbmZpZy5ob3VycztcclxuICBpZiAoZGF5ID09PSAwKSByZXR1cm4gW107XHJcbiAgcmV0dXJuIChkYXkgPT09IDYgPyBzYXR1cmRheS5zaGlmdHMgOiB3ZWVrZGF5cy5zaGlmdHMpLm1hcCgocykgPT4gKHtcclxuICAgIGZyb206IHMub3BlbkhvdXIgKiA2MCArIHMub3Blbk1pbnV0ZSxcclxuICAgIHRvOiBzLmNsb3NlSG91ciAqIDYwICsgcy5jbG9zZU1pbnV0ZSxcclxuICAgIG5hbWU6IHMubmFtZSxcclxuICAgIGxhYmVsOiBzLnRpbWVSYW5nZSxcclxuICB9KSk7XHJcbn07XHJcbmZ1bmN0aW9uIGxpbWFOb3coKSB7XHJcbiAgY29uc3QgcGFydHMgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBcIkFtZXJpY2EvTGltYVwiLCB3ZWVrZGF5OiBcInNob3J0XCIsIGhvdXI6IFwibnVtZXJpY1wiLCBtaW51dGU6IFwibnVtZXJpY1wiLCBob3VyMTI6IGZhbHNlLFxyXG4gIH0pLmZvcm1hdFRvUGFydHMobmV3IERhdGUoKSk7XHJcbiAgY29uc3QgZ2V0ID0gKHQpID0+IHBhcnRzLmZpbmQoKHApID0+IHAudHlwZSA9PT0gdCk/LnZhbHVlO1xyXG4gIGNvbnN0IGRheSA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXS5pbmRleE9mKGdldChcIndlZWtkYXlcIikpO1xyXG4gIHJldHVybiB7IGRheSwgbWludXRlczogKE51bWJlcihnZXQoXCJob3VyXCIpKSAlIDI0KSAqIDYwICsgTnVtYmVyKGdldChcIm1pbnV0ZVwiKSkgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgY29uc3QgeyBkYXksIG1pbnV0ZXMgfSA9IGxpbWFOb3coKTtcclxuICBjb25zdCB0b2RheSA9IHNoaWZ0c0ZvcihkYXkpO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSB0b2RheS5maW5kKChzKSA9PiBtaW51dGVzID49IHMuZnJvbSAmJiBtaW51dGVzIDwgcy50byk7XHJcbiAgaWYgKGN1cnJlbnQpIHtcclxuICAgIGNvbnN0IGxlZnQgPSBjdXJyZW50LnRvIC0gbWludXRlcztcclxuICAgIHJldHVybiB7IG9wZW46IHRydWUsIGRheSwgbWludXRlcywgbGFiZWw6IFwiQWJpZXJ0byBhaG9yYVwiLCBkZXRhaWw6IGBDaWVycmEgJHthdFRpbWUoTWF0aC5mbG9vcihjdXJyZW50LnRvIC8gNjApLCBjdXJyZW50LnRvICUgNjApfSR7bGVmdCA8PSA2MCA/IGAgwrcgcXVlZGFuICR7bGVmdH0gbWluYCA6IFwiXCJ9YCB9O1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgY29uc3QgZCA9IChkYXkgKyBpKSAlIDc7XHJcbiAgICBjb25zdCBuZXh0ID0gc2hpZnRzRm9yKGQpLmZpbmQoKHMpID0+IGkgPiAwIHx8IHMuZnJvbSA+IG1pbnV0ZXMpO1xyXG4gICAgaWYgKG5leHQpIHtcclxuICAgICAgY29uc3Qgd2hlbiA9IGkgPT09IDAgPyBcImhveVwiIDogaSA9PT0gMSA/IFwibWHDsWFuYVwiIDogYGVsICR7REFZX05BTUVTW2RdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgY29uc3QgcGF1c2VkID0gaSA9PT0gMCAmJiB0b2RheS5zb21lKChzKSA9PiBzLnRvIDw9IG1pbnV0ZXMpO1xyXG4gICAgICByZXR1cm4geyBvcGVuOiBmYWxzZSwgZGF5LCBtaW51dGVzLCBsYWJlbDogcGF1c2VkID8gXCJFbiBwYXVzYVwiIDogXCJDZXJyYWRvIGFob3JhXCIsIGRldGFpbDogYEFicmUgJHt3aGVufSAke2F0VGltZShNYXRoLmZsb29yKG5leHQuZnJvbSAvIDYwKSwgbmV4dC5mcm9tICUgNjApfWAgfTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHsgb3BlbjogZmFsc2UsIGRheSwgbWludXRlcywgbGFiZWw6IFwiQ2VycmFkb1wiLCBkZXRhaWw6IFwiQ29uc3VsdGEgcG9yIFdoYXRzQXBwXCIgfTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBpbnRybyB5IGN1cnNvciAtLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0gQUNDRVNJQklMSURBRDogcHJlZmVyZW5jaWFzIGRlbCB2aXNpdGFudGUgLS0tLS0tLS0tLVxyXG5jb25zdCBBMTFZX0RFRkFVTFQgPSB7IHRleHQ6IDAsIGNvbnRyYXN0OiBmYWxzZSwgbGlua3M6IGZhbHNlLCBtb3Rpb246IGZhbHNlLCBmb250OiBmYWxzZSwgdGhlbWU6IFwiZGFya1wiLCBjb2xvcmJsaW5kOiBmYWxzZSB9O1xyXG5mdW5jdGlvbiByZWFkQTExeSgpIHtcclxuICB0cnkgeyByZXR1cm4geyAuLi5BMTFZX0RFRkFVTFQsIC4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY2Nlc2liaWxpZGFkXCIpIHx8IFwie31cIikgfTsgfSBjYXRjaCB7IHJldHVybiB7IC4uLkExMVlfREVGQVVMVCB9OyB9XHJcbn1cclxuZnVuY3Rpb24gYXBwbHlBMTF5KHMpIHtcclxuICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gIHJvb3QuZGF0YXNldC5jb2xvcmJsaW5kID0gcy5jb2xvcmJsaW5kID8gXCJvblwiIDogXCJcIjtcclxuICByb290LnN0eWxlLmZvbnRTaXplID0gW1wiMTAwJVwiLCBcIjExMi41JVwiLCBcIjEyNSVcIiwgXCIxMzcuNSVcIl1bcy50ZXh0XSB8fCBcIjEwMCVcIjtcclxuICByb290LmRhdGFzZXQuY29udHJhc3QgPSBzLmNvbnRyYXN0ID8gXCJoaWdoXCIgOiBcIlwiO1xyXG4gIHJvb3QuZGF0YXNldC5saW5rcyA9IHMubGlua3MgPyBcInVuZGVybGluZVwiIDogXCJcIjtcclxuICByb290LmRhdGFzZXQubW90aW9uID0gcy5tb3Rpb24gPyBcInJlZHVjZVwiIDogXCJcIjtcclxuICByb290LmRhdGFzZXQuZm9udCA9IHMuZm9udCA/IFwicmVhZGFibGVcIiA6IFwiXCI7XHJcbiAgcm9vdC5kYXRhc2V0LnRoZW1lID0gcy50aGVtZSA9PT0gXCJsaWdodFwiID8gXCJsaWdodFwiIDogXCJkYXJrXCI7XHJcbn1cclxuLy8gU2UgYXBsaWNhIGFudGVzIGRlIHBpbnRhciBsYSBww6FnaW5hIHBhcmEgZXZpdGFyIHBhcnBhZGVvcy5cclxuYXBwbHlBMTF5KHJlYWRBMTF5KCkpO1xyXG5jb25zdCBtb3Rpb25SZWR1Y2VkID0gKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQubW90aW9uID09PSBcInJlZHVjZVwiO1xyXG5cclxuZnVuY3Rpb24gQTExeVRvZ2dsZSh7IG9uLCBsYWJlbCwgaGludCwgb25DaGFuZ2UgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic3dpdGNoXCIgYXJpYS1jaGVja2VkPXtvbn0gY2xhc3NOYW1lPXtgYTExeS10b2dnbGUke29uID8gXCIgb25cIiA6IFwiXCJ9YH0gb25DbGljaz17b25DaGFuZ2V9PlxyXG4gICAgICA8c3Bhbj48c3Ryb25nPntsYWJlbH08L3N0cm9uZz48c21hbGw+e2hpbnR9PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgIDxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBMTF5UGFuZWwoKSB7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzLCBzZXRTXSA9IHVzZVN0YXRlKHJlYWRBMTF5KTtcclxuICBjb25zdCBidG5SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIFxyXG4gIC8vIC0tLS0tLS0tLS0gQVNJU1RFTlRFIERFIFZPWiAtLS0tLS0tLS0tXHJcbiAgY29uc3QgW3ZvaWNlU3RhdHVzLCBzZXRWb2ljZVN0YXR1c10gPSB1c2VTdGF0ZShcIlZveiBsaXN0YVwiKTtcclxuICBjb25zdCBbdm9pY2VNZXNzYWdlLCBzZXRWb2ljZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3doYXRzYXBwUGVuZGluZywgc2V0V2hhdHNhcHBQZW5kaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3Qgc3BlYWsgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgaWYgKCEoXCJzcGVlY2hTeW50aGVzaXNcIiBpbiB3aW5kb3cpKSB7XHJcbiAgICAgIHNldFZvaWNlTWVzc2FnZShcIlR1IG5hdmVnYWRvciBubyBhZG1pdGUgbGVjdHVyYSBlbiB2b3ogYWx0YS5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xyXG4gICAgY29uc3QgdXR0ZXJhbmNlID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZShtZXNzYWdlKTtcclxuICAgIHV0dGVyYW5jZS5sYW5nID0gXCJlcy1QRVwiO1xyXG4gICAgdXR0ZXJhbmNlLnJhdGUgPSAwLjk1O1xyXG4gICAgdXR0ZXJhbmNlLm9uc3RhcnQgPSAoKSA9PiBzZXRWb2ljZVN0YXR1cyhcIkxleWVuZG8uLi5cIik7XHJcbiAgICB1dHRlcmFuY2Uub25lbmQgPSAoKSA9PiBzZXRWb2ljZVN0YXR1cyhcIlZveiBsaXN0YVwiKTtcclxuICAgIHV0dGVyYW5jZS5vbmVycm9yID0gKCkgPT4gc2V0Vm9pY2VTdGF0dXMoXCJFcnJvciBkZSByZXByb2R1Y2Npw7NuXCIpO1xyXG4gICAgd2luZG93LnNwZWVjaFN5bnRoZXNpcy5zcGVhayh1dHRlcmFuY2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN0b3BTcGVha2luZyA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5zcGVlY2hTeW50aGVzaXM/LmNhbmNlbCgpO1xyXG4gICAgc2V0Vm9pY2VTdGF0dXMoXCJMZWN0dXJhIGRldGVuaWRhXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvVG9TZWN0aW9uID0gKGlkLCBtZXNzYWdlKSA9PiB7XHJcbiAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYgKCFzZWN0aW9uKSB7XHJcbiAgICAgIHNwZWFrKFwiTm8gZW5jb250csOpIGVzYSBzZWNjacOzbi5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNlY3Rpb24uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIiB9KTtcclxuICAgIHNwZWFrKG1lc3NhZ2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlYWRQYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpIHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICBjb25zdCB0ZXh0ID0gY29udGVudC5pbm5lclRleHQucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikudHJpbSgpLnNsaWNlKDAsIDEyMDAwKTtcclxuICAgIGlmICh0ZXh0KSBzcGVhayh0ZXh0KTtcclxuICAgIGVsc2Ugc3BlYWsoXCJObyBoYXkgY29udGVuaWRvIHBhcmEgbGVlci5cIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcHJvY2Vzc1ZvaWNlQ29tbWFuZCA9IChjb21tYW5kKSA9PiB7XHJcbiAgICBjb25zdCB0ZXh0ID0gY29tbWFuZC50b0xvd2VyQ2FzZSgpLm5vcm1hbGl6ZShcIk5GRFwiKVxyXG4gICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIik7XHJcblxyXG4gICAgaWYgKC9cXGIoZGV0ZW5lcnxwYXJhcnxzaWxlbmNpbylcXGIvLnRlc3QodGV4dCkpIHtcclxuICAgICAgc3RvcFNwZWFraW5nKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGV4dC5pbmNsdWRlcyhcImxlZXIgbGEgcGFnaW5hXCIpIHx8IHRleHQgPT09IFwibGVlclwiKSB7XHJcbiAgICAgIHJlYWRQYWdlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGV4dC5pbmNsdWRlcyhcImluc2NyaWJcIikgfHwgdGV4dC5pbmNsdWRlcyhcInByZWNpb1wiKSB8fCB0ZXh0LmluY2x1ZGVzKFwicGxhblwiKSkge1xyXG4gICAgICBnb1RvU2VjdGlvbihcInBsYW5lc1wiLCBcIlRlIGxsZXZvIGEgbnVlc3Ryb3MgcGxhbmVzIGRlIGVudHJlbmFtaWVudG8uIFB1ZWRlcyByZXZpc2FyIGxhcyBvcGNpb25lcyB5IHByZWNpb3MuIMK/RGVzZWFzIGNvbnN1bHRhciBwb3IgV2hhdHNBcHA/XCIpO1xyXG4gICAgICBzZXRXaGF0c2FwcFBlbmRpbmcodHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGV4dC5pbmNsdWRlcyhcImVudHJlbmFkb3JcIikpIHtcclxuICAgICAgZ29Ub1NlY3Rpb24oXCJlbnRyZW5hZG9yZXNcIiwgXCJBcXXDrSBwdWVkZXMgY29ub2NlciBhIG51ZXN0cm9zIGVudHJlbmFkb3Jlcy5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGV4dC5pbmNsdWRlcyhcImhvcmFyaW9cIikpIHtcclxuICAgICAgZ29Ub1NlY3Rpb24oXCJob3Jhcmlvc1wiLCBcIkFxdcOtIHB1ZWRlcyBjb25zdWx0YXIgbnVlc3Ryb3MgaG9yYXJpb3MuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRleHQuaW5jbHVkZXMoXCJjb250YWN0b1wiKSB8fCB0ZXh0LmluY2x1ZGVzKFwiaGFibGFyIGNvbiBhbGd1aWVuXCIpIHx8IHRleHQuaW5jbHVkZXMoXCJ1YmljYWNpb25cIikpIHtcclxuICAgICAgZ29Ub1NlY3Rpb24oXCJjb250YWN0b1wiLCBcIlRlIGxsZXZvIGEgbGEgc2VjY2nDs24gZGUgY29udGFjdG8uXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRleHQuaW5jbHVkZXMoXCJpbmljaW9cIikpIHtcclxuICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgICAgc3BlYWsoXCJIYXMgdnVlbHRvIGFsIGluaWNpby5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzcGVhayhcIk5vIHJlY29ub2PDrSBlbCBjb21hbmRvLiBQdWVkZXMgZGVjaXIgaXIgYSBwbGFuZXMsIGhvcmFyaW9zLCBjb250YWN0byBvIGluaWNpby5cIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhcnRWb2ljZVJlY29nbml0aW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgUmVjb2duaXRpb24gPSB3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93LndlYmtpdFNwZWVjaFJlY29nbml0aW9uO1xyXG5cclxuICAgIGlmICghUmVjb2duaXRpb24pIHtcclxuICAgICAgc2V0Vm9pY2VTdGF0dXMoXCJNaWNyw7Nmb25vIG5vIGNvbXBhdGlibGVcIik7XHJcbiAgICAgIHNwZWFrKFwiUHJ1ZWJhIGNvbiBHb29nbGUgQ2hyb21lIG8gTWljcm9zb2Z0IEVkZ2UuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVjb2duaXRpb24gPSBuZXcgUmVjb2duaXRpb24oKTtcclxuICAgIHJlY29nbml0aW9uLmxhbmcgPSBcImVzLVBFXCI7XHJcbiAgICByZWNvZ25pdGlvbi5jb250aW51b3VzID0gZmFsc2U7XHJcbiAgICByZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IGZhbHNlO1xyXG5cclxuICAgIHJlY29nbml0aW9uLm9uc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgIHNldFZvaWNlU3RhdHVzKFwiRXNjdWNoYW5kby4uLlwiKTtcclxuICAgICAgc2V0Vm9pY2VNZXNzYWdlKFwiVGUgZXNjdWNoby4gRGkgdW4gY29tYW5kby5cIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlY29nbml0aW9uLm9ucmVzdWx0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHQ7XHJcbiAgICAgIHNldFZvaWNlTWVzc2FnZShgRXNjdWNow6k6ICR7Y29tbWFuZH1gKTtcclxuICAgICAgcHJvY2Vzc1ZvaWNlQ29tbWFuZChjb21tYW5kKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVjb2duaXRpb24ub25lcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICBzZXRWb2ljZVN0YXR1cyhcIk5vIHNlIHB1ZG8gZXNjdWNoYXJcIik7XHJcbiAgICAgIHNldFZvaWNlTWVzc2FnZShcclxuICAgICAgICBldmVudC5lcnJvciA9PT0gXCJub3QtYWxsb3dlZFwiXHJcbiAgICAgICAgICA/IFwiRGViZXMgcGVybWl0aXIgZWwgYWNjZXNvIGFsIG1pY3LDs2Zvbm8uXCJcclxuICAgICAgICAgIDogXCJJbnTDqW50YWxvIG51ZXZhbWVudGUuXCJcclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVjb2duaXRpb24ub25lbmQgPSAoKSA9PiBzZXRWb2ljZVN0YXR1cyhcIlZveiBsaXN0YVwiKTtcclxuICAgIHJlY29nbml0aW9uLnN0YXJ0KCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3BlbldoYXRzQXBwRnJvbVZvaWNlID0gKCkgPT4ge1xyXG4gICAgaWYgKCF3aGF0c2FwcFBlbmRpbmcpIHJldHVybjtcclxuXHJcbiAgICB3aW5kb3cub3BlbihcclxuICAgICAgd2EoXCJIb2xhLCBkZXNlbyBpbmZvcm1hY2nDs24gcGFyYSBpbnNjcmliaXJtZSBlbiA3IFN0cmVuZ3RoIENlbnRlci5cIiksXHJcbiAgICAgIFwiX2JsYW5rXCIsXHJcbiAgICAgIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiXHJcbiAgICApO1xyXG5cclxuICAgIHNldFdoYXRzYXBwUGVuZGluZyhmYWxzZSk7XHJcbiAgfTtcclxuICBcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgYXBwbHlBMTF5KHMpO1xyXG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY2Nlc2liaWxpZGFkXCIsIEpTT04uc3RyaW5naWZ5KHMpKTsgfSBjYXRjaCB7fVxyXG4gIH0sIFtzXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbikgcmV0dXJuO1xyXG4gICAgcGFuZWxSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKT8uZm9jdXMoKTtcclxuICAgIGNvbnN0IG9uS2V5ID0gKGUpID0+IHsgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7IHNldE9wZW4oZmFsc2UpOyBidG5SZWYuY3VycmVudD8uZm9jdXMoKTsgfSB9O1xyXG4gICAgY29uc3Qgb25DbGljayA9IChlKSA9PiB7XHJcbiAgICAgIGlmICghcGFuZWxSZWYuY3VycmVudD8uY29udGFpbnMoZS50YXJnZXQpICYmICFidG5SZWYuY3VycmVudD8uY29udGFpbnMoZS50YXJnZXQpKSBzZXRPcGVuKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25DbGljayk7XHJcbiAgICByZXR1cm4gKCkgPT4geyByZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvbkNsaWNrKTsgfTtcclxuICB9LCBbb3Blbl0pO1xyXG4gIGNvbnN0IHNldCA9IChrLCB2KSA9PiBzZXRTKChwKSA9PiAoeyAuLi5wLCBba106IHYgfSkpO1xyXG4gIGNvbnN0IHRvZ2dsZSA9IChrLCBsYWJlbCwgaGludCkgPT4gPEExMXlUb2dnbGUgb249e3Nba119IGxhYmVsPXtsYWJlbH0gaGludD17aGludH0gb25DaGFuZ2U9eygpID0+IHNldChrLCAhc1trXSl9IC8+O1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImExMXlcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHJlZj17YnRuUmVmfVxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImExMXktYnRuXCJcclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgIGFyaWEtY29udHJvbHM9XCJwYW5lbC1hY2Nlc2liaWxpZGFkXCJcclxuICAgICAgICBhcmlhLWxhYmVsPVwiT3BjaW9uZXMgZGUgYWNjZXNpYmlsaWRhZFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0T3Blbighb3Blbil9XHJcbiAgICAgID5cclxuICAgICAgICA8QWNjZXNzaWJpbGl0eUljb24gc2l6ZT17MjJ9IC8+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24uZGl2XHJcbiAgICAgICAgICAgIHJlZj17cGFuZWxSZWZ9XHJcbiAgICAgICAgICAgIGlkPVwicGFuZWwtYWNjZXNpYmlsaWRhZFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImExMXktcGFuZWwgZ2xhc3NcIlxyXG4gICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wY2lvbmVzIGRlIGFjY2VzaWJpbGlkYWRcIlxyXG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IC04LCBzY2FsZTogMC45NyB9fVxyXG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAsIHNjYWxlOiAxLCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjIsIGVhc2U6IEVBU0UgfSB9fVxyXG4gICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IC02LCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjEyIH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYTExeS10aXRsZVwiPkFjY2VzaWJpbGlkYWQ8L3A+XHJcbiAgICAgICAgICAgIDxBMTF5VG9nZ2xlXHJcbiAgICAgICAgICAgICAgb249e3MudGhlbWUgPT09IFwiZGFya1wifVxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTW9kbyBvc2N1cm9cIlxyXG4gICAgICAgICAgICAgIGhpbnQ9XCJBbHRlcm5hIGVudHJlIGVsIG1vZG8gb3NjdXJvIHkgZWwgbW9kbyBjbGFyb1wiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHNldChcInRoZW1lXCIsIHMudGhlbWUgPT09IFwiZGFya1wiID8gXCJsaWdodFwiIDogXCJkYXJrXCIpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImExMXktc2l6ZVwiIHJvbGU9XCJncm91cFwiIGFyaWEtbGFiZWw9XCJUYW1hw7FvIGRlbCB0ZXh0b1wiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPlRhbWHDsW8gZGVsIHRleHRvPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7W1wiQVwiLCBcIkErXCIsIFwiQSsrXCIsIFwiQSsrK1wiXS5tYXAoKGwsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2x9IHR5cGU9XCJidXR0b25cIiBhcmlhLXByZXNzZWQ9e3MudGV4dCA9PT0gaX0gYXJpYS1sYWJlbD17W1wiTm9ybWFsXCIsIFwiR3JhbmRlXCIsIFwiTXV5IGdyYW5kZVwiLCBcIk3DoXhpbW9cIl1baV19IG9uQ2xpY2s9eygpID0+IHNldChcInRleHRcIiwgaSl9PntsfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7dG9nZ2xlKFwiY29udHJhc3RcIiwgXCJBbHRvIGNvbnRyYXN0ZVwiLCBcIlRleHRvIG3DoXMgY2xhcm8geSBmb25kb3Mgc8OzbGlkb3NcIil9XHJcbiAgICAgICAgICAgIHt0b2dnbGUoXCJjb2xvcmJsaW5kXCIsIFwiQXl1ZGEgcGFyYSBkYWx0b25pc21vXCIsIFwiQ29sb3JlcyBhbHRlcm5hdGl2b3MgeSBtYXJjYXMgZW4gbGFzIG9wY2lvbmVzIGFjdGl2YXNcIil9XHJcbiAgICAgICAgICAgIHt0b2dnbGUoXCJsaW5rc1wiLCBcIlN1YnJheWFyIGVubGFjZXNcIiwgXCJEaXN0aW5ndWUgbG9zIGVubGFjZXMgZGVsIHRleHRvXCIpfVxyXG4gICAgICAgICAgICB7dG9nZ2xlKFwiZm9udFwiLCBcIkxldHJhIGbDoWNpbCBkZSBsZWVyXCIsIFwiQ2FtYmlhIGxvcyB0w610dWxvcyBhIHVuYSBsZXRyYSBzaW1wbGVcIil9XHJcbiAgICAgICAgICAgIHt0b2dnbGUoXCJtb3Rpb25cIiwgXCJEZXRlbmVyIGFuaW1hY2lvbmVzXCIsIFwiUXVpdGEgbW92aW1pZW50b3MgeSBsYSBpbnRyb1wiKX1cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhMTF5LXZvaWNlXCI+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYTExeS12b2ljZS10aXRsZVwiPkFzaXN0ZW50ZSBkZSB2b3o8L3A+XHJcbiAgICAgICAgICAgICAgPHNtYWxsPkludGVyYWN0w7phIGNvbiBudWVzdHJhIHDDoWdpbmEgdXRpbGl6YW5kbyB0dSB2b3ouPC9zbWFsbD5cclxuXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17c3RhcnRWb2ljZVJlY29nbml0aW9ufT5cclxuICAgICAgICAgICAgICAgIPCfjqQgSGFibGFyIGNvbiBsYSBww6FnaW5hXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3JlYWRQYWdlfT5cclxuICAgICAgICAgICAgICAgIPCflIogTGVlciBww6FnaW5hIGVuIHZveiBhbHRhXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3N0b3BTcGVha2luZ30+XHJcbiAgICAgICAgICAgICAgICDij7kgRGV0ZW5lciBsZWN0dXJhXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgIDxwIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj57dm9pY2VTdGF0dXN9PC9wPlxyXG4gICAgICAgICAgICAgIDxzbWFsbCBhcmlhLWxpdmU9XCJwb2xpdGVcIj57dm9pY2VNZXNzYWdlfTwvc21hbGw+XHJcblxyXG4gICAgICAgICAgICAgIHt3aGF0c2FwcFBlbmRpbmcgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b3BlbldoYXRzQXBwRnJvbVZvaWNlfT5cclxuICAgICAgICAgICAgICAgICAgU8OtLCBhYnJpciBXaGF0c0FwcFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImExMXktcmVzZXRcIiBvbkNsaWNrPXsoKSA9PiBzZXRTKHsgLi4uQTExWV9ERUZBVUxUIH0pfT5SZXN0YWJsZWNlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBJTlRSTzogY29udGFkb3IgMDAw4oaSMTAwIHF1ZSBzZSBsbGVuYSwgcGFsYWJyYSBxdWUgc2UgcGFydGUgZW4gZG9zIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gRGlnaXQoeyB2YWx1ZSB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9kb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJvZG8tc3RyaXBcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7LXZhbHVlICogMTB9JSlgIH19PlxyXG4gICAgICAgIHtcIjAxMjM0NTY3ODlcIi5zcGxpdChcIlwiKS5tYXAoKGQpID0+IDxzcGFuIGtleT17ZH0+e2R9PC9zcGFuPil9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIEludHJvKCkge1xyXG4gIGNvbnN0IFtwaGFzZSwgc2V0UGhhc2VdID0gdXNlU3RhdGUoKCkgPT4ge1xyXG4gICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgcmV0dXJuIFwiZG9uZVwiO1xyXG4gICAgdHJ5IHsgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJpbnRyby12aXN0YVwiKSA/IFwiZG9uZVwiIDogXCJjb3VudFwiOyB9IGNhdGNoIHsgcmV0dXJuIFwiY291bnRcIjsgfVxyXG4gIH0pO1xyXG4gIGNvbnN0IFtuLCBzZXROXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IHNraXBSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocGhhc2UgPT09IFwiZG9uZVwiIHx8IHBoYXNlID09PSBcInNwbGl0XCIpIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LnJlYWR5ID0gXCIxXCI7XHJcbiAgICBpZiAocGhhc2UgPT09IFwiZG9uZVwiKSB7IHRyeSB7IHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJpbnRyby12aXN0YVwiLCBcIjFcIik7IH0gY2F0Y2gge30gfVxyXG4gIH0sIFtwaGFzZV0pO1xyXG5cclxuICAvLyBDb250YWRvcjogYXZhbnphIGNvbiBlbCB0aWVtcG8sIHBlcm8gZXNwZXJhIGEgcXVlIGNhcmd1ZW4gbGEgZm90byBwcmluY2lwYWwgeSBsYSB0aXBvZ3JhZsOtYS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBoYXNlICE9PSBcImNvdW50XCIpIHJldHVybjtcclxuICAgIGxldCBsb2FkZWQgPSAwLjE1LCByYWY7XHJcbiAgICBjb25zdCBwYXJ0cyA9IFtcclxuICAgICAgbmV3IFByb21pc2UoKHIpID0+IHsgY29uc3QgaSA9IG5ldyBJbWFnZSgpOyBpLm9ubG9hZCA9IGkub25lcnJvciA9IHI7IGkuc3JjID0gSU1HLmhlcm87IH0pLFxyXG4gICAgICBuZXcgUHJvbWlzZSgocikgPT4geyBjb25zdCBpID0gbmV3IEltYWdlKCk7IGkub25sb2FkID0gaS5vbmVycm9yID0gcjsgaS5zcmMgPSBJTUcuaGVyb0JnOyB9KSxcclxuICAgICAgZG9jdW1lbnQuZm9udHMgPyBkb2N1bWVudC5mb250cy5yZWFkeSA6IFByb21pc2UucmVzb2x2ZSgpLFxyXG4gICAgXTtcclxuICAgIHBhcnRzLmZvckVhY2goKHApID0+IHAudGhlbigoKSA9PiB7IGxvYWRlZCArPSAwLjg1IC8gcGFydHMubGVuZ3RoOyB9KSk7XHJcbiAgICBjb25zdCBnaXZlVXAgPSBzZXRUaW1lb3V0KCgpID0+IHsgbG9hZGVkID0gMTsgfSwgNTAwMCk7XHJcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpLCBEVVIgPSAxOTAwO1xyXG4gICAgY29uc3QgdGljayA9ICh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLm1pbigodCAtIHN0YXJ0KSAvIERVUiwgMSk7XHJcbiAgICAgIGNvbnN0IGVhc2VkID0gdGltZSA8IDAuNSA/IDQgKiB0aW1lICoqIDMgOiAxIC0gKC0yICogdGltZSArIDIpICoqIDMgLyAyO1xyXG4gICAgICBjb25zdCB2ID0gTWF0aC5yb3VuZChNYXRoLm1pbihlYXNlZCwgbG9hZGVkKSAqIDEwMCk7XHJcbiAgICAgIHNldE4odik7XHJcbiAgICAgIGlmICh2ID49IDEwMCkgc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcIndvcmRcIiksIDIwMCk7XHJcbiAgICAgIGVsc2UgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG4gICAgfTtcclxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7IGNsZWFyVGltZW91dChnaXZlVXApOyB9O1xyXG4gIH0sIFtwaGFzZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBoYXNlID09PSBcIndvcmRcIikgeyBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcInNwbGl0XCIpLCA5MDApOyByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpOyB9XHJcbiAgICBpZiAocGhhc2UgPT09IFwic3BsaXRcIikgeyBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcImRvbmVcIiksIDExMDApOyByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpOyB9XHJcbiAgfSwgW3BoYXNlXSk7XHJcblxyXG4gIGlmIChwaGFzZSA9PT0gXCJkb25lXCIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGRpZ2l0cyA9IFN0cmluZyhuKS5wYWRTdGFydCgzLCBcIjBcIikuc3BsaXQoXCJcIikubWFwKE51bWJlcik7XHJcbiAgY29uc3QgbGVmdCA9IFwiU0lOXCIsIHJpZ2h0ID0gXCJMw41NSVRFU1wiO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGludHJvIGludHJvLSR7cGhhc2V9YH0gcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9XCJDYXJnYW5kbyA3IFN0cmVuZ3RoIENlbnRlclwiPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1saW5lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyby1oYWxmIGludHJvLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICB7cGhhc2UgIT09IFwiY291bnRcIiAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby13b3JkXCI+XHJcbiAgICAgICAgICAgIHtbLi4ubGVmdF0ubWFwKChjaCwgaSkgPT4gPHNwYW4ga2V5PXtpfSBzdHlsZT17eyBhbmltYXRpb25EZWxheTogYCR7aSAqIDAuMDV9c2AgfX0+e2NofTwvc3Bhbj4pfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLWhhbGYgaW50cm8tcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICB7cGhhc2UgIT09IFwiY291bnRcIiAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby13b3JkXCI+XHJcbiAgICAgICAgICAgIHtbLi4ucmlnaHRdLm1hcCgoY2gsIGkpID0+IDxzcGFuIGtleT17aX0gc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IGAkezAuMTUgKyBpICogMC4wNX1zYCB9fT57Y2h9PC9zcGFuPil9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtwaGFzZSA9PT0gXCJjb3VudFwiICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLWNvdW50ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImludHJvLWxhYmVsXCI+Q2FyZ2FuZG88L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLW51bVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1vdXRsaW5lXCI+e2RpZ2l0cy5tYXAoKGQsIGkpID0+IDxEaWdpdCBrZXk9e2l9IHZhbHVlPXtkfSAvPil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1maWxsXCIgc3R5bGU9e3sgY2xpcFBhdGg6IGBpbnNldCgkezEwMCAtIG59JSAwIDAgMClgIH19PntkaWdpdHMubWFwKChkLCBpKSA9PiA8RGlnaXQga2V5PXtpfSB2YWx1ZT17ZH0gLz4pfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8tbGFiZWwgcmlnaHRcIj43IFN0cmVuZ3RoPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICA8YnV0dG9uIHJlZj17c2tpcFJlZn0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImludHJvLXNraXBcIiBvbkNsaWNrPXsoKSA9PiBzZXRQaGFzZShcImRvbmVcIil9PlNhbHRhciBpbnRybzwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgTkFWID0gW1xyXG4gIFtcIk5vc290cm9zXCIsIFwiI25vc290cm9zXCJdLFxyXG4gIFtcIkVudHJlbmFkb3Jlc1wiLCBcIiNlbnRyZW5hZG9yZXNcIl0sXHJcbiAgW1wiUmVlbHNcIiwgXCIjcmVlbHNcIl0sXHJcbiAgW1wiWm9uYXNcIiwgXCIjem9uYXNcIl0sXHJcbiAgW1wiUGxhbmVzXCIsIFwiI3BsYW5lc1wiXSxcclxuICBbXCJIb3Jhcmlvc1wiLCBcIiNob3Jhcmlvc1wiXSxcclxuICBbXCJDb250YWN0b1wiLCBcIiNjb250YWN0b1wiXSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKCkge1xyXG4gIGNvbnN0IHsgc2Nyb2xsWVByb2dyZXNzIH0gPSB1c2VTY3JvbGwoKTtcclxuICBjb25zdCBzY2FsZVggPSB1c2VTcHJpbmcoc2Nyb2xsWVByb2dyZXNzLCB7IHN0aWZmbmVzczogMTIwLCBkYW1waW5nOiAzMCwgcmVzdERlbHRhOiAwLjAwMSB9KTtcclxuICByZXR1cm4gPG1vdGlvbi5kaXYgY2xhc3NOYW1lPVwic2Nyb2xsLXByb2dyZXNzXCIgc3R5bGU9e3sgc2NhbGVYIH19IC8+O1xyXG59XHJcblxyXG5mdW5jdGlvbiBMb2dvKHsgc2l6ZSA9IDQ4IH0pIHtcclxuICByZXR1cm4gPGltZyBjbGFzc05hbWU9XCJsb2dvXCIgc3JjPXtzaXRlQ29uZmlnLmxvZ29QYXRofSBhbHQ9XCJcIiB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSAvPjtcclxufVxyXG5cclxuZnVuY3Rpb24gSGVhZGVyKCkge1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc29saWQsIHNldFNvbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBtZW51QnRuID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHNldFNvbGlkKHdpbmRvdy5zY3JvbGxZID4gNDApO1xyXG4gICAgb25TY3JvbGwoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBvbktleSA9IChlKSA9PiB7IGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgeyBzZXRPcGVuKGZhbHNlKTsgbWVudUJ0bi5jdXJyZW50Py5mb2N1cygpOyB9IH07XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7XHJcbiAgICByZXR1cm4gKCkgPT4gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gIH0sIFtvcGVuXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtgaGVhZGVyJHtzb2xpZCA/IFwiIHNvbGlkXCIgOiBcIlwifWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBoZWFkZXItaW5uZXJcIj5cclxuICAgICAgICA8YSBocmVmPVwiI2luaWNpb1wiIGNsYXNzTmFtZT1cImJyYW5kXCIgYXJpYS1sYWJlbD1cIjcgU3RyZW5ndGggQ2VudGVyLCBpciBhbCBpbmljaW9cIj5cclxuICAgICAgICAgIDxMb2dvIC8+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj43IDxiPlN0cmVuZ3RoPC9iPjwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXYtZGVza3RvcFwiIGFyaWEtbGFiZWw9XCJQcmluY2lwYWxcIj5cclxuICAgICAgICAgIHtOQVYubWFwKChbbGFiZWwsIGhyZWZdKSA9PiA8YSBrZXk9e2hyZWZ9IGhyZWY9e2hyZWZ9PntsYWJlbH08L2E+KX1cclxuICAgICAgICA8L25hdj5cclxuICAgICAgICA8QTExeVBhbmVsIC8+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBoaWRlLW1vYmlsZVwiIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5JbnNjcsOtYmV0ZTwvYT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICByZWY9e21lbnVCdG59XHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1lbnUtYnRuXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBcIkNlcnJhciBtZW7DulwiIDogXCJBYnJpciBtZW7DulwifVxyXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJtZW51LW1vdmlsXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oIW9wZW4pfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtvcGVuID8gPFhJY29uIHNpemU9ezI2fSAvPiA6IDxNZW51SWNvbiBzaXplPXsyNn0gLz59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24ubmF2XHJcbiAgICAgICAgICAgIGlkPVwibWVudS1tb3ZpbFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdi1tb2JpbGVcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTWVuw7pcIlxyXG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IC0xMiwgc2NhbGU6IDAuOTcgfX1cclxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwLCBzY2FsZTogMSwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yMiwgZWFzZTogRUFTRSB9IH19XHJcbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeTogLTgsIHRyYW5zaXRpb246IHsgZHVyYXRpb246IDAuMTUgfSB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7TkFWLm1hcCgoW2xhYmVsLCBocmVmXSkgPT4gPGEga2V5PXtocmVmfSBocmVmPXtocmVmfSBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKGZhbHNlKX0+e2xhYmVsfTwvYT4pfVxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPXt3YSgpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+SW5zY3LDrWJldGUgcG9yIFdoYXRzQXBwPC9hPlxyXG4gICAgICAgICAgPC9tb3Rpb24ubmF2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBIRVJPIDNEOiBwZXJzb25hamUgYWwgY2VudHJvLCBTVFJFTkdUSCBkZXRyw6FzIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gSGVybygpIHtcclxuICBjb25zdCBzY2VuZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc2NlbmUgPSBzY2VuZVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFzY2VuZSkgcmV0dXJuO1xyXG4gICAgY29uc3QgbGF5ZXJzID0gWy4uLnNjZW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kZXB0aF1cIildLm1hcCgoZWwpID0+ICh7IGVsLCBkOiBwYXJzZUZsb2F0KGVsLmRhdGFzZXQuZGVwdGgpIH0pKTtcclxuICAgIGxldCB0eCA9IDAsIHR5ID0gMCwgY3ggPSAwLCBjeSA9IDAsIHN5ID0gMCwgcmFmO1xyXG4gICAgY29uc3QgbW92ZSA9IChlKSA9PiB7XHJcbiAgICAgIHR4ID0gKGUuY2xpZW50WCAvIGlubmVyV2lkdGggLSAwLjUpICogMjtcclxuICAgICAgdHkgPSAoZS5jbGllbnRZIC8gaW5uZXJIZWlnaHQgLSAwLjUpICogMjtcclxuICAgIH07XHJcbiAgICBjb25zdCBzY3JvbGwgPSAoKSA9PiB7IHN5ID0gTWF0aC5taW4oc2Nyb2xsWSwgaW5uZXJIZWlnaHQpOyB9O1xyXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgeyB0eCA9IDA7IHR5ID0gMDsgc3kgPSAwOyB9XHJcbiAgICAgIGN4ID0gbGVycChjeCwgdHgsIDAuMDcpOyBjeSA9IGxlcnAoY3ksIHR5LCAwLjA3KTtcclxuICAgICAgY29uc3QgcCA9IHN5IC8gaW5uZXJIZWlnaHQ7XHJcbiAgICAgIGZvciAoY29uc3QgeyBlbCwgZCB9IG9mIGxheWVycykge1xyXG4gICAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkeygtY3ggKiBkKS50b0ZpeGVkKDEpfXB4LCAkeygtY3kgKiBkICogMC42ICsgc3kgKiBkICogMC4wMSkudG9GaXhlZCgxKX1weCwgJHsoZCAqIHAgKiAzKS50b0ZpeGVkKDApfXB4KWA7XHJcbiAgICAgIH1cclxuICAgICAgc2NlbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHsoY3kgKiAtMyArIHAgKiA2KS50b0ZpeGVkKDIpfWRlZykgcm90YXRlWSgkeyhjeCAqIDUpLnRvRml4ZWQoMil9ZGVnKWA7XHJcbiAgICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIH07XHJcbiAgICBpZiAoZmluZVBvaW50ZXIoKSkgYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG1vdmUpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTtcclxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzY3JvbGwpO1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cImluaWNpb1wiIGNsYXNzTmFtZT1cImhlcm9cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXN0YWdlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXNjZW5lXCIgcmVmPXtzY2VuZVJlZn0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyIGhlcm8tYmdcIiBkYXRhLWRlcHRoPVwiOFwiPjxpbWcgc3JjPXtJTUcuaGVyb0JnfSBhbHQ9XCJcIiAvPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBzbW9rZSBzbW9rZS0xXCIgZGF0YS1kZXB0aD1cIjE0XCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgc21va2Ugc21va2UtMlwiIGRhdGEtZGVwdGg9XCIyMFwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyIGhlcm8td29yZC13cmFwXCIgZGF0YS1kZXB0aD1cIjE4XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlcm8td29yZFwiPntbLi4uXCJTdHJlbmd0aFwiXS5tYXAoKGNoLCBpKSA9PiA8c3BhbiBrZXk9e2l9IHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiBgJHswLjE1ICsgaSAqIDAuMDZ9c2AgfX0+e2NofTwvc3Bhbj4pfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLWdsb3dcIiBkYXRhLWRlcHRoPVwiMjZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLXBlcnNvblwiIGRhdGEtZGVwdGg9XCIzOFwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz17SU1HLmhlcm99IGFsdD1cIkF0bGV0YSBkZSBlc3BhbGRhcyBtb3N0cmFuZG8gbGEgbXVzY3VsYXR1cmEgdHJhYmFqYWRhXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBzbW9rZSBzbW9rZS0zXCIgZGF0YS1kZXB0aD1cIjUwXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhcmtzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiAxOCB9KS5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICA8aSBrZXk9e2l9IHN0eWxlPXt7IGxlZnQ6IGAkeyhpICogNTMpICUgMTAwfSVgLCBhbmltYXRpb25EZWxheTogYCR7KGkgKiAwLjcpICUgNn1zYCwgYW5pbWF0aW9uRHVyYXRpb246IGAkezUgKyAoaSAlIDUpfXNgIH19IC8+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm8tc2hhZGVcIiAvPlxyXG5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cInNvY2lhbC1yYWlsXCIgYXJpYS1sYWJlbD1cIlJlZGVzXCI+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJJbnN0YWdyYW1cIj48SW5zdGFncmFtSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj17d2EoKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJXaGF0c0FwcFwiPjxNZXNzYWdlQ2lyY2xlSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj17c2l0ZUNvbmZpZy5nb29nbGVNYXBzVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgYXJpYS1sYWJlbD1cIlViaWNhY2nDs25cIj48TWFwUGluSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgPC91bD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGhlcm8tY29udGVudFwiPlxyXG4gICAgICAgIDxoMT5cclxuICAgICAgICAgIDxTcGxpdFRleHQgdGV4dD1cIkxhIGZ1ZXJ6YVwiIGNsYXNzTmFtZT1cImFjY2VudFwiIGRlbGF5PXswLjV9IC8+e1wiIFwifVxyXG4gICAgICAgICAgPFNwbGl0VGV4dCB0ZXh0PVwibm8gc2UgcmVnYWxhXCIgZGVsYXk9ezAuNzV9IC8+XHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJoZXJvLXN1YlwiPlxyXG4gICAgICAgICAgU2UgY29uc3RydXllIHJlcGV0aWNpw7NuIHRyYXMgcmVwZXRpY2nDs24sIGVuIGVsIGNlbnRybyBkZSBhbHRvIHJlbmRpbWllbnRvIGRlIHtzaXRlQ29uZmlnLmNpdHkuc3BsaXQoXCIsXCIpWzBdfS5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIERvcyBjaW50YXMgY3J1emFkYXMgcXVlIHNlIG11ZXZlbiBlbiBzZW50aWRvcyBvcHVlc3Rvcy5cclxuZnVuY3Rpb24gUmliYm9ucygpIHtcclxuICBjb25zdCB3b3JkcyA9IFtcIkZ1ZXJ6YVwiLCBcIkRpc2NpcGxpbmFcIiwgXCJUw6ljbmljYVwiLCBcIlBvd2VyIFRlYW1cIiwgXCJDb25zdGFuY2lhXCIsIFwiU2luIGzDrW1pdGVzXCJdO1xyXG4gIGNvbnN0IHJvdyA9IFsuLi53b3JkcywgLi4ud29yZHMsIC4uLndvcmRzLCAuLi53b3Jkc107XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpYmJvbiByaWJib24tZGFya1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uLXRyYWNrIHJldmVyc2VcIj57cm93Lm1hcCgodywgaSkgPT4gPHNwYW4ga2V5PXtpfT57d308aT4vPC9pPjwvc3Bhbj4pfTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWJib24gcmliYm9uLXJlZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uLXRyYWNrXCI+e3Jvdy5tYXAoKHcsIGkpID0+IDxzcGFuIGtleT17aX0+e3d9PER1bWJiZWxsSWNvbiBzaXplPXsyMn0gLz48L3NwYW4+KX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBWaWRlbyBkZSBwcmVzZW50YWNpw7NuIChyZWVsIGRlIEluc3RhZ3JhbSBkZXNjYXJnYWRvKS4gU2UgcmVwcm9kdWNlIHNvbG8gYWwgdmVyc2UuXHJcbmNvbnN0IFBhdXNlSWNvbiA9ICh7IHNpemUgPSAxOCB9KSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxyZWN0IHg9XCI2XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIC8+PHJlY3QgeD1cIjE0XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIC8+PC9zdmc+XHJcbik7XHJcbmNvbnN0IFBsYXlHbHlwaCA9ICh7IHNpemUgPSAxOCB9KSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxwYXRoIGQ9XCJNOCA1LjV2MTNhMSAxIDAgMCAwIDEuNS44NmwxMC41LTYuNWExIDEgMCAwIDAgMC0xLjcyTDkuNSA0LjY0QTEgMSAwIDAgMCA4IDUuNXpcIiAvPjwvc3ZnPlxyXG4pO1xyXG5jb25zdCBBQk9VVF9SRUVMID0gXCJER0x4aHJETUZTblwiO1xyXG5mdW5jdGlvbiBBYm91dFZpZGVvKCkge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgW211dGVkLCBzZXRNdXRlZF0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbcGF1c2VkLCBzZXRQYXVzZWRdID0gdXNlU3RhdGUoKCkgPT4gbW90aW9uUmVkdWNlZCgpKTtcclxuICBjb25zdCBwYXVzZWRSZWYgPSB1c2VSZWYocGF1c2VkKTtcclxuICBjb25zdCBtdXRlZFJlZiA9IHVzZVJlZih0cnVlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcGF1c2VkUmVmLmN1cnJlbnQgPSBwYXVzZWQ7XHJcbiAgICBjb25zdCB2ID0gcmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXYpIHJldHVybjtcclxuICAgIGlmIChwYXVzZWQpIHYucGF1c2UoKTsgZWxzZSB2LnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgfSwgW3BhdXNlZF0pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBtdXRlZFJlZi5jdXJyZW50ID0gbXV0ZWQ7XHJcbiAgICBpZiAocmVmLmN1cnJlbnQpIHJlZi5jdXJyZW50Lm11dGVkID0gbXV0ZWQ7XHJcbiAgfSwgW211dGVkXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHYgPSByZWYuY3VycmVudDtcclxuICAgIGlmICghdikgcmV0dXJuO1xyXG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlXSkgPT4ge1xyXG4gICAgICBpZiAoZS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIGlmIChwYXVzZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2Lm11dGVkICE9PSBtdXRlZFJlZi5jdXJyZW50KSB2Lm11dGVkID0gbXV0ZWRSZWYuY3VycmVudDtcclxuICAgICAgICB2LnBsYXkoKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICB2Lm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdi5wbGF5KCkuY2F0Y2goKCkgPT4ge30pLCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Ugdi5wYXVzZSgpO1xyXG4gICAgfSwgeyB0aHJlc2hvbGQ6IDAuMjUgfSk7XHJcbiAgICBpby5vYnNlcnZlKGJveFJlZi5jdXJyZW50IHx8IHYpO1xyXG4gICAgcmV0dXJuICgpID0+IGlvLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgcmVmPXtib3hSZWZ9PlxyXG4gICAgPFRpbHQgY2xhc3NOYW1lPVwiYWJvdXQtdmlkZW8gZ2xhc3MgbGlxdWlkXCIgbWF4PXs2fT5cclxuICAgICAgPHZpZGVvXHJcbiAgICAgICAgcmVmPXtyZWZ9XHJcbiAgICAgICAgc3JjPXtgL2Fzc2V0cy9yZWVscy8ke0FCT1VUX1JFRUx9Lm1wNGB9XHJcbiAgICAgICAgcG9zdGVyPXtgL2Fzc2V0cy9yZWVscy8ke0FCT1VUX1JFRUx9LmpwZ2B9XHJcbiAgICAgICAgbXV0ZWQ9e211dGVkfVxyXG4gICAgICAgIGxvb3BcclxuICAgICAgICBwbGF5c0lubGluZVxyXG4gICAgICAgIHByZWxvYWQ9XCJtZXRhZGF0YVwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIlZpZGVvIGRlIHByZXNlbnRhY2nDs24gZGUgNyBTdHJlbmd0aCBDZW50ZXJcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYm91dC1jb250cm9sc1wiPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInJvdW5kLWJ0biBzbWFsbCBnbGFzc1wiIG9uQ2xpY2s9eygpID0+IHNldFBhdXNlZCghcGF1c2VkKX0gYXJpYS1sYWJlbD17cGF1c2VkID8gXCJSZXByb2R1Y2lyIHZpZGVvXCIgOiBcIlBhdXNhciB2aWRlb1wifT5cclxuICAgICAgICAgIHtwYXVzZWQgPyA8UGxheUdseXBoIC8+IDogPFBhdXNlSWNvbiAvPn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGwgZ2xhc3NcIiBvbkNsaWNrPXsoKSA9PiBzZXRNdXRlZCghbXV0ZWQpfSBhcmlhLWxhYmVsPXttdXRlZCA/IFwiQWN0aXZhciBzb25pZG9cIiA6IFwiU2lsZW5jaWFyXCJ9PlxyXG4gICAgICAgICAge211dGVkID8gPFZvbHVtZVhJY29uIHNpemU9ezE4fSAvPiA6IDxWb2x1bWUySWNvbiBzaXplPXsxOH0gLz59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvVGlsdD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFib3V0KCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cIm5vc290cm9zXCIgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBhYm91dC1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJzb21vc1wiPlF1acOpbmVzPC9UaXRsZT5cclxuICAgICAgICAgIDxSZXZlYWw+XHJcbiAgICAgICAgICAgIDxBYm91dFZpZGVvIC8+XHJcbiAgICAgICAgICA8L1JldmVhbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT1cImFib3V0LXRleHRcIiBkZWxheT17MC4xNX0+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWFkXCI+e3NpdGVDb25maWcuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgIFJhY2tzIGRlIHBvdGVuY2lhLCBiYXJyYXMgb2zDrW1waWNhcywgZGlzY29zIGNhbGlicmFkb3MsIG3DoXF1aW5hcyBkZSBiaW9tZWPDoW5pY2EgeSB1bmEgem9uYSBkZSBjw6lzcGVkIHBhcmFcclxuICAgICAgICAgICAgZW1wdWplIGRlIHRyaW5lby4gRW50cmVuYW1pZW50byBwcmVzZW5jaWFsIHkgdmlydHVhbCwgY29uIGVsIHJlc3BhbGRvIGRlbCBQb3dlciBUZWFtLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRsIGNsYXNzTmFtZT1cImZhY3RzXCI+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXsyfSAvPjwvZHQ+PGRkPm5pdmVsZXMgZGUgZW50cmVuYW1pZW50bzwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXsxMDAwfSBzdWZmaXg9XCIrXCIgLz48L2R0PjxkZD5zZWd1aWRvcmVzIGVuIEluc3RhZ3JhbTwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXs2fSAvPjwvZHQ+PGRkPmTDrWFzIGEgbGEgc2VtYW5hPC9kZD48L2Rpdj5cclxuICAgICAgICAgIDwvZGw+XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPVwiI2VudHJlbmFkb3Jlc1wiPkNvbm9jZSBhbCBlcXVpcG8gPEFycm93UmlnaHRJY29uIHNpemU9ezE4fSAvPjwvYT5cclxuICAgICAgICA8L1JldmVhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgRkVBVFVSRVMgPSBbXHJcbiAgW0R1bWJiZWxsSWNvbiwgXCJFcXVpcGFtaWVudG8gcHJvXCIsIFwiUmFja3MgZGUgdXNvIHJ1ZG8sIGJhcnJhcyBvbMOtbXBpY2FzIHkgZGlzY29zIGRlIGNvbXBldGljacOzbi5cIl0sXHJcbiAgW1RhcmdldEljb24sIFwiVMOpY25pY2EgcHJpbWVyb1wiLCBcIlByb2dyZXNhcyBjb24gbGEgZm9ybWEgY29ycmVjdGEgeSBzaW4gbGVzaW9uZXMuXCJdLFxyXG4gIFtVc2Vyc0ljb24sIFwiUG93ZXIgVGVhbVwiLCBcIlVuYSBjb211bmlkYWQgZG9uZGUgY2FkYSByZXBldGljacOzbiBjdWVudGEuXCJdLFxyXG4gIFtDbG9ja0ljb24sIFwiSG9yYXJpbyBmbGV4aWJsZVwiLCBcIlR1cm5vIG1hw7FhbmEgeSB0YXJkZSwgZGUgbHVuZXMgYSBzw6FiYWRvLlwiXSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIFdoeVVzKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3aHlcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aHktYmdcIj48aW1nIHNyYz17SU1HLnJhY2tzfSBhbHQ9XCJcIiBsb2FkaW5nPVwibGF6eVwiIC8+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21va2Ugc21va2UtMlwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHdoeS1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJub3NvdHJvc1wiPlBvciBxdcOpPC9UaXRsZT5cclxuICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiZmVhdHVyZXNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgIHtGRUFUVVJFUy5tYXAoKFtJY29uLCB0aXRsZSwgdGV4dF0pID0+IChcclxuICAgICAgICAgICAgICA8bW90aW9uLmxpIGtleT17dGl0bGV9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgICAgPFRpbHQgY2xhc3NOYW1lPVwiZmVhdHVyZVwiIG1heD17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+PEljb24gc2l6ZT17MjJ9IC8+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cD57dGV4dH08L3A+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9UaWx0PlxyXG4gICAgICAgICAgICAgIDwvbW90aW9uLmxpPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvbW90aW9uLnVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2h5LWJpZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWNjZW50XCI+RW50cmVuYTwvc3Bhbj4gPHNwYW4+QWhvcmE8L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cIm91dGxpbmVcIj5NaXNtbzwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBFTlRSRU5BRE9SRVMgLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBUcmFpbmVyQ2FyZCh7IHQgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8bW90aW9uLmxpIHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICA8VGlsdCBhcz1cImFcIiBocmVmPXtgIy9lbnRyZW5hZG9yLyR7dC5zbHVnfWB9IGNsYXNzTmFtZT1cInRyYWluZXJcIiBtYXg9ezEwfSBhcmlhLWxhYmVsPXtgVmVyIHBlcmZpbCBkZSAke3QubmFtZX1gfT5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLWJnbmFtZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt0Lm5hbWUuc3BsaXQoXCIgXCIpWzBdfTwvc3Bhbj5cclxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInRyYWluZXItcGhvdG9cIiBzcmM9e3QucGhvdG99IGFsdD1cIlwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLWxhYmVsXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLW5hbWVcIj57dC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyYWluZXItcm9sZVwiPnt0LnJvbGV9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhaW5lci1jdGFcIj5WZXIgcGVyZmlsIDxBcnJvd1JpZ2h0SWNvbiBzaXplPXsxNn0gLz48L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L1RpbHQ+XHJcbiAgICA8L21vdGlvbi5saT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUcmFpbmVycygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJlbnRyZW5hZG9yZXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHRyYWluZXJzLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImVudHJlbmFkb3Jlc1wiIGxlYWQ9XCJDYWRhIGVudHJlbmFkb3IgdGllbmUgc3UgcHJvcGlkbyBwZXJmaWw6IGVudHJhIHkgZGVzY3VicmUgZW4gcXXDqSB0ZSBwdWVkZSBheXVkYXIuXCI+Q29ub2NlIGEgbG9zPC9UaXRsZT5cclxuICAgICAgICA8bW90aW9uLnVsIGNsYXNzTmFtZT1cInRyYWluZXJzXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAge3NpdGVDb25maWcudHJhaW5lcnMubWFwKCh0KSA9PiA8VHJhaW5lckNhcmQga2V5PXt0LnNsdWd9IHQ9e3R9IC8+KX1cclxuICAgICAgICA8L21vdGlvbi51bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVHJhaW5lclByb2ZpbGUoeyB0IH0pIHtcclxuICBjb25zdCBvdGhlcnMgPSBzaXRlQ29uZmlnLnRyYWluZXJzLmZpbHRlcigobykgPT4gby5zbHVnICE9PSB0LnNsdWcpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbiBpZD1cImNvbnRlbmlkb1wiIHRhYkluZGV4PXstMX0gY2xhc3NOYW1lPVwicHJvZmlsZVwiPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJwcm9maWxlLWhlcm9cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtZ2xvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgcHJvZmlsZS1ncmlkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtdGV4dFwiPlxyXG4gICAgICAgICAgICA8bW90aW9uLmEgY2xhc3NOYW1lPVwiYmFjay1saW5rXCIgaHJlZj1cIiNlbnRyZW5hZG9yZXNcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0xMiB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX0gdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC40LCBlYXNlOiBFQVNFIH19PlxyXG4gICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gc2l6ZT17MTh9IC8+IFRvZG9zIGxvcyBlbnRyZW5hZG9yZXNcclxuICAgICAgICAgICAgPC9tb3Rpb24uYT5cclxuICAgICAgICAgICAgPGgxIHRhYkluZGV4PXstMX0+PFNwbGl0VGV4dCB0ZXh0PXt0Lm5hbWV9IGRlbGF5PXswLjF9IC8+PC9oMT5cclxuICAgICAgICAgICAgPG1vdGlvbi5wIGNsYXNzTmFtZT1cInByb2ZpbGUtcm9sZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gdHJhbnNpdGlvbj17eyBkZWxheTogMC41IH19Pnt0LnJvbGV9PC9tb3Rpb24ucD5cclxuICAgICAgICAgICAgPG1vdGlvbi5ibG9ja3F1b3RlIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNiwgZHVyYXRpb246IDAuNiwgZWFzZTogRUFTRSB9fT5cclxuICAgICAgICAgICAgICDigJx7dC5xdW90ZX3igJ1cclxuICAgICAgICAgICAgPC9tb3Rpb24uYmxvY2txdW90ZT5cclxuICAgICAgICAgICAgPG1vdGlvbi5kbCBjbGFzc05hbWU9XCJmYWN0c1wiIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNzUsIGR1cmF0aW9uOiAwLjYsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdj48ZHQ+PENvdW50VXAgdG89e3QueWVhcnN9IC8+PC9kdD48ZGQ+YcOxb3MgZW50cmVuYW5kbzwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdj48ZHQ+PENvdW50VXAgdG89e3QuYXRobGV0ZXN9IHN1ZmZpeD1cIitcIiAvPjwvZHQ+PGRkPnBlcnNvbmFzIGFjb21wYcOxYWRhczwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvbW90aW9uLmRsPlxyXG4gICAgICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJoZXJvLWN0YXNcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDE2IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjksIGR1cmF0aW9uOiAwLjYsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgPE1hZ25ldGljIGNsYXNzTmFtZT1cImJ0blwiIGhyZWY9e3dhKGBIb2xhLCBxdWllcm8gcmVzZXJ2YXIgdW5hIHNlc2nDs24gY29uICR7dC5uYW1lfSBlbiA3IFN0cmVuZ3RoIENlbnRlci5gKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICAgICAgUmVzZXJ2YXIgY29uIHt0Lm5hbWUuc3BsaXQoXCIgXCIpWzBdfSA8QXJyb3dSaWdodEljb24gc2l6ZT17MTh9IC8+XHJcbiAgICAgICAgICAgICAgPC9NYWduZXRpYz5cclxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJwcm9maWxlLXBob3RvLXdyYXBcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk0LCB5OiA0MCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuOSwgZWFzZTogRUFTRSwgZGVsYXk6IDAuMTUgfX0+XHJcbiAgICAgICAgICAgIDxUaWx0IGNsYXNzTmFtZT1cInByb2ZpbGUtcGhvdG9cIiBtYXg9ezEyfT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9maWxlLWluaXRpYWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57dC5uYW1lLnNwbGl0KFwiIFwiKVswXX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvZmlsZS1yaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17dC5waG90b30gYWx0PXt0Lm5hbWV9IC8+XHJcbiAgICAgICAgICAgIDwvVGlsdD5cclxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHByb2ZpbGUtYm9keVwiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPFRpdGxlIGFjY2VudD1cImVsIGVudHJlbmFkb3JcIj5Tb2JyZTwvVGl0bGU+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgYXM9XCJwXCIgY2xhc3NOYW1lPVwicHJvZmlsZS1iaW9cIj57dC5iaW99PC9SZXZlYWw+XHJcbiAgICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiY2hpcHNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgICAge3Quc3BlY2lhbHRpZXMubWFwKChzKSA9PiA8bW90aW9uLmxpIGtleT17c30gdmFyaWFudHM9e3JldmVhbH0+e3N9PC9tb3Rpb24ubGk+KX1cclxuICAgICAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwicHJvZmlsZS1zY2hlZHVsZVwiPlxyXG4gICAgICAgICAgICAgIDxDYWxlbmRhckljb24gc2l6ZT17MjB9IC8+IDxzcGFuPnt0LnNjaGVkdWxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJheXVkYSBhIGVudHJlbmFyXCI+VGU8L1RpdGxlPlxyXG4gICAgICAgICAgICA8bW90aW9uLm9sIGNsYXNzTmFtZT1cImhlbHBzXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAgICAgIHt0LmhlbHBzLm1hcCgoaCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5saSBrZXk9e2h9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIHNpemU9ezIwfSAvPiA8c3Bhbj57aH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21vdGlvbi5saT5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9tb3Rpb24ub2w+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzZWN0aW9uLWFsdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImVudHJlbmFkb3Jlc1wiPk90cm9zPC9UaXRsZT5cclxuICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwidHJhaW5lcnMgdHJhaW5lcnMtc21hbGxcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgIHtvdGhlcnMubWFwKChvKSA9PiA8VHJhaW5lckNhcmQga2V5PXtvLnNsdWd9IHQ9e299IC8+KX1cclxuICAgICAgICAgIDwvbW90aW9uLnVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBSRUVMUzogdmlkZW9zIHByb3Bpb3MsIHNlIHJlcHJvZHVjZW4gc29sb3MgLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBSZWVscygpIHtcclxuICBjb25zdCByZWVscyA9IHNpdGVDb25maWcucmVlbHM7XHJcbiAgY29uc3QgW2FjdGl2ZSwgc2V0QWN0aXZlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFttdXRlZCwgc2V0TXV0ZWRdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKCgpID0+IG1vdGlvblJlZHVjZWQoKSk7XHJcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHZpZHMgPSB1c2VSZWYoW10pO1xyXG4gIGNvbnN0IHdyYXBSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc3RhcnRYID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGdvID0gKGQpID0+IHNldEFjdGl2ZSgoYSkgPT4gKGEgKyBkICsgcmVlbHMubGVuZ3RoKSAlIHJlZWxzLmxlbmd0aCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBpbyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoW2VdKSA9PiBzZXRWaXNpYmxlKGUuaXNJbnRlcnNlY3RpbmcpLCB7IHRocmVzaG9sZDogMC4zNSB9KTtcclxuICAgIGlmICh3cmFwUmVmLmN1cnJlbnQpIGlvLm9ic2VydmUod3JhcFJlZi5jdXJyZW50KTtcclxuICAgIHJldHVybiAoKSA9PiBpby5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2aWRzLmN1cnJlbnQuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICBpZiAoIXYpIHJldHVybjtcclxuICAgICAgaWYgKGkgPT09IGFjdGl2ZSAmJiB2aXNpYmxlICYmICFwYXVzZWQpIHtcclxuICAgICAgICB2Lm11dGVkID0gbXV0ZWQ7XHJcbiAgICAgICAgdi5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHYucGF1c2UoKTtcclxuICAgICAgICBpZiAoaSAhPT0gYWN0aXZlKSB2LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2FjdGl2ZSwgdmlzaWJsZSwgbXV0ZWQsIHBhdXNlZF0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJyZWVsc1wiIGNsYXNzTmFtZT1cInNlY3Rpb24gcmVlbHMtc2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxUaXRsZSBjZW50ZXIgYWNjZW50PVwiZW4gSW5zdGFncmFtXCIgbGVhZD17YExvcyByZWVscyBjb24gbcOhcyB2aXN0YXMgZGUgJHtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9LiBTZSByZXByb2R1Y2VuIHNvbG9zOiB0b2NhIGVsIGFsdGF2b3ogcGFyYSBlc2N1Y2hhci5gfT5MbyBtw6FzIHZpc3RvPC9UaXRsZT5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e3dyYXBSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjb3ZlcmZsb3dcIlxyXG4gICAgICAgICAgcm9sZT1cInJlZ2lvblwiXHJcbiAgICAgICAgICBhcmlhLXJvbGVkZXNjcmlwdGlvbj1cImNhcnJ1c2VsXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZWVscyBtw6FzIHZpc3Rvc1wiXHJcbiAgICAgICAgICB0YWJJbmRleD17MH1cclxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHsgaWYgKGUua2V5ID09PSBcIkFycm93UmlnaHRcIikgZ28oMSk7IGlmIChlLmtleSA9PT0gXCJBcnJvd0xlZnRcIikgZ28oLTEpOyB9fVxyXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgc3RhcnRYLmN1cnJlbnQgPSBlLmNsaWVudFg7IH19XHJcbiAgICAgICAgICBvblBvaW50ZXJVcD17KGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0WC5jdXJyZW50ID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgZHggPSBlLmNsaWVudFggLSBzdGFydFguY3VycmVudDtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGR4KSA+IDUwKSBnbyhkeCA8IDAgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICBzdGFydFguY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtyZWVscy5tYXAoKHIsIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9mZiA9IGkgLSBhY3RpdmU7XHJcbiAgICAgICAgICAgIGlmIChvZmYgPiByZWVscy5sZW5ndGggLyAyKSBvZmYgLT0gcmVlbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAob2ZmIDwgLXJlZWxzLmxlbmd0aCAvIDIpIG9mZiArPSByZWVscy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGFicyA9IE1hdGguYWJzKG9mZik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gb2ZmID09PSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17ci5jb2RlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVlbCR7aXNBY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoY2FsYygtNTAlICsgJHtvZmYgKiA2NH0lKSkgdHJhbnNsYXRlWigkey1hYnMgKiAxNzB9cHgpIHJvdGF0ZVkoJHtvZmYgKiAtMzZ9ZGVnKWAsXHJcbiAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAgLSBhYnMsXHJcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGFicyA+IDIgPyAwIDogMSxcclxuICAgICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogYWJzID4gMiA/IFwibm9uZVwiIDogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gIWlzQWN0aXZlICYmIHNldEFjdGl2ZShpKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8dmlkZW9cclxuICAgICAgICAgICAgICAgICAgcmVmPXsoZWwpID0+ICh2aWRzLmN1cnJlbnRbaV0gPSBlbCl9XHJcbiAgICAgICAgICAgICAgICAgIHNyYz17YC9hc3NldHMvcmVlbHMvJHtyLmNvZGV9Lm1wNGB9XHJcbiAgICAgICAgICAgICAgICAgIHBvc3Rlcj17YC9hc3NldHMvcmVlbHMvJHtyLmNvZGV9LmpwZ2B9XHJcbiAgICAgICAgICAgICAgICAgIG11dGVkXHJcbiAgICAgICAgICAgICAgICAgIHBsYXlzSW5saW5lXHJcbiAgICAgICAgICAgICAgICAgIHByZWxvYWQ9e2FicyA8PSAxID8gXCJhdXRvXCIgOiBcIm1ldGFkYXRhXCJ9XHJcbiAgICAgICAgICAgICAgICAgIG9uRW5kZWQ9eygpID0+IGlzQWN0aXZlICYmIGdvKDEpfVxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgUmVlbCAke2kgKyAxfSBkZSAke3JlZWxzLmxlbmd0aH06ICR7ci50aXRsZX0sICR7ci52aWV3c30gdmlzdGFzYH1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49eyFpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWVsLXZpZXdzXCI+PEV5ZUljb24gc2l6ZT17MTR9IC8+IHtyLnZpZXdzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZWwtdGl0bGVcIj57ci50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7aXNBY3RpdmUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWVsLWFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGxcIiBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRQYXVzZWQoIXBhdXNlZCk7IH19IGFyaWEtbGFiZWw9e3BhdXNlZCA/IFwiUmVwcm9kdWNpciByZWVsXCIgOiBcIlBhdXNhciByZWVsXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3BhdXNlZCA/IDxQbGF5R2x5cGggLz4gOiA8UGF1c2VJY29uIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInJvdW5kLWJ0biBzbWFsbFwiIG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldE11dGVkKCFtdXRlZCk7IH19IGFyaWEtbGFiZWw9e211dGVkID8gXCJBY3RpdmFyIHNvbmlkb1wiIDogXCJTaWxlbmNpYXJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7bXV0ZWQgPyA8Vm9sdW1lWEljb24gc2l6ZT17MTh9IC8+IDogPFZvbHVtZTJJY29uIHNpemU9ezE4fSAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGxcIiBocmVmPXtgaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9yZWVsLyR7ci5jb2RlfS9gfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgYXJpYS1sYWJlbD1cIkFicmlyIGVuIEluc3RhZ3JhbVwiIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbExpbmtJY29uIHNpemU9ezE2fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVlbC1jb250cm9sc1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyb3VuZC1idG5cIiBvbkNsaWNrPXsoKSA9PiBnbygtMSl9IGFyaWEtbGFiZWw9XCJSZWVsIGFudGVyaW9yXCI+PENoZXZyb25MZWZ0SWNvbiBzaXplPXsyMn0gLz48L2J1dHRvbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG90c1wiPlxyXG4gICAgICAgICAgICB7cmVlbHMubWFwKChyLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e3IuY29kZX0gY2xhc3NOYW1lPXtpID09PSBhY3RpdmUgPyBcIm9uXCIgOiBcIlwifSBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmUoaSl9IGFyaWEtbGFiZWw9e2BJciBhbCByZWVsICR7aSArIDF9YH0gLz5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicm91bmQtYnRuXCIgb25DbGljaz17KCkgPT4gZ28oMSl9IGFyaWEtbGFiZWw9XCJSZWVsIHNpZ3VpZW50ZVwiPjxDaGV2cm9uUmlnaHRJY29uIHNpemU9ezIyfSAvPjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwiY2VudGVyLWN0YVwiPlxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1naG9zdFwiIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICA8SW5zdGFncmFtSWNvbiBzaXplPXsxOH0gLz4gU8OtZ3Vlbm9zIHtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gWk9OQVM6IHBhbmVsZXMgcXVlIHNlIGV4cGFuZGVuIC0tLS0tLS0tLS1cclxuY29uc3QgWk9ORVMgPSBbXHJcbiAgeyBpbWc6IElNRy5kaXNjb3MsIHRpdGxlOiBcIlBvd2VybGlmdGluZ1wiLCB0ZXh0OiBcIlNlbnRhZGlsbGEsIGJhbmNhIHkgcGVzbyBtdWVydG8gc29icmUgcGxhdGFmb3JtYXMsIGNvbiBkaXNjb3MgYnVtcGVyIGNhbGlicmFkb3MuXCIsIGdlYXI6IFtcIkJhcnJhcyBvbMOtbXBpY2FzXCIsIFwiRGlzY29zIGJ1bXBlclwiLCBcIlBsYXRhZm9ybWFzXCIsIFwiQmFuY28gZGUgY29tcGV0aWNpw7NuXCJdIH0sXHJcbiAgeyBpbWc6IElNRy5yYWNrcywgdGl0bGU6IFwiUGVzbyBsaWJyZVwiLCB0ZXh0OiBcIlBvd2VyIHJhY2tzIGRlIHVzbyBydWRvIHkgZXNwYWNpbyBwYXJhIGVudHJlbmFyIHBlc2FkbyBzaW4gZXNwZXJhciB0dXJuby5cIiwgZ2VhcjogW1wiUG93ZXIgcmFja3NcIiwgXCJNYW5jdWVybmFzXCIsIFwiQmFycmFzXCIsIFwiQmFuY29zIGFqdXN0YWJsZXNcIl0gfSxcclxuICB7IGltZzogSU1HLm1hcXVpbmFzLCB0aXRsZTogXCJNw6FxdWluYXNcIiwgdGV4dDogXCJCaW9tZWPDoW5pY2EgcGFyYSBhaXNsYXIgY2FkYSBtw7pzY3VsbyBjb24gY29udHJvbCB5IHNlZ3VyaWRhZC5cIiwgZ2VhcjogW1wiUHJlbnNhIGluY2xpbmFkYVwiLCBcIkhhY2sgc3F1YXRcIiwgXCJQb2xlYXNcIiwgXCJFc3Blam9zIHBhbm9yw6FtaWNvc1wiXSB9LFxyXG4gIHsgaW1nOiBJTUcuaW50ZXJpb3IsIHRpdGxlOiBcIkZ1bmNpb25hbFwiLCB0ZXh0OiBcIkPDqXNwZWQgc2ludMOpdGljbyBlbiBkb3Mgbml2ZWxlcyBwYXJhIHRyaW5lbywgYWNvbmRpY2lvbmFtaWVudG8geSBtb3ZpbGlkYWQuXCIsIGdlYXI6IFtcIkPDqXNwZWQgc2ludMOpdGljb1wiLCBcIlRyaW5lb1wiLCBcIlRSWFwiLCBcIkRvcyBuaXZlbGVzXCJdIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBab25lcygpIHtcclxuICBjb25zdCBbYWN0aXZlLCBzZXRBY3RpdmVdID0gdXNlU3RhdGUoMCk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiem9uYXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHNlY3Rpb24tYWx0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFRpdGxlIGNlbnRlciBhY2NlbnQ9XCJ6b25hc1wiIGxlYWQ9XCJQYXNhIGVsIG1vdXNlIG8gdG9jYSBjYWRhIHpvbmEgcGFyYSB2ZXIgcXXDqSBlcXVpcG8gZW5jb250cmFyw6FzLlwiPk51ZXN0cmFzPC9UaXRsZT5cclxuICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJ6b25lc1wiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtaT05FUy5tYXAoKHosIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb24gPSBpID09PSBhY3RpdmU7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cclxuICAgICAgICAgICAgICAgIGtleT17ei50aXRsZX1cclxuICAgICAgICAgICAgICAgIHZhcmlhbnRzPXtyZXZlYWx9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B6b25lJHtvbiA/IFwiIG9uXCIgOiBcIlwifWB9XHJcbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IGZpbmVQb2ludGVyKCkgJiYgc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b259XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e3ouaW1nfSBhbHQ9XCJcIiBsb2FkaW5nPVwibGF6eVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLXNoYWRlXCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtdmVydGljYWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57ei50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS10aXRsZVwiPnt6LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS10ZXh0XCI+e3oudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtZ2VhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt6LmdlYXIubWFwKChnKSA9PiA8c3BhbiBrZXk9e2d9PntnfTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQbGFucygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJwbGFuZXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFRpdGxlIGNlbnRlciBhY2NlbnQ9XCJwbGFuXCI+RWxpZ2UgdHU8L1RpdGxlPlxyXG4gICAgICAgIDxtb3Rpb24uZGl2IGNsYXNzTmFtZT1cInBsYW5zXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAge3NpdGVDb25maWcucGxhbnMubWFwKChwKSA9PiAoXHJcbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IGtleT17cC5pZH0gdmFyaWFudHM9e3JldmVhbH0+XHJcbiAgICAgICAgICAgICAgPFRpbHQgYXM9XCJhcnRpY2xlXCIgY2xhc3NOYW1lPXtgcGxhbiR7cC5pc0ZlYXR1cmVkID8gXCIgZmVhdHVyZWRcIiA6IFwiXCJ9YH0gbWF4PXs3fT5cclxuICAgICAgICAgICAgICAgIHtwLmlzRmVhdHVyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwiYmFkZ2VcIj48WmFwSWNvbiBzaXplPXsxNH0gLz4gTcOhcyBlbGVnaWRvPC9zcGFuPn1cclxuICAgICAgICAgICAgICAgIDxoMz57cC5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwbGFuLXRhZ1wiPntwLnRhZ2xpbmV9PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZVwiPjxzbWFsbD57cC5jdXJyZW5jeX08L3NtYWxsPntwLnByaWNlfTxzcGFuPi8ge3AucGVyaW9kfTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bD57cC5mZWF0dXJlcy5tYXAoKGYpID0+IDxsaSBrZXk9e2Z9PjxDaGVja0ljb24gc2l6ZT17MTh9IC8+IHtmfTwvbGk+KX08L3VsPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtgYnRuJHtwLmlzRmVhdHVyZWQgPyBcIlwiIDogXCIgYnRuLWdob3N0XCJ9YH0gaHJlZj17cC53aGF0c2FwcFVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPntwLmJ1dHRvblRleHR9PC9hPlxyXG4gICAgICAgICAgICAgIDwvVGlsdD5cclxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIEhPUkFSSU9TOiBlc3RhZG8gZW4gdml2byArIGzDrW5lYSBkZSB0aWVtcG8gc2VtYW5hbCAtLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0gSE9SQVJJT1M6IHRyZXMgdGFyamV0YXMgc2ltcGxlcyAtLS0tLS0tLS0tXHJcbmNvbnN0IHNob3J0SG91ciA9IChtaW4pID0+IHtcclxuICBjb25zdCBoID0gTWF0aC5mbG9vcihtaW4gLyA2MCksIG0gPSBtaW4gJSA2MDtcclxuICByZXR1cm4geyBudW06IGAke2ggJSAxMiA9PT0gMCA/IDEyIDogaCAlIDEyfSR7bSA/IGA6JHtTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpfWAgOiBcIlwifWAsIGFtcG06IGggPCAxMiA/IFwiQU1cIiA6IFwiUE1cIiB9O1xyXG59O1xyXG5mdW5jdGlvbiBUaW1lUmFuZ2UoeyBzIH0pIHtcclxuICBjb25zdCBhID0gc2hvcnRIb3VyKHMuZnJvbSksIGIgPSBzaG9ydEhvdXIocy50byk7XHJcbiAgY29uc3Qgc3Bva2VuID0gYGRlICR7Zm10VGltZShNYXRoLmZsb29yKHMuZnJvbSAvIDYwKSwgcy5mcm9tICUgNjApfSBhICR7Zm10VGltZShNYXRoLmZsb29yKHMudG8gLyA2MCksIHMudG8gJSA2MCl9YDtcclxuICByZXR1cm4gKFxyXG4gICAgPGxpIGNsYXNzTmFtZT1cInNoaWZ0XCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoaWZ0LW5hbWVcIj57cy5uYW1lLnJlcGxhY2UoXCJUdXJubyBcIiwgXCJcIil9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC10aW1lXCIgYXJpYS1sYWJlbD17c3Bva2VufT5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57YS5udW19PHNtYWxsPnthLmFtcG19PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtc2VwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57Yi5udW19PHNtYWxsPntiLmFtcG19PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvbGk+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBTY2hlZHVsZSgpIHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoZ2V0U3RhdHVzKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHNldFN0YXR1cyhnZXRTdGF0dXMoKSksIDMwMDAwKTtcclxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCB7IHdlZWtkYXlzLCBzYXR1cmRheSwgc3VuZGF5IH0gPSBzaXRlQ29uZmlnLmhvdXJzO1xyXG4gIGNvbnN0IGdyb3VwcyA9IFtcclxuICAgIHsgdGl0bGU6IHdlZWtkYXlzLmRheXMsIGRheXM6IFsxLCAyLCAzLCA0LCA1XSwgc2hpZnRzOiBzaGlmdHNGb3IoMSksIG5vdGU6IFwiUGF1c2EgZGUgMSBhIDMgcC4gbS5cIiB9LFxyXG4gICAgeyB0aXRsZTogXCJTw6FiYWRvc1wiLCBkYXlzOiBbNl0sIHNoaWZ0czogc2hpZnRzRm9yKDYpIH0sXHJcbiAgICB7IHRpdGxlOiBcIkRvbWluZ29zXCIsIGRheXM6IFswXSwgc2hpZnRzOiBbXSB9LFxyXG4gIF07XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiaG9yYXJpb3NcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHNjaGVkdWxlLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlLWhlYWRcIj5cclxuICAgICAgICAgIDxUaXRsZT5Ib3JhcmlvczwvVGl0bGU+XHJcbiAgICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT17YHN0YXR1cyR7c3RhdHVzLm9wZW4gPyBcIiBvcGVuXCIgOiBcIlwifWB9PlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGF0dXMtZG90XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gcm9sZT1cInN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+e3N0YXR1cy5sYWJlbH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICA8c21hbGw+e3N0YXR1cy5kZXRhaWx9PC9zbWFsbD5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiaG91cnMtZ3JpZFwiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtncm91cHMubWFwKChnKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gZy5kYXlzLmluY2x1ZGVzKHN0YXR1cy5kYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxtb3Rpb24ubGkga2V5PXtnLnRpdGxlfSB2YXJpYW50cz17cmV2ZWFsfSBjbGFzc05hbWU9e2Bob3Vycy1jYXJkIGdsYXNzJHt0b2RheSA/IFwiIHRvZGF5XCIgOiBcIlwifWB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3Vycy1jYXJkLWhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgPGgzPntnLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgIHt0b2RheSAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0b2RheS1iYWRnZVwiPkhveTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtnLnNoaWZ0cy5sZW5ndGggPyAoXHJcbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzaGlmdHNcIj57Zy5zaGlmdHMubWFwKChzKSA9PiA8VGltZVJhbmdlIGtleT17cy5uYW1lfSBzPXtzfSAvPil9PC91bD5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnRzLWVtcHR5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+e3N1bmRheS5zdGF0dXNOb3RlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXt3YShcIkhvbGEsIMK/YWJyZW4gZXN0ZSBkb21pbmdvP1wiKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlByZWd1bnRhIHBvciBXaGF0c0FwcCA8QXJyb3dSaWdodEljb24gc2l6ZT17MTZ9IC8+PC9hPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7Zy5ub3RlICYmIDxwIGNsYXNzTmFtZT1cImhvdXJzLW5vdGVcIj48Q2xvY2tJY29uIHNpemU9ezE2fSBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiB7Zy5ub3RlfTwvcD59XHJcbiAgICAgICAgICAgICAgPC9tb3Rpb24ubGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L21vdGlvbi51bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ3RhQmFuZCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiY3RhLWJhbmRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgY3RhLWlubmVyXCI+XHJcbiAgICAgICAgPFJldmVhbCBhcz1cImgyXCI+VHUgcHJpbWVyIGTDrWEgY3Vlc3RhIHNvbG8gUy8gMTU8L1JldmVhbD5cclxuICAgICAgICA8UmV2ZWFsIGRlbGF5PXswLjF9PlxyXG4gICAgICAgICAgPE1hZ25ldGljIGNsYXNzTmFtZT1cImJ0biBidG4tZGFya1wiIGhyZWY9e3NpdGVDb25maWcucGxhbnNbMF0ud2hhdHNhcHBVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuICAgICAgICAgICAgUmVzZXJ2YXIgcGFzZSBkaWFyaW8gPEFycm93UmlnaHRJY29uIHNpemU9ezE4fSAvPlxyXG4gICAgICAgICAgPC9NYWduZXRpYz5cclxuICAgICAgICA8L1JldmVhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29udGFjdCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJjb250YWN0b1wiIGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgY29udGFjdC1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJlbmNvbnRyYXJub3NcIj5WZW4gYTwvVGl0bGU+XHJcbiAgICAgICAgICA8UmV2ZWFsIGFzPVwidWxcIiBjbGFzc05hbWU9XCJjb250YWN0LWxpc3RcIj5cclxuICAgICAgICAgICAgPGxpPjxNYXBQaW5JY29uIHNpemU9ezIwfSAvPjxhIGhyZWY9e3NpdGVDb25maWcuZ29vZ2xlTWFwc1VybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPntzaXRlQ29uZmlnLmFkZHJlc3N9PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48UGhvbmVJY29uIHNpemU9ezIwfSAvPjxhIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj57c2l0ZUNvbmZpZy5waG9uZS5kaXNwbGF5fTwvYT48L2xpPlxyXG4gICAgICAgICAgICA8bGk+PEluc3RhZ3JhbUljb24gc2l6ZT17MjB9IC8+PGEgaHJlZj17c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbUhhbmRsZX08L2E+PC9saT5cclxuICAgICAgICAgICAgPGxpPjxTaGllbGRDaGVja0ljb24gc2l6ZT17MjB9IC8+PHNwYW4+U2luIGNvbnRyYXRvcyBkZSBwZXJtYW5lbmNpYTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgICA8UmV2ZWFsIGRlbGF5PXswLjF9PlxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPXtzaXRlQ29uZmlnLmdvb2dsZU1hcHNVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj48TmF2aWdhdGlvbkljb24gc2l6ZT17MTh9IC8+IEPDs21vIGxsZWdhcjwvYT5cclxuICAgICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwibWFwXCIgZGVsYXk9ezAuMTV9PlxyXG4gICAgICAgICAgPGlmcmFtZSB0aXRsZT1cIk1hcGEgZGUgNyBTdHJlbmd0aCBDZW50ZXJcIiBzcmM9e2BodHRwczovL3d3dy5nb29nbGUuY29tL21hcHM/cT0ke3NpdGVDb25maWcuZ29vZ2xlTWFwc0VtYmVkUXVlcnl9Jm91dHB1dD1lbWJlZGB9IGxvYWRpbmc9XCJsYXp5XCIgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlci13aGVuLWRvd25ncmFkZVwiIC8+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvb3RlcigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZm9vdGVyLWlubmVyXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIiNpbmljaW9cIiBjbGFzc05hbWU9XCJicmFuZFwiPlxyXG4gICAgICAgICAgPExvZ28gc2l6ZT17NDR9IC8+XHJcbiAgICAgICAgICA8c3Bhbj43IDxiPlN0cmVuZ3RoPC9iPiBDZW50ZXI8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxwPsKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IHtzaXRlQ29uZmlnLm5hbWV9IMK3IHtzaXRlQ29uZmlnLmNpdHl9PC9wPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjaW5pY2lvXCIgY2xhc3NOYW1lPVwidG8tdG9wXCIgYXJpYS1sYWJlbD1cIlZvbHZlciBhcnJpYmFcIj48QXJyb3dVcEljb24gc2l6ZT17MTh9IC8+PC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZm9vdGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gQVNJU1RFTlRFIENPTiBJQSAtLS0tLS0tLS0tXHJcbi8vIFJlc3B1ZXN0YXMgYsOhc2ljYXMgY3VhbmRvIGxhIElBIG5vIGVzdMOhIGRpc3BvbmlibGUgKHNpbiBjbGF2ZSBvIHNpbiBpbnRlcm5ldCkuXHJcbmZ1bmN0aW9uIGxvY2FsQW5zd2VyKHEpIHtcclxuICBjb25zdCB0ID0gcS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGMgPSBzaXRlQ29uZmlnO1xyXG4gIGNvbnN0IGggPSBjLmhvdXJzO1xyXG4gIGlmICgvaG9yYXJpb3xob3JhfGFicmV8Y2llcnJhfGFiaWVydG98ZG9taW5nb3xzw6FiYWRvfHNhYmFkby8udGVzdCh0KSlcclxuICAgIHJldHVybiBgJHtoLndlZWtkYXlzLmRheXN9OiAke2gud2Vla2RheXMuc2hpZnRzLm1hcCgocykgPT4gcy50aW1lUmFuZ2UpLmpvaW4oXCIgeSBcIil9LiAke2guc2F0dXJkYXkuZGF5c306ICR7aC5zYXR1cmRheS5zaGlmdHNbMF0udGltZVJhbmdlfS4gRG9taW5nb3M6ICR7aC5zdW5kYXkuc3RhdHVzTm90ZS50b0xvd2VyQ2FzZSgpfS5gO1xyXG4gIGlmICgvcHJlY2lvfGN1ZXN0YXxjb3N0b3xwbGFufG1lbnN1YWx8cGFzZXxwYWdhcnxtZW1icmVzLy50ZXN0KHQpKVxyXG4gICAgcmV0dXJuIGMucGxhbnMubWFwKChwKSA9PiBgJHtwLm5hbWV9OiAke3AuZm9ybWF0dGVkUHJpY2V9ICgke3AucGVyaW9kfSlgKS5qb2luKFwiIMK3IFwiKSArIFwiLiBTaW4gY29udHJhdG9zIGRlIHBlcm1hbmVuY2lhLlwiO1xyXG4gIGlmICgvZMOzbmRlfGRvbmRlfGRpcmVjY2l8dWJpY2F8bGxlZ2FyfG1hcGEvLnRlc3QodCkpIHJldHVybiBgRXN0YW1vcyBlbiAke2MuYWRkcmVzc30uIFRvY2Eg4oCcQ8OzbW8gbGxlZ2Fy4oCdIGVuIGxhIHNlY2Npw7NuIGRlIGNvbnRhY3RvIHBhcmEgYWJyaXIgR29vZ2xlIE1hcHMuYDtcclxuICBpZiAoL2VudHJlbmFkb3J8Y29hY2h8cHJvZmV8cGVyc29uYWwvLnRlc3QodCkpXHJcbiAgICByZXR1cm4gYE51ZXN0cm8gZXF1aXBvOiAke2MudHJhaW5lcnMubWFwKCh0cikgPT4gYCR7dHIubmFtZX0gKCR7dHIucm9sZX0pYCkuam9pbihcIiwgXCIpfS4gRW50cmEgYSBzdSBwZXJmaWwgZW4gbGEgc2VjY2nDs24gRW50cmVuYWRvcmVzLmA7XHJcbiAgaWYgKC93aGF0c2FwcHx0ZWxbZcOpXWZvbm98Y29udGFjdG98aW5zY3JpYnxyZXNlcnYvLnRlc3QodCkpIHJldHVybiBgRXNjcsOtYmVub3MgcG9yIFdoYXRzQXBwIGFsICR7Yy5waG9uZS5kaXNwbGF5fSB5IHRlIGF5dWRhbW9zIGEgaW5zY3JpYmlydGUuYDtcclxuICByZXR1cm4gYFB1ZWRvIGNvbnRhcnRlIHNvYnJlIGhvcmFyaW9zLCBwbGFuZXMsIGVudHJlbmFkb3JlcyB5IGPDs21vIGxsZWdhci4gUGFyYSBhbGdvIG3DoXMgZXNwZWPDrWZpY28sIGVzY3LDrWJlbm9zIHBvciBXaGF0c0FwcCBhbCAke2MucGhvbmUuZGlzcGxheX0uYDtcclxufVxyXG5cclxuY29uc3QgU1VHR0VTVElPTlMgPSBbXCLCv0N1w6FsIGVzIGVsIGhvcmFyaW8/XCIsIFwiwr9DdcOhbnRvIGN1ZXN0YSBlbCBwbGFuIG1lbnN1YWw/XCIsIFwiU295IHByaW5jaXBpYW50ZSwgwr9jb24gcXVpw6luIGVudHJlbm8/XCIsIFwiwr9Ew7NuZGUgZXN0w6FuP1wiXTtcclxuXHJcbmZ1bmN0aW9uIENoYXRCb3QoKSB7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttc2dzLCBzZXRNc2dzXSA9IHVzZVN0YXRlKFtcclxuICAgIHsgcm9sZTogXCJhc3Npc3RhbnRcIiwgY29udGVudDogXCLCoUhvbGEhIFNveSBlbCBhc2lzdGVudGUgZGUgNyBTdHJlbmd0aC4gUHJlZ8O6bnRhbWUgcG9yIGhvcmFyaW9zLCBwbGFuZXMgbyBlbnRyZW5hZG9yZXMuXCIgfSxcclxuICBdKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGlzdFJlZi5jdXJyZW50Py5zY3JvbGxUbyh7IHRvcDogbGlzdFJlZi5jdXJyZW50LnNjcm9sbEhlaWdodCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgfSwgW21zZ3MsIGJ1c3ldKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKG9wZW4pIHNldFRpbWVvdXQoKCkgPT4gaW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKSwgMjUwKTtcclxuICAgIGNvbnN0IG9uS2V5ID0gKGUpID0+IGUua2V5ID09PSBcIkVzY2FwZVwiICYmIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gICAgcmV0dXJuICgpID0+IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5KTtcclxuICB9LCBbb3Blbl0pO1xyXG5cclxuICBjb25zdCBhc2sgPSBhc3luYyAodGV4dCkgPT4ge1xyXG4gICAgY29uc3QgcSA9IHRleHQudHJpbSgpO1xyXG4gICAgaWYgKCFxIHx8IGJ1c3kpIHJldHVybjtcclxuICAgIGNvbnN0IG5leHQgPSBbLi4ubXNncywgeyByb2xlOiBcInVzZXJcIiwgY29udGVudDogcSB9XTtcclxuICAgIHNldE1zZ3MobmV4dCk7XHJcbiAgICBzZXRJbnB1dChcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBsZXQgcmVwbHk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NoYXRcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZXM6IG5leHQuc2xpY2UoMSkgfSksXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgci5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XHJcbiAgICAgIGlmIChyLm9rICYmIGRhdGEucmVwbHkpIHJlcGx5ID0gZGF0YS5yZXBseTtcclxuICAgICAgZWxzZSBpZiAoci5zdGF0dXMgPT09IDQyOSkgcmVwbHkgPSBcIkVzdMOhcyBwcmVndW50YW5kbyBtdXkgcsOhcGlkby4gRXNwZXJhIHVub3Mgc2VndW5kb3MgeSB2dWVsdmUgYSBpbnRlbnRhcmxvLlwiO1xyXG4gICAgICBlbHNlIHJlcGx5ID0gbG9jYWxBbnN3ZXIocSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmVwbHkgPSBsb2NhbEFuc3dlcihxKTtcclxuICAgIH1cclxuICAgIHNldE1zZ3MoKG0pID0+IFsuLi5tLCB7IHJvbGU6IFwiYXNzaXN0YW50XCIsIGNvbnRlbnQ6IHJlcGx5IH1dKTtcclxuICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtcm9vdFwiPlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24uc2VjdGlvblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjaGF0LXBhbmVsIGdsYXNzIGxpcXVpZFwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQXNpc3RlbnRlIGRlIDcgU3RyZW5ndGggQ2VudGVyXCJcclxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxNiwgc2NhbGU6IDAuOTYgfX1cclxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwLCBzY2FsZTogMSwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yOCwgZWFzZTogRUFTRSB9IH19XHJcbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeTogMTAsIHNjYWxlOiAwLjk3LCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjE4IH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjaGF0LWhlYWRcIj5cclxuICAgICAgICAgICAgICA8TG9nbyBzaXplPXs0MH0gLz5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5Bc2lzdGVudGUgNyBTdHJlbmd0aDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgPHNtYWxsPjxzcGFuIGNsYXNzTmFtZT1cImNoYXQtb25saW5lXCIgLz4gUmVzcG9uZGUgYWwgaW5zdGFudGU8L3NtYWxsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicm91bmQtYnRuIHNtYWxsXCIgb25DbGljaz17KCkgPT4gc2V0T3BlbihmYWxzZSl9IGFyaWEtbGFiZWw9XCJDZXJyYXIgY2hhdFwiPjxYSWNvbiBzaXplPXsxOH0gLz48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1saXN0XCIgcmVmPXtsaXN0UmVmfSBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cclxuICAgICAgICAgICAgICB7bXNncy5tYXAoKG0sIGkpID0+IChcclxuICAgICAgICAgICAgICAgIDxtb3Rpb24ucCBrZXk9e2l9IGNsYXNzTmFtZT17YGJ1YmJsZSAke20ucm9sZX1gfSBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDggfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMjUsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHttLmNvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICA8L21vdGlvbi5wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIHtidXN5ICYmIDxwIGNsYXNzTmFtZT1cImJ1YmJsZSBhc3Npc3RhbnQgdHlwaW5nXCIgYXJpYS1sYWJlbD1cIkVzY3JpYmllbmRvXCI+PGkgLz48aSAvPjxpIC8+PC9wPn1cclxuICAgICAgICAgICAgICB7bXNncy5sZW5ndGggPT09IDEgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LXN1Z2dlc3RcIj5cclxuICAgICAgICAgICAgICAgICAge1NVR0dFU1RJT05TLm1hcCgocykgPT4gPGJ1dHRvbiBrZXk9e3N9IG9uQ2xpY2s9eygpID0+IGFzayhzKX0+e3N9PC9idXR0b24+KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJjaGF0LWZvcm1cIiBvblN1Ym1pdD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBhc2soaW5wdXQpOyB9fT5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXR9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldElucHV0KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRXNjcmliZSB0dSBwcmVndW50YeKAplwiXHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezUwMH1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJUdSBwcmVndW50YVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNoYXQtc2VuZFwiIGRpc2FibGVkPXshaW5wdXQudHJpbSgpIHx8IGJ1c3l9IGFyaWEtbGFiZWw9XCJFbnZpYXJcIj48QXJyb3dVcEljb24gc2l6ZT17MjB9IC8+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2hhdC13YVwiIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj48TWVzc2FnZUNpcmNsZUljb24gc2l6ZT17MTV9IC8+IFByZWZpZXJvIGhhYmxhciBwb3IgV2hhdHNBcHA8L2E+XHJcbiAgICAgICAgICA8L21vdGlvbi5zZWN0aW9uPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhYi1zdGFja1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgZmFiIGZhYi1haSR7b3BlbiA/IFwiIG9uXCIgOiBcIlwifWB9IG9uQ2xpY2s9eygpID0+IHNldE9wZW4oIW9wZW4pfSBhcmlhLWV4cGFuZGVkPXtvcGVufSBhcmlhLWxhYmVsPXtvcGVuID8gXCJDZXJyYXIgYXNpc3RlbnRlXCIgOiBcIkFicmlyIGFzaXN0ZW50ZSBjb24gSUFcIn0+XHJcbiAgICAgICAgICB7b3BlbiA/IDxYSWNvbiBzaXplPXsyNH0gLz4gOiA8U3BhcmtsZXNJY29uIHNpemU9ezI0fSAvPn1cclxuICAgICAgICAgIHshb3BlbiAmJiA8c3BhbiBjbGFzc05hbWU9XCJmYWItbGFiZWxcIj5QcmVnw7pudGFtZTwvc3Bhbj59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSG9tZSgpIHtcclxuICAvLyBBbCB2b2x2ZXIgZGVzZGUgdW4gcGVyZmlsLCBiYWphIGEgbGEgc2VjY2nDs24gcGVkaWRhICgjZW50cmVuYWRvcmVzLCBldGMuKS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xyXG4gICAgaWYgKGlkICYmICFpZC5zdGFydHNXaXRoKFwiL1wiKSkge1xyXG4gICAgICBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk/LnNjcm9sbEludG9WaWV3KCksIDYwKTtcclxuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0KTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxtYWluIGlkPVwiY29udGVuaWRvXCIgdGFiSW5kZXg9ey0xfT5cclxuICAgICAgPEhlcm8gLz5cclxuICAgICAgPFJpYmJvbnMgLz5cclxuICAgICAgPEFib3V0IC8+XHJcbiAgICAgIDxXaHlVcyAvPlxyXG4gICAgICA8VHJhaW5lcnMgLz5cclxuICAgICAgPFJlZWxzIC8+XHJcbiAgICAgIDxab25lcyAvPlxyXG4gICAgICA8UGxhbnMgLz5cclxuICAgICAgPFNjaGVkdWxlIC8+XHJcbiAgICAgIDxDdGFCYW5kIC8+XHJcbiAgICAgIDxDb250YWN0IC8+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlSGFzaCgpIHtcclxuICBjb25zdCBbaGFzaCwgc2V0SGFzaF0gPSB1c2VTdGF0ZShsb2NhdGlvbi5oYXNoKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZiA9ICgpID0+IHNldEhhc2gobG9jYXRpb24uaGFzaCk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmKTtcclxuICAgIHJldHVybiAoKSA9PiByZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIGhhc2g7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBoYXNoID0gdXNlSGFzaCgpO1xyXG4gIGNvbnN0IHNsdWcgPSBoYXNoLnN0YXJ0c1dpdGgoXCIjL2VudHJlbmFkb3IvXCIpID8gaGFzaC5zbGljZShcIiMvZW50cmVuYWRvci9cIi5sZW5ndGgpIDogbnVsbDtcclxuICBjb25zdCB0cmFpbmVyID0gdXNlTWVtbygoKSA9PiBzaXRlQ29uZmlnLnRyYWluZXJzLmZpbmQoKHQpID0+IHQuc2x1ZyA9PT0gc2x1ZyksIFtzbHVnXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdHJhaW5lcikgcmV0dXJuO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgLy8gTGxldmEgZWwgZm9jbyBhbCBub21icmUgZGVsIGVudHJlbmFkb3IgcGFyYSBsZWN0b3JlcyBkZSBwYW50YWxsYS5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlIGgxXCIpPy5mb2N1cygpLCA1MCk7XHJcbiAgfSwgW3RyYWluZXJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGEgY2xhc3NOYW1lPVwic2tpcC1saW5rXCIgaHJlZj1cIiNjb250ZW5pZG9cIj5TYWx0YXIgYWwgY29udGVuaWRvPC9hPlxyXG4gICAgICA8SW50cm8gLz5cclxuICAgICAgPFNjcm9sbFByb2dyZXNzIC8+XHJcbiAgICAgIDxIZWFkZXIgLz5cclxuICAgICAge3RyYWluZXIgPyA8VHJhaW5lclByb2ZpbGUga2V5PXt0cmFpbmVyLnNsdWd9IHQ9e3RyYWluZXJ9IC8+IDogPEhvbWUgLz59XHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgICAgPENoYXRCb3QgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJvb3RgKSkucmVuZGVyKDxBcHAgLz4pO1xyXG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQSxTQUNFQSxTQUFTLEVBQ1RDLFNBQVMsRUFDVEMsTUFBTSxFQUNOQyxLQUFLLEVBQ0xDLGVBQWUsRUFDZkMsUUFBUSxFQUNSQyxLQUFLLEVBQ0xDLGNBQWMsRUFDZEMsWUFBWSxFQUNaQyxVQUFVLEVBQ1ZDLFNBQVMsRUFDVEMsZUFBZSxFQUNmQyxTQUFTLEVBQ1RDLFNBQVMsRUFDVEMsT0FBTyxFQUNQQyxVQUFVLEVBQ1ZDLFNBQVMsRUFDVEMsYUFBYSxFQUNiQyxpQkFBaUIsRUFDakJDLFdBQVcsRUFDWEMsZUFBZSxFQUNmQyxnQkFBZ0IsRUFDaEJDLGdCQUFnQixFQUNoQkMsT0FBTyxFQUNQQyxXQUFXLEVBQ1hDLFdBQVcsRUFDWEMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLFlBQVksRUFDWkMsaUJBQWlCLEVBQ2pCQyxRQUFRLFFBQ0gsc0JBQXNCO0FBQzdCLFNBQVNDLFVBQVUsUUFBUSxrQkFBa0I7QUFFN0MsTUFBTTtFQUFFQyxRQUFRO0VBQUVDLFNBQVM7RUFBRUMsTUFBTTtFQUFFQztBQUFRLENBQUMsR0FBR2hDLEtBQUs7QUFDdEQsTUFBTWlDLEdBQUcsR0FBRztFQUNWQyxNQUFNLEVBQUUscUNBQXFDO0VBQzdDQyxJQUFJLEVBQUUsNEJBQTRC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