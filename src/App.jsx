// 7 Strength Center — landing inmersiva con efectos 3D.
// Versión anterior: /respaldo-version-anterior/App.jsx
// Textos, precios, horarios, reels y entrenadores: src/site-config.js
import {
  useScroll,
  useSpring,
  motion,
  React,
  AnimatePresence,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
  DumbbellIcon,
  TargetIcon,
  UsersIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckIcon,
  ZapIcon,
  MapPinIcon,
  PhoneIcon,
  InstagramIcon,
  MessageCircleIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  EyeIcon,
  Volume2Icon,
  VolumeXIcon,
  CalendarIcon,
  NavigationIcon,
  SparklesIcon,
  AccessibilityIcon,
  ReactDOM,
} from "./runtime-imports.js";
import { siteConfig } from "./site-config.js";

const { useState, useEffect, useRef, useMemo } = React;
const IMG = {
  heroBg: `/assets/aistudio/image_cab5cadb.png`,
  hero: `/assets/personas/heroe.png`,
  interior: `/assets/aistudio/image_993ddb80.png`,
  racks: `/assets/aistudio/image_f8a8200a.png`,
  discos: `/assets/aistudio/image_e767c3d6.png`,
  maquinas: `/assets/aistudio/image_19a15b40.png`,
};
const wa = (msg = siteConfig.phone.whatsappMessageGeneral) =>
  `https://wa.me/${siteConfig.phone.raw}?text=${encodeURIComponent(msg)}`;
const EASE = [0.23, 1, 0.32, 1];

// ---------- utilidades de movimiento ----------
const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const lerp = (a, b, t) => a + (b - a) * t;

// Inclinación 3D que sigue al mouse, con inercia.
function useTilt(max = 10) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const glare = el.querySelector(":scope > .glare");
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, gx = 50, gy = 50;
    const tick = () => {
      cx = lerp(cx, tx, 0.14);
      cy = lerp(cy, ty, 0.14);
      el.style.transform = `perspective(1000px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      if (glare) glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 55%)`;
      raf = Math.abs(cx - tx) > 0.01 || Math.abs(cy - ty) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e) => {
      if (motionReduced()) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tx = (px - 0.5) * 2 * max;
      ty = (0.5 - py) * 2 * max;
      gx = Math.round(px * 100); gy = Math.round(py * 100);
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
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
const Tilt = ({ children, className = "", max, as = "div", ...rest }) => {
  const ref = useTilt(max);
  const Tag = as;
  return (
    <Tag ref={ref} className={`tilt ${className}`} {...rest}>
      {children}
      <span className="glare" aria-hidden="true" />
    </Tag>
  );
};

// Botón "magnético": se acerca un poco al cursor.
function Magnetic({ children, className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return <a ref={ref} className={`magnetic ${className}`} {...rest}>{children}</a>;
}

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 } };
const Reveal = ({ children, className, as = "div", delay = 0 }) => {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={reveal} {...inView} transition={{ delay }}>
      {children}
    </Tag>
  );
};

// Título de sección que sube desde una máscara.
function Title({ children, accent, center, lead }) {
  return (
    <div className={`title-block${center ? " center" : ""}`}>
      <h2 className="title">
        <motion.span className="mask" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          <motion.span
            className="mask-inner"
            variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.8, ease: EASE } } }}
          >
            {children} {accent && <em>{accent}</em>}
          </motion.span>
        </motion.span>
      </h2>
      {lead && <Reveal as="p" className="lead-text" delay={0.15}>{lead}</Reveal>}
    </div>
  );
}

// Título que aparece letra por letra en 3D.
const SplitText = ({ text, className = "", delay = 0 }) => (
  <span className={`split ${className}`} aria-label={text}>
    {[...text].map((ch, i) => (
      <span key={i} aria-hidden="true" style={{ animationDelay: `${delay + i * 0.03}s` }}>
        {ch === " " ? " " : ch}
      </span>
    ))}
  </span>
);

// Número que cuenta hacia arriba cuando aparece.
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="num">{n}{suffix}</span>;
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
const shiftsFor = (day) => {
  const { weekdays, saturday } = siteConfig.hours;
  if (day === 0) return [];
  return (day === 6 ? saturday.shifts : weekdays.shifts).map((s) => ({
    from: s.openHour * 60 + s.openMinute,
    to: s.closeHour * 60 + s.closeMinute,
    name: s.name,
    label: s.timeRange,
  }));
};
function limaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}
function getStatus() {
  const { day, minutes } = limaNow();
  const today = shiftsFor(day);
  const current = today.find((s) => minutes >= s.from && minutes < s.to);
  if (current) {
    const left = current.to - minutes;
    return { open: true, day, minutes, label: "Abierto ahora", detail: `Cierra ${atTime(Math.floor(current.to / 60), current.to % 60)}${left <= 60 ? ` · quedan ${left} min` : ""}` };
  }
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const next = shiftsFor(d).find((s) => i > 0 || s.from > minutes);
    if (next) {
      const when = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${DAY_NAMES[d].toLowerCase()}`;
      const paused = i === 0 && today.some((s) => s.to <= minutes);
      return { open: false, day, minutes, label: paused ? "En pausa" : "Cerrado ahora", detail: `Abre ${when} ${atTime(Math.floor(next.from / 60), next.from % 60)}` };
    }
  }
  return { open: false, day, minutes, label: "Cerrado", detail: "Consulta por WhatsApp" };
}

// ---------- intro y cursor ----------
// ---------- ACCESIBILIDAD: preferencias del visitante ----------
const A11Y_DEFAULT = { text: 0, contrast: false, links: false, motion: false, font: false, theme: "dark" };
function readA11y() {
  try { return { ...A11Y_DEFAULT, ...JSON.parse(localStorage.getItem("accesibilidad") || "{}") }; } catch { return { ...A11Y_DEFAULT }; }
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

function A11yToggle({ on, label, hint, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={on} className={`a11y-toggle${on ? " on" : ""}`} onClick={onChange}>
      <span><strong>{label}</strong><small>{hint}</small></span>
      <i aria-hidden="true" />
    </button>
  );
}

function A11yPanel() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState(readA11y);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  useEffect(() => {
    applyA11y(s);
    try { localStorage.setItem("accesibilidad", JSON.stringify(s)); } catch {}
  }, [s]);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector("button")?.focus();
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    const onClick = (e) => {
      if (!panelRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false);
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onClick);
    return () => { removeEventListener("keydown", onKey); removeEventListener("pointerdown", onClick); };
  }, [open]);
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const toggle = (k, label, hint) => <A11yToggle on={s[k]} label={label} hint={hint} onChange={() => set(k, !s[k])} />;
  return (
    <div className="a11y">
      <button
        ref={btnRef}
        type="button"
        className="a11y-btn"
        aria-expanded={open}
        aria-controls="panel-accesibilidad"
        aria-label="Opciones de accesibilidad"
        onClick={() => setOpen(!open)}
      >
        <AccessibilityIcon size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="panel-accesibilidad"
            className="a11y-panel glass"
            role="dialog"
            aria-label="Opciones de accesibilidad"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
          >
            <p className="a11y-title">Accesibilidad</p>
            <A11yToggle
              on={s.theme === "dark"}
              label="Modo oscuro"
              hint="Alterna entre el modo oscuro y el modo claro"
              onChange={() => set("theme", s.theme === "dark" ? "light" : "dark")}
            />
            <div className="a11y-size" role="group" aria-label="Tamaño del texto">
              <span>Tamaño del texto</span>
              <div>
                {["A", "A+", "A++", "A+++"].map((l, i) => (
                  <button key={l} type="button" aria-pressed={s.text === i} aria-label={["Normal", "Grande", "Muy grande", "Máximo"][i]} onClick={() => set("text", i)}>{l}</button>
                ))}
              </div>
            </div>
            {toggle("contrast", "Alto contraste", "Texto más claro y fondos sólidos")}
            {toggle("links", "Subrayar enlaces", "Distingue los enlaces del texto")}
            {toggle("font", "Letra fácil de leer", "Cambia los títulos a una letra simple")}
            {toggle("motion", "Detener animaciones", "Quita movimientos y la intro")}
            <button type="button" className="a11y-reset" onClick={() => setS({ ...A11Y_DEFAULT })}>Restablecer</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- INTRO: contador 000→100 que se llena, palabra que se parte en dos ----------
function Digit({ value }) {
  return (
    <span className="odo" aria-hidden="true">
      <span className="odo-strip" style={{ transform: `translateY(${-value * 10}%)` }}>
        {"0123456789".split("").map((d) => <span key={d}>{d}</span>)}
      </span>
    </span>
  );
}
function Intro() {
  const [phase, setPhase] = useState(() => {
    if (motionReduced()) return "done";
    try { return sessionStorage.getItem("intro-vista") ? "done" : "count"; } catch { return "count"; }
  });
  const [n, setN] = useState(0);
  const skipRef = useRef(null);

  useEffect(() => {
    if (phase === "done" || phase === "split") document.documentElement.dataset.ready = "1";
    if (phase === "done") { try { sessionStorage.setItem("intro-vista", "1"); } catch {} }
  }, [phase]);

  // Contador: avanza con el tiempo, pero espera a que carguen la foto principal y la tipografía.
  useEffect(() => {
    if (phase !== "count") return;
    let loaded = 0.15, raf;
    const parts = [
      new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG.hero; }),
      new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG.heroBg; }),
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ];
    parts.forEach((p) => p.then(() => { loaded += 0.85 / parts.length; }));
    const giveUp = setTimeout(() => { loaded = 1; }, 5000);
    const start = performance.now(), DUR = 1900;
    const tick = (t) => {
      const time = Math.min((t - start) / DUR, 1);
      const eased = time < 0.5 ? 4 * time ** 3 : 1 - (-2 * time + 2) ** 3 / 2;
      const v = Math.round(Math.min(eased, loaded) * 100);
      setN(v);
      if (v >= 100) setTimeout(() => setPhase("word"), 200);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(giveUp); };
  }, [phase]);

  useEffect(() => {
    if (phase === "word") { const t = setTimeout(() => setPhase("split"), 900); return () => clearTimeout(t); }
    if (phase === "split") { const t = setTimeout(() => setPhase("done"), 1100); return () => clearTimeout(t); }
  }, [phase]);

  if (phase === "done") return null;
  const digits = String(n).padStart(3, "0").split("").map(Number);
  const left = "SIN", right = "LÍMITES";
  return (
    <div className={`intro intro-${phase}`} role="status" aria-label="Cargando 7 Strength Center">
      <span className="intro-line" aria-hidden="true" />
      <div className="intro-half intro-left" aria-hidden="true">
        {phase !== "count" && (
          <span className="intro-word">
            {[...left].map((ch, i) => <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{ch}</span>)}
          </span>
        )}
      </div>
      <div className="intro-half intro-right" aria-hidden="true">
        {phase !== "count" && (
          <span className="intro-word">
            {[...right].map((ch, i) => <span key={i} style={{ animationDelay: `${0.15 + i * 0.05}s` }}>{ch}</span>)}
          </span>
        )}
      </div>
      {phase === "count" && (
        <div className="intro-counter" aria-hidden="true">
          <span className="intro-label">Cargando</span>
          <div className="intro-num">
            <span className="intro-outline">{digits.map((d, i) => <Digit key={i} value={d} />)}</span>
            <span className="intro-fill" style={{ clipPath: `inset(${100 - n}% 0 0 0)` }}>{digits.map((d, i) => <Digit key={i} value={d} />)}</span>
          </div>
          <span className="intro-label right">7 Strength</span>
        </div>
      )}
      <button ref={skipRef} type="button" className="intro-skip" onClick={() => setPhase("done")}>Saltar intro</button>
    </div>
  );
}

const NAV = [
  ["Nosotros", "#nosotros"],
  ["Entrenadores", "#entrenadores"],
  ["Reels", "#reels"],
  ["Zonas", "#zonas"],
  ["Planes", "#planes"],
  ["Horarios", "#horarios"],
  ["Contacto", "#contacto"],
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function Logo({ size = 48 }) {
  return <img className="logo" src={siteConfig.logoPath} alt="" width={size} height={size} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuBtn = useRef(null);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); menuBtn.current?.focus(); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={`header${solid ? " solid" : ""}`}>
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="7 Strength Center, ir al inicio">
          <Logo />
          <span aria-hidden="true">7 <b>Strength</b></span>
        </a>
        <nav className="nav-desktop" aria-label="Principal">
          {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <A11yPanel />
        <a className="btn btn-sm hide-mobile" href={wa()} target="_blank" rel="noreferrer">Inscríbete</a>
        <button
          ref={menuBtn}
          type="button"
          className="menu-btn"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={26} /> : <MenuIcon size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            className="nav-mobile"
            aria-label="Menú"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="btn" href={wa()} target="_blank" rel="noreferrer">Inscríbete por WhatsApp</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- HERO 3D: personaje al centro, STRENGTH detrás ----------
function Hero() {
  const sceneRef = useRef(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const layers = [...scene.querySelectorAll("[data-depth]")].map((el) => ({ el, d: parseFloat(el.dataset.depth) }));
    let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, raf;
    const move = (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    const scroll = () => { sy = Math.min(scrollY, innerHeight); };
    const loop = () => {
      if (motionReduced()) { tx = 0; ty = 0; sy = 0; }
      cx = lerp(cx, tx, 0.07); cy = lerp(cy, ty, 0.07);
      const p = sy / innerHeight;
      for (const { el, d } of layers) {
        el.style.transform = `translate3d(${(-cx * d).toFixed(1)}px, ${(-cy * d * 0.6 + sy * d * 0.01).toFixed(1)}px, ${(d * p * 3).toFixed(0)}px)`;
      }
      scene.style.transform = `rotateX(${(cy * -3 + p * 6).toFixed(2)}deg) rotateY(${(cx * 5).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    if (finePointer()) addEventListener("pointermove", move);
    addEventListener("scroll", scroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="hero-stage">
        <div className="hero-scene" ref={sceneRef}>
          <div className="layer hero-bg" data-depth="8"><img src={IMG.heroBg} alt="" /></div>
          <div className="layer smoke smoke-1" data-depth="14" />
          <div className="layer smoke smoke-2" data-depth="20" />
          <div className="layer hero-word-wrap" data-depth="18" aria-hidden="true">
            <span className="hero-word">{[..."Strength"].map((ch, i) => <span key={i} style={{ animationDelay: `${0.15 + i * 0.06}s` }}>{ch}</span>)}</span>
          </div>
          <div className="layer hero-glow" data-depth="26" aria-hidden="true" />
          <div className="layer hero-person" data-depth="38">
            <img src={IMG.hero} alt="Atleta de espaldas mostrando la musculatura trabajada" />
          </div>
          <div className="layer smoke smoke-3" data-depth="50" />
          <div className="sparks" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <i key={i} style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${5 + (i % 5)}s` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-shade" />

      <ul className="social-rail" aria-label="Redes">
        <li><a href={siteConfig.social.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a></li>
        <li><a href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircleIcon size={16} /></a></li>
        <li><a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer" aria-label="Ubicación"><MapPinIcon size={16} /></a></li>
      </ul>

      <div className="container hero-content">
        <h1>
          <SplitText text="La fuerza" className="accent" delay={0.5} />{" "}
          <SplitText text="no se regala" delay={0.75} />
        </h1>
        <p className="hero-sub">
          Se construye repetición tras repetición, en el centro de alto rendimiento de {siteConfig.city.split(",")[0]}.
        </p>
      </div>
    </section>
  );
}

// Dos cintas cruzadas que se mueven en sentidos opuestos.
function Ribbons() {
  const words = ["Fuerza", "Disciplina", "Técnica", "Power Team", "Constancia", "Sin límites"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="ribbons" aria-hidden="true">
      <div className="ribbon ribbon-dark">
        <div className="ribbon-track reverse">{row.map((w, i) => <span key={i}>{w}<i>/</i></span>)}</div>
      </div>
      <div className="ribbon ribbon-red">
        <div className="ribbon-track">{row.map((w, i) => <span key={i}>{w}<DumbbellIcon size={22} /></span>)}</div>
      </div>
    </div>
  );
}

// Video de presentación (reel de Instagram descargado). Se reproduce solo al verse.
const PauseIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
const PlayGlyph = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
);
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
    if (paused) v.pause(); else v.play().catch(() => {});
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
    }, { threshold: 0.25 });
    io.observe(boxRef.current || v);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={boxRef}>
    <Tilt className="about-video glass liquid" max={6}>
      <video
        ref={ref}
        src={`/assets/reels/${ABOUT_REEL}.mp4`}
        poster={`/assets/reels/${ABOUT_REEL}.jpg`}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="Video de presentación de 7 Strength Center"
      />
      <span className="about-controls">
        <button type="button" className="round-btn small glass" onClick={() => setPaused(!paused)} aria-label={paused ? "Reproducir video" : "Pausar video"}>
          {paused ? <PlayGlyph /> : <PauseIcon />}
        </button>
        <button type="button" className="round-btn small glass" onClick={() => setMuted(!muted)} aria-label={muted ? "Activar sonido" : "Silenciar"}>
          {muted ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
        </button>
      </span>
    </Tilt>
    </div>
  );
}

function About() {
  return (
    <section id="nosotros" className="section">
      <div className="container about-grid">
        <div>
          <Title accent="somos">Quiénes</Title>
          <Reveal>
            <AboutVideo />
          </Reveal>
        </div>
        <Reveal className="about-text" delay={0.15}>
          <p className="lead">{siteConfig.description}</p>
          <p>
            Racks de potencia, barras olímpicas, discos calibrados, máquinas de biomecánica y una zona de césped para
            empuje de trineo. Entrenamiento presencial y virtual, con el respaldo del Power Team.
          </p>
          <dl className="facts">
            <div><dt><CountUp to={2} /></dt><dd>niveles de entrenamiento</dd></div>
            <div><dt><CountUp to={1000} suffix="+" /></dt><dd>seguidores en Instagram</dd></div>
            <div><dt><CountUp to={6} /></dt><dd>días a la semana</dd></div>
          </dl>
          <a className="btn" href="#entrenadores">Conoce al equipo <ArrowRightIcon size={18} /></a>
        </Reveal>
      </div>
    </section>
  );
}

const FEATURES = [
  [DumbbellIcon, "Equipamiento pro", "Racks de uso rudo, barras olímpicas y discos de competición."],
  [TargetIcon, "Técnica primero", "Progresas con la forma correcta y sin lesiones."],
  [UsersIcon, "Power Team", "Una comunidad donde cada repetición cuenta."],
  [ClockIcon, "Horario flexible", "Turno mañana y tarde, de lunes a sábado."],
];

function WhyUs() {
  return (
    <section className="why">
      <div className="why-bg"><img src={IMG.racks} alt="" loading="lazy" /></div>
      <div className="smoke smoke-2" />
      <div className="container why-grid">
        <div>
          <Title accent="nosotros">Por qué</Title>
          <motion.ul className="features" variants={stagger} {...inView}>
            {FEATURES.map(([Icon, title, text]) => (
              <motion.li key={title} variants={reveal}>
                <Tilt className="feature" max={12}>
                  <span className="icon"><Icon size={22} /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Tilt>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="why-big" aria-hidden="true">
          <span className="accent">Entrena</span> <span>Ahora</span> <span className="outline">Mismo</span>
        </div>
      </div>
    </section>
  );
}

// ---------- ENTRENADORES ----------
function TrainerCard({ t }) {
  return (
    <motion.li variants={reveal}>
      <Tilt as="a" href={`#/entrenador/${t.slug}`} className="trainer" max={10} aria-label={`Ver perfil de ${t.name}`}>
        <span className="trainer-bgname" aria-hidden="true">{t.name.split(" ")[0]}</span>
        <img className="trainer-photo" src={t.photo} alt="" loading="lazy" />
        <span className="trainer-label">
          <span className="trainer-name">{t.name}</span>
          <span className="trainer-role">{t.role}</span>
          <span className="trainer-cta">Ver perfil <ArrowRightIcon size={16} /></span>
        </span>
      </Tilt>
    </motion.li>
  );
}

function Trainers() {
  return (
    <section id="entrenadores" className="section trainers-section">
      <div className="container">
        <Title center accent="entrenadores" lead="Cada entrenador tiene su propido perfil: entra y descubre en qué te puede ayudar.">Conoce a los</Title>
        <motion.ul className="trainers" variants={stagger} {...inView}>
          {siteConfig.trainers.map((t) => <TrainerCard key={t.slug} t={t} />)}
        </motion.ul>
      </div>
    </section>
  );
}

function TrainerProfile({ t }) {
  const others = siteConfig.trainers.filter((o) => o.slug !== t.slug);
  return (
    <main id="contenido" tabIndex={-1} className="profile">
      <section className="profile-hero">
        <div className="profile-glow" aria-hidden="true" />
        <div className="container profile-grid">
          <div className="profile-text">
            <motion.a className="back-link" href="#entrenadores" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE }}>
              <ChevronLeftIcon size={18} /> Todos los entrenadores
            </motion.a>
            <h1 tabIndex={-1}><SplitText text={t.name} delay={0.1} /></h1>
            <motion.p className="profile-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{t.role}</motion.p>
            <motion.blockquote initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EASE }}>
              “{t.quote}”
            </motion.blockquote>
            <motion.dl className="facts" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6, ease: EASE }}>
              <div><dt><CountUp to={t.years} /></dt><dd>años entrenando</dd></div>
              <div><dt><CountUp to={t.athletes} suffix="+" /></dt><dd>personas acompañadas</dd></div>
            </motion.dl>
            <motion.div className="hero-ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: EASE }}>
              <Magnetic className="btn" href={wa(`Hola, quiero reservar una sesión con ${t.name} en 7 Strength Center.`)} target="_blank" rel="noreferrer">
                Reservar con {t.name.split(" ")[0]} <ArrowRightIcon size={18} />
              </Magnetic>
            </motion.div>
          </div>
          <motion.div className="profile-photo-wrap" initial={{ opacity: 0, scale: 0.94, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}>
            <Tilt className="profile-photo" max={12}>
              <span className="profile-initial" aria-hidden="true">{t.name.split(" ")[0]}</span>
              <span className="profile-ring" aria-hidden="true" />
              <img src={t.photo} alt={t.name} />
            </Tilt>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container profile-body">
          <div>
            <Title accent="el entrenador">Sobre</Title>
            <Reveal as="p" className="profile-bio">{t.bio}</Reveal>
            <motion.ul className="chips" variants={stagger} {...inView}>
              {t.specialties.map((s) => <motion.li key={s} variants={reveal}>{s}</motion.li>)}
            </motion.ul>
            <Reveal className="profile-schedule">
              <CalendarIcon size={20} /> <span>{t.schedule}</span>
            </Reveal>
          </div>
          <div>
            <Title accent="ayuda a entrenar">Te</Title>
            <motion.ol className="helps" variants={stagger} {...inView}>
              {t.helps.map((h) => (
                <motion.li key={h} variants={reveal}>
                  <CheckIcon size={20} /> <span>{h}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Title center accent="entrenadores">Otros</Title>
          <motion.ul className="trainers trainers-small" variants={stagger} {...inView}>
            {others.map((o) => <TrainerCard key={o.slug} t={o} />)}
          </motion.ul>
        </div>
      </section>
    </main>
  );
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
  const go = (d) => setActive((a) => (a + d + reels.length) % reels.length);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
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

  return (
    <section id="reels" className="section reels-section">
      <div className="container">
        <Title center accent="en Instagram" lead={`Los reels con más vistas de ${siteConfig.social.instagramHandle}. Se reproducen solos: toca el altavoz para escuchar.`}>Lo más visto</Title>
        <div
          ref={wrapRef}
          className="coverflow"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Reels más vistos"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current == null) return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          {reels.map((r, i) => {
            let off = i - active;
            if (off > reels.length / 2) off -= reels.length;
            if (off < -reels.length / 2) off += reels.length;
            const abs = Math.abs(off);
            const isActive = off === 0;
            return (
              <div
                key={r.code}
                className={`reel${isActive ? " active" : ""}`}
                style={{
                  transform: `translateX(calc(-50% + ${off * 64}%)) translateZ(${-abs * 170}px) rotateY(${off * -36}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
                onClick={() => !isActive && setActive(i)}
              >
                <video
                  ref={(el) => (vids.current[i] = el)}
                  src={`/assets/reels/${r.code}.mp4`}
                  poster={`/assets/reels/${r.code}.jpg`}
                  muted
                  playsInline
                  preload={abs <= 1 ? "auto" : "metadata"}
                  onEnded={() => isActive && go(1)}
                  aria-label={`Reel ${i + 1} de ${reels.length}: ${r.title}, ${r.views} vistas`}
                  aria-hidden={!isActive}
                />
                <span className="reel-views"><EyeIcon size={14} /> {r.views}</span>
                <span className="reel-title">{r.title}</span>
                {isActive && (
                  <span className="reel-actions">
                    <button type="button" className="round-btn small" onClick={(e) => { e.stopPropagation(); setPaused(!paused); }} aria-label={paused ? "Reproducir reel" : "Pausar reel"}>
                      {paused ? <PlayGlyph /> : <PauseIcon />}
                    </button>
                    <button type="button" className="round-btn small" onClick={(e) => { e.stopPropagation(); setMuted(!muted); }} aria-label={muted ? "Activar sonido" : "Silenciar"}>
                      {muted ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
                    </button>
                    <a className="round-btn small" href={`https://www.instagram.com/reel/${r.code}/`} target="_blank" rel="noreferrer" aria-label="Abrir en Instagram" onClick={(e) => e.stopPropagation()}>
                      <ExternalLinkIcon size={16} />
                    </a>
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="reel-controls">
          <button className="round-btn" onClick={() => go(-1)} aria-label="Reel anterior"><ChevronLeftIcon size={22} /></button>
          <div className="dots">
            {reels.map((r, i) => (
              <button key={r.code} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={`Ir al reel ${i + 1}`} />
            ))}
          </div>
          <button className="round-btn" onClick={() => go(1)} aria-label="Reel siguiente"><ChevronRightIcon size={22} /></button>
        </div>
        <Reveal className="center-cta">
          <a className="btn btn-ghost" href={siteConfig.social.instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon size={18} /> Síguenos {siteConfig.social.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- ZONAS: paneles que se expanden ----------
const ZONES = [
  { img: IMG.discos, title: "Powerlifting", text: "Sentadilla, banca y peso muerto sobre plataformas, con discos bumper calibrados.", gear: ["Barras olímpicas", "Discos bumper", "Plataformas", "Banco de competición"] },
  { img: IMG.racks, title: "Peso libre", text: "Power racks de uso rudo y espacio para entrenar pesado sin esperar turno.", gear: ["Power racks", "Mancuernas", "Barras", "Bancos ajustables"] },
  { img: IMG.maquinas, title: "Máquinas", text: "Biomecánica para aislar cada músculo con control y seguridad.", gear: ["Prensa inclinada", "Hack squat", "Poleas", "Espejos panorámicos"] },
  { img: IMG.interior, title: "Funcional", text: "Césped sintético en dos niveles para trineo, acondicionamiento y movilidad.", gear: ["Césped sintético", "Trineo", "TRX", "Dos niveles"] },
];

function Zones() {
  const [active, setActive] = useState(0);
  return (
    <section id="zonas" className="section section-alt">
      <div className="container">
        <Title center accent="zonas" lead="Pasa el mouse o toca cada zona para ver qué equipo encontrarás.">Nuestras</Title>
        <motion.div className="zones" variants={stagger} {...inView}>
          {ZONES.map((z, i) => {
            const on = i === active;
            return (
              <motion.button
                key={z.title}
                variants={reveal}
                className={`zone${on ? " on" : ""}`}
                onMouseEnter={() => finePointer() && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
              >
                <img src={z.img} alt="" loading="lazy" />
                <span className="zone-shade" />
                <span className="zone-vertical" aria-hidden="true">{z.title}</span>
                <span className="zone-body">
                  <span className="zone-title">{z.title}</span>
                  <span className="zone-text">{z.text}</span>
                  <span className="zone-gear">
                    {z.gear.map((g) => <span key={g}>{g}</span>)}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="planes" className="section">
      <div className="container">
        <Title center accent="plan">Elige tu</Title>
        <motion.div className="plans" variants={stagger} {...inView}>
          {siteConfig.plans.map((p) => (
            <motion.div key={p.id} variants={reveal}>
              <Tilt as="article" className={`plan${p.isFeatured ? " featured" : ""}`} max={7}>
                {p.isFeatured && <span className="badge"><ZapIcon size={14} /> Más elegido</span>}
                <h3>{p.name}</h3>
                <p className="plan-tag">{p.tagline}</p>
                <div className="price"><small>{p.currency}</small>{p.price}<span>/ {p.period}</span></div>
                <ul>{p.features.map((f) => <li key={f}><CheckIcon size={18} /> {f}</li>)}</ul>
                <a className={`btn${p.isFeatured ? "" : " btn-ghost"}`} href={p.whatsappUrl} target="_blank" rel="noreferrer">{p.buttonText}</a>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------- HORARIOS: estado en vivo + línea de tiempo semanal ----------
// ---------- HORARIOS: tres tarjetas simples ----------
const shortHour = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  return { num: `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""}`, ampm: h < 12 ? "AM" : "PM" };
};
function TimeRange({ s }) {
  const a = shortHour(s.from), b = shortHour(s.to);
  const spoken = `de ${fmtTime(Math.floor(s.from / 60), s.from % 60)} a ${fmtTime(Math.floor(s.to / 60), s.to % 60)}`;
  return (
    <li className="shift">
      <span className="shift-name">{s.name.replace("Turno ", "")}</span>
      <span className="shift-time" aria-label={spoken}>
        <span aria-hidden="true">{a.num}<small>{a.ampm}</small></span>
        <span className="shift-sep" aria-hidden="true" />
        <span aria-hidden="true">{b.num}<small>{b.ampm}</small></span>
      </span>
    </li>
  );
}
function Schedule() {
  const [status, setStatus] = useState(getStatus);
  useEffect(() => {
    const t = setInterval(() => setStatus(getStatus()), 30000);
    return () => clearInterval(t);
  }, []);
  const { weekdays, saturday, sunday } = siteConfig.hours;
  const groups = [
    { title: weekdays.days, days: [1, 2, 3, 4, 5], shifts: shiftsFor(1), note: "Pausa de 1 a 3 p. m." },
    { title: "Sábados", days: [6], shifts: shiftsFor(6) },
    { title: "Domingos", days: [0], shifts: [] },
  ];
  return (
    <section id="horarios" className="section schedule-section">
      <div className="container">
        <div className="schedule-head">
          <Title>Horarios</Title>
          <Reveal className={`status${status.open ? " open" : ""}`}>
            <span className="status-dot" aria-hidden="true" />
            <span role="status">
              <strong>{status.label}</strong>
              <small>{status.detail}</small>
            </span>
          </Reveal>
        </div>

        <motion.ul className="hours-grid" variants={stagger} {...inView}>
          {groups.map((g) => {
            const today = g.days.includes(status.day);
            return (
              <motion.li key={g.title} variants={reveal} className={`hours-card glass${today ? " today" : ""}`}>
                <div className="hours-card-head">
                  <h3>{g.title}</h3>
                  {today && <span className="today-badge">Hoy</span>}
                </div>
                {g.shifts.length ? (
                  <ul className="shifts">{g.shifts.map((s) => <TimeRange key={s.name} s={s} />)}</ul>
                ) : (
                  <div className="shifts-empty">
                    <p>{sunday.statusNote}</p>
                    <a href={wa("Hola, ¿abren este domingo?")} target="_blank" rel="noreferrer">Pregunta por WhatsApp <ArrowRightIcon size={16} /></a>
                  </div>
                )}
                {g.note && <p className="hours-note"><ClockIcon size={16} aria-hidden="true" /> {g.note}</p>}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <Reveal as="h2">Tu primer día cuesta solo S/ 15</Reveal>
        <Reveal delay={0.1}>
          <Magnetic className="btn btn-dark" href={siteConfig.plans[0].whatsappUrl} target="_blank" rel="noreferrer">
            Reservar pase diario <ArrowRightIcon size={18} />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="section">
      <div className="container contact-grid">
        <div>
          <Title accent="encontrarnos">Ven a</Title>
          <Reveal as="ul" className="contact-list">
            <li><MapPinIcon size={20} /><a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">{siteConfig.address}</a></li>
            <li><PhoneIcon size={20} /><a href={wa()} target="_blank" rel="noreferrer">{siteConfig.phone.display}</a></li>
            <li><InstagramIcon size={20} /><a href={siteConfig.social.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.social.instagramHandle}</a></li>
            <li><ShieldCheckIcon size={20} /><span>Sin contratos de permanencia</span></li>
          </Reveal>
          <Reveal delay={0.1}>
            <a className="btn" href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer"><NavigationIcon size={18} /> Cómo llegar</a>
          </Reveal>
        </div>
        <Reveal className="map" delay={0.15}>
          <iframe title="Mapa de 7 Strength Center" src={`https://www.google.com/maps?q=${siteConfig.googleMapsEmbedQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#inicio" className="brand">
          <Logo size={44} />
          <span>7 <b>Strength</b> Center</span>
        </a>
        <p>© {new Date().getFullYear()} {siteConfig.name} · {siteConfig.city}</p>
        <a href="#inicio" className="to-top" aria-label="Volver arriba"><ArrowUpIcon size={18} /></a>
      </div>
    </footer>
  );
}

// ---------- ASISTENTE CON IA ----------
// Respuestas básicas cuando la IA no está disponible (sin clave o sin internet).
function localAnswer(q) {
  const t = q.toLowerCase();
  const c = siteConfig;
  const h = c.hours;
  if (/horario|hora|abre|cierra|abierto|domingo|sábado|sabado/.test(t))
    return `${h.weekdays.days}: ${h.weekdays.shifts.map((s) => s.timeRange).join(" y ")}. ${h.saturday.days}: ${h.saturday.shifts[0].timeRange}. Domingos: ${h.sunday.statusNote.toLowerCase()}.`;
  if (/precio|cuesta|costo|plan|mensual|pase|pagar|membres/.test(t))
    return c.plans.map((p) => `${p.name}: ${p.formattedPrice} (${p.period})`).join(" · ") + ". Sin contratos de permanencia.";
  if (/dónde|donde|direcci|ubica|llegar|mapa/.test(t)) return `Estamos en ${c.address}. Toca “Cómo llegar” en la sección de contacto para abrir Google Maps.`;
  if (/entrenador|coach|profe|personal/.test(t))
    return `Nuestro equipo: ${c.trainers.map((tr) => `${tr.name} (${tr.role})`).join(", ")}. Entra a su perfil en la sección Entrenadores.`;
  if (/whatsapp|tel[eé]fono|contacto|inscrib|reserv/.test(t)) return `Escríbenos por WhatsApp al ${c.phone.display} y te ayudamos a inscribirte.`;
  return `Puedo contarte sobre horarios, planes, entrenadores y cómo llegar. Para algo más específico, escríbenos por WhatsApp al ${c.phone.display}.`;
}

const SUGGESTIONS = ["¿Cuál es el horario?", "¿Cuánto cuesta el plan mensual?", "Soy principiante, ¿con quién entreno?", "¿Dónde están?"];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "¡Hola! Soy el asistente de 7 Strength. Pregúntame por horarios, planes o entrenadores." },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (text) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    let reply;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.reply) reply = data.reply;
      else if (r.status === 429) reply = "Estás preguntando muy rápido. Espera unos segundos y vuelve a intentarlo.";
      else reply = localAnswer(q);
    } catch {
      reply = localAnswer(q);
    }
    setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    setBusy(false);
  };

  return (
    <div className="chat-root">
      <AnimatePresence>
        {open && (
          <motion.section
            className="chat-panel glass liquid"
            role="dialog"
            aria-label="Asistente de 7 Strength Center"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE } }}
            exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.18 } }}
          >
            <header className="chat-head">
              <Logo size={40} />
              <div>
                <strong>Asistente 7 Strength</strong>
                <small><span className="chat-online" /> Responde al instante</small>
              </div>
              <button className="round-btn small" onClick={() => setOpen(false)} aria-label="Cerrar chat"><XIcon size={18} /></button>
            </header>
            <div className="chat-list" ref={listRef} aria-live="polite">
              {msgs.map((m, i) => (
                <motion.p key={i} className={`bubble ${m.role}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
                  {m.content}
                </motion.p>
              ))}
              {busy && <p className="bubble assistant typing" aria-label="Escribiendo"><i /><i /><i /></p>}
              {msgs.length === 1 && (
                <div className="chat-suggest">
                  {SUGGESTIONS.map((s) => <button key={s} onClick={() => ask(s)}>{s}</button>)}
                </div>
              )}
            </div>
            <form className="chat-form" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                maxLength={500}
                aria-label="Tu pregunta"
              />
              <button className="chat-send" disabled={!input.trim() || busy} aria-label="Enviar"><ArrowUpIcon size={20} /></button>
            </form>
            <a className="chat-wa" href={wa()} target="_blank" rel="noreferrer"><MessageCircleIcon size={15} /> Prefiero hablar por WhatsApp</a>
          </motion.section>
        )}
      </AnimatePresence>
      <div className="fab-stack">
        <button className={`fab fab-ai${open ? " on" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Cerrar asistente" : "Abrir asistente con IA"}>
          {open ? <XIcon size={24} /> : <SparklesIcon size={24} />}
          {!open && <span className="fab-label">Pregúntame</span>}
        </button>
      </div>
    </div>
  );
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
  return (
    <main id="contenido" tabIndex={-1}>
      <Hero />
      <Ribbons />
      <About />
      <WhyUs />
      <Trainers />
      <Reels />
      <Zones />
      <Plans />
      <Schedule />
      <CtaBand />
      <Contact />
    </main>
  );
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
  const trainer = useMemo(() => siteConfig.trainers.find((t) => t.slug === slug), [slug]);
  useEffect(() => {
    if (!trainer) return;
    window.scrollTo(0, 0);
    // Lleva el foco al nombre del entrenador para lectores de pantalla.
    setTimeout(() => document.querySelector(".profile h1")?.focus(), 50);
  }, [trainer]);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Intro />
      <ScrollProgress />
      <Header />
      {trainer ? <TrainerProfile key={trainer.slug} t={trainer} /> : <Home />}
      <Footer />
      <ChatBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById(`root`)).render(<App />);
