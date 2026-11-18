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
  font: false
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
  }, "Accesibilidad"), /*#__PURE__*/React.createElement("div", {
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
    accent: "elegirnos"
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
  }, "Entrena"), /*#__PURE__*/React.createElement("span", null, "Ahora"), /*#__PURE__*/React.createElement("span", {
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
    lead: "Cada coach tiene su propio perfil: entra y descubre en qu\xE9 te puede ayudar."
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
    accent: "\xE9l"
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
    accent: "ayuda a"
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
    accent: "coaches"
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
    note: "Pausa de 1 a 3 PM"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VTY3JvbGwiLCJ1c2VTcHJpbmciLCJtb3Rpb24iLCJSZWFjdCIsIkFuaW1hdGVQcmVzZW5jZSIsIk1lbnVJY29uIiwiWEljb24iLCJBcnJvd1JpZ2h0SWNvbiIsIkR1bWJiZWxsSWNvbiIsIlRhcmdldEljb24iLCJVc2Vyc0ljb24iLCJTaGllbGRDaGVja0ljb24iLCJDbG9ja0ljb24iLCJDaGVja0ljb24iLCJaYXBJY29uIiwiTWFwUGluSWNvbiIsIlBob25lSWNvbiIsIkluc3RhZ3JhbUljb24iLCJNZXNzYWdlQ2lyY2xlSWNvbiIsIkFycm93VXBJY29uIiwiQ2hldnJvbkxlZnRJY29uIiwiQ2hldnJvblJpZ2h0SWNvbiIsIkV4dGVybmFsTGlua0ljb24iLCJFeWVJY29uIiwiVm9sdW1lMkljb24iLCJWb2x1bWVYSWNvbiIsIkNhbGVuZGFySWNvbiIsIk5hdmlnYXRpb25JY29uIiwiU3BhcmtsZXNJY29uIiwiQWNjZXNzaWJpbGl0eUljb24iLCJSZWFjdERPTSIsInNpdGVDb25maWciLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZU1lbW8iLCJJTUciLCJoZXJvQmciLCJoZXJvIiwiaW50ZXJpb3IiLCJyYWNrcyIsImRpc2NvcyIsIm1hcXVpbmFzIiwid2EiLCJtc2ciLCJwaG9uZSIsIndoYXRzYXBwTWVzc2FnZUdlbmVyYWwiLCJyYXciLCJlbmNvZGVVUklDb21wb25lbnQiLCJFQVNFIiwiZmluZVBvaW50ZXIiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImxlcnAiLCJhIiwiYiIsInQiLCJ1c2VUaWx0IiwibWF4IiwicmVmIiwiZWwiLCJjdXJyZW50IiwiZ2xhcmUiLCJxdWVyeVNlbGVjdG9yIiwicmFmIiwidHgiLCJ0eSIsImN4IiwiY3kiLCJneCIsImd5IiwidGljayIsInN0eWxlIiwidHJhbnNmb3JtIiwidG9GaXhlZCIsImJhY2tncm91bmQiLCJNYXRoIiwiYWJzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwia2ljayIsIm1vdmUiLCJlIiwibW90aW9uUmVkdWNlZCIsInIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJweCIsImNsaWVudFgiLCJsZWZ0Iiwid2lkdGgiLCJweSIsImNsaWVudFkiLCJ0b3AiLCJoZWlnaHQiLCJyb3VuZCIsImxlYXZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlRpbHQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsImFzIiwicmVzdCIsIlRhZyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk1hZ25ldGljIiwieCIsInkiLCJyZXZlYWwiLCJoaWRkZW4iLCJvcGFjaXR5Iiwic2hvdyIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImVhc2UiLCJzdGFnZ2VyIiwic3RhZ2dlckNoaWxkcmVuIiwiaW5WaWV3IiwiaW5pdGlhbCIsIndoaWxlSW5WaWV3Iiwidmlld3BvcnQiLCJvbmNlIiwiYW1vdW50IiwiUmV2ZWFsIiwiZGVsYXkiLCJ2YXJpYW50cyIsIlRpdGxlIiwiYWNjZW50IiwiY2VudGVyIiwibGVhZCIsInNwYW4iLCJTcGxpdFRleHQiLCJ0ZXh0IiwibWFwIiwiY2giLCJpIiwia2V5IiwiYW5pbWF0aW9uRGVsYXkiLCJDb3VudFVwIiwidG8iLCJzdWZmaXgiLCJuIiwic2V0TiIsImlvIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwiZGlzY29ubmVjdCIsInN0YXJ0IiwicGVyZm9ybWFuY2UiLCJub3ciLCJkdXIiLCJzdGVwIiwicCIsIm1pbiIsInBvdyIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJEQVlfTkFNRVMiLCJmbXRUaW1lIiwiaCIsIm0iLCJoaCIsIlN0cmluZyIsInBhZFN0YXJ0IiwiYXRUaW1lIiwic2hpZnRzRm9yIiwiZGF5Iiwid2Vla2RheXMiLCJzYXR1cmRheSIsImhvdXJzIiwic2hpZnRzIiwicyIsImZyb20iLCJvcGVuSG91ciIsIm9wZW5NaW51dGUiLCJjbG9zZUhvdXIiLCJjbG9zZU1pbnV0ZSIsIm5hbWUiLCJsYWJlbCIsInRpbWVSYW5nZSIsImxpbWFOb3ciLCJwYXJ0cyIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsInRpbWVab25lIiwid2Vla2RheSIsImhvdXIiLCJtaW51dGUiLCJob3VyMTIiLCJmb3JtYXRUb1BhcnRzIiwiRGF0ZSIsImdldCIsImZpbmQiLCJ0eXBlIiwidmFsdWUiLCJpbmRleE9mIiwibWludXRlcyIsIk51bWJlciIsImdldFN0YXR1cyIsInRvZGF5Iiwib3BlbiIsImRldGFpbCIsImZsb29yIiwiZCIsIm5leHQiLCJ3aGVuIiwidG9Mb3dlckNhc2UiLCJwYXVzZWQiLCJzb21lIiwiQTExWV9ERUZBVUxUIiwiY29udHJhc3QiLCJsaW5rcyIsImZvbnQiLCJyZWFkQTExeSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcHBseUExMXkiLCJyb290IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJmb250U2l6ZSIsImRhdGFzZXQiLCJBMTF5VG9nZ2xlIiwib24iLCJoaW50Iiwib25DaGFuZ2UiLCJyb2xlIiwib25DbGljayIsIkExMXlQYW5lbCIsInNldE9wZW4iLCJzZXRTIiwiYnRuUmVmIiwicGFuZWxSZWYiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZm9jdXMiLCJvbktleSIsImNvbnRhaW5zIiwidGFyZ2V0Iiwic2V0IiwiayIsInYiLCJ0b2dnbGUiLCJzaXplIiwiZGl2IiwiaWQiLCJzY2FsZSIsImFuaW1hdGUiLCJleGl0IiwibCIsIkRpZ2l0Iiwic3BsaXQiLCJJbnRybyIsInBoYXNlIiwic2V0UGhhc2UiLCJzZXNzaW9uU3RvcmFnZSIsInNraXBSZWYiLCJyZWFkeSIsImxvYWRlZCIsIlByb21pc2UiLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJmb250cyIsInJlc29sdmUiLCJmb3JFYWNoIiwidGhlbiIsImxlbmd0aCIsImdpdmVVcCIsInNldFRpbWVvdXQiLCJEVVIiLCJ0aW1lIiwiZWFzZWQiLCJjbGVhclRpbWVvdXQiLCJkaWdpdHMiLCJyaWdodCIsImNsaXBQYXRoIiwiTkFWIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJzY3JvbGxZUHJvZ3Jlc3MiLCJzY2FsZVgiLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicmVzdERlbHRhIiwiTG9nbyIsImxvZ29QYXRoIiwiYWx0IiwiSGVhZGVyIiwic29saWQiLCJzZXRTb2xpZCIsIm1lbnVCdG4iLCJvblNjcm9sbCIsInNjcm9sbFkiLCJwYXNzaXZlIiwiaHJlZiIsInJlbCIsIm5hdiIsIkhlcm8iLCJzY2VuZVJlZiIsInNjZW5lIiwibGF5ZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsInBhcnNlRmxvYXQiLCJkZXB0aCIsInN5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwic2Nyb2xsIiwibG9vcCIsIkFycmF5IiwiXyIsImFuaW1hdGlvbkR1cmF0aW9uIiwic29jaWFsIiwiaW5zdGFncmFtVXJsIiwiZ29vZ2xlTWFwc1VybCIsImNpdHkiLCJSaWJib25zIiwid29yZHMiLCJyb3ciLCJ3IiwiUGF1c2VJY29uIiwidmlld0JveCIsImZpbGwiLCJyeCIsIlBsYXlHbHlwaCIsIkFCT1VUX1JFRUwiLCJBYm91dFZpZGVvIiwiYm94UmVmIiwibXV0ZWQiLCJzZXRNdXRlZCIsInNldFBhdXNlZCIsInBhdXNlZFJlZiIsIm11dGVkUmVmIiwicGF1c2UiLCJwbGF5IiwiY2F0Y2giLCJwb3N0ZXIiLCJwbGF5c0lubGluZSIsInByZWxvYWQiLCJBYm91dCIsImRlc2NyaXB0aW9uIiwiRkVBVFVSRVMiLCJXaHlVcyIsImxvYWRpbmciLCJ1bCIsIkljb24iLCJ0aXRsZSIsImxpIiwiVHJhaW5lckNhcmQiLCJzbHVnIiwicGhvdG8iLCJUcmFpbmVycyIsInRyYWluZXJzIiwiVHJhaW5lclByb2ZpbGUiLCJvdGhlcnMiLCJmaWx0ZXIiLCJvIiwidGFiSW5kZXgiLCJibG9ja3F1b3RlIiwicXVvdGUiLCJkbCIsInllYXJzIiwiYXRobGV0ZXMiLCJiaW8iLCJzcGVjaWFsdGllcyIsInNjaGVkdWxlIiwib2wiLCJoZWxwcyIsIlJlZWxzIiwicmVlbHMiLCJhY3RpdmUiLCJzZXRBY3RpdmUiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsInZpZHMiLCJ3cmFwUmVmIiwic3RhcnRYIiwiZ28iLCJjdXJyZW50VGltZSIsImluc3RhZ3JhbUhhbmRsZSIsIm9uS2V5RG93biIsIm9uUG9pbnRlckRvd24iLCJvblBvaW50ZXJVcCIsImR4Iiwib2ZmIiwiaXNBY3RpdmUiLCJjb2RlIiwiekluZGV4IiwicG9pbnRlckV2ZW50cyIsIm9uRW5kZWQiLCJ2aWV3cyIsInN0b3BQcm9wYWdhdGlvbiIsIlpPTkVTIiwiaW1nIiwiZ2VhciIsIlpvbmVzIiwieiIsImJ1dHRvbiIsIm9uTW91c2VFbnRlciIsIm9uRm9jdXMiLCJnIiwiUGxhbnMiLCJwbGFucyIsImlzRmVhdHVyZWQiLCJ0YWdsaW5lIiwiY3VycmVuY3kiLCJwcmljZSIsInBlcmlvZCIsImZlYXR1cmVzIiwiZiIsIndoYXRzYXBwVXJsIiwiYnV0dG9uVGV4dCIsInNob3J0SG91ciIsIm51bSIsImFtcG0iLCJUaW1lUmFuZ2UiLCJzcG9rZW4iLCJyZXBsYWNlIiwiU2NoZWR1bGUiLCJzdGF0dXMiLCJzZXRTdGF0dXMiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzdW5kYXkiLCJncm91cHMiLCJkYXlzIiwibm90ZSIsImluY2x1ZGVzIiwic3RhdHVzTm90ZSIsIkN0YUJhbmQiLCJDb250YWN0IiwiYWRkcmVzcyIsImRpc3BsYXkiLCJnb29nbGVNYXBzRW1iZWRRdWVyeSIsInJlZmVycmVyUG9saWN5IiwiRm9vdGVyIiwiZ2V0RnVsbFllYXIiLCJsb2NhbEFuc3dlciIsInEiLCJjIiwidGVzdCIsImpvaW4iLCJmb3JtYXR0ZWRQcmljZSIsInRyIiwiU1VHR0VTVElPTlMiLCJDaGF0Qm90IiwiaW5wdXQiLCJzZXRJbnB1dCIsImJ1c3kiLCJzZXRCdXN5IiwibXNncyIsInNldE1zZ3MiLCJjb250ZW50IiwibGlzdFJlZiIsImlucHV0UmVmIiwic2Nyb2xsVG8iLCJzY3JvbGxIZWlnaHQiLCJiZWhhdmlvciIsImFzayIsInRyaW0iLCJyZXBseSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJtZXNzYWdlcyIsInNsaWNlIiwiZGF0YSIsImpzb24iLCJvayIsInNlY3Rpb24iLCJvblN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwicGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJkaXNhYmxlZCIsIkhvbWUiLCJsb2NhdGlvbiIsImhhc2giLCJzdGFydHNXaXRoIiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxJbnRvVmlldyIsInVzZUhhc2giLCJzZXRIYXNoIiwiQXBwIiwidHJhaW5lciIsIkZyYWdtZW50IiwiY3JlYXRlUm9vdCIsInJlbmRlciJdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gNyBTdHJlbmd0aCBDZW50ZXIg4oCUIGxhbmRpbmcgaW5tZXJzaXZhIGNvbiBlZmVjdG9zIDNELlxyXG4vLyBWZXJzacOzbiBhbnRlcmlvcjogL3Jlc3BhbGRvLXZlcnNpb24tYW50ZXJpb3IvQXBwLmpzeFxyXG4vLyBUZXh0b3MsIHByZWNpb3MsIGhvcmFyaW9zLCByZWVscyB5IGVudHJlbmFkb3Jlczogc3JjL3NpdGUtY29uZmlnLmpzXHJcbmltcG9ydCB7XHJcbiAgdXNlU2Nyb2xsLFxyXG4gIHVzZVNwcmluZyxcclxuICBtb3Rpb24sXHJcbiAgUmVhY3QsXHJcbiAgQW5pbWF0ZVByZXNlbmNlLFxyXG4gIE1lbnVJY29uLFxyXG4gIFhJY29uLFxyXG4gIEFycm93UmlnaHRJY29uLFxyXG4gIER1bWJiZWxsSWNvbixcclxuICBUYXJnZXRJY29uLFxyXG4gIFVzZXJzSWNvbixcclxuICBTaGllbGRDaGVja0ljb24sXHJcbiAgQ2xvY2tJY29uLFxyXG4gIENoZWNrSWNvbixcclxuICBaYXBJY29uLFxyXG4gIE1hcFBpbkljb24sXHJcbiAgUGhvbmVJY29uLFxyXG4gIEluc3RhZ3JhbUljb24sXHJcbiAgTWVzc2FnZUNpcmNsZUljb24sXHJcbiAgQXJyb3dVcEljb24sXHJcbiAgQ2hldnJvbkxlZnRJY29uLFxyXG4gIENoZXZyb25SaWdodEljb24sXHJcbiAgRXh0ZXJuYWxMaW5rSWNvbixcclxuICBFeWVJY29uLFxyXG4gIFZvbHVtZTJJY29uLFxyXG4gIFZvbHVtZVhJY29uLFxyXG4gIENhbGVuZGFySWNvbixcclxuICBOYXZpZ2F0aW9uSWNvbixcclxuICBTcGFya2xlc0ljb24sXHJcbiAgQWNjZXNzaWJpbGl0eUljb24sXHJcbiAgUmVhY3RET00sXHJcbn0gZnJvbSBcIi4vcnVudGltZS1pbXBvcnRzLmpzXCI7XHJcbmltcG9ydCB7IHNpdGVDb25maWcgfSBmcm9tIFwiLi9zaXRlLWNvbmZpZy5qc1wiO1xyXG5cclxuY29uc3QgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZU1lbW8gfSA9IFJlYWN0O1xyXG5jb25zdCBJTUcgPSB7XHJcbiAgaGVyb0JnOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV9jYWI1Y2FkYi5wbmdgLFxyXG4gIGhlcm86IGAvYXNzZXRzL3BlcnNvbmFzL2hlcm9lLnBuZ2AsXHJcbiAgaW50ZXJpb3I6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlXzk5M2RkYjgwLnBuZ2AsXHJcbiAgcmFja3M6IGAvYXNzZXRzL2Fpc3R1ZGlvL2ltYWdlX2Y4YTgyMDBhLnBuZ2AsXHJcbiAgZGlzY29zOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV9lNzY3YzNkNi5wbmdgLFxyXG4gIG1hcXVpbmFzOiBgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV8xOWExNWI0MC5wbmdgLFxyXG59O1xyXG5jb25zdCB3YSA9IChtc2cgPSBzaXRlQ29uZmlnLnBob25lLndoYXRzYXBwTWVzc2FnZUdlbmVyYWwpID0+XHJcbiAgYGh0dHBzOi8vd2EubWUvJHtzaXRlQ29uZmlnLnBob25lLnJhd30/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChtc2cpfWA7XHJcbmNvbnN0IEVBU0UgPSBbMC4yMywgMSwgMC4zMiwgMV07XHJcblxyXG4vLyAtLS0tLS0tLS0tIHV0aWxpZGFkZXMgZGUgbW92aW1pZW50byAtLS0tLS0tLS0tXHJcbmNvbnN0IGZpbmVQb2ludGVyID0gKCkgPT5cclxuICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5tYXRjaE1lZGlhKFwiKGhvdmVyOiBob3ZlcikgYW5kIChwb2ludGVyOiBmaW5lKVwiKS5tYXRjaGVzO1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKyAoYiAtIGEpICogdDtcclxuXHJcbi8vIEluY2xpbmFjacOzbiAzRCBxdWUgc2lndWUgYWwgbW91c2UsIGNvbiBpbmVyY2lhLlxyXG5mdW5jdGlvbiB1c2VUaWx0KG1heCA9IDEwKSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCB8fCAhZmluZVBvaW50ZXIoKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgZ2xhcmUgPSBlbC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlID4gLmdsYXJlXCIpO1xyXG4gICAgbGV0IHJhZiA9IDAsIHR4ID0gMCwgdHkgPSAwLCBjeCA9IDAsIGN5ID0gMCwgZ3ggPSA1MCwgZ3kgPSA1MDtcclxuICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGN4ID0gbGVycChjeCwgdHgsIDAuMTQpO1xyXG4gICAgICBjeSA9IGxlcnAoY3ksIHR5LCAwLjE0KTtcclxuICAgICAgZWwuc3R5bGUudHJhbnNmb3JtID0gYHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWCgke2N5LnRvRml4ZWQoMil9ZGVnKSByb3RhdGVZKCR7Y3gudG9GaXhlZCgyKX1kZWcpYDtcclxuICAgICAgaWYgKGdsYXJlKSBnbGFyZS5zdHlsZS5iYWNrZ3JvdW5kID0gYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgJHtneH0lICR7Z3l9JSwgcmdiYSgyNTUsMjU1LDI1NSwwLjE2KSwgdHJhbnNwYXJlbnQgNTUlKWA7XHJcbiAgICAgIHJhZiA9IE1hdGguYWJzKGN4IC0gdHgpID4gMC4wMSB8fCBNYXRoLmFicyhjeSAtIHR5KSA+IDAuMDEgPyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaykgOiAwO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGtpY2sgPSAoKSA9PiB7IGlmICghcmFmKSByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7IH07XHJcbiAgICBjb25zdCBtb3ZlID0gKGUpID0+IHtcclxuICAgICAgaWYgKG1vdGlvblJlZHVjZWQoKSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGNvbnN0IHB4ID0gKGUuY2xpZW50WCAtIHIubGVmdCkgLyByLndpZHRoLCBweSA9IChlLmNsaWVudFkgLSByLnRvcCkgLyByLmhlaWdodDtcclxuICAgICAgdHggPSAocHggLSAwLjUpICogMiAqIG1heDtcclxuICAgICAgdHkgPSAoMC41IC0gcHkpICogMiAqIG1heDtcclxuICAgICAgZ3ggPSBNYXRoLnJvdW5kKHB4ICogMTAwKTsgZ3kgPSBNYXRoLnJvdW5kKHB5ICogMTAwKTtcclxuICAgICAga2ljaygpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGxlYXZlID0gKCkgPT4geyB0eCA9IDA7IHR5ID0gMDsga2ljaygpOyB9O1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIG1vdmUpO1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBsZWF2ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xyXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybGVhdmVcIiwgbGVhdmUpO1xyXG4gICAgfTtcclxuICB9LCBbbWF4XSk7XHJcbiAgcmV0dXJuIHJlZjtcclxufVxyXG5jb25zdCBUaWx0ID0gKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9IFwiXCIsIG1heCwgYXMgPSBcImRpdlwiLCAuLi5yZXN0IH0pID0+IHtcclxuICBjb25zdCByZWYgPSB1c2VUaWx0KG1heCk7XHJcbiAgY29uc3QgVGFnID0gYXM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxUYWcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHRpbHQgJHtjbGFzc05hbWV9YH0gey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdsYXJlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgIDwvVGFnPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBCb3TDs24gXCJtYWduw6l0aWNvXCI6IHNlIGFjZXJjYSB1biBwb2NvIGFsIGN1cnNvci5cclxuZnVuY3Rpb24gTWFnbmV0aWMoeyBjaGlsZHJlbiwgY2xhc3NOYW1lID0gXCJcIiwgLi4ucmVzdCB9KSB7XHJcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCB8fCAhZmluZVBvaW50ZXIoKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgbW92ZSA9IChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgeCA9IChlLmNsaWVudFggLSAoci5sZWZ0ICsgci53aWR0aCAvIDIpKSAqIDAuMjU7XHJcbiAgICAgIGNvbnN0IHkgPSAoZS5jbGllbnRZIC0gKHIudG9wICsgci5oZWlnaHQgLyAyKSkgKiAwLjM1O1xyXG4gICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgbGVhdmUgPSAoKSA9PiB7IGVsLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7IH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmxlYXZlXCIsIGxlYXZlKTtcclxuICAgIHJldHVybiAoKSA9PiB7IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTsgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBsZWF2ZSk7IH07XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiA8YSByZWY9e3JlZn0gY2xhc3NOYW1lPXtgbWFnbmV0aWMgJHtjbGFzc05hbWV9YH0gey4uLnJlc3R9PntjaGlsZHJlbn08L2E+O1xyXG59XHJcblxyXG5jb25zdCByZXZlYWwgPSB7XHJcbiAgaGlkZGVuOiB7IG9wYWNpdHk6IDAsIHk6IDM2IH0sXHJcbiAgc2hvdzogeyBvcGFjaXR5OiAxLCB5OiAwLCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjcsIGVhc2U6IEVBU0UgfSB9LFxyXG59O1xyXG5jb25zdCBzdGFnZ2VyID0geyBoaWRkZW46IHt9LCBzaG93OiB7IHRyYW5zaXRpb246IHsgc3RhZ2dlckNoaWxkcmVuOiAwLjA4IH0gfSB9O1xyXG5jb25zdCBpblZpZXcgPSB7IGluaXRpYWw6IFwiaGlkZGVuXCIsIHdoaWxlSW5WaWV3OiBcInNob3dcIiwgdmlld3BvcnQ6IHsgb25jZTogdHJ1ZSwgYW1vdW50OiAwLjIgfSB9O1xyXG5jb25zdCBSZXZlYWwgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBhcyA9IFwiZGl2XCIsIGRlbGF5ID0gMCB9KSA9PiB7XHJcbiAgY29uc3QgVGFnID0gbW90aW9uW2FzXTtcclxuICByZXR1cm4gKFxyXG4gICAgPFRhZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmFyaWFudHM9e3JldmVhbH0gey4uLmluVmlld30gdHJhbnNpdGlvbj17eyBkZWxheSB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9UYWc+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFTDrXR1bG8gZGUgc2VjY2nDs24gcXVlIHN1YmUgZGVzZGUgdW5hIG3DoXNjYXJhLlxyXG5mdW5jdGlvbiBUaXRsZSh7IGNoaWxkcmVuLCBhY2NlbnQsIGNlbnRlciwgbGVhZCB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgdGl0bGUtYmxvY2ske2NlbnRlciA/IFwiIGNlbnRlclwiIDogXCJcIn1gfT5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgPG1vdGlvbi5zcGFuIGNsYXNzTmFtZT1cIm1hc2tcIiBpbml0aWFsPVwiaGlkZGVuXCIgd2hpbGVJblZpZXc9XCJzaG93XCIgdmlld3BvcnQ9e3sgb25jZTogdHJ1ZSwgYW1vdW50OiAwLjUgfX0+XHJcbiAgICAgICAgICA8bW90aW9uLnNwYW5cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWFzay1pbm5lclwiXHJcbiAgICAgICAgICAgIHZhcmlhbnRzPXt7IGhpZGRlbjogeyB5OiBcIjEwNSVcIiB9LCBzaG93OiB7IHk6IFwiMCVcIiwgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC44LCBlYXNlOiBFQVNFIH0gfSB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59IHthY2NlbnQgJiYgPGVtPnthY2NlbnR9PC9lbT59XHJcbiAgICAgICAgICA8L21vdGlvbi5zcGFuPlxyXG4gICAgICAgIDwvbW90aW9uLnNwYW4+XHJcbiAgICAgIDwvaDI+XHJcbiAgICAgIHtsZWFkICYmIDxSZXZlYWwgYXM9XCJwXCIgY2xhc3NOYW1lPVwibGVhZC10ZXh0XCIgZGVsYXk9ezAuMTV9PntsZWFkfTwvUmV2ZWFsPn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIFTDrXR1bG8gcXVlIGFwYXJlY2UgbGV0cmEgcG9yIGxldHJhIGVuIDNELlxyXG5jb25zdCBTcGxpdFRleHQgPSAoeyB0ZXh0LCBjbGFzc05hbWUgPSBcIlwiLCBkZWxheSA9IDAgfSkgPT4gKFxyXG4gIDxzcGFuIGNsYXNzTmFtZT17YHNwbGl0ICR7Y2xhc3NOYW1lfWB9IGFyaWEtbGFiZWw9e3RleHR9PlxyXG4gICAge1suLi50ZXh0XS5tYXAoKGNoLCBpKSA9PiAoXHJcbiAgICAgIDxzcGFuIGtleT17aX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IGAke2RlbGF5ICsgaSAqIDAuMDN9c2AgfX0+XHJcbiAgICAgICAge2NoID09PSBcIiBcIiA/IFwiwqBcIiA6IGNofVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApKX1cclxuICA8L3NwYW4+XHJcbik7XHJcblxyXG4vLyBOw7ptZXJvIHF1ZSBjdWVudGEgaGFjaWEgYXJyaWJhIGN1YW5kbyBhcGFyZWNlLlxyXG5mdW5jdGlvbiBDb3VudFVwKHsgdG8sIHN1ZmZpeCA9IFwiXCIgfSkge1xyXG4gIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBbbiwgc2V0Tl0gPSB1c2VTdGF0ZSgwKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZWwgPSByZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGNvbnN0IGlvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbZW50cnldKSA9PiB7XHJcbiAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHJldHVybjtcclxuICAgICAgaW8uZGlzY29ubmVjdCgpO1xyXG4gICAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpLCBkdXIgPSAxNDAwO1xyXG4gICAgICBjb25zdCBzdGVwID0gKHQpID0+IHtcclxuICAgICAgICBjb25zdCBwID0gTWF0aC5taW4oKHQgLSBzdGFydCkgLyBkdXIsIDEpO1xyXG4gICAgICAgIHNldE4oTWF0aC5yb3VuZCh0byAqICgxIC0gTWF0aC5wb3coMSAtIHAsIDQpKSkpO1xyXG4gICAgICAgIGlmIChwIDwgMSkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xyXG4gICAgICB9O1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XHJcbiAgICB9LCB7IHRocmVzaG9sZDogMC42IH0pO1xyXG4gICAgaW8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gaW8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFt0b10pO1xyXG4gIHJldHVybiA8c3BhbiByZWY9e3JlZn0gY2xhc3NOYW1lPVwibnVtXCI+e259e3N1ZmZpeH08L3NwYW4+O1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIGhvcmFyaW9zOiBlc3RhZG8gZW4gdml2byAoaG9yYSBkZSBMaW1hKSAtLS0tLS0tLS0tXHJcbmNvbnN0IERBWV9OQU1FUyA9IFtcIkRvbWluZ29cIiwgXCJMdW5lc1wiLCBcIk1hcnRlc1wiLCBcIk1pw6lyY29sZXNcIiwgXCJKdWV2ZXNcIiwgXCJWaWVybmVzXCIsIFwiU8OhYmFkb1wiXTtcclxuY29uc3QgZm10VGltZSA9IChoLCBtID0gMCkgPT4ge1xyXG4gIGNvbnN0IHN1ZmZpeCA9IGggPCAxMiA/IFwiYS4gbS5cIiA6IFwicC4gbS5cIjtcclxuICBjb25zdCBoaCA9IGggJSAxMiA9PT0gMCA/IDEyIDogaCAlIDEyO1xyXG4gIHJldHVybiBgJHtoaH06JHtTdHJpbmcobSkucGFkU3RhcnQoMiwgXCIwXCIpfSAke3N1ZmZpeH1gO1xyXG59O1xyXG4vLyBcImEgbGEgMTowMCBwLiBtLlwiIHBlcm8gXCJhIGxhcyA5OjAwIHAuIG0uXCJcclxuY29uc3QgYXRUaW1lID0gKGgsIG0gPSAwKSA9PiBgJHtoICUgMTIgPT09IDEgPyBcImEgbGFcIiA6IFwiYSBsYXNcIn0gJHtmbXRUaW1lKGgsIG0pfWA7XHJcbmNvbnN0IHNoaWZ0c0ZvciA9IChkYXkpID0+IHtcclxuICBjb25zdCB7IHdlZWtkYXlzLCBzYXR1cmRheSB9ID0gc2l0ZUNvbmZpZy5ob3VycztcclxuICBpZiAoZGF5ID09PSAwKSByZXR1cm4gW107XHJcbiAgcmV0dXJuIChkYXkgPT09IDYgPyBzYXR1cmRheS5zaGlmdHMgOiB3ZWVrZGF5cy5zaGlmdHMpLm1hcCgocykgPT4gKHtcclxuICAgIGZyb206IHMub3BlbkhvdXIgKiA2MCArIHMub3Blbk1pbnV0ZSxcclxuICAgIHRvOiBzLmNsb3NlSG91ciAqIDYwICsgcy5jbG9zZU1pbnV0ZSxcclxuICAgIG5hbWU6IHMubmFtZSxcclxuICAgIGxhYmVsOiBzLnRpbWVSYW5nZSxcclxuICB9KSk7XHJcbn07XHJcbmZ1bmN0aW9uIGxpbWFOb3coKSB7XHJcbiAgY29uc3QgcGFydHMgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBcIkFtZXJpY2EvTGltYVwiLCB3ZWVrZGF5OiBcInNob3J0XCIsIGhvdXI6IFwibnVtZXJpY1wiLCBtaW51dGU6IFwibnVtZXJpY1wiLCBob3VyMTI6IGZhbHNlLFxyXG4gIH0pLmZvcm1hdFRvUGFydHMobmV3IERhdGUoKSk7XHJcbiAgY29uc3QgZ2V0ID0gKHQpID0+IHBhcnRzLmZpbmQoKHApID0+IHAudHlwZSA9PT0gdCk/LnZhbHVlO1xyXG4gIGNvbnN0IGRheSA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXS5pbmRleE9mKGdldChcIndlZWtkYXlcIikpO1xyXG4gIHJldHVybiB7IGRheSwgbWludXRlczogKE51bWJlcihnZXQoXCJob3VyXCIpKSAlIDI0KSAqIDYwICsgTnVtYmVyKGdldChcIm1pbnV0ZVwiKSkgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgY29uc3QgeyBkYXksIG1pbnV0ZXMgfSA9IGxpbWFOb3coKTtcclxuICBjb25zdCB0b2RheSA9IHNoaWZ0c0ZvcihkYXkpO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSB0b2RheS5maW5kKChzKSA9PiBtaW51dGVzID49IHMuZnJvbSAmJiBtaW51dGVzIDwgcy50byk7XHJcbiAgaWYgKGN1cnJlbnQpIHtcclxuICAgIGNvbnN0IGxlZnQgPSBjdXJyZW50LnRvIC0gbWludXRlcztcclxuICAgIHJldHVybiB7IG9wZW46IHRydWUsIGRheSwgbWludXRlcywgbGFiZWw6IFwiQWJpZXJ0byBhaG9yYVwiLCBkZXRhaWw6IGBDaWVycmEgJHthdFRpbWUoTWF0aC5mbG9vcihjdXJyZW50LnRvIC8gNjApLCBjdXJyZW50LnRvICUgNjApfSR7bGVmdCA8PSA2MCA/IGAgwrcgcXVlZGFuICR7bGVmdH0gbWluYCA6IFwiXCJ9YCB9O1xyXG4gIH1cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgY29uc3QgZCA9IChkYXkgKyBpKSAlIDc7XHJcbiAgICBjb25zdCBuZXh0ID0gc2hpZnRzRm9yKGQpLmZpbmQoKHMpID0+IGkgPiAwIHx8IHMuZnJvbSA+IG1pbnV0ZXMpO1xyXG4gICAgaWYgKG5leHQpIHtcclxuICAgICAgY29uc3Qgd2hlbiA9IGkgPT09IDAgPyBcImhveVwiIDogaSA9PT0gMSA/IFwibWHDsWFuYVwiIDogYGVsICR7REFZX05BTUVTW2RdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgICAgY29uc3QgcGF1c2VkID0gaSA9PT0gMCAmJiB0b2RheS5zb21lKChzKSA9PiBzLnRvIDw9IG1pbnV0ZXMpO1xyXG4gICAgICByZXR1cm4geyBvcGVuOiBmYWxzZSwgZGF5LCBtaW51dGVzLCBsYWJlbDogcGF1c2VkID8gXCJFbiBwYXVzYVwiIDogXCJDZXJyYWRvIGFob3JhXCIsIGRldGFpbDogYEFicmUgJHt3aGVufSAke2F0VGltZShNYXRoLmZsb29yKG5leHQuZnJvbSAvIDYwKSwgbmV4dC5mcm9tICUgNjApfWAgfTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHsgb3BlbjogZmFsc2UsIGRheSwgbWludXRlcywgbGFiZWw6IFwiQ2VycmFkb1wiLCBkZXRhaWw6IFwiQ29uc3VsdGEgcG9yIFdoYXRzQXBwXCIgfTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBpbnRybyB5IGN1cnNvciAtLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0gQUNDRVNJQklMSURBRDogcHJlZmVyZW5jaWFzIGRlbCB2aXNpdGFudGUgLS0tLS0tLS0tLVxyXG5jb25zdCBBMTFZX0RFRkFVTFQgPSB7IHRleHQ6IDAsIGNvbnRyYXN0OiBmYWxzZSwgbGlua3M6IGZhbHNlLCBtb3Rpb246IGZhbHNlLCBmb250OiBmYWxzZSB9O1xyXG5mdW5jdGlvbiByZWFkQTExeSgpIHtcclxuICB0cnkgeyByZXR1cm4geyAuLi5BMTFZX0RFRkFVTFQsIC4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY2Nlc2liaWxpZGFkXCIpIHx8IFwie31cIikgfTsgfSBjYXRjaCB7IHJldHVybiB7IC4uLkExMVlfREVGQVVMVCB9OyB9XHJcbn1cclxuZnVuY3Rpb24gYXBwbHlBMTF5KHMpIHtcclxuICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gIHJvb3Quc3R5bGUuZm9udFNpemUgPSBbXCIxMDAlXCIsIFwiMTEyLjUlXCIsIFwiMTI1JVwiLCBcIjEzNy41JVwiXVtzLnRleHRdIHx8IFwiMTAwJVwiO1xyXG4gIHJvb3QuZGF0YXNldC5jb250cmFzdCA9IHMuY29udHJhc3QgPyBcImhpZ2hcIiA6IFwiXCI7XHJcbiAgcm9vdC5kYXRhc2V0LmxpbmtzID0gcy5saW5rcyA/IFwidW5kZXJsaW5lXCIgOiBcIlwiO1xyXG4gIHJvb3QuZGF0YXNldC5tb3Rpb24gPSBzLm1vdGlvbiA/IFwicmVkdWNlXCIgOiBcIlwiO1xyXG4gIHJvb3QuZGF0YXNldC5mb250ID0gcy5mb250ID8gXCJyZWFkYWJsZVwiIDogXCJcIjtcclxufVxyXG4vLyBTZSBhcGxpY2EgYW50ZXMgZGUgcGludGFyIGxhIHDDoWdpbmEgcGFyYSBldml0YXIgcGFycGFkZW9zLlxyXG5hcHBseUExMXkocmVhZEExMXkoKSk7XHJcbmNvbnN0IG1vdGlvblJlZHVjZWQgPSAoKSA9PiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC5tb3Rpb24gPT09IFwicmVkdWNlXCI7XHJcblxyXG5mdW5jdGlvbiBBMTF5VG9nZ2xlKHsgb24sIGxhYmVsLCBoaW50LCBvbkNoYW5nZSB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9e29ufSBjbGFzc05hbWU9e2BhMTF5LXRvZ2dsZSR7b24gPyBcIiBvblwiIDogXCJcIn1gfSBvbkNsaWNrPXtvbkNoYW5nZX0+XHJcbiAgICAgIDxzcGFuPjxzdHJvbmc+e2xhYmVsfTwvc3Ryb25nPjxzbWFsbD57aGludH08L3NtYWxsPjwvc3Bhbj5cclxuICAgICAgPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEExMXlQYW5lbCgpIHtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3MsIHNldFNdID0gdXNlU3RhdGUocmVhZEExMXkpO1xyXG4gIGNvbnN0IGJ0blJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBwYW5lbFJlZiA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgYXBwbHlBMTF5KHMpO1xyXG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY2Nlc2liaWxpZGFkXCIsIEpTT04uc3RyaW5naWZ5KHMpKTsgfSBjYXRjaCB7fVxyXG4gIH0sIFtzXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbikgcmV0dXJuO1xyXG4gICAgcGFuZWxSZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKT8uZm9jdXMoKTtcclxuICAgIGNvbnN0IG9uS2V5ID0gKGUpID0+IHsgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7IHNldE9wZW4oZmFsc2UpOyBidG5SZWYuY3VycmVudD8uZm9jdXMoKTsgfSB9O1xyXG4gICAgY29uc3Qgb25DbGljayA9IChlKSA9PiB7XHJcbiAgICAgIGlmICghcGFuZWxSZWYuY3VycmVudD8uY29udGFpbnMoZS50YXJnZXQpICYmICFidG5SZWYuY3VycmVudD8uY29udGFpbnMoZS50YXJnZXQpKSBzZXRPcGVuKGZhbHNlKTtcclxuICAgIH07XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25DbGljayk7XHJcbiAgICByZXR1cm4gKCkgPT4geyByZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvbkNsaWNrKTsgfTtcclxuICB9LCBbb3Blbl0pO1xyXG4gIGNvbnN0IHNldCA9IChrLCB2KSA9PiBzZXRTKChwKSA9PiAoeyAuLi5wLCBba106IHYgfSkpO1xyXG4gIGNvbnN0IHRvZ2dsZSA9IChrLCBsYWJlbCwgaGludCkgPT4gPEExMXlUb2dnbGUgb249e3Nba119IGxhYmVsPXtsYWJlbH0gaGludD17aGludH0gb25DaGFuZ2U9eygpID0+IHNldChrLCAhc1trXSl9IC8+O1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImExMXlcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHJlZj17YnRuUmVmfVxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImExMXktYnRuXCJcclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxyXG4gICAgICAgIGFyaWEtY29udHJvbHM9XCJwYW5lbC1hY2Nlc2liaWxpZGFkXCJcclxuICAgICAgICBhcmlhLWxhYmVsPVwiT3BjaW9uZXMgZGUgYWNjZXNpYmlsaWRhZFwiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0T3Blbighb3Blbil9XHJcbiAgICAgID5cclxuICAgICAgICA8QWNjZXNzaWJpbGl0eUljb24gc2l6ZT17MjJ9IC8+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxyXG4gICAgICAgIHtvcGVuICYmIChcclxuICAgICAgICAgIDxtb3Rpb24uZGl2XHJcbiAgICAgICAgICAgIHJlZj17cGFuZWxSZWZ9XHJcbiAgICAgICAgICAgIGlkPVwicGFuZWwtYWNjZXNpYmlsaWRhZFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImExMXktcGFuZWwgZ2xhc3NcIlxyXG4gICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk9wY2lvbmVzIGRlIGFjY2VzaWJpbGlkYWRcIlxyXG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IC04LCBzY2FsZTogMC45NyB9fVxyXG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAsIHNjYWxlOiAxLCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjIsIGVhc2U6IEVBU0UgfSB9fVxyXG4gICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IC02LCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjEyIH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYTExeS10aXRsZVwiPkFjY2VzaWJpbGlkYWQ8L3A+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYTExeS1zaXplXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIlRhbWHDsW8gZGVsIHRleHRvXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+VGFtYcOxbyBkZWwgdGV4dG88L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHtbXCJBXCIsIFwiQStcIiwgXCJBKytcIiwgXCJBKysrXCJdLm1hcCgobCwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17bH0gdHlwZT1cImJ1dHRvblwiIGFyaWEtcHJlc3NlZD17cy50ZXh0ID09PSBpfSBhcmlhLWxhYmVsPXtbXCJOb3JtYWxcIiwgXCJHcmFuZGVcIiwgXCJNdXkgZ3JhbmRlXCIsIFwiTcOheGltb1wiXVtpXX0gb25DbGljaz17KCkgPT4gc2V0KFwidGV4dFwiLCBpKX0+e2x9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHt0b2dnbGUoXCJjb250cmFzdFwiLCBcIkFsdG8gY29udHJhc3RlXCIsIFwiVGV4dG8gbcOhcyBjbGFybyB5IGZvbmRvcyBzw7NsaWRvc1wiKX1cclxuICAgICAgICAgICAge3RvZ2dsZShcImxpbmtzXCIsIFwiU3VicmF5YXIgZW5sYWNlc1wiLCBcIkRpc3Rpbmd1ZSBsb3MgZW5sYWNlcyBkZWwgdGV4dG9cIil9XHJcbiAgICAgICAgICAgIHt0b2dnbGUoXCJmb250XCIsIFwiTGV0cmEgZsOhY2lsIGRlIGxlZXJcIiwgXCJDYW1iaWEgbG9zIHTDrXR1bG9zIGEgdW5hIGxldHJhIHNpbXBsZVwiKX1cclxuICAgICAgICAgICAge3RvZ2dsZShcIm1vdGlvblwiLCBcIkRldGVuZXIgYW5pbWFjaW9uZXNcIiwgXCJRdWl0YSBtb3ZpbWllbnRvcyB5IGxhIGludHJvXCIpfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJhMTF5LXJlc2V0XCIgb25DbGljaz17KCkgPT4gc2V0Uyh7IC4uLkExMVlfREVGQVVMVCB9KX0+UmVzdGFibGVjZXI8L2J1dHRvbj5cclxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gSU5UUk86IGNvbnRhZG9yIDAwMOKGkjEwMCBxdWUgc2UgbGxlbmEsIHBhbGFicmEgcXVlIHNlIHBhcnRlIGVuIGRvcyAtLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIERpZ2l0KHsgdmFsdWUgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3BhbiBjbGFzc05hbWU9XCJvZG9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib2RvLXN0cmlwXCIgc3R5bGU9e3sgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkey12YWx1ZSAqIDEwfSUpYCB9fT5cclxuICAgICAgICB7XCIwMTIzNDU2Nzg5XCIuc3BsaXQoXCJcIikubWFwKChkKSA9PiA8c3BhbiBrZXk9e2R9PntkfTwvc3Bhbj4pfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBJbnRybygpIHtcclxuICBjb25zdCBbcGhhc2UsIHNldFBoYXNlXSA9IHVzZVN0YXRlKCgpID0+IHtcclxuICAgIGlmIChtb3Rpb25SZWR1Y2VkKCkpIHJldHVybiBcImRvbmVcIjtcclxuICAgIHRyeSB7IHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiaW50cm8tdmlzdGFcIikgPyBcImRvbmVcIiA6IFwiY291bnRcIjsgfSBjYXRjaCB7IHJldHVybiBcImNvdW50XCI7IH1cclxuICB9KTtcclxuICBjb25zdCBbbiwgc2V0Tl0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBza2lwUmVmID0gdXNlUmVmKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBoYXNlID09PSBcImRvbmVcIiB8fCBwaGFzZSA9PT0gXCJzcGxpdFwiKSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC5yZWFkeSA9IFwiMVwiO1xyXG4gICAgaWYgKHBoYXNlID09PSBcImRvbmVcIikgeyB0cnkgeyBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiaW50cm8tdmlzdGFcIiwgXCIxXCIpOyB9IGNhdGNoIHt9IH1cclxuICB9LCBbcGhhc2VdKTtcclxuXHJcbiAgLy8gQ29udGFkb3I6IGF2YW56YSBjb24gZWwgdGllbXBvLCBwZXJvIGVzcGVyYSBhIHF1ZSBjYXJndWVuIGxhIGZvdG8gcHJpbmNpcGFsIHkgbGEgdGlwb2dyYWbDrWEuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwaGFzZSAhPT0gXCJjb3VudFwiKSByZXR1cm47XHJcbiAgICBsZXQgbG9hZGVkID0gMC4xNSwgcmFmO1xyXG4gICAgY29uc3QgcGFydHMgPSBbXHJcbiAgICAgIG5ldyBQcm9taXNlKChyKSA9PiB7IGNvbnN0IGkgPSBuZXcgSW1hZ2UoKTsgaS5vbmxvYWQgPSBpLm9uZXJyb3IgPSByOyBpLnNyYyA9IElNRy5oZXJvOyB9KSxcclxuICAgICAgbmV3IFByb21pc2UoKHIpID0+IHsgY29uc3QgaSA9IG5ldyBJbWFnZSgpOyBpLm9ubG9hZCA9IGkub25lcnJvciA9IHI7IGkuc3JjID0gSU1HLmhlcm9CZzsgfSksXHJcbiAgICAgIGRvY3VtZW50LmZvbnRzID8gZG9jdW1lbnQuZm9udHMucmVhZHkgOiBQcm9taXNlLnJlc29sdmUoKSxcclxuICAgIF07XHJcbiAgICBwYXJ0cy5mb3JFYWNoKChwKSA9PiBwLnRoZW4oKCkgPT4geyBsb2FkZWQgKz0gMC44NSAvIHBhcnRzLmxlbmd0aDsgfSkpO1xyXG4gICAgY29uc3QgZ2l2ZVVwID0gc2V0VGltZW91dCgoKSA9PiB7IGxvYWRlZCA9IDE7IH0sIDUwMDApO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKSwgRFVSID0gMTkwMDtcclxuICAgIGNvbnN0IHRpY2sgPSAodCkgPT4ge1xyXG4gICAgICBjb25zdCB0aW1lID0gTWF0aC5taW4oKHQgLSBzdGFydCkgLyBEVVIsIDEpO1xyXG4gICAgICBjb25zdCBlYXNlZCA9IHRpbWUgPCAwLjUgPyA0ICogdGltZSAqKiAzIDogMSAtICgtMiAqIHRpbWUgKyAyKSAqKiAzIC8gMjtcclxuICAgICAgY29uc3QgdiA9IE1hdGgucm91bmQoTWF0aC5taW4oZWFzZWQsIGxvYWRlZCkgKiAxMDApO1xyXG4gICAgICBzZXROKHYpO1xyXG4gICAgICBpZiAodiA+PSAxMDApIHNldFRpbWVvdXQoKCkgPT4gc2V0UGhhc2UoXCJ3b3JkXCIpLCAyMDApO1xyXG4gICAgICBlbHNlIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxuICAgIH07XHJcbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XHJcbiAgICByZXR1cm4gKCkgPT4geyBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpOyBjbGVhclRpbWVvdXQoZ2l2ZVVwKTsgfTtcclxuICB9LCBbcGhhc2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwaGFzZSA9PT0gXCJ3b3JkXCIpIHsgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gc2V0UGhhc2UoXCJzcGxpdFwiKSwgOTAwKTsgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0KTsgfVxyXG4gICAgaWYgKHBoYXNlID09PSBcInNwbGl0XCIpIHsgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gc2V0UGhhc2UoXCJkb25lXCIpLCAxMTAwKTsgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0KTsgfVxyXG4gIH0sIFtwaGFzZV0pO1xyXG5cclxuICBpZiAocGhhc2UgPT09IFwiZG9uZVwiKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBkaWdpdHMgPSBTdHJpbmcobikucGFkU3RhcnQoMywgXCIwXCIpLnNwbGl0KFwiXCIpLm1hcChOdW1iZXIpO1xyXG4gIGNvbnN0IGxlZnQgPSBcIlNJTlwiLCByaWdodCA9IFwiTMONTUlURVNcIjtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BpbnRybyBpbnRyby0ke3BoYXNlfWB9IHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPVwiQ2FyZ2FuZG8gNyBTdHJlbmd0aCBDZW50ZXJcIj5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8tbGluZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm8taGFsZiBpbnRyby1sZWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAge3BoYXNlICE9PSBcImNvdW50XCIgJiYgKFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8td29yZFwiPlxyXG4gICAgICAgICAgICB7Wy4uLmxlZnRdLm1hcCgoY2gsIGkpID0+IDxzcGFuIGtleT17aX0gc3R5bGU9e3sgYW5pbWF0aW9uRGVsYXk6IGAke2kgKiAwLjA1fXNgIH19PntjaH08L3NwYW4+KX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyby1oYWxmIGludHJvLXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAge3BoYXNlICE9PSBcImNvdW50XCIgJiYgKFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8td29yZFwiPlxyXG4gICAgICAgICAgICB7Wy4uLnJpZ2h0XS5tYXAoKGNoLCBpKSA9PiA8c3BhbiBrZXk9e2l9IHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiBgJHswLjE1ICsgaSAqIDAuMDV9c2AgfX0+e2NofTwvc3Bhbj4pfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7cGhhc2UgPT09IFwiY291bnRcIiAmJiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyby1jb3VudGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnRyby1sYWJlbFwiPkNhcmdhbmRvPC9zcGFuPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyby1udW1cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8tb3V0bGluZVwiPntkaWdpdHMubWFwKChkLCBpKSA9PiA8RGlnaXQga2V5PXtpfSB2YWx1ZT17ZH0gLz4pfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW50cm8tZmlsbFwiIHN0eWxlPXt7IGNsaXBQYXRoOiBgaW5zZXQoJHsxMDAgLSBufSUgMCAwIDApYCB9fT57ZGlnaXRzLm1hcCgoZCwgaSkgPT4gPERpZ2l0IGtleT17aX0gdmFsdWU9e2R9IC8+KX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImludHJvLWxhYmVsIHJpZ2h0XCI+NyBTdHJlbmd0aDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgICAgPGJ1dHRvbiByZWY9e3NraXBSZWZ9IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbnRyby1za2lwXCIgb25DbGljaz17KCkgPT4gc2V0UGhhc2UoXCJkb25lXCIpfT5TYWx0YXIgaW50cm88L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IE5BViA9IFtcclxuICBbXCJOb3NvdHJvc1wiLCBcIiNub3NvdHJvc1wiXSxcclxuICBbXCJFbnRyZW5hZG9yZXNcIiwgXCIjZW50cmVuYWRvcmVzXCJdLFxyXG4gIFtcIlJlZWxzXCIsIFwiI3JlZWxzXCJdLFxyXG4gIFtcIlpvbmFzXCIsIFwiI3pvbmFzXCJdLFxyXG4gIFtcIlBsYW5lc1wiLCBcIiNwbGFuZXNcIl0sXHJcbiAgW1wiSG9yYXJpb3NcIiwgXCIjaG9yYXJpb3NcIl0sXHJcbiAgW1wiQ29udGFjdG9cIiwgXCIjY29udGFjdG9cIl0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBTY3JvbGxQcm9ncmVzcygpIHtcclxuICBjb25zdCB7IHNjcm9sbFlQcm9ncmVzcyB9ID0gdXNlU2Nyb2xsKCk7XHJcbiAgY29uc3Qgc2NhbGVYID0gdXNlU3ByaW5nKHNjcm9sbFlQcm9ncmVzcywgeyBzdGlmZm5lc3M6IDEyMCwgZGFtcGluZzogMzAsIHJlc3REZWx0YTogMC4wMDEgfSk7XHJcbiAgcmV0dXJuIDxtb3Rpb24uZGl2IGNsYXNzTmFtZT1cInNjcm9sbC1wcm9ncmVzc1wiIHN0eWxlPXt7IHNjYWxlWCB9fSAvPjtcclxufVxyXG5cclxuZnVuY3Rpb24gTG9nbyh7IHNpemUgPSA0OCB9KSB7XHJcbiAgcmV0dXJuIDxpbWcgY2xhc3NOYW1lPVwibG9nb1wiIHNyYz17c2l0ZUNvbmZpZy5sb2dvUGF0aH0gYWx0PVwiXCIgd2lkdGg9e3NpemV9IGhlaWdodD17c2l6ZX0gLz47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhlYWRlcigpIHtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NvbGlkLCBzZXRTb2xpZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgbWVudUJ0biA9IHVzZVJlZihudWxsKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBzZXRTb2xpZCh3aW5kb3cuc2Nyb2xsWSA+IDQwKTtcclxuICAgIG9uU2Nyb2xsKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICB9LCBbXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbikgcmV0dXJuO1xyXG4gICAgY29uc3Qgb25LZXkgPSAoZSkgPT4geyBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHsgc2V0T3BlbihmYWxzZSk7IG1lbnVCdG4uY3VycmVudD8uZm9jdXMoKTsgfSB9O1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXkpO1xyXG4gICAgcmV0dXJuICgpID0+IHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5KTtcclxuICB9LCBbb3Blbl0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17YGhlYWRlciR7c29saWQgPyBcIiBzb2xpZFwiIDogXCJcIn1gfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgaGVhZGVyLWlubmVyXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIiNpbmljaW9cIiBjbGFzc05hbWU9XCJicmFuZFwiIGFyaWEtbGFiZWw9XCI3IFN0cmVuZ3RoIENlbnRlciwgaXIgYWwgaW5pY2lvXCI+XHJcbiAgICAgICAgICA8TG9nbyAvPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+NyA8Yj5TdHJlbmd0aDwvYj48L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2LWRlc2t0b3BcIiBhcmlhLWxhYmVsPVwiUHJpbmNpcGFsXCI+XHJcbiAgICAgICAgICB7TkFWLm1hcCgoW2xhYmVsLCBocmVmXSkgPT4gPGEga2V5PXtocmVmfSBocmVmPXtocmVmfT57bGFiZWx9PC9hPil9XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgPEExMXlQYW5lbCAvPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tc20gaGlkZS1tb2JpbGVcIiBocmVmPXt3YSgpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+SW5zY3LDrWJldGU8L2E+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgcmVmPXttZW51QnRufVxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJtZW51LWJ0blwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gXCJDZXJyYXIgbWVuw7pcIiA6IFwiQWJyaXIgbWVuw7pcIn1cclxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICBhcmlhLWNvbnRyb2xzPVwibWVudS1tb3ZpbFwiXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7b3BlbiA/IDxYSWNvbiBzaXplPXsyNn0gLz4gOiA8TWVudUljb24gc2l6ZT17MjZ9IC8+fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cclxuICAgICAgICB7b3BlbiAmJiAoXHJcbiAgICAgICAgICA8bW90aW9uLm5hdlxyXG4gICAgICAgICAgICBpZD1cIm1lbnUtbW92aWxcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJuYXYtbW9iaWxlXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk1lbsO6XCJcclxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAtMTIsIHNjYWxlOiAwLjk3IH19XHJcbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCwgc2NhbGU6IDEsIHRyYW5zaXRpb246IHsgZHVyYXRpb246IDAuMjIsIGVhc2U6IEVBU0UgfSB9fVxyXG4gICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IC04LCB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwLjE1IH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge05BVi5tYXAoKFtsYWJlbCwgaHJlZl0pID0+IDxhIGtleT17aHJlZn0gaHJlZj17aHJlZn0gb25DbGljaz17KCkgPT4gc2V0T3BlbihmYWxzZSl9PntsYWJlbH08L2E+KX1cclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj17d2EoKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPkluc2Nyw61iZXRlIHBvciBXaGF0c0FwcDwvYT5cclxuICAgICAgICAgIDwvbW90aW9uLm5hdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cclxuICAgIDwvaGVhZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gSEVSTyAzRDogcGVyc29uYWplIGFsIGNlbnRybywgU1RSRU5HVEggZGV0csOhcyAtLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIEhlcm8oKSB7XHJcbiAgY29uc3Qgc2NlbmVSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHNjZW5lID0gc2NlbmVSZWYuY3VycmVudDtcclxuICAgIGlmICghc2NlbmUpIHJldHVybjtcclxuICAgIGNvbnN0IGxheWVycyA9IFsuLi5zY2VuZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZGVwdGhdXCIpXS5tYXAoKGVsKSA9PiAoeyBlbCwgZDogcGFyc2VGbG9hdChlbC5kYXRhc2V0LmRlcHRoKSB9KSk7XHJcbiAgICBsZXQgdHggPSAwLCB0eSA9IDAsIGN4ID0gMCwgY3kgPSAwLCBzeSA9IDAsIHJhZjtcclxuICAgIGNvbnN0IG1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICB0eCA9IChlLmNsaWVudFggLyBpbm5lcldpZHRoIC0gMC41KSAqIDI7XHJcbiAgICAgIHR5ID0gKGUuY2xpZW50WSAvIGlubmVySGVpZ2h0IC0gMC41KSAqIDI7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2Nyb2xsID0gKCkgPT4geyBzeSA9IE1hdGgubWluKHNjcm9sbFksIGlubmVySGVpZ2h0KTsgfTtcclxuICAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChtb3Rpb25SZWR1Y2VkKCkpIHsgdHggPSAwOyB0eSA9IDA7IHN5ID0gMDsgfVxyXG4gICAgICBjeCA9IGxlcnAoY3gsIHR4LCAwLjA3KTsgY3kgPSBsZXJwKGN5LCB0eSwgMC4wNyk7XHJcbiAgICAgIGNvbnN0IHAgPSBzeSAvIGlubmVySGVpZ2h0O1xyXG4gICAgICBmb3IgKGNvbnN0IHsgZWwsIGQgfSBvZiBsYXllcnMpIHtcclxuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHsoLWN4ICogZCkudG9GaXhlZCgxKX1weCwgJHsoLWN5ICogZCAqIDAuNiArIHN5ICogZCAqIDAuMDEpLnRvRml4ZWQoMSl9cHgsICR7KGQgKiBwICogMykudG9GaXhlZCgwKX1weClgO1xyXG4gICAgICB9XHJcbiAgICAgIHNjZW5lLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVYKCR7KGN5ICogLTMgKyBwICogNikudG9GaXhlZCgyKX1kZWcpIHJvdGF0ZVkoJHsoY3ggKiA1KS50b0ZpeGVkKDIpfWRlZylgO1xyXG4gICAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICB9O1xyXG4gICAgaWYgKGZpbmVQb2ludGVyKCkpIGFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBtb3ZlKTtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbW92ZSk7XHJcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2Nyb2xsKTtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJpbmljaW9cIiBjbGFzc05hbWU9XCJoZXJvXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVyby1zdGFnZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVyby1zY2VuZVwiIHJlZj17c2NlbmVSZWZ9PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLWJnXCIgZGF0YS1kZXB0aD1cIjhcIj48aW1nIHNyYz17SU1HLmhlcm9CZ30gYWx0PVwiXCIgLz48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgc21va2Ugc21va2UtMVwiIGRhdGEtZGVwdGg9XCIxNFwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyIHNtb2tlIHNtb2tlLTJcIiBkYXRhLWRlcHRoPVwiMjBcIiAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllciBoZXJvLXdvcmQtd3JhcFwiIGRhdGEtZGVwdGg9XCIxOFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZXJvLXdvcmRcIj57Wy4uLlwiU3RyZW5ndGhcIl0ubWFwKChjaCwgaSkgPT4gPHNwYW4ga2V5PXtpfSBzdHlsZT17eyBhbmltYXRpb25EZWxheTogYCR7MC4xNSArIGkgKiAwLjA2fXNgIH19PntjaH08L3NwYW4+KX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgaGVyby1nbG93XCIgZGF0YS1kZXB0aD1cIjI2XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgaGVyby1wZXJzb25cIiBkYXRhLWRlcHRoPVwiMzhcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9e0lNRy5oZXJvfSBhbHQ9XCJBdGxldGEgZGUgZXNwYWxkYXMgbW9zdHJhbmRvIGxhIG11c2N1bGF0dXJhIHRyYWJhamFkYVwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXIgc21va2Ugc21va2UtM1wiIGRhdGEtZGVwdGg9XCI1MFwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYXJrc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTggfSkubWFwKChfLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGkga2V5PXtpfSBzdHlsZT17eyBsZWZ0OiBgJHsoaSAqIDUzKSAlIDEwMH0lYCwgYW5pbWF0aW9uRGVsYXk6IGAkeyhpICogMC43KSAlIDZ9c2AsIGFuaW1hdGlvbkR1cmF0aW9uOiBgJHs1ICsgKGkgJSA1KX1zYCB9fSAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXNoYWRlXCIgLz5cclxuXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJzb2NpYWwtcmFpbFwiIGFyaWEtbGFiZWw9XCJSZWRlc1wiPlxyXG4gICAgICAgIDxsaT48YSBocmVmPXtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1Vcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBhcmlhLWxhYmVsPVwiSW5zdGFncmFtXCI+PEluc3RhZ3JhbUljb24gc2l6ZT17MTZ9IC8+PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9e3dhKCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBhcmlhLWxhYmVsPVwiV2hhdHNBcHBcIj48TWVzc2FnZUNpcmNsZUljb24gc2l6ZT17MTZ9IC8+PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9e3NpdGVDb25maWcuZ29vZ2xlTWFwc1VybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJVYmljYWNpw7NuXCI+PE1hcFBpbkljb24gc2l6ZT17MTZ9IC8+PC9hPjwvbGk+XHJcbiAgICAgIDwvdWw+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBoZXJvLWNvbnRlbnRcIj5cclxuICAgICAgICA8aDE+XHJcbiAgICAgICAgICA8U3BsaXRUZXh0IHRleHQ9XCJMYSBmdWVyemFcIiBjbGFzc05hbWU9XCJhY2NlbnRcIiBkZWxheT17MC41fSAvPntcIiBcIn1cclxuICAgICAgICAgIDxTcGxpdFRleHQgdGV4dD1cIm5vIHNlIHJlZ2FsYVwiIGRlbGF5PXswLjc1fSAvPlxyXG4gICAgICAgIDwvaDE+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiaGVyby1zdWJcIj5cclxuICAgICAgICAgIFNlIGNvbnN0cnV5ZSByZXBldGljacOzbiB0cmFzIHJlcGV0aWNpw7NuLCBlbiBlbCBjZW50cm8gZGUgYWx0byByZW5kaW1pZW50byBkZSB7c2l0ZUNvbmZpZy5jaXR5LnNwbGl0KFwiLFwiKVswXX0uXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG4vLyBEb3MgY2ludGFzIGNydXphZGFzIHF1ZSBzZSBtdWV2ZW4gZW4gc2VudGlkb3Mgb3B1ZXN0b3MuXHJcbmZ1bmN0aW9uIFJpYmJvbnMoKSB7XHJcbiAgY29uc3Qgd29yZHMgPSBbXCJGdWVyemFcIiwgXCJEaXNjaXBsaW5hXCIsIFwiVMOpY25pY2FcIiwgXCJQb3dlciBUZWFtXCIsIFwiQ29uc3RhbmNpYVwiLCBcIlNpbiBsw61taXRlc1wiXTtcclxuICBjb25zdCByb3cgPSBbLi4ud29yZHMsIC4uLndvcmRzLCAuLi53b3JkcywgLi4ud29yZHNdO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJpYmJvbnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWJib24gcmliYm9uLWRhcmtcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpYmJvbi10cmFjayByZXZlcnNlXCI+e3Jvdy5tYXAoKHcsIGkpID0+IDxzcGFuIGtleT17aX0+e3d9PGk+LzwvaT48L3NwYW4+KX08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmliYm9uIHJpYmJvbi1yZWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpYmJvbi10cmFja1wiPntyb3cubWFwKCh3LCBpKSA9PiA8c3BhbiBrZXk9e2l9Pnt3fTxEdW1iYmVsbEljb24gc2l6ZT17MjJ9IC8+PC9zcGFuPil9PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gVmlkZW8gZGUgcHJlc2VudGFjacOzbiAocmVlbCBkZSBJbnN0YWdyYW0gZGVzY2FyZ2FkbykuIFNlIHJlcHJvZHVjZSBzb2xvIGFsIHZlcnNlLlxyXG5jb25zdCBQYXVzZUljb24gPSAoeyBzaXplID0gMTggfSkgPT4gKFxyXG4gIDxzdmcgd2lkdGg9e3NpemV9IGhlaWdodD17c2l6ZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48cmVjdCB4PVwiNlwiIHk9XCI1XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiAvPjxyZWN0IHg9XCIxNFwiIHk9XCI1XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiAvPjwvc3ZnPlxyXG4pO1xyXG5jb25zdCBQbGF5R2x5cGggPSAoeyBzaXplID0gMTggfSkgPT4gKFxyXG4gIDxzdmcgd2lkdGg9e3NpemV9IGhlaWdodD17c2l6ZX0gdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48cGF0aCBkPVwiTTggNS41djEzYTEgMSAwIDAgMCAxLjUuODZsMTAuNS02LjVhMSAxIDAgMCAwIDAtMS43Mkw5LjUgNC42NEExIDEgMCAwIDAgOCA1LjV6XCIgLz48L3N2Zz5cclxuKTtcclxuY29uc3QgQUJPVVRfUkVFTCA9IFwiREdMeGhyRE1GU25cIjtcclxuZnVuY3Rpb24gQWJvdXRWaWRlbygpIHtcclxuICBjb25zdCByZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IFttdXRlZCwgc2V0TXV0ZWRdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKCgpID0+IG1vdGlvblJlZHVjZWQoKSk7XHJcbiAgY29uc3QgcGF1c2VkUmVmID0gdXNlUmVmKHBhdXNlZCk7XHJcbiAgY29uc3QgbXV0ZWRSZWYgPSB1c2VSZWYodHJ1ZSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHBhdXNlZFJlZi5jdXJyZW50ID0gcGF1c2VkO1xyXG4gICAgY29uc3QgdiA9IHJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCF2KSByZXR1cm47XHJcbiAgICBpZiAocGF1c2VkKSB2LnBhdXNlKCk7IGVsc2Ugdi5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gIH0sIFtwYXVzZWRdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbXV0ZWRSZWYuY3VycmVudCA9IG11dGVkO1xyXG4gICAgaWYgKHJlZi5jdXJyZW50KSByZWYuY3VycmVudC5tdXRlZCA9IG11dGVkO1xyXG4gIH0sIFttdXRlZF0pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB2ID0gcmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXYpIHJldHVybjtcclxuICAgIGNvbnN0IGlvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbZV0pID0+IHtcclxuICAgICAgaWYgKGUuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICBpZiAocGF1c2VkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAodi5tdXRlZCAhPT0gbXV0ZWRSZWYuY3VycmVudCkgdi5tdXRlZCA9IG11dGVkUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgdi5wbGF5KCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgdi5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHYucGxheSgpLmNhdGNoKCgpID0+IHt9KSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHYucGF1c2UoKTtcclxuICAgIH0sIHsgdGhyZXNob2xkOiAwLjI1IH0pO1xyXG4gICAgaW8ub2JzZXJ2ZShib3hSZWYuY3VycmVudCB8fCB2KTtcclxuICAgIHJldHVybiAoKSA9PiBpby5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHJlZj17Ym94UmVmfT5cclxuICAgIDxUaWx0IGNsYXNzTmFtZT1cImFib3V0LXZpZGVvIGdsYXNzIGxpcXVpZFwiIG1heD17Nn0+XHJcbiAgICAgIDx2aWRlb1xyXG4gICAgICAgIHJlZj17cmVmfVxyXG4gICAgICAgIHNyYz17YC9hc3NldHMvcmVlbHMvJHtBQk9VVF9SRUVMfS5tcDRgfVxyXG4gICAgICAgIHBvc3Rlcj17YC9hc3NldHMvcmVlbHMvJHtBQk9VVF9SRUVMfS5qcGdgfVxyXG4gICAgICAgIG11dGVkPXttdXRlZH1cclxuICAgICAgICBsb29wXHJcbiAgICAgICAgcGxheXNJbmxpbmVcclxuICAgICAgICBwcmVsb2FkPVwibWV0YWRhdGFcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9XCJWaWRlbyBkZSBwcmVzZW50YWNpw7NuIGRlIDcgU3RyZW5ndGggQ2VudGVyXCJcclxuICAgICAgLz5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJvdXQtY29udHJvbHNcIj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGwgZ2xhc3NcIiBvbkNsaWNrPXsoKSA9PiBzZXRQYXVzZWQoIXBhdXNlZCl9IGFyaWEtbGFiZWw9e3BhdXNlZCA/IFwiUmVwcm9kdWNpciB2aWRlb1wiIDogXCJQYXVzYXIgdmlkZW9cIn0+XHJcbiAgICAgICAgICB7cGF1c2VkID8gPFBsYXlHbHlwaCAvPiA6IDxQYXVzZUljb24gLz59XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwicm91bmQtYnRuIHNtYWxsIGdsYXNzXCIgb25DbGljaz17KCkgPT4gc2V0TXV0ZWQoIW11dGVkKX0gYXJpYS1sYWJlbD17bXV0ZWQgPyBcIkFjdGl2YXIgc29uaWRvXCIgOiBcIlNpbGVuY2lhclwifT5cclxuICAgICAgICAgIHttdXRlZCA/IDxWb2x1bWVYSWNvbiBzaXplPXsxOH0gLz4gOiA8Vm9sdW1lMkljb24gc2l6ZT17MTh9IC8+fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L1RpbHQ+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBYm91dCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gaWQ9XCJub3NvdHJvc1wiIGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgYWJvdXQtZ3JpZFwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8VGl0bGUgYWNjZW50PVwic29tb3NcIj5RdWnDqW5lczwvVGl0bGU+XHJcbiAgICAgICAgICA8UmV2ZWFsPlxyXG4gICAgICAgICAgICA8QWJvdXRWaWRlbyAvPlxyXG4gICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFJldmVhbCBjbGFzc05hbWU9XCJhYm91dC10ZXh0XCIgZGVsYXk9ezAuMTV9PlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPntzaXRlQ29uZmlnLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICBSYWNrcyBkZSBwb3RlbmNpYSwgYmFycmFzIG9sw61tcGljYXMsIGRpc2NvcyBjYWxpYnJhZG9zLCBtw6FxdWluYXMgZGUgYmlvbWVjw6FuaWNhIHkgdW5hIHpvbmEgZGUgY8Opc3BlZCBwYXJhXHJcbiAgICAgICAgICAgIGVtcHVqZSBkZSB0cmluZW8uIEVudHJlbmFtaWVudG8gcHJlc2VuY2lhbCB5IHZpcnR1YWwsIGNvbiBlbCByZXNwYWxkbyBkZWwgUG93ZXIgVGVhbS5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxkbCBjbGFzc05hbWU9XCJmYWN0c1wiPlxyXG4gICAgICAgICAgICA8ZGl2PjxkdD48Q291bnRVcCB0bz17Mn0gLz48L2R0PjxkZD5uaXZlbGVzIGRlIGVudHJlbmFtaWVudG88L2RkPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PjxkdD48Q291bnRVcCB0bz17MTAwMH0gc3VmZml4PVwiK1wiIC8+PC9kdD48ZGQ+c2VndWlkb3JlcyBlbiBJbnN0YWdyYW08L2RkPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PjxkdD48Q291bnRVcCB0bz17Nn0gLz48L2R0PjxkZD5kw61hcyBhIGxhIHNlbWFuYTwvZGQ+PC9kaXY+XHJcbiAgICAgICAgICA8L2RsPlxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj1cIiNlbnRyZW5hZG9yZXNcIj5Db25vY2UgYWwgZXF1aXBvIDxBcnJvd1JpZ2h0SWNvbiBzaXplPXsxOH0gLz48L2E+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IEZFQVRVUkVTID0gW1xyXG4gIFtEdW1iYmVsbEljb24sIFwiRXF1aXBhbWllbnRvIHByb1wiLCBcIlJhY2tzIGRlIHVzbyBydWRvLCBiYXJyYXMgb2zDrW1waWNhcyB5IGRpc2NvcyBkZSBjb21wZXRpY2nDs24uXCJdLFxyXG4gIFtUYXJnZXRJY29uLCBcIlTDqWNuaWNhIHByaW1lcm9cIiwgXCJQcm9ncmVzYXMgY29uIGxhIGZvcm1hIGNvcnJlY3RhIHkgc2luIGxlc2lvbmVzLlwiXSxcclxuICBbVXNlcnNJY29uLCBcIlBvd2VyIFRlYW1cIiwgXCJVbmEgY29tdW5pZGFkIGRvbmRlIGNhZGEgcmVwZXRpY2nDs24gY3VlbnRhLlwiXSxcclxuICBbQ2xvY2tJY29uLCBcIkhvcmFyaW8gZmxleGlibGVcIiwgXCJUdXJubyBtYcOxYW5hIHkgdGFyZGUsIGRlIGx1bmVzIGEgc8OhYmFkby5cIl0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBXaHlVcygpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid2h5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2h5LWJnXCI+PGltZyBzcmM9e0lNRy5yYWNrc30gYWx0PVwiXCIgbG9hZGluZz1cImxhenlcIiAvPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtb2tlIHNtb2tlLTJcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciB3aHktZ3JpZFwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8VGl0bGUgYWNjZW50PVwiZWxlZ2lybm9zXCI+UG9yIHF1w6k8L1RpdGxlPlxyXG4gICAgICAgICAgPG1vdGlvbi51bCBjbGFzc05hbWU9XCJmZWF0dXJlc1wiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgICAge0ZFQVRVUkVTLm1hcCgoW0ljb24sIHRpdGxlLCB0ZXh0XSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxtb3Rpb24ubGkga2V5PXt0aXRsZX0gdmFyaWFudHM9e3JldmVhbH0+XHJcbiAgICAgICAgICAgICAgICA8VGlsdCBjbGFzc05hbWU9XCJmZWF0dXJlXCIgbWF4PXsxMn0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIj48SWNvbiBzaXplPXsyMn0gLz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnt0aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPnt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1RpbHQ+XHJcbiAgICAgICAgICAgICAgPC9tb3Rpb24ubGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aHktYmlnXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhY2NlbnRcIj5FbnRyZW5hPC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4+QWhvcmE8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJvdXRsaW5lXCI+TWlzbW88L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gRU5UUkVOQURPUkVTIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gVHJhaW5lckNhcmQoeyB0IH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPG1vdGlvbi5saSB2YXJpYW50cz17cmV2ZWFsfT5cclxuICAgICAgPFRpbHQgYXM9XCJhXCIgaHJlZj17YCMvZW50cmVuYWRvci8ke3Quc2x1Z31gfSBjbGFzc05hbWU9XCJ0cmFpbmVyXCIgbWF4PXsxMH0gYXJpYS1sYWJlbD17YFZlciBwZXJmaWwgZGUgJHt0Lm5hbWV9YH0+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhaW5lci1iZ25hbWVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57dC5uYW1lLnNwbGl0KFwiIFwiKVswXX08L3NwYW4+XHJcbiAgICAgICAgPGltZyBjbGFzc05hbWU9XCJ0cmFpbmVyLXBob3RvXCIgc3JjPXt0LnBob3RvfSBhbHQ9XCJcIiBsb2FkaW5nPVwibGF6eVwiIC8+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhaW5lci1sYWJlbFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJhaW5lci1uYW1lXCI+e3QubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmFpbmVyLXJvbGVcIj57dC5yb2xlfTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyYWluZXItY3RhXCI+VmVyIHBlcmZpbCA8QXJyb3dSaWdodEljb24gc2l6ZT17MTZ9IC8+PC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9UaWx0PlxyXG4gICAgPC9tb3Rpb24ubGk+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVHJhaW5lcnMoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiZW50cmVuYWRvcmVzXCIgY2xhc3NOYW1lPVwic2VjdGlvbiB0cmFpbmVycy1zZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFRpdGxlIGNlbnRlciBhY2NlbnQ9XCJlbnRyZW5hZG9yZXNcIiBsZWFkPVwiQ2FkYSBjb2FjaCB0aWVuZSBzdSBwcm9waW8gcGVyZmlsOiBlbnRyYSB5IGRlc2N1YnJlIGVuIHF1w6kgdGUgcHVlZGUgYXl1ZGFyLlwiPkNvbm9jZSBhIGxvczwvVGl0bGU+XHJcbiAgICAgICAgPG1vdGlvbi51bCBjbGFzc05hbWU9XCJ0cmFpbmVyc1wiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtzaXRlQ29uZmlnLnRyYWluZXJzLm1hcCgodCkgPT4gPFRyYWluZXJDYXJkIGtleT17dC5zbHVnfSB0PXt0fSAvPil9XHJcbiAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFRyYWluZXJQcm9maWxlKHsgdCB9KSB7XHJcbiAgY29uc3Qgb3RoZXJzID0gc2l0ZUNvbmZpZy50cmFpbmVycy5maWx0ZXIoKG8pID0+IG8uc2x1ZyAhPT0gdC5zbHVnKTtcclxuICByZXR1cm4gKFxyXG4gICAgPG1haW4gaWQ9XCJjb250ZW5pZG9cIiB0YWJJbmRleD17LTF9IGNsYXNzTmFtZT1cInByb2ZpbGVcIj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHJvZmlsZS1oZXJvXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlLWdsb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHByb2ZpbGUtZ3JpZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlLXRleHRcIj5cclxuICAgICAgICAgICAgPG1vdGlvbi5hIGNsYXNzTmFtZT1cImJhY2stbGlua1wiIGhyZWY9XCIjZW50cmVuYWRvcmVzXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB4OiAtMTIgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB4OiAwIH19IHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNCwgZWFzZTogRUFTRSB9fT5cclxuICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uIHNpemU9ezE4fSAvPiBUb2RvcyBsb3MgZW50cmVuYWRvcmVzXHJcbiAgICAgICAgICAgIDwvbW90aW9uLmE+XHJcbiAgICAgICAgICAgIDxoMSB0YWJJbmRleD17LTF9PjxTcGxpdFRleHQgdGV4dD17dC5uYW1lfSBkZWxheT17MC4xfSAvPjwvaDE+XHJcbiAgICAgICAgICAgIDxtb3Rpb24ucCBjbGFzc05hbWU9XCJwcm9maWxlLXJvbGVcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19IHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNSB9fT57dC5yb2xlfTwvbW90aW9uLnA+XHJcbiAgICAgICAgICAgIDxtb3Rpb24uYmxvY2txdW90ZSBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDE2IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjYsIGR1cmF0aW9uOiAwLjYsIGVhc2U6IEVBU0UgfX0+XHJcbiAgICAgICAgICAgICAg4oCce3QucXVvdGV94oCdXHJcbiAgICAgICAgICAgIDwvbW90aW9uLmJsb2NrcXVvdGU+XHJcbiAgICAgICAgICAgIDxtb3Rpb24uZGwgY2xhc3NOYW1lPVwiZmFjdHNcIiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDE2IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjc1LCBkdXJhdGlvbjogMC42LCBlYXNlOiBFQVNFIH19PlxyXG4gICAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXt0LnllYXJzfSAvPjwvZHQ+PGRkPmHDsW9zIGVudHJlbmFuZG88L2RkPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXY+PGR0PjxDb3VudFVwIHRvPXt0LmF0aGxldGVzfSBzdWZmaXg9XCIrXCIgLz48L2R0PjxkZD5wZXJzb25hcyBhY29tcGHDsWFkYXM8L2RkPjwvZGl2PlxyXG4gICAgICAgICAgICA8L21vdGlvbi5kbD5cclxuICAgICAgICAgICAgPG1vdGlvbi5kaXYgY2xhc3NOYW1lPVwiaGVyby1jdGFzXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxNiB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gdHJhbnNpdGlvbj17eyBkZWxheTogMC45LCBkdXJhdGlvbjogMC42LCBlYXNlOiBFQVNFIH19PlxyXG4gICAgICAgICAgICAgIDxNYWduZXRpYyBjbGFzc05hbWU9XCJidG5cIiBocmVmPXt3YShgSG9sYSwgcXVpZXJvIHJlc2VydmFyIHVuYSBzZXNpw7NuIGNvbiAke3QubmFtZX0gZW4gNyBTdHJlbmd0aCBDZW50ZXIuYCl9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuICAgICAgICAgICAgICAgIFJlc2VydmFyIGNvbiB7dC5uYW1lLnNwbGl0KFwiIFwiKVswXX0gPEFycm93UmlnaHRJY29uIHNpemU9ezE4fSAvPlxyXG4gICAgICAgICAgICAgIDwvTWFnbmV0aWM+XHJcbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPG1vdGlvbi5kaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1waG90by13cmFwXCIgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NCwgeTogNDAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjksIGVhc2U6IEVBU0UsIGRlbGF5OiAwLjE1IH19PlxyXG4gICAgICAgICAgICA8VGlsdCBjbGFzc05hbWU9XCJwcm9maWxlLXBob3RvXCIgbWF4PXsxMn0+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvZmlsZS1pbml0aWFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3QubmFtZS5zcGxpdChcIiBcIilbMF19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByb2ZpbGUtcmluZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9e3QucGhvdG99IGFsdD17dC5uYW1lfSAvPlxyXG4gICAgICAgICAgICA8L1RpbHQ+XHJcbiAgICAgICAgICA8L21vdGlvbi5kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBwcm9maWxlLWJvZHlcIj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCLDqWxcIj5Tb2JyZTwvVGl0bGU+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgYXM9XCJwXCIgY2xhc3NOYW1lPVwicHJvZmlsZS1iaW9cIj57dC5iaW99PC9SZXZlYWw+XHJcbiAgICAgICAgICAgIDxtb3Rpb24udWwgY2xhc3NOYW1lPVwiY2hpcHNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICAgICAge3Quc3BlY2lhbHRpZXMubWFwKChzKSA9PiA8bW90aW9uLmxpIGtleT17c30gdmFyaWFudHM9e3JldmVhbH0+e3N9PC9tb3Rpb24ubGk+KX1cclxuICAgICAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwicHJvZmlsZS1zY2hlZHVsZVwiPlxyXG4gICAgICAgICAgICAgIDxDYWxlbmRhckljb24gc2l6ZT17MjB9IC8+IDxzcGFuPnt0LnNjaGVkdWxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxUaXRsZSBhY2NlbnQ9XCJheXVkYSBhXCI+VGU8L1RpdGxlPlxyXG4gICAgICAgICAgICA8bW90aW9uLm9sIGNsYXNzTmFtZT1cImhlbHBzXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAgICAgIHt0LmhlbHBzLm1hcCgoaCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5saSBrZXk9e2h9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIHNpemU9ezIwfSAvPiA8c3Bhbj57aH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21vdGlvbi5saT5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9tb3Rpb24ub2w+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzZWN0aW9uLWFsdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImNvYWNoZXNcIj5PdHJvczwvVGl0bGU+XHJcbiAgICAgICAgICA8bW90aW9uLnVsIGNsYXNzTmFtZT1cInRyYWluZXJzIHRyYWluZXJzLXNtYWxsXCIgdmFyaWFudHM9e3N0YWdnZXJ9IHsuLi5pblZpZXd9PlxyXG4gICAgICAgICAgICB7b3RoZXJzLm1hcCgobykgPT4gPFRyYWluZXJDYXJkIGtleT17by5zbHVnfSB0PXtvfSAvPil9XHJcbiAgICAgICAgICA8L21vdGlvbi51bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9tYWluPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0gUkVFTFM6IHZpZGVvcyBwcm9waW9zLCBzZSByZXByb2R1Y2VuIHNvbG9zIC0tLS0tLS0tLS1cclxuZnVuY3Rpb24gUmVlbHMoKSB7XHJcbiAgY29uc3QgcmVlbHMgPSBzaXRlQ29uZmlnLnJlZWxzO1xyXG4gIGNvbnN0IFthY3RpdmUsIHNldEFjdGl2ZV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbbXV0ZWQsIHNldE11dGVkXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtwYXVzZWQsIHNldFBhdXNlZF0gPSB1c2VTdGF0ZSgoKSA9PiBtb3Rpb25SZWR1Y2VkKCkpO1xyXG4gIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB2aWRzID0gdXNlUmVmKFtdKTtcclxuICBjb25zdCB3cmFwUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHN0YXJ0WCA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBnbyA9IChkKSA9PiBzZXRBY3RpdmUoKGEpID0+IChhICsgZCArIHJlZWxzLmxlbmd0aCkgJSByZWVscy5sZW5ndGgpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlXSkgPT4gc2V0VmlzaWJsZShlLmlzSW50ZXJzZWN0aW5nKSwgeyB0aHJlc2hvbGQ6IDAuMzUgfSk7XHJcbiAgICBpZiAod3JhcFJlZi5jdXJyZW50KSBpby5vYnNlcnZlKHdyYXBSZWYuY3VycmVudCk7XHJcbiAgICByZXR1cm4gKCkgPT4gaW8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdmlkcy5jdXJyZW50LmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgaWYgKCF2KSByZXR1cm47XHJcbiAgICAgIGlmIChpID09PSBhY3RpdmUgJiYgdmlzaWJsZSAmJiAhcGF1c2VkKSB7XHJcbiAgICAgICAgdi5tdXRlZCA9IG11dGVkO1xyXG4gICAgICAgIHYucGxheSgpLmNhdGNoKCgpID0+IHt9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2LnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKGkgIT09IGFjdGl2ZSkgdi5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFthY3RpdmUsIHZpc2libGUsIG11dGVkLCBwYXVzZWRdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwicmVlbHNcIiBjbGFzc05hbWU9XCJzZWN0aW9uIHJlZWxzLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8VGl0bGUgY2VudGVyIGFjY2VudD1cImVuIEluc3RhZ3JhbVwiIGxlYWQ9e2BMb3MgcmVlbHMgY29uIG3DoXMgdmlzdGFzIGRlICR7c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtSGFuZGxlfS4gU2UgcmVwcm9kdWNlbiBzb2xvczogdG9jYSBlbCBhbHRhdm96IHBhcmEgZXNjdWNoYXIuYH0+TG8gbcOhcyB2aXN0bzwvVGl0bGU+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcmVmPXt3cmFwUmVmfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY292ZXJmbG93XCJcclxuICAgICAgICAgIHJvbGU9XCJyZWdpb25cIlxyXG4gICAgICAgICAgYXJpYS1yb2xlZGVzY3JpcHRpb249XCJjYXJydXNlbFwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiUmVlbHMgbcOhcyB2aXN0b3NcIlxyXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XHJcbiAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7IGlmIChlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIGdvKDEpOyBpZiAoZS5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpIGdvKC0xKTsgfX1cclxuICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiB7IHN0YXJ0WC5jdXJyZW50ID0gZS5jbGllbnRYOyB9fVxyXG4gICAgICAgICAgb25Qb2ludGVyVXA9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGFydFguY3VycmVudCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gZS5jbGllbnRYIC0gc3RhcnRYLmN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkeCkgPiA1MCkgZ28oZHggPCAwID8gMSA6IC0xKTtcclxuICAgICAgICAgICAgc3RhcnRYLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7cmVlbHMubWFwKChyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvZmYgPSBpIC0gYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAob2ZmID4gcmVlbHMubGVuZ3RoIC8gMikgb2ZmIC09IHJlZWxzLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKG9mZiA8IC1yZWVscy5sZW5ndGggLyAyKSBvZmYgKz0gcmVlbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBhYnMgPSBNYXRoLmFicyhvZmYpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IG9mZiA9PT0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3IuY29kZX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlZWwke2lzQWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwifWB9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKGNhbGMoLTUwJSArICR7b2ZmICogNjR9JSkpIHRyYW5zbGF0ZVooJHstYWJzICogMTcwfXB4KSByb3RhdGVZKCR7b2ZmICogLTM2fWRlZylgLFxyXG4gICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwIC0gYWJzLFxyXG4gICAgICAgICAgICAgICAgICBvcGFjaXR5OiBhYnMgPiAyID8gMCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGFicyA+IDIgPyBcIm5vbmVcIiA6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+ICFpc0FjdGl2ZSAmJiBzZXRBY3RpdmUoaSl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHZpZGVvXHJcbiAgICAgICAgICAgICAgICAgIHJlZj17KGVsKSA9PiAodmlkcy5jdXJyZW50W2ldID0gZWwpfVxyXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvYXNzZXRzL3JlZWxzLyR7ci5jb2RlfS5tcDRgfVxyXG4gICAgICAgICAgICAgICAgICBwb3N0ZXI9e2AvYXNzZXRzL3JlZWxzLyR7ci5jb2RlfS5qcGdgfVxyXG4gICAgICAgICAgICAgICAgICBtdXRlZFxyXG4gICAgICAgICAgICAgICAgICBwbGF5c0lubGluZVxyXG4gICAgICAgICAgICAgICAgICBwcmVsb2FkPXthYnMgPD0gMSA/IFwiYXV0b1wiIDogXCJtZXRhZGF0YVwifVxyXG4gICAgICAgICAgICAgICAgICBvbkVuZGVkPXsoKSA9PiBpc0FjdGl2ZSAmJiBnbygxKX1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YFJlZWwgJHtpICsgMX0gZGUgJHtyZWVscy5sZW5ndGh9OiAke3IudGl0bGV9LCAke3Iudmlld3N9IHZpc3Rhc2B9XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtaGlkZGVuPXshaXNBY3RpdmV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVlbC12aWV3c1wiPjxFeWVJY29uIHNpemU9ezE0fSAvPiB7ci52aWV3c308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWVsLXRpdGxlXCI+e3IudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAge2lzQWN0aXZlICYmIChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVlbC1hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwicm91bmQtYnRuIHNtYWxsXCIgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0UGF1c2VkKCFwYXVzZWQpOyB9fSBhcmlhLWxhYmVsPXtwYXVzZWQgPyBcIlJlcHJvZHVjaXIgcmVlbFwiIDogXCJQYXVzYXIgcmVlbFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtwYXVzZWQgPyA8UGxheUdseXBoIC8+IDogPFBhdXNlSWNvbiAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJyb3VuZC1idG4gc21hbGxcIiBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRNdXRlZCghbXV0ZWQpOyB9fSBhcmlhLWxhYmVsPXttdXRlZCA/IFwiQWN0aXZhciBzb25pZG9cIiA6IFwiU2lsZW5jaWFyXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAge211dGVkID8gPFZvbHVtZVhJY29uIHNpemU9ezE4fSAvPiA6IDxWb2x1bWUySWNvbiBzaXplPXsxOH0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicm91bmQtYnRuIHNtYWxsXCIgaHJlZj17YGh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vcmVlbC8ke3IuY29kZX0vYH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGFyaWEtbGFiZWw9XCJBYnJpciBlbiBJbnN0YWdyYW1cIiBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rSWNvbiBzaXplPXsxNn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZWwtY29udHJvbHNcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicm91bmQtYnRuXCIgb25DbGljaz17KCkgPT4gZ28oLTEpfSBhcmlhLWxhYmVsPVwiUmVlbCBhbnRlcmlvclwiPjxDaGV2cm9uTGVmdEljb24gc2l6ZT17MjJ9IC8+PC9idXR0b24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvdHNcIj5cclxuICAgICAgICAgICAge3JlZWxzLm1hcCgociwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLmNvZGV9IGNsYXNzTmFtZT17aSA9PT0gYWN0aXZlID8gXCJvblwiIDogXCJcIn0gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlKGkpfSBhcmlhLWxhYmVsPXtgSXIgYWwgcmVlbCAke2kgKyAxfWB9IC8+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJvdW5kLWJ0blwiIG9uQ2xpY2s9eygpID0+IGdvKDEpfSBhcmlhLWxhYmVsPVwiUmVlbCBzaWd1aWVudGVcIj48Q2hldnJvblJpZ2h0SWNvbiBzaXplPXsyMn0gLz48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT1cImNlbnRlci1jdGFcIj5cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0biBidG4tZ2hvc3RcIiBocmVmPXtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1Vcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cclxuICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gc2l6ZT17MTh9IC8+IFPDrWd1ZW5vcyB7c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtSGFuZGxlfVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIFpPTkFTOiBwYW5lbGVzIHF1ZSBzZSBleHBhbmRlbiAtLS0tLS0tLS0tXHJcbmNvbnN0IFpPTkVTID0gW1xyXG4gIHsgaW1nOiBJTUcuZGlzY29zLCB0aXRsZTogXCJQb3dlcmxpZnRpbmdcIiwgdGV4dDogXCJTZW50YWRpbGxhLCBiYW5jYSB5IHBlc28gbXVlcnRvIHNvYnJlIHBsYXRhZm9ybWFzLCBjb24gZGlzY29zIGJ1bXBlciBjYWxpYnJhZG9zLlwiLCBnZWFyOiBbXCJCYXJyYXMgb2zDrW1waWNhc1wiLCBcIkRpc2NvcyBidW1wZXJcIiwgXCJQbGF0YWZvcm1hc1wiLCBcIkJhbmNvIGRlIGNvbXBldGljacOzblwiXSB9LFxyXG4gIHsgaW1nOiBJTUcucmFja3MsIHRpdGxlOiBcIlBlc28gbGlicmVcIiwgdGV4dDogXCJQb3dlciByYWNrcyBkZSB1c28gcnVkbyB5IGVzcGFjaW8gcGFyYSBlbnRyZW5hciBwZXNhZG8gc2luIGVzcGVyYXIgdHVybm8uXCIsIGdlYXI6IFtcIlBvd2VyIHJhY2tzXCIsIFwiTWFuY3Vlcm5hc1wiLCBcIkJhcnJhc1wiLCBcIkJhbmNvcyBhanVzdGFibGVzXCJdIH0sXHJcbiAgeyBpbWc6IElNRy5tYXF1aW5hcywgdGl0bGU6IFwiTcOhcXVpbmFzXCIsIHRleHQ6IFwiQmlvbWVjw6FuaWNhIHBhcmEgYWlzbGFyIGNhZGEgbcO6c2N1bG8gY29uIGNvbnRyb2wgeSBzZWd1cmlkYWQuXCIsIGdlYXI6IFtcIlByZW5zYSBpbmNsaW5hZGFcIiwgXCJIYWNrIHNxdWF0XCIsIFwiUG9sZWFzXCIsIFwiRXNwZWpvcyBwYW5vcsOhbWljb3NcIl0gfSxcclxuICB7IGltZzogSU1HLmludGVyaW9yLCB0aXRsZTogXCJGdW5jaW9uYWxcIiwgdGV4dDogXCJDw6lzcGVkIHNpbnTDqXRpY28gZW4gZG9zIG5pdmVsZXMgcGFyYSB0cmluZW8sIGFjb25kaWNpb25hbWllbnRvIHkgbW92aWxpZGFkLlwiLCBnZWFyOiBbXCJDw6lzcGVkIHNpbnTDqXRpY29cIiwgXCJUcmluZW9cIiwgXCJUUlhcIiwgXCJEb3Mgbml2ZWxlc1wiXSB9LFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gWm9uZXMoKSB7XHJcbiAgY29uc3QgW2FjdGl2ZSwgc2V0QWN0aXZlXSA9IHVzZVN0YXRlKDApO1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cInpvbmFzXCIgY2xhc3NOYW1lPVwic2VjdGlvbiBzZWN0aW9uLWFsdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxUaXRsZSBjZW50ZXIgYWNjZW50PVwiem9uYXNcIiBsZWFkPVwiUGFzYSBlbCBtb3VzZSBvIHRvY2EgY2FkYSB6b25hIHBhcmEgdmVyIHF1w6kgZXF1aXBvIGVuY29udHJhcsOhcy5cIj5OdWVzdHJhczwvVGl0bGU+XHJcbiAgICAgICAgPG1vdGlvbi5kaXYgY2xhc3NOYW1lPVwiem9uZXNcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICB7Wk9ORVMubWFwKCh6LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uID0gaSA9PT0gYWN0aXZlO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxtb3Rpb24uYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBrZXk9e3oudGl0bGV9XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50cz17cmV2ZWFsfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgem9uZSR7b24gPyBcIiBvblwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBmaW5lUG9pbnRlcigpICYmIHNldEFjdGl2ZShpKX1cclxuICAgICAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHNldEFjdGl2ZShpKX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZShpKX1cclxuICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29ufVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt6LmltZ30gYWx0PVwiXCIgbG9hZGluZz1cImxhenlcIiAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS1zaGFkZVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLXZlcnRpY2FsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3oudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiem9uZS1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtdGl0bGVcIj57ei50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInpvbmUtdGV4dFwiPnt6LnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6b25lLWdlYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7ei5nZWFyLm1hcCgoZykgPT4gPHNwYW4ga2V5PXtnfT57Z308L3NwYW4+KX1cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gUGxhbnMoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwicGxhbmVzXCIgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxUaXRsZSBjZW50ZXIgYWNjZW50PVwicGxhblwiPkVsaWdlIHR1PC9UaXRsZT5cclxuICAgICAgICA8bW90aW9uLmRpdiBjbGFzc05hbWU9XCJwbGFuc1wiIHZhcmlhbnRzPXtzdGFnZ2VyfSB7Li4uaW5WaWV3fT5cclxuICAgICAgICAgIHtzaXRlQ29uZmlnLnBsYW5zLm1hcCgocCkgPT4gKFxyXG4gICAgICAgICAgICA8bW90aW9uLmRpdiBrZXk9e3AuaWR9IHZhcmlhbnRzPXtyZXZlYWx9PlxyXG4gICAgICAgICAgICAgIDxUaWx0IGFzPVwiYXJ0aWNsZVwiIGNsYXNzTmFtZT17YHBsYW4ke3AuaXNGZWF0dXJlZCA/IFwiIGZlYXR1cmVkXCIgOiBcIlwifWB9IG1heD17N30+XHJcbiAgICAgICAgICAgICAgICB7cC5pc0ZlYXR1cmVkICYmIDxzcGFuIGNsYXNzTmFtZT1cImJhZGdlXCI+PFphcEljb24gc2l6ZT17MTR9IC8+IE3DoXMgZWxlZ2lkbzwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8aDM+e3AubmFtZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicGxhbi10YWdcIj57cC50YWdsaW5lfTwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2VcIj48c21hbGw+e3AuY3VycmVuY3l9PC9zbWFsbD57cC5wcmljZX08c3Bhbj4vIHtwLnBlcmlvZH08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWw+e3AuZmVhdHVyZXMubWFwKChmKSA9PiA8bGkga2V5PXtmfT48Q2hlY2tJY29uIHNpemU9ezE4fSAvPiB7Zn08L2xpPil9PC91bD5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17YGJ0biR7cC5pc0ZlYXR1cmVkID8gXCJcIiA6IFwiIGJ0bi1naG9zdFwifWB9IGhyZWY9e3Aud2hhdHNhcHBVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj57cC5idXR0b25UZXh0fTwvYT5cclxuICAgICAgICAgICAgICA8L1RpbHQ+XHJcbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLSBIT1JBUklPUzogZXN0YWRvIGVuIHZpdm8gKyBsw61uZWEgZGUgdGllbXBvIHNlbWFuYWwgLS0tLS0tLS0tLVxyXG4vLyAtLS0tLS0tLS0tIEhPUkFSSU9TOiB0cmVzIHRhcmpldGFzIHNpbXBsZXMgLS0tLS0tLS0tLVxyXG5jb25zdCBzaG9ydEhvdXIgPSAobWluKSA9PiB7XHJcbiAgY29uc3QgaCA9IE1hdGguZmxvb3IobWluIC8gNjApLCBtID0gbWluICUgNjA7XHJcbiAgcmV0dXJuIHsgbnVtOiBgJHtoICUgMTIgPT09IDAgPyAxMiA6IGggJSAxMn0ke20gPyBgOiR7U3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKX1gIDogXCJcIn1gLCBhbXBtOiBoIDwgMTIgPyBcIkFNXCIgOiBcIlBNXCIgfTtcclxufTtcclxuZnVuY3Rpb24gVGltZVJhbmdlKHsgcyB9KSB7XHJcbiAgY29uc3QgYSA9IHNob3J0SG91cihzLmZyb20pLCBiID0gc2hvcnRIb3VyKHMudG8pO1xyXG4gIGNvbnN0IHNwb2tlbiA9IGBkZSAke2ZtdFRpbWUoTWF0aC5mbG9vcihzLmZyb20gLyA2MCksIHMuZnJvbSAlIDYwKX0gYSAke2ZtdFRpbWUoTWF0aC5mbG9vcihzLnRvIC8gNjApLCBzLnRvICUgNjApfWA7XHJcbiAgcmV0dXJuIChcclxuICAgIDxsaSBjbGFzc05hbWU9XCJzaGlmdFwiPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzaGlmdC1uYW1lXCI+e3MubmFtZS5yZXBsYWNlKFwiVHVybm8gXCIsIFwiXCIpfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2hpZnQtdGltZVwiIGFyaWEtbGFiZWw9e3Nwb2tlbn0+XHJcbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+e2EubnVtfTxzbWFsbD57YS5hbXBtfTwvc21hbGw+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNoaWZ0LXNlcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+e2IubnVtfTxzbWFsbD57Yi5hbXBtfTwvc21hbGw+PC9zcGFuPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2xpPlxyXG4gICk7XHJcbn1cclxuZnVuY3Rpb24gU2NoZWR1bGUoKSB7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKGdldFN0YXR1cyk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiBzZXRTdGF0dXMoZ2V0U3RhdHVzKCkpLCAzMDAwMCk7XHJcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0KTtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgeyB3ZWVrZGF5cywgc2F0dXJkYXksIHN1bmRheSB9ID0gc2l0ZUNvbmZpZy5ob3VycztcclxuICBjb25zdCBncm91cHMgPSBbXHJcbiAgICB7IHRpdGxlOiB3ZWVrZGF5cy5kYXlzLCBkYXlzOiBbMSwgMiwgMywgNCwgNV0sIHNoaWZ0czogc2hpZnRzRm9yKDEpLCBub3RlOiBcIlBhdXNhIGRlIDEgYSAzIFBNXCIgfSxcclxuICAgIHsgdGl0bGU6IFwiU8OhYmFkb3NcIiwgZGF5czogWzZdLCBzaGlmdHM6IHNoaWZ0c0Zvcig2KSB9LFxyXG4gICAgeyB0aXRsZTogXCJEb21pbmdvc1wiLCBkYXlzOiBbMF0sIHNoaWZ0czogW10gfSxcclxuICBdO1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cImhvcmFyaW9zXCIgY2xhc3NOYW1lPVwic2VjdGlvbiBzY2hlZHVsZS1zZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY2hlZHVsZS1oZWFkXCI+XHJcbiAgICAgICAgICA8VGl0bGU+SG9yYXJpb3M8L1RpdGxlPlxyXG4gICAgICAgICAgPFJldmVhbCBjbGFzc05hbWU9e2BzdGF0dXMke3N0YXR1cy5vcGVuID8gXCIgb3BlblwiIDogXCJcIn1gfT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhdHVzLWRvdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIHJvbGU9XCJzdGF0dXNcIj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPntzdGF0dXMubGFiZWx9PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgPHNtYWxsPntzdGF0dXMuZGV0YWlsfTwvc21hbGw+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8bW90aW9uLnVsIGNsYXNzTmFtZT1cImhvdXJzLWdyaWRcIiB2YXJpYW50cz17c3RhZ2dlcn0gey4uLmluVmlld30+XHJcbiAgICAgICAgICB7Z3JvdXBzLm1hcCgoZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IGcuZGF5cy5pbmNsdWRlcyhzdGF0dXMuZGF5KTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8bW90aW9uLmxpIGtleT17Zy50aXRsZX0gdmFyaWFudHM9e3JldmVhbH0gY2xhc3NOYW1lPXtgaG91cnMtY2FyZCBnbGFzcyR7dG9kYXkgPyBcIiB0b2RheVwiIDogXCJcIn1gfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG91cnMtY2FyZC1oZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxoMz57Zy50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICB7dG9kYXkgJiYgPHNwYW4gY2xhc3NOYW1lPVwidG9kYXktYmFkZ2VcIj5Ib3k8L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7Zy5zaGlmdHMubGVuZ3RoID8gKFxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic2hpZnRzXCI+e2cuc2hpZnRzLm1hcCgocykgPT4gPFRpbWVSYW5nZSBrZXk9e3MubmFtZX0gcz17c30gLz4pfTwvdWw+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoaWZ0cy1lbXB0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPntzdW5kYXkuc3RhdHVzTm90ZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17d2EoXCJIb2xhLCDCv2FicmVuIGVzdGUgZG9taW5nbz9cIil9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5QcmVndW50YSBwb3IgV2hhdHNBcHAgPEFycm93UmlnaHRJY29uIHNpemU9ezE2fSAvPjwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAge2cubm90ZSAmJiA8cCBjbGFzc05hbWU9XCJob3Vycy1ub3RlXCI+PENsb2NrSWNvbiBzaXplPXsxNn0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz4ge2cubm90ZX08L3A+fVxyXG4gICAgICAgICAgICAgIDwvbW90aW9uLmxpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9tb3Rpb24udWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEN0YUJhbmQoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImN0YS1iYW5kXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGN0YS1pbm5lclwiPlxyXG4gICAgICAgIDxSZXZlYWwgYXM9XCJoMlwiPlR1IHByaW1lciBkw61hIGN1ZXN0YSBzb2xvIFMvIDE1PC9SZXZlYWw+XHJcbiAgICAgICAgPFJldmVhbCBkZWxheT17MC4xfT5cclxuICAgICAgICAgIDxNYWduZXRpYyBjbGFzc05hbWU9XCJidG4gYnRuLWRhcmtcIiBocmVmPXtzaXRlQ29uZmlnLnBsYW5zWzBdLndoYXRzYXBwVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XHJcbiAgICAgICAgICAgIFJlc2VydmFyIHBhc2UgZGlhcmlvIDxBcnJvd1JpZ2h0SWNvbiBzaXplPXsxOH0gLz5cclxuICAgICAgICAgIDwvTWFnbmV0aWM+XHJcbiAgICAgICAgPC9SZXZlYWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENvbnRhY3QoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGlkPVwiY29udGFjdG9cIiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGNvbnRhY3QtZ3JpZFwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8VGl0bGUgYWNjZW50PVwiZW5jb250cmFybm9zXCI+VmVuIGE8L1RpdGxlPlxyXG4gICAgICAgICAgPFJldmVhbCBhcz1cInVsXCIgY2xhc3NOYW1lPVwiY29udGFjdC1saXN0XCI+XHJcbiAgICAgICAgICAgIDxsaT48TWFwUGluSWNvbiBzaXplPXsyMH0gLz48YSBocmVmPXtzaXRlQ29uZmlnLmdvb2dsZU1hcHNVcmx9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj57c2l0ZUNvbmZpZy5hZGRyZXNzfTwvYT48L2xpPlxyXG4gICAgICAgICAgICA8bGk+PFBob25lSWNvbiBzaXplPXsyMH0gLz48YSBocmVmPXt3YSgpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+e3NpdGVDb25maWcucGhvbmUuZGlzcGxheX08L2E+PC9saT5cclxuICAgICAgICAgICAgPGxpPjxJbnN0YWdyYW1JY29uIHNpemU9ezIwfSAvPjxhIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPntzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48U2hpZWxkQ2hlY2tJY29uIHNpemU9ezIwfSAvPjxzcGFuPlNpbiBjb250cmF0b3MgZGUgcGVybWFuZW5jaWE8L3NwYW4+PC9saT5cclxuICAgICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICAgICAgPFJldmVhbCBkZWxheT17MC4xfT5cclxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuXCIgaHJlZj17c2l0ZUNvbmZpZy5nb29nbGVNYXBzVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+PE5hdmlnYXRpb25JY29uIHNpemU9ezE4fSAvPiBDw7NtbyBsbGVnYXI8L2E+XHJcbiAgICAgICAgICA8L1JldmVhbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8UmV2ZWFsIGNsYXNzTmFtZT1cIm1hcFwiIGRlbGF5PXswLjE1fT5cclxuICAgICAgICAgIDxpZnJhbWUgdGl0bGU9XCJNYXBhIGRlIDcgU3RyZW5ndGggQ2VudGVyXCIgc3JjPXtgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzP3E9JHtzaXRlQ29uZmlnLmdvb2dsZU1hcHNFbWJlZFF1ZXJ5fSZvdXRwdXQ9ZW1iZWRgfSBsb2FkaW5nPVwibGF6eVwiIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXItd2hlbi1kb3duZ3JhZGVcIiAvPlxyXG4gICAgICAgIDwvUmV2ZWFsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBGb290ZXIoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZvb3Rlci1pbm5lclwiPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjaW5pY2lvXCIgY2xhc3NOYW1lPVwiYnJhbmRcIj5cclxuICAgICAgICAgIDxMb2dvIHNpemU9ezQ0fSAvPlxyXG4gICAgICAgICAgPHNwYW4+NyA8Yj5TdHJlbmd0aDwvYj4gQ2VudGVyPC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8cD7CqSB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSB7c2l0ZUNvbmZpZy5uYW1lfSDCtyB7c2l0ZUNvbmZpZy5jaXR5fTwvcD5cclxuICAgICAgICA8YSBocmVmPVwiI2luaWNpb1wiIGNsYXNzTmFtZT1cInRvLXRvcFwiIGFyaWEtbGFiZWw9XCJWb2x2ZXIgYXJyaWJhXCI+PEFycm93VXBJY29uIHNpemU9ezE4fSAvPjwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Zvb3Rlcj5cclxuICApO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tIEFTSVNURU5URSBDT04gSUEgLS0tLS0tLS0tLVxyXG4vLyBSZXNwdWVzdGFzIGLDoXNpY2FzIGN1YW5kbyBsYSBJQSBubyBlc3TDoSBkaXNwb25pYmxlIChzaW4gY2xhdmUgbyBzaW4gaW50ZXJuZXQpLlxyXG5mdW5jdGlvbiBsb2NhbEFuc3dlcihxKSB7XHJcbiAgY29uc3QgdCA9IHEudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBjID0gc2l0ZUNvbmZpZztcclxuICBjb25zdCBoID0gYy5ob3VycztcclxuICBpZiAoL2hvcmFyaW98aG9yYXxhYnJlfGNpZXJyYXxhYmllcnRvfGRvbWluZ298c8OhYmFkb3xzYWJhZG8vLnRlc3QodCkpXHJcbiAgICByZXR1cm4gYCR7aC53ZWVrZGF5cy5kYXlzfTogJHtoLndlZWtkYXlzLnNoaWZ0cy5tYXAoKHMpID0+IHMudGltZVJhbmdlKS5qb2luKFwiIHkgXCIpfS4gJHtoLnNhdHVyZGF5LmRheXN9OiAke2guc2F0dXJkYXkuc2hpZnRzWzBdLnRpbWVSYW5nZX0uIERvbWluZ29zOiAke2guc3VuZGF5LnN0YXR1c05vdGUudG9Mb3dlckNhc2UoKX0uYDtcclxuICBpZiAoL3ByZWNpb3xjdWVzdGF8Y29zdG98cGxhbnxtZW5zdWFsfHBhc2V8cGFnYXJ8bWVtYnJlcy8udGVzdCh0KSlcclxuICAgIHJldHVybiBjLnBsYW5zLm1hcCgocCkgPT4gYCR7cC5uYW1lfTogJHtwLmZvcm1hdHRlZFByaWNlfSAoJHtwLnBlcmlvZH0pYCkuam9pbihcIiDCtyBcIikgKyBcIi4gU2luIGNvbnRyYXRvcyBkZSBwZXJtYW5lbmNpYS5cIjtcclxuICBpZiAoL2TDs25kZXxkb25kZXxkaXJlY2NpfHViaWNhfGxsZWdhcnxtYXBhLy50ZXN0KHQpKSByZXR1cm4gYEVzdGFtb3MgZW4gJHtjLmFkZHJlc3N9LiBUb2NhIOKAnEPDs21vIGxsZWdhcuKAnSBlbiBsYSBzZWNjacOzbiBkZSBjb250YWN0byBwYXJhIGFicmlyIEdvb2dsZSBNYXBzLmA7XHJcbiAgaWYgKC9lbnRyZW5hZG9yfGNvYWNofHByb2ZlfHBlcnNvbmFsLy50ZXN0KHQpKVxyXG4gICAgcmV0dXJuIGBOdWVzdHJvIGVxdWlwbzogJHtjLnRyYWluZXJzLm1hcCgodHIpID0+IGAke3RyLm5hbWV9ICgke3RyLnJvbGV9KWApLmpvaW4oXCIsIFwiKX0uIEVudHJhIGEgc3UgcGVyZmlsIGVuIGxhIHNlY2Npw7NuIEVudHJlbmFkb3Jlcy5gO1xyXG4gIGlmICgvd2hhdHNhcHB8dGVsW2XDqV1mb25vfGNvbnRhY3RvfGluc2NyaWJ8cmVzZXJ2Ly50ZXN0KHQpKSByZXR1cm4gYEVzY3LDrWJlbm9zIHBvciBXaGF0c0FwcCBhbCAke2MucGhvbmUuZGlzcGxheX0geSB0ZSBheXVkYW1vcyBhIGluc2NyaWJpcnRlLmA7XHJcbiAgcmV0dXJuIGBQdWVkbyBjb250YXJ0ZSBzb2JyZSBob3JhcmlvcywgcGxhbmVzLCBlbnRyZW5hZG9yZXMgeSBjw7NtbyBsbGVnYXIuIFBhcmEgYWxnbyBtw6FzIGVzcGVjw61maWNvLCBlc2Nyw61iZW5vcyBwb3IgV2hhdHNBcHAgYWwgJHtjLnBob25lLmRpc3BsYXl9LmA7XHJcbn1cclxuXHJcbmNvbnN0IFNVR0dFU1RJT05TID0gW1wiwr9DdcOhbCBlcyBlbCBob3JhcmlvP1wiLCBcIsK/Q3XDoW50byBjdWVzdGEgZWwgcGxhbiBtZW5zdWFsP1wiLCBcIlNveSBwcmluY2lwaWFudGUsIMK/Y29uIHF1acOpbiBlbnRyZW5vP1wiLCBcIsK/RMOzbmRlIGVzdMOhbj9cIl07XHJcblxyXG5mdW5jdGlvbiBDaGF0Qm90KCkge1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaW5wdXQsIHNldElucHV0XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbXNncywgc2V0TXNnc10gPSB1c2VTdGF0ZShbXHJcbiAgICB7IHJvbGU6IFwiYXNzaXN0YW50XCIsIGNvbnRlbnQ6IFwiwqFIb2xhISBTb3kgZWwgYXNpc3RlbnRlIGRlIDcgU3RyZW5ndGguIFByZWfDum50YW1lIHBvciBob3JhcmlvcywgcGxhbmVzIG8gZW50cmVuYWRvcmVzLlwiIH0sXHJcbiAgXSk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxpc3RSZWYuY3VycmVudD8uc2Nyb2xsVG8oeyB0b3A6IGxpc3RSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gIH0sIFttc2dzLCBidXN5XSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChvcGVuKSBzZXRUaW1lb3V0KCgpID0+IGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCksIDI1MCk7XHJcbiAgICBjb25zdCBvbktleSA9IChlKSA9PiBlLmtleSA9PT0gXCJFc2NhcGVcIiAmJiBzZXRPcGVuKGZhbHNlKTtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5KTtcclxuICAgIHJldHVybiAoKSA9PiByZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleSk7XHJcbiAgfSwgW29wZW5dKTtcclxuXHJcbiAgY29uc3QgYXNrID0gYXN5bmMgKHRleHQpID0+IHtcclxuICAgIGNvbnN0IHEgPSB0ZXh0LnRyaW0oKTtcclxuICAgIGlmICghcSB8fCBidXN5KSByZXR1cm47XHJcbiAgICBjb25zdCBuZXh0ID0gWy4uLm1zZ3MsIHsgcm9sZTogXCJ1c2VyXCIsIGNvbnRlbnQ6IHEgfV07XHJcbiAgICBzZXRNc2dzKG5leHQpO1xyXG4gICAgc2V0SW5wdXQoXCJcIik7XHJcbiAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgbGV0IHJlcGx5O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKFwiL2FwaS9jaGF0XCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2VzOiBuZXh0LnNsaWNlKDEpIH0pLFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHIuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xyXG4gICAgICBpZiAoci5vayAmJiBkYXRhLnJlcGx5KSByZXBseSA9IGRhdGEucmVwbHk7XHJcbiAgICAgIGVsc2UgaWYgKHIuc3RhdHVzID09PSA0MjkpIHJlcGx5ID0gXCJFc3TDoXMgcHJlZ3VudGFuZG8gbXV5IHLDoXBpZG8uIEVzcGVyYSB1bm9zIHNlZ3VuZG9zIHkgdnVlbHZlIGEgaW50ZW50YXJsby5cIjtcclxuICAgICAgZWxzZSByZXBseSA9IGxvY2FsQW5zd2VyKHEpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJlcGx5ID0gbG9jYWxBbnN3ZXIocSk7XHJcbiAgICB9XHJcbiAgICBzZXRNc2dzKChtKSA9PiBbLi4ubSwgeyByb2xlOiBcImFzc2lzdGFudFwiLCBjb250ZW50OiByZXBseSB9XSk7XHJcbiAgICBzZXRCdXN5KGZhbHNlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0LXJvb3RcIj5cclxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cclxuICAgICAgICB7b3BlbiAmJiAoXHJcbiAgICAgICAgICA8bW90aW9uLnNlY3Rpb25cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2hhdC1wYW5lbCBnbGFzcyBsaXF1aWRcIlxyXG4gICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkFzaXN0ZW50ZSBkZSA3IFN0cmVuZ3RoIENlbnRlclwiXHJcbiAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTYsIHNjYWxlOiAwLjk2IH19XHJcbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCwgc2NhbGU6IDEsIHRyYW5zaXRpb246IHsgZHVyYXRpb246IDAuMjgsIGVhc2U6IEVBU0UgfSB9fVxyXG4gICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IDEwLCBzY2FsZTogMC45NywgdHJhbnNpdGlvbjogeyBkdXJhdGlvbjogMC4xOCB9IH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY2hhdC1oZWFkXCI+XHJcbiAgICAgICAgICAgICAgPExvZ28gc2l6ZT17NDB9IC8+XHJcbiAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+QXNpc3RlbnRlIDcgU3RyZW5ndGg8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgIDxzbWFsbD48c3BhbiBjbGFzc05hbWU9XCJjaGF0LW9ubGluZVwiIC8+IFJlc3BvbmRlIGFsIGluc3RhbnRlPC9zbWFsbD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJvdW5kLWJ0biBzbWFsbFwiIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oZmFsc2UpfSBhcmlhLWxhYmVsPVwiQ2VycmFyIGNoYXRcIj48WEljb24gc2l6ZT17MTh9IC8+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbGlzdFwiIHJlZj17bGlzdFJlZn0gYXJpYS1saXZlPVwicG9saXRlXCI+XHJcbiAgICAgICAgICAgICAge21zZ3MubWFwKChtLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8bW90aW9uLnAga2V5PXtpfSBjbGFzc05hbWU9e2BidWJibGUgJHttLnJvbGV9YH0gaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiA4IH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjI1LCBlYXNlOiBFQVNFIH19PlxyXG4gICAgICAgICAgICAgICAgICB7bS5jb250ZW50fVxyXG4gICAgICAgICAgICAgICAgPC9tb3Rpb24ucD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICB7YnVzeSAmJiA8cCBjbGFzc05hbWU9XCJidWJibGUgYXNzaXN0YW50IHR5cGluZ1wiIGFyaWEtbGFiZWw9XCJFc2NyaWJpZW5kb1wiPjxpIC8+PGkgLz48aSAvPjwvcD59XHJcbiAgICAgICAgICAgICAge21zZ3MubGVuZ3RoID09PSAxICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1zdWdnZXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgIHtTVUdHRVNUSU9OUy5tYXAoKHMpID0+IDxidXR0b24ga2V5PXtzfSBvbkNsaWNrPXsoKSA9PiBhc2socyl9PntzfTwvYnV0dG9uPil9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY2hhdC1mb3JtXCIgb25TdWJtaXQ9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgYXNrKGlucHV0KTsgfX0+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICByZWY9e2lucHV0UmVmfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJbnB1dChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVzY3JpYmUgdHUgcHJlZ3VudGHigKZcIlxyXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXs1MDB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiVHUgcHJlZ3VudGFcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjaGF0LXNlbmRcIiBkaXNhYmxlZD17IWlucHV0LnRyaW0oKSB8fCBidXN5fSBhcmlhLWxhYmVsPVwiRW52aWFyXCI+PEFycm93VXBJY29uIHNpemU9ezIwfSAvPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImNoYXQtd2FcIiBocmVmPXt3YSgpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+PE1lc3NhZ2VDaXJjbGVJY29uIHNpemU9ezE1fSAvPiBQcmVmaWVybyBoYWJsYXIgcG9yIFdoYXRzQXBwPC9hPlxyXG4gICAgICAgICAgPC9tb3Rpb24uc2VjdGlvbj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYWItc3RhY2tcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGZhYiBmYWItYWkke29wZW4gPyBcIiBvblwiIDogXCJcIn1gfSBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX0gYXJpYS1leHBhbmRlZD17b3Blbn0gYXJpYS1sYWJlbD17b3BlbiA/IFwiQ2VycmFyIGFzaXN0ZW50ZVwiIDogXCJBYnJpciBhc2lzdGVudGUgY29uIElBXCJ9PlxyXG4gICAgICAgICAge29wZW4gPyA8WEljb24gc2l6ZT17MjR9IC8+IDogPFNwYXJrbGVzSWNvbiBzaXplPXsyNH0gLz59XHJcbiAgICAgICAgICB7IW9wZW4gJiYgPHNwYW4gY2xhc3NOYW1lPVwiZmFiLWxhYmVsXCI+UHJlZ8O6bnRhbWU8L3NwYW4+fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhvbWUoKSB7XHJcbiAgLy8gQWwgdm9sdmVyIGRlc2RlIHVuIHBlcmZpbCwgYmFqYSBhIGxhIHNlY2Npw7NuIHBlZGlkYSAoI2VudHJlbmFkb3JlcywgZXRjLikuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGlkID0gbG9jYXRpb24uaGFzaC5zbGljZSgxKTtcclxuICAgIGlmIChpZCAmJiAhaWQuc3RhcnRzV2l0aChcIi9cIikpIHtcclxuICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpPy5zY3JvbGxJbnRvVmlldygpLCA2MCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodCk7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbiBpZD1cImNvbnRlbmlkb1wiIHRhYkluZGV4PXstMX0+XHJcbiAgICAgIDxIZXJvIC8+XHJcbiAgICAgIDxSaWJib25zIC8+XHJcbiAgICAgIDxBYm91dCAvPlxyXG4gICAgICA8V2h5VXMgLz5cclxuICAgICAgPFRyYWluZXJzIC8+XHJcbiAgICAgIDxSZWVscyAvPlxyXG4gICAgICA8Wm9uZXMgLz5cclxuICAgICAgPFBsYW5zIC8+XHJcbiAgICAgIDxTY2hlZHVsZSAvPlxyXG4gICAgICA8Q3RhQmFuZCAvPlxyXG4gICAgICA8Q29udGFjdCAvPlxyXG4gICAgPC9tYWluPlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZUhhc2goKSB7XHJcbiAgY29uc3QgW2hhc2gsIHNldEhhc2hdID0gdXNlU3RhdGUobG9jYXRpb24uaGFzaCk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGYgPSAoKSA9PiBzZXRIYXNoKGxvY2F0aW9uLmhhc2gpO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZik7XHJcbiAgICByZXR1cm4gKCkgPT4gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZik7XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiBoYXNoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBcHAoKSB7XHJcbiAgY29uc3QgaGFzaCA9IHVzZUhhc2goKTtcclxuICBjb25zdCBzbHVnID0gaGFzaC5zdGFydHNXaXRoKFwiIy9lbnRyZW5hZG9yL1wiKSA/IGhhc2guc2xpY2UoXCIjL2VudHJlbmFkb3IvXCIubGVuZ3RoKSA6IG51bGw7XHJcbiAgY29uc3QgdHJhaW5lciA9IHVzZU1lbW8oKCkgPT4gc2l0ZUNvbmZpZy50cmFpbmVycy5maW5kKCh0KSA9PiB0LnNsdWcgPT09IHNsdWcpLCBbc2x1Z10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXRyYWluZXIpIHJldHVybjtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgIC8vIExsZXZhIGVsIGZvY28gYWwgbm9tYnJlIGRlbCBlbnRyZW5hZG9yIHBhcmEgbGVjdG9yZXMgZGUgcGFudGFsbGEuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZSBoMVwiKT8uZm9jdXMoKSwgNTApO1xyXG4gIH0sIFt0cmFpbmVyXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxhIGNsYXNzTmFtZT1cInNraXAtbGlua1wiIGhyZWY9XCIjY29udGVuaWRvXCI+U2FsdGFyIGFsIGNvbnRlbmlkbzwvYT5cclxuICAgICAgPEludHJvIC8+XHJcbiAgICAgIDxTY3JvbGxQcm9ncmVzcyAvPlxyXG4gICAgICA8SGVhZGVyIC8+XHJcbiAgICAgIHt0cmFpbmVyID8gPFRyYWluZXJQcm9maWxlIGtleT17dHJhaW5lci5zbHVnfSB0PXt0cmFpbmVyfSAvPiA6IDxIb21lIC8+fVxyXG4gICAgICA8Rm9vdGVyIC8+XHJcbiAgICAgIDxDaGF0Qm90IC8+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcblxyXG5SZWFjdERPTS5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByb290YCkpLnJlbmRlcig8QXBwIC8+KTtcclxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0EsU0FDRUEsU0FBUyxFQUNUQyxTQUFTLEVBQ1RDLE1BQU0sRUFDTkMsS0FBSyxFQUNMQyxlQUFlLEVBQ2ZDLFFBQVEsRUFDUkMsS0FBSyxFQUNMQyxjQUFjLEVBQ2RDLFlBQVksRUFDWkMsVUFBVSxFQUNWQyxTQUFTLEVBQ1RDLGVBQWUsRUFDZkMsU0FB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