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
  theme: "dark"
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
  }, l)))), toggle("contrast", "Alto contraste", "Texto más claro y fondos sólidos"), toggle("links", "Subrayar enlaces", "Distingue los enlaces del texto"), toggle("font", "Letra fácil de leer", "Cambia los títulos a una letra simple"), toggle("motion", "Detener animaciones", "Quita movimientos y la intro"), /*#__PURE__*/React.createElement("button", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VTY3JvbGwiLCJ1c2VTcHJpbmciLCJtb3Rpb24iLCJSZWFjdCIsIkFuaW1hdGVQcmVzZW5jZSIsIk1lbnVJY29uIiwiWEljb24iLCJBcnJvd1JpZ2h0SWNvbiIsIkR1bWJiZWxsSWNvbiIsIlRhcmdldEljb24iLCJVc2Vyc0ljb24iLCJTaGllbGRDaGVja0ljb24iLCJDbG9ja0ljb24iLCJDaGVja0ljb24iLCJaYXBJY29uIiwiTWFwUGluSWNvbiIsIlBob25lSWNvbiIsIkluc3RhZ3JhbUljb24iLCJNZXNzYWdlQ2lyY2xlSWNvbiIsIkFycm93VXBJY29uIiwiQ2hldnJvbkxlZnRJY29uIiwiQ2hldnJvblJpZ2h0SWNvbiIsIkV4dGVybmFsTGlua0ljb24iLCJFeWVJY29uIiwiVm9sdW1lMkljb24iLCJWb2x1bWVYSWNvbiIsIkNhbGVuZGFySWNvbiIsIk5hdmlnYXRpb25JY29uIiwiU3BhcmtsZXNJY29uIiwiQWNjZXNzaWJpbGl0eUljb24iLCJSZWFjdERPTSIsInNpdGVDb25maWciLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZU1lbW8iLCJJTUciLCJoZXJvQmciLCJoZXJvIiwiaW50ZXJpb3IiLCJyYWNrcyIsImRpc2NvcyIsIm1hcXVpbmFzIiwid2EiLCJtc2ciLCJwaG9uZSIsIndoYXRzYXBwTWVzc2FnZUdlbmVyYWwiLCJyYXciLCJlbmNvZGVVUklDb21wb25lbnQiLCJFQVNFIiwiZmluZVBvaW50ZXIiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImxlcnAiLCJhIiwiYiIsInQiLCJ1c2VUaWx0IiwibWF4IiwicmVmIiwiZWwiLCJjdXJyZW50IiwiZ2xhcmUiLCJxdWVyeVNlbGVjdG9yIiwicmFmIiwidHgiLCJ0eSIsImN4IiwiY3kiLCJneCIsImd5IiwidGljayIsInN0eWxlIiwidHJhbnNmb3JtIiwidG9GaXhlZCIsImJhY2tncm91bmQiLCJNYXRoIiwiYWJzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwia2ljayIsIm1vdmUiLCJlIiwibW90aW9uUmVkdWNlZCIsInIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJweCIsImNsaWVudFgiLCJsZWZ0Iiwid2lkdGgiLCJweSIsImNsaWVudFkiLCJ0b3AiLCJoZWlnaHQiLCJyb3VuZCIsImxlYXZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlRpbHQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFzIiwicmVzdCIsIlRhZyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk1hZ25ldGljIiwieCIsInkiLCJyZXZlYWwiLCJoaWRkZW4iLCJvcGFjaXR5Iiwic2hvdyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImVhc2UiLCJzdGFnZ2VyIiwic3RhZ2dlckNoaWxkcmVuIiwiaW5WaWV3IiwiaW5pdGlhbCIsIndoaWxlSW5WaWV3Iiwidmlld3BvcnQiLCJvbmNlIiwiYW1vdW50IiwiUmV2ZWFsIiwiZGVsYXkiLCJ2YXJpYW50cyIsIlRpdGxlIiwiYWNjZW50IiwiY2VudGVyIiwibGVhZCIsInNwYW4iLCJTcGxpdFRleHQiLCJ0ZXh0IiwibWFwIiwiY2giLCJpIiwia2V5IiwiYW5pbWF0aW9uRGVsYXkiLCJDb3VudFVwIiwidG8iLCJzdWZmaXgiLCJuIiwic2V0TiIsImlvIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiZGlzY29ubmVjdCIsInN0YXJ0IiwicGVyZm9ybWFuY2UiLCJub3ciLCJkdXIiLCJzdGVwIiwicCIsIm1pbiIsInBvdyIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJEQVlfTkFNRVMiLCJmbXRUaW1lIiwiaCIsIm0iLCJoaCIsIlN0cmluZyIsInBhZFN0YXJ0IiwiYXRUaW1lIiwic2hpZnRzRm9yIiwiZGF5Iiwid2Vla2RheXMiLCJzYXR1cmRheSIsImhvdXJzIiwic2hpZnRzIiwicyIsImZyb20iLCJvcGVuSG91ciIsIm9wZW5NaW51dGUiLCJjbG9zZUhvdXIiLCJjbG9zZU1pbnV0ZSIsIm5hbWUiLCJsYWJlbCIsInRpbWVSYW5nZSIsImxpbWFOb3ciLCJwYXJ0cyIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsInRpbWVab25lIiwid2Vla2RheSIsImhvdXIiLCJtaW51dGUiLCJob3VyMTIiLCJmb3JtYXRUb1BhcnRzIiwiRGF0ZSIsImdldCIsImZpbmQiLCJ0eXBlIiwidmFsdWUiLCJpbmRleE9mIiwibWludXRlcyIsIk51bWJlciIsImdldFN0YXR1cyIsInRvZGF5Iiwib3BlbiIsImRldGFpbCIsImZsb29yIiwiZCIsIm5leHQiLCJ3aGVuIiwidG9Mb3dlckNhc2UiLCJwYXVzZWQiLCJzb21lIiwiQTExWV9ERUZBVUxUIiwiY29udHJhc3QiLCJsaW5rcyIsImZvbnQiLCJ0aGVtZSIsInJlYWRBMTF5IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFwcGx5QTExeSIsInJvb3QiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImZvbnRTaXplIiwiZGF0YXNldCIsIkExMXlUb2dnbGUiLCJvbiIsImhpbnQiLCJvbkNoYW5nZSIsInJvbGUiLCJvbkNsaWNrIiwiQTExeVBhbmVsIiwic2V0T3BlbiIsInNldFMiLCJidG5SZWYiLCJwYW5lbFJlZiIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJmb2N1cyIsIm9uS2V5IiwiY29udGFpbnMiLCJ0YXJnZXQiLCJzZXQiLCJrIiwidiIsInRvZ2dsZSIsInNpemUiLCJkaXYiLCJpZCIsInNjYWxlIiwiYW5pbWF0ZSIsImV4aXQiLCJsIiwiRGlnaXQiLCJzcGxpdCIsIkludHJvIiwicGhhc2UiLCJzZXRQaGFzZSIsInNlc3Npb25TdG9yYWdlIiwic2tpcFJlZiIsInJlYWR5IiwibG9hZGVkIiwiUHJvbWlzZSIsIkltYWdlIiwib25sb2FkIiwib25lcnJvciIsInNyYyIsImZvbnRzIiwicmVzb2x2ZSIsImZvckVhY2giLCJ0aGVuIiwibGVuZ3RoIiwiZ2l2ZVVwIiwic2V0VGltZW91dCIsIkRVUiIsInRpbWUiLCJlYXNlZCIsImNsZWFyVGltZW91dCIsImRpZ2l0cyIsInJpZ2h0IiwiY2xpcFBhdGgiLCJOQVYiLCJTY3JvbGxQcm9ncmVzcyIsInNjcm9sbFlQcm9ncmVzcyIsInNjYWxlWCIsInN0aWZmbmVzcyIsImRhbXBpbmciLCJyZXN0RGVsdGEiLCJMb2dvIiwibG9nb1BhdGgiLCJhbHQiLCJIZWFkZXIiLCJzb2xpZCIsInNldFNvbGlkIiwibWVudUJ0biIsIm9uU2Nyb2xsIiwic2Nyb2xsWSIsInBhc3NpdmUiLCJocmVmIiwicmVsIiwibmF2IiwiSGVybyIsInNjZW5lUmVmIiwic2NlbmUiLCJsYXllcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFyc2VGbG9hdCIsImRlcHRoIiwic3kiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGwiLCJsb29wIiwiQXJyYXkiLCJfIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzb2NpYWwiLCJpbnN0YWdyYW1VcmwiLCJnb29nbGVNYXBzVXJsIiwiY2l0eSIsIlJpYmJvbnMiLCJ3b3JkcyIsInJvdyIsInciLCJQYXVzZUljb24iLCJ2aWV3Qm94IiwiZmlsbCIsInJ4IiwiUGxheUdseXBoIiwiQUJPVVRfUkVFTCIsIkFib3V0VmlkZW8iLCJib3hSZWYiLCJtdXRlZCIsInNldE11dGVkIiwic2V0UGF1c2VkIiwicGF1c2VkUmVmIiwibXV0ZWRSZWYiLCJwYXVzZSIsInBsYXkiLCJjYXRjaCIsInBvc3RlciIsInBsYXlzSW5saW5lIiwicHJlbG9hZCIsIkFib3V0IiwiZGVzY3JpcHRpb24iLCJGRUFUVVJFUyIsIldoeVVzIiwibG9hZGluZyIsInVsIiwiSWNvbiIsInRpdGxlIiwibGkiLCJUcmFpbmVyQ2FyZCIsInNsdWciLCJwaG90byIsIlRyYWluZXJzIiwidHJhaW5lcnMiLCJUcmFpbmVyUHJvZmlsZSIsIm90aGVycyIsImZpbHRlciIsIm8iLCJ0YWJJbmRleCIsImJsb2NrcXVvdGUiLCJxdW90ZSIsImRsIiwieWVhcnMiLCJhdGhsZXRlcyIsImJpbyIsInNwZWNpYWx0aWVzIiwic2NoZWR1bGUiLCJvbCIsImhlbHBzIiwiUmVlbHMiLCJyZWVscyIsImFjdGl2ZSIsInNldEFjdGl2ZSIsInZpc2libGUiLCJzZXRWaXNpYmxlIiwidmlkcyIsIndyYXBSZWYiLCJzdGFydFgiLCJnbyIsImN1cnJlbnRUaW1lIiwiaW5zdGFncmFtSGFuZGxlIiwib25LZXlEb3duIiwib25Qb2ludGVyRG93biIsIm9uUG9pbnRlclVwIiwiZHgiLCJvZmYiLCJpc0FjdGl2ZSIsImNvZGUiLCJ6SW5kZXgiLCJwb2ludGVyRXZlbnRzIiwib25FbmRlZCIsInZpZXdzIiwic3RvcFByb3BhZ2F0aW9uIiwiWk9ORVMiLCJpbWciLCJnZWFyIiwiWm9uZXMiLCJ6IiwiYnV0dG9uIiwib25Nb3VzZUVudGVyIiwib25Gb2N1cyIsImciLCJQbGFucyIsInBsYW5zIiwiaXNGZWF0dXJlZCIsInRhZ2xpbmUiLCJjdXJyZW5jeSIsInByaWNlIiwicGVyaW9kIiwiZmVhdHVyZXMiLCJmIiwid2hhdHNhcHBVcmwiLCJidXR0b25UZXh0Iiwic2hvcnRIb3VyIiwibnVtIiwiYW1wbSIsIlRpbWVSYW5nZSIsInNwb2tlbiIsInJlcGxhY2UiLCJTY2hlZHVsZSIsInN0YXR1cyIsInNldFN0YXR1cyIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInN1bmRheSIsImdyb3VwcyIsImRheXMiLCJub3RlIiwiaW5jbHVkZXMiLCJzdGF0dXNOb3RlIiwiQ3RhQmFuZCIsIkNvbnRhY3QiLCJhZGRyZXNzIiwiZGlzcGxheSIsImdvb2dsZU1hcHNFbWJlZFF1ZXJ5IiwicmVmZXJyZXJQb2xpY3kiLCJGb290ZXIiLCJnZXRGdWxsWWVhciIsImxvY2FsQW5zd2VyIiwicSIsImMiLCJ0ZXN0Iiwiam9pbiIsImZvcm1hdHRlZFByaWNlIiwidHIiLCJTVUdHRVNUSU9OUyIsIkNoYXRCb3QiLCJpbnB1dCIsInNldElucHV0IiwiYnVzeSIsInNldEJ1c3kiLCJtc2dzIiwic2V0TXNncyIsImNvbnRlbnQiLCJsaXN0UmVmIiwiaW5wdXRSZWYiLCJzY3JvbGxUbyIsInNjcm9sbEhlaWdodCIsImJlaGF2aW9yIiwiYXNrIiwidHJpbSIsInJlcGx5IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIm1lc3NhZ2VzIiwic2xpY2UiLCJkYXRhIiwianNvbiIsIm9rIiwic2VjdGlvbiIsIm9uU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJwbGFjZWhvbGRlciIsIm1heExlbmd0aCIsImRpc2FibGVkIiwiSG9tZSIsImxvY2F0aW9uIiwiaGFzaCIsInN0YXJ0c1dpdGgiLCJnZXRFbGVtZW50QnlJZCIsInNjcm9sbEludG9WaWV3IiwidXNlSGFzaCIsInNldEhhc2giLCJBcHAiLCJ0cmFpbmVyIiwiRnJhZ21lbnQiLCJjcmVhdGVSb290IiwicmVuZGVyIl0sInNvdXJjZXMiOlsiQXBwLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyA3IFN0cmVuZ3RoIENlbnRlciDigJQgbGFuZGluZyBpbm1lcnNpdmEgY29uIGVmZWN0b3MgM0QuXHJcbi8vIFZlcnNpw7NuIGFudGVyaW9yOiAvcmVzcGFsZG8tdmVyc2lvbi1hbnRlcmlvci9BcHAuanN4XHJcbi8vIFRleHRvcywgcHJlY2lvcywgaG9yYXJpb3MsIHJlZWxzIHkgZW50cmVuYWRvcmVzOiBzcmMvc2l0ZS1jb25maWcuanNcclxuaW1wb3J0IHtcclxuICB1c2VTY3JvbGwsXHJcbiAgdXNlU3ByaW5nLFxyXG4gIG1vdGlvbixcclxuICBSZWFjdCxcclxuICBBbmltYXRlUHJlc2VuY2UsXHJcbiAgTWVudUljb24sXHJcbiAgWEljb24sXHJcbiAgQXJyb3dSaWdodEljb24sXHJcbiAgRHVtYmJlbGxJY29uLFxyXG4gIFRhcmdldEljb24sXHJcbiAgVXNlcnNJY29uLFxyXG4gIFNoaWVsZENoZWNrSWNvbixcclxuICBDbG9ja0ljb24sXHJcbiAgQ2hlY2tJY29uLFxyXG4gIFphcEljb24sXHJcbiAgTWFwUGluSWNvbixcclxuICBQaG9uZUljb24sXHJcbiAgSW5zdGFncmFtSWNvbixcclxuICBNZXNzYWdlQ2lyY2xlSWNvbixcclxuICBBcnJvd1VwSWNvbixcclxuICBDaGV2cm9uTGVmdEljb24sXHJcbiAgQ2hldnJvblJpZ2h0SWNvbixcclxuICBFeHRlcm5hbExpbmtJY29uLFxyXG4gIEV5ZUljb24sXHJcbiAgVm9sdW1lMkljb24sXHJcbiAgVm9sdW1lWEljb24sXHJcbiAgQ2FsZW5kYXJJY29uLFxyXG4gIE5hdmlnYXRpb25JY29uLFxyXG4gIFNwYXJrbGVzSWNvbixcclxuICBBY2Nlc3NpYmlsaXR5SWNvbixcclxuICBSZWFjdERPTSxcclxufSBmcm9tIFwiLi9ydW50aW1lLWltcG9ydHMuanNcIjtcclxuaW1wb3J0IHsgc2l0ZUNvbmZpZyB9IGZyb20gXCIuL3NpdGUtY29uZmlnLmpzXCI7XHJcblxyXG5jb25zdCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlTWVtbyB9ID0gUmVhY3Q7XHJcbmNvbnN0IElNRyA9IHtcclxuICBoZXJvQmc6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlX2NhYjVjYWRiLnBuZ2AsXHJcbiAgaGVybzogYC9hc3NldHMvcGVyc29uYXMvaGVyb2UucG5nYCxcclxuICBpbnRlcmlvcjogYC9hc3NldHMvYWlzdHVkaW8vaW1hZ2VfOTkzZGRiODAucG5nYCxcclxuICByYWNrczogYC9hc3NldHMvYWlzdHVkaW8vaW1hZ2VfZjhhODIwMGEucG5nYCxcclxuICBkaXNjb3M6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlX2U3NjdjM2Q2LnBuZ2AsXHJcbiAgbWFxdWluYXM6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlXzE5YTE1YjQwLnBuZ2AsXHJcbn07XHJcbmNvbnN0IHdhID0gKG1zZyA9IHNpdGVDb25maWcucGhvbmUud2hhdHNhcHBNZXNzYWdlR2VuZXJhbCkgPT5cclxuICBgaHR0cHM6Ly93YS5tZS8ke3NpdGVDb25maWcucGhvbmUucmF3fT90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG1zZyl9YDtcclxuY29uc3QgRUFTRSA9IFswLjIzLCAxLCAwLjMyLCAxXTtcclxuXHJcbi8vIC0tLS0tLS0tLS0gdXRpbGlkYWRlcyBkZSBtb3ZpbWllbnRvIC0tLS0tLS0tLS1cclxuY29uc3QgZmluZVBvaW50ZXIgPSAoKSA9PlxyXG4gIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Lm1hdGNoTWVkaWEoXCIoaG92ZXI6IGhvdmVyKSBhbmQgKHBvaW50ZXI6IGZpbmUpXCIpLm1hdGNoZXM7XHJcbmNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSArIChiIC0gYSkgKiB0O1xyXG5cclxuLy8gSW5jbGluYWNpw7NuIDNEIHF1ZSBzaWd1ZSBhbCBtb3VzZSwgY29uIGluZXJjaWEuXHJcbmZ1bmN0aW9uIHVzZVRpbHQobWF4ID0gMTApIHtcclxuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsIHx8ICFmaW5lUG9pbnRlcigpKSByZXR1cm47XHJcbiAgICBjb25zdCBnbGFyZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgPiAuZ2xhcmVcIik7XHJcbiAgICBsZXQgcmFmID0gMCwgdHggPSAwLCB0eSA9IDAsIGN4ID0gMCwgY3kgPSAwLCBneCA9IDUwLCBneSA9IDUwO1xyXG4gICAgY29uc3QgdGljayA9ICgpID0+IHtcclxuICAgICAgY3ggPSBsZXJwKGN4LCB0eCwgMC4xNCk7XHJcbiAgICAgIGN5ID0gbGVycChjeSwgdHksIDAuMTQpO1xyXG4gICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVYKCR7Y3kudG9GaXhlZCgyKX1kZWcpIHJvdGF0ZVkoJHtjeC50b0ZpeGVkKDIpfWRlZylgO1xyXG4gICAgICBpZiAoZ2xhcmUpIGdsYXJlLnN0eWxlLmJhY2tncm91bmQgPSBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAke2d4fSUgJHtneX0lLCByZ2JhKDI1NSwyNTUsMjU1LDAuMTYpLCB0cmFuc3BhcmVudCA1NSUpYDtcclxuICAgICAgcmFmID0gTWF0aC5hYnMoY3ggLSB0eCkgPiAwLjAxIHx8IE1hdGguYWJzKGN5IC0gdHkpID4gMC4wMSA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qga2ljayA9ICgpID0+IHsgaWYgKCFyYWYpIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTsgfTtcclxuICAgIGNvbnN0IG1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICBpZiAobW90aW9uUmVkdWNlZCgpKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgcHggPSAoZS5jbGllbnRYIC0gci5sZWZ0KSAvIHIud2lkdGgsIHB5ID0gKGUuY2xpZW50WSAtIHIudG9wKSAvIHIuaGVpZ2h0O1xyXG4gICAgICB0eCA9IChweCAtIDAuNSkgKiAyICogbWF4O1xyXG4gICAgICB0eSA9ICgwLjUgLSBweSkgKiAyICogbWF4O1xyXG4gICAgICBneCA9IE1hdGgucm91bmQocHggKiAxMDApOyBneSA9IE1hdGgucm91bmQocHkgKiAxMDApO1xyXG4gICAgICBraWNrKCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgbGVhdmUgPSAoKSA9PiB7IHR4ID0gMDsgdHkgPSAwOyBraWNrKCk7IH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmxlYXZlXCIsIGxlYXZlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XHJcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTtcclxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBsZWF2ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFttYXhdKTtcclxuICByZXR1cm4gcmVmO1xyXG59XHJcbmNvbnN0IFRpbHQgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gXCJcIiwgbWF4LCBhcyA9IFwiZGl2XCIsIC4uLnJlc3QgfSkgPT4ge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVRpbHQobWF4KTtcclxuICBjb25zdCBUYWcgPSBhcztcclxuICByZXR1cm4gKFxyXG4gICAgPFRhZyByZWY9e3JlZn0gY2xhc3NOYW1lPXtgdGlsdCAke2NsYXNzTmFtZX1gfSB7Li4ucmVzdH0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2xhcmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgPC9UYWc+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEJvdMOzbiBcIm1hZ27DqXRpY29cIjogc2UgYWNlcmNhIHVuIHBvY28gYWwgY3Vyc29yLlxyXG5mdW5jdGlvbiBNYWduZXRpYyh7IGNoaWxkcmVuLCBjbGFzc05hbWUgPSBcIlwiLCAuLi5yZXN0IH0pIHtcclxuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsIHx8ICFmaW5lUG9pbnRlcigpKSByZXR1cm47XHJcbiAgICBjb25zdCBtb3ZlID0gKGUpID0+IHtcclxuICAgICAgY29uc3QgciA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCB4ID0gKGUuY2xpZW50WCAtIChyLmxlZnQgKyByLndpZHRoIC8gMikpICogMC4yNTtcclxuICAgICAgY29uc3QgeSA9IChlLmNsaWVudFkgLSAoci50b3AgKyByLmhlaWdodCAvIDIpKSAqIDAuMzU7XHJcbiAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcclxuICAgIH07XHJcbiAgICBjb25zdCBsZWF2ZSA9ICgpID0+IHsgZWwuc3R5bGUudHJhbnNmb3JtID0gXCJcIjsgfTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybGVhdmVcIiwgbGVhdmUpO1xyXG4gICAgcmV0dXJuICgpID0+IHsgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG1vdmUpOyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmxlYXZlXCIsIGxlYXZlKTsgfTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIDxhIHJlZj17cmVmfSBjbGFzc05hbWU9e2BtYWduZXRpYyAke2NsYXNzTmFtZX1gfSB7Li4ucmVzdH0+e2NoaWxkcmVufTwvYT47XHJcbn1cclxuXHJcbmNvbnN0IHJldmVhbCA9IHtcclxuICBoaWRkZW46IHsgb3BhY2l0eTogMCwgeTogMzYgfSxcclxuICBzaG93OiB7IG9wYWNpdHk6IDEsIHk6IDAsIHRyYW5zaXRpb246IHsgZHVyYXRpb246IDAuNywgZWFzZTogRUFTRSB9IH0sXHJcbn07XHJcbmNvbnN0IHN0YWdnZXIgPSB7IGhpZGRlbjoge30sIHNob3c6IHsgdHJhbnNpdGlvbjogeyBzdGFnZ2VyQ2hpbGRyZW46IDAuMDggfSB9IH07XHJcbmNvbnN0IGluVmlldyA9IHsgaW5pdGlhbDogXCJoaWRkZW5cIiwgd2hpbGVJblZpZXc6IFwic2hvd1wiLCB2aWV3cG9ydDogeyBvbmNlOiB0cnVlLCBhbW91bnQ6IDAuMiB9IH07XHJcbmNvbnN0IFJldmVhbCA9ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGFzID0gXCJkaXZcIiwgZGVsYXkgPSAwIH0pID0+IHtcclxuICBjb25zdCBUYWcgPSBtb3Rpb25bYXNdO1xyXG4gIHJldHVybiAoXHJcbiAgICA8VGFnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2YXJpYW50cz17cmV2ZWFsfSB7Li4uaW5WaWV3fSB0cmFuc2l0aW9uPXt7IGRlbGF5IH19PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L1RhZz5cclxuICApO1xyXG59O1xyXG5cclxuLy8gVMOtdHVsbyBkZSBzZWNjacOzbiBxdWUgc3ViZSBkZXNkZSB1bmEgbcOhc2NhcmEuXHJcbmZ1bmN0aW9uIFRpdGxlKHsgY2hpbGRyZW4sIGFjY2VudCwgY2VudGVyLCBsZWFkIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2B0aXRsZS1ibG9jayR7Y2VudGVyID8gXCIgY2VudGVyXCIgOiBcIlwifWB9PlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICA8bW90aW9uLnNwYW4gY2xhc3NOYW1lPVwibWFza1wiIGluaXRpYWw9XCJoaWRkZW5cIiB3aGlsZUluVmlldz1cInNob3dcIiB2aWV3cG9ydD17eyBvbmNlOiB0cnVlLCBhbW91bnQ6IDAuNSB9fT5cclxuICAgICAgICAgIDxtb3Rpb24uc3BhblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYXNrLWlubmVyXCJcclxuICAgICAgICAgICAgdmFyaWFudHM9e3sgaGlkZGVuOiB7IHk6IFwiMTA1JVwiIH0sIHNob3c6IHsgeTogXCIwJVwiLCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjgsIGVhc2U6IEVBU0UgfSB9IH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn0ge2FjY2VudCAmJiA8ZW0+e2FjY2VudH08L2VtPn1cclxuICAgICAgICAgIDwvbW90aW9uLnNwYW4+XHJcbiAgICAgICAgPC9tb3Rpb24uc3Bhbj5cclxuICAgICAgPC9oMj5cclxuICAgICAge2xlYWQgJiYgPFJldmVhbCBhcz1cInBcIiBjbGFzc05hbWU9XCJsZWFkLXRleHRcIiBkZWxheT17MC4xNX0+e2xlYWR9PC9SZXZlYWw+fVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gVMOtdHVsbyBxdWUgYXBhcmVjZSBsZXRyYSBwb3IgbGV0cmEgZW4gM0QuXHJcbmNvbnN0IFNwbGl0VGV4dCA9ICh7IHRleHQsIGNsYXNzTmFtZSA9IFwiXCIsIGRlbGF5ID0gMCB9KSA9PiAoXHJcbiAgPHNwYW4gY2xhc3NOYW1lPXtgc3BsaXQgJHtjbGFzc05hbWV9YH0gYXJpYS1sYWJlbD17dGV4dH0+XHJcbiAgICB7Wy4uLnRleHRdLm1hcCgoY2gsIGkpID0+IChcclxuICAgICAgPHNwYW4ga2V5PXtpfSBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBhbmltYXRpb25EZWxheTogYCR7ZGVsYXkgKyBpICogMC4wM31zYCB9fT5cclxuICAgICAgICB7Y2ggPT09IFwiIFwiID8gXCLCoFwiIDogY2h9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICkpfVxyXG4gIDwvc3Bhbj5cclxuKTtcclxuXHJcbi8vIE7Dum1lcm8gcXVlIGN1ZW50YSBoYWNpYSBhcnJpYmEgY3VhbmRvIGFwYXJlY2UuXHJcbmZ1bmN0aW9uIENvdW50VXAoeyB0bywgc3VmZml4ID0gXCJcIiB9KSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IFtuLCBzZXROXSA9IHVzZVN0YXRlKDApO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlbnRyeV0pID0+IHtcclxuICAgICAgaWYgKCFlbnRyeS5pc0ludGVyc2VjdGluZykgcmV0dXJuO1xyXG4gICAgICBpby5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCksIGR1ciA9IDE0MDA7XHJcbiAgICAgIGNvbnN0IHN0ZXAgPSAodCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHAgPSBNYXRoLm1pbigodCAtIHN0YXJ0KSAvIGR1ciwgMSk7XHJcbiAgICAgICAgc2V0TihNYXRoLnJvdW5kKHRvICogKDEgLSBNYXRoLnBvdygxIC0gcCwgNCkpKSk7XHJcbiAgICAgICAgaWYgKHAgPCAxKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcclxuICAgIH0sIHsgdGhyZXNob2xkOiAwLjYgfSk7XHJcbiAgICBpby5vYnNlcnZlKGVsKTtcclxuICAgIHJldHVybiAoKSA9PiBpby5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW3RvXSk7XHJcbiAgcmV0dXJuIDxzcGFuIHJlZj17cmVmfSBjbGFzc05hbWU9XCJudW1cIj57bn17c3VmZml4fTwvc3Bhbj47XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gaG9yYXJpb3M6IGVzdGFkbyBlbiB2aXZvIChob3JhIGRlIExpbWEpIC0tLS0tLS0tLS1cclxuY29uc3QgREFZX05BTUVTID0gW1wiRG9taW5nb1wiLCBcIkx1bmVzXCIsIFwiTWFydGVzXCIsIFwiTWnDqXJjb2xlc1wiLCBcIkp1ZXZlc1wiLCBcIlZpZXJuZXNcIiwgXCJTw6FiYWRvXCJdO1xyXG5jb25zdCBmbXRUaW1lID0gKGgsIG0gPSAwKSA9PiB7XHJcbiAgY29uc3Qgc3VmZml4ID0gaCA8IDEyID8gXCJhLiBtLlwiIDogXCJwLiBtLlwiO1xyXG4gIGNvbnN0IGhoID0gaCAlIDEyID09PSAwID8gMTIgOiBoICUgMTI7XHJcbiAgcmV0dXJuIGAke2hofToke1N0cmluZyhtKS5wYWRTdGFydCgyLCBcIjBcIil9ICR7c3VmZml4fWA7XHJcbn07XHJcbi8vIFwiYSBsYSAxOjAwIHAuIG0uXCIgcGVybyBcImEgbGFzIDk6MDAgcC4gbS5cIlxyXG5jb25zdCBhdFRpbWUgPSAoaCwgbSA9IDApID0+IGAke2ggJSAxMiA9PT0gMSA/IFwiYSBsYVwiIDogXCJhIGxhc1wifSAke2ZtdFRpbWUoaCwgbSl9YDtcclxuY29uc3Qgc2hpZnRzRm9yID0gKGRheSkgPT4ge1xyXG4gIGNvbnN0IHsgd2Vla2RheXMsIHNhdHVyZGF5IH0gPSBzaXRlQ29uZmlnLmhvdXJzO1xyXG4gIGlmIChkYXkgPT09IDApIHJldHVybiBbXTtcclxuICByZXR1cm4gKGRheSA9PT0gNiA/IHNhdHVyZGF5LnNoaWZ0cyA6IHdlZWtkYXlzLnNoaWZ0cykubWFwKChzKSA9PiAoe1xyXG4gICAgZnJvbTogcy5vcGVuSG91ciAqIDYwICsgcy5vcGVuTWludXRlLFxyXG4gICAgdG86IHMuY2xvc2VIb3VyICogNjAgKyBzLmNsb3NlTWludXRlLFxyXG4gICAgbmFtZTogcy5uYW1lLFxyXG4gICAgbGFiZWw6IHMudGltZVJhbmdlLFxyXG4gIH0pKTtcclxufTtcclxuZnVuY3Rpb24gbGltYU5vdygpIHtcclxuICBjb25zdCBwYXJ0cyA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIiwge1xyXG4gICAgdGltZVpvbmU6IFwiQW1lcmljYS9MaW1hXCIsIHdlZWtkYXk6IFwic2hvcnRcIiwgaG91cjogXCJudW1lcmljXCIsIG1pbnV0ZTogXCJudW1lcmljXCIsIGhvdXIxMjogZmFsc2UsXHJcbiAgfSkuZm9ybWF0VG9QYXJ0cyhuZXcgRGF0ZSgpKTtcclxuICBjb25zdCBnZXQgPSAodCkgPT4gcGFydHMuZmluZCgocCkgPT4gcC50eXBlID09PSB0KT8udmFsdWU7XHJcbiAgY29uc3QgZGF5ID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLmluZGV4T2YoZ2V0KFwid2Vla2RheVwiKSk7XHJcbiAgcmV0dXJuIHsgZGF5LCBtaW51dGVzOiAoTnVtYmVyKGdldChcImhvdXJcIikpICUgMjQpICogNjAgKyBOdW1iZXIoZ2V0KFwibWludXRlXCIpKSB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldFN0YXR1cygpIHtcclxuICBjb25zdCB7IGRheSwgbWludXRlcyB9ID0gbGltYU5vdygpO1xyXG4gIGNvbnN0IHRvZGF5ID0gc2hpZnRzRm9yKGRheSk7XHJcbiAgY29uc3QgY3VycmVudCA9IHRvZGF5LmZpbmQoKHMpID0+IG1pbnV0ZXMgPj0gcy5mcm9tICYmIG1pbnV0ZXMgPCBzLnRvKTtcclxuICBpZiAoY3VycmVudCkge1xyXG4gICAgY29uc3QgbGVmdCA9IGN1cnJlbnQudG8gLSBtaW51dGVzO1xyXG4gICAgcmV0dXJuIHsgb3BlbjogdHJ1ZSwgZGF5LCBtaW51dGVzLCBsYWJlbDogXCJBYmllcnRvIGFob3JhXCIsIGRldGFpbDogYENpZXJyYSAke2F0VGltZShNYXRoLmZsb29yKGN1cnJlbnQudG8gLyA2MCksIGN1cnJlbnQudG8gJSA2MCl9JHtsZWZ0IDw9IDYwID8gYCDCtyBxdWVkYW4gJHtsZWZ0fSBtaW5gIDogXCJcIn1gIH07XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICBjb25zdCBkID0gKGRheSArIGkpICUgNztcclxuICAgIGNvbnN0IG5leHQgPSBzaGlmdHNGb3IoZCkuZmluZCgocykgPT4gaSA+IDAgfHwgcy5mcm9tID4gbWludXRlcyk7XHJcbiAgICBpZiAobmV4dCkge1xyXG4gICAgICBjb25zdCB3aGVuID0gaSA9PT0gMCA/IFwiaG95XCIgOiBpID09PSAxID8gXCJtYcOxYW5hXCIgOiBgZWwgJHtEQVlfTkFNRVNbZF0udG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgICBjb25zdCBwYXVzZWQgPSBpID09PSAwICYmIHRvZGF5LnNvbWUoKHMpID0+IHMudG8gPD0gbWludXRlcyk7XHJcbiAgICAgIHJldHVybiB7IG9wZW46IGZhbHNlLCBkYXksIG1pbnV0ZXMsIGxhYmVsOiBwYXVzZWQgPyBcIkVuIHBhdXNhXCIgOiBcIkNlcnJhZG8gYWhvcmFcIiwgZGV0YWlsOiBgQWJyZSAke3doZW59ICR7YXRUaW1lKE1hdGguZmxvb3IobmV4dC5mcm9tIC8gNjApLCBuZXh0LmZyb20gJSA2MCl9YCB9O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4geyBvcGVuOiBmYWxzZSwgZGF5LCBtaW51dGVzLCBsYWJlbDogXCJDZXJyYWRvXCIsIGRldGFpbDogXCJDb25zdWx0YSBwb3IgV2hhdHNBcHBcIiB9O1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIGludHJvIHkgY3Vyc29yIC0tLS0tLS0tLS1cclxuLy8gLS0tLS0tLS0tLSBBQ0NFU0lCSUxJREFEOiBwcmVmZXJlbmNpYXMgZGVsIHZpc2l0YW50ZSAtLS0tLS0tLS0tXHJcbmNvbnN0IEExMVlfREVGQVVMVCA9IHsgdGV4dDogMCwgY29udHJhc3Q6IGZhbHNlLCBsaW5rczogZmFsc2UsIG1vdGlvbjogZmFsc2UsIGZvbnQ6IGZhbHNlLCB0aGVtZTogXCJkYXJrXCIgfTtcclxuZnVuY3Rpb24gcmVhZEExMXkoKSB7XHJcbiAgdHJ5IHsgcmV0dXJuIHsgLi4uQTExWV9ERUZBVUxULCAuLi5KU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWNjZXNpYmlsaWRhZFwiKSB8fCBcInt9XCIpIH07IH0gY2F0Y2ggeyByZXR1cm4geyAuLi5BMTFZX0RFRkFVTFQgfTsgfVxyXG59XHJcbmZ1bmN0aW9uIGFwcGx5QTExeShzKSB7XHJcbiAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICByb290LnN0eWxlLmZvbnRTaXplID0gW1wiMTAwJVwiLCBcIjExMi41JVwiLCBcIjEyNSVcIiwgXCIxMzcuNSVcIl1bcy50ZXh0XSB8fCBcIjEwMCVcIjtcclxuICByb290LmRhdGFzZXQuY29udHJhc3QgPSBzLmNvbnRyYXN0ID8gXCJoaWdoXCIgOiBcIlwiO1xyXG4gIHJvb3QuZGF0YXNldC5saW5rcyA9IHMubGlua3MgPyBcInVuZGVybGluZVwiIDogXCJcIjtcclxuICByb290LmRhdGFzZXQubW90aW9uID0gcy5tb3Rpb24gPyBcInJlZHVjZVwiIDogXCJcIjtcclxuICByb290LmRhdGFzZXQuZm9udCA9IHMuZm9udCA/IFwicmVhZGFibGVcIiA6IFwiXCI7XHJcbiAgcm9vdC5kYXRhc2V0LnRoZW1lID0gcy50aGVtZSA9PT0gXCJsaWdodFwiID8gXCJsaWdodFwiIDogXCJkYXJrXCI7XHJcbn1cclxuLy8gU2UgYXBsaWNhIGFudGVzIGRlIHBpbnRhciBsYSBww6FnaW5hIHBhcmEgZXZpdGFyIHBhcnBhZGVvcy5cclxuYXBwbHlBMTF5KHJlYWRBMTF5KCkpO1xyXG5jb25zdCBtb3Rpb25SZWR1Y2VkID0gKCkgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQubW90aW9uID09PSBcInJlZHVjZVwiO1xyXG5cclxuZnVuY3Rpb24gQTExeVRvZ2dsZSh7IG9uLCBsYWJlbCwgaGludCwgb25DaGFuZ2UgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiByb2xlPVwic3dpdGNoXCIgYXJpYS1jaGVja2VkPXtvbn0gY2xhc3NOYW1lPXtgYTExeS10b2dnbGUke29uID8gXCIgb25cIiA6IFwiXCJ9YH0gb25DbGljaz17b25DaGFuZ2V9PlxyXG4gICAgICA8c3Bhbj48c3Ryb25nPntsYWJlbH08L3N0cm9uZz48c21hbGw+e2hpbnR9PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgIDxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBMTF5UGFuZWwoKSB7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzLCBzZXRTXSA9IHVzZVN0YXRlKHJlYWRBMTF5KTtcclxuICBjb25zdCBidG5SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGFwcGx5QTExeShzKTtcclxuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWNjZXNpYmlsaWRhZFwiLCBKU09OLnN0cmluZ2lmeShzKSk7IH0gY2F0Y2gge31cclxuICB9LCBbc10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4pIHJldHVybjtcclxuICAgIHBhbmVsUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik/LmZvY3VzKCk7XHJcbiAgICBjb25zdCBvbktleSA9IChlKSA9PiB7IGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgeyBzZXRPcGVuKGZhbHNlKTsgYnRuUmVmLmN1cnJlbnQ/LmZvY3VzKCk7IH0gfTtcclxuICAgIGNvbnN0IG9uQ2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICBpZiAoIXBhbmVsUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGUudGFyZ2V0KSAmJiAhYnRuUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGUudGFyZ2V0KSkgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uQ2xpY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHsgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpOyByZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25DbGljayk7IH07XHJcbiAgfSwgW29wZW5dKTtcclxuICBjb25zdCBzZXQgPSAoaywgdikgPT4gc2V0UygocCkgPT4gKHsgLi4ucCwgW2tdOiB2IH0pKTtcclxuICBjb25zdCB0b2dnbGUgPSAoaywgbGFiZWwsIGhpbnQpID0+IDxBMTF5VG9nZ2xlIG9uPXtzW2tdfSBsYWJlbD17bGFiZWx9IGhpbnQ9e2hpbnR9IG9uQ2hhbmdlPXsoKSA9PiBzZXQoaywgIXNba10pfSAvPjtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhMTF5XCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICByZWY9e2J0blJlZn1cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJhMTF5LWJ0blwiXHJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICBhcmlhLWNvbnRyb2xzPVwicGFuZWwtYWNjZXNpYmlsaWRhZFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIk9wY2lvbmVzIGRlIGFjY2VzaWJpbGlkYWRcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oIW9wZW4pfVxyXG4gICAgICA+XHJcbiAgICAgICAgPEFjY2Vzc2liaWxpdHlJY29uIHNpemU9ezIyfSAvPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cclxuICAgICAgICB7b3BlbiAmJiAoXHJcbiAgICAgICAgICA8bW90aW9uLmRpdlxyXG4gICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICAgICAgICBpZD1cInBhbmVsLWFjY2VzaWJpbGlkYWRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhMTF5LXBhbmVsIGdsYXNzXCJcclxuICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJPcGNpb25lcyBkZSBhY2Nlc2liaWxpZGFkXCJcclxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAtOCwgc2NhbGU6IDAuOTcgfX1cclxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwLCBzY2FsZTogMSwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yLCBlYXNlOiBFQVNFIH0gfX1cclxuICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAtNiwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4xMiB9IH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImExMXktdGl0bGVcIj5BY2Nlc2liaWxpZGFkPC9wPlxyXG4gICAgICAgICAgICA8QTExeVRvZ2dsZVxyXG4gICAgICAgICAgICAgIG9uPXtzLnRoZW1lID09PSBcImRhcmtcIn1cclxuICAgICAgICAgICAgICBsYWJlbD1cIk1vZG8gb3NjdXJvXCJcclxuICAgICAgICAgICAgICBoaW50PVwiQWx0ZXJuYSBlbnRyZSBlbCBtb2RvIG9zY3VybyB5IGVsIG1vZG8gY2xhcm9cIlxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXQoXCJ0aGVtZVwiLCBzLnRoZW1lID09PSBcImRhcmtcIiA/IFwibGlnaHRcIiA6IFwiZGFya1wiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhMTF5LXNpemVcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiVGFtYcOxbyBkZWwgdGV4dG9cIj5cclxuICAgICAgICAgICAgICA8c3Bhbj5UYW1hw7FvIGRlbCB0ZXh0bzwvc3Bhbj5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge1tcIkFcIiwgXCJBK1wiLCBcIkErK1wiLCBcIkErKytcIl0ubWFwKChsLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtsfSB0eXBlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPXtzLnRleHQgPT09IGl9IGFyaWEtbGFiZWw9e1tcIk5vcm1hbFwiLCBcIkdyYW5kZVwiLCBcIk11eSBncmFuZGVcIiwgXCJNw6F4aW1vXCJdW2ldfSBvbkNsaWNrPXsoKSA9PiBzZXQoXCJ0ZXh0XCIsIGkpfT57bH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge3RvZ2dsZShcImNvbnRyYXN0XCIsIFwiQWx0byBjb250cmFzdGVcIiwgXCJUZXh0byBtw6FzIGNsYXJvIHkgZm9uZG9zIHPDs2xpZG9zXCIpfVxyXG4gICAgICAgICAgICB7dG9nZ2xlKFwibGlua3NcIiwgXCJTdWJyYXlhciBlbmxhY2VzXCIsIFwiRGlzdGluZ3VlIGxvcyBlbmxhY2VzIGRlbCB0ZXh0b1wiKX1cclxuICAgICAgICAgICAge3RvZ2dsZShcImZvbnRcIiwgXCJMZXRyYSBmw6FjaWwgZGUgbGVlclwiLCBcIkNhbWJpYSBsb3MgdMOtdHVsb3MgYSB1bmEgbGV0cmEgc2ltcGxlXCIpfVxyXG4gICAgICAgICAgICB7dG9nZ2xlKFwibW90aW9uXCIsIFwiRGV0ZW5lciBhbmltYWNpb25lc1wiLCBcIlF1aXRhIG1vdmltaWVudG9zIHkgbGEgaW50cm9cIil9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImExMXktcmVzZXRcIiBvbkNsaWNrPXsoKSA9PiBzZXRTKHsgLi4uQTExWV9ERUZBVUxUIH0pfT5SZXN0YWJsZWNlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBJTlRSTzogY29udGFkb3IgMDAw4oaSMTAwIHF1ZSBzZSBsbGVuYSwgcGFsYWJyYSBxdWUgc2UgcGFydGUgZW4gZG9zIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gRGlnaXQoeyB2YWx1ZSB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9kb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJvZG8tc3RyaXBcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7LXZhbHVlICogMTB9JSlgIH19PlxyXG4gICAgICAgIHtcIjAxMjM0NTY3ODlcIi5zcGxpdChcIlwiKS5tYXAoKGQpID0+IDxzcGFuIGtleT17ZH0+e2R9PC9zcGFuPil9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIEludHJvKCkge1xyXG4gIGNvbnN0IFtwaGFzZSwgc2V0UGhhc2VdID0gdXNlU3RhdGUoKCkgPT4ge1xyXG4gICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgcmV0dXJuIFwiZG9uZVwiO1xyXG4gICAgdHJ5IHsgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJpbnRyby12aXN0YVwiKSA/IFwiZG9uZVwiIDogXCJjb3VudFwiOyB9IGNhdGNoIHsgcmV0dXJuIFwiY291bnRcIjsgfVxyXG4gIH0pO1xyXG4gIGNvbnN0IFtuLCBzZXROXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IHNraXBSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocGhhc2UgPT09IFwiZG9uZVwiIHx8IHBoYXNlID09PSBcInNwbGl0XCIpIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LnJlYWR5ID0gXCIxXCI7XHJcbiAgICBpZiAocGhhc2UgPT09IFwiZG9uZVwiKSB7IHRyeSB7IHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJpbnRyby12aXN0YVwiLCBcIjFcIik7IH0gY2F0Y2gge30gfVxyXG4gIH0sIFtwaGFzZV0pO1xyXG5cclxuICAvLyBDb250YWRvcjogYXZhbnphIGNvbiBlbCB0aWVtcG8sIHBlcm8gZXNwZXJhIGEgcXVlIGNhcmd1ZW4gbGEgZm90byBwcmluY2lwYWwgeSBsYSB0aXBvZ3JhZsOtYS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBoYXNlICE9PSBcImNvdW50XCIpIHJldHVybjtcclxuICAgIGxldCBsb2FkZWQgPSAwLjE1LCByYWY7XHJcbiAgICBjb25zdCBwYXJ0cyA9IFtcclxuICAgICAgbmV3IFByb21pc2UoKHIpID0+IHsgY29uc3QgaSA9IG5ldyBJbWFnZSgpOyBpLm9ubG9hZCA9IGkub25lcnJvciA9IHI7IGkuc3JjID0gSU1HLmhlcm87IH0pLFxyXG4gICAgICBuZXcgUHJvbWlzZSgocikgPT4geyBjb25zdCBpID0gbmV3IEltYWdlKCk7IGkub25sb2FkID0gaS5vbmVycm9yID0gcjsgaS5zcmMgPSBJTUcuaGVyb0JnOyB9KSxcclxuICAgICAgZG9jdW1lbnQuZm9udHMgPyBkb2N1bWVudC5mb250cy5yZWFkeSA6IFByb21pc2UucmVzb2x2ZSgpLFxyXG4gICAgXTtcclxuICAgIHBhcnRzLmZvckVhY2goKHApID0+IHAudGhlbigoKSA9PiB7IGxvYWRlZCArPSAwLjg1IC8gcGFydHMubGVuZ3RoOyB9KSk7XHJcbiAgICBjb25zdCBnaXZlVXAgPSBzZXRUaW1lb3V0KCgpID0+IHsgbG9hZGVkID0gMTsgfSwgNTAwMCk7XHJcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpLCBEVVIgPSAxOTAwO1xyXG4gICAgY29uc3QgdGljayA9ICh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLm1pbigodCAtIHN0YXJ0KSAvIERVUiwgMSk7XHJcbiAgICAgIGNvbnN0IGVhc2VkID0gdGltZSA8IDAuNSA/IDQgKiB0aW1lICoqIDMgOiAxIC0gKC0yICogdGltZSArIDIpICoqIDMgLyAyO1xyXG4gICAgICBjb25zdCB2ID0gTWF0aC5yb3VuZChNYXRoLm1pbihlYXNlZCwgbG9hZGVkKSAqIDEwMCk7XHJcbiAgICAgIHNldE4odik7XHJcbiAgICAgIGlmICh2ID49IDEwMCkgc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcIndvcmRcIiksIDIwMCk7XHJcbiAgICAgIGVsc2UgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG4gICAgfTtcclxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7IGNsZWFyVGltZW91dChnaXZlVXApOyB9O1xyXG4gIH0sIFtwaGFzZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBoYXNlID09PSBcIndvcmRcIikgeyBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcInNwbGl0XCIpLCA5MDApOyByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpOyB9XHJcbiAgICBpZiAocGhhc2UgPT09IFwic3BsaXRcIikgeyBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBzZXRQaGFzZShcImRvbmVcIiksIDExMDApOyByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpOyB9XHJcbiAgfSwgW3BoYXNlXSk7XHJcblxyXG4gIGlmIChwaGFzZSA9PT0gXCJkb25lXCIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGRpZ2l0cyA9IFN0cmluZyhuKS5wYWRTdGFydCgzLCBcIjBcIikuc3BsaXQoXCJcIikubWFwKE51bWJlcik7XHJcbiAgY29uc3QgbGVmdCA9IFwiU0lOXCIsIHJpZ2h0ID0gXCJMw41NSVRFU1wiO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGludHJvIGludHJvLSR7cGhhc2V9YH0gcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9XCJDYXJnYW5kbyA3IFN0cmVuZ3RoIENlbnRlclwiPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1saW5lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyby1oYWxmIGludHJvLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICB7cGhhc2UgIT09IFwiY291bnRcIiAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby13b3JkXCI+XHJcbiAgICAgICAgICAgIHtbLi4ubGVmdF0ubWFwKChjaCwgaSkgPT4gPHNwYW4ga2V5PXtpfSBzdHlsZT17eyBhbmltYXRpb25EZWxheTogYCR7aSAqIDAuMDV9c2AgfX0+e2NofTwvc3Bhbj4pfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLWhhbGYgaW50cm8tcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICB7cGhhc2UgIT09IFwiY291bnRcIiAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby13b3JkXCI+XHJcbiAgICAgICAgICAgIHtbLi4ucmlnaHRdLm1hcCgoY2gsIGkpID0+IDxzcGFuIGtleT17aX0gc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IGAkezAuMTUgKyBpICogMC4wNX1zYCB9fT57Y2h9PC9zcGFuPil9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtwaGFzZSA9PT0gXCJjb3VudFwiICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLWNvdW50ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImludHJvLWxhYmVsXCI+Q2FyZ2FuZG88L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludHJvLW51bVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1vdXRsaW5lXCI+e2RpZ2l0cy5tYXAoKGQsIGkpID0+IDxEaWdpdCBrZXk9e2l9IHZhbHVlPXtkfSAvPil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1maWxsXCIgc3R5bGU9e3sgY2xpcFBhdGg6IGBpbnNldCgkezEwMCAtIG59JSAwIDAgMClgIH19PntkaWdpdHMubWFwKChkLCBpKSA9PiA8RGlnaXQga2V5PXtpfSB2YWx1ZT17ZH0gLz4pfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8tbGFiZWwgcmlnaHRcIj43IFN0cmVuZ3RoPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICA8YnV0dG9uIHJlZj17c2tpcFJlZn0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImludHJvLXNraXBcIiBvbkNsaWNrPXsoKSA9PiBzZXRQaGFzZShcImRvbmVcIil9PlNhbHRhciBpbnRybzwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgTkFWID0gW1xyXG4gIFtcIk5vc290cm9zXCIsIFwiI25vc290cm9zXCJdLFxyXG4gIFtcIkVudHJlbmFkb3Jlc1wiLCBcIiNlbnRyZW5hZG9yZXNcIl0sXHJcbiAgW1wiUmVlbHNcIiwgXCIjcmVlbHNcIl0sXHJcbiAgW1wiWm9uYXNcIiwgXCIjem9uYXNcIl0sXHJcbiAgW1wiUGxhbmVzXCIsIFwiI3BsYW5lc1wiXSxcclxuICBbXCJIb3Jhcmlvc1wiLCBcIiNob3Jhcmlvc1wiXSxcclxuICBbXCJDb250YWN0b1wiLCBcIiNjb250YWN0b1wiXSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKCkge1xyXG4gIGNvbnN0IHsgc2Nyb2xsWVByb2dyZXNzIH0gPSB1c2VTY3JvbGwoKTtcclxuICBjb25zdCBzY2FsZVggPSB1c2VTcHJpbmcoc2Nyb2xsWVByb2dyZXNzLCB7IHN0aWZmbmVzczogMTIwLCBkYW1waW5nOiAzMCwgcmVzdERlbHRhOiAwLjAwMSB9KTtcclxuICByZXR1cm4gPG1vdGlvbi5kaXYgY2xhc3NOYW1lPVwic2Nyb2xsLXByb2dyZXNzXCIgc3R5bGU9e3sgc2NhbGVYIH19IC8+O1xyXG59XHJcblxyXG5mdW5jdGlvbiBMb2dvKHsgc2l6ZSA9IDQ4IH0pIHtcclxuICByZXR1cm4gPGltZyBjbGFzc05hbWU9XCJsb2dvXCIgc3JjPXtzaXRlQ29uZmlnLmxvZ29QYXRofSBhbHQ9XCJcIiB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSAvPjtcclxufVxyXG5cclxuZnVuY3Rpb24gSGVhZGVyKCkge1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc29saWQsIHNldFNvbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBtZW51QnRuID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHNldFNvbGlkKHdpbmRvdy5zY3JvbGxZID4gNDApO1xyXG4gICAgb25TY3JvbGwoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gIH0sIFtdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBvbktleSA9IChlKSA9PiB7IGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikgeyBzZXRPcGVuKGZhbHNlKTsgbWVudUJ0bi5jdXJyZW50Py5mb2N1cygpOyB9IH07XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7XHJcbiAgICByZXR1cm4gKCkgPT4gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gIH0sIFtvcGVuXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtgaGVhZGVyJHtzb2xpZCA/IFwiIHNvbGlkXCIgOiBcIlwifWB9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBoZWFkZXItaW5uZXJcIj5cclxuICAgICAgICA8YSBocmVmPVwiI2luaWNpb1wiIGNsYXNzTmFtZT1cImJyYW5kXCIgYXJpYS1sYWJlbD1cIjcgU3RyZW5ndGggQ2VudGVyLCBpciBhbCBpbmljaW9cIj5cclxuICAgICAgICAgIDxMb2dvIC8+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj43IDxiPlN0cmVuZ3RoPC9iPjwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXYtZGVza3RvcFwiIGFyaWEtbGFiZWw9XCJQcmluY2lwYWxcIj5cclxuICAgICAgICAgIHtOQVYubWFwKChbbGFiZWwsIGhyZWZdKSA9PiA8YSBrZXk9e2hyZWZ9IGhyZWY9e2hyZWZ9PntsYWJlbH08L2E+KX1cclxuICAgICAgICA8L25hdj5cclxuICAgICAgICA8QTExeVBhbmVsIC8+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBoaWRlLW1vYmlsZVwiIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5JbnNjcsOtYmV0ZTwvYT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICByZWY9e21lbnVCdG59XHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1lbnUtYnRuXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBcIkNlcnJhciBtZW7DulwiIDogXCJBYnJpciBtZW7DulwifVxyXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJtZW51LW1vdmlsXCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oIW9wZW4pfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtvcGVuID8gPFhJY29uIHNpemU9ezI2fSAvPiA6IDxNZW51SWNvbiBzaXplPXsyNn0gLz59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24ubmF2XHJcbiAgICAgICAgICAgIGlkPVwibWVudS1tb3ZpbFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdi1tb2JpbGVcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTWVuw7pcIlxyXG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IC0xMiwgc2NhbGU6IDAuOTcgfX1cclxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwLCBzY2FsZTogMSwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yMiwgZWFzZTogRUFTRSB9IH19XHJcbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeTogLTgsIHRyYW5zaXRpb246IHsgZHVyYXRpb246IDAuMTUgfSB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7TkFWLm1hcCgoW2xhYmVsLCBocmVmXSkgPT4gPGEga2V5PXtocmVmfSBocmVmPXtocmVmfSBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKGZhbHNlKX0+e2xhYmVsfTwvYT4pfVxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPXt3YSgpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+SW5zY3LDrWJldGUgcG9yIFdoYXRzQXBwPC9hPlxyXG4gICAgICAgICAgPC9tb3Rpb24ubmF2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBIRVJPIDNEOiBwZXJzb25hamUgYWwgY2VudHJvLCBTVFJFTkdUSCBkZXRyw6FzIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gSGVybygpIHtcclxuICBjb25zdCBzY2VuZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc2NlbmUgPSBzY2VuZVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFzY2VuZSkgcmV0dXJuO1xyXG4gICAgY29uc3QgbGF5ZXJzID0gWy4uLnNjZW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kZXB0aF1cIildLm1hcCgoZWwpID0+ICh7IGVsLCBkOiBwYXJzZUZsb2F0KGVsLmRhdGFzZXQuZGVwdGgpIH0pKTtcclxuICAgIGxldCB0eCA9IDAsIHR5ID0gMCwgY3ggPSAwLCBjeSA9IDAsIHN5ID0gMCwgcmFmO1xyXG4gICAgY29uc3QgbW92ZSA9IChlKSA9PiB7XHJcbiAgICAgIHR4ID0gKGUuY2xpZW50WCAvIGlubmVyV2lkdGggLSAwLjUpICogMjtcclxuICAgICAgdHkgPSAoZS5jbGllbnRZIC8gaW5uZXJIZWlnaHQgLSAwLjUpICogMjtcclxuICAgIH07XHJcbiAgICBjb25zdCBzY3JvbGwgPSAoKSA9PiB7IHN5ID0gTWF0aC5taW4oc2Nyb2xsWSwgaW5uZXJIZWlnaHQpOyB9O1xyXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgeyB0eCA9IDA7IHR5ID0gMDsgc3kgPSAwOyB9XHJcbiAgICAgIGN4ID0gbGVycChjeCwgdHgsIDAuMDcpOyBjeSA9IGxlcnAoY3ksIHR5LCAwLjA3KTtcclxuICAgICAgY29uc3QgcCA9IHN5IC8gaW5uZXJIZWlnaHQ7XHJcbiAgICAgIGZvciAoY29uc3QgeyBlbCwgZCB9IG9mIGxheWVycykge1xyXG4gICAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkeygtY3ggKiBkKS50b0ZpeGVkKDEpfXB4LCAkeygtY3kgKiBkICogMC42ICsgc3kgKiBkICogMC4wMSkudG9GaXhlZCgxKX1weCwgJHsoZCAqIHAgKiAzKS50b0ZpeGVkKDApfXB4KWA7XHJcbiAgICAgIH1cclxuICAgICAgc2NlbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHsoY3kgKiAtMyArIHAgKiA2KS50b0ZpeGVkKDIpfWRlZykgcm90YXRlWSgkeyhjeCAqIDUpLnRvRml4ZWQoMil9ZGVnKWA7XHJcbiAgICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIH07XHJcbiAgICBpZiAoZmluZVBvaW50ZXIoKSkgYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG1vdmUpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTtcclxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzY3JvbGwpO1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cImluaWNpb1wiIGNsYXNzTmFtZT1cImhlcm9cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXN0YWdlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXNjZW5lXCIgcmVmPXtzY2VuZVJlZn0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyIGhlcm8tYmdcIiBkYXRhLWRlcHRoPVwiOFwiPjxpbWcgc3JjPXtJTUcuaGVyb0JnfSBhbHQ9XCJcIiAvPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBzbW9rZSBzbW9rZS0xXCIgZGF0YS1kZXB0aD1cIjE0XCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgc21va2Ugc21va2UtMlwiIGRhdGEtZGVwdGg9XCIyMFwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyIGhlcm8td29yZC13cmFwXCIgZGF0YS1kZXB0aD1cIjE4XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlcm8td29yZFwiPntbLi4uXCJTdHJlbmd0aFwiXS5tYXAoKGNoLCBpKSA9PiA8c3BhbiBrZXk9e2l9IHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiBgJHswLjE1ICsgaSAqIDAuMDZ9c2AgfX0+e2NofTwvc3Bhbj4pfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLWdsb3dcIiBkYXRhLWRlcHRoPVwiMjZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLXBlcnNvblwiIGRhdGEtZGVwdGg9XCIzOFwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz17SU1HLmhlcm99IGFsdD1cIkF0bGV0YSBkZSBlc3BhbGRhcyBtb3N0cmFuZG8gbGEgbXVzY3VsYXR1cmEgdHJhYmFqYWRhXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBzbW9rZSBzbW9rZS0zXCIgZGF0YS1kZXB0aD1cIjUwXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhcmtzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiAxOCB9KS5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICA8aSBrZXk9e2l9IHN0eWxlPXt7IGxlZnQ6IGAkeyhpICogNTMpICUgMTAwfSVgLCBhbmltYXRpb25EZWxheTogYCR7KGkgKiAwLjcpICUgNn1zYCwgYW5pbWF0aW9uRHVyYXRpb246IGAkezUgKyAoaSAlIDUpfXNgIH19IC8+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm8tc2hhZGVcIiAvPlxyXG5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cInNvY2lhbC1yYWlsXCIgYXJpYS1sYWJlbD1cIlJlZGVzXCI+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJJbnN0YWdyYW1cIj48SW5zdGFncmFtSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj17d2EoKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJXaGF0c0FwcFwiPjxNZXNzYWdlQ2lyY2xlSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj17c2l0ZUNvbmZpZy5nb29nbGVNYXBzVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgYXJpYS1sYWJlbD1cIlViaWNhY2nDs25cIj48TWFwUGluSWNvbiBzaXplPXsxNn0gLz48L2E+PC9saT5cclxuICAgICAgPC91bD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGhlcm8tY29udGVudFwiPlxyXG4gICAgICAgIDxoMT5cclxuICAgICAgICAgIDxTcGxpdFRleHQgdGV4dD1cIkxhIGZ1ZXJ6YVwiIGNsYXNzTmFtZT1cImFjY2VudFwiIGRlbGF5PXswLjV9IC8+e1wiIFwifVxyXG4gICAgICAgICAgPFNwbGl0VGV4dCB0ZXh0PVwibm8gc2UgcmVnYWxhXCIgZGVsYXk9ezAuNzV9IC8+XHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJoZXJvLXN1YlwiPlxyXG4gICAgICAgICAgU2UgY29uc3RydXllIHJlcGV0aWNpw7NuIHRyYXMgcmVwZXRpY2nDs24sIGVuIGVsIGNlbnRybyBkZSBhbHRvIHJlbmRpbWllbnRvIGRlIHtzaXRlQ29uZmlnLmNpdHkuc3BsaXQoXCIsXCIpWzBdfS5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIERvcyBjaW50YXMgY3J1emFkYXMgcXVlIHNlIG11ZXZlbiBlbiBzZW50aWRvcyBvcHVlc3Rvcy5cclxuZnVuY3Rpb24gUmliYm9ucygpIHtcclxuICBjb25zdCB3b3JkcyA9IFtcIkZ1ZXJ6YVwiLCBcIkRpc2NpcGxpbmFcIiwgXCJUw6ljbmljYVwiLCBcIlBvd2VyIFRlYW1cIiwgXCJDb25zdGFuY2lhXCIsIFwiU2luIGzDrW1pdGVzXCJdO1xyXG4gIGNvbnN0IHJvdyA9IFsuLi53b3JkcywgLi4ud29yZHMsIC4uLndvcmRzLCAuLi53b3Jkc107XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpYmJvbiByaWJib24tZGFya1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uLXRyYWNrIHJldmVyc2VcIj57cm93Lm1hcCgodywgaSkgPT4gPHNwYW4ga2V5PXtpfT57d308aT4vPC9pPjwvc3Bhbj4pfTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWJib24gcmliYm9uLXJlZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uLXRyYWNrXCI+e3Jvdy5tYXAoKHcsIGkpID0+IDxzcGFuIGtleT17aX0+e3d9PER1bWJiZWxsSWNvbiBzaXplPXsyMn0gLz48L3NwYW4+KX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4vLyBWaWRlbyBkZSBwcmVzZW50YWNpw7NuIChyZWVsIGRlIEluc3RhZ3JhbSBkZXNjYXJnYWRvKS4gU2UgcmVwcm9kdWNlIHNvbG8gYWwgdmVyc2UuXHJcbmNvbnN0IFBhdXNlSWNvbiA9ICh7IHNpemUgPSAxOCB9KSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxyZWN0IHg9XCI2XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIC8+PHJlY3QgeD1cIjE0XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIC8+PC9zdmc+XHJcbik7XHJcbmNvbnN0IFBsYXlHbHlwaCA9ICh7IHNpemUgPSAxOCB9KSA9PiAoXHJcbiAgPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfSB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxwYXRoIGQ9XCJNOCA1LjV2MTNhMSAxIDAgMCAwIDEuNS44NmwxMC41LTYuNWExIDEgMCAwIDAgMC0xLjcyTDkuNSA0LjY0QTEgMSAwIDAgMCA4IDUuNXpcIiAvPjwvc3ZnPlxyXG4pO1xyXG5jb25zdCBBQk9VVF9SRUVMID0gXCJER0x4aHJETUZTblwiO1xyXG5mdW5jdGlvbiBBYm91dFZpZGVvKCkge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBib3hSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgW211dGVkLCBzZXRNdXRlZF0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbcGF1c2VkLCBzZXRQYXVzZWRdID0gdXNlU3RhdGUoKCkgPT4gbW90aW9uUmVkdWNlZCgpKTtcclxuICBjb25zdCBwYXVzZWRSZWYgPSB1c2VSZWYocGF1c2VkKTtcclxuICBjb25zdCBtdXRlZFJlZiA9IHVzZVJlZih0cnVlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcGF1c2VkUmVmLmN1cnJlbnQgPSBwYXVzZWQ7XHJcbiAgICBjb25zdCB2ID0gcmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXYpIHJldHVybjtcclxuICAgIGlmIChwYXVzZWQpIHYucGF1c2UoKTsgZWxzZSB2LnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgfSwgW3BhdXNlZF0pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBtdXRlZFJlZi5jdXJyZW50ID0gbXV0ZWQ7XHJcbiAgICBpZiAocmVmLmN1cnJlbnQpIHJlZi5jdXJyZW50Lm11dGVkID0gbXV0ZWQ7XHJcbiAgfSwgW211dGVkXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHYgPSByZWYuY3VycmVudDtcclxuICAgIGlmICghdikgcmV0dXJuO1xyXG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlXSkgPT4ge1xyXG4gICAgICBpZiAoZS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIGlmIChwYXVzZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2Lm11dGVkICE9PSBtdXRlZFJlZi5jdXJyZW50KSB2Lm11dGVkID0gbXV0ZWRSZWYuY3VycmVudDtcclxuICAgICAgICB2LnBsYXkoKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICB2Lm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdi5wbGF5KCkuY2F0Y2goKCkgPT4ge30pLCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Ugdi5wYXVzZSgpO1xyXG4gICAgfSwgeyB0aHJlc2hvbGQ6IDAuMjUgfSk7XHJcbiAgICBpby5vYnNlcnZlKGJveFJlZi5jdXJyZW50IHx8IHYpO1xyXG4gICAgcmV0dXJuICgpID0+IGlvLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgcmVmPXtib3hSZWZ9PlxyXG4gICAgPFRpbHQgY2xhc3NOYW1lPVwiYWJvdXQtdmlkZW8gZ2xhc3MgbGlxdWlkXCIgbWF4PXs2fT5cclxuICAgICAgPHZpZGVvXHJcbiAgICAgICAgcmVmPXtyZWZ9XHJcbiAgICAgICAgc3JjPXtgL2Fzc2V0cy9yZWVscy8ke0FCT1VUX1JFRUx9Lm1wNGB9XHJcbiAgICAgICAgcG9zdGVyPXtgL2Fzc2V0cy9yZWVscy8ke0FCT1VUX1JFRUx9LmpwZ2B9XHJcbiAgICAgICAgbXV0ZWQ9e211dGVkfVxyXG4gICAgICAgIGxvb3BcclxuICAgICAgICBwbGF5c0lubGluZVxyXG4gICAgICAgIHByZWxvYWQ9XCJtZXRhZGF0YVwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIlZpZGVvIGRlIHByZXNlbnRhY2nDs24gZGUgNyBTdHJlbmd0aCBDZW50ZXJcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYm91dC1jb250cm9sc1wiPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInJvdW5kLWJ0biBzbWFsbCBnbGFzc1wiIG9uQ2xpY2s9eygpID0+IHNldFBhdXNlZCghcGF1c2VkKX0gYXJpYS1sYWJlbD17cGF1c2VkID8gXCJSZXByb2R1Y2lyIHZpZGVvXCIgOiBcIlBhdXNhciB2aWRlb1wifT5cclxuICAgICAgICAgIHtwYXVzZWQgPyA8UGxheUdseXBoIC8+IDogPFBhdXNlSWNvbiAvPn1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGwgZ2xhc3NcIiBvbkNsaWNrPXsoKSA9PiBzZXRNdXRlZCghbXV0ZWQpfSBhcmlhLWxhYmVsPXttdXRlZCA/IFwiQWN0aXZhciBzb25pZG9cIiA6IFwiU2lsZW5jaWFyXCJ9PlxyXG4gICAgICAgICAge211dGVkID8gPFZvbHVtZVhJY29uIHNpemU9ezE4fSAvPiA6IDxWb2x1bWUySWNvbiBzaXplPXsxOH0gLz59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvVGlsdD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFib3V0KCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cIm5vc290cm9zXCIgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBhYm91dC1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJzb21vc1wiPlF1acOpbmVzPC9UaXRsZT5cclxuICAgICAgICAgIDxSZXZlYWw+XHJcbiAgICAgICAgICAgIDxBYm91dFZpZGVvIC8+XHJcbiAgICAgICAgICA8L1JldmVhbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT1cImFib3V0LXRleHRcIiBkZWxheT17MC4xNX0+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWFkXCI+e3NpdGVDb25maWcuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgIFJhY2tzIGRlIHBvdGVuY2lhLCBiYXJyYXMgb2zDrW1waWNhcywgZGlzY29zIGNhbGlicmFkb3MsIG3DoXF1aW5hcyBkZSBiaW9tZWPDoW5pY2EgeSB1bmEgem9uYSBkZSBjw6lzcGVkIHBhcmFcclxuICAgICAgICAgICAgZW1wdWplIGRlIHRyaW5lby4gRW50cmVuYW1pZW50byBwcmVzZW5jaWFsIHkgdmlydHVhbCwgY29uIGVsIHJlc3BhbGRvIGRlbCBQb3dlciBUZWFtLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRsIGNsYXNzTmFtZT1cImZhY3RzXCI+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXsyfSAvPjwvZHQ+PGRkPm5pdmVsZXMgZGUgZW50cmVuYW1pZW50bzwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXsxMDAwfSBzdWZmaXg9XCIrXCIgLz48L2R0PjxkZD5zZWd1aWRvcmVzIGVuIEluc3RhZ3JhbTwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXs2fSAvPjwvZHQ+PGRkPmTDrWFzIGEgbGEgc2VtYW5hPC9kZD48L2Rpdj5cclxuICAgICAgICAgIDwvZGw+XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPVwiI2VudHJlbmFkb3Jlc1wiPkNvbm9jZSBhbCBlcXVpcG8gPEFycm93UmlnaHRJY29uIHNpemU9ezE4fSAvPjwvYT5cclxuICAgICAgICA8L1JldmVhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgRkVBVFVSRVMgPSBbXHJcbiAgW0R1bWJiZWxsSWNvbiwgXCJFcXVpcGFtaWVudG8gcHJvXCIsIFwiUmFja3MgZGUgdXNvIHJ1ZG8sIGJhcnJhcyBvbMOtbXBpY2FzIHkgZGlzY29zIGRlIGNvbXBldGljacOzbi5cIl0sXHJcbiAgW1RhcmdldEljb24sIFwiVMOpY25pY2EgcHJpbWVyb1wiLCBcIlByb2dyZXNhcyBjb24gbGEgZm9ybWEgY29ycmVjdGEgeSBzaW4gbGVzaW9uZXMuXCJdLFxyXG4gIFtVc2Vyc0ljb24sIFwiUG93ZXIgVGVhbVwiLCBcIlVuYSBjb211bmlkYWQgZG9uZGUgY2FkYSByZXBldGljacOzbiBjdWVudGEuXCJdLFxyXG4gIFtDbG9ja0ljb24sIFwiSG9yYXJpbyBmbGV4aWJsZVwiLCBcIlR1cm5vIG1hw7FhbmEgeSB0YXJkZSwgZGUgbHVuZXMgYSBzw6FiYWRvLlwiXSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIFdoeVVzKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ3aHlcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aHktYmdcIj48aW1nIHNyYz17SU1HLnJhY2tzfSBhbHQ9XCJcIiBsb2FkaW5nPVwibGF6eVwiIC8+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21va2Ugc21va2UtMlwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHdoeS1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJub3NvdHJvc1wiPlBvciBxdcOpPC9UaXRsZT5cclxuICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiZmVhdHVyZXNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgIHtGRUFUVVJFUy5tYXAoKFtJY29uLCB0aXRsZSwgdGV4dF0pID0+IChcclxuICAgICAgICAgICAgICA8bW90aW9uLmxpIGtleT17dGl0bGV9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgICAgPFRpbHQgY2xhc3NOYW1lPVwiZmVhdHVyZVwiIG1heD17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uXCI+PEljb24gc2l6ZT17MjJ9IC8+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cD57dGV4dH08L3A+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9UaWx0PlxyXG4gICAgICAgICAgICAgIDwvbW90aW9uLmxpPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvbW90aW9uLnVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2h5LWJpZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWNjZW50XCI+RW50cmVuYTwvc3Bhbj4gPHNwYW4+QWhvcmE8L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cIm91dGxpbmVcIj5NaXNtbzwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBFTlRSRU5BRE9SRVMgLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBUcmFpbmVyQ2FyZCh7IHQgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8bW90aW9uLmxpIHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICA8VGlsdCBhcz1cImFcIiBocmVmPXtgIy9lbnRyZW5hZG9yLyR7dC5zbHVnfWB9IGNsYXNzTmFtZT1cInRyYWluZXJcIiBtYXg9ezEwfSBhcmlhLWxhYmVsPXtgVmVyIHBlcmZpbCBkZSAke3QubmFtZX1gfT5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLWJnbmFtZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt0Lm5hbWUuc3BsaXQoXCIgXCIpWzBdfTwvc3Bhbj5cclxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInRyYWluZXItcGhvdG9cIiBzcmM9e3QucGhvdG99IGFsdD1cIlwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLWxhYmVsXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLW5hbWVcIj57dC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyYWluZXItcm9sZVwiPnt0LnJvbGV9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhaW5lci1jdGFcIj5WZXIgcGVyZmlsIDxBcnJvd1JpZ2h0SWNvbiBzaXplPXsxNn0gLz48L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L1RpbHQ+XHJcbiAgICA8L21vdGlvbi5saT5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUcmFpbmVycygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJlbnRyZW5hZG9yZXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHRyYWluZXJzLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImVudHJlbmFkb3Jlc1wiIGxlYWQ9XCJDYWRhIGVudHJlbmFkb3IgdGllbmUgc3UgcHJvcGlkbyBwZXJmaWw6IGVudHJhIHkgZGVzY3VicmUgZW4gcXXDqSB0ZSBwdWVkZSBheXVkYXIuXCI+Q29ub2NlIGEgbG9zPC9UaXRsZT5cclxuICAgICAgICA8bW90aW9uLnVsIGNsYXNzTmFtZT1cInRyYWluZXJzXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAge3NpdGVDb25maWcudHJhaW5lcnMubWFwKCh0KSA9PiA8VHJhaW5lckNhcmQga2V5PXt0LnNsdWd9IHQ9e3R9IC8+KX1cclxuICAgICAgICA8L21vdGlvbi51bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVHJhaW5lclByb2ZpbGUoeyB0IH0pIHtcclxuICBjb25zdCBvdGhlcnMgPSBzaXRlQ29uZmlnLnRyYWluZXJzLmZpbHRlcigobykgPT4gby5zbHVnICE9PSB0LnNsdWcpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbiBpZD1cImNvbnRlbmlkb1wiIHRhYkluZGV4PXstMX0gY2xhc3NOYW1lPVwicHJvZmlsZVwiPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJwcm9maWxlLWhlcm9cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtZ2xvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgcHJvZmlsZS1ncmlkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtdGV4dFwiPlxyXG4gICAgICAgICAgICA8bW90aW9uLmEgY2xhc3NOYW1lPVwiYmFjay1saW5rXCIgaHJlZj1cIiNlbnRyZW5hZG9yZXNcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0xMiB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX0gdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC40LCBlYXNlOiBFQVNFIH19PlxyXG4gICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gc2l6ZT17MTh9IC8+IFRvZG9zIGxvcyBlbnRyZW5hZG9yZXNcclxuICAgICAgICAgICAgPC9tb3Rpb24uYT5cclxuICAgICAgICAgICAgPGgxIHRhYkluZGV4PXstMX0+PFNwbGl0VGV4dCB0ZXh0PXt0Lm5hbWV9IGRlbGF5PXswLjF9IC8+PC9oMT5cclxuICAgICAgICAgICAgPG1vdGlvbi5wIGNsYXNzTmFtZT1cInByb2ZpbGUtcm9sZVwiIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX0gdHJhbnNpdGlvbj17eyBkZWxheTogMC41IH19Pnt0LnJvbGV9PC9tb3Rpb24ucD5cclxuICAgICAgICAgICAgPG1vdGlvbi5ibG9ja3F1b3RlIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNiwgZHVyYXRpb246IDAuNiwgZWFzZTogRUFTRSB9fT5cclxuICAgICAgICAgICAgICDigJx7dC5xdW90ZX3igJ1cclxuICAgICAgICAgICAgPC9tb3Rpb24uYmxvY2txdW90ZT5cclxuICAgICAgICAgICAgPG1vdGlvbi5kbCBjbGFzc05hbWU9XCJmYWN0c1wiIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNzUsIGR1cmF0aW9uOiAwLjYsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdj48ZHQ+PENvdW50VXAgdG89e3QueWVhcnN9IC8+PC9kdD48ZGQ+YcOxb3MgZW50cmVuYW5kbzwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdj48ZHQ+PENvdW50VXAgdG89e3QuYXRobGV0ZXN9IHN1ZmZpeD1cIitcIiAvPjwvZHQ+PGRkPnBlcnNvbmFzIGFjb21wYcOxYWRhczwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvbW90aW9uLmRsPlxyXG4gICAgICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJoZXJvLWN0YXNcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDE2IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjksIGR1cmF0aW9uOiAwLjYsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgPE1hZ25ldGljIGNsYXNzTmFtZT1cImJ0blwiIGhyZWY9e3dhKGBIb2xhLCBxdWllcm8gcmVzZXJ2YXIgdW5hIHNlc2nDs24gY29uICR7dC5uYW1lfSBlbiA3IFN0cmVuZ3RoIENlbnRlci5gKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICAgICAgUmVzZXJ2YXIgY29uIHt0Lm5hbWUuc3BsaXQoXCIgXCIpWzBdfSA8QXJyb3dSaWdodEljb24gc2l6ZT17MTh9IC8+XHJcbiAgICAgICAgICAgICAgPC9NYWduZXRpYz5cclxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJwcm9maWxlLXBob3RvLXdyYXBcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk0LCB5OiA0MCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuOSwgZWFzZTogRUFTRSwgZGVsYXk6IDAuMTUgfX0+XHJcbiAgICAgICAgICAgIDxUaWx0IGNsYXNzTmFtZT1cInByb2ZpbGUtcGhvdG9cIiBtYXg9ezEyfT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcm9maWxlLWluaXRpYWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57dC5uYW1lLnNwbGl0KFwiIFwiKVswXX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvZmlsZS1yaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17dC5waG90b30gYWx0PXt0Lm5hbWV9IC8+XHJcbiAgICAgICAgICAgIDwvVGlsdD5cclxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHByb2ZpbGUtYm9keVwiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPFRpdGxlIGFjY2VudD1cImVsIGVudHJlbmFkb3JcIj5Tb2JyZTwvVGl0bGU+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgYXM9XCJwXCIgY2xhc3NOYW1lPVwicHJvZmlsZS1iaW9cIj57dC5iaW99PC9SZXZlYWw+XHJcbiAgICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiY2hpcHNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgICAge3Quc3BlY2lhbHRpZXMubWFwKChzKSA9PiA8bW90aW9uLmxpIGtleT17c30gdmFyaWFudHM9e3JldmVhbH0+e3N9PC9tb3Rpb24ubGk+KX1cclxuICAgICAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwicHJvZmlsZS1zY2hlZHVsZVwiPlxyXG4gICAgICAgICAgICAgIDxDYWxlbmRhckljb24gc2l6ZT17MjB9IC8+IDxzcGFuPnt0LnNjaGVkdWxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJheXVkYSBhIGVudHJlbmFyXCI+VGU8L1RpdGxlPlxyXG4gICAgICAgICAgICA8bW90aW9uLm9sIGNsYXNzTmFtZT1cImhlbHBzXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAgICAgIHt0LmhlbHBzLm1hcCgoaCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5saSBrZXk9e2h9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIHNpemU9ezIwfSAvPiA8c3Bhbj57aH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21vdGlvbi5saT5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9tb3Rpb24ub2w+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzZWN0aW9uLWFsdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImVudHJlbmFkb3Jlc1wiPk90cm9zPC9UaXRsZT5cclxuICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwidHJhaW5lcnMgdHJhaW5lcnMtc21hbGxcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgIHtvdGhlcnMubWFwKChvKSA9PiA8VHJhaW5lckNhcmQga2V5PXtvLnNsdWd9IHQ9e299IC8+KX1cclxuICAgICAgICAgIDwvbW90aW9uLnVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBSRUVMUzogdmlkZW9zIHByb3Bpb3MsIHNlIHJlcHJvZHVjZW4gc29sb3MgLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBSZWVscygpIHtcclxuICBjb25zdCByZWVscyA9IHNpdGVDb25maWcucmVlbHM7XHJcbiAgY29uc3QgW2FjdGl2ZSwgc2V0QWN0aXZlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFttdXRlZCwgc2V0TXV0ZWRdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKCgpID0+IG1vdGlvblJlZHVjZWQoKSk7XHJcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHZpZHMgPSB1c2VSZWYoW10pO1xyXG4gIGNvbnN0IHdyYXBSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc3RhcnRYID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGdvID0gKGQpID0+IHNldEFjdGl2ZSgoYSkgPT4gKGEgKyBkICsgcmVlbHMubGVuZ3RoKSAlIHJlZWxzLmxlbmd0aCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBpbyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoW2VdKSA9PiBzZXRWaXNpYmxlKGUuaXNJbnRlcnNlY3RpbmcpLCB7IHRocmVzaG9sZDogMC4zNSB9KTtcclxuICAgIGlmICh3cmFwUmVmLmN1cnJlbnQpIGlvLm9ic2VydmUod3JhcFJlZi5jdXJyZW50KTtcclxuICAgIHJldHVybiAoKSA9PiBpby5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2aWRzLmN1cnJlbnQuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICBpZiAoIXYpIHJldHVybjtcclxuICAgICAgaWYgKGkgPT09IGFjdGl2ZSAmJiB2aXNpYmxlICYmICFwYXVzZWQpIHtcclxuICAgICAgICB2Lm11dGVkID0gbXV0ZWQ7XHJcbiAgICAgICAgdi5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHYucGF1c2UoKTtcclxuICAgICAgICBpZiAoaSAhPT0gYWN0aXZlKSB2LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgW2FjdGl2ZSwgdmlzaWJsZSwgbXV0ZWQsIHBhdXNlZF0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJyZWVsc1wiIGNsYXNzTmFtZT1cInNlY3Rpb24gcmVlbHMtc2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxUaXRsZSBjZW50ZXIgYWNjZW50PVwiZW4gSW5zdGFncmFtXCIgbGVhZD17YExvcyByZWVscyBjb24gbcOhcyB2aXN0YXMgZGUgJHtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9LiBTZSByZXByb2R1Y2VuIHNvbG9zOiB0b2NhIGVsIGFsdGF2b3ogcGFyYSBlc2N1Y2hhci5gfT5MbyBtw6FzIHZpc3RvPC9UaXRsZT5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e3dyYXBSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjb3ZlcmZsb3dcIlxyXG4gICAgICAgICAgcm9sZT1cInJlZ2lvblwiXHJcbiAgICAgICAgICBhcmlhLXJvbGVkZXNjcmlwdGlvbj1cImNhcnJ1c2VsXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZWVscyBtw6FzIHZpc3Rvc1wiXHJcbiAgICAgICAgICB0YWJJbmRleD17MH1cclxuICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHsgaWYgKGUua2V5ID09PSBcIkFycm93UmlnaHRcIikgZ28oMSk7IGlmIChlLmtleSA9PT0gXCJBcnJvd0xlZnRcIikgZ28oLTEpOyB9fVxyXG4gICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IHsgc3RhcnRYLmN1cnJlbnQgPSBlLmNsaWVudFg7IH19XHJcbiAgICAgICAgICBvblBvaW50ZXJVcD17KGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0WC5jdXJyZW50ID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgZHggPSBlLmNsaWVudFggLSBzdGFydFguY3VycmVudDtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGR4KSA+IDUwKSBnbyhkeCA8IDAgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICBzdGFydFguY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtyZWVscy5tYXAoKHIsIGkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9mZiA9IGkgLSBhY3RpdmU7XHJcbiAgICAgICAgICAgIGlmIChvZmYgPiByZWVscy5sZW5ndGggLyAyKSBvZmYgLT0gcmVlbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAob2ZmIDwgLXJlZWxzLmxlbmd0aCAvIDIpIG9mZiArPSByZWVscy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGFicyA9IE1hdGguYWJzKG9mZik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gb2ZmID09PSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17ci5jb2RlfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVlbCR7aXNBY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoY2FsYygtNTAlICsgJHtvZmYgKiA2NH0lKSkgdHJhbnNsYXRlWigkey1hYnMgKiAxNzB9cHgpIHJvdGF0ZVkoJHtvZmYgKiAtMzZ9ZGVnKWAsXHJcbiAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAgLSBhYnMsXHJcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGFicyA+IDIgPyAwIDogMSxcclxuICAgICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogYWJzID4gMiA/IFwibm9uZVwiIDogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gIWlzQWN0aXZlICYmIHNldEFjdGl2ZShpKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8dmlkZW9cclxuICAgICAgICAgICAgICAgICAgcmVmPXsoZWwpID0+ICh2aWRzLmN1cnJlbnRbaV0gPSBlbCl9XHJcbiAgICAgICAgICAgICAgICAgIHNyYz17YC9hc3NldHMvcmVlbHMvJHtyLmNvZGV9Lm1wNGB9XHJcbiAgICAgICAgICAgICAgICAgIHBvc3Rlcj17YC9hc3NldHMvcmVlbHMvJHtyLmNvZGV9LmpwZ2B9XHJcbiAgICAgICAgICAgICAgICAgIG11dGVkXHJcbiAgICAgICAgICAgICAgICAgIHBsYXlzSW5saW5lXHJcbiAgICAgICAgICAgICAgICAgIHByZWxvYWQ9e2FicyA8PSAxID8gXCJhdXRvXCIgOiBcIm1ldGFkYXRhXCJ9XHJcbiAgICAgICAgICAgICAgICAgIG9uRW5kZWQ9eygpID0+IGlzQWN0aXZlICYmIGdvKDEpfVxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgUmVlbCAke2kgKyAxfSBkZSAke3JlZWxzLmxlbmd0aH06ICR7ci50aXRsZX0sICR7ci52aWV3c30gdmlzdGFzYH1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49eyFpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWVsLXZpZXdzXCI+PEV5ZUljb24gc2l6ZT17MTR9IC8+IHtyLnZpZXdzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZWwtdGl0bGVcIj57ci50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7aXNBY3RpdmUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWVsLWFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGxcIiBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRQYXVzZWQoIXBhdXNlZCk7IH19IGFyaWEtbGFiZWw9e3BhdXNlZCA/IFwiUmVwcm9kdWNpciByZWVsXCIgOiBcIlBhdXNhciByZWVsXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3BhdXNlZCA/IDxQbGF5R2x5cGggLz4gOiA8UGF1c2VJY29uIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInJvdW5kLWJ0biBzbWFsbFwiIG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldE11dGVkKCFtdXRlZCk7IH19IGFyaWEtbGFiZWw9e211dGVkID8gXCJBY3RpdmFyIHNvbmlkb1wiIDogXCJTaWxlbmNpYXJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7bXV0ZWQgPyA8Vm9sdW1lWEljb24gc2l6ZT17MTh9IC8+IDogPFZvbHVtZTJJY29uIHNpemU9ezE4fSAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGxcIiBocmVmPXtgaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9yZWVsLyR7ci5jb2RlfS9gfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgYXJpYS1sYWJlbD1cIkFicmlyIGVuIEluc3RhZ3JhbVwiIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbExpbmtJY29uIHNpemU9ezE2fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVlbC1jb250cm9sc1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyb3VuZC1idG5cIiBvbkNsaWNrPXsoKSA9PiBnbygtMSl9IGFyaWEtbGFiZWw9XCJSZWVsIGFudGVyaW9yXCI+PENoZXZyb25MZWZ0SWNvbiBzaXplPXsyMn0gLz48L2J1dHRvbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG90c1wiPlxyXG4gICAgICAgICAgICB7cmVlbHMubWFwKChyLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e3IuY29kZX0gY2xhc3NOYW1lPXtpID09PSBhY3RpdmUgPyBcIm9uXCIgOiBcIlwifSBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmUoaSl9IGFyaWEtbGFiZWw9e2BJciBhbCByZWVsICR7aSArIDF9YH0gLz5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicm91bmQtYnRuXCIgb25DbGljaz17KCkgPT4gZ28oMSl9IGFyaWEtbGFiZWw9XCJSZWVsIHNpZ3VpZW50ZVwiPjxDaGV2cm9uUmlnaHRJY29uIHNpemU9ezIyfSAvPjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwiY2VudGVyLWN0YVwiPlxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1naG9zdFwiIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICA8SW5zdGFncmFtSWNvbiBzaXplPXsxOH0gLz4gU8OtZ3Vlbm9zIHtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gWk9OQVM6IHBhbmVsZXMgcXVlIHNlIGV4cGFuZGVuIC0tLS0tLS0tLS1cclxuY29uc3QgWk9ORVMgPSBbXHJcbiAgeyBpbWc6IElNRy5kaXNjb3MsIHRpdGxlOiBcIlBvd2VybGlmdGluZ1wiLCB0ZXh0OiBcIlNlbnRhZGlsbGEsIGJhbmNhIHkgcGVzbyBtdWVydG8gc29icmUgcGxhdGFmb3JtYXMsIGNvbiBkaXNjb3MgYnVtcGVyIGNhbGlicmFkb3MuXCIsIGdlYXI6IFtcIkJhcnJhcyBvbMOtbXBpY2FzXCIsIFwiRGlzY29zIGJ1bXBlclwiLCBcIlBsYXRhZm9ybWFzXCIsIFwiQmFuY28gZGUgY29tcGV0aWNpw7NuXCJdIH0sXHJcbiAgeyBpbWc6IElNRy5yYWNrcywgdGl0bGU6IFwiUGVzbyBsaWJyZVwiLCB0ZXh0OiBcIlBvd2VyIHJhY2tzIGRlIHVzbyBydWRvIHkgZXNwYWNpbyBwYXJhIGVudHJlbmFyIHBlc2FkbyBzaW4gZXNwZXJhciB0dXJuby5cIiwgZ2VhcjogW1wiUG93ZXIgcmFja3NcIiwgXCJNYW5jdWVybmFzXCIsIFwiQmFycmFzXCIsIFwiQmFuY29zIGFqdXN0YWJsZXNcIl0gfSxcclxuICB7IGltZzogSU1HLm1hcXVpbmFzLCB0aXRsZTogXCJNw6FxdWluYXNcIiwgdGV4dDogXCJCaW9tZWPDoW5pY2EgcGFyYSBhaXNsYXIgY2FkYSBtw7pzY3VsbyBjb24gY29udHJvbCB5IHNlZ3VyaWRhZC5cIiwgZ2VhcjogW1wiUHJlbnNhIGluY2xpbmFkYVwiLCBcIkhhY2sgc3F1YXRcIiwgXCJQb2xlYXNcIiwgXCJFc3Blam9zIHBhbm9yw6FtaWNvc1wiXSB9LFxyXG4gIHsgaW1nOiBJTUcuaW50ZXJpb3IsIHRpdGxlOiBcIkZ1bmNpb25hbFwiLCB0ZXh0OiBcIkPDqXNwZWQgc2ludMOpdGljbyBlbiBkb3Mgbml2ZWxlcyBwYXJhIHRyaW5lbywgYWNvbmRpY2lvbmFtaWVudG8geSBtb3ZpbGlkYWQuXCIsIGdlYXI6IFtcIkPDqXNwZWQgc2ludMOpdGljb1wiLCBcIlRyaW5lb1wiLCBcIlRSWFwiLCBcIkRvcyBuaXZlbGVzXCJdIH0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBab25lcygpIHtcclxuICBjb25zdCBbYWN0aXZlLCBzZXRBY3RpdmVdID0gdXNlU3RhdGUoMCk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiem9uYXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHNlY3Rpb24tYWx0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFRpdGxlIGNlbnRlciBhY2NlbnQ9XCJ6b25hc1wiIGxlYWQ9XCJQYXNhIGVsIG1vdXNlIG8gdG9jYSBjYWRhIHpvbmEgcGFyYSB2ZXIgcXXDqSBlcXVpcG8gZW5jb250cmFyw6FzLlwiPk51ZXN0cmFzPC9UaXRsZT5cclxuICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJ6b25lc1wiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtaT05FUy5tYXAoKHosIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb24gPSBpID09PSBhY3RpdmU7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cclxuICAgICAgICAgICAgICAgIGtleT17ei50aXRsZX1cclxuICAgICAgICAgICAgICAgIHZhcmlhbnRzPXtyZXZlYWx9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B6b25lJHtvbiA/IFwiIG9uXCIgOiBcIlwifWB9XHJcbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IGZpbmVQb2ludGVyKCkgJiYgc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlKGkpfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b259XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e3ouaW1nfSBhbHQ9XCJcIiBsb2FkaW5nPVwibGF6eVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLXNoYWRlXCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtdmVydGljYWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57ei50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS10aXRsZVwiPnt6LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS10ZXh0XCI+e3oudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtZ2VhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt6LmdlYXIubWFwKChnKSA9PiA8c3BhbiBrZXk9e2d9PntnfTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQbGFucygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJwbGFuZXNcIiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFRpdGxlIGNlbnRlciBhY2NlbnQ9XCJwbGFuXCI+RWxpZ2UgdHU8L1RpdGxlPlxyXG4gICAgICAgIDxtb3Rpb24uZGl2IGNsYXNzTmFtZT1cInBsYW5zXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAge3NpdGVDb25maWcucGxhbnMubWFwKChwKSA9PiAoXHJcbiAgICAgICAgICAgIDxtb3Rpb24uZGl2IGtleT17cC5pZH0gdmFyaWFudHM9e3JldmVhbH0+XHJcbiAgICAgICAgICAgICAgPFRpbHQgYXM9XCJhcnRpY2xlXCIgY2xhc3NOYW1lPXtgcGxhbiR7cC5pc0ZlYXR1cmVkID8gXCIgZmVhdHVyZWRcIiA6IFwiXCJ9YH0gbWF4PXs3fT5cclxuICAgICAgICAgICAgICAgIHtwLmlzRmVhdHVyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwiYmFkZ2VcIj48WmFwSWNvbiBzaXplPXsxNH0gLz4gTcOhcyBlbGVnaWRvPC9zcGFuPn1cclxuICAgICAgICAgICAgICAgIDxoMz57cC5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwbGFuLXRhZ1wiPntwLnRhZ2xpbmV9PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmljZVwiPjxzbWFsbD57cC5jdXJyZW5jeX08L3NtYWxsPntwLnByaWNlfTxzcGFuPi8ge3AucGVyaW9kfTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bD57cC5mZWF0dXJlcy5tYXAoKGYpID0+IDxsaSBrZXk9e2Z9PjxDaGVja0ljb24gc2l6ZT17MTh9IC8+IHtmfTwvbGk+KX08L3VsPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtgYnRuJHtwLmlzRmVhdHVyZWQgPyBcIlwiIDogXCIgYnRuLWdob3N0XCJ9YH0gaHJlZj17cC53aGF0c2FwcFVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPntwLmJ1dHRvblRleHR9PC9hPlxyXG4gICAgICAgICAgICAgIDwvVGlsdD5cclxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9tb3Rpb24uZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIEhPUkFSSU9TOiBlc3RhZG8gZW4gdml2byArIGzDrW5lYSBkZSB0aWVtcG8gc2VtYW5hbCAtLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0gSE9SQVJJT1M6IHRyZXMgdGFyamV0YXMgc2ltcGxlcyAtLS0tLS0tLS0tXHJcbmNvbnN0IHNob3J0SG91ciA9IChtaW4pID0+IHtcclxuICBjb25zdCBoID0gTWF0aC5mbG9vcihtaW4gLyA2MCksIG0gPSBtaW4gJSA2MDtcclxuICByZXR1cm4geyBudW06IGAke2ggJSAxMiA9PT0gMCA/IDEyIDogaCAlIDEyfSR7bSA/IGA6JHtTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpfWAgOiBcIlwifWAsIGFtcG06IGggPCAxMiA/IFwiQU1cIiA6IFwiUE1cIiB9O1xyXG59O1xyXG5mdW5jdGlvbiBUaW1lUmFuZ2UoeyBzIH0pIHtcclxuICBjb25zdCBhID0gc2hvcnRIb3VyKHMuZnJvbSksIGIgPSBzaG9ydEhvdXIocy50byk7XHJcbiAgY29uc3Qgc3Bva2VuID0gYGRlICR7Zm10VGltZShNYXRoLmZsb29yKHMuZnJvbSAvIDYwKSwgcy5mcm9tICUgNjApfSBhICR7Zm10VGltZShNYXRoLmZsb29yKHMudG8gLyA2MCksIHMudG8gJSA2MCl9YDtcclxuICByZXR1cm4gKFxyXG4gICAgPGxpIGNsYXNzTmFtZT1cInNoaWZ0XCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoaWZ0LW5hbWVcIj57cy5uYW1lLnJlcGxhY2UoXCJUdXJubyBcIiwgXCJcIil9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC10aW1lXCIgYXJpYS1sYWJlbD17c3Bva2VufT5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57YS5udW19PHNtYWxsPnthLmFtcG19PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtc2VwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57Yi5udW19PHNtYWxsPntiLmFtcG19PC9zbWFsbD48L3NwYW4+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvbGk+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBTY2hlZHVsZSgpIHtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoZ2V0U3RhdHVzKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHNldFN0YXR1cyhnZXRTdGF0dXMoKSksIDMwMDAwKTtcclxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCB7IHdlZWtkYXlzLCBzYXR1cmRheSwgc3VuZGF5IH0gPSBzaXRlQ29uZmlnLmhvdXJzO1xyXG4gIGNvbnN0IGdyb3VwcyA9IFtcclxuICAgIHsgdGl0bGU6IHdlZWtkYXlzLmRheXMsIGRheXM6IFsxLCAyLCAzLCA0LCA1XSwgc2hpZnRzOiBzaGlmdHNGb3IoMSksIG5vdGU6IFwiUGF1c2EgZGUgMSBhIDMgcC4gbS5cIiB9LFxyXG4gICAgeyB0aXRsZTogXCJTw6FiYWRvc1wiLCBkYXlzOiBbNl0sIHNoaWZ0czogc2hpZnRzRm9yKDYpIH0sXHJcbiAgICB7IHRpdGxlOiBcIkRvbWluZ29zXCIsIGRheXM6IFswXSwgc2hpZnRzOiBbXSB9LFxyXG4gIF07XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiaG9yYXJpb3NcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHNjaGVkdWxlLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlLWhlYWRcIj5cclxuICAgICAgICAgIDxUaXRsZT5Ib3JhcmlvczwvVGl0bGU+XHJcbiAgICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT17YHN0YXR1cyR7c3RhdHVzLm9wZW4gPyBcIiBvcGVuXCIgOiBcIlwifWB9PlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGF0dXMtZG90XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gcm9sZT1cInN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+e3N0YXR1cy5sYWJlbH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICA8c21hbGw+e3N0YXR1cy5kZXRhaWx9PC9zbWFsbD5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiaG91cnMtZ3JpZFwiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtncm91cHMubWFwKChnKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gZy5kYXlzLmluY2x1ZGVzKHN0YXR1cy5kYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxtb3Rpb24ubGkga2V5PXtnLnRpdGxlfSB2YXJpYW50cz17cmV2ZWFsfSBjbGFzc05hbWU9e2Bob3Vycy1jYXJkIGdsYXNzJHt0b2RheSA/IFwiIHRvZGF5XCIgOiBcIlwifWB9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3Vycy1jYXJkLWhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgPGgzPntnLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgIHt0b2RheSAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0b2RheS1iYWRnZVwiPkhveTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtnLnNoaWZ0cy5sZW5ndGggPyAoXHJcbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzaGlmdHNcIj57Zy5zaGlmdHMubWFwKChzKSA9PiA8VGltZVJhbmdlIGtleT17cy5uYW1lfSBzPXtzfSAvPil9PC91bD5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hpZnRzLWVtcHR5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+e3N1bmRheS5zdGF0dXNOb3RlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXt3YShcIkhvbGEsIMK/YWJyZW4gZXN0ZSBkb21pbmdvP1wiKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlByZWd1bnRhIHBvciBXaGF0c0FwcCA8QXJyb3dSaWdodEljb24gc2l6ZT17MTZ9IC8+PC9hPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7Zy5ub3RlICYmIDxwIGNsYXNzTmFtZT1cImhvdXJzLW5vdGVcIj48Q2xvY2tJY29uIHNpemU9ezE2fSBhcmlhLWhpZGRlbj1cInRydWVcIiAvPiB7Zy5ub3RlfTwvcD59XHJcbiAgICAgICAgICAgICAgPC9tb3Rpb24ubGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L21vdGlvbi51bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ3RhQmFuZCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiY3RhLWJhbmRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgY3RhLWlubmVyXCI+XHJcbiAgICAgICAgPFJldmVhbCBhcz1cImgyXCI+VHUgcHJpbWVyIGTDrWEgY3Vlc3RhIHNvbG8gUy8gMTU8L1JldmVhbD5cclxuICAgICAgICA8UmV2ZWFsIGRlbGF5PXswLjF9PlxyXG4gICAgICAgICAgPE1hZ25ldGljIGNsYXNzTmFtZT1cImJ0biBidG4tZGFya1wiIGhyZWY9e3NpdGVDb25maWcucGxhbnNbMF0ud2hhdHNhcHBVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuICAgICAgICAgICAgUmVzZXJ2YXIgcGFzZSBkaWFyaW8gPEFycm93UmlnaHRJY29uIHNpemU9ezE4fSAvPlxyXG4gICAgICAgICAgPC9NYWduZXRpYz5cclxuICAgICAgICA8L1JldmVhbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29udGFjdCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJjb250YWN0b1wiIGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgY29udGFjdC1ncmlkXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJlbmNvbnRyYXJub3NcIj5WZW4gYTwvVGl0bGU+XHJcbiAgICAgICAgICA8UmV2ZWFsIGFzPVwidWxcIiBjbGFzc05hbWU9XCJjb250YWN0LWxpc3RcIj5cclxuICAgICAgICAgICAgPGxpPjxNYXBQaW5JY29uIHNpemU9ezIwfSAvPjxhIGhyZWY9e3NpdGVDb25maWcuZ29vZ2xlTWFwc1VybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPntzaXRlQ29uZmlnLmFkZHJlc3N9PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48UGhvbmVJY29uIHNpemU9ezIwfSAvPjxhIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj57c2l0ZUNvbmZpZy5waG9uZS5kaXNwbGF5fTwvYT48L2xpPlxyXG4gICAgICAgICAgICA8bGk+PEluc3RhZ3JhbUljb24gc2l6ZT17MjB9IC8+PGEgaHJlZj17c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbUhhbmRsZX08L2E+PC9saT5cclxuICAgICAgICAgICAgPGxpPjxTaGllbGRDaGVja0ljb24gc2l6ZT17MjB9IC8+PHNwYW4+U2luIGNvbnRyYXRvcyBkZSBwZXJtYW5lbmNpYTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgICA8UmV2ZWFsIGRlbGF5PXswLjF9PlxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG5cIiBocmVmPXtzaXRlQ29uZmlnLmdvb2dsZU1hcHNVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj48TmF2aWdhdGlvbkljb24gc2l6ZT17MTh9IC8+IEPDs21vIGxsZWdhcjwvYT5cclxuICAgICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwibWFwXCIgZGVsYXk9ezAuMTV9PlxyXG4gICAgICAgICAgPGlmcmFtZSB0aXRsZT1cIk1hcGEgZGUgNyBTdHJlbmd0aCBDZW50ZXJcIiBzcmM9e2BodHRwczovL3d3dy5nb29nbGUuY29tL21hcHM/cT0ke3NpdGVDb25maWcuZ29vZ2xlTWFwc0VtYmVkUXVlcnl9Jm91dHB1dD1lbWJlZGB9IGxvYWRpbmc9XCJsYXp5XCIgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlci13aGVuLWRvd25ncmFkZVwiIC8+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvb3RlcigpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZm9vdGVyLWlubmVyXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIiNpbmljaW9cIiBjbGFzc05hbWU9XCJicmFuZFwiPlxyXG4gICAgICAgICAgPExvZ28gc2l6ZT17NDR9IC8+XHJcbiAgICAgICAgICA8c3Bhbj43IDxiPlN0cmVuZ3RoPC9iPiBDZW50ZXI8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxwPsKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IHtzaXRlQ29uZmlnLm5hbWV9IMK3IHtzaXRlQ29uZmlnLmNpdHl9PC9wPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjaW5pY2lvXCIgY2xhc3NOYW1lPVwidG8tdG9wXCIgYXJpYS1sYWJlbD1cIlZvbHZlciBhcnJpYmFcIj48QXJyb3dVcEljb24gc2l6ZT17MTh9IC8+PC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZm9vdGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gQVNJU1RFTlRFIENPTiBJQSAtLS0tLS0tLS0tXHJcbi8vIFJlc3B1ZXN0YXMgYsOhc2ljYXMgY3VhbmRvIGxhIElBIG5vIGVzdMOhIGRpc3BvbmlibGUgKHNpbiBjbGF2ZSBvIHNpbiBpbnRlcm5ldCkuXHJcbmZ1bmN0aW9uIGxvY2FsQW5zd2VyKHEpIHtcclxuICBjb25zdCB0ID0gcS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGMgPSBzaXRlQ29uZmlnO1xyXG4gIGNvbnN0IGggPSBjLmhvdXJzO1xyXG4gIGlmICgvaG9yYXJpb3xob3JhfGFicmV8Y2llcnJhfGFiaWVydG98ZG9taW5nb3xzw6FiYWRvfHNhYmFkby8udGVzdCh0KSlcclxuICAgIHJldHVybiBgJHtoLndlZWtkYXlzLmRheXN9OiAke2gud2Vla2RheXMuc2hpZnRzLm1hcCgocykgPT4gcy50aW1lUmFuZ2UpLmpvaW4oXCIgeSBcIil9LiAke2guc2F0dXJkYXkuZGF5c306ICR7aC5zYXR1cmRheS5zaGlmdHNbMF0udGltZVJhbmdlfS4gRG9taW5nb3M6ICR7aC5zdW5kYXkuc3RhdHVzTm90ZS50b0xvd2VyQ2FzZSgpfS5gO1xyXG4gIGlmICgvcHJlY2lvfGN1ZXN0YXxjb3N0b3xwbGFufG1lbnN1YWx8cGFzZXxwYWdhcnxtZW1icmVzLy50ZXN0KHQpKVxyXG4gICAgcmV0dXJuIGMucGxhbnMubWFwKChwKSA9PiBgJHtwLm5hbWV9OiAke3AuZm9ybWF0dGVkUHJpY2V9ICgke3AucGVyaW9kfSlgKS5qb2luKFwiIMK3IFwiKSArIFwiLiBTaW4gY29udHJhdG9zIGRlIHBlcm1hbmVuY2lhLlwiO1xyXG4gIGlmICgvZMOzbmRlfGRvbmRlfGRpcmVjY2l8dWJpY2F8bGxlZ2FyfG1hcGEvLnRlc3QodCkpIHJldHVybiBgRXN0YW1vcyBlbiAke2MuYWRkcmVzc30uIFRvY2Eg4oCcQ8OzbW8gbGxlZ2Fy4oCdIGVuIGxhIHNlY2Npw7NuIGRlIGNvbnRhY3RvIHBhcmEgYWJyaXIgR29vZ2xlIE1hcHMuYDtcclxuICBpZiAoL2VudHJlbmFkb3J8Y29hY2h8cHJvZmV8cGVyc29uYWwvLnRlc3QodCkpXHJcbiAgICByZXR1cm4gYE51ZXN0cm8gZXF1aXBvOiAke2MudHJhaW5lcnMubWFwKCh0cikgPT4gYCR7dHIubmFtZX0gKCR7dHIucm9sZX0pYCkuam9pbihcIiwgXCIpfS4gRW50cmEgYSBzdSBwZXJmaWwgZW4gbGEgc2VjY2nDs24gRW50cmVuYWRvcmVzLmA7XHJcbiAgaWYgKC93aGF0c2FwcHx0ZWxbZcOpXWZvbm98Y29udGFjdG98aW5zY3JpYnxyZXNlcnYvLnRlc3QodCkpIHJldHVybiBgRXNjcsOtYmVub3MgcG9yIFdoYXRzQXBwIGFsICR7Yy5waG9uZS5kaXNwbGF5fSB5IHRlIGF5dWRhbW9zIGEgaW5zY3JpYmlydGUuYDtcclxuICByZXR1cm4gYFB1ZWRvIGNvbnRhcnRlIHNvYnJlIGhvcmFyaW9zLCBwbGFuZXMsIGVudHJlbmFkb3JlcyB5IGPDs21vIGxsZWdhci4gUGFyYSBhbGdvIG3DoXMgZXNwZWPDrWZpY28sIGVzY3LDrWJlbm9zIHBvciBXaGF0c0FwcCBhbCAke2MucGhvbmUuZGlzcGxheX0uYDtcclxufVxyXG5cclxuY29uc3QgU1VHR0VTVElPTlMgPSBbXCLCv0N1w6FsIGVzIGVsIGhvcmFyaW8/XCIsIFwiwr9DdcOhbnRvIGN1ZXN0YSBlbCBwbGFuIG1lbnN1YWw/XCIsIFwiU295IHByaW5jaXBpYW50ZSwgwr9jb24gcXVpw6luIGVudHJlbm8/XCIsIFwiwr9Ew7NuZGUgZXN0w6FuP1wiXTtcclxuXHJcbmZ1bmN0aW9uIENoYXRCb3QoKSB7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttc2dzLCBzZXRNc2dzXSA9IHVzZVN0YXRlKFtcclxuICAgIHsgcm9sZTogXCJhc3Npc3RhbnRcIiwgY29udGVudDogXCLCoUhvbGEhIFNveSBlbCBhc2lzdGVudGUgZGUgNyBTdHJlbmd0aC4gUHJlZ8O6bnRhbWUgcG9yIGhvcmFyaW9zLCBwbGFuZXMgbyBlbnRyZW5hZG9yZXMuXCIgfSxcclxuICBdKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGlzdFJlZi5jdXJyZW50Py5zY3JvbGxUbyh7IHRvcDogbGlzdFJlZi5jdXJyZW50LnNjcm9sbEhlaWdodCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgfSwgW21zZ3MsIGJ1c3ldKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKG9wZW4pIHNldFRpbWVvdXQoKCkgPT4gaW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKSwgMjUwKTtcclxuICAgIGNvbnN0IG9uS2V5ID0gKGUpID0+IGUua2V5ID09PSBcIkVzY2FwZVwiICYmIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gICAgcmV0dXJuICgpID0+IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5KTtcclxuICB9LCBbb3Blbl0pO1xyXG5cclxuICBjb25zdCBhc2sgPSBhc3luYyAodGV4dCkgPT4ge1xyXG4gICAgY29uc3QgcSA9IHRleHQudHJpbSgpO1xyXG4gICAgaWYgKCFxIHx8IGJ1c3kpIHJldHVybjtcclxuICAgIGNvbnN0IG5leHQgPSBbLi4ubXNncywgeyByb2xlOiBcInVzZXJcIiwgY29udGVudDogcSB9XTtcclxuICAgIHNldE1zZ3MobmV4dCk7XHJcbiAgICBzZXRJbnB1dChcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBsZXQgcmVwbHk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NoYXRcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZXM6IG5leHQuc2xpY2UoMSkgfSksXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgci5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XHJcbiAgICAgIGlmIChyLm9rICYmIGRhdGEucmVwbHkpIHJlcGx5ID0gZGF0YS5yZXBseTtcclxuICAgICAgZWxzZSBpZiAoci5zdGF0dXMgPT09IDQyOSkgcmVwbHkgPSBcIkVzdMOhcyBwcmVndW50YW5kbyBtdXkgcsOhcGlkby4gRXNwZXJhIHVub3Mgc2VndW5kb3MgeSB2dWVsdmUgYSBpbnRlbnRhcmxvLlwiO1xyXG4gICAgICBlbHNlIHJlcGx5ID0gbG9jYWxBbnN3ZXIocSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmVwbHkgPSBsb2NhbEFuc3dlcihxKTtcclxuICAgIH1cclxuICAgIHNldE1zZ3MoKG0pID0+IFsuLi5tLCB7IHJvbGU6IFwiYXNzaXN0YW50XCIsIGNvbnRlbnQ6IHJlcGx5IH1dKTtcclxuICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtcm9vdFwiPlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24uc2VjdGlvblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjaGF0LXBhbmVsIGdsYXNzIGxpcXVpZFwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQXNpc3RlbnRlIGRlIDcgU3RyZW5ndGggQ2VudGVyXCJcclxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxNiwgc2NhbGU6IDAuOTYgfX1cclxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwLCBzY2FsZTogMSwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4yOCwgZWFzZTogRUFTRSB9IH19XHJcbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeTogMTAsIHNjYWxlOiAwLjk3LCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjE4IH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjaGF0LWhlYWRcIj5cclxuICAgICAgICAgICAgICA8TG9nbyBzaXplPXs0MH0gLz5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5Bc2lzdGVudGUgNyBTdHJlbmd0aDwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgPHNtYWxsPjxzcGFuIGNsYXNzTmFtZT1cImNoYXQtb25saW5lXCIgLz4gUmVzcG9uZGUgYWwgaW5zdGFudGU8L3NtYWxsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicm91bmQtYnRuIHNtYWxsXCIgb25DbGljaz17KCkgPT4gc2V0T3BlbihmYWxzZSl9IGFyaWEtbGFiZWw9XCJDZXJyYXIgY2hhdFwiPjxYSWNvbiBzaXplPXsxOH0gLz48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1saXN0XCIgcmVmPXtsaXN0UmVmfSBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cclxuICAgICAgICAgICAgICB7bXNncy5tYXAoKG0sIGkpID0+IChcclxuICAgICAgICAgICAgICAgIDxtb3Rpb24ucCBrZXk9e2l9IGNsYXNzTmFtZT17YGJ1YmJsZSAke20ucm9sZX1gfSBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDggfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMjUsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHttLmNvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICA8L21vdGlvbi5wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIHtidXN5ICYmIDxwIGNsYXNzTmFtZT1cImJ1YmJsZSBhc3Npc3RhbnQgdHlwaW5nXCIgYXJpYS1sYWJlbD1cIkVzY3JpYmllbmRvXCI+PGkgLz48aSAvPjxpIC8+PC9wPn1cclxuICAgICAgICAgICAgICB7bXNncy5sZW5ndGggPT09IDEgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LXN1Z2dlc3RcIj5cclxuICAgICAgICAgICAgICAgICAge1NVR0dFU1RJT05TLm1hcCgocykgPT4gPGJ1dHRvbiBrZXk9e3N9IG9uQ2xpY2s9eygpID0+IGFzayhzKX0+e3N9PC9idXR0b24+KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJjaGF0LWZvcm1cIiBvblN1Ym1pdD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBhc2soaW5wdXQpOyB9fT5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXR9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldElucHV0KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRXNjcmliZSB0dSBwcmVndW50YeKAplwiXHJcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezUwMH1cclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJUdSBwcmVndW50YVwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNoYXQtc2VuZFwiIGRpc2FibGVkPXshaW5wdXQudHJpbSgpIHx8IGJ1c3l9IGFyaWEtbGFiZWw9XCJFbnZpYXJcIj48QXJyb3dVcEljb24gc2l6ZT17MjB9IC8+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY2hhdC13YVwiIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj48TWVzc2FnZUNpcmNsZUljb24gc2l6ZT17MTV9IC8+IFByZWZpZXJvIGhhYmxhciBwb3IgV2hhdHNBcHA8L2E+XHJcbiAgICAgICAgICA8L21vdGlvbi5zZWN0aW9uPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhYi1zdGFja1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgZmFiIGZhYi1haSR7b3BlbiA/IFwiIG9uXCIgOiBcIlwifWB9IG9uQ2xpY2s9eygpID0+IHNldE9wZW4oIW9wZW4pfSBhcmlhLWV4cGFuZGVkPXtvcGVufSBhcmlhLWxhYmVsPXtvcGVuID8gXCJDZXJyYXIgYXNpc3RlbnRlXCIgOiBcIkFicmlyIGFzaXN0ZW50ZSBjb24gSUFcIn0+XHJcbiAgICAgICAgICB7b3BlbiA/IDxYSWNvbiBzaXplPXsyNH0gLz4gOiA8U3BhcmtsZXNJY29uIHNpemU9ezI0fSAvPn1cclxuICAgICAgICAgIHshb3BlbiAmJiA8c3BhbiBjbGFzc05hbWU9XCJmYWItbGFiZWxcIj5QcmVnw7pudGFtZTwvc3Bhbj59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSG9tZSgpIHtcclxuICAvLyBBbCB2b2x2ZXIgZGVzZGUgdW4gcGVyZmlsLCBiYWphIGEgbGEgc2VjY2nDs24gcGVkaWRhICgjZW50cmVuYWRvcmVzLCBldGMuKS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xyXG4gICAgaWYgKGlkICYmICFpZC5zdGFydHNXaXRoKFwiL1wiKSkge1xyXG4gICAgICBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk/LnNjcm9sbEludG9WaWV3KCksIDYwKTtcclxuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0KTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxtYWluIGlkPVwiY29udGVuaWRvXCIgdGFiSW5kZXg9ey0xfT5cclxuICAgICAgPEhlcm8gLz5cclxuICAgICAgPFJpYmJvbnMgLz5cclxuICAgICAgPEFib3V0IC8+XHJcbiAgICAgIDxXaHlVcyAvPlxyXG4gICAgICA8VHJhaW5lcnMgLz5cclxuICAgICAgPFJlZWxzIC8+XHJcbiAgICAgIDxab25lcyAvPlxyXG4gICAgICA8UGxhbnMgLz5cclxuICAgICAgPFNjaGVkdWxlIC8+XHJcbiAgICAgIDxDdGFCYW5kIC8+XHJcbiAgICAgIDxDb250YWN0IC8+XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlSGFzaCgpIHtcclxuICBjb25zdCBbaGFzaCwgc2V0SGFzaF0gPSB1c2VTdGF0ZShsb2NhdGlvbi5oYXNoKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZiA9ICgpID0+IHNldEhhc2gobG9jYXRpb24uaGFzaCk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmKTtcclxuICAgIHJldHVybiAoKSA9PiByZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIGhhc2g7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBoYXNoID0gdXNlSGFzaCgpO1xyXG4gIGNvbnN0IHNsdWcgPSBoYXNoLnN0YXJ0c1dpdGgoXCIjL2VudHJlbmFkb3IvXCIpID8gaGFzaC5zbGljZShcIiMvZW50cmVuYWRvci9cIi5sZW5ndGgpIDogbnVsbDtcclxuICBjb25zdCB0cmFpbmVyID0gdXNlTWVtbygoKSA9PiBzaXRlQ29uZmlnLnRyYWluZXJzLmZpbmQoKHQpID0+IHQuc2x1ZyA9PT0gc2x1ZyksIFtzbHVnXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdHJhaW5lcikgcmV0dXJuO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gICAgLy8gTGxldmEgZWwgZm9jbyBhbCBub21icmUgZGVsIGVudHJlbmFkb3IgcGFyYSBsZWN0b3JlcyBkZSBwYW50YWxsYS5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlIGgxXCIpPy5mb2N1cygpLCA1MCk7XHJcbiAgfSwgW3RyYWluZXJdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGEgY2xhc3NOYW1lPVwic2tpcC1saW5rXCIgaHJlZj1cIiNjb250ZW5pZG9cIj5TYWx0YXIgYWwgY29udGVuaWRvPC9hPlxyXG4gICAgICA8SW50cm8gLz5cclxuICAgICAgPFNjcm9sbFByb2dyZXNzIC8+XHJcbiAgICAgIDxIZWFkZXIgLz5cclxuICAgICAge3RyYWluZXIgPyA8VHJhaW5lclByb2ZpbGUga2V5PXt0cmFpbmVyLnNsdWd9IHQ9e3RyYWluZXJ9IC8+IDogPEhvbWUgLz59XHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgICAgPENoYXRCb3QgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJvb3RgKSkucmVuZGVyKDxBcHAgLz4pO1xyXG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQSxTQUNFQSxTQUFTLEVBQ1RDLFNBQVMsRUFDVEMsTUFBTSxFQUNOQyxLQUFLLEVBQ0xDLGVBQWUsRUFDZkMsUUFBUSxFQUNSQyxLQUFLLEVBQ0xDLGNBQWMsRUFDZEMsWUFBWSxFQUNaQyxVQUFVLEVBQ1ZDLFNBQVMsRUFDVEMsZUFBZSxFQUNmQyxTQUFTLEVBQ1RDLFNBQVMsRUFDVEMsT0FBTyxFQUNQQyxVQUFVLEVBQ1ZDLFNBQVMsRUFDVEMsYUFBYSxFQUNiQyxpQkFBaUIsRUFDakJDLFdBQVcsRUFDWEMsZUFBZSxFQUNmQyxnQkFBZ0IsRUFDaEJDLGdCQUFnQixFQUNoQkMsT0FBTyxFQUNQQyxXQUFXLEVBQ1hDLFdBQVcsRUFDWEMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLFlBQVksRUFDWkMsaUJBQWlCLEVBQ2pCQyxRQUFRLFFBQ0gsc0JBQXNCO0FBQzdCLFNBQVNDLFVBQVUsUUFBUSxrQkFBa0I7QUFFN0MsTUFBTTtFQUFFQyxRQUFRO0VBQUVDLFNBQVM7RUFBRUMsTUFBTTtFQUFFQztBQUFRLENBQUMsR0FBR2hDLEtBQUs7QUFDdEQsTUFBTWlDLEdBQUcsR0FBRztFQUNWQyxNQUFNLEVBQUUscUNBQXFDO0VBQzdDQyxJQUFJLEVBQUUsNEJBQTRCO0VBQ2xDQyxRQUFRLEVBQUUscUNBQXFDO0VBQy9DQyxLQUFLLEVBQUUscUNBQXFDO0VBQzVDQyxNQUFNLEVBQUUscUNBQXFDO0VBQzdDQyxRQUFRLEVBQUU7QUFDWixDQUFDO0FBQ0QsTUFBTUMs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