// Código recuperado de la versión pública y reorganizado para edición local.
import { gd as useScroll, wd as useSpring, z as jsxRuntime, J as motion, S as React, Pd as AccessibilityIcon, Ld as ArrowUpRightIcon, gf as XIcon, ef as MenuIcon, Rc as AnimatePresence, Id as ArrowRightIcon, qd as DumbbellIcon, ff as TargetIcon, mf as UsersIcon, lf as ShieldCheckIcon, Gd as ClockIcon, Hd as ChevronLeftIcon, Ud as ChevronRightIcon, vf as ZoomInIcon, $d as Maximize2Icon, _f as ZapIcon, Vd as CheckIcon, Bd as CalendarIcon, df as SunIcon, nf as MoonIcon, Wd as CircleQuestionMarkIcon, tf as MessageCircleIcon, Xd as InstagramIcon, Jd as ExternalLinkIcon, sf as PlayIcon, uf as SparklesIcon, Qd as MapPinIcon, Kd as CopyIcon, of as PhoneIcon, af as NavigationIcon, Rd as ArrowUpIcon, X as Volume2Icon, hf as VolumeXIcon, pf as TypeIcon, zd as BookOpenIcon, Yd as EyeIcon, Fd as ActivityIcon, Zd as Link2Icon, rf as MousePointerIcon, cf as RotateCcwIcon, Td as ReactDOM } from "../vendor/runtime.js";
import { siteConfig } from "./site-config.js";
const ScrollProgress = () => {
  let {
      scrollYProgress: e
    } = useScroll(),
    t = useSpring(e, {
      stiffness: 120,
      damping: 30,
      restDelta: 0.001
    });
  return /*#__PURE__*/React.createElement(motion.div, {
    className: `fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A80F15] via-[#D71920] to-[#FF3B43] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(215,25,32,0.6)]`,
    style: {
      scaleX: t
    },
    "aria-hidden": `true`
  });
};
function whatsappUrl(e) {
  let t = e || siteConfig.phone.whatsappMessageGeneral;
  return `https://wa.me/${siteConfig.phone.raw}?text=${encodeURIComponent(t)}`;
}
function getOpeningStatus(e = new Date()) {
  let t = e.getTime() + e.getTimezoneOffset() * 6e4,
    n = new Date(t - 18e6),
    r = n.getDay(),
    i = n.getHours(),
    a = n.getMinutes(),
    o = i * 60 + a;
  return r === 0 ? {
    isOpen: !1,
    isPaused: !1,
    statusLabel: `Horario no confirmado`,
    nextEventDescription: `Consulta disponibilidad dominical por WhatsApp`,
    badgeColorClass: `text-amber-400 bg-amber-400/10 border-amber-400/20`
  } : r === 6 ? o >= 480 && o < 780 ? {
    isOpen: !0,
    isPaused: !1,
    statusLabel: `Abierto ahora`,
    nextEventDescription: `Cierra hoy a la 1:00 p. m.`,
    badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`
  } : o < 480 ? {
    isOpen: !1,
    isPaused: !1,
    statusLabel: `Próxima apertura`,
    nextEventDescription: `Abre hoy a las 8:00 a. m.`,
    badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`
  } : {
    isOpen: !1,
    isPaused: !1,
    statusLabel: `Cerrado por hoy`,
    nextEventDescription: `Próxima apertura: Lunes a las 7:00 a. m.`,
    badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`
  } : o >= 420 && o < 780 ? {
    isOpen: !0,
    isPaused: !1,
    statusLabel: `Abierto ahora · Turno Mañana`,
    nextEventDescription: `Pausa a la 1:00 p. m. (reapertura 3:00 p. m.)`,
    badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`
  } : o >= 780 && o < 900 ? {
    isOpen: !1,
    isPaused: !0,
    statusLabel: `Pausa intermedia`,
    nextEventDescription: `Reabre en turno tarde a las 3:00 p. m.`,
    badgeColorClass: `text-amber-400 bg-amber-400/10 border-amber-400/20`
  } : o >= 900 && o < 1260 ? {
    isOpen: !0,
    isPaused: !1,
    statusLabel: `Abierto ahora · Turno Tarde`,
    nextEventDescription: `Cierra a las 9:00 p. m.`,
    badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`
  } : o < 420 ? {
    isOpen: !1,
    isPaused: !1,
    statusLabel: `Próxima apertura`,
    nextEventDescription: `Abre hoy a las 7:00 a. m.`,
    badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`
  } : {
    isOpen: !1,
    isPaused: !1,
    statusLabel: `Cerrado por hoy`,
    nextEventDescription: r === 5 ? `Abre mañana sábado a las 8:00 a. m.` : `Abre mañana a las 7:00 a. m.`,
    badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`
  };
}
var AccessibilityContext = (0, React.createContext)(void 0),
  AccessibilityProvider = ({
    children: e
  }) => {
    let [t, n] = (0, React.useState)(`normal`),
      [r, i] = (0, React.useState)(!1),
      [a, o] = (0, React.useState)(!1),
      [s, c] = (0, React.useState)(!1),
      [l, u] = (0, React.useState)(!1),
      [d, f] = (0, React.useState)(!1),
      [p, m] = (0, React.useState)(!1),
      [h, g] = (0, React.useState)(!1),
      [_, v] = (0, React.useState)(!1);
    (0, React.useEffect)(() => {
      let e = document.documentElement,
        n = t === `xlarge` ? `1.3` : t === `large` ? `1.15` : `1`;
      e.style.setProperty(`--a11y-font-scale`, n), e.classList.toggle(`a11y-high-contrast`, r), e.classList.toggle(`a11y-grayscale`, a), e.classList.toggle(`a11y-dyslexia`, s), e.classList.toggle(`a11y-reduced-motion`, l), e.classList.toggle(`a11y-highlight-links`, d), e.classList.toggle(`a11y-big-cursor`, p);
    }, [t, r, a, s, l, d, p]), (0, React.useEffect)(() => {
      let e = e => {
        e.altKey && (e.key === `a` || e.key === `A`) && (e.preventDefault(), g(e => !e));
      };
      return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e);
    }, []);
    let y = e => n(e),
      b = () => i(e => !e),
      x = () => o(e => !e),
      ee = () => c(e => !e),
      te = () => u(e => !e),
      C = () => f(e => !e),
      ne = () => m(e => !e),
      w = () => {
        n(`normal`), i(!1), o(!1), c(!1), u(!1), f(!1), m(!1), re();
      },
      re = (0, React.useCallback)(() => {
        `speechSynthesis` in window && (window.speechSynthesis.cancel(), v(!1));
      }, []),
      ie = (0, React.useCallback)(() => {
        if (!(`speechSynthesis` in window)) {
          alert(`Tu navegador no soporta el sintetizador de voz nativo.`);
          return;
        }
        if (_) {
          re();
          return;
        }
        window.speechSynthesis.cancel();
        let e = new SpeechSynthesisUtterance(`Bienvenido a 7 Strength Center, gimnasio de fuerza y rendimiento en Cajamarca, Perú. 
Ubicación: Los Leones 164, Cajamarca.
Planes oficiales: Pase Diario a 15 soles y Plan Mensual a 120 soles.
Horarios de atención: De lunes a viernes, turno mañana de 7:00 a. m. a 1:00 p. m. y turno tarde de 3:00 p. m. a 9:00 p. m. Sábados de 8:00 a. m. a 1:00 p. m. Domingos con horario por confirmar por WhatsApp.
WhatsApp oficial: +51 976 795 498. Escríbenos para unirte hoy.`);
        e.lang = `es-PE`, e.rate = 0.95;
        let t = window.speechSynthesis.getVoices().find(e => e.lang.startsWith(`es`));
        t && (e.voice = t), e.onend = () => v(!1), e.onerror = () => v(!1), v(!0), window.speechSynthesis.speak(e);
      }, [_, re]);
    return /*#__PURE__*/React.createElement(AccessibilityContext.Provider, {
      value: {
        textSize: t,
        highContrast: r,
        grayscale: a,
        dyslexiaFont: s,
        reducedMotion: l,
        highlightLinks: d,
        bigCursor: p,
        isOpen: h,
        isSpeaking: _,
        setTextSize: y,
        toggleHighContrast: b,
        toggleGrayscale: x,
        toggleDyslexiaFont: ee,
        toggleReducedMotion: te,
        toggleHighlightLinks: C,
        toggleBigCursor: ne,
        setIsOpen: g,
        resetAll: w,
        speakOverview: ie,
        stopSpeaking: re
      }
    }, e);
  },
  useAccessibility = () => {
    let e = (0, React.useContext)(AccessibilityContext);
    if (!e) throw Error(`useAccessibility must be used within an AccessibilityProvider`);
    return e;
  },
  Header = ({
    activeSection: e
  }) => {
    let [t, n] = (0, React.useState)(!1),
      [r, i] = (0, React.useState)(!1);
    (0, React.useEffect)(() => {
      let e = () => {
        n(window.scrollY > 25);
      };
      return window.addEventListener(`scroll`, e, {
        passive: !0
      }), () => window.removeEventListener(`scroll`, e);
    }, []);
    let a = [{
        label: `Inicio`,
        href: `#inicio`
      }, {
        label: `Nosotros`,
        href: `#nosotros`
      }, {
        label: `Instalaciones`,
        href: `#instalaciones`
      }, {
        label: `Planes`,
        href: `#planes`
      }, {
        label: `Horarios`,
        href: `#horarios`
      }, {
        label: `Comunidad`,
        href: `#comunidad`
      }, {
        label: `Contacto`,
        href: `#contacto`
      }],
      {
        setIsOpen: o
      } = useAccessibility(),
      s = (e, t) => {
        e.preventDefault(), i(!1);
        let n = document.querySelector(t);
        if (n) {
          let e = n.getBoundingClientRect().top + window.pageYOffset - 76;
          window.scrollTo({
            top: e,
            behavior: `smooth`
          });
        }
      };
    return /*#__PURE__*/React.createElement(motion.header, {
      initial: {
        y: -80,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1
      },
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${t ? `liquid-glass border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3` : `bg-transparent py-5 sm:py-6`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center justify-between gap-4 md:gap-8`
    }, /*#__PURE__*/React.createElement("a", {
      href: `#inicio`,
      onClick: e => s(e, `#inicio`),
      className: `flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] rounded-lg p-1`,
      "aria-label": `7 Strength Center - Volver al inicio`
    }, /*#__PURE__*/React.createElement("div", {
      className: `relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-[#D71920] transition-colors shrink-0 shadow-lg`
    }, /*#__PURE__*/React.createElement("img", {
      src: siteConfig.logoPath,
      alt: `Logo oficial 7 Strength Center`,
      className: `w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300`,
      loading: `eager`
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex flex-col`
    }, /*#__PURE__*/React.createElement("span", {
      className: `font-display text-xl sm:text-2xl text-white tracking-wider leading-none font-bold`
    }, `7 STRENGTH`), /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] sm:text-xs text-[#D71920] tracking-widest uppercase font-semibold leading-none mt-0.5 group-hover:tracking-[0.2em] transition-all duration-300`
    }, `CENTER`))), /*#__PURE__*/React.createElement("nav", {
      className: `hidden lg:flex items-center gap-8 text-sm font-medium`,
      "aria-label": `Navegación principal`
    }, a.map(t => {
      let n = e === t.href.substring(1);
      return /*#__PURE__*/React.createElement("a", {
        href: t.href,
        onClick: e => s(e, t.href),
        className: `relative py-1 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D71920] rounded ${n ? `text-white font-bold` : `text-neutral-400 hover:text-white`}`,
        key: t.href
      }, t.label, n && /*#__PURE__*/React.createElement(motion.span, {
        layoutId: `navActiveLine`,
        className: `absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D71920] rounded-full shadow-[0_0_8px_rgba(215,25,32,0.8)]`,
        transition: {
          type: `spring`,
          stiffness: 380,
          damping: 30
        }
      }));
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 sm:gap-3 shrink-0`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => o(!0),
      className: `p-2 sm:p-2.5 rounded-xl liquid-glass text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]`,
      "aria-label": `Abrir panel de accesibilidad (Alt + A)`,
      title: `Accesibilidad universal`
    }, /*#__PURE__*/React.createElement(AccessibilityIcon, {
      className: `w-4 h-4 sm:w-5 sm:h-5 text-neutral-200 hover:text-[#D71920] transition-colors`
    })), /*#__PURE__*/React.createElement("a", {
      href: whatsappUrl(),
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `group relative overflow-hidden inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#D71920] hover:bg-[#A80F15] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-900/40 hover:shadow-red-900/70 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/30`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`
    }), /*#__PURE__*/React.createElement("span", {
      className: `relative z-10`
    }, `ÚNETE AHORA`), /*#__PURE__*/React.createElement(ArrowUpRightIcon, {
      className: `relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200`
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => i(!r),
      className: `lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]`,
      "aria-label": r ? `Cerrar menú` : `Abrir menú de navegación`,
      "aria-expanded": r
    }, r ? /*#__PURE__*/React.createElement(XIcon, {
      className: `w-6 h-6`
    }) : /*#__PURE__*/React.createElement(MenuIcon, {
      className: `w-6 h-6`
    }))))), /*#__PURE__*/React.createElement(AnimatePresence, null, r && /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        height: 0
      },
      animate: {
        opacity: 1,
        height: `auto`
      },
      exit: {
        opacity: 0,
        height: 0
      },
      transition: {
        duration: 0.25,
        ease: `easeInOut`
      },
      className: `lg:hidden bg-[#0B0B0C]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl overflow-hidden px-6 py-6`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex flex-col gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-3 pb-3 border-b border-neutral-800/80`
    }, /*#__PURE__*/React.createElement("img", {
      src: siteConfig.logoPath,
      alt: `Logo 7 Strength`,
      className: `w-8 h-8 object-contain`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-xs uppercase tracking-widest text-neutral-400 font-semibold`
    }, `Cajamarca, Perú`)), a.map(t => {
      let n = e === t.href.substring(1);
      return /*#__PURE__*/React.createElement("a", {
        href: t.href,
        onClick: e => s(e, t.href),
        className: `text-base py-2 px-3 rounded-lg transition-all ${n ? `bg-neutral-900 text-[#D71920] font-bold border-l-2 border-[#D71920]` : `text-neutral-300 hover:bg-neutral-900/60 hover:text-white`}`,
        key: t.href
      }, t.label);
    }), /*#__PURE__*/React.createElement("div", {
      className: `pt-4 border-t border-neutral-800/80 flex flex-col gap-2`
    }, /*#__PURE__*/React.createElement("a", {
      href: whatsappUrl(),
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `w-full text-center py-3.5 bg-[#D71920] hover:bg-[#A80F15] text-white font-bold tracking-wider uppercase text-sm rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2`
    }, /*#__PURE__*/React.createElement("span", null, `ÚNETE AHORA POR WHATSAPP`), /*#__PURE__*/React.createElement(ArrowUpRightIcon, {
      className: `w-4 h-4`
    })), /*#__PURE__*/React.createElement("p", {
      className: `text-center text-xs text-neutral-400 mt-1`
    }, `Atención directa: +51 976 795 498`))))));
  },
  Hero = () => {
    let e = e => {
      let t = document.querySelector(e);
      if (t) {
        let e = t.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({
          top: e,
          behavior: `smooth`
        });
      }
    };
    return /*#__PURE__*/React.createElement("section", {
      id: `inicio`,
      className: `relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden bg-[#0B0B0C]`
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute inset-0 z-0 overflow-hidden pointer-events-none`
    }, /*#__PURE__*/React.createElement(motion.img, {
      initial: {
        scale: 1.08,
        opacity: 0
      },
      animate: {
        scale: 1,
        opacity: 0.85
      },
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1]
      },
      src: `/assets/aistudio/image_cab5cadb.png`,
      alt: `Instalaciones oficiales de 7 Strength Center en Cajamarca`,
      className: `w-full h-full object-cover object-center filter brightness-65 contrast-125`,
      loading: `eager`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/75 to-[#0B0B0C]/40`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/15 blur-[160px] rounded-full pointer-events-none`
    })), /*#__PURE__*/React.createElement("div", {
      className: `relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-4xl`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.6,
        delay: 0.2
      },
      className: `inline-flex items-center gap-3 px-4 py-2 rounded-full liquid-glass-subtle text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6 text-neutral-300 border border-white/10 shadow-lg`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-2 h-2 rounded-full bg-[#D71920] animate-pulse`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-white`
    }, `7 STRENGTH CENTER`), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": `true`,
      className: `text-neutral-500`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `text-[#D71920]`
    }, `CAJAMARCA`)), /*#__PURE__*/React.createElement("div", {
      className: `font-display tracking-tight leading-[0.9] mb-8 select-none`
    }, /*#__PURE__*/React.createElement("div", {
      className: `overflow-hidden`
    }, /*#__PURE__*/React.createElement(motion.h1, {
      initial: {
        y: `100%`,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1
      },
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `text-6xl sm:text-8xl lg:text-9xl text-white block font-bold`
    }, `NO HAY LÍMITES.`)), /*#__PURE__*/React.createElement("div", {
      className: `overflow-hidden mt-1 sm:mt-2`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        y: `100%`,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1
      },
      transition: {
        duration: 0.9,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `text-6xl sm:text-8xl lg:text-9xl text-white font-bold flex items-baseline gap-3 sm:gap-5 flex-wrap`
    }, /*#__PURE__*/React.createElement("span", null, `SOLO`), /*#__PURE__*/React.createElement("span", {
      className: `relative text-[#D71920] drop-shadow-[0_0_35px_rgba(215,25,32,0.45)]`
    }, `FUERZA.`, /*#__PURE__*/React.createElement(motion.span, {
      initial: {
        width: 0
      },
      animate: {
        width: `100%`
      },
      transition: {
        duration: 0.8,
        delay: 1.1,
        ease: `easeOut`
      },
      className: `absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-2 bg-[#D71920] rounded-full`
    }))))), /*#__PURE__*/React.createElement(motion.p, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.7,
        delay: 0.8
      },
      className: `text-neutral-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-10`
    }, `En 7 Strength Center, cada entrenamiento es una oportunidad para superar tus límites y convertirte en tu mejor versión.`), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.7,
        delay: 1
      },
      className: `flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5`
    }, /*#__PURE__*/React.createElement(motion.button, {
      whileHover: {
        scale: 1.03,
        y: -2
      },
      whileTap: {
        scale: 0.97
      },
      onClick: () => e(`#planes`),
      className: `group relative overflow-hidden px-8 py-4.5 liquid-glass-red text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl shadow-[0_15px_40px_rgba(215,25,32,0.4)] hover:shadow-[0_20px_50px_rgba(215,25,32,0.6)] text-center cursor-pointer flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/50`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-800 pointer-events-none`
    }), /*#__PURE__*/React.createElement("span", {
      className: `relative z-10`
    }, `CONOCE NUESTROS PLANES`), /*#__PURE__*/React.createElement(ArrowRightIcon, {
      className: `relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200`
    })), /*#__PURE__*/React.createElement(motion.button, {
      whileHover: {
        scale: 1.03,
        y: -2
      },
      whileTap: {
        scale: 0.97
      },
      onClick: () => e(`#instalaciones`),
      className: `group px-8 py-4.5 liquid-glass hover:border-[#D71920]/80 text-neutral-200 hover:text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl transition-all duration-300 text-center cursor-pointer shadow-xl flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] border border-white/15`
    }, /*#__PURE__*/React.createElement("span", null, `EXPLORA EL GIMNASIO`))))), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 0.8,
        delay: 1.3
      },
      className: `relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pt-8`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => e(`#nosotros`),
      className: `group flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none`,
      "aria-label": `Deslizar hacia abajo para explorar el gimnasio`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] font-semibold tracking-[0.25em]`
    }, `DESLIZA PARA EXPLORAR`), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-8 rounded-full border border-neutral-700 group-hover:border-[#D71920] flex items-start justify-center p-1 transition-colors`
    }, /*#__PURE__*/React.createElement(motion.div, {
      animate: {
        y: [0, 10, 0]
      },
      transition: {
        repeat: 1 / 0,
        duration: 1.6,
        ease: `easeInOut`
      },
      className: `w-1 h-2 bg-[#D71920] rounded-full`
    })))));
  },
  About = () => {
    let e = (0, React.useMemo)(() => getOpeningStatus(), []),
      t = [{
        icon: DumbbellIcon,
        title: `FUERZA`,
        text: `Cada entrenamiento es una oportunidad para avanzar.`,
        number: `01`
      }, {
        icon: TargetIcon,
        title: `DISCIPLINA`,
        text: `La constancia transforma tus objetivos en resultados.`,
        number: `02`
      }, {
        icon: UsersIcon,
        title: `COMUNIDAD`,
        text: `Comparte tu pasión por el entrenamiento.`,
        number: `03`
      }];
    return /*#__PURE__*/React.createElement("section", {
      id: `nosotros`,
      className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`
    }), /*#__PURE__*/React.createElement("div", {
      className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 30
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `mb-16`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-6 h-[2px] bg-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `FILOSOFÍA 7 STRENGTH`), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": `true`,
      className: `text-neutral-700`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `text-neutral-400`
    }, `CAJAMARCA`)), /*#__PURE__*/React.createElement("h2", {
      className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95] max-w-4xl`
    }, `MÁS QUE UN GIMNASIO. `, /*#__PURE__*/React.createElement("span", {
      className: `text-[#D71920]`
    }, `UNA COMUNIDAD.`))), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        x: -30
      },
      whileInView: {
        opacity: 1,
        x: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `lg:col-span-5 relative`
    }, /*#__PURE__*/React.createElement("div", {
      className: `group relative rounded-3xl overflow-hidden liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/30 transition-all duration-500`
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute -top-24 -left-24 w-60 h-60 bg-[#D71920]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D71920]/40 transition-all duration-700`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute -bottom-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none`
    }), /*#__PURE__*/React.createElement("div", {
      className: `relative z-10 flex flex-col`
    }, /*#__PURE__*/React.createElement("div", {
      className: `relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-6 group/img`
    }, /*#__PURE__*/React.createElement("img", {
      src: `/assets/aistudio/image_993ddb80.png`,
      alt: `Interior real de 7 Strength Center en Cajamarca`,
      className: `w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent`
    }), /*#__PURE__*/React.createElement("div", {
      className: `absolute bottom-3 left-3 flex items-center gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-14 h-14 rounded-xl liquid-glass p-1 shadow-2xl shrink-0 flex items-center justify-center border border-white/20`
    }, /*#__PURE__*/React.createElement("img", {
      src: siteConfig.logoPath,
      alt: `Emblema oficial 7 Strength Center`,
      className: `w-full h-full object-contain`
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] text-[#D71920] font-bold tracking-[0.2em] uppercase block`
    }, `SEDE OFICIAL`), /*#__PURE__*/React.createElement("h4", {
      className: `font-display text-lg text-white leading-none`
    }, `7 STRENGTH CENTER`))), /*#__PURE__*/React.createElement("div", {
      className: `absolute top-3 right-3 px-2.5 py-1 rounded-full liquid-glass text-[10px] font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1 border border-white/20`
    }, /*#__PURE__*/React.createElement(ShieldCheckIcon, {
      className: `w-3 h-3 text-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `Instalación Real`))), /*#__PURE__*/React.createElement("div", {
      className: `flex items-center justify-between px-1`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: `font-display text-2xl text-white tracking-wide`
    }, `LOS LEONES 164`), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-400 uppercase tracking-widest`
    }, `Cajamarca · Perú`)), /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40`
    }, `2 NIVELES`)), /*#__PURE__*/React.createElement("div", {
      className: `mt-5 w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-between shadow-inner ${e.badgeColorClass}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `flex items-center gap-2`
    }, /*#__PURE__*/React.createElement(ClockIcon, {
      className: `w-3.5 h-3.5`
    }), /*#__PURE__*/React.createElement("span", null, e.statusLabel)), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] opacity-90`
    }, e.nextEventDescription))))), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        x: 30
      },
      whileInView: {
        opacity: 1,
        x: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `lg:col-span-7 flex flex-col justify-center`
    }, /*#__PURE__*/React.createElement("p", {
      className: `text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed mb-10 border-l-2 border-[#D71920] pl-6 py-1`
    }, `En 7 Strength Center creemos que la fuerza se construye con esfuerzo, disciplina y constancia. Somos un espacio dedicado a quienes buscan mejorar su condición física, superar sus propios límites y disfrutar del entrenamiento como parte de su estilo de vida.`), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 gap-4 sm:gap-5`
    }, t.map((e, t) => {
      let n = e.icon;
      return /*#__PURE__*/React.createElement(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        whileInView: {
          opacity: 1,
          y: 0
        },
        viewport: {
          once: !0,
          margin: `-40px`
        },
        transition: {
          duration: 0.5,
          delay: t * 0.12
        },
        whileHover: {
          scale: 1.02,
          transition: {
            type: `spring`,
            stiffness: 400,
            damping: 25
          }
        },
        className: `group flex items-start gap-5 p-6 rounded-2xl liquid-glass liquid-glass-interactive shadow-lg hover:shadow-2xl hover:shadow-red-950/30`,
        key: e.title
      }, /*#__PURE__*/React.createElement("div", {
        className: `w-14 h-14 rounded-xl liquid-glass border border-white/15 group-hover:border-[#D71920] group-hover:bg-[#D71920]/20 flex items-center justify-center shrink-0 transition-all duration-300`
      }, (0, jsxRuntime.jsx)(n, {
        className: `w-7 h-7 text-[#D71920] group-hover:scale-110 transition-transform duration-300`
      })), /*#__PURE__*/React.createElement("div", {
        className: `flex-1`
      }, /*#__PURE__*/React.createElement("div", {
        className: `flex items-center justify-between`
      }, /*#__PURE__*/React.createElement("h4", {
        className: `font-display text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#D71920] transition-colors`
      }, e.title), /*#__PURE__*/React.createElement("span", {
        className: `font-display text-sm text-neutral-500 tracking-wider`
      }, e.number)), /*#__PURE__*/React.createElement("p", {
        className: `text-sm sm:text-base text-neutral-300 mt-1 leading-normal`
      }, e.text)));
    })), /*#__PURE__*/React.createElement("div", {
      className: `mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-neutral-400`
    }, `Instalaciones profesionales en Los Leones 164, Cajamarca`), /*#__PURE__*/React.createElement("a", {
      href: whatsappUrl(),
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-white uppercase tracking-wider transition-colors group`
    }, /*#__PURE__*/React.createElement("span", null, `CONSULTAR POR WHATSAPP`), /*#__PURE__*/React.createElement(ArrowRightIcon, {
      className: `w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform`
    })))))));
  },
  GalleryLightbox = ({
    slot: e,
    slots: t,
    onClose: n,
    onNavigate: r
  }) => {
    if ((0, React.useEffect)(() => {
      if (!e) return;
      let t = e => {
        e.key === `Escape` && n(), e.key === `ArrowLeft` && a(), e.key === `ArrowRight` && o();
      };
      return window.addEventListener(`keydown`, t), () => window.removeEventListener(`keydown`, t);
    }, [e]), !e) return null;
    let i = t.findIndex(t => t.id === e.id),
      a = () => {
        r(t[(i - 1 + t.length) % t.length]);
      },
      o = () => {
        r(t[(i + 1) % t.length]);
      };
    return /*#__PURE__*/React.createElement(AnimatePresence, null, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      exit: {
        opacity: 0
      },
      transition: {
        duration: 0.25
      },
      className: `fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6`,
      role: `dialog`,
      "aria-modal": `true`,
      "aria-label": `Visualizador: ${e.title}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-white font-bold`
    }, i + 1), /*#__PURE__*/React.createElement("span", null, `/`), /*#__PURE__*/React.createElement("span", null, t.length), /*#__PURE__*/React.createElement("span", {
      className: `hidden sm:inline`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `hidden sm:inline text-neutral-300`
    }, e.category)), /*#__PURE__*/React.createElement(motion.button, {
      whileHover: {
        scale: 1.1
      },
      whileTap: {
        scale: 0.9
      },
      onClick: n,
      className: `p-3 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`,
      "aria-label": `Cerrar visor`
    }, /*#__PURE__*/React.createElement(XIcon, {
      className: `w-5 h-5`
    }))), /*#__PURE__*/React.createElement(motion.button, {
      whileHover: {
        scale: 1.1
      },
      whileTap: {
        scale: 0.9
      },
      onClick: a,
      className: `absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`,
      "aria-label": `Fotografía anterior`
    }, /*#__PURE__*/React.createElement(ChevronLeftIcon, {
      className: `w-6 h-6`
    })), /*#__PURE__*/React.createElement(motion.button, {
      whileHover: {
        scale: 1.1
      },
      whileTap: {
        scale: 0.9
      },
      onClick: o,
      className: `absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`,
      "aria-label": `Fotografía siguiente`
    }, /*#__PURE__*/React.createElement(ChevronRightIcon, {
      className: `w-6 h-6`
    })), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        scale: 0.95
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center`,
      key: e.id
    }, /*#__PURE__*/React.createElement("div", {
      className: `relative w-full max-h-[70vh] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex items-center justify-center`
    }, e.sampleImage ? /*#__PURE__*/React.createElement("img", {
      src: e.sampleImage,
      alt: e.title,
      className: `w-full max-h-[70vh] object-contain`
    }) : /*#__PURE__*/React.createElement("div", {
      className: `w-full h-80 flex flex-col items-center justify-center p-8 text-center bg-neutral-900`
    }, /*#__PURE__*/React.createElement(ZoomInIcon, {
      className: `w-12 h-12 text-neutral-600 mb-3`
    }), /*#__PURE__*/React.createElement("p", {
      className: `text-white font-display text-2xl`
    }, e.title), /*#__PURE__*/React.createElement("p", {
      className: `text-sm text-neutral-400 max-w-md mt-2`
    }, e.placeholderText)), /*#__PURE__*/React.createElement("div", {
      className: `absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2 text-xs text-neutral-200 shadow-lg`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0`
    }), /*#__PURE__*/React.createElement("span", null, `Fotografía Oficial · Instalaciones reales de 7 Strength Center en Cajamarca`))), /*#__PURE__*/React.createElement("div", {
      className: `mt-5 text-center max-w-2xl px-4`
    }, /*#__PURE__*/React.createElement("h3", {
      className: `font-display text-3xl sm:text-4xl text-white tracking-wide`
    }, e.title), /*#__PURE__*/React.createElement("p", {
      className: `text-sm text-neutral-300 mt-1.5 leading-relaxed`
    }, e.description)))));
  },
  Gallery = () => {
    let [e, t] = (0, React.useState)(null),
      n = (e, t) => {
        switch (t) {
          case 0:
            return `md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[480px]`;
          case 1:
            return `md:col-span-1 md:row-span-2 min-h-[320px] md:min-h-[480px]`;
          case 2:
            return `md:col-span-1 md:row-span-1 min-h-[250px]`;
          case 3:
            return `md:col-span-1 md:row-span-1 min-h-[250px]`;
          case 4:
            return `md:col-span-2 md:row-span-1 min-h-[250px]`;
          default:
            return `md:col-span-1 md:row-span-1 min-h-[250px]`;
        }
      };
    return /*#__PURE__*/React.createElement("section", {
      id: `instalaciones`,
      className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 30
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-2xl`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-6 h-[2px] bg-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `ESPACIOS DE ENTRENAMIENTO`), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": `true`,
      className: `text-neutral-700`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `text-neutral-400`
    }, `GALERÍA`)), /*#__PURE__*/React.createElement("h2", {
      className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`
    }, `CONOCE DONDE COMIENZA `, /*#__PURE__*/React.createElement("span", {
      className: `text-[#D71920]`
    }, `TU TRANSFORMACIÓN.`)), /*#__PURE__*/React.createElement("p", {
      className: `text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`
    }, `Descubre los espacios de 7 Strength Center y conoce el lugar donde podrás llevar tu entrenamiento al siguiente nivel.`)), /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2.5 px-4 py-3 liquid-glass rounded-xl text-xs text-neutral-300 max-w-sm shrink-0 shadow-lg border border-white/15`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0`
    }), /*#__PURE__*/React.createElement("p", {
      className: `leading-snug`
    }, /*#__PURE__*/React.createElement("strong", {
      className: `text-white`
    }, `Fotografías 100% Reales:`), ` Conoce las instalaciones oficiales de nuestra sede en Los Leones 164, Cajamarca.`))), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 md:grid-cols-3 gap-5`
    }, siteConfig.gallerySlots.map((e, r) => {
      let i = n(e.aspect, r);
      return /*#__PURE__*/React.createElement(motion.div, {
        initial: {
          opacity: 0,
          y: 30
        },
        whileInView: {
          opacity: 1,
          y: 0
        },
        viewport: {
          once: !0,
          margin: `-50px`
        },
        transition: {
          duration: 0.6,
          delay: r * 0.1,
          ease: [0.16, 1, 0.3, 1]
        },
        whileHover: {
          scale: 1.015,
          transition: {
            type: `spring`,
            stiffness: 400,
            damping: 25
          }
        },
        onClick: () => t(e),
        onKeyDown: n => {
          (n.key === `Enter` || n.key === ` `) && (n.preventDefault(), t(e));
        },
        tabIndex: 0,
        role: `button`,
        "aria-label": `Ver detalle de ${e.title}`,
        className: `group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive cursor-pointer shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col justify-end p-6 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] ${i}`,
        key: e.id
      }, e.sampleImage ? /*#__PURE__*/React.createElement("img", {
        src: e.sampleImage,
        alt: e.title,
        className: `absolute inset-0 w-full h-full object-cover object-center filter brightness-65 group-hover:brightness-85 group-hover:scale-105 transition-all duration-700 ease-out`,
        loading: `lazy`
      }) : /*#__PURE__*/React.createElement("div", {
        className: `absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black`
      }), /*#__PURE__*/React.createElement("div", {
        className: `absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300`
      }), /*#__PURE__*/React.createElement("div", {
        className: `absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none`
      }), /*#__PURE__*/React.createElement("div", {
        className: `relative z-10 flex items-center justify-between mb-auto`
      }, /*#__PURE__*/React.createElement("span", {
        className: `text-[11px] font-semibold tracking-wider uppercase text-neutral-200 px-3 py-1 rounded-full liquid-glass border border-white/20`
      }, e.category), /*#__PURE__*/React.createElement("div", {
        className: `w-9 h-9 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-[#D71920] group-hover:border-[#D71920] group-hover:scale-110 transition-all duration-200`
      }, /*#__PURE__*/React.createElement(Maximize2Icon, {
        className: `w-4 h-4`
      }))), /*#__PURE__*/React.createElement("div", {
        className: `relative z-10 mt-6`
      }, /*#__PURE__*/React.createElement("div", {
        className: `flex items-center gap-2 mb-2`
      }, /*#__PURE__*/React.createElement("span", {
        className: `w-1.5 h-1.5 rounded-full bg-[#D71920] group-hover:animate-ping`
      }), /*#__PURE__*/React.createElement("span", {
        className: `text-[11px] text-[#D71920] font-bold tracking-[0.2em] uppercase`
      }, `Instalación Real`)), /*#__PURE__*/React.createElement("h3", {
        className: `font-display text-2xl sm:text-3xl text-white tracking-wide leading-none group-hover:text-[#D71920] transition-colors duration-200`
      }, e.title), /*#__PURE__*/React.createElement("p", {
        className: `text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 leading-relaxed`
      }, e.description)));
    })), /*#__PURE__*/React.createElement("div", {
      className: `mt-10 text-center text-xs text-neutral-400`
    }, `Haz clic en cualquier fotografía o espacio para ampliar a pantalla completa con navegación interactiva.`)), /*#__PURE__*/React.createElement(GalleryLightbox, {
      slot: e,
      slots: siteConfig.gallerySlots,
      onClose: () => t(null),
      onNavigate: e => t(e)
    }));
  },
  Plans = () => /*#__PURE__*/React.createElement("section", {
    id: `planes`,
    className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/12 blur-[180px] pointer-events-none rounded-full`
  }), /*#__PURE__*/React.createElement("div", {
    className: `relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 30
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: `-60px`
    },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    },
    className: `text-center max-w-3xl mx-auto mb-20`
  }, /*#__PURE__*/React.createElement("div", {
    className: `inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-5 h-[2px] bg-[#D71920]`
  }), /*#__PURE__*/React.createElement("span", null, `MEMBRESÍAS OFICIALES`), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": `true`,
    className: `text-neutral-700`
  }, `·`), /*#__PURE__*/React.createElement("span", {
    className: `text-neutral-400`
  }, `TARIFAS CLARAS`), /*#__PURE__*/React.createElement("span", {
    className: `w-5 h-[2px] bg-[#D71920]`
  })), /*#__PURE__*/React.createElement("h2", {
    className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`
  }, `ELIGE TU PLAN. `, /*#__PURE__*/React.createElement("span", {
    className: `text-[#D71920]`
  }, `EMPIEZA TU CAMBIO.`)), /*#__PURE__*/React.createElement("p", {
    className: `text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`
  }, `Encuentra la opción que mejor se adapte a tu entrenamiento.`)), /*#__PURE__*/React.createElement("div", {
    className: `grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch`
  }, siteConfig.plans.map((e, t) => {
    let n = e.id === `plan-mensual`;
    return /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 40
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0,
        margin: `-50px`
      },
      transition: {
        duration: 0.7,
        delay: t * 0.2,
        ease: [0.16, 1, 0.3, 1]
      },
      whileHover: {
        scale: 1.025,
        transition: {
          type: `spring`,
          stiffness: 350,
          damping: 25
        }
      },
      className: `group relative rounded-3xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-400 ${n ? `liquid-glass-red shadow-[0_20px_50px_rgba(215,25,32,0.35)]` : `liquid-glass liquid-glass-interactive shadow-xl`}`,
      key: e.id
    }, n && /*#__PURE__*/React.createElement("div", {
      className: `absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#D71920] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-red-950/60 flex items-center gap-1.5 whitespace-nowrap border border-white/20`
    }, /*#__PURE__*/React.createElement(ZapIcon, {
      className: `w-3.5 h-3.5 fill-current`
    }), /*#__PURE__*/React.createElement("span", null, `PLAN RECOMENDADO`)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center justify-between mb-4`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold tracking-wider uppercase text-neutral-300 px-3 py-1 rounded-full liquid-glass-subtle border border-white/10`
    }, e.period), /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase`
    }, `7 STRENGTH`)), /*#__PURE__*/React.createElement("h3", {
      className: `font-display text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#D71920] transition-colors duration-200`
    }, e.name), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-400 mt-1 mb-6`
    }, e.tagline), /*#__PURE__*/React.createElement("div", {
      className: `pt-2 pb-6 border-y border-white/10 mb-6 group-hover:border-white/20 transition-colors`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-baseline gap-2`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-neutral-400 uppercase font-semibold`
    }, `PRECIO`), /*#__PURE__*/React.createElement("span", {
      className: `font-display text-5xl sm:text-6xl text-white tracking-tight font-bold tabular-nums`
    }, e.formattedPrice)), /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-neutral-400 mt-1 block`
    }, `Duración oficial: `, /*#__PURE__*/React.createElement("strong", {
      className: `text-neutral-200`
    }, e.period))), /*#__PURE__*/React.createElement("p", {
      className: `text-sm text-neutral-300 mb-6 leading-relaxed`
    }, e.description), /*#__PURE__*/React.createElement("div", {
      className: `space-y-3.5 mb-8`
    }, e.features.map(e => /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3 text-xs sm:text-sm text-neutral-300`,
      key: e
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-4 h-4 rounded-full bg-[#D71920]/20 text-[#D71920] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`
    }, /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3 h-3 stroke-[3]`
    })), /*#__PURE__*/React.createElement("span", null, e))))), /*#__PURE__*/React.createElement("div", {
      className: `pt-5 border-t border-white/10 mt-auto`
    }, /*#__PURE__*/React.createElement("a", {
      href: e.whatsappUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `relative overflow-hidden w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group text-center cursor-pointer shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${n ? `bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-900/40 hover:shadow-red-900/70 border border-white/20` : `liquid-glass text-white hover:border-[#D71920]`}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`
    }), /*#__PURE__*/React.createElement("span", {
      className: `relative z-10`
    }, e.buttonText), /*#__PURE__*/React.createElement(ArrowRightIcon, {
      className: `relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200`
    })), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 text-center block mt-3`
    }, `Respuesta directa por WhatsApp sin intermediarios`)));
  })), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0
    },
    whileInView: {
      opacity: 1
    },
    viewport: {
      once: !0
    },
    transition: {
      duration: 0.6,
      delay: 0.4
    },
    className: `mt-16 max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-neutral-400`
  }, /*#__PURE__*/React.createElement(ShieldCheckIcon, {
    className: `w-4 h-4 text-[#D71920] shrink-0`
  }), /*#__PURE__*/React.createElement("span", null, `Precios oficiales transparentes. Sin matrícula obligatoria ni cobros ocultos.`)))),
  Schedule = () => /*#__PURE__*/React.createElement("section", {
    id: `horarios`,
    className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`
  }), /*#__PURE__*/React.createElement("div", {
    className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 30
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: !0,
      margin: `-60px`
    },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    },
    className: `text-center max-w-3xl mx-auto mb-20`
  }, /*#__PURE__*/React.createElement("div", {
    className: `inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-5 h-[2px] bg-[#D71920]`
  }), /*#__PURE__*/React.createElement("span", null, `DISPONIBILIDAD Y TURNOS`), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": `true`,
    className: `text-neutral-700`
  }, `·`), /*#__PURE__*/React.createElement("span", {
    className: `text-neutral-400`
  }, `HORARIOS OFICIALES`), /*#__PURE__*/React.createElement("span", {
    className: `w-5 h-[2px] bg-[#D71920]`
  })), /*#__PURE__*/React.createElement("h2", {
    className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`
  }, `ENTRENA A `, /*#__PURE__*/React.createElement("span", {
    className: `text-[#D71920]`
  }, `TU RITMO.`)), /*#__PURE__*/React.createElement("p", {
    className: `text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`
  }, `Organiza tus entrenamientos y encuentra el mejor momento para dar lo máximo.`)), /*#__PURE__*/React.createElement("div", {
    className: `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch`
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: -30
    },
    whileInView: {
      opacity: 1,
      x: 0
    },
    viewport: {
      once: !0,
      margin: `-50px`
    },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    },
    whileHover: {
      scale: 1.02,
      transition: {
        type: `spring`,
        stiffness: 350,
        damping: 25
      }
    },
    className: `group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.2)]`
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-between pb-6 border-b border-white/10`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform`
  }, /*#__PURE__*/React.createElement(CalendarIcon, {
    className: `w-6 h-6`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: `font-display text-3xl sm:text-4xl text-white tracking-wide leading-none`
  }, `LUNES A VIERNES`), /*#__PURE__*/React.createElement("span", {
    className: `text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block`
  }, `Entrenamiento entre semana`))), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40 uppercase tracking-wider`
  }, `2 Turnos`)), /*#__PURE__*/React.createElement("div", {
    className: `py-6 border-b border-white/10`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2`
  }, /*#__PURE__*/React.createElement(SunIcon, {
    className: `w-4 h-4`
  }), /*#__PURE__*/React.createElement("span", null, `TURNO MAÑANA`)), /*#__PURE__*/React.createElement("div", {
    className: `font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`
  }, `7:00 a. m. – 1:00 p. m.`), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-neutral-400 mt-2`
  }, `Ideal para empezar el día con máxima energía antes de tus labores.`)), /*#__PURE__*/React.createElement("div", {
    className: `my-5 py-3 px-4 rounded-xl liquid-glass-subtle border border-white/10 flex items-center gap-3 text-xs text-neutral-300`
  }, /*#__PURE__*/React.createElement(ClockIcon, {
    className: `w-4 h-4 text-[#D71920] shrink-0`
  }), /*#__PURE__*/React.createElement("span", {
    className: `leading-snug`
  }, `Pausa intermedia de mantenimiento y descanso: `, /*#__PURE__*/React.createElement("strong", {
    className: `text-white`
  }, `1:00 p. m. a 3:00 p. m.`))), /*#__PURE__*/React.createElement("div", {
    className: `py-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-400 mb-2`
  }, /*#__PURE__*/React.createElement(MoonIcon, {
    className: `w-4 h-4`
  }), /*#__PURE__*/React.createElement("span", null, `TURNO TARDE`)), /*#__PURE__*/React.createElement("div", {
    className: `font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`
  }, `3:00 p. m. – 9:00 p. m.`), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-neutral-400 mt-2`
  }, `Horario de máxima intensidad para completar tu jornada de pesas.`))), /*#__PURE__*/React.createElement("div", {
    className: `pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between`
  }, /*#__PURE__*/React.createElement("span", null, `Acceso permitido en ambos turnos con tu membresía.`), /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full bg-[#D71920]`
  }))), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      x: 30
    },
    whileInView: {
      opacity: 1,
      x: 0
    },
    viewport: {
      once: !0,
      margin: `-50px`
    },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    },
    whileHover: {
      scale: 1.02,
      transition: {
        type: `spring`,
        stiffness: 350,
        damping: 25
      }
    },
    className: `group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]`
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `pb-8 border-b border-white/10`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-between mb-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform`
  }, /*#__PURE__*/React.createElement(ClockIcon, {
    className: `w-6 h-6`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: `font-display text-3xl sm:text-4xl text-white tracking-wide leading-none`
  }, `SÁBADOS`), /*#__PURE__*/React.createElement("span", {
    className: `text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block`
  }, `Fin de semana activo`))), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold text-amber-400 px-3 py-1 rounded-full liquid-glass-subtle border border-amber-400/40 uppercase tracking-wider`
  }, `Matutino`)), /*#__PURE__*/React.createElement("div", {
    className: `pt-2`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2`
  }, /*#__PURE__*/React.createElement(SunIcon, {
    className: `w-4 h-4`
  }), /*#__PURE__*/React.createElement("span", null, `TURNO CONTINUO`)), /*#__PURE__*/React.createElement("div", {
    className: `font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`
  }, `8:00 a. m. – 1:00 p. m.`), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-neutral-400 mt-2`
  }, `Entrena temprano en sábado y mantén tu constancia sin interrupciones.`))), /*#__PURE__*/React.createElement("div", {
    className: `pt-6`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2.5 mb-3`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-8 h-8 rounded-lg liquid-glass border border-white/15 flex items-center justify-center text-amber-400`
  }, /*#__PURE__*/React.createElement(CircleQuestionMarkIcon, {
    className: `w-4 h-4`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: `font-display text-2xl text-white tracking-wide`
  }, `DOMINGOS`), /*#__PURE__*/React.createElement("span", {
    className: `text-[11px] text-amber-400 font-bold uppercase tracking-wider`
  }, `Horario no confirmado`))), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-neutral-300 leading-relaxed mb-6`
  }, `Para garantizar la exactitud de tu visita y evitar traslados innecesarios, consúltanos directamente por WhatsApp antes de acudir en domingo.`), /*#__PURE__*/React.createElement("a", {
    href: whatsappUrl(`Hola, quisiera consultar si 7 Strength Center abre este domingo.`),
    target: `_blank`,
    rel: `noopener noreferrer`,
    className: `w-full py-3.5 px-5 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/20 hover:border-[#D71920] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md group/btn`
  }, /*#__PURE__*/React.createElement(MessageCircleIcon, {
    className: `w-4 h-4 text-[#D71920] group-hover/btn:text-white transition-colors`
  }), /*#__PURE__*/React.createElement("span", null, `CONSULTAR DISPONIBILIDAD DOMINICAL`), /*#__PURE__*/React.createElement(ArrowRightIcon, {
    className: `w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform`
  })))), /*#__PURE__*/React.createElement("div", {
    className: `pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between`
  }, /*#__PURE__*/React.createElement("span", null, `Respuestas directas por WhatsApp oficial.`), /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full bg-amber-400`
  })))))),
  Community = () => {
    let [e, t] = (0, React.useState)(null),
      n = e => {
        t(t => t === e ? null : e);
      };
    return /*#__PURE__*/React.createElement("section", {
      id: `comunidad`,
      className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`
    }), /*#__PURE__*/React.createElement("div", {
      className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 30
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-2xl`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-5 h-[2px] bg-[#D71920]`
    }), /*#__PURE__*/React.createElement(InstagramIcon, {
      className: `w-3.5 h-3.5`
    }), /*#__PURE__*/React.createElement("span", null, `COMUNIDAD OFICIAL`), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": `true`,
      className: `text-neutral-700`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `text-neutral-400`
    }, `@7strength`)), /*#__PURE__*/React.createElement("h2", {
      className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`
    }, `VIVE LA EXPERIENCIA `, /*#__PURE__*/React.createElement("span", {
      className: `text-[#D71920]`
    }, `7 STRENGTH.`)), /*#__PURE__*/React.createElement("p", {
      className: `text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`
    }, `Entrenamientos, energía y momentos que forman parte de nuestra comunidad.`)), /*#__PURE__*/React.createElement(motion.a, {
      whileHover: {
        scale: 1.03
      },
      whileTap: {
        scale: 0.97
      },
      href: siteConfig.social.instagramUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#D71920] text-neutral-200 hover:text-white transition-all text-xs font-bold tracking-wider uppercase shrink-0 shadow-xl`
    }, /*#__PURE__*/React.createElement(InstagramIcon, {
      className: `w-4 h-4 text-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `SÍGUENOS EN INSTAGRAM`), /*#__PURE__*/React.createElement(ExternalLinkIcon, {
      className: `w-3.5 h-3.5 text-neutral-400`
    }))), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory`
    }, siteConfig.reels.map((t, r) => {
      let i = e === t.id;
      return /*#__PURE__*/React.createElement(motion.div, {
        initial: {
          opacity: 0,
          y: 40
        },
        whileInView: {
          opacity: 1,
          y: 0
        },
        viewport: {
          once: !0,
          margin: `-50px`
        },
        transition: {
          duration: 0.6,
          delay: r * 0.15,
          ease: [0.16, 1, 0.3, 1]
        },
        whileHover: {
          scale: 1.02,
          transition: {
            type: `spring`,
            stiffness: 350,
            damping: 25
          }
        },
        className: `group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive shadow-2xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col snap-center min-w-[280px]`,
        key: t.id
      }, /*#__PURE__*/React.createElement("div", {
        className: `relative w-full aspect-[9/16] max-h-[560px] bg-neutral-950/80 overflow-hidden flex flex-col items-center justify-center`
      }, i ? /*#__PURE__*/React.createElement("iframe", {
        src: `https://www.instagram.com/reel/${t.reelCode}/embed/`,
        className: `w-full h-full border-0`,
        allow: `autoplay; encrypted-media`,
        title: t.title,
        loading: `lazy`
      }) : /*#__PURE__*/React.createElement("div", {
        className: `relative w-full h-full flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-neutral-900/60 via-neutral-950/80 to-black select-none`
      }, /*#__PURE__*/React.createElement("div", {
        className: `absolute inset-0 opacity-20 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none`
      }), /*#__PURE__*/React.createElement("div", {
        className: `relative z-10 flex items-center justify-between`
      }, /*#__PURE__*/React.createElement("span", {
        className: `flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-white/20 text-[11px] font-bold text-neutral-200 uppercase tracking-wider`
      }, /*#__PURE__*/React.createElement(InstagramIcon, {
        className: `w-3.5 h-3.5 text-[#D71920]`
      }), /*#__PURE__*/React.createElement("span", null, `Reel `, r + 1)), /*#__PURE__*/React.createElement("span", {
        className: `text-[11px] font-mono text-neutral-400`
      }, t.reelCode)), /*#__PURE__*/React.createElement("div", {
        className: `relative z-10 flex flex-col items-center text-center my-auto`
      }, /*#__PURE__*/React.createElement(motion.button, {
        whileHover: {
          scale: 1.15
        },
        whileTap: {
          scale: 0.95
        },
        onClick: () => n(t.id),
        className: `relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D71920] hover:bg-[#A80F15] text-white flex items-center justify-center shadow-[0_0_35px_rgba(215,25,32,0.6)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 mb-3 border border-white/20`,
        "aria-label": `Reproducir ${t.title}`
      }, /*#__PURE__*/React.createElement(PlayIcon, {
        className: `w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1`
      })), /*#__PURE__*/React.createElement("p", {
        className: `text-xs uppercase tracking-widest text-neutral-300 font-semibold mt-1`
      }, `Toca para reproducir`)), /*#__PURE__*/React.createElement("div", {
        className: `relative z-10`
      }, /*#__PURE__*/React.createElement("div", {
        className: `flex items-center gap-1.5 text-[10px] text-[#D71920] font-bold uppercase tracking-wider mb-1`
      }, /*#__PURE__*/React.createElement(SparklesIcon, {
        className: `w-3 h-3`
      }), /*#__PURE__*/React.createElement("span", null, `Contenido Oficial`)), /*#__PURE__*/React.createElement("h3", {
        className: `font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-2 group-hover:text-[#D71920] transition-colors`
      }, t.title), /*#__PURE__*/React.createElement("p", {
        className: `text-xs text-neutral-300 line-clamp-2 leading-relaxed`
      }, t.description))), i && /*#__PURE__*/React.createElement("button", {
        onClick: () => n(t.id),
        className: `absolute top-3 right-3 z-30 px-3 py-1 rounded-full liquid-glass text-[11px] text-neutral-300 border border-white/20 hover:text-white cursor-pointer shadow-lg`
      }, `Cerrar reproductor`)), /*#__PURE__*/React.createElement("div", {
        className: `p-4 sm:p-5 liquid-glass-subtle border-t border-white/10 flex items-center justify-between gap-3`
      }, /*#__PURE__*/React.createElement("div", {
        className: `flex flex-col`
      }, /*#__PURE__*/React.createElement("span", {
        className: `text-[10px] text-[#D71920] font-bold uppercase tracking-wider`
      }, `Instagram Oficial`), /*#__PURE__*/React.createElement("span", {
        className: `text-xs font-semibold text-neutral-200`
      }, `@7strength`)), /*#__PURE__*/React.createElement("a", {
        href: t.url,
        target: `_blank`,
        rel: `noopener noreferrer`,
        className: `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/15 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow`
      }, /*#__PURE__*/React.createElement("span", null, `ABRIR EN IG`), /*#__PURE__*/React.createElement(ExternalLinkIcon, {
        className: `w-3.5 h-3.5`
      }))));
    })), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 30
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0
      },
      transition: {
        duration: 0.7,
        delay: 0.3
      },
      className: `mt-16 rounded-3xl liquid-glass p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/15`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-5`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-14 h-14 rounded-2xl liquid-glass border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shrink-0`
    }, /*#__PURE__*/React.createElement(InstagramIcon, {
      className: `w-7 h-7`
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: `font-display text-2xl sm:text-3xl text-white tracking-wide`
    }, `ÚNETE A NUESTRA COMUNIDAD EN REDES`), /*#__PURE__*/React.createElement("p", {
      className: `text-sm text-neutral-400 mt-1`
    }, `Publicaciones, técnicas de levantamiento y novedades exclusivas en nuestro perfil oficial.`))), /*#__PURE__*/React.createElement("div", {
      className: `flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto`
    }, /*#__PURE__*/React.createElement("a", {
      href: siteConfig.social.featuredPostUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `w-full sm:w-auto text-center px-5 py-3.5 rounded-xl liquid-glass-subtle hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-bold tracking-wider uppercase transition-colors`
    }, `VER PUBLICACIÓN DESTACADA`), /*#__PURE__*/React.createElement("a", {
      href: siteConfig.social.instagramUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-[#D71920] hover:bg-[#A80F15] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 border border-white/20`
    }, /*#__PURE__*/React.createElement("span", null, `SEGUIR @7STRENGTH`), /*#__PURE__*/React.createElement(ArrowRightIcon, {
      className: `w-4 h-4`
    })))), /*#__PURE__*/React.createElement("div", {
      className: `mt-8 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center`
    }, /*#__PURE__*/React.createElement(ShieldCheckIcon, {
      className: `w-4 h-4 text-[#D71920] shrink-0`
    }), /*#__PURE__*/React.createElement("span", null, `Integración directa con los tres reels verificados de 7 Strength Center en Instagram`))));
  },
  Contact = () => {
    let [e, t] = (0, React.useState)(null),
      n = (e, n) => {
        navigator.clipboard.writeText(e), t(n), setTimeout(() => t(null), 2500);
      };
    return /*#__PURE__*/React.createElement("section", {
      id: `contacto`,
      className: `py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`
    }, /*#__PURE__*/React.createElement("div", {
      className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        y: 30
      },
      whileInView: {
        opacity: 1,
        y: 0
      },
      viewport: {
        once: !0,
        margin: `-60px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `mb-16`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-5 h-[2px] bg-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `ENCUÉNTRANOS EN CAJAMARCA`), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": `true`,
      className: `text-neutral-700`
    }, `·`), /*#__PURE__*/React.createElement("span", {
      className: `text-neutral-400`
    }, `UBICACIÓN Y CONTACTO`)), /*#__PURE__*/React.createElement("h2", {
      className: `font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`
    }, `ESTAMOS LISTOS `, /*#__PURE__*/React.createElement("span", {
      className: `text-[#D71920]`
    }, `PARA RECIBIRTE.`)), /*#__PURE__*/React.createElement("p", {
      className: `text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl`
    }, `Visítanos en nuestras instalaciones o escríbenos directamente por WhatsApp para coordinar tu primer día de entrenamiento.`)), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        x: -30
      },
      whileInView: {
        opacity: 1,
        x: 0
      },
      viewport: {
        once: !0,
        margin: `-50px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `lg:col-span-5 flex flex-col justify-between rounded-3xl liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/25 transition-all duration-300`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-4 pb-6 border-b border-white/10`
    }, /*#__PURE__*/React.createElement("img", {
      src: siteConfig.logoPath,
      alt: `Logo 7 Strength Center`,
      className: `w-14 h-14 object-contain rounded-xl liquid-glass p-1.5 border border-white/20 shadow`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: `font-display text-2xl sm:text-3xl text-white tracking-wide leading-none`
    }, siteConfig.name), /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase mt-1 block`
    }, `Cajamarca · Perú`))), /*#__PURE__*/React.createElement("div", {
      className: `space-y-6 my-8`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-4`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`
    }, /*#__PURE__*/React.createElement(MapPinIcon, {
      className: `w-5 h-5`
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex-1`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`
    }, `Dirección Oficial`), /*#__PURE__*/React.createElement("p", {
      className: `text-sm font-semibold text-white mt-0.5`
    }, siteConfig.address), /*#__PURE__*/React.createElement("button", {
      onClick: () => n(siteConfig.address, `address`),
      className: `mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer`
    }, e === `address` ? /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 text-emerald-400`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-emerald-400 font-bold`
    }, `Copiado al portapapeles`)) : /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(CopyIcon, {
      className: `w-3.5 h-3.5`
    }), /*#__PURE__*/React.createElement("span", null, `Copiar dirección`))))), /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-4`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5`
    }, /*#__PURE__*/React.createElement(PhoneIcon, {
      className: `w-5 h-5`
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex-1`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`
    }, `WhatsApp Oficial`), /*#__PURE__*/React.createElement("a", {
      href: whatsappUrl(),
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `text-base font-bold text-white hover:text-emerald-400 transition-colors inline-block mt-0.5`
    }, siteConfig.phone.display), /*#__PURE__*/React.createElement("button", {
      onClick: () => n(siteConfig.phone.display, `phone`),
      className: `mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer ml-3`
    }, e === `phone` ? /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 text-emerald-400`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-emerald-400 font-bold`
    }, `Copiado`)) : /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(CopyIcon, {
      className: `w-3.5 h-3.5`
    }), /*#__PURE__*/React.createElement("span", null, `Copiar`))))), /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-4`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`
    }, /*#__PURE__*/React.createElement(ClockIcon, {
      className: `w-5 h-5`
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex-1`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`
    }, `Horarios Resumidos`), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-300 mt-1`
    }, /*#__PURE__*/React.createElement("strong", null, `L-V:`), ` 7:00 am – 1:00 pm / 3:00 pm – 9:00 pm`), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-300 mt-0.5`
    }, /*#__PURE__*/React.createElement("strong", null, `Sábados:`), ` 8:00 am – 1:00 pm`))), /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-4`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`
    }, /*#__PURE__*/React.createElement(InstagramIcon, {
      className: `w-5 h-5`
    })), /*#__PURE__*/React.createElement("div", {
      className: `flex-1`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`
    }, `Instagram`), /*#__PURE__*/React.createElement("a", {
      href: siteConfig.social.instagramUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `text-sm font-semibold text-white hover:text-[#D71920] transition-colors mt-0.5 inline-block`
    }, siteConfig.social.instagramHandle))))), /*#__PURE__*/React.createElement("div", {
      className: `pt-6 border-t border-white/10`
    }, /*#__PURE__*/React.createElement("a", {
      href: whatsappUrl(),
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `group relative overflow-hidden w-full py-4 px-6 rounded-2xl bg-[#D71920] hover:bg-[#A80F15] text-white font-heading font-bold text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 text-center border border-white/20`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`
    }), /*#__PURE__*/React.createElement("span", {
      className: `relative z-10`
    }, `CONTACTAR POR WHATSAPP`)))), /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        x: 30
      },
      whileInView: {
        opacity: 1,
        x: 0
      },
      viewport: {
        once: !0,
        margin: `-50px`
      },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `lg:col-span-7 flex flex-col rounded-3xl overflow-hidden liquid-glass border border-white/15 shadow-2xl`
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-4 sm:p-5 liquid-glass-subtle border-b border-white/10 flex items-center justify-between`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2.5`
    }, /*#__PURE__*/React.createElement(MapPinIcon, {
      className: `w-4 h-4 text-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold text-white tracking-wider uppercase`
    }, `Ubicación en Google Maps`)), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400`
    }, `Los Leones 164, Cajamarca`)), /*#__PURE__*/React.createElement("div", {
      className: `relative w-full flex-1 min-h-[350px] sm:min-h-[420px] bg-neutral-950`
    }, /*#__PURE__*/React.createElement("iframe", {
      title: `Mapa oficial de ubicación 7 Strength Center en Cajamarca`,
      width: `100%`,
      height: `100%`,
      className: `w-full h-full border-0 filter contrast-125 brightness-90 grayscale-[0.2]`,
      loading: `lazy`,
      allowFullScreen: !0,
      referrerPolicy: `no-referrer-when-downgrade`,
      src: `https://maps.google.com/maps?q=Los+Leones+164,+Cajamarca+06002,+Peru&t=&z=16&ie=UTF8&iwloc=&output=embed`
    })), /*#__PURE__*/React.createElement("div", {
      className: `p-6 sm:p-8 liquid-glass-subtle border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: `font-display text-2xl text-white tracking-wide`
    }, `¿PLANEAS VISITARNOS?`), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-400 mt-0.5`
    }, `Abre la ruta directa en tu aplicación de Google Maps y llega sin complicaciones.`)), /*#__PURE__*/React.createElement("a", {
      href: siteConfig.googleMapsUrl,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-heading font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shrink-0 shadow-lg transform hover:-translate-y-0.5 active:scale-95`
    }, /*#__PURE__*/React.createElement(NavigationIcon, {
      className: `w-4 h-4 text-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", null, `CÓMO LLEGAR`)))))));
  },
  Footer = () => /*#__PURE__*/React.createElement("footer", {
    className: `bg-[#070708] border-t border-neutral-900 text-neutral-400 text-sm`
  }, /*#__PURE__*/React.createElement("div", {
    className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`
  }, /*#__PURE__*/React.createElement("div", {
    className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-900`
  }, /*#__PURE__*/React.createElement("div", {
    className: `lg:col-span-5 flex flex-col items-start`
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-3 mb-4`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 rounded-lg bg-neutral-900 p-1 border border-neutral-800`
  }, /*#__PURE__*/React.createElement("img", {
    src: siteConfig.logoPath,
    alt: `Logo oficial 7 Strength Center`,
    className: `w-full h-full object-contain`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `font-display text-2xl text-white tracking-wider block font-bold leading-none`
  }, siteConfig.name), /*#__PURE__*/React.createElement("span", {
    className: `text-xs text-[#D71920] font-semibold tracking-widest uppercase mt-0.5 block`
  }, `Cajamarca · Perú`))), /*#__PURE__*/React.createElement("p", {
    className: `text-neutral-400 text-base font-medium italic mt-2`
  }, `"Fuerza, disciplina y superación."`), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-neutral-300 mt-3 max-w-sm leading-relaxed`
  }, `Espacio de entrenamiento dedicado a quienes buscan mejorar su condición física, romper sus marcas y construir una versión más fuerte de sí mismos.`)), /*#__PURE__*/React.createElement("div", {
    className: `lg:col-span-3`
  }, /*#__PURE__*/React.createElement("h4", {
    className: `font-display text-lg text-white tracking-wider uppercase mb-4`
  }, `Navegación`), /*#__PURE__*/React.createElement("ul", {
    className: `space-y-2 text-xs uppercase tracking-wider`
  }, [{
    label: `Inicio`,
    href: `#inicio`
  }, {
    label: `Nosotros`,
    href: `#nosotros`
  }, {
    label: `Instalaciones`,
    href: `#instalaciones`
  }, {
    label: `Planes`,
    href: `#planes`
  }, {
    label: `Horarios`,
    href: `#horarios`
  }, {
    label: `Comunidad`,
    href: `#comunidad`
  }, {
    label: `Contacto`,
    href: `#contacto`
  }].map(e => /*#__PURE__*/React.createElement("li", {
    key: e.href
  }, /*#__PURE__*/React.createElement("a", {
    href: e.href,
    className: `hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform`
  }, e.label))))), /*#__PURE__*/React.createElement("div", {
    className: `lg:col-span-4`
  }, /*#__PURE__*/React.createElement("h4", {
    className: `font-display text-lg text-white tracking-wider uppercase mb-4`
  }, `Información Oficial`), /*#__PURE__*/React.createElement("ul", {
    className: `space-y-3 text-xs text-neutral-400`
  }, /*#__PURE__*/React.createElement("li", {
    className: `flex items-start gap-2.5`
  }, /*#__PURE__*/React.createElement(MapPinIcon, {
    className: `w-4 h-4 text-[#D71920] shrink-0 mt-0.5`
  }), /*#__PURE__*/React.createElement("span", null, siteConfig.address)), /*#__PURE__*/React.createElement("li", {
    className: `flex items-center gap-2.5`
  }, /*#__PURE__*/React.createElement(PhoneIcon, {
    className: `w-4 h-4 text-emerald-400 shrink-0`
  }), /*#__PURE__*/React.createElement("a", {
    href: whatsappUrl(),
    target: `_blank`,
    rel: `noopener noreferrer`,
    className: `hover:text-white transition-colors font-medium text-neutral-300`
  }, `WhatsApp: `, siteConfig.phone.display)), /*#__PURE__*/React.createElement("li", {
    className: `flex items-center gap-2.5`
  }, /*#__PURE__*/React.createElement(InstagramIcon, {
    className: `w-4 h-4 text-[#D71920] shrink-0`
  }), /*#__PURE__*/React.createElement("a", {
    href: siteConfig.social.instagramUrl,
    target: `_blank`,
    rel: `noopener noreferrer`,
    className: `hover:text-white transition-colors font-medium text-neutral-300`
  }, `Instagram: `, siteConfig.social.instagramHandle))), /*#__PURE__*/React.createElement("div", {
    className: `mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2`
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full bg-[#D71920]`
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-[11px] text-neutral-300`
  }, `Atención presencial en Cajamarca`)))), /*#__PURE__*/React.createElement("div", {
    className: `pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300`
  }, /*#__PURE__*/React.createElement("div", null, `© 2026 7 Strength Center. Todos los derechos reservados.`), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      window.scrollTo({
        top: 0,
        behavior: `smooth`
      });
    },
    className: `flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800`,
    "aria-label": `Volver al inicio de la página`
  }, /*#__PURE__*/React.createElement("span", null, `Subir al inicio`), /*#__PURE__*/React.createElement(ArrowUpIcon, {
    className: `w-3.5 h-3.5 text-[#D71920]`
  }))))),
  WhatsAppButton = () => {
    let [e, t] = (0, React.useState)(!1),
      n = `https://wa.me/${siteConfig.phone.raw}?text=${encodeURIComponent(siteConfig.phone.whatsappMessageGeneral)}`;
    return /*#__PURE__*/React.createElement("div", {
      className: `fixed bottom-6 right-6 z-40 flex items-center gap-3`,
      onMouseEnter: () => t(!0),
      onMouseLeave: () => t(!1)
    }, /*#__PURE__*/React.createElement("div", {
      className: `hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141416] border border-neutral-700 text-xs font-semibold text-white shadow-xl transition-all duration-200 ${e ? `opacity-100 translate-x-0` : `opacity-90 translate-x-1 pointer-events-none`}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `w-2 h-2 rounded-full bg-emerald-500 animate-pulse`
    }), /*#__PURE__*/React.createElement("span", null, `¿Tienes alguna consulta?`)), /*#__PURE__*/React.createElement("a", {
      href: n,
      target: `_blank`,
      rel: `noopener noreferrer`,
      className: `relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-transform duration-200 transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50`,
      "aria-label": `Contactar a 7 Strength Center por WhatsApp`
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none`
    }), /*#__PURE__*/React.createElement(MessageCircleIcon, {
      className: `w-7 h-7 sm:w-8 sm:h-8 fill-current text-white relative z-10`
    })));
  },
  AccessibilityPanel = () => {
    let {
      isOpen: e,
      setIsOpen: t,
      textSize: n,
      setTextSize: r,
      highContrast: i,
      toggleHighContrast: a,
      grayscale: o,
      toggleGrayscale: s,
      dyslexiaFont: c,
      toggleDyslexiaFont: l,
      reducedMotion: u,
      toggleReducedMotion: d,
      highlightLinks: f,
      toggleHighlightLinks: p,
      bigCursor: m,
      toggleBigCursor: h,
      isSpeaking: g,
      speakOverview: _,
      stopSpeaking: v,
      resetAll: y
    } = useAccessibility();
    return e ? /*#__PURE__*/React.createElement(AnimatePresence, null, /*#__PURE__*/React.createElement("div", {
      className: `fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md`,
      role: `dialog`,
      "aria-modal": `true`,
      "aria-labelledby": `a11y-modal-title`
    }, /*#__PURE__*/React.createElement(motion.div, {
      initial: {
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      },
      className: `relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass p-6 sm:p-8 text-neutral-200 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)]`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start justify-between pb-5 border-b border-white/10 mb-6`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-2xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]`
    }, /*#__PURE__*/React.createElement(SparklesIcon, {
      className: `w-5 h-5 text-[#D71920]`
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      id: `a11y-modal-title`,
      className: `font-display text-2xl sm:text-3xl text-white tracking-wide`
    }, `CENTRO DE ACCESIBILIDAD`), /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2 text-xs text-neutral-400 mt-0.5`
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-emerald-400 font-semibold`
    }, `WCAG 2.1 AA`), /*#__PURE__*/React.createElement("span", null, `·`), /*#__PURE__*/React.createElement("span", null, `Inclusión y confort visual universal`)))), /*#__PURE__*/React.createElement("button", {
      onClick: () => t(!1),
      className: `p-2.5 rounded-full bg-white/5 hover:bg-[#D71920] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`,
      "aria-label": `Cerrar panel de accesibilidad`
    }, /*#__PURE__*/React.createElement(XIcon, {
      className: `w-5 h-5`
    }))), /*#__PURE__*/React.createElement("div", {
      className: `p-4 rounded-2xl liquid-glass-subtle border border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#D71920]`
    }, g ? /*#__PURE__*/React.createElement(Volume2Icon, {
      className: `w-5 h-5 animate-pulse text-[#D71920]`
    }) : /*#__PURE__*/React.createElement(Volume2Icon, {
      className: `w-5 h-5`
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: `text-sm font-bold text-white leading-none`
    }, `Lector de Voz del Gimnasio`), /*#__PURE__*/React.createElement("p", {
      className: `text-xs text-neutral-400 mt-1`
    }, `Escucha la narración hablada de planes, horarios y ubicación en español.`))), /*#__PURE__*/React.createElement("button", {
      onClick: g ? v : _,
      className: `px-4 py-2.5 rounded-xl font-heading font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-md ${g ? `bg-amber-500 hover:bg-amber-600 text-black` : `bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-950/50`}`
    }, g ? /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(VolumeXIcon, {
      className: `w-4 h-4`
    }), /*#__PURE__*/React.createElement("span", null, `Pausar Lectura`)) : /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement(Volume2Icon, {
      className: `w-4 h-4`
    }), /*#__PURE__*/React.createElement("span", null, `Escuchar Resumen`)))), /*#__PURE__*/React.createElement("div", {
      className: `space-y-6`
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-4 rounded-2xl bg-white/[0.03] border border-white/10`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center justify-between mb-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-center gap-2`
    }, /*#__PURE__*/React.createElement(TypeIcon, {
      className: `w-4 h-4 text-[#D71920]`
    }), /*#__PURE__*/React.createElement("span", {
      className: `text-sm font-bold text-white`
    }, `Tamaño de Texto`)), /*#__PURE__*/React.createElement("span", {
      className: `text-xs text-neutral-400`
    }, n === `normal` ? `Normal (100%)` : n === `large` ? `Grande (115%)` : `Extra Grande (130%)`)), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-3 gap-2`
    }, [`normal`, `large`, `xlarge`].map(e => /*#__PURE__*/React.createElement("button", {
      onClick: () => r(e),
      className: `py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${n === e ? `bg-[#D71920] text-white border-[#D71920] shadow-lg shadow-red-950/40` : `bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10`}`,
      key: e
    }, e === `normal` && `Normal A`, e === `large` && `Grande A+`, e === `xlarge` && `Muy Grande A++`)))), /*#__PURE__*/React.createElement("div", {
      className: `grid grid-cols-1 sm:grid-cols-2 gap-3`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: a,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${i ? `bg-neutral-900 border-amber-400 text-amber-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(SunIcon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Alto Contraste`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Bordes nítidos y contraste reforzado WCAG AAA.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${i ? `bg-amber-400 border-amber-400 text-black` : `border-neutral-600`}`
    }, i && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: l,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${c ? `bg-neutral-900 border-emerald-400 text-emerald-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(BookOpenIcon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Fuente para Dislexia`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Espaciado optimizado para facilitar la lectura fluida.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${c ? `bg-emerald-400 border-emerald-400 text-black` : `border-neutral-600`}`
    }, c && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: s,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${o ? `bg-neutral-900 border-blue-400 text-blue-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(EyeIcon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Modo Monocromático`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Escala de grises para personas con sensibilidad al color.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${o ? `bg-blue-400 border-blue-400 text-black` : `border-neutral-600`}`
    }, o && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: d,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${u ? `bg-neutral-900 border-purple-400 text-purple-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(ActivityIcon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Reducir Movimiento`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Pausa animaciones para evitar fatiga vestibular.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${u ? `bg-purple-400 border-purple-400 text-black` : `border-neutral-600`}`
    }, u && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: p,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${f ? `bg-neutral-900 border-yellow-400 text-yellow-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(Link2Icon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Resaltar Enlaces`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Subraya todos los botones y enlaces interactivos.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${f ? `bg-yellow-400 border-yellow-400 text-black` : `border-neutral-600`}`
    }, f && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: h,
      className: `p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${m ? `bg-neutral-900 border-pink-400 text-pink-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex items-start gap-3`
    }, /*#__PURE__*/React.createElement(MousePointerIcon, {
      className: `w-5 h-5 text-[#D71920] shrink-0 mt-0.5`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-xs font-bold block text-white`
    }, `Cursor Agrandado`), /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] text-neutral-400 mt-0.5 block`
    }, `Puntero ampliado de alto contraste visual.`))), /*#__PURE__*/React.createElement("div", {
      className: `w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${m ? `bg-pink-400 border-pink-400 text-black` : `border-neutral-600`}`
    }, m && /*#__PURE__*/React.createElement(CheckIcon, {
      className: `w-3.5 h-3.5 stroke-[3]`
    }))))), /*#__PURE__*/React.createElement("div", {
      className: `mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: y,
      className: `inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer`
    }, /*#__PURE__*/React.createElement(RotateCcwIcon, {
      className: `w-3.5 h-3.5`
    }), /*#__PURE__*/React.createElement("span", null, `Restablecer Todo`)), /*#__PURE__*/React.createElement("button", {
      onClick: () => t(!1),
      className: `px-6 py-2.5 rounded-xl bg-white text-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg`
    }, `Guardar y Cerrar`)), /*#__PURE__*/React.createElement("div", {
      className: `mt-4 text-center text-[11px] text-neutral-500`
    }, `Atajo rápido de teclado: Pulsa `, /*#__PURE__*/React.createElement("kbd", {
      className: `px-1.5 py-0.5 rounded bg-white/10 text-white font-mono`
    }, `Alt + A`), ` para abrir o cerrar este panel.`)))) : null;
  },
  AccessibilityWidget = () => {
    let {
      isOpen: e,
      setIsOpen: t,
      highContrast: n
    } = useAccessibility();
    return /*#__PURE__*/React.createElement(jsxRuntime.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: `#main-content`,
      className: `sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#D71920] text-white font-bold rounded-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white`
    }, `Saltar al contenido principal`), /*#__PURE__*/React.createElement("div", {
      className: `fixed bottom-6 left-6 z-40 flex items-center gap-2`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => t(!0),
      className: `group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D71920]/60 ${n ? `bg-amber-400 text-black border-2 border-white` : `liquid-glass text-white border border-white/20 hover:border-[#D71920]`}`,
      "aria-label": `Abrir opciones de accesibilidad universal (Alt + A)`,
      "aria-haspopup": `dialog`,
      "aria-expanded": e
    }, /*#__PURE__*/React.createElement("span", {
      className: `absolute inset-0 rounded-full bg-[#D71920]/20 animate-pulse pointer-events-none`
    }), /*#__PURE__*/React.createElement(AccessibilityIcon, {
      className: `w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-[#D71920] transition-colors relative z-10`
    }), /*#__PURE__*/React.createElement("span", {
      className: `hidden sm:block absolute left-full ml-3 px-3 py-1.5 rounded-xl liquid-glass text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10`
    }, `Accesibilidad (Alt + A)`))), /*#__PURE__*/React.createElement(AccessibilityPanel, null));
  };
function App() {
  let [e, t] = (0, React.useState)(`inicio`);
  return (0, React.useEffect)(() => {
    let e = [`inicio`, `nosotros`, `instalaciones`, `planes`, `horarios`, `comunidad`, `contacto`],
      n = () => {
        let n = window.scrollY + 200;
        for (let r of e) {
          let e = document.getElementById(r);
          if (e) {
            let i = e.offsetTop,
              a = e.offsetHeight;
            if (n >= i && n < i + a) {
              t(r);
              break;
            }
          }
        }
      };
    return window.addEventListener(`scroll`, n, {
      passive: !0
    }), n(), () => window.removeEventListener(`scroll`, n);
  }, []), /*#__PURE__*/React.createElement(AccessibilityProvider, null, /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen bg-[#0B0B0C] text-[#F2F2F2] flex flex-col font-sans selection:bg-[#D71920] selection:text-white relative`
  }, /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Header, {
    activeSection: e
  }), /*#__PURE__*/React.createElement("main", {
    id: `main-content`,
    className: `flex-1`,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement(Plans, null), /*#__PURE__*/React.createElement(Schedule, null), /*#__PURE__*/React.createElement(Community, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(WhatsAppButton, null), /*#__PURE__*/React.createElement(AccessibilityWidget, null)));
}
(0, ReactDOM.createRoot)(document.getElementById(`root`)).render(/*#__PURE__*/React.createElement(App, null));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZCIsInVzZVNjcm9sbCIsIndkIiwidXNlU3ByaW5nIiwieiIsImpzeFJ1bnRpbWUiLCJKIiwibW90aW9uIiwiUyIsIlJlYWN0IiwiUGQiLCJBY2Nlc3NpYmlsaXR5SWNvbiIsIkxkIiwiQXJyb3dVcFJpZ2h0SWNvbiIsImdmIiwiWEljb24iLCJlZiIsIk1lbnVJY29uIiwiUmMiLCJBbmltYXRlUHJlc2VuY2UiLCJJZCIsIkFycm93UmlnaHRJY29uIiwicWQiLCJEdW1iYmVsbEljb24iLCJmZiIsIlRhcmdldEljb24iLCJtZiIsIlVzZXJzSWNvbiIsImxmIiwiU2hpZWxkQ2hlY2tJY29uIiwiR2QiLCJDbG9ja0ljb24iLCJIZCIsIkNoZXZyb25MZWZ0SWNvbiIsIlVkIiwiQ2hldnJvblJpZ2h0SWNvbiIsInZmIiwiWm9vbUluSWNvbiIsIiRkIiwiTWF4aW1pemUySWNvbiIsIl9mIiwiWmFwSWNvbiIsIlZkIiwiQ2hlY2tJY29uIiwiQmQiLCJDYWxlbmRhckljb24iLCJkZiIsIlN1bkljb24iLCJuZiIsIk1vb25JY29uIiwiV2QiLCJDaXJjbGVRdWVzdGlvbk1hcmtJY29uIiwidGYiLCJNZXNzYWdlQ2lyY2xlSWNvbiIsIlhkIiwiSW5zdGFncmFtSWNvbiIsIkpkIiwiRXh0ZXJuYWxMaW5rSWNvbiIsInNmIiwiUGxheUljb24iLCJ1ZiIsIlNwYXJrbGVzSWNvbiIsIlFkIiwiTWFwUGluSWNvbiIsIktkIiwiQ29weUljb24iLCJvZiIsIlBob25lSWNvbiIsImFmIiwiTmF2aWdhdGlvbkljb24iLCJSZCIsIkFycm93VXBJY29uIiwiWCIsIlZvbHVtZTJJY29uIiwiaGYiLCJWb2x1bWVYSWNvbiIsInBmIiwiVHlwZUljb24iLCJ6ZCIsIkJvb2tPcGVuSWNvbiIsIllkIiwiRXllSWNvbiIsIkZkIiwiQWN0aXZpdHlJY29uIiwiWmQiLCJMaW5rMkljb24iLCJyZiIsIk1vdXNlUG9pbnRlckljb24iLCJjZiIsIlJvdGF0ZUNjd0ljb24iLCJUZCIsIlJlYWN0RE9NIiwic2l0ZUNvbmZpZyIsIlNjcm9sbFByb2dyZXNzIiwic2Nyb2xsWVByb2dyZXNzIiwiZSIsInQiLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicmVzdERlbHRhIiwiY3JlYXRlRWxlbWVudCIsImRpdiIsImNsYXNzTmFtZSIsInN0eWxlIiwic2NhbGVYIiwid2hhdHNhcHBVcmwiLCJwaG9uZSIsIndoYXRzYXBwTWVzc2FnZUdlbmVyYWwiLCJyYXciLCJlbmNvZGVVUklDb21wb25lbnQiLCJnZXRPcGVuaW5nU3RhdHVzIiwiRGF0ZSIsImdldFRpbWUiLCJnZXRUaW1lem9uZU9mZnNldCIsIm4iLCJyIiwiZ2V0RGF5IiwiaSIsImdldEhvdXJzIiwiYSIsImdldE1pbnV0ZXMiLCJvIiwiaXNPcGVuIiwiaXNQYXVzZWQiLCJzdGF0dXNMYWJlbCIsIm5leHRFdmVudERlc2NyaXB0aW9uIiwiYmFkZ2VDb2xvckNsYXNzIiwiQWNjZXNzaWJpbGl0eUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiQWNjZXNzaWJpbGl0eVByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VTdGF0ZSIsInMiLCJjIiwibCIsInUiLCJkIiwiZiIsInAiLCJtIiwiaCIsImciLCJfIiwidiIsInVzZUVmZmVjdCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0UHJvcGVydHkiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJhbHRLZXkiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwieSIsImIiLCJ4IiwiZWUiLCJ0ZSIsIkMiLCJuZSIsInciLCJyZSIsInVzZUNhbGxiYWNrIiwic3BlZWNoU3ludGhlc2lzIiwiY2FuY2VsIiwiaWUiLCJhbGVydCIsIlNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSIsImxhbmciLCJyYXRlIiwiZ2V0Vm9pY2VzIiwiZmluZCIsInN0YXJ0c1dpdGgiLCJ2b2ljZSIsIm9uZW5kIiwib25lcnJvciIsInNwZWFrIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInRleHRTaXplIiwiaGlnaENvbnRyYXN0IiwiZ3JheXNjYWxlIiwiZHlzbGV4aWFGb250IiwicmVkdWNlZE1vdGlvbiIsImhpZ2hsaWdodExpbmtzIiwiYmlnQ3Vyc29yIiwiaXNTcGVha2luZyIsInNldFRleHRTaXplIiwidG9nZ2xlSGlnaENvbnRyYXN0IiwidG9nZ2xlR3JheXNjYWxlIiwidG9nZ2xlRHlzbGV4aWFGb250IiwidG9nZ2xlUmVkdWNlZE1vdGlvbiIsInRvZ2dsZUhpZ2hsaWdodExpbmtzIiwidG9nZ2xlQmlnQ3Vyc29yIiwic2V0SXNPcGVuIiwicmVzZXRBbGwiLCJzcGVha092ZXJ2aWV3Iiwic3RvcFNwZWFraW5nIiwidXNlQWNjZXNzaWJpbGl0eSIsInVzZUNvbnRleHQiLCJFcnJvciIsIkhlYWRlciIsImFjdGl2ZVNlY3Rpb24iLCJzY3JvbGxZIiwicGFzc2l2ZSIsImxhYmVsIiwiaHJlZiIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJoZWFkZXIiLCJpbml0aWFsIiwib3BhY2l0eSIsImFuaW1hdGUiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJlYXNlIiwib25DbGljayIsInNyYyIsImxvZ29QYXRoIiwiYWx0IiwibG9hZGluZyIsIm1hcCIsInN1YnN0cmluZyIsInNwYW4iLCJsYXlvdXRJZCIsInR5cGUiLCJ0aXRsZSIsInRhcmdldCIsInJlbCIsImhlaWdodCIsImV4aXQiLCJIZXJvIiwiaWQiLCJpbWciLCJzY2FsZSIsImRlbGF5IiwiaDEiLCJ3aWR0aCIsImJ1dHRvbiIsIndoaWxlSG92ZXIiLCJ3aGlsZVRhcCIsInJlcGVhdCIsIkFib3V0IiwidXNlTWVtbyIsImljb24iLCJ0ZXh0IiwibnVtYmVyIiwid2hpbGVJblZpZXciLCJ2aWV3cG9ydCIsIm9uY2UiLCJtYXJnaW4iLCJqc3giLCJHYWxsZXJ5TGlnaHRib3giLCJzbG90Iiwic2xvdHMiLCJvbkNsb3NlIiwib25OYXZpZ2F0ZSIsImZpbmRJbmRleCIsImxlbmd0aCIsInJvbGUiLCJjYXRlZ29yeSIsInNhbXBsZUltYWdlIiwicGxhY2Vob2xkZXJUZXh0IiwiZGVzY3JpcHRpb24iLCJHYWxsZXJ5IiwiZ2FsbGVyeVNsb3RzIiwiYXNwZWN0Iiwib25LZXlEb3duIiwidGFiSW5kZXgiLCJQbGFucyIsInBsYW5zIiwicGVyaW9kIiwibmFtZSIsInRhZ2xpbmUiLCJmb3JtYXR0ZWRQcmljZSIsImZlYXR1cmVzIiwiYnV0dG9uVGV4dCIsIlNjaGVkdWxlIiwiQ29tbXVuaXR5Iiwic29jaWFsIiwiaW5zdGFncmFtVXJsIiwicmVlbHMiLCJyZWVsQ29kZSIsImFsbG93IiwidXJsIiwiZmVhdHVyZWRQb3N0VXJsIiwiQ29udGFjdCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInNldFRpbWVvdXQiLCJhZGRyZXNzIiwiRnJhZ21lbnQiLCJkaXNwbGF5IiwiaW5zdGFncmFtSGFuZGxlIiwiYWxsb3dGdWxsU2NyZWVuIiwicmVmZXJyZXJQb2xpY3kiLCJnb29nbGVNYXBzVXJsIiwiRm9vdGVyIiwiV2hhdHNBcHBCdXR0b24iLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJBY2Nlc3NpYmlsaXR5UGFuZWwiLCJBY2Nlc3NpYmlsaXR5V2lkZ2V0IiwiQXBwIiwiZ2V0RWxlbWVudEJ5SWQiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJjcmVhdGVSb290IiwicmVuZGVyIl0sInNvdXJjZXMiOlsiQXBwLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDw7NkaWdvIHJlY3VwZXJhZG8gZGUgbGEgdmVyc2nDs24gcMO6YmxpY2EgeSByZW9yZ2FuaXphZG8gcGFyYSBlZGljacOzbiBsb2NhbC5cbmltcG9ydCB7XG4gIGdkIGFzIHVzZVNjcm9sbCxcbiAgd2QgYXMgdXNlU3ByaW5nLFxuICB6IGFzIGpzeFJ1bnRpbWUsXG4gIEogYXMgbW90aW9uLFxuICBTIGFzIFJlYWN0LFxuICBQZCBhcyBBY2Nlc3NpYmlsaXR5SWNvbixcbiAgTGQgYXMgQXJyb3dVcFJpZ2h0SWNvbixcbiAgZ2YgYXMgWEljb24sXG4gIGVmIGFzIE1lbnVJY29uLFxuICBSYyBhcyBBbmltYXRlUHJlc2VuY2UsXG4gIElkIGFzIEFycm93UmlnaHRJY29uLFxuICBxZCBhcyBEdW1iYmVsbEljb24sXG4gIGZmIGFzIFRhcmdldEljb24sXG4gIG1mIGFzIFVzZXJzSWNvbixcbiAgbGYgYXMgU2hpZWxkQ2hlY2tJY29uLFxuICBHZCBhcyBDbG9ja0ljb24sXG4gIEhkIGFzIENoZXZyb25MZWZ0SWNvbixcbiAgVWQgYXMgQ2hldnJvblJpZ2h0SWNvbixcbiAgdmYgYXMgWm9vbUluSWNvbixcbiAgJGQgYXMgTWF4aW1pemUySWNvbixcbiAgX2YgYXMgWmFwSWNvbixcbiAgVmQgYXMgQ2hlY2tJY29uLFxuICBCZCBhcyBDYWxlbmRhckljb24sXG4gIGRmIGFzIFN1bkljb24sXG4gIG5mIGFzIE1vb25JY29uLFxuICBXZCBhcyBDaXJjbGVRdWVzdGlvbk1hcmtJY29uLFxuICB0ZiBhcyBNZXNzYWdlQ2lyY2xlSWNvbixcbiAgWGQgYXMgSW5zdGFncmFtSWNvbixcbiAgSmQgYXMgRXh0ZXJuYWxMaW5rSWNvbixcbiAgc2YgYXMgUGxheUljb24sXG4gIHVmIGFzIFNwYXJrbGVzSWNvbixcbiAgUWQgYXMgTWFwUGluSWNvbixcbiAgS2QgYXMgQ29weUljb24sXG4gIG9mIGFzIFBob25lSWNvbixcbiAgYWYgYXMgTmF2aWdhdGlvbkljb24sXG4gIFJkIGFzIEFycm93VXBJY29uLFxuICBYIGFzIFZvbHVtZTJJY29uLFxuICBoZiBhcyBWb2x1bWVYSWNvbixcbiAgcGYgYXMgVHlwZUljb24sXG4gIHpkIGFzIEJvb2tPcGVuSWNvbixcbiAgWWQgYXMgRXllSWNvbixcbiAgRmQgYXMgQWN0aXZpdHlJY29uLFxuICBaZCBhcyBMaW5rMkljb24sXG4gIHJmIGFzIE1vdXNlUG9pbnRlckljb24sXG4gIGNmIGFzIFJvdGF0ZUNjd0ljb24sXG4gIFRkIGFzIFJlYWN0RE9NLFxufSBmcm9tIFwiLi4vdmVuZG9yL3J1bnRpbWUuanNcIjtcbmltcG9ydCB7IHNpdGVDb25maWcgfSBmcm9tIFwiLi9zaXRlLWNvbmZpZy5qc1wiO1xuY29uc3QgU2Nyb2xsUHJvZ3Jlc3MgPSAoKSA9PiB7XG4gIGxldCB7IHNjcm9sbFlQcm9ncmVzczogZSB9ID0gdXNlU2Nyb2xsKCksXG4gICAgdCA9IHVzZVNwcmluZyhlLCB7XG4gICAgICBzdGlmZm5lc3M6IDEyMCxcbiAgICAgIGRhbXBpbmc6IDMwLFxuICAgICAgcmVzdERlbHRhOiAwLjAwMSxcbiAgICB9KTtcbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLmRpdlxuICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC1bM3B4XSBiZy1ncmFkaWVudC10by1yIGZyb20tWyNBODBGMTVdIHZpYS1bI0Q3MTkyMF0gdG8tWyNGRjNCNDNdIG9yaWdpbi1sZWZ0IHotNTAgcG9pbnRlci1ldmVudHMtbm9uZSBzaGFkb3ctWzBfMF8xMnB4X3JnYmEoMjE1LDI1LDMyLDAuNildYH1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHNjYWxlWDogdCxcbiAgICAgIH19XG4gICAgICBhcmlhLWhpZGRlbj17YHRydWVgfVxuICAgIC8+XG4gICk7XG59O1xuZnVuY3Rpb24gd2hhdHNhcHBVcmwoZSkge1xuICBsZXQgdCA9IGUgfHwgc2l0ZUNvbmZpZy5waG9uZS53aGF0c2FwcE1lc3NhZ2VHZW5lcmFsO1xuICByZXR1cm4gYGh0dHBzOi8vd2EubWUvJHtzaXRlQ29uZmlnLnBob25lLnJhd30/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCh0KX1gO1xufVxuZnVuY3Rpb24gZ2V0T3BlbmluZ1N0YXR1cyhlID0gbmV3IERhdGUoKSkge1xuICBsZXQgdCA9IGUuZ2V0VGltZSgpICsgZS5nZXRUaW1lem9uZU9mZnNldCgpICogNmU0LFxuICAgIG4gPSBuZXcgRGF0ZSh0IC0gMThlNiksXG4gICAgciA9IG4uZ2V0RGF5KCksXG4gICAgaSA9IG4uZ2V0SG91cnMoKSxcbiAgICBhID0gbi5nZXRNaW51dGVzKCksXG4gICAgbyA9IGkgKiA2MCArIGE7XG4gIHJldHVybiByID09PSAwXG4gICAgPyB7XG4gICAgICAgIGlzT3BlbjogITEsXG4gICAgICAgIGlzUGF1c2VkOiAhMSxcbiAgICAgICAgc3RhdHVzTGFiZWw6IGBIb3JhcmlvIG5vIGNvbmZpcm1hZG9gLFxuICAgICAgICBuZXh0RXZlbnREZXNjcmlwdGlvbjogYENvbnN1bHRhIGRpc3BvbmliaWxpZGFkIGRvbWluaWNhbCBwb3IgV2hhdHNBcHBgLFxuICAgICAgICBiYWRnZUNvbG9yQ2xhc3M6IGB0ZXh0LWFtYmVyLTQwMCBiZy1hbWJlci00MDAvMTAgYm9yZGVyLWFtYmVyLTQwMC8yMGAsXG4gICAgICB9XG4gICAgOiByID09PSA2XG4gICAgICA/IG8gPj0gNDgwICYmIG8gPCA3ODBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpc09wZW46ICEwLFxuICAgICAgICAgICAgaXNQYXVzZWQ6ICExLFxuICAgICAgICAgICAgc3RhdHVzTGFiZWw6IGBBYmllcnRvIGFob3JhYCxcbiAgICAgICAgICAgIG5leHRFdmVudERlc2NyaXB0aW9uOiBgQ2llcnJhIGhveSBhIGxhIDE6MDAgcC4gbS5gLFxuICAgICAgICAgICAgYmFkZ2VDb2xvckNsYXNzOiBgdGV4dC1lbWVyYWxkLTQwMCBiZy1lbWVyYWxkLTQwMC8xMCBib3JkZXItZW1lcmFsZC00MDAvMjBgLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBvIDwgNDgwXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGlzT3BlbjogITEsXG4gICAgICAgICAgICAgIGlzUGF1c2VkOiAhMSxcbiAgICAgICAgICAgICAgc3RhdHVzTGFiZWw6IGBQcsOzeGltYSBhcGVydHVyYWAsXG4gICAgICAgICAgICAgIG5leHRFdmVudERlc2NyaXB0aW9uOiBgQWJyZSBob3kgYSBsYXMgODowMCBhLiBtLmAsXG4gICAgICAgICAgICAgIGJhZGdlQ29sb3JDbGFzczogYHRleHQtbmV1dHJhbC00MDAgYmctbmV1dHJhbC04MDAgYm9yZGVyLW5ldXRyYWwtNzAwYCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgaXNPcGVuOiAhMSxcbiAgICAgICAgICAgICAgaXNQYXVzZWQ6ICExLFxuICAgICAgICAgICAgICBzdGF0dXNMYWJlbDogYENlcnJhZG8gcG9yIGhveWAsXG4gICAgICAgICAgICAgIG5leHRFdmVudERlc2NyaXB0aW9uOiBgUHLDs3hpbWEgYXBlcnR1cmE6IEx1bmVzIGEgbGFzIDc6MDAgYS4gbS5gLFxuICAgICAgICAgICAgICBiYWRnZUNvbG9yQ2xhc3M6IGB0ZXh0LW5ldXRyYWwtNDAwIGJnLW5ldXRyYWwtODAwIGJvcmRlci1uZXV0cmFsLTcwMGAsXG4gICAgICAgICAgICB9XG4gICAgICA6IG8gPj0gNDIwICYmIG8gPCA3ODBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpc09wZW46ICEwLFxuICAgICAgICAgICAgaXNQYXVzZWQ6ICExLFxuICAgICAgICAgICAgc3RhdHVzTGFiZWw6IGBBYmllcnRvIGFob3JhIMK3IFR1cm5vIE1hw7FhbmFgLFxuICAgICAgICAgICAgbmV4dEV2ZW50RGVzY3JpcHRpb246IGBQYXVzYSBhIGxhIDE6MDAgcC4gbS4gKHJlYXBlcnR1cmEgMzowMCBwLiBtLilgLFxuICAgICAgICAgICAgYmFkZ2VDb2xvckNsYXNzOiBgdGV4dC1lbWVyYWxkLTQwMCBiZy1lbWVyYWxkLTQwMC8xMCBib3JkZXItZW1lcmFsZC00MDAvMjBgLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBvID49IDc4MCAmJiBvIDwgOTAwXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGlzT3BlbjogITEsXG4gICAgICAgICAgICAgIGlzUGF1c2VkOiAhMCxcbiAgICAgICAgICAgICAgc3RhdHVzTGFiZWw6IGBQYXVzYSBpbnRlcm1lZGlhYCxcbiAgICAgICAgICAgICAgbmV4dEV2ZW50RGVzY3JpcHRpb246IGBSZWFicmUgZW4gdHVybm8gdGFyZGUgYSBsYXMgMzowMCBwLiBtLmAsXG4gICAgICAgICAgICAgIGJhZGdlQ29sb3JDbGFzczogYHRleHQtYW1iZXItNDAwIGJnLWFtYmVyLTQwMC8xMCBib3JkZXItYW1iZXItNDAwLzIwYCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IG8gPj0gOTAwICYmIG8gPCAxMjYwXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpc09wZW46ICEwLFxuICAgICAgICAgICAgICAgIGlzUGF1c2VkOiAhMSxcbiAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbDogYEFiaWVydG8gYWhvcmEgwrcgVHVybm8gVGFyZGVgLFxuICAgICAgICAgICAgICAgIG5leHRFdmVudERlc2NyaXB0aW9uOiBgQ2llcnJhIGEgbGFzIDk6MDAgcC4gbS5gLFxuICAgICAgICAgICAgICAgIGJhZGdlQ29sb3JDbGFzczogYHRleHQtZW1lcmFsZC00MDAgYmctZW1lcmFsZC00MDAvMTAgYm9yZGVyLWVtZXJhbGQtNDAwLzIwYCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBvIDwgNDIwXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgaXNPcGVuOiAhMSxcbiAgICAgICAgICAgICAgICAgIGlzUGF1c2VkOiAhMSxcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsOiBgUHLDs3hpbWEgYXBlcnR1cmFgLFxuICAgICAgICAgICAgICAgICAgbmV4dEV2ZW50RGVzY3JpcHRpb246IGBBYnJlIGhveSBhIGxhcyA3OjAwIGEuIG0uYCxcbiAgICAgICAgICAgICAgICAgIGJhZGdlQ29sb3JDbGFzczogYHRleHQtbmV1dHJhbC00MDAgYmctbmV1dHJhbC04MDAgYm9yZGVyLW5ldXRyYWwtNzAwYCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgaXNPcGVuOiAhMSxcbiAgICAgICAgICAgICAgICAgIGlzUGF1c2VkOiAhMSxcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsOiBgQ2VycmFkbyBwb3IgaG95YCxcbiAgICAgICAgICAgICAgICAgIG5leHRFdmVudERlc2NyaXB0aW9uOlxuICAgICAgICAgICAgICAgICAgICByID09PSA1XG4gICAgICAgICAgICAgICAgICAgICAgPyBgQWJyZSBtYcOxYW5hIHPDoWJhZG8gYSBsYXMgODowMCBhLiBtLmBcbiAgICAgICAgICAgICAgICAgICAgICA6IGBBYnJlIG1hw7FhbmEgYSBsYXMgNzowMCBhLiBtLmAsXG4gICAgICAgICAgICAgICAgICBiYWRnZUNvbG9yQ2xhc3M6IGB0ZXh0LW5ldXRyYWwtNDAwIGJnLW5ldXRyYWwtODAwIGJvcmRlci1uZXV0cmFsLTcwMGAsXG4gICAgICAgICAgICAgICAgfTtcbn1cbnZhciBBY2Nlc3NpYmlsaXR5Q29udGV4dCA9ICgwLCBSZWFjdC5jcmVhdGVDb250ZXh0KSh2b2lkIDApLFxuICBBY2Nlc3NpYmlsaXR5UHJvdmlkZXIgPSAoeyBjaGlsZHJlbjogZSB9KSA9PiB7XG4gICAgbGV0IFt0LCBuXSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoYG5vcm1hbGApLFxuICAgICAgW3IsIGldID0gKDAsIFJlYWN0LnVzZVN0YXRlKSghMSksXG4gICAgICBbYSwgb10gPSAoMCwgUmVhY3QudXNlU3RhdGUpKCExKSxcbiAgICAgIFtzLCBjXSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoITEpLFxuICAgICAgW2wsIHVdID0gKDAsIFJlYWN0LnVzZVN0YXRlKSghMSksXG4gICAgICBbZCwgZl0gPSAoMCwgUmVhY3QudXNlU3RhdGUpKCExKSxcbiAgICAgIFtwLCBtXSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoITEpLFxuICAgICAgW2gsIGddID0gKDAsIFJlYWN0LnVzZVN0YXRlKSghMSksXG4gICAgICBbXywgdl0gPSAoMCwgUmVhY3QudXNlU3RhdGUpKCExKTtcbiAgICAoKDAsIFJlYWN0LnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgbGV0IGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIG4gPSB0ID09PSBgeGxhcmdlYCA/IGAxLjNgIDogdCA9PT0gYGxhcmdlYCA/IGAxLjE1YCA6IGAxYDtcbiAgICAgIChlLnN0eWxlLnNldFByb3BlcnR5KGAtLWExMXktZm9udC1zY2FsZWAsIG4pLFxuICAgICAgICBlLmNsYXNzTGlzdC50b2dnbGUoYGExMXktaGlnaC1jb250cmFzdGAsIHIpLFxuICAgICAgICBlLmNsYXNzTGlzdC50b2dnbGUoYGExMXktZ3JheXNjYWxlYCwgYSksXG4gICAgICAgIGUuY2xhc3NMaXN0LnRvZ2dsZShgYTExeS1keXNsZXhpYWAsIHMpLFxuICAgICAgICBlLmNsYXNzTGlzdC50b2dnbGUoYGExMXktcmVkdWNlZC1tb3Rpb25gLCBsKSxcbiAgICAgICAgZS5jbGFzc0xpc3QudG9nZ2xlKGBhMTF5LWhpZ2hsaWdodC1saW5rc2AsIGQpLFxuICAgICAgICBlLmNsYXNzTGlzdC50b2dnbGUoYGExMXktYmlnLWN1cnNvcmAsIHApKTtcbiAgICB9LCBbdCwgciwgYSwgcywgbCwgZCwgcF0pLFxuICAgICAgKDAsIFJlYWN0LnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgICBsZXQgZSA9IChlKSA9PiB7XG4gICAgICAgICAgZS5hbHRLZXkgJiYgKGUua2V5ID09PSBgYWAgfHwgZS5rZXkgPT09IGBBYCkgJiYgKGUucHJldmVudERlZmF1bHQoKSwgZygoZSkgPT4gIWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIGUpLFxuICAgICAgICAgICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBrZXlkb3duYCwgZSlcbiAgICAgICAgKTtcbiAgICAgIH0sIFtdKSk7XG4gICAgbGV0IHkgPSAoZSkgPT4gbihlKSxcbiAgICAgIGIgPSAoKSA9PiBpKChlKSA9PiAhZSksXG4gICAgICB4ID0gKCkgPT4gbygoZSkgPT4gIWUpLFxuICAgICAgZWUgPSAoKSA9PiBjKChlKSA9PiAhZSksXG4gICAgICB0ZSA9ICgpID0+IHUoKGUpID0+ICFlKSxcbiAgICAgIEMgPSAoKSA9PiBmKChlKSA9PiAhZSksXG4gICAgICBuZSA9ICgpID0+IG0oKGUpID0+ICFlKSxcbiAgICAgIHcgPSAoKSA9PiB7XG4gICAgICAgIChuKGBub3JtYWxgKSwgaSghMSksIG8oITEpLCBjKCExKSwgdSghMSksIGYoITEpLCBtKCExKSwgcmUoKSk7XG4gICAgICB9LFxuICAgICAgcmUgPSAoMCwgUmVhY3QudXNlQ2FsbGJhY2spKCgpID0+IHtcbiAgICAgICAgYHNwZWVjaFN5bnRoZXNpc2AgaW4gd2luZG93ICYmICh3aW5kb3cuc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpLCB2KCExKSk7XG4gICAgICB9LCBbXSksXG4gICAgICBpZSA9ICgwLCBSZWFjdC51c2VDYWxsYmFjaykoKCkgPT4ge1xuICAgICAgICBpZiAoIShgc3BlZWNoU3ludGhlc2lzYCBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgYWxlcnQoYFR1IG5hdmVnYWRvciBubyBzb3BvcnRhIGVsIHNpbnRldGl6YWRvciBkZSB2b3ogbmF0aXZvLmApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXykge1xuICAgICAgICAgIHJlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5zcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICAgIGxldCBlID1cbiAgICAgICAgICBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKGBCaWVudmVuaWRvIGEgNyBTdHJlbmd0aCBDZW50ZXIsIGdpbW5hc2lvIGRlIGZ1ZXJ6YSB5IHJlbmRpbWllbnRvIGVuIENhamFtYXJjYSwgUGVyw7ouIFxuVWJpY2FjacOzbjogTG9zIExlb25lcyAxNjQsIENhamFtYXJjYS5cblBsYW5lcyBvZmljaWFsZXM6IFBhc2UgRGlhcmlvIGEgMTUgc29sZXMgeSBQbGFuIE1lbnN1YWwgYSAxMjAgc29sZXMuXG5Ib3JhcmlvcyBkZSBhdGVuY2nDs246IERlIGx1bmVzIGEgdmllcm5lcywgdHVybm8gbWHDsWFuYSBkZSA3OjAwIGEuIG0uIGEgMTowMCBwLiBtLiB5IHR1cm5vIHRhcmRlIGRlIDM6MDAgcC4gbS4gYSA5OjAwIHAuIG0uIFPDoWJhZG9zIGRlIDg6MDAgYS4gbS4gYSAxOjAwIHAuIG0uIERvbWluZ29zIGNvbiBob3JhcmlvIHBvciBjb25maXJtYXIgcG9yIFdoYXRzQXBwLlxuV2hhdHNBcHAgb2ZpY2lhbDogKzUxIDk3NiA3OTUgNDk4LiBFc2Nyw61iZW5vcyBwYXJhIHVuaXJ0ZSBob3kuYCk7XG4gICAgICAgICgoZS5sYW5nID0gYGVzLVBFYCksIChlLnJhdGUgPSAwLjk1KSk7XG4gICAgICAgIGxldCB0ID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKS5maW5kKChlKSA9PiBlLmxhbmcuc3RhcnRzV2l0aChgZXNgKSk7XG4gICAgICAgICh0ICYmIChlLnZvaWNlID0gdCksXG4gICAgICAgICAgKGUub25lbmQgPSAoKSA9PiB2KCExKSksXG4gICAgICAgICAgKGUub25lcnJvciA9ICgpID0+IHYoITEpKSxcbiAgICAgICAgICB2KCEwKSxcbiAgICAgICAgICB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLnNwZWFrKGUpKTtcbiAgICAgIH0sIFtfLCByZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8QWNjZXNzaWJpbGl0eUNvbnRleHQuUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICB0ZXh0U2l6ZTogdCxcbiAgICAgICAgICBoaWdoQ29udHJhc3Q6IHIsXG4gICAgICAgICAgZ3JheXNjYWxlOiBhLFxuICAgICAgICAgIGR5c2xleGlhRm9udDogcyxcbiAgICAgICAgICByZWR1Y2VkTW90aW9uOiBsLFxuICAgICAgICAgIGhpZ2hsaWdodExpbmtzOiBkLFxuICAgICAgICAgIGJpZ0N1cnNvcjogcCxcbiAgICAgICAgICBpc09wZW46IGgsXG4gICAgICAgICAgaXNTcGVha2luZzogXyxcbiAgICAgICAgICBzZXRUZXh0U2l6ZTogeSxcbiAgICAgICAgICB0b2dnbGVIaWdoQ29udHJhc3Q6IGIsXG4gICAgICAgICAgdG9nZ2xlR3JheXNjYWxlOiB4LFxuICAgICAgICAgIHRvZ2dsZUR5c2xleGlhRm9udDogZWUsXG4gICAgICAgICAgdG9nZ2xlUmVkdWNlZE1vdGlvbjogdGUsXG4gICAgICAgICAgdG9nZ2xlSGlnaGxpZ2h0TGlua3M6IEMsXG4gICAgICAgICAgdG9nZ2xlQmlnQ3Vyc29yOiBuZSxcbiAgICAgICAgICBzZXRJc09wZW46IGcsXG4gICAgICAgICAgcmVzZXRBbGw6IHcsXG4gICAgICAgICAgc3BlYWtPdmVydmlldzogaWUsXG4gICAgICAgICAgc3RvcFNwZWFraW5nOiByZSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2V9XG4gICAgICA8L0FjY2Vzc2liaWxpdHlDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG4gIH0sXG4gIHVzZUFjY2Vzc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgbGV0IGUgPSAoMCwgUmVhY3QudXNlQ29udGV4dCkoQWNjZXNzaWJpbGl0eUNvbnRleHQpO1xuICAgIGlmICghZSkgdGhyb3cgRXJyb3IoYHVzZUFjY2Vzc2liaWxpdHkgbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBY2Nlc3NpYmlsaXR5UHJvdmlkZXJgKTtcbiAgICByZXR1cm4gZTtcbiAgfSxcbiAgSGVhZGVyID0gKHsgYWN0aXZlU2VjdGlvbjogZSB9KSA9PiB7XG4gICAgbGV0IFt0LCBuXSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoITEpLFxuICAgICAgW3IsIGldID0gKDAsIFJlYWN0LnVzZVN0YXRlKSghMSk7XG4gICAgKDAsIFJlYWN0LnVzZUVmZmVjdCkoKCkgPT4ge1xuICAgICAgbGV0IGUgPSAoKSA9PiB7XG4gICAgICAgIG4od2luZG93LnNjcm9sbFkgPiAyNSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHNjcm9sbGAsIGUsIHtcbiAgICAgICAgICBwYXNzaXZlOiAhMCxcbiAgICAgICAgfSksXG4gICAgICAgICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBzY3JvbGxgLCBlKVxuICAgICAgKTtcbiAgICB9LCBbXSk7XG4gICAgbGV0IGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogYEluaWNpb2AsXG4gICAgICAgICAgaHJlZjogYCNpbmljaW9gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IGBOb3NvdHJvc2AsXG4gICAgICAgICAgaHJlZjogYCNub3NvdHJvc2AsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogYEluc3RhbGFjaW9uZXNgLFxuICAgICAgICAgIGhyZWY6IGAjaW5zdGFsYWNpb25lc2AsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogYFBsYW5lc2AsXG4gICAgICAgICAgaHJlZjogYCNwbGFuZXNgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IGBIb3Jhcmlvc2AsXG4gICAgICAgICAgaHJlZjogYCNob3Jhcmlvc2AsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogYENvbXVuaWRhZGAsXG4gICAgICAgICAgaHJlZjogYCNjb211bmlkYWRgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IGBDb250YWN0b2AsXG4gICAgICAgICAgaHJlZjogYCNjb250YWN0b2AsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgeyBzZXRJc09wZW46IG8gfSA9IHVzZUFjY2Vzc2liaWxpdHkoKSxcbiAgICAgIHMgPSAoZSwgdCkgPT4ge1xuICAgICAgICAoZS5wcmV2ZW50RGVmYXVsdCgpLCBpKCExKSk7XG4gICAgICAgIGxldCBuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtcbiAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICBsZXQgZSA9IG4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNzY7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogZSxcbiAgICAgICAgICAgIGJlaGF2aW9yOiBgc21vb3RoYCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPG1vdGlvbi5oZWFkZXJcbiAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgIHk6IC04MCxcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB9fVxuICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB9fVxuICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgei00MCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgJHt0ID8gYGxpcXVpZC1nbGFzcyBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgc2hhZG93LVswXzEwcHhfMzVweF9yZ2JhKDAsMCwwLDAuOCldIHB5LTNgIDogYGJnLXRyYW5zcGFyZW50IHB5LTUgc206cHktNmB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOGB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IG1kOmdhcC04YH0+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPXtgI2luaWNpb2B9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBzKGUsIGAjaW5pY2lvYCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGdyb3VwIHNocmluay0wIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1bI0Q3MTkyMF0gcm91bmRlZC1sZyBwLTFgfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgNyBTdHJlbmd0aCBDZW50ZXIgLSBWb2x2ZXIgYWwgaW5pY2lvYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctMTAgaC0xMCBzbTp3LTExIHNtOmgtMTEgcm91bmRlZC1tZCBvdmVyZmxvdy1oaWRkZW4gYmctbmV1dHJhbC05MDAgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTgwMCBncm91cC1ob3Zlcjpib3JkZXItWyNENzE5MjBdIHRyYW5zaXRpb24tY29sb3JzIHNocmluay0wIHNoYWRvdy1sZ2B9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9e3NpdGVDb25maWcubG9nb1BhdGh9XG4gICAgICAgICAgICAgICAgICBhbHQ9e2BMb2dvIG9maWNpYWwgNyBTdHJlbmd0aCBDZW50ZXJgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbiBwLTAuNSBncm91cC1ob3ZlcjpzY2FsZS0xMDUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwYH1cbiAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2BlYWdlcmB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbGB9PlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC14bCBzbTp0ZXh0LTJ4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyIGxlYWRpbmctbm9uZSBmb250LWJvbGRgfVxuICAgICAgICAgICAgICAgID57YDcgU1RSRU5HVEhgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gc206dGV4dC14cyB0ZXh0LVsjRDcxOTIwXSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIG10LTAuNSBncm91cC1ob3Zlcjp0cmFja2luZy1bMC4yZW1dIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMGB9XG4gICAgICAgICAgICAgICAgPntgQ0VOVEVSYH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPG5hdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoaWRkZW4gbGc6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTggdGV4dC1zbSBmb250LW1lZGl1bWB9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BOYXZlZ2FjacOzbiBwcmluY2lwYWxgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YS5tYXAoKHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbiA9IGUgPT09IHQuaHJlZi5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e3QuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHMoZSwgdC5ocmVmKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHktMSB3aGl0ZXNwYWNlLW5vd3JhcCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTEgZm9jdXMtdmlzaWJsZTpyaW5nLVsjRDcxOTIwXSByb3VuZGVkICR7biA/IGB0ZXh0LXdoaXRlIGZvbnQtYm9sZGAgOiBgdGV4dC1uZXV0cmFsLTQwMCBob3Zlcjp0ZXh0LXdoaXRlYH1gfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e3QuaHJlZn1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3QubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIHtuICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dElkPXtgbmF2QWN0aXZlTGluZWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtYm90dG9tLTEgbGVmdC0wIHJpZ2h0LTAgaC1bMnB4XSBiZy1bI0Q3MTkyMF0gcm91bmRlZC1mdWxsIHNoYWRvdy1bMF8wXzhweF9yZ2JhKDIxNSwyNSwzMiwwLjgpXWB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGBzcHJpbmdgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDM4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGFtcGluZzogMzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc206Z2FwLTMgc2hyaW5rLTBgfT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG8oITApfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiBzbTpwLTIuNSByb3VuZGVkLXhsIGxpcXVpZC1nbGFzcyB0ZXh0LW5ldXRyYWwtMzAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ym9yZGVyLVsjRDcxOTIwXSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctWyNENzE5MjBdYH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgQWJyaXIgcGFuZWwgZGUgYWNjZXNpYmlsaWRhZCAoQWx0ICsgQSlgfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtgQWNjZXNpYmlsaWRhZCB1bml2ZXJzYWxgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEFjY2Vzc2liaWxpdHlJY29uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTQgaC00IHNtOnctNSBzbTpoLTUgdGV4dC1uZXV0cmFsLTIwMCBob3Zlcjp0ZXh0LVsjRDcxOTIwXSB0cmFuc2l0aW9uLWNvbG9yc2B9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj17d2hhdHNhcHBVcmwoKX1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBweC00IHNtOnB4LTYgcHktMi41IGJnLVsjRDcxOTIwXSBob3ZlcjpiZy1bI0E4MEYxNV0gdGV4dC13aGl0ZSB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSBhY3RpdmU6c2NhbGUtOTUgc2hhZG93LWxnIHNoYWRvdy1yZWQtOTAwLzQwIGhvdmVyOnNoYWRvdy1yZWQtOTAwLzcwIHdoaXRlc3BhY2Utbm93cmFwIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy13aGl0ZSBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgdy0xLzIgaC1mdWxsIGJnLXdoaXRlLzIwIHNrZXcteC0xMiAtdHJhbnNsYXRlLXgtZnVsbCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC1bMzAwJV0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcmVsYXRpdmUgei0xMGB9Pntgw5pORVRFIEFIT1JBYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPEFycm93VXBSaWdodEljb25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgdy00IGgtNCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC0wLjUgZ3JvdXAtaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDBgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGkoIXIpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGxnOmhpZGRlbiBwLTIgdGV4dC1uZXV0cmFsLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLW5ldXRyYWwtODAwLzgwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLVsjRDcxOTIwXWB9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17ciA/IGBDZXJyYXIgbWVuw7pgIDogYEFicmlyIG1lbsO6IGRlIG5hdmVnYWNpw7NuYH1cbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3IgPyA8WEljb24gY2xhc3NOYW1lPXtgdy02IGgtNmB9IC8+IDogPE1lbnVJY29uIGNsYXNzTmFtZT17YHctNiBoLTZgfSAvPn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAge3IgJiYgKFxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGBhdXRvYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgZXhpdD17e1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuMjUsXG4gICAgICAgICAgICAgICAgZWFzZTogYGVhc2VJbk91dGAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGxnOmhpZGRlbiBiZy1bIzBCMEIwQ10vOTggYmFja2Ryb3AtYmx1ci14bCBib3JkZXItYiBib3JkZXItbmV1dHJhbC04MDAgc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW4gcHgtNiBweS02YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sIGdhcC0zYH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBwYi0zIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTgwMC84MGB9PlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9e3NpdGVDb25maWcubG9nb1BhdGh9XG4gICAgICAgICAgICAgICAgICAgIGFsdD17YExvZ28gNyBTdHJlbmd0aGB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctOCBoLTggb2JqZWN0LWNvbnRhaW5gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LW5ldXRyYWwtNDAwIGZvbnQtc2VtaWJvbGRgfVxuICAgICAgICAgICAgICAgICAgPntgQ2FqYW1hcmNhLCBQZXLDumB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHthLm1hcCgodCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IG4gPSBlID09PSB0LmhyZWYuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXt0LmhyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHMoZSwgdC5ocmVmKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWJhc2UgcHktMiBweC0zIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgJHtuID8gYGJnLW5ldXRyYWwtOTAwIHRleHQtWyNENzE5MjBdIGZvbnQtYm9sZCBib3JkZXItbC0yIGJvcmRlci1bI0Q3MTkyMF1gIDogYHRleHQtbmV1dHJhbC0zMDAgaG92ZXI6YmctbmV1dHJhbC05MDAvNjAgaG92ZXI6dGV4dC13aGl0ZWB9YH1cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3QuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHt0LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC04MDAvODAgZmxleCBmbGV4LWNvbCBnYXAtMmB9PlxuICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17d2hhdHNhcHBVcmwoKX1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PXtgX2JsYW5rYH1cbiAgICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCB0ZXh0LWNlbnRlciBweS0zLjUgYmctWyNENzE5MjBdIGhvdmVyOmJnLVsjQTgwRjE1XSB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB1cHBlcmNhc2UgdGV4dC1zbSByb3VuZGVkLWxnIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMmB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntgw5pORVRFIEFIT1JBIFBPUiBXSEFUU0FQUGB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8QXJyb3dVcFJpZ2h0SWNvbiBjbGFzc05hbWU9e2B3LTQgaC00YH0gLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtY2VudGVyIHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBtdC0xYH1cbiAgICAgICAgICAgICAgICAgID57YEF0ZW5jacOzbiBkaXJlY3RhOiArNTEgOTc2IDc5NSA0OThgfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICA8L21vdGlvbi5oZWFkZXI+XG4gICAgKTtcbiAgfSxcbiAgSGVybyA9ICgpID0+IHtcbiAgICBsZXQgZSA9IChlKSA9PiB7XG4gICAgICBsZXQgdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk7XG4gICAgICBpZiAodCkge1xuICAgICAgICBsZXQgZSA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gNzY7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBlLFxuICAgICAgICAgIGJlaGF2aW9yOiBgc21vb3RoYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb25cbiAgICAgICAgaWQ9e2BpbmljaW9gfVxuICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBtaW4taC1zY3JlZW4gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcHQtMzIgcGItMTYgb3ZlcmZsb3ctaGlkZGVuIGJnLVsjMEIwQjBDXWB9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB6LTAgb3ZlcmZsb3ctaGlkZGVuIHBvaW50ZXItZXZlbnRzLW5vbmVgfT5cbiAgICAgICAgICA8bW90aW9uLmltZ1xuICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICBzY2FsZTogMS4wOCxcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAwLjg1LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEuOCxcbiAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgc3JjPXtgL2Fzc2V0cy9haXN0dWRpby9pbWFnZV9jYWI1Y2FkYi5wbmdgfVxuICAgICAgICAgICAgYWx0PXtgSW5zdGFsYWNpb25lcyBvZmljaWFsZXMgZGUgNyBTdHJlbmd0aCBDZW50ZXIgZW4gQ2FqYW1hcmNhYH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9iamVjdC1jZW50ZXIgZmlsdGVyIGJyaWdodG5lc3MtNjUgY29udHJhc3QtMTI1YH1cbiAgICAgICAgICAgIGxvYWRpbmc9e2BlYWdlcmB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1bIzBCMEIwQ10gdmlhLVsjMEIwQjBDXS83NSB0by1bIzBCMEIwQ10vNDBgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1yIGZyb20tWyMwQjBCMENdIHZpYS1bIzBCMEIwQ10vNjAgdG8tdHJhbnNwYXJlbnRgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTEvMyBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzIgdy1bNzAwcHhdIGgtWzUwMHB4XSBiZy1bI0Q3MTkyMF0vMTUgYmx1ci1bMTYwcHhdIHJvdW5kZWQtZnVsbCBwb2ludGVyLWV2ZW50cy1ub25lYH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggZmxleC0xIGZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXJgfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYXgtdy00eGxgfT5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHk6IDIwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICAgICAgICBkZWxheTogMC4yLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHgtNCBweS0yIHJvdW5kZWQtZnVsbCBsaXF1aWQtZ2xhc3Mtc3VidGxlIHRleHQteHMgc206dGV4dC1zbSBmb250LWJvbGQgdHJhY2tpbmctWzAuMjVlbV0gdXBwZXJjYXNlIG1iLTYgdGV4dC1uZXV0cmFsLTMwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHNoYWRvdy1sZ2B9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMiBoLTIgcm91bmRlZC1mdWxsIGJnLVsjRDcxOTIwXSBhbmltYXRlLXB1bHNlYH0gLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC13aGl0ZWB9PntgNyBTVFJFTkdUSCBDRU5URVJgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49e2B0cnVlYH0gY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTUwMGB9PntgwrdgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bI0Q3MTkyMF1gfT57YENBSkFNQVJDQWB9PC9zcGFuPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdHJhY2tpbmctdGlnaHQgbGVhZGluZy1bMC45XSBtYi04IHNlbGVjdC1ub25lYH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgb3ZlcmZsb3ctaGlkZGVuYH0+XG4gICAgICAgICAgICAgICAgPG1vdGlvbi5oMVxuICAgICAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgICAgICB5OiBgMTAwJWAsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuOCxcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDAuMyxcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC02eGwgc206dGV4dC04eGwgbGc6dGV4dC05eGwgdGV4dC13aGl0ZSBibG9jayBmb250LWJvbGRgfVxuICAgICAgICAgICAgICAgID57YE5PIEhBWSBMw41NSVRFUy5gfTwvbW90aW9uLmgxPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BvdmVyZmxvdy1oaWRkZW4gbXQtMSBzbTptdC0yYH0+XG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICAgICAgeTogYDEwMCVgLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjksXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiAwLjUsXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtNnhsIHNtOnRleHQtOHhsIGxnOnRleHQtOXhsIHRleHQtd2hpdGUgZm9udC1ib2xkIGZsZXggaXRlbXMtYmFzZWxpbmUgZ2FwLTMgc206Z2FwLTUgZmxleC13cmFwYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57YFNPTE9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHRleHQtWyNENzE5MjBdIGRyb3Atc2hhZG93LVswXzBfMzVweF9yZ2JhKDIxNSwyNSwzMiwwLjQ1KV1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7YEZVRVJaQS5gfVxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgMTAwJWAsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC44LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDEuMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IGBlYXNlT3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIC1ib3R0b20tMSBzbTotYm90dG9tLTIgbGVmdC0wIGgtMSBzbTpoLTIgYmctWyNENzE5MjBdIHJvdW5kZWQtZnVsbGB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG1vdGlvbi5wXG4gICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHk6IDIwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNyxcbiAgICAgICAgICAgICAgICBkZWxheTogMC44LFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtMzAwIHRleHQtYmFzZSBzbTp0ZXh0LXhsIGZvbnQtbm9ybWFsIGxlYWRpbmctcmVsYXhlZCBtYXgtdy0yeGwgbWItMTBgfVxuICAgICAgICAgICAgPntgRW4gNyBTdHJlbmd0aCBDZW50ZXIsIGNhZGEgZW50cmVuYW1pZW50byBlcyB1bmEgb3BvcnR1bmlkYWQgcGFyYSBzdXBlcmFyIHR1cyBsw61taXRlcyB5IGNvbnZlcnRpcnRlIGVuIHR1IG1lam9yIHZlcnNpw7NuLmB9PC9tb3Rpb24ucD5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHk6IDIwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNyxcbiAgICAgICAgICAgICAgICBkZWxheTogMSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdHJldGNoIHNtOml0ZW1zLWNlbnRlciBnYXAtNCBzbTpnYXAtNWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxtb3Rpb24uYnV0dG9uXG4gICAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17e1xuICAgICAgICAgICAgICAgICAgc2NhbGU6IDEuMDMsXG4gICAgICAgICAgICAgICAgICB5OiAtMixcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHdoaWxlVGFwPXt7XG4gICAgICAgICAgICAgICAgICBzY2FsZTogMC45NyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGUoYCNwbGFuZXNgKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gcHgtOCBweS00LjUgbGlxdWlkLWdsYXNzLXJlZCB0ZXh0LXdoaXRlIGZvbnQtaGVhZGluZyBmb250LWJvbGQgdGV4dC1iYXNlIHNtOnRleHQtbGcgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHJvdW5kZWQtMnhsIHNoYWRvdy1bMF8xNXB4XzQwcHhfcmdiYSgyMTUsMjUsMzIsMC40KV0gaG92ZXI6c2hhZG93LVswXzIwcHhfNTBweF9yZ2JhKDIxNSwyNSwzMiwwLjYpXSB0ZXh0LWNlbnRlciBjdXJzb3ItcG9pbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMyBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctd2hpdGUgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzUwYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIHctMS8yIGgtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tdHJhbnNwYXJlbnQgdmlhLXdoaXRlLzMwIHRvLXRyYW5zcGFyZW50IHNrZXcteC0xMiAtdHJhbnNsYXRlLXgtZnVsbCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC1bMzAwJV0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tODAwIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcmVsYXRpdmUgei0xMGB9PntgQ09OT0NFIE5VRVNUUk9TIFBMQU5FU2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0SWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgei0xMCB3LTUgaC01IGdyb3VwLWhvdmVyOnRyYW5zbGF0ZS14LTEuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDBgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7XG4gICAgICAgICAgICAgICAgICBzY2FsZTogMS4wMyxcbiAgICAgICAgICAgICAgICAgIHk6IC0yLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgd2hpbGVUYXA9e3tcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiAwLjk3LFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZShgI2luc3RhbGFjaW9uZXNgKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCBweC04IHB5LTQuNSBsaXF1aWQtZ2xhc3MgaG92ZXI6Ym9yZGVyLVsjRDcxOTIwXS84MCB0ZXh0LW5ldXRyYWwtMjAwIGhvdmVyOnRleHQtd2hpdGUgZm9udC1oZWFkaW5nIGZvbnQtYm9sZCB0ZXh0LWJhc2Ugc206dGV4dC1sZyB0cmFja2luZy13aWRlciB1cHBlcmNhc2Ugcm91bmRlZC0yeGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRleHQtY2VudGVyIGN1cnNvci1wb2ludGVyIHNoYWRvdy14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctWyNENzE5MjBdIGJvcmRlciBib3JkZXItd2hpdGUvMTVgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2BFWFBMT1JBIEVMIEdJTU5BU0lPYH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICBkdXJhdGlvbjogMC44LFxuICAgICAgICAgICAgZGVsYXk6IDEuMyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggdy1mdWxsIGZsZXgganVzdGlmeS1jZW50ZXIgcHQtOGB9XG4gICAgICAgID5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBlKGAjbm9zb3Ryb3NgKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLVswLjI1ZW1dIHRleHQtbmV1dHJhbC00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZWB9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtgRGVzbGl6YXIgaGFjaWEgYWJham8gcGFyYSBleHBsb3JhciBlbCBnaW1uYXNpb2B9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yNWVtXWB9XG4gICAgICAgICAgICA+e2BERVNMSVpBIFBBUkEgRVhQTE9SQVJgfTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtOCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTcwMCBncm91cC1ob3Zlcjpib3JkZXItWyNENzE5MjBdIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1jZW50ZXIgcC0xIHRyYW5zaXRpb24tY29sb3JzYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICB5OiBbMCwgMTAsIDBdLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgcmVwZWF0OiAxIC8gMCxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjYsXG4gICAgICAgICAgICAgICAgICBlYXNlOiBgZWFzZUluT3V0YCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMSBoLTIgYmctWyNENzE5MjBdIHJvdW5kZWQtZnVsbGB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH0sXG4gIEFib3V0ID0gKCkgPT4ge1xuICAgIGxldCBlID0gKDAsIFJlYWN0LnVzZU1lbW8pKCgpID0+IGdldE9wZW5pbmdTdGF0dXMoKSwgW10pLFxuICAgICAgdCA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGljb246IER1bWJiZWxsSWNvbixcbiAgICAgICAgICB0aXRsZTogYEZVRVJaQWAsXG4gICAgICAgICAgdGV4dDogYENhZGEgZW50cmVuYW1pZW50byBlcyB1bmEgb3BvcnR1bmlkYWQgcGFyYSBhdmFuemFyLmAsXG4gICAgICAgICAgbnVtYmVyOiBgMDFgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvbjogVGFyZ2V0SWNvbixcbiAgICAgICAgICB0aXRsZTogYERJU0NJUExJTkFgLFxuICAgICAgICAgIHRleHQ6IGBMYSBjb25zdGFuY2lhIHRyYW5zZm9ybWEgdHVzIG9iamV0aXZvcyBlbiByZXN1bHRhZG9zLmAsXG4gICAgICAgICAgbnVtYmVyOiBgMDJgLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvbjogVXNlcnNJY29uLFxuICAgICAgICAgIHRpdGxlOiBgQ09NVU5JREFEYCxcbiAgICAgICAgICB0ZXh0OiBgQ29tcGFydGUgdHUgcGFzacOzbiBwb3IgZWwgZW50cmVuYW1pZW50by5gLFxuICAgICAgICAgIG51bWJlcjogYDAzYCxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWN0aW9uXG4gICAgICAgIGlkPXtgbm9zb3Ryb3NgfVxuICAgICAgICBjbGFzc05hbWU9e2BweS0yOCBiZy1bIzBCMEIwQ10gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtODAwLzgwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMS8yIHJpZ2h0LTAgdy1bNTAwcHhdIGgtWzUwMHB4XSBiZy1bI0Q3MTkyMF0vOCBibHVyLVsxODBweF0gcG9pbnRlci1ldmVudHMtbm9uZSByb3VuZGVkLWZ1bGxgfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHJlbGF0aXZlIHotMTBgfT5cbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB3aGlsZUluVmlldz17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICBtYXJnaW46IGAtNjBweGAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICBkdXJhdGlvbjogMC43LFxuICAgICAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BtYi0xNmB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy1bMC4yNWVtXSB1cHBlcmNhc2UgdGV4dC1bI0Q3MTkyMF0gbWItM2B9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctNiBoLVsycHhdIGJnLVsjRDcxOTIwXWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPntgRklMT1NPRsONQSA3IFNUUkVOR1RIYH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPXtgdHJ1ZWB9IGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC03MDBgfT57YMK3YH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDBgfT57YENBSkFNQVJDQWB9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtNHhsIHNtOnRleHQtNnhsIGxnOnRleHQtN3hsIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHQgbGVhZGluZy1bMC45NV0gbWF4LXctNHhsYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2BNw4FTIFFVRSBVTiBHSU1OQVNJTy4gYH1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bI0Q3MTkyMF1gfT57YFVOQSBDT01VTklEQUQuYH08L3NwYW4+XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC0xMiBsZzpnYXAtMTYgaXRlbXMtY2VudGVyYH0+XG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB4OiAtMzAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB2aWV3cG9ydD17e1xuICAgICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogYC02MHB4YCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjgsXG4gICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTUgcmVsYXRpdmVgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGxpcXVpZC1nbGFzcyBwLTggc206cC0xMCBzaGFkb3ctMnhsIGhvdmVyOmJvcmRlci13aGl0ZS8zMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgLXRvcC0yNCAtbGVmdC0yNCB3LTYwIGgtNjAgYmctWyNENzE5MjBdLzI1IHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lIGdyb3VwLWhvdmVyOmJnLVsjRDcxOTIwXS80MCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDBgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgLWJvdHRvbS0yMCAtcmlnaHQtMjAgdy00OCBoLTQ4IGJnLXdoaXRlLzUgcm91bmRlZC1mdWxsIGJsdXItMnhsIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTEwIGZsZXggZmxleC1jb2xgfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy1mdWxsIGgtNTYgc206aC02NCByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBzaGFkb3ctMnhsIG1iLTYgZ3JvdXAvaW1nYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgIHNyYz17YC9hc3NldHMvYWlzdHVkaW8vaW1hZ2VfOTkzZGRiODAucG5nYH1cbiAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2BJbnRlcmlvciByZWFsIGRlIDcgU3RyZW5ndGggQ2VudGVyIGVuIENhamFtYXJjYWB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgZ3JvdXAtaG92ZXIvaW1nOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi03MDBgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svODUgdmlhLWJsYWNrLzMwIHRvLXRyYW5zcGFyZW50YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSBib3R0b20tMyBsZWZ0LTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNgfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTE0IGgtMTQgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgcC0xIHNoYWRvdy0yeGwgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyIGJvcmRlci13aGl0ZS8yMGB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3NpdGVDb25maWcubG9nb1BhdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YEVtYmxlbWEgb2ZpY2lhbCA3IFN0cmVuZ3RoIENlbnRlcmB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvbnRhaW5gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gdGV4dC1bI0Q3MTkyMF0gZm9udC1ib2xkIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICAgID57YFNFREUgT0ZJQ0lBTGB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LWxnIHRleHQtd2hpdGUgbGVhZGluZy1ub25lYH1cbiAgICAgICAgICAgICAgICAgICAgICAgID57YDcgU1RSRU5HVEggQ0VOVEVSYH08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0zIHJpZ2h0LTMgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIGxpcXVpZC1nbGFzcyB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTIwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYm9yZGVyIGJvcmRlci13aGl0ZS8yMGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2tJY29uIGNsYXNzTmFtZT17YHctMyBoLTMgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntgSW5zdGFsYWNpw7NuIFJlYWxgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTFgfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTJ4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVgfVxuICAgICAgICAgICAgICAgICAgICAgID57YExPUyBMRU9ORVMgMTY0YH08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdGB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgQ2FqYW1hcmNhIMK3IFBlcsO6YH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkIHRleHQtWyNENzE5MjBdIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgbGlxdWlkLWdsYXNzLXN1YnRsZSBib3JkZXIgYm9yZGVyLVsjRDcxOTIwXS80MGB9XG4gICAgICAgICAgICAgICAgICAgID57YDIgTklWRUxFU2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTUgdy1mdWxsIHB5LTMgcHgtNCByb3VuZGVkLXhsIGJvcmRlciB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy1pbm5lciAke2UuYmFkZ2VDb2xvckNsYXNzfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yYH0+XG4gICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2Uuc3RhdHVzTGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIG9wYWNpdHktOTBgfT57ZS5uZXh0RXZlbnREZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB4OiAzMCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgd2hpbGVJblZpZXc9e3tcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICAgICAgb25jZTogITAsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiBgLTYwcHhgLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuOCxcbiAgICAgICAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbGc6Y29sLXNwYW4tNyBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWxnIHNtOnRleHQteGwgdGV4dC1uZXV0cmFsLTIwMCBmb250LW5vcm1hbCBsZWFkaW5nLXJlbGF4ZWQgbWItMTAgYm9yZGVyLWwtMiBib3JkZXItWyNENzE5MjBdIHBsLTYgcHktMWB9XG4gICAgICAgICAgICAgID57YEVuIDcgU3RyZW5ndGggQ2VudGVyIGNyZWVtb3MgcXVlIGxhIGZ1ZXJ6YSBzZSBjb25zdHJ1eWUgY29uIGVzZnVlcnpvLCBkaXNjaXBsaW5hIHkgY29uc3RhbmNpYS4gU29tb3MgdW4gZXNwYWNpbyBkZWRpY2FkbyBhIHF1aWVuZXMgYnVzY2FuIG1lam9yYXIgc3UgY29uZGljacOzbiBmw61zaWNhLCBzdXBlcmFyIHN1cyBwcm9waW9zIGzDrW1pdGVzIHkgZGlzZnJ1dGFyIGRlbCBlbnRyZW5hbWllbnRvIGNvbW8gcGFydGUgZGUgc3UgZXN0aWxvIGRlIHZpZGEuYH08L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMSBnYXAtNCBzbTpnYXAtNWB9PlxuICAgICAgICAgICAgICAgIHt0Lm1hcCgoZSwgdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IG4gPSBlLmljb247XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogYC00MHB4YCxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogdCAqIDAuMTIsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMS4wMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogYHNwcmluZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWZmbmVzczogNDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYW1waW5nOiAyNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC01IHAtNiByb3VuZGVkLTJ4bCBsaXF1aWQtZ2xhc3MgbGlxdWlkLWdsYXNzLWludGVyYWN0aXZlIHNoYWRvdy1sZyBob3ZlcjpzaGFkb3ctMnhsIGhvdmVyOnNoYWRvdy1yZWQtOTUwLzMwYH1cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2UudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTE0IGgtMTQgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBncm91cC1ob3Zlcjpib3JkZXItWyNENzE5MjBdIGdyb3VwLWhvdmVyOmJnLVsjRDcxOTIwXS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBgfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoMCwganN4UnVudGltZS5qc3gpKG4sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBgdy03IGgtNyB0ZXh0LVsjRDcxOTIwXSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleC0xYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC0yeGwgc206dGV4dC0zeGwgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlIGdyb3VwLWhvdmVyOnRleHQtWyNENzE5MjBdIHRyYW5zaXRpb24tY29sb3JzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwIHRyYWNraW5nLXdpZGVyYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2UubnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YHRleHQtc20gc206dGV4dC1iYXNlIHRleHQtbmV1dHJhbC0zMDAgbXQtMSBsZWFkaW5nLW5vcm1hbGB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTggcHQtNiBib3JkZXItdCBib3JkZXItbmV1dHJhbC04MDAvODAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC00MDBgfVxuICAgICAgICAgICAgICAgID57YEluc3RhbGFjaW9uZXMgcHJvZmVzaW9uYWxlcyBlbiBMb3MgTGVvbmVzIDE2NCwgQ2FqYW1hcmNhYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3doYXRzYXBwVXJsKCl9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LVsjRDcxOTIwXSBob3Zlcjp0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0cmFuc2l0aW9uLWNvbG9ycyBncm91cGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2BDT05TVUxUQVIgUE9SIFdIQVRTQVBQYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8QXJyb3dSaWdodEljb25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMS41IHRyYW5zaXRpb24tdHJhbnNmb3JtYH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfSxcbiAgR2FsbGVyeUxpZ2h0Ym94ID0gKHsgc2xvdDogZSwgc2xvdHM6IHQsIG9uQ2xvc2U6IG4sIG9uTmF2aWdhdGU6IHIgfSkgPT4ge1xuICAgIGlmIChcbiAgICAgICgoMCwgUmVhY3QudXNlRWZmZWN0KSgoKSA9PiB7XG4gICAgICAgIGlmICghZSkgcmV0dXJuO1xuICAgICAgICBsZXQgdCA9IChlKSA9PiB7XG4gICAgICAgICAgKGUua2V5ID09PSBgRXNjYXBlYCAmJiBuKCksIGUua2V5ID09PSBgQXJyb3dMZWZ0YCAmJiBhKCksIGUua2V5ID09PSBgQXJyb3dSaWdodGAgJiYgbygpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIHQpLFxuICAgICAgICAgICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBrZXlkb3duYCwgdClcbiAgICAgICAgKTtcbiAgICAgIH0sIFtlXSksXG4gICAgICAhZSlcbiAgICApXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBsZXQgaSA9IHQuZmluZEluZGV4KCh0KSA9PiB0LmlkID09PSBlLmlkKSxcbiAgICAgIGEgPSAoKSA9PiB7XG4gICAgICAgIHIodFsoaSAtIDEgKyB0Lmxlbmd0aCkgJSB0Lmxlbmd0aF0pO1xuICAgICAgfSxcbiAgICAgIG8gPSAoKSA9PiB7XG4gICAgICAgIHIodFsoaSArIDEpICUgdC5sZW5ndGhdKTtcbiAgICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBleGl0PXt7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgZHVyYXRpb246IDAuMjUsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svOTUgYmFja2Ryb3AtYmx1ci14bCBwLTQgc206cC02YH1cbiAgICAgICAgICByb2xlPXtgZGlhbG9nYH1cbiAgICAgICAgICBhcmlhLW1vZGFsPXtgdHJ1ZWB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YFZpc3VhbGl6YWRvcjogJHtlLnRpdGxlfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtNCBsZWZ0LTQgcmlnaHQtNCBzbTp0b3AtNiBzbTpsZWZ0LTYgc206cmlnaHQtNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gei0yMGB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1uZXV0cmFsLTQwMGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtd2hpdGUgZm9udC1ib2xkYH0+e2kgKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+e2AvYH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPnt0Lmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGhpZGRlbiBzbTppbmxpbmVgfT57YMK3YH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGhpZGRlbiBzbTppbmxpbmUgdGV4dC1uZXV0cmFsLTMwMGB9PntlLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17e1xuICAgICAgICAgICAgICAgIHNjYWxlOiAxLjEsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHdoaWxlVGFwPXt7XG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuOSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25DbGljaz17bn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtZnVsbCBiZy1uZXV0cmFsLTkwMC85MCBob3ZlcjpiZy1bI0Q3MTkyMF0gdGV4dC1uZXV0cmFsLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy13aGl0ZSBzaGFkb3cteGxgfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgQ2VycmFyIHZpc29yYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFhJY29uIGNsYXNzTmFtZT17YHctNSBoLTVgfSAvPlxuICAgICAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxtb3Rpb24uYnV0dG9uXG4gICAgICAgICAgICB3aGlsZUhvdmVyPXt7XG4gICAgICAgICAgICAgIHNjYWxlOiAxLjEsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgd2hpbGVUYXA9e3tcbiAgICAgICAgICAgICAgc2NhbGU6IDAuOSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXthfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgbGVmdC0yIHNtOmxlZnQtNiB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgei0yMCBwLTMuNSByb3VuZGVkLWZ1bGwgYmctbmV1dHJhbC05MDAvOTAgaG92ZXI6YmctWyNENzE5MjBdIHRleHQtbmV1dHJhbC0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctd2hpdGUgc2hhZG93LXhsYH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BGb3RvZ3JhZsOtYSBhbnRlcmlvcmB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENoZXZyb25MZWZ0SWNvbiBjbGFzc05hbWU9e2B3LTYgaC02YH0gLz5cbiAgICAgICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgICAgIHdoaWxlSG92ZXI9e3tcbiAgICAgICAgICAgICAgc2NhbGU6IDEuMSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB3aGlsZVRhcD17e1xuICAgICAgICAgICAgICBzY2FsZTogMC45LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e299XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSByaWdodC0yIHNtOnJpZ2h0LTYgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHotMjAgcC0zLjUgcm91bmRlZC1mdWxsIGJnLW5ldXRyYWwtOTAwLzkwIGhvdmVyOmJnLVsjRDcxOTIwXSB0ZXh0LW5ldXRyYWwtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXdoaXRlIHNoYWRvdy14bGB9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtgRm90b2dyYWbDrWEgc2lndWllbnRlYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiBjbGFzc05hbWU9e2B3LTYgaC02YH0gLz5cbiAgICAgICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgc2NhbGU6IDAuOTUsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjMsXG4gICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIG1heC13LTV4bCB3LWZ1bGwgbWF4LWgtWzg1dmhdIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyYH1cbiAgICAgICAgICAgIGtleT17ZS5pZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctZnVsbCBtYXgtaC1bNzB2aF0gcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIGJnLW5ldXRyYWwtOTUwIGJvcmRlciBib3JkZXItbmV1dHJhbC04MDAgc2hhZG93LTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcmB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtlLnNhbXBsZUltYWdlID8gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17ZS5zYW1wbGVJbWFnZX1cbiAgICAgICAgICAgICAgICAgIGFsdD17ZS50aXRsZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBtYXgtaC1bNzB2aF0gb2JqZWN0LWNvbnRhaW5gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtODAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC04IHRleHQtY2VudGVyIGJnLW5ldXRyYWwtOTAwYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8Wm9vbUluSWNvbiBjbGFzc05hbWU9e2B3LTEyIGgtMTIgdGV4dC1uZXV0cmFsLTYwMCBtYi0zYH0gLz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YHRleHQtd2hpdGUgZm9udC1kaXNwbGF5IHRleHQtMnhsYH0+e2UudGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNDAwIG1heC13LW1kIG10LTJgfT57ZS5wbGFjZWhvbGRlclRleHR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgYm90dG9tLTQgbGVmdC00IHJpZ2h0LTQgc206cmlnaHQtYXV0byBweC00IHB5LTIgcm91bmRlZC14bCBiZy1ibGFjay84NSBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItbmV1dHJhbC03MDAvODAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LW5ldXRyYWwtMjAwIHNoYWRvdy1sZ2B9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMCBhbmltYXRlLXB1bHNlIHNocmluay0wYH0gLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57YEZvdG9ncmFmw61hIE9maWNpYWwgwrcgSW5zdGFsYWNpb25lcyByZWFsZXMgZGUgNyBTdHJlbmd0aCBDZW50ZXIgZW4gQ2FqYW1hcmNhYH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG10LTUgdGV4dC1jZW50ZXIgbWF4LXctMnhsIHB4LTRgfT5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTN4bCBzbTp0ZXh0LTR4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVgfT5cbiAgICAgICAgICAgICAgICB7ZS50aXRsZX1cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtMzAwIG10LTEuNSBsZWFkaW5nLXJlbGF4ZWRgfT57ZS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICk7XG4gIH0sXG4gIEdhbGxlcnkgPSAoKSA9PiB7XG4gICAgbGV0IFtlLCB0XSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkobnVsbCksXG4gICAgICBuID0gKGUsIHQpID0+IHtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIGBtZDpjb2wtc3Bhbi0yIG1kOnJvdy1zcGFuLTIgbWluLWgtWzM4MHB4XSBtZDptaW4taC1bNDgwcHhdYDtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gYG1kOmNvbC1zcGFuLTEgbWQ6cm93LXNwYW4tMiBtaW4taC1bMzIwcHhdIG1kOm1pbi1oLVs0ODBweF1gO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBgbWQ6Y29sLXNwYW4tMSBtZDpyb3ctc3Bhbi0xIG1pbi1oLVsyNTBweF1gO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBgbWQ6Y29sLXNwYW4tMSBtZDpyb3ctc3Bhbi0xIG1pbi1oLVsyNTBweF1gO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiBgbWQ6Y29sLXNwYW4tMiBtZDpyb3ctc3Bhbi0xIG1pbi1oLVsyNTBweF1gO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gYG1kOmNvbC1zcGFuLTEgbWQ6cm93LXNwYW4tMSBtaW4taC1bMjUwcHhdYDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb25cbiAgICAgICAgaWQ9e2BpbnN0YWxhY2lvbmVzYH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcHktMjggYmctWyMwQjBCMENdIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTgwMC84MCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5gfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHJlbGF0aXZlIHotMTBgfT5cbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB3aGlsZUluVmlldz17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICBtYXJnaW46IGAtNjBweGAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICBkdXJhdGlvbjogMC43LFxuICAgICAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG1kOml0ZW1zLWVuZCBqdXN0aWZ5LWJldHdlZW4gbWItMTYgZ2FwLTZgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWF4LXctMnhsYH0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy1bMC4yNWVtXSB1cHBlcmNhc2UgdGV4dC1bI0Q3MTkyMF0gbWItM2B9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTYgaC1bMnB4XSBiZy1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntgRVNQQUNJT1MgREUgRU5UUkVOQU1JRU5UT2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPXtgdHJ1ZWB9IGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC03MDBgfT57YMK3YH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTQwMGB9PntgR0FMRVLDjUFgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTZ4bCBsZzp0ZXh0LTd4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctWzAuOTVdYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtgQ09OT0NFIERPTkRFIENPTUlFTlpBIGB9XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bI0Q3MTkyMF1gfT57YFRVIFRSQU5TRk9STUFDScOTTi5gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtNDAwIHRleHQtYmFzZSBzbTp0ZXh0LWxnIG10LTQgbGVhZGluZy1yZWxheGVkYH1cbiAgICAgICAgICAgICAgPntgRGVzY3VicmUgbG9zIGVzcGFjaW9zIGRlIDcgU3RyZW5ndGggQ2VudGVyIHkgY29ub2NlIGVsIGx1Z2FyIGRvbmRlIHBvZHLDoXMgbGxldmFyIHR1IGVudHJlbmFtaWVudG8gYWwgc2lndWllbnRlIG5pdmVsLmB9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgcHgtNCBweS0zIGxpcXVpZC1nbGFzcyByb3VuZGVkLXhsIHRleHQteHMgdGV4dC1uZXV0cmFsLTMwMCBtYXgtdy1zbSBzaHJpbmstMCBzaGFkb3ctbGcgYm9yZGVyIGJvcmRlci13aGl0ZS8xNWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMCBhbmltYXRlLXB1bHNlIHNocmluay0wYH0gLz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgbGVhZGluZy1zbnVnYH0+XG4gICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9e2B0ZXh0LXdoaXRlYH0+e2BGb3RvZ3JhZsOtYXMgMTAwJSBSZWFsZXM6YH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7YCBDb25vY2UgbGFzIGluc3RhbGFjaW9uZXMgb2ZpY2lhbGVzIGRlIG51ZXN0cmEgc2VkZSBlbiBMb3MgTGVvbmVzIDE2NCwgQ2FqYW1hcmNhLmB9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTVgfT5cbiAgICAgICAgICAgIHtzaXRlQ29uZmlnLmdhbGxlcnlTbG90cy5tYXAoKGUsIHIpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGkgPSBuKGUuYXNwZWN0LCByKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB3aGlsZUluVmlldz17e1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IGAtNTBweGAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgICAgICAgICAgICAgICBkZWxheTogciAqIDAuMSxcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17e1xuICAgICAgICAgICAgICAgICAgICBzY2FsZTogMS4wMTUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBgc3ByaW5nYCxcbiAgICAgICAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgICBkYW1waW5nOiAyNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0KGUpfVxuICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsobikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAobi5rZXkgPT09IGBFbnRlcmAgfHwgbi5rZXkgPT09IGAgYCkgJiYgKG4ucHJldmVudERlZmF1bHQoKSwgdChlKSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICByb2xlPXtgYnV0dG9uYH1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BWZXIgZGV0YWxsZSBkZSAke2UudGl0bGV9YH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIHJlbGF0aXZlIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiBsaXF1aWQtZ2xhc3MgbGlxdWlkLWdsYXNzLWludGVyYWN0aXZlIGN1cnNvci1wb2ludGVyIHNoYWRvdy14bCBob3ZlcjpzaGFkb3ctWzBfMjBweF81MHB4X3JnYmEoMjE1LDI1LDMyLDAuMjUpXSBmbGV4IGZsZXgtY29sIGp1c3RpZnktZW5kIHAtNiBzbTpwLTcgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLVsjRDcxOTIwXSAke2l9YH1cbiAgICAgICAgICAgICAgICAgIGtleT17ZS5pZH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7ZS5zYW1wbGVJbWFnZSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgIHNyYz17ZS5zYW1wbGVJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2UudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBvYmplY3QtY2VudGVyIGZpbHRlciBicmlnaHRuZXNzLTY1IGdyb3VwLWhvdmVyOmJyaWdodG5lc3MtODUgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMCBlYXNlLW91dGB9XG4gICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17YGxhenlgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1uZXV0cmFsLTkwMCB2aWEtbmV1dHJhbC05NTAgdG8tYmxhY2tgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tWyMwQjBCMENdIHZpYS1bIzBCMEIwQ10vNjAgdG8tdHJhbnNwYXJlbnQgb3BhY2l0eS05MCBncm91cC1ob3ZlcjpvcGFjaXR5LTc1IHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDBgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQteC0wIHRvcC0wIGgtMS8zIGJnLWdyYWRpZW50LXRvLWIgZnJvbS13aGl0ZS8xMCB0by10cmFuc3BhcmVudCBvcGFjaXR5LTYwIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItYXV0b2B9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRleHQtbmV1dHJhbC0yMDAgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8yMGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7ZS5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy05IGgtOSByb3VuZGVkLWZ1bGwgbGlxdWlkLWdsYXNzIGJvcmRlciBib3JkZXItd2hpdGUvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1uZXV0cmFsLTMwMCBncm91cC1ob3Zlcjp0ZXh0LXdoaXRlIGdyb3VwLWhvdmVyOmJnLVsjRDcxOTIwXSBncm91cC1ob3Zlcjpib3JkZXItWyNENzE5MjBdIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE1heGltaXplMkljb24gY2xhc3NOYW1lPXtgdy00IGgtNGB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgbXQtNmB9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTJgfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLVsjRDcxOTIwXSBncm91cC1ob3ZlcjphbmltYXRlLXBpbmdgfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtWyNENzE5MjBdIGZvbnQtYm9sZCB0cmFja2luZy1bMC4yZW1dIHVwcGVyY2FzZWB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgSW5zdGFsYWNpw7NuIFJlYWxgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoM1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgbGVhZGluZy1ub25lIGdyb3VwLWhvdmVyOnRleHQtWyNENzE5MjBdIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7ZS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1uZXV0cmFsLTMwMCBtdC0yIGxpbmUtY2xhbXAtMiBsZWFkaW5nLXJlbGF4ZWRgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2UuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTEwIHRleHQtY2VudGVyIHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMGB9XG4gICAgICAgICAgPntgSGF6IGNsaWMgZW4gY3VhbHF1aWVyIGZvdG9ncmFmw61hIG8gZXNwYWNpbyBwYXJhIGFtcGxpYXIgYSBwYW50YWxsYSBjb21wbGV0YSBjb24gbmF2ZWdhY2nDs24gaW50ZXJhY3RpdmEuYH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxHYWxsZXJ5TGlnaHRib3hcbiAgICAgICAgICBzbG90PXtlfVxuICAgICAgICAgIHNsb3RzPXtzaXRlQ29uZmlnLmdhbGxlcnlTbG90c31cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0KG51bGwpfVxuICAgICAgICAgIG9uTmF2aWdhdGU9eyhlKSA9PiB0KGUpfVxuICAgICAgICAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH0sXG4gIFBsYW5zID0gKCkgPT4gKFxuICAgIDxzZWN0aW9uXG4gICAgICBpZD17YHBsYW5lc2B9XG4gICAgICBjbGFzc05hbWU9e2BweS0yOCBiZy1bIzBCMEIwQ10gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtODAwLzgwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVs3MDBweF0gaC1bNTAwcHhdIGJnLVsjRDcxOTIwXS8xMiBibHVyLVsxODBweF0gcG9pbnRlci1ldmVudHMtbm9uZSByb3VuZGVkLWZ1bGxgfVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgei0xMCBtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOGB9PlxuICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICBvbmNlOiAhMCxcbiAgICAgICAgICAgIG1hcmdpbjogYC02MHB4YCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtY2VudGVyIG1heC13LTN4bCBteC1hdXRvIG1iLTIwYH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy1bMC4yNWVtXSB1cHBlcmNhc2UgdGV4dC1bI0Q3MTkyMF0gbWItM2B9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy01IGgtWzJweF0gYmctWyNENzE5MjBdYH0gLz5cbiAgICAgICAgICAgIDxzcGFuPntgTUVNQlJFU8ONQVMgT0ZJQ0lBTEVTYH08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj17YHRydWVgfSBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtNzAwYH0+e2DCt2B9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTQwMGB9PntgVEFSSUZBUyBDTEFSQVNgfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctNSBoLVsycHhdIGJnLVsjRDcxOTIwXWB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC00eGwgc206dGV4dC02eGwgbGc6dGV4dC03eGwgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodCBsZWFkaW5nLVswLjk1XWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2BFTElHRSBUVSBQTEFOLiBgfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bI0Q3MTkyMF1gfT57YEVNUElFWkEgVFUgQ0FNQklPLmB9PC9zcGFuPlxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDAgdGV4dC1iYXNlIHNtOnRleHQtbGcgbXQtNCBsZWFkaW5nLXJlbGF4ZWRgfVxuICAgICAgICAgID57YEVuY3VlbnRyYSBsYSBvcGNpw7NuIHF1ZSBtZWpvciBzZSBhZGFwdGUgYSB0dSBlbnRyZW5hbWllbnRvLmB9PC9wPlxuICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC04IGxnOmdhcC0xMCBtYXgtdy00eGwgbXgtYXV0byBpdGVtcy1zdHJldGNoYH1cbiAgICAgICAgPlxuICAgICAgICAgIHtzaXRlQ29uZmlnLnBsYW5zLm1hcCgoZSwgdCkgPT4ge1xuICAgICAgICAgICAgbGV0IG4gPSBlLmlkID09PSBgcGxhbi1tZW5zdWFsYDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgIHk6IDQwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgd2hpbGVJblZpZXc9e3tcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luOiBgLTUwcHhgLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNyxcbiAgICAgICAgICAgICAgICAgIGRlbGF5OiB0ICogMC4yLFxuICAgICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7XG4gICAgICAgICAgICAgICAgICBzY2FsZTogMS4wMjUsXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGBzcHJpbmdgLFxuICAgICAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDM1MCxcbiAgICAgICAgICAgICAgICAgICAgZGFtcGluZzogMjUsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgcm91bmRlZC0zeGwgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcC04IHNtOnAtMTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNDAwICR7biA/IGBsaXF1aWQtZ2xhc3MtcmVkIHNoYWRvdy1bMF8yMHB4XzUwcHhfcmdiYSgyMTUsMjUsMzIsMC4zNSldYCA6IGBsaXF1aWQtZ2xhc3MgbGlxdWlkLWdsYXNzLWludGVyYWN0aXZlIHNoYWRvdy14bGB9YH1cbiAgICAgICAgICAgICAgICBrZXk9e2UuaWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7biAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIC10b3AtMy41IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgcHgtNCBweS0xLjUgYmctWyNENzE5MjBdIHRleHQtd2hpdGUgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRyYWNraW5nLVswLjJlbV0gdXBwZXJjYXNlIHJvdW5kZWQtZnVsbCBzaGFkb3ctbGcgc2hhZG93LXJlZC05NTAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFphcEljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgZmlsbC1jdXJyZW50YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2BQTEFOIFJFQ09NRU5EQURPYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00YH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRleHQtbmV1dHJhbC0zMDAgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBsaXF1aWQtZ2xhc3Mtc3VidGxlIGJvcmRlciBib3JkZXItd2hpdGUvMTBgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2UucGVyaW9kfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LVsjRDcxOTIwXSBmb250LWJvbGQgdHJhY2tpbmctWzAuMmVtXSB1cHBlcmNhc2VgfVxuICAgICAgICAgICAgICAgICAgICA+e2A3IFNUUkVOR1RIYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxoM1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC0zeGwgc206dGV4dC00eGwgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlIGdyb3VwLWhvdmVyOnRleHQtWyNENzE5MjBdIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMGB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtlLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIG10LTEgbWItNmB9PntlLnRhZ2xpbmV9PC9wPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwdC0yIHBiLTYgYm9yZGVyLXkgYm9yZGVyLXdoaXRlLzEwIG1iLTYgZ3JvdXAtaG92ZXI6Ym9yZGVyLXdoaXRlLzIwIHRyYW5zaXRpb24tY29sb3JzYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWJhc2VsaW5lIGdhcC0yYH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCB1cHBlcmNhc2UgZm9udC1zZW1pYm9sZGB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgUFJFQ0lPYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTV4bCBzbTp0ZXh0LTZ4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGZvbnQtYm9sZCB0YWJ1bGFyLW51bXNgfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlLmZvcm1hdHRlZFByaWNlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBtdC0xIGJsb2NrYH0+XG4gICAgICAgICAgICAgICAgICAgICAge2BEdXJhY2nDs24gb2ZpY2lhbDogYH1cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC0yMDBgfT57ZS5wZXJpb2R9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtMzAwIG1iLTYgbGVhZGluZy1yZWxheGVkYH0+e2UuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzcGFjZS15LTMuNSBtYi04YH0+XG4gICAgICAgICAgICAgICAgICAgIHtlLmZlYXR1cmVzLm1hcCgoZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtc3RhcnQgZ2FwLTMgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtbmV1dHJhbC0zMDBgfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtlfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy00IGgtNCByb3VuZGVkLWZ1bGwgYmctWyNENzE5MjBdLzIwIHRleHQtWyNENzE5MjBdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wIG10LTAuNSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIGNsYXNzTmFtZT17YHctMyBoLTMgc3Ryb2tlLVszXWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB0LTUgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwIG10LWF1dG9gfT5cbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e2Uud2hhdHNhcHBVcmx9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD17YF9ibGFua2B9XG4gICAgICAgICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gdy1mdWxsIHB5LTQgcHgtNiByb3VuZGVkLTJ4bCBmb250LWhlYWRpbmcgZm9udC1ib2xkIHRleHQtc20gc206dGV4dC1iYXNlIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgZ3JvdXAgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnIGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctd2hpdGUgJHtuID8gYGJnLVsjRDcxOTIwXSBob3ZlcjpiZy1bI0E4MEYxNV0gdGV4dC13aGl0ZSBzaGFkb3ctcmVkLTkwMC80MCBob3ZlcjpzaGFkb3ctcmVkLTkwMC83MCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwYCA6IGBsaXF1aWQtZ2xhc3MgdGV4dC13aGl0ZSBob3Zlcjpib3JkZXItWyNENzE5MjBdYH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgdy0xLzIgaC1mdWxsIGJnLXdoaXRlLzE1IHNrZXcteC0xMiAtdHJhbnNsYXRlLXgtZnVsbCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC1bMzAwJV0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTEwYH0+e2UuYnV0dG9uVGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0SWNvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgdy00IGgtNCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC0xLjUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwYH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC00MDAgdGV4dC1jZW50ZXIgYmxvY2sgbXQtM2B9XG4gICAgICAgICAgICAgICAgICA+e2BSZXNwdWVzdGEgZGlyZWN0YSBwb3IgV2hhdHNBcHAgc2luIGludGVybWVkaWFyaW9zYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB3aGlsZUluVmlldz17e1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHZpZXdwb3J0PXt7XG4gICAgICAgICAgICBvbmNlOiAhMCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXG4gICAgICAgICAgICBkZWxheTogMC40LFxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbXQtMTYgbWF4LXctMnhsIG14LWF1dG8gdGV4dC1jZW50ZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwYH1cbiAgICAgICAgPlxuICAgICAgICAgIDxTaGllbGRDaGVja0ljb24gY2xhc3NOYW1lPXtgdy00IGgtNCB0ZXh0LVsjRDcxOTIwXSBzaHJpbmstMGB9IC8+XG4gICAgICAgICAgPHNwYW4+e2BQcmVjaW9zIG9maWNpYWxlcyB0cmFuc3BhcmVudGVzLiBTaW4gbWF0csOtY3VsYSBvYmxpZ2F0b3JpYSBuaSBjb2Jyb3Mgb2N1bHRvcy5gfTwvc3Bhbj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApLFxuICBTY2hlZHVsZSA9ICgpID0+IChcbiAgICA8c2VjdGlvblxuICAgICAgaWQ9e2Bob3Jhcmlvc2B9XG4gICAgICBjbGFzc05hbWU9e2BweS0yOCBiZy1bIzBCMEIwQ10gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtODAwLzgwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMCB3LVs1MDBweF0gaC1bNTAwcHhdIGJnLVsjRDcxOTIwXS84IGJsdXItWzE4MHB4XSBwb2ludGVyLWV2ZW50cy1ub25lIHJvdW5kZWQtZnVsbGB9XG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCByZWxhdGl2ZSB6LTEwYH0+XG4gICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHk6IDMwLFxuICAgICAgICAgIH19XG4gICAgICAgICAgd2hpbGVJblZpZXc9e3tcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgIH19XG4gICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgbWFyZ2luOiBgLTYwcHhgLFxuICAgICAgICAgIH19XG4gICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgZHVyYXRpb246IDAuNyxcbiAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgbWF4LXctM3hsIG14LWF1dG8gbWItMjBgfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLVswLjI1ZW1dIHVwcGVyY2FzZSB0ZXh0LVsjRDcxOTIwXSBtYi0zYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTUgaC1bMnB4XSBiZy1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgPHNwYW4+e2BESVNQT05JQklMSURBRCBZIFRVUk5PU2B9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49e2B0cnVlYH0gY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTcwMGB9PntgwrdgfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDBgfT57YEhPUkFSSU9TIE9GSUNJQUxFU2B9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy01IGgtWzJweF0gYmctWyNENzE5MjBdYH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTZ4bCBsZzp0ZXh0LTd4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctWzAuOTVdYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YEVOVFJFTkEgQSBgfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bI0Q3MTkyMF1gfT57YFRVIFJJVE1PLmB9PC9zcGFuPlxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDAgdGV4dC1iYXNlIHNtOnRleHQtbGcgbXQtNCBsZWFkaW5nLXJlbGF4ZWRgfVxuICAgICAgICAgID57YE9yZ2FuaXphIHR1cyBlbnRyZW5hbWllbnRvcyB5IGVuY3VlbnRyYSBlbCBtZWpvciBtb21lbnRvIHBhcmEgZGFyIGxvIG3DoXhpbW8uYH08L3A+XG4gICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTIgZ2FwLTggbGc6Z2FwLTEwIG1heC13LTV4bCBteC1hdXRvIGl0ZW1zLXN0cmV0Y2hgfVxuICAgICAgICA+XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgeDogLTMwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgICAgb25jZTogITAsXG4gICAgICAgICAgICAgIG1hcmdpbjogYC01MHB4YCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSG92ZXI9e3tcbiAgICAgICAgICAgICAgc2NhbGU6IDEuMDIsXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBgc3ByaW5nYCxcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDM1MCxcbiAgICAgICAgICAgICAgICBkYW1waW5nOiAyNSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByb3VuZGVkLTN4bCBsaXF1aWQtZ2xhc3MgbGlxdWlkLWdsYXNzLWludGVyYWN0aXZlIHAtOCBzbTpwLTEwIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy14bCBob3ZlcjpzaGFkb3ctWzBfMjBweF81MHB4X3JnYmEoMjE1LDI1LDMyLDAuMildYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi02IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMGB9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNgfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMiBoLTEyIHJvdW5kZWQteGwgbGlxdWlkLWdsYXNzIGJvcmRlciBib3JkZXItd2hpdGUvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bI0Q3MTkyMF0gZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFySWNvbiBjbGFzc05hbWU9e2B3LTYgaC02YH0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtM3hsIHNtOnRleHQtNHhsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZSBsZWFkaW5nLW5vbmVgfVxuICAgICAgICAgICAgICAgICAgICA+e2BMVU5FUyBBIFZJRVJORVNgfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgZm9udC1zZW1pYm9sZCBtdC0xIGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgPntgRW50cmVuYW1pZW50byBlbnRyZSBzZW1hbmFgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LVsjRDcxOTIwXSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGxpcXVpZC1nbGFzcy1zdWJ0bGUgYm9yZGVyIGJvcmRlci1bI0Q3MTkyMF0vNDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyYH1cbiAgICAgICAgICAgICAgICA+e2AyIFR1cm5vc2B9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BweS02IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMGB9PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSB0ZXh0LWFtYmVyLTQwMCBtYi0yYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U3VuSWNvbiBjbGFzc05hbWU9e2B3LTQgaC00YH0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntgVFVSTk8gTUHDkUFOQWB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTV4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgdGFidWxhci1udW1zIGxlYWRpbmctbm9uZWB9XG4gICAgICAgICAgICAgICAgPntgNzowMCBhLiBtLiDigJMgMTowMCBwLiBtLmB9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBtdC0yYH1cbiAgICAgICAgICAgICAgICA+e2BJZGVhbCBwYXJhIGVtcGV6YXIgZWwgZMOtYSBjb24gbcOheGltYSBlbmVyZ8OtYSBhbnRlcyBkZSB0dXMgbGFib3Jlcy5gfTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BteS01IHB5LTMgcHgtNCByb3VuZGVkLXhsIGxpcXVpZC1nbGFzcy1zdWJ0bGUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXhzIHRleHQtbmV1dHJhbC0zMDBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9e2B3LTQgaC00IHRleHQtWyNENzE5MjBdIHNocmluay0wYH0gLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BsZWFkaW5nLXNudWdgfT5cbiAgICAgICAgICAgICAgICAgIHtgUGF1c2EgaW50ZXJtZWRpYSBkZSBtYW50ZW5pbWllbnRvIHkgZGVzY2Fuc286IGB9XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT17YHRleHQtd2hpdGVgfT57YDE6MDAgcC4gbS4gYSAzOjAwIHAuIG0uYH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB5LTRgfT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB1cHBlcmNhc2UgdGV4dC1yb3NlLTQwMCBtYi0yYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TW9vbkljb24gY2xhc3NOYW1lPXtgdy00IGgtNGB9IC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57YFRVUk5PIFRBUkRFYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtNHhsIHNtOnRleHQtNXhsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZSB0YWJ1bGFyLW51bXMgbGVhZGluZy1ub25lYH1cbiAgICAgICAgICAgICAgICA+e2AzOjAwIHAuIG0uIOKAkyA5OjAwIHAuIG0uYH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIG10LTJgfVxuICAgICAgICAgICAgICAgID57YEhvcmFyaW8gZGUgbcOheGltYSBpbnRlbnNpZGFkIHBhcmEgY29tcGxldGFyIHR1IGpvcm5hZGEgZGUgcGVzYXMuYH08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB0LTYgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwIHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj57YEFjY2VzbyBwZXJtaXRpZG8gZW4gYW1ib3MgdHVybm9zIGNvbiB0dSBtZW1icmVzw61hLmB9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgIHg6IDMwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgICAgb25jZTogITAsXG4gICAgICAgICAgICAgIG1hcmdpbjogYC01MHB4YCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSG92ZXI9e3tcbiAgICAgICAgICAgICAgc2NhbGU6IDEuMDIsXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBgc3ByaW5nYCxcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDM1MCxcbiAgICAgICAgICAgICAgICBkYW1waW5nOiAyNSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByb3VuZGVkLTN4bCBsaXF1aWQtZ2xhc3MgbGlxdWlkLWdsYXNzLWludGVyYWN0aXZlIHAtOCBzbTpwLTEwIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy14bCBob3ZlcjpzaGFkb3ctWzBfMjBweF81MHB4X3JnYmEoMCwwLDAsMC42KV1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcGItOCBib3JkZXItYiBib3JkZXItd2hpdGUvMTBgfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00YH0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0zYH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEyIGgtMTIgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsjRDcxOTIwXSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9e2B3LTYgaC02YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC0zeGwgc206dGV4dC00eGwgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlIGxlYWRpbmctbm9uZWB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgU8OBQkFET1NgfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGZvbnQtc2VtaWJvbGQgbXQtMSBibG9ja2B9XG4gICAgICAgICAgICAgICAgICAgICAgPntgRmluIGRlIHNlbWFuYSBhY3Rpdm9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItNDAwIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgbGlxdWlkLWdsYXNzLXN1YnRsZSBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMC80MCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJgfVxuICAgICAgICAgICAgICAgICAgPntgTWF0dXRpbm9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB0LTJgfT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRleHQtYW1iZXItNDAwIG1iLTJgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8U3VuSWNvbiBjbGFzc05hbWU9e2B3LTQgaC00YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2BUVVJOTyBDT05USU5VT2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTV4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgdGFidWxhci1udW1zIGxlYWRpbmctbm9uZWB9XG4gICAgICAgICAgICAgICAgICA+e2A4OjAwIGEuIG0uIOKAkyAxOjAwIHAuIG0uYH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBtdC0yYH1cbiAgICAgICAgICAgICAgICAgID57YEVudHJlbmEgdGVtcHJhbm8gZW4gc8OhYmFkbyB5IG1hbnTDqW4gdHUgY29uc3RhbmNpYSBzaW4gaW50ZXJydXBjaW9uZXMuYH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB0LTZgfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgbWItM2B9PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTggaC04IHJvdW5kZWQtbGcgbGlxdWlkLWdsYXNzIGJvcmRlciBib3JkZXItd2hpdGUvMTUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1hbWJlci00MDBgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2lyY2xlUXVlc3Rpb25NYXJrSWNvbiBjbGFzc05hbWU9e2B3LTQgaC00YH0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg0XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtMnhsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZWB9XG4gICAgICAgICAgICAgICAgICAgID57YERPTUlOR09TYH08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtYW1iZXItNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJgfVxuICAgICAgICAgICAgICAgICAgICA+e2BIb3JhcmlvIG5vIGNvbmZpcm1hZG9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC0zMDAgbGVhZGluZy1yZWxheGVkIG1iLTZgfVxuICAgICAgICAgICAgICAgID57YFBhcmEgZ2FyYW50aXphciBsYSBleGFjdGl0dWQgZGUgdHUgdmlzaXRhIHkgZXZpdGFyIHRyYXNsYWRvcyBpbm5lY2VzYXJpb3MsIGNvbnPDumx0YW5vcyBkaXJlY3RhbWVudGUgcG9yIFdoYXRzQXBwIGFudGVzIGRlIGFjdWRpciBlbiBkb21pbmdvLmB9PC9wPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPXt3aGF0c2FwcFVybChcbiAgICAgICAgICAgICAgICAgICAgYEhvbGEsIHF1aXNpZXJhIGNvbnN1bHRhciBzaSA3IFN0cmVuZ3RoIENlbnRlciBhYnJlIGVzdGUgZG9taW5nby5gLFxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHRhcmdldD17YF9ibGFua2B9XG4gICAgICAgICAgICAgICAgICByZWw9e2Bub29wZW5lciBub3JlZmVycmVyYH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0zLjUgcHgtNSByb3VuZGVkLXhsIGxpcXVpZC1nbGFzcyBob3ZlcjpiZy1bI0Q3MTkyMF0gYm9yZGVyIGJvcmRlci13aGl0ZS8yMCBob3Zlcjpib3JkZXItWyNENzE5MjBdIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbWQgZ3JvdXAvYnRuYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TWVzc2FnZUNpcmNsZUljb25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy00IGgtNCB0ZXh0LVsjRDcxOTIwXSBncm91cC1ob3Zlci9idG46dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc2B9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2BDT05TVUxUQVIgRElTUE9OSUJJTElEQUQgRE9NSU5JQ0FMYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8QXJyb3dSaWdodEljb25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgZ3JvdXAtaG92ZXIvYnRuOnRyYW5zbGF0ZS14LTEgdHJhbnNpdGlvbi10cmFuc2Zvcm1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB0LTYgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwIHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj57YFJlc3B1ZXN0YXMgZGlyZWN0YXMgcG9yIFdoYXRzQXBwIG9maWNpYWwuYH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTQwMGB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApLFxuICBDb21tdW5pdHkgPSAoKSA9PiB7XG4gICAgbGV0IFtlLCB0XSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkobnVsbCksXG4gICAgICBuID0gKGUpID0+IHtcbiAgICAgICAgdCgodCkgPT4gKHQgPT09IGUgPyBudWxsIDogZSkpO1xuICAgICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb25cbiAgICAgICAgaWQ9e2Bjb211bmlkYWRgfVxuICAgICAgICBjbGFzc05hbWU9e2BweS0yOCBiZy1bIzBCMEIwQ10gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtODAwLzgwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMS8yIHJpZ2h0LTEvNCB3LVs2MDBweF0gaC1bNTAwcHhdIGJnLVsjRDcxOTIwXS84IGJsdXItWzE4MHB4XSBwb2ludGVyLWV2ZW50cy1ub25lIHJvdW5kZWQtZnVsbGB9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcmVsYXRpdmUgei0xMGB9PlxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgIHk6IDMwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgICAgb25jZTogITAsXG4gICAgICAgICAgICAgIG1hcmdpbjogYC02MHB4YCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBtYi0xNiBnYXAtNmB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYXgtdy0yeGxgfT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLVswLjI1ZW1dIHVwcGVyY2FzZSB0ZXh0LVsjRDcxOTIwXSBtYi0zYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctNSBoLVsycHhdIGJnLVsjRDcxOTIwXWB9IC8+XG4gICAgICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjVgfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntgQ09NVU5JREFEIE9GSUNJQUxgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj17YHRydWVgfSBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtNzAwYH0+e2DCt2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDBgfT57YEA3c3RyZW5ndGhgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTZ4bCBsZzp0ZXh0LTd4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctWzAuOTVdYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtgVklWRSBMQSBFWFBFUklFTkNJQSBgfVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWyNENzE5MjBdYH0+e2A3IFNUUkVOR1RILmB9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtbmV1dHJhbC00MDAgdGV4dC1iYXNlIHNtOnRleHQtbGcgbXQtNCBsZWFkaW5nLXJlbGF4ZWRgfVxuICAgICAgICAgICAgICA+e2BFbnRyZW5hbWllbnRvcywgZW5lcmfDrWEgeSBtb21lbnRvcyBxdWUgZm9ybWFuIHBhcnRlIGRlIG51ZXN0cmEgY29tdW5pZGFkLmB9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bW90aW9uLmFcbiAgICAgICAgICAgICAgd2hpbGVIb3Zlcj17e1xuICAgICAgICAgICAgICAgIHNjYWxlOiAxLjAzLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB3aGlsZVRhcD17e1xuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjk3LFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBocmVmPXtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1Vcmx9XG4gICAgICAgICAgICAgIHRhcmdldD17YF9ibGFua2B9XG4gICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNiBweS0zLjUgcm91bmRlZC0yeGwgYmctbmV1dHJhbC05MDAgaG92ZXI6YmctbmV1dHJhbC04MDAgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTcwMC84MCBob3Zlcjpib3JkZXItWyNENzE5MjBdIHRleHQtbmV1dHJhbC0yMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB1cHBlcmNhc2Ugc2hyaW5rLTAgc2hhZG93LXhsYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gY2xhc3NOYW1lPXtgdy00IGgtNCB0ZXh0LVsjRDcxOTIwXWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPntgU8ONR1VFTk9TIEVOIElOU1RBR1JBTWB9PC9zcGFuPlxuICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rSWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSB0ZXh0LW5ldXRyYWwtNDAwYH0gLz5cbiAgICAgICAgICAgIDwvbW90aW9uLmE+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTYgbGc6Z2FwLTggb3ZlcmZsb3cteC1hdXRvIHBiLTQgbWQ6cGItMCBzbmFwLXggc25hcC1tYW5kYXRvcnlgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtzaXRlQ29uZmlnLnJlZWxzLm1hcCgodCwgcikgPT4ge1xuICAgICAgICAgICAgICBsZXQgaSA9IGUgPT09IHQuaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogNDAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgd2hpbGVJblZpZXc9e3tcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB2aWV3cG9ydD17e1xuICAgICAgICAgICAgICAgICAgICBvbmNlOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBgLTUwcHhgLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNixcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IHIgKiAwLjE1LFxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB3aGlsZUhvdmVyPXt7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLjAyLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogYHNwcmluZ2AsXG4gICAgICAgICAgICAgICAgICAgICAgc3RpZmZuZXNzOiAzNTAsXG4gICAgICAgICAgICAgICAgICAgICAgZGFtcGluZzogMjUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGxpcXVpZC1nbGFzcyBsaXF1aWQtZ2xhc3MtaW50ZXJhY3RpdmUgc2hhZG93LTJ4bCBob3ZlcjpzaGFkb3ctWzBfMjBweF81MHB4X3JnYmEoMjE1LDI1LDMyLDAuMjUpXSBmbGV4IGZsZXgtY29sIHNuYXAtY2VudGVyIG1pbi13LVsyODBweF1gfVxuICAgICAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy1mdWxsIGFzcGVjdC1bOS8xNl0gbWF4LWgtWzU2MHB4XSBiZy1uZXV0cmFsLTk1MC84MCBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aSA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2BodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL3JlZWwvJHt0LnJlZWxDb2RlfS9lbWJlZC9gfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtZnVsbCBib3JkZXItMGB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvdz17YGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWFgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXtgbGF6eWB9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB3LWZ1bGwgaC1mdWxsIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHAtNiBzbTpwLTcgYmctZ3JhZGllbnQtdG8tYiBmcm9tLW5ldXRyYWwtOTAwLzYwIHZpYS1uZXV0cmFsLTk1MC84MCB0by1ibGFjayBzZWxlY3Qtbm9uZWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktMjAgYmctW3JhZGlhbC1ncmFkaWVudCgjRDcxOTIwXzFweCx0cmFuc3BhcmVudF8xcHgpXSBbYmFja2dyb3VuZC1zaXplOjE2cHhfMTZweF0gcG9pbnRlci1ldmVudHMtbm9uZWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8yMCB0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTIwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2BSZWVsIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ciArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LW5ldXRyYWwtNDAwYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3QucmVlbENvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTEwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyIG15LWF1dG9gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlSG92ZXI9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLjE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGVUYXA9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAwLjk1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbih0LmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB3LTE2IGgtMTYgc206dy0xOCBzbTpoLTE4IHJvdW5kZWQtZnVsbCBiZy1bI0Q3MTkyMF0gaG92ZXI6YmctWyNBODBGMTVdIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LVswXzBfMzVweF9yZ2JhKDIxNSwyNSwzMiwwLjYpXSBjdXJzb3ItcG9pbnRlciBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctd2hpdGUvNDAgbWItMyBib3JkZXIgYm9yZGVyLXdoaXRlLzIwYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgUmVwcm9kdWNpciAke3QudGl0bGV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbGF5SWNvbiBjbGFzc05hbWU9e2B3LTcgaC03IHNtOnctOCBzbTpoLTggZmlsbC1jdXJyZW50IG1sLTFgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtbmV1dHJhbC0zMDAgZm9udC1zZW1pYm9sZCBtdC0xYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPntgVG9jYSBwYXJhIHJlcHJvZHVjaXJgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTEwYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzEwcHhdIHRleHQtWyNENzE5MjBdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXNJY29uIGNsYXNzTmFtZT17YHctMyBoLTNgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntgQ29udGVuaWRvIE9maWNpYWxgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoM1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgbGVhZGluZy10aWdodCBtYi0yIGdyb3VwLWhvdmVyOnRleHQtWyNENzE5MjBdIHRyYW5zaXRpb24tY29sb3JzYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC0zMDAgbGluZS1jbGFtcC0yIGxlYWRpbmctcmVsYXhlZGB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2kgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG4odC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMyByaWdodC0zIHotMzAgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBsaXF1aWQtZ2xhc3MgdGV4dC1bMTFweF0gdGV4dC1uZXV0cmFsLTMwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BDZXJyYXIgcmVwcm9kdWN0b3JgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCBzbTpwLTUgbGlxdWlkLWdsYXNzLXN1YnRsZSBib3JkZXItdCBib3JkZXItd2hpdGUvMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sYH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIHRleHQtWyNENzE5MjBdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJgfVxuICAgICAgICAgICAgICAgICAgICAgID57YEluc3RhZ3JhbSBPZmljaWFsYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtMjAwYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BAN3N0cmVuZ3RoYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e3QudXJsfVxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD17YF9ibGFua2B9XG4gICAgICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMy41IHB5LTIgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgaG92ZXI6YmctWyNENzE5MjBdIGJvcmRlciBib3JkZXItd2hpdGUvMTUgdGV4dC1uZXV0cmFsLTIwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0cmFuc2l0aW9uLWNvbG9ycyBzaHJpbmstMCBzaGFkb3dgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2BBQlJJUiBFTiBJR2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbExpbmtJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgeTogMzAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgd2hpbGVJblZpZXc9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB2aWV3cG9ydD17e1xuICAgICAgICAgICAgICBvbmNlOiAhMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgIGRlbGF5OiAwLjMsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXQtMTYgcm91bmRlZC0zeGwgbGlxdWlkLWdsYXNzIHAtOCBzbTpwLTEwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNiBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItd2hpdGUvMTVgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTVgfT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTQgaC0xNCByb3VuZGVkLTJ4bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci1bI0Q3MTkyMF0vNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bI0Q3MTkyMF0gc2hyaW5rLTBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gY2xhc3NOYW1lPXtgdy03IGgtN2B9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoNFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtMnhsIHNtOnRleHQtM3hsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZWB9XG4gICAgICAgICAgICAgICAgPntgw5pORVRFIEEgTlVFU1RSQSBDT01VTklEQUQgRU4gUkVERVNgfTwvaDQ+XG4gICAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtc20gdGV4dC1uZXV0cmFsLTQwMCBtdC0xYH1cbiAgICAgICAgICAgICAgICA+e2BQdWJsaWNhY2lvbmVzLCB0w6ljbmljYXMgZGUgbGV2YW50YW1pZW50byB5IG5vdmVkYWRlcyBleGNsdXNpdmFzIGVuIG51ZXN0cm8gcGVyZmlsIG9maWNpYWwuYH08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGdhcC0zIHctZnVsbCBtZDp3LWF1dG9gfT5cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBocmVmPXtzaXRlQ29uZmlnLnNvY2lhbC5mZWF0dXJlZFBvc3RVcmx9XG4gICAgICAgICAgICAgICAgdGFyZ2V0PXtgX2JsYW5rYH1cbiAgICAgICAgICAgICAgICByZWw9e2Bub29wZW5lciBub3JlZmVycmVyYH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgc206dy1hdXRvIHRleHQtY2VudGVyIHB4LTUgcHktMy41IHJvdW5kZWQteGwgbGlxdWlkLWdsYXNzLXN1YnRsZSBob3ZlcjpiZy1uZXV0cmFsLTgwMCB0ZXh0LW5ldXRyYWwtMzAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB1cHBlcmNhc2UgdHJhbnNpdGlvbi1jb2xvcnNgfVxuICAgICAgICAgICAgICA+e2BWRVIgUFVCTElDQUNJw5NOIERFU1RBQ0FEQWB9PC9hPlxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGhyZWY9e3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbVVybH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBzbTp3LWF1dG8gdGV4dC1jZW50ZXIgcHgtNiBweS0zLjUgcm91bmRlZC14bCBiZy1bI0Q3MTkyMF0gaG92ZXI6YmctWyNBODBGMTVdIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctWzBfMTBweF8zMHB4X3JnYmEoMjE1LDI1LDMyLDAuMyldIGhvdmVyOnNoYWRvdy1bMF8xNXB4XzQwcHhfcmdiYSgyMTUsMjUsMzIsMC41KV0gdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IGJvcmRlciBib3JkZXItd2hpdGUvMjBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2BTRUdVSVIgQDdTVFJFTkdUSGB9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0SWNvbiBjbGFzc05hbWU9e2B3LTQgaC00YH0gLz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTggZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIHRleHQtY2VudGVyYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2tJY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1bI0Q3MTkyMF0gc2hyaW5rLTBgfSAvPlxuICAgICAgICAgICAgPHNwYW4+e2BJbnRlZ3JhY2nDs24gZGlyZWN0YSBjb24gbG9zIHRyZXMgcmVlbHMgdmVyaWZpY2Fkb3MgZGUgNyBTdHJlbmd0aCBDZW50ZXIgZW4gSW5zdGFncmFtYH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH0sXG4gIENvbnRhY3QgPSAoKSA9PiB7XG4gICAgbGV0IFtlLCB0XSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkobnVsbCksXG4gICAgICBuID0gKGUsIG4pID0+IHtcbiAgICAgICAgKG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGUpLCB0KG4pLCBzZXRUaW1lb3V0KCgpID0+IHQobnVsbCksIDI1MDApKTtcbiAgICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWN0aW9uXG4gICAgICAgIGlkPXtgY29udGFjdG9gfVxuICAgICAgICBjbGFzc05hbWU9e2BweS0yOCBiZy1bIzBCMEIwQ10gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtODAwLzgwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbmB9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcmVsYXRpdmUgei0xMGB9PlxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgIHk6IDMwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdmlld3BvcnQ9e3tcbiAgICAgICAgICAgICAgb25jZTogITAsXG4gICAgICAgICAgICAgIG1hcmdpbjogYC02MHB4YCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YG1iLTE2YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLVswLjI1ZW1dIHVwcGVyY2FzZSB0ZXh0LVsjRDcxOTIwXSBtYi0zYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy01IGgtWzJweF0gYmctWyNENzE5MjBdYH0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2BFTkNVw4lOVFJBTk9TIEVOIENBSkFNQVJDQWB9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj17YHRydWVgfSBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtNzAwYH0+e2DCt2B9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LW5ldXRyYWwtNDAwYH0+e2BVQklDQUNJw5NOIFkgQ09OVEFDVE9gfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTR4bCBzbTp0ZXh0LTZ4bCBsZzp0ZXh0LTd4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctWzAuOTVdYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2BFU1RBTU9TIExJU1RPUyBgfVxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsjRDcxOTIwXWB9PntgUEFSQSBSRUNJQklSVEUuYH08L3NwYW4+XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTQwMCB0ZXh0LWJhc2Ugc206dGV4dC1sZyBtdC00IGxlYWRpbmctcmVsYXhlZCBtYXgtdy0yeGxgfVxuICAgICAgICAgICAgPntgVmlzw610YW5vcyBlbiBudWVzdHJhcyBpbnN0YWxhY2lvbmVzIG8gZXNjcsOtYmVub3MgZGlyZWN0YW1lbnRlIHBvciBXaGF0c0FwcCBwYXJhIGNvb3JkaW5hciB0dSBwcmltZXIgZMOtYSBkZSBlbnRyZW5hbWllbnRvLmB9PC9wPlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC0xMCBpdGVtcy1zdHJldGNoYH0+XG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB4OiAtMzAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB2aWV3cG9ydD17e1xuICAgICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogYC01MHB4YCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcm91bmRlZC0zeGwgbGlxdWlkLWdsYXNzIHAtOCBzbTpwLTEwIHNoYWRvdy0yeGwgaG92ZXI6Ym9yZGVyLXdoaXRlLzI1IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCBwYi02IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMGB9PlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9e3NpdGVDb25maWcubG9nb1BhdGh9XG4gICAgICAgICAgICAgICAgICAgIGFsdD17YExvZ28gNyBTdHJlbmd0aCBDZW50ZXJgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTE0IGgtMTQgb2JqZWN0LWNvbnRhaW4gcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgcC0xLjUgYm9yZGVyIGJvcmRlci13aGl0ZS8yMCBzaGFkb3dgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoM1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgbGVhZGluZy1ub25lYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtzaXRlQ29uZmlnLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LVsjRDcxOTIwXSBmb250LWJvbGQgdHJhY2tpbmctWzAuMmVtXSB1cHBlcmNhc2UgbXQtMSBibG9ja2B9XG4gICAgICAgICAgICAgICAgICAgID57YENhamFtYXJjYSDCtyBQZXLDumB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzcGFjZS15LTYgbXktOGB9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00YH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTExIGgtMTEgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsjRDcxOTIwXSBzaHJpbmstMCBtdC0wLjVgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPE1hcFBpbkljb24gY2xhc3NOYW1lPXtgdy01IGgtNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXgtMWB9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1uZXV0cmFsLTQwMCBmb250LXNlbWlib2xkIGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BEaXJlY2Npw7NuIE9maWNpYWxgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBtdC0wLjVgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaXRlQ29uZmlnLmFkZHJlc3N9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG4oc2l0ZUNvbmZpZy5hZGRyZXNzLCBgYWRkcmVzc2ApfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXQtMS41IHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyYH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZSA9PT0gYGFkZHJlc3NgID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8anN4UnVudGltZS5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPntgQ29waWFkbyBhbCBwb3J0YXBhcGVsZXNgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9qc3hSdW50aW1lLkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGpzeFJ1bnRpbWUuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvcHlJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57YENvcGlhciBkaXJlY2Npw7NuYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvanN4UnVudGltZS5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtc3RhcnQgZ2FwLTRgfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTEgaC0xMSByb3VuZGVkLXhsIGxpcXVpZC1nbGFzcyBib3JkZXIgYm9yZGVyLXdoaXRlLzE1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZW1lcmFsZC00MDAgc2hyaW5rLTAgbXQtMC41YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxQaG9uZUljb24gY2xhc3NOYW1lPXtgdy01IGgtNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXgtMWB9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1uZXV0cmFsLTQwMCBmb250LXNlbWlib2xkIGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BXaGF0c0FwcCBPZmljaWFsYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e3doYXRzYXBwVXJsKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgaG92ZXI6dGV4dC1lbWVyYWxkLTQwMCB0cmFuc2l0aW9uLWNvbG9ycyBpbmxpbmUtYmxvY2sgbXQtMC41YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2l0ZUNvbmZpZy5waG9uZS5kaXNwbGF5fVxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuKHNpdGVDb25maWcucGhvbmUuZGlzcGxheSwgYHBob25lYCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtdC0xLjUgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIGhvdmVyOnRleHQtd2hpdGUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgbWwtM2B9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2UgPT09IGBwaG9uZWAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxqc3hSdW50aW1lLkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMGB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRgfT57YENvcGlhZG9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9qc3hSdW50aW1lLkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGpzeFJ1bnRpbWUuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvcHlJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57YENvcGlhcmB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2pzeFJ1bnRpbWUuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00YH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTExIGgtMTEgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsjRDcxOTIwXSBzaHJpbmstMCBtdC0wLjVgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPENsb2NrSWNvbiBjbGFzc05hbWU9e2B3LTUgaC01YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleC0xYH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LW5ldXRyYWwtNDAwIGZvbnQtc2VtaWJvbGQgYmxvY2tgfVxuICAgICAgICAgICAgICAgICAgICAgID57YEhvcmFyaW9zIFJlc3VtaWRvc2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTMwMCBtdC0xYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPntgTC1WOmB9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YCA3OjAwIGFtIOKAkyAxOjAwIHBtIC8gMzowMCBwbSDigJMgOTowMCBwbWB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTMwMCBtdC0wLjVgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e2BTw6FiYWRvczpgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAge2AgODowMCBhbSDigJMgMTowMCBwbWB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00YH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTExIGgtMTEgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsjRDcxOTIwXSBzaHJpbmstMCBtdC0wLjVgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEluc3RhZ3JhbUljb24gY2xhc3NOYW1lPXtgdy01IGgtNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXgtMWB9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1uZXV0cmFsLTQwMCBmb250LXNlbWlib2xkIGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BJbnN0YWdyYW1gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtVXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PXtgX2JsYW5rYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgaG92ZXI6dGV4dC1bI0Q3MTkyMF0gdHJhbnNpdGlvbi1jb2xvcnMgbXQtMC41IGlubGluZS1ibG9ja2B9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NpdGVDb25maWcuc29jaWFsLmluc3RhZ3JhbUhhbmRsZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB0LTYgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwYH0+XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3doYXRzYXBwVXJsKCl9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gdy1mdWxsIHB5LTQgcHgtNiByb3VuZGVkLTJ4bCBiZy1bI0Q3MTkyMF0gaG92ZXI6YmctWyNBODBGMTVdIHRleHQtd2hpdGUgZm9udC1oZWFkaW5nIGZvbnQtYm9sZCB0ZXh0LWJhc2UgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctWzBfMTBweF8zMHB4X3JnYmEoMjE1LDI1LDMyLDAuMyldIGhvdmVyOnNoYWRvdy1bMF8xNXB4XzQwcHhfcmdiYSgyMTUsMjUsMzIsMC41KV0gdHJhbnNmb3JtIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItd2hpdGUvMjBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgdy0xLzIgaC1mdWxsIGJnLXdoaXRlLzE1IHNrZXcteC0xMiAtdHJhbnNsYXRlLXgtZnVsbCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC1bMzAwJV0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTBgfT57YENPTlRBQ1RBUiBQT1IgV0hBVFNBUFBgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgeDogMzAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHdoaWxlSW5WaWV3PXt7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB2aWV3cG9ydD17e1xuICAgICAgICAgICAgICAgIG9uY2U6ICEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogYC01MHB4YCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTcgZmxleCBmbGV4LWNvbCByb3VuZGVkLTN4bCBvdmVyZmxvdy1oaWRkZW4gbGlxdWlkLWdsYXNzIGJvcmRlciBib3JkZXItd2hpdGUvMTUgc2hhZG93LTJ4bGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgc206cC01IGxpcXVpZC1nbGFzcy1zdWJ0bGUgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbmB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVgfT5cbiAgICAgICAgICAgICAgICAgIDxNYXBQaW5JY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB0cmFja2luZy13aWRlciB1cHBlcmNhc2VgfVxuICAgICAgICAgICAgICAgICAgPntgVWJpY2FjacOzbiBlbiBHb29nbGUgTWFwc2B9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMXB4XSB0ZXh0LW5ldXRyYWwtNDAwYH1cbiAgICAgICAgICAgICAgICA+e2BMb3MgTGVvbmVzIDE2NCwgQ2FqYW1hcmNhYH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy1mdWxsIGZsZXgtMSBtaW4taC1bMzUwcHhdIHNtOm1pbi1oLVs0MjBweF0gYmctbmV1dHJhbC05NTBgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGlmcmFtZVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2BNYXBhIG9maWNpYWwgZGUgdWJpY2FjacOzbiA3IFN0cmVuZ3RoIENlbnRlciBlbiBDYWphbWFyY2FgfVxuICAgICAgICAgICAgICAgICAgd2lkdGg9e2AxMDAlYH1cbiAgICAgICAgICAgICAgICAgIGhlaWdodD17YDEwMCVgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtZnVsbCBib3JkZXItMCBmaWx0ZXIgY29udHJhc3QtMTI1IGJyaWdodG5lc3MtOTAgZ3JheXNjYWxlLVswLjJdYH1cbiAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2BsYXp5YH1cbiAgICAgICAgICAgICAgICAgIGFsbG93RnVsbFNjcmVlbj17ITB9XG4gICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT17YG5vLXJlZmVycmVyLXdoZW4tZG93bmdyYWRlYH1cbiAgICAgICAgICAgICAgICAgIHNyYz17YGh0dHBzOi8vbWFwcy5nb29nbGUuY29tL21hcHM/cT1Mb3MrTGVvbmVzKzE2NCwrQ2FqYW1hcmNhKzA2MDAyLCtQZXJ1JnQ9Jno9MTYmaWU9VVRGOCZpd2xvYz0mb3V0cHV0PWVtYmVkYH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNiBzbTpwLTggbGlxdWlkLWdsYXNzLXN1YnRsZSBib3JkZXItdCBib3JkZXItd2hpdGUvMTAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtMnhsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZWB9XG4gICAgICAgICAgICAgICAgICA+e2DCv1BMQU5FQVMgVklTSVRBUk5PUz9gfTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC00MDAgbXQtMC41YH1cbiAgICAgICAgICAgICAgICAgID57YEFicmUgbGEgcnV0YSBkaXJlY3RhIGVuIHR1IGFwbGljYWNpw7NuIGRlIEdvb2dsZSBNYXBzIHkgbGxlZ2Egc2luIGNvbXBsaWNhY2lvbmVzLmB9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPXtzaXRlQ29uZmlnLmdvb2dsZU1hcHNVcmx9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgc206dy1hdXRvIHB4LTcgcHktNCByb3VuZGVkLXhsIGJnLXdoaXRlIGhvdmVyOmJnLW5ldXRyYWwtMjAwIHRleHQtbmV1dHJhbC05NTAgZm9udC1oZWFkaW5nIGZvbnQtYm9sZCB0ZXh0LXNtIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hyaW5rLTAgc2hhZG93LWxnIHRyYW5zZm9ybSBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPE5hdmlnYXRpb25JY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2BDw5NNTyBMTEVHQVJgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICApO1xuICB9LFxuICBGb290ZXIgPSAoKSA9PiAoXG4gICAgPGZvb3RlciBjbGFzc05hbWU9e2BiZy1bIzA3MDcwOF0gYm9yZGVyLXQgYm9yZGVyLW5ldXRyYWwtOTAwIHRleHQtbmV1dHJhbC00MDAgdGV4dC1zbWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS0xNmB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMTIgZ2FwLTEwIGxnOmdhcC04IHBiLTEyIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTkwMGB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTUgZmxleCBmbGV4LWNvbCBpdGVtcy1zdGFydGB9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi00YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0xMiBoLTEyIHJvdW5kZWQtbGcgYmctbmV1dHJhbC05MDAgcC0xIGJvcmRlciBib3JkZXItbmV1dHJhbC04MDBgfT5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9e3NpdGVDb25maWcubG9nb1BhdGh9XG4gICAgICAgICAgICAgICAgICBhbHQ9e2BMb2dvIG9maWNpYWwgNyBTdHJlbmd0aCBDZW50ZXJgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbmB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtZGlzcGxheSB0ZXh0LTJ4bCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyIGJsb2NrIGZvbnQtYm9sZCBsZWFkaW5nLW5vbmVgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtzaXRlQ29uZmlnLm5hbWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtWyNENzE5MjBdIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSBtdC0wLjUgYmxvY2tgfVxuICAgICAgICAgICAgICAgID57YENhamFtYXJjYSDCtyBQZXLDumB9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1uZXV0cmFsLTQwMCB0ZXh0LWJhc2UgZm9udC1tZWRpdW0gaXRhbGljIG10LTJgfVxuICAgICAgICAgICAgPntgXCJGdWVyemEsIGRpc2NpcGxpbmEgeSBzdXBlcmFjacOzbi5cImB9PC9wPlxuICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyB0ZXh0LW5ldXRyYWwtMzAwIG10LTMgbWF4LXctc20gbGVhZGluZy1yZWxheGVkYH1cbiAgICAgICAgICAgID57YEVzcGFjaW8gZGUgZW50cmVuYW1pZW50byBkZWRpY2FkbyBhIHF1aWVuZXMgYnVzY2FuIG1lam9yYXIgc3UgY29uZGljacOzbiBmw61zaWNhLCByb21wZXIgc3VzIG1hcmNhcyB5IGNvbnN0cnVpciB1bmEgdmVyc2nDs24gbcOhcyBmdWVydGUgZGUgc8OtIG1pc21vcy5gfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTNgfT5cbiAgICAgICAgICAgIDxoNFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC1sZyB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBtYi00YH1cbiAgICAgICAgICAgID57YE5hdmVnYWNpw7NuYH08L2g0PlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17YHNwYWNlLXktMiB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlcmB9PlxuICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBgSW5pY2lvYCxcbiAgICAgICAgICAgICAgICAgIGhyZWY6IGAjaW5pY2lvYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBgTm9zb3Ryb3NgLFxuICAgICAgICAgICAgICAgICAgaHJlZjogYCNub3NvdHJvc2AsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogYEluc3RhbGFjaW9uZXNgLFxuICAgICAgICAgICAgICAgICAgaHJlZjogYCNpbnN0YWxhY2lvbmVzYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBgUGxhbmVzYCxcbiAgICAgICAgICAgICAgICAgIGhyZWY6IGAjcGxhbmVzYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBgSG9yYXJpb3NgLFxuICAgICAgICAgICAgICAgICAgaHJlZjogYCNob3Jhcmlvc2AsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogYENvbXVuaWRhZGAsXG4gICAgICAgICAgICAgICAgICBocmVmOiBgI2NvbXVuaWRhZGAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogYENvbnRhY3RvYCxcbiAgICAgICAgICAgICAgICAgIGhyZWY6IGAjY29udGFjdG9gLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0ubWFwKChlKSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17ZS5ocmVmfT5cbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e2UuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjp0cmFuc2xhdGUteC0xIGlubGluZS1ibG9jayB0cmFuc2l0aW9uLXRyYW5zZm9ybWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtlLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGxnOmNvbC1zcGFuLTRgfT5cbiAgICAgICAgICAgIDxoNFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWRpc3BsYXkgdGV4dC1sZyB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBtYi00YH1cbiAgICAgICAgICAgID57YEluZm9ybWFjacOzbiBPZmljaWFsYH08L2g0PlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17YHNwYWNlLXktMyB0ZXh0LXhzIHRleHQtbmV1dHJhbC00MDBgfT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtc3RhcnQgZ2FwLTIuNWB9PlxuICAgICAgICAgICAgICAgIDxNYXBQaW5JY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1bI0Q3MTkyMF0gc2hyaW5rLTAgbXQtMC41YH0gLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57c2l0ZUNvbmZpZy5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVgfT5cbiAgICAgICAgICAgICAgICA8UGhvbmVJY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMGB9IC8+XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3doYXRzYXBwVXJsKCl9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgICAgICAgICAgcmVsPXtgbm9vcGVuZXIgbm9yZWZlcnJlcmB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC0zMDBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtgV2hhdHNBcHA6IGB9XG4gICAgICAgICAgICAgICAgICB7c2l0ZUNvbmZpZy5waG9uZS5kaXNwbGF5fVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVgfT5cbiAgICAgICAgICAgICAgICA8SW5zdGFncmFtSWNvbiBjbGFzc05hbWU9e2B3LTQgaC00IHRleHQtWyNENzE5MjBdIHNocmluay0wYH0gLz5cbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgaHJlZj17c2l0ZUNvbmZpZy5zb2NpYWwuaW5zdGFncmFtVXJsfVxuICAgICAgICAgICAgICAgICAgdGFyZ2V0PXtgX2JsYW5rYH1cbiAgICAgICAgICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtMzAwYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YEluc3RhZ3JhbTogYH1cbiAgICAgICAgICAgICAgICAgIHtzaXRlQ29uZmlnLnNvY2lhbC5pbnN0YWdyYW1IYW5kbGV9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbXQtNiBwdC00IGJvcmRlci10IGJvcmRlci1uZXV0cmFsLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMmB9PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC0zMDBgfVxuICAgICAgICAgICAgICA+e2BBdGVuY2nDs24gcHJlc2VuY2lhbCBlbiBDYWphbWFyY2FgfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHB0LTggZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHRleHQteHMgdGV4dC1uZXV0cmFsLTMwMGB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2PntgwqkgMjAyNiA3IFN0cmVuZ3RoIENlbnRlci4gVG9kb3MgbG9zIGRlcmVjaG9zIHJlc2VydmFkb3MuYH08L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBgc21vb3RoYCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1uZXV0cmFsLTkwMCBob3ZlcjpiZy1uZXV0cmFsLTgwMCB0ZXh0LW5ldXRyYWwtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTgwMGB9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtgVm9sdmVyIGFsIGluaWNpbyBkZSBsYSBww6FnaW5hYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj57YFN1YmlyIGFsIGluaWNpb2B9PC9zcGFuPlxuICAgICAgICAgICAgPEFycm93VXBJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41IHRleHQtWyNENzE5MjBdYH0gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj5cbiAgKSxcbiAgV2hhdHNBcHBCdXR0b24gPSAoKSA9PiB7XG4gICAgbGV0IFtlLCB0XSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoITEpLFxuICAgICAgbiA9IGBodHRwczovL3dhLm1lLyR7c2l0ZUNvbmZpZy5waG9uZS5yYXd9P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2l0ZUNvbmZpZy5waG9uZS53aGF0c2FwcE1lc3NhZ2VHZW5lcmFsKX1gO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YGZpeGVkIGJvdHRvbS02IHJpZ2h0LTYgei00MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM2B9XG4gICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gdCghMCl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gdCghMSl9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BoaWRkZW4gc206ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLWZ1bGwgYmctWyMxNDE0MTZdIGJvcmRlciBib3JkZXItbmV1dHJhbC03MDAgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgc2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke2UgPyBgb3BhY2l0eS0xMDAgdHJhbnNsYXRlLXgtMGAgOiBgb3BhY2l0eS05MCB0cmFuc2xhdGUteC0xIHBvaW50ZXItZXZlbnRzLW5vbmVgfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMCBhbmltYXRlLXB1bHNlYH0gLz5cbiAgICAgICAgICA8c3Bhbj57YMK/VGllbmVzIGFsZ3VuYSBjb25zdWx0YT9gfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj17bn1cbiAgICAgICAgICB0YXJnZXQ9e2BfYmxhbmtgfVxuICAgICAgICAgIHJlbD17YG5vb3BlbmVyIG5vcmVmZXJyZXJgfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctMTQgaC0xNCBzbTp3LTE2IHNtOmgtMTYgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNTAwIGhvdmVyOmJnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LTJ4bCBzaGFkb3ctZW1lcmFsZC05NTAvNjAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMTAgYWN0aXZlOnNjYWxlLTk1IGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy00IGZvY3VzLXZpc2libGU6cmluZy1lbWVyYWxkLTQwMC81MGB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YENvbnRhY3RhciBhIDcgU3RyZW5ndGggQ2VudGVyIHBvciBXaGF0c0FwcGB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAgYW5pbWF0ZS1waW5nIG9wYWNpdHktMjUgcG9pbnRlci1ldmVudHMtbm9uZWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TWVzc2FnZUNpcmNsZUljb25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgc206dy04IHNtOmgtOCBmaWxsLWN1cnJlbnQgdGV4dC13aGl0ZSByZWxhdGl2ZSB6LTEwYH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxuICBBY2Nlc3NpYmlsaXR5UGFuZWwgPSAoKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIGlzT3BlbjogZSxcbiAgICAgIHNldElzT3BlbjogdCxcbiAgICAgIHRleHRTaXplOiBuLFxuICAgICAgc2V0VGV4dFNpemU6IHIsXG4gICAgICBoaWdoQ29udHJhc3Q6IGksXG4gICAgICB0b2dnbGVIaWdoQ29udHJhc3Q6IGEsXG4gICAgICBncmF5c2NhbGU6IG8sXG4gICAgICB0b2dnbGVHcmF5c2NhbGU6IHMsXG4gICAgICBkeXNsZXhpYUZvbnQ6IGMsXG4gICAgICB0b2dnbGVEeXNsZXhpYUZvbnQ6IGwsXG4gICAgICByZWR1Y2VkTW90aW9uOiB1LFxuICAgICAgdG9nZ2xlUmVkdWNlZE1vdGlvbjogZCxcbiAgICAgIGhpZ2hsaWdodExpbmtzOiBmLFxuICAgICAgdG9nZ2xlSGlnaGxpZ2h0TGlua3M6IHAsXG4gICAgICBiaWdDdXJzb3I6IG0sXG4gICAgICB0b2dnbGVCaWdDdXJzb3I6IGgsXG4gICAgICBpc1NwZWFraW5nOiBnLFxuICAgICAgc3BlYWtPdmVydmlldzogXyxcbiAgICAgIHN0b3BTcGVha2luZzogdixcbiAgICAgIHJlc2V0QWxsOiB5LFxuICAgIH0gPSB1c2VBY2Nlc3NpYmlsaXR5KCk7XG4gICAgcmV0dXJuIGUgPyAoXG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBzbTpwLTYgYmctYmxhY2svODAgYmFja2Ryb3AtYmx1ci1tZGB9XG4gICAgICAgICAgcm9sZT17YGRpYWxvZ2B9XG4gICAgICAgICAgYXJpYS1tb2RhbD17YHRydWVgfVxuICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17YGExMXktbW9kYWwtdGl0bGVgfVxuICAgICAgICA+XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgc2NhbGU6IDAuOTUsXG4gICAgICAgICAgICAgIHk6IDIwLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZXhpdD17e1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICBzY2FsZTogMC45NSxcbiAgICAgICAgICAgICAgeTogMjAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICBkdXJhdGlvbjogMC4yNSxcbiAgICAgICAgICAgICAgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0sXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy1mdWxsIG1heC13LTJ4bCBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvIHJvdW5kZWQtM3hsIGxpcXVpZC1nbGFzcyBwLTYgc206cC04IHRleHQtbmV1dHJhbC0yMDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBzaGFkb3ctWzBfMjVweF82MHB4X3JnYmEoMCwwLDAsMC45KV1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gcGItNSBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgbWItNmB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0zYH0+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMSBoLTExIHJvdW5kZWQtMnhsIGJnLVsjRDcxOTIwXS8yMCBib3JkZXIgYm9yZGVyLVsjRDcxOTIwXS80MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsjRDcxOTIwXSBzaGFkb3ctWzBfMF8yMHB4X3JnYmEoMjE1LDI1LDMyLDAuMyldYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXNJY29uIGNsYXNzTmFtZT17YHctNSBoLTUgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BhMTF5LW1vZGFsLXRpdGxlYH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1kaXNwbGF5IHRleHQtMnhsIHNtOnRleHQtM3hsIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZWB9XG4gICAgICAgICAgICAgICAgICA+e2BDRU5UUk8gREUgQUNDRVNJQklMSURBRGB9PC9oMj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNDAwIG10LTAuNWB9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGRgfT57YFdDQUcgMi4xIEFBYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntgwrdgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2BJbmNsdXNpw7NuIHkgY29uZm9ydCB2aXN1YWwgdW5pdmVyc2FsYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0KCExKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWZ1bGwgYmctd2hpdGUvNSBob3ZlcjpiZy1bI0Q3MTkyMF0gdGV4dC1uZXV0cmFsLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy13aGl0ZWB9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YENlcnJhciBwYW5lbCBkZSBhY2Nlc2liaWxpZGFkYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYSWNvbiBjbGFzc05hbWU9e2B3LTUgaC01YH0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIGxpcXVpZC1nbGFzcy1zdWJ0bGUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBtYi02IGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNgfT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEwIGgtMTAgcm91bmRlZC14bCBiZy1uZXV0cmFsLTkwMCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtNzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtWyNENzE5MjBdYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7ZyA/IChcbiAgICAgICAgICAgICAgICAgICAgPFZvbHVtZTJJY29uIGNsYXNzTmFtZT17YHctNSBoLTUgYW5pbWF0ZS1wdWxzZSB0ZXh0LVsjRDcxOTIwXWB9IC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8Vm9sdW1lMkljb24gY2xhc3NOYW1lPXtgdy01IGgtNWB9IC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDNcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBsZWFkaW5nLW5vbmVgfVxuICAgICAgICAgICAgICAgICAgPntgTGVjdG9yIGRlIFZveiBkZWwgR2ltbmFzaW9gfTwvaDM+XG4gICAgICAgICAgICAgICAgICA8cFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIHRleHQtbmV1dHJhbC00MDAgbXQtMWB9XG4gICAgICAgICAgICAgICAgICA+e2BFc2N1Y2hhIGxhIG5hcnJhY2nDs24gaGFibGFkYSBkZSBwbGFuZXMsIGhvcmFyaW9zIHkgdWJpY2FjacOzbiBlbiBlc3Bhw7FvbC5gfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtnID8gdiA6IF99XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC14bCBmb250LWhlYWRpbmcgZm9udC1ib2xkIHRleHQteHMgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaHJpbmstMCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWQgJHtnID8gYGJnLWFtYmVyLTUwMCBob3ZlcjpiZy1hbWJlci02MDAgdGV4dC1ibGFja2AgOiBgYmctWyNENzE5MjBdIGhvdmVyOmJnLVsjQTgwRjE1XSB0ZXh0LXdoaXRlIHNoYWRvdy1yZWQtOTUwLzUwYH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2cgPyAoXG4gICAgICAgICAgICAgICAgICA8anN4UnVudGltZS5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgPFZvbHVtZVhJY29uIGNsYXNzTmFtZT17YHctNCBoLTRgfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57YFBhdXNhciBMZWN0dXJhYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2pzeFJ1bnRpbWUuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxqc3hSdW50aW1lLkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICA8Vm9sdW1lMkljb24gY2xhc3NOYW1lPXtgdy00IGgtNGB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntgRXNjdWNoYXIgUmVzdW1lbmB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9qc3hSdW50aW1lLkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNwYWNlLXktNmB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLTJ4bCBiZy13aGl0ZS9bMC4wM10gYm9yZGVyIGJvcmRlci13aGl0ZS8xMGB9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTNgfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJgfT5cbiAgICAgICAgICAgICAgICAgICAgPFR5cGVJY29uIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1bI0Q3MTkyMF1gfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlYH0+e2BUYW1hw7FvIGRlIFRleHRvYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMGB9PlxuICAgICAgICAgICAgICAgICAgICB7biA9PT0gYG5vcm1hbGBcbiAgICAgICAgICAgICAgICAgICAgICA/IGBOb3JtYWwgKDEwMCUpYFxuICAgICAgICAgICAgICAgICAgICAgIDogbiA9PT0gYGxhcmdlYFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBgR3JhbmRlICgxMTUlKWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYEV4dHJhIEdyYW5kZSAoMTMwJSlgfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBncmlkLWNvbHMtMyBnYXAtMmB9PlxuICAgICAgICAgICAgICAgICAge1tgbm9ybWFsYCwgYGxhcmdlYCwgYHhsYXJnZWBdLm1hcCgoZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcihlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTMgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXIgJHtuID09PSBlID8gYGJnLVsjRDcxOTIwXSB0ZXh0LXdoaXRlIGJvcmRlci1bI0Q3MTkyMF0gc2hhZG93LWxnIHNoYWRvdy1yZWQtOTUwLzQwYCA6IGBiZy13aGl0ZS81IGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtbmV1dHJhbC0zMDAgYm9yZGVyLXdoaXRlLzEwYH1gfVxuICAgICAgICAgICAgICAgICAgICAgIGtleT17ZX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtlID09PSBgbm9ybWFsYCAmJiBgTm9ybWFsIEFgfVxuICAgICAgICAgICAgICAgICAgICAgIHtlID09PSBgbGFyZ2VgICYmIGBHcmFuZGUgQStgfVxuICAgICAgICAgICAgICAgICAgICAgIHtlID09PSBgeGxhcmdlYCAmJiBgTXV5IEdyYW5kZSBBKytgfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zYH0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17YX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLTJ4bCBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGN1cnNvci1wb2ludGVyICR7aSA/IGBiZy1uZXV0cmFsLTkwMCBib3JkZXItYW1iZXItNDAwIHRleHQtYW1iZXItMzAwYCA6IGBiZy13aGl0ZS9bMC4wM10gYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci13aGl0ZS8yMCB0ZXh0LW5ldXRyYWwtMzAwYH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBnYXAtM2B9PlxuICAgICAgICAgICAgICAgICAgICA8U3VuSWNvbiBjbGFzc05hbWU9e2B3LTUgaC01IHRleHQtWyNENzE5MjBdIHNocmluay0wIG10LTAuNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkIGJsb2NrIHRleHQtd2hpdGVgfVxuICAgICAgICAgICAgICAgICAgICAgID57YEFsdG8gQ29udHJhc3RlYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC00MDAgbXQtMC41IGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BCb3JkZXMgbsOtdGlkb3MgeSBjb250cmFzdGUgcmVmb3J6YWRvIFdDQUcgQUFBLmB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHJvdW5kZWQtZnVsbCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgJHtpID8gYGJnLWFtYmVyLTQwMCBib3JkZXItYW1iZXItNDAwIHRleHQtYmxhY2tgIDogYGJvcmRlci1uZXV0cmFsLTYwMGB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2kgJiYgPENoZWNrSWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSBzdHJva2UtWzNdYH0gLz59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtsfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIGJvcmRlciB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgY3Vyc29yLXBvaW50ZXIgJHtjID8gYGJnLW5ldXRyYWwtOTAwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwYCA6IGBiZy13aGl0ZS9bMC4wM10gYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci13aGl0ZS8yMCB0ZXh0LW5ldXRyYWwtMzAwYH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBnYXAtM2B9PlxuICAgICAgICAgICAgICAgICAgICA8Qm9va09wZW5JY29uIGNsYXNzTmFtZT17YHctNSBoLTUgdGV4dC1bI0Q3MTkyMF0gc2hyaW5rLTAgbXQtMC41YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LWJvbGQgYmxvY2sgdGV4dC13aGl0ZWB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgRnVlbnRlIHBhcmEgRGlzbGV4aWFgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gdGV4dC1uZXV0cmFsLTQwMCBtdC0wLjUgYmxvY2tgfVxuICAgICAgICAgICAgICAgICAgICAgID57YEVzcGFjaWFkbyBvcHRpbWl6YWRvIHBhcmEgZmFjaWxpdGFyIGxhIGxlY3R1cmEgZmx1aWRhLmB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHJvdW5kZWQtZnVsbCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgJHtjID8gYGJnLWVtZXJhbGQtNDAwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWJsYWNrYCA6IGBib3JkZXItbmV1dHJhbC02MDBgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjICYmIDxDaGVja0ljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgc3Ryb2tlLVszXWB9IC8+fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17c31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLTJ4bCBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGN1cnNvci1wb2ludGVyICR7byA/IGBiZy1uZXV0cmFsLTkwMCBib3JkZXItYmx1ZS00MDAgdGV4dC1ibHVlLTMwMGAgOiBgYmctd2hpdGUvWzAuMDNdIGJvcmRlci13aGl0ZS8xMCBob3Zlcjpib3JkZXItd2hpdGUvMjAgdGV4dC1uZXV0cmFsLTMwMGB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtc3RhcnQgZ2FwLTNgfT5cbiAgICAgICAgICAgICAgICAgICAgPEV5ZUljb24gY2xhc3NOYW1lPXtgdy01IGgtNSB0ZXh0LVsjRDcxOTIwXSBzaHJpbmstMCBtdC0wLjVgfSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtYm9sZCBibG9jayB0ZXh0LXdoaXRlYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BNb2RvIE1vbm9jcm9tw6F0aWNvYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC00MDAgbXQtMC41IGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BFc2NhbGEgZGUgZ3Jpc2VzIHBhcmEgcGVyc29uYXMgY29uIHNlbnNpYmlsaWRhZCBhbCBjb2xvci5gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLWZ1bGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wICR7byA/IGBiZy1ibHVlLTQwMCBib3JkZXItYmx1ZS00MDAgdGV4dC1ibGFja2AgOiBgYm9yZGVyLW5ldXRyYWwtNjAwYH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7byAmJiA8Q2hlY2tJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41IHN0cm9rZS1bM11gfSAvPn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2R9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC0yeGwgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMyBjdXJzb3ItcG9pbnRlciAke3UgPyBgYmctbmV1dHJhbC05MDAgYm9yZGVyLXB1cnBsZS00MDAgdGV4dC1wdXJwbGUtMzAwYCA6IGBiZy13aGl0ZS9bMC4wM10gYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci13aGl0ZS8yMCB0ZXh0LW5ldXRyYWwtMzAwYH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBnYXAtM2B9PlxuICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHlJY29uIGNsYXNzTmFtZT17YHctNSBoLTUgdGV4dC1bI0Q3MTkyMF0gc2hyaW5rLTAgbXQtMC41YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LWJvbGQgYmxvY2sgdGV4dC13aGl0ZWB9XG4gICAgICAgICAgICAgICAgICAgICAgPntgUmVkdWNpciBNb3ZpbWllbnRvYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC00MDAgbXQtMC41IGJsb2NrYH1cbiAgICAgICAgICAgICAgICAgICAgICA+e2BQYXVzYSBhbmltYWNpb25lcyBwYXJhIGV2aXRhciBmYXRpZ2EgdmVzdGlidWxhci5gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLWZ1bGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wICR7dSA/IGBiZy1wdXJwbGUtNDAwIGJvcmRlci1wdXJwbGUtNDAwIHRleHQtYmxhY2tgIDogYGJvcmRlci1uZXV0cmFsLTYwMGB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3UgJiYgPENoZWNrSWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSBzdHJva2UtWzNdYH0gLz59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtwfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIGJvcmRlciB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgY3Vyc29yLXBvaW50ZXIgJHtmID8gYGJnLW5ldXRyYWwtOTAwIGJvcmRlci15ZWxsb3ctNDAwIHRleHQteWVsbG93LTMwMGAgOiBgYmctd2hpdGUvWzAuMDNdIGJvcmRlci13aGl0ZS8xMCBob3Zlcjpib3JkZXItd2hpdGUvMjAgdGV4dC1uZXV0cmFsLTMwMGB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtc3RhcnQgZ2FwLTNgfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsySWNvbiBjbGFzc05hbWU9e2B3LTUgaC01IHRleHQtWyNENzE5MjBdIHNocmluay0wIG10LTAuNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkIGJsb2NrIHRleHQtd2hpdGVgfVxuICAgICAgICAgICAgICAgICAgICAgID57YFJlc2FsdGFyIEVubGFjZXNgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gdGV4dC1uZXV0cmFsLTQwMCBtdC0wLjUgYmxvY2tgfVxuICAgICAgICAgICAgICAgICAgICAgID57YFN1YnJheWEgdG9kb3MgbG9zIGJvdG9uZXMgeSBlbmxhY2VzIGludGVyYWN0aXZvcy5gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLWZ1bGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wICR7ZiA/IGBiZy15ZWxsb3ctNDAwIGJvcmRlci15ZWxsb3ctNDAwIHRleHQtYmxhY2tgIDogYGJvcmRlci1uZXV0cmFsLTYwMGB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2YgJiYgPENoZWNrSWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSBzdHJva2UtWzNdYH0gLz59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtofVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIGJvcmRlciB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgY3Vyc29yLXBvaW50ZXIgJHttID8gYGJnLW5ldXRyYWwtOTAwIGJvcmRlci1waW5rLTQwMCB0ZXh0LXBpbmstMzAwYCA6IGBiZy13aGl0ZS9bMC4wM10gYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci13aGl0ZS8yMCB0ZXh0LW5ldXRyYWwtMzAwYH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBnYXAtM2B9PlxuICAgICAgICAgICAgICAgICAgICA8TW91c2VQb2ludGVySWNvbiBjbGFzc05hbWU9e2B3LTUgaC01IHRleHQtWyNENzE5MjBdIHNocmluay0wIG10LTAuNWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkIGJsb2NrIHRleHQtd2hpdGVgfVxuICAgICAgICAgICAgICAgICAgICAgID57YEN1cnNvciBBZ3JhbmRhZG9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gdGV4dC1uZXV0cmFsLTQwMCBtdC0wLjUgYmxvY2tgfVxuICAgICAgICAgICAgICAgICAgICAgID57YFB1bnRlcm8gYW1wbGlhZG8gZGUgYWx0byBjb250cmFzdGUgdmlzdWFsLmB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHJvdW5kZWQtZnVsbCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgJHttID8gYGJnLXBpbmstNDAwIGJvcmRlci1waW5rLTQwMCB0ZXh0LWJsYWNrYCA6IGBib3JkZXItbmV1dHJhbC02MDBgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHttICYmIDxDaGVja0ljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgc3Ryb2tlLVszXWB9IC8+fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTggcHQtNSBib3JkZXItdCBib3JkZXItd2hpdGUvMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3l9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1uZXV0cmFsLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxSb3RhdGVDY3dJY29uIGNsYXNzTmFtZT17YHctMy41IGgtMy41YH0gLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57YFJlc3RhYmxlY2VyIFRvZG9gfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0KCExKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC02IHB5LTIuNSByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtYmxhY2sgZm9udC1oZWFkaW5nIGZvbnQtYm9sZCB0ZXh0LXhzIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBob3ZlcjpiZy1uZXV0cmFsLTIwMCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGdgfVxuICAgICAgICAgICAgICA+e2BHdWFyZGFyIHkgQ2VycmFyYH08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtdC00IHRleHQtY2VudGVyIHRleHQtWzExcHhdIHRleHQtbmV1dHJhbC01MDBgfT5cbiAgICAgICAgICAgICAge2BBdGFqbyByw6FwaWRvIGRlIHRlY2xhZG86IFB1bHNhIGB9XG4gICAgICAgICAgICAgIDxrYmRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0xLjUgcHktMC41IHJvdW5kZWQgYmctd2hpdGUvMTAgdGV4dC13aGl0ZSBmb250LW1vbm9gfVxuICAgICAgICAgICAgICA+e2BBbHQgKyBBYH08L2tiZD5cbiAgICAgICAgICAgICAge2AgcGFyYSBhYnJpciBvIGNlcnJhciBlc3RlIHBhbmVsLmB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgKSA6IG51bGw7XG4gIH0sXG4gIEFjY2Vzc2liaWxpdHlXaWRnZXQgPSAoKSA9PiB7XG4gICAgbGV0IHsgaXNPcGVuOiBlLCBzZXRJc09wZW46IHQsIGhpZ2hDb250cmFzdDogbiB9ID0gdXNlQWNjZXNzaWJpbGl0eSgpO1xuICAgIHJldHVybiAoXG4gICAgICA8anN4UnVudGltZS5GcmFnbWVudD5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPXtgI21haW4tY29udGVudGB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgc3Itb25seSBmb2N1czpub3Qtc3Itb25seSBmaXhlZCB0b3AtNCBsZWZ0LTQgei01MCBweC00IHB5LTIgYmctWyNENzE5MjBdIHRleHQtd2hpdGUgZm9udC1ib2xkIHJvdW5kZWQtbGcgc2hhZG93LTJ4bCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy00IGZvY3VzOnJpbmctd2hpdGVgfVxuICAgICAgICA+e2BTYWx0YXIgYWwgY29udGVuaWRvIHByaW5jaXBhbGB9PC9hPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZpeGVkIGJvdHRvbS02IGxlZnQtNiB6LTQwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yYH0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdCghMCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByZWxhdGl2ZSB3LTEzIGgtMTMgc206dy0xNCBzbTpoLTE0IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTExMCBhY3RpdmU6c2NhbGUtOTUgc2hhZG93LTJ4bCBjdXJzb3ItcG9pbnRlciBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctWyNENzE5MjBdLzYwICR7biA/IGBiZy1hbWJlci00MDAgdGV4dC1ibGFjayBib3JkZXItMiBib3JkZXItd2hpdGVgIDogYGxpcXVpZC1nbGFzcyB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvMjAgaG92ZXI6Ym9yZGVyLVsjRDcxOTIwXWB9YH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BBYnJpciBvcGNpb25lcyBkZSBhY2Nlc2liaWxpZGFkIHVuaXZlcnNhbCAoQWx0ICsgQSlgfVxuICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD17YGRpYWxvZ2B9XG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJnLVsjRDcxOTIwXS8yMCBhbmltYXRlLXB1bHNlIHBvaW50ZXItZXZlbnRzLW5vbmVgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxBY2Nlc3NpYmlsaXR5SWNvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTYgaC02IHNtOnctNyBzbTpoLTcgdGV4dC13aGl0ZSBncm91cC1ob3Zlcjp0ZXh0LVsjRDcxOTIwXSB0cmFuc2l0aW9uLWNvbG9ycyByZWxhdGl2ZSB6LTEwYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoaWRkZW4gc206YmxvY2sgYWJzb2x1dGUgbGVmdC1mdWxsIG1sLTMgcHgtMyBweS0xLjUgcm91bmRlZC14bCBsaXF1aWQtZ2xhc3MgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgd2hpdGVzcGFjZS1ub3dyYXAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBwb2ludGVyLWV2ZW50cy1ub25lIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwYH1cbiAgICAgICAgICAgID57YEFjY2VzaWJpbGlkYWQgKEFsdCArIEEpYH08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8QWNjZXNzaWJpbGl0eVBhbmVsIC8+XG4gICAgICA8L2pzeFJ1bnRpbWUuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfTtcbmZ1bmN0aW9uIEFwcCgpIHtcbiAgbGV0IFtlLCB0XSA9ICgwLCBSZWFjdC51c2VTdGF0ZSkoYGluaWNpb2ApO1xuICByZXR1cm4gKFxuICAgICgwLCBSZWFjdC51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgIGxldCBlID0gW1xuICAgICAgICAgIGBpbmljaW9gLFxuICAgICAgICAgIGBub3NvdHJvc2AsXG4gICAgICAgICAgYGluc3RhbGFjaW9uZXNgLFxuICAgICAgICAgIGBwbGFuZXNgLFxuICAgICAgICAgIGBob3Jhcmlvc2AsXG4gICAgICAgICAgYGNvbXVuaWRhZGAsXG4gICAgICAgICAgYGNvbnRhY3RvYCxcbiAgICAgICAgXSxcbiAgICAgICAgbiA9ICgpID0+IHtcbiAgICAgICAgICBsZXQgbiA9IHdpbmRvdy5zY3JvbGxZICsgMjAwO1xuICAgICAgICAgIGZvciAobGV0IHIgb2YgZSkge1xuICAgICAgICAgICAgbGV0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyKTtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgIGxldCBpID0gZS5vZmZzZXRUb3AsXG4gICAgICAgICAgICAgICAgYSA9IGUub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICBpZiAobiA+PSBpICYmIG4gPCBpICsgYSkge1xuICAgICAgICAgICAgICAgIHQocik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgc2Nyb2xsYCwgbiwge1xuICAgICAgICAgIHBhc3NpdmU6ICEwLFxuICAgICAgICB9KSxcbiAgICAgICAgbigpLFxuICAgICAgICAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihgc2Nyb2xsYCwgbilcbiAgICAgICk7XG4gICAgfSwgW10pLFxuICAgIChcbiAgICAgIDxBY2Nlc3NpYmlsaXR5UHJvdmlkZXI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2BtaW4taC1zY3JlZW4gYmctWyMwQjBCMENdIHRleHQtWyNGMkYyRjJdIGZsZXggZmxleC1jb2wgZm9udC1zYW5zIHNlbGVjdGlvbjpiZy1bI0Q3MTkyMF0gc2VsZWN0aW9uOnRleHQtd2hpdGUgcmVsYXRpdmVgfVxuICAgICAgICA+XG4gICAgICAgICAgPFNjcm9sbFByb2dyZXNzIC8+XG4gICAgICAgICAgPEhlYWRlciBhY3RpdmVTZWN0aW9uPXtlfSAvPlxuICAgICAgICAgIDxtYWluIGlkPXtgbWFpbi1jb250ZW50YH0gY2xhc3NOYW1lPXtgZmxleC0xYH0gdGFiSW5kZXg9ey0xfT5cbiAgICAgICAgICAgIDxIZXJvIC8+XG4gICAgICAgICAgICA8QWJvdXQgLz5cbiAgICAgICAgICAgIDxHYWxsZXJ5IC8+XG4gICAgICAgICAgICA8UGxhbnMgLz5cbiAgICAgICAgICAgIDxTY2hlZHVsZSAvPlxuICAgICAgICAgICAgPENvbW11bml0eSAvPlxuICAgICAgICAgICAgPENvbnRhY3QgLz5cbiAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgPEZvb3RlciAvPlxuICAgICAgICAgIDxXaGF0c0FwcEJ1dHRvbiAvPlxuICAgICAgICAgIDxBY2Nlc3NpYmlsaXR5V2lkZ2V0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9BY2Nlc3NpYmlsaXR5UHJvdmlkZXI+XG4gICAgKVxuICApO1xufVxuKDAsIFJlYWN0RE9NLmNyZWF0ZVJvb3QpKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByb290YCkpLnJlbmRlcig8QXBwIC8+KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxTQUNFQSxFQUFFLElBQUlDLFNBQVMsRUFDZkMsRUFBRSxJQUFJQyxTQUFTLEVBQ2ZDLENBQUMsSUFBSUMsVUFBVSxFQUNmQyxDQUFDLElBQUlDLE1BQU0sRUFDWEMsQ0FBQyxJQUFJQyxLQUFLLEVBQ1ZDLEVBQUUsSUFBSUMsaUJBQWlCLEVB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