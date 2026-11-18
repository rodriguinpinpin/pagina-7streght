// Código recuperado de la versión pública y reorganizado para edición local.
import {
  gd as useScroll,
  wd as useSpring,
  z as jsxRuntime,
  J as motion,
  S as React,
  Pd as AccessibilityIcon,
  Ld as ArrowUpRightIcon,
  gf as XIcon,
  ef as MenuIcon,
  Rc as AnimatePresence,
  Id as ArrowRightIcon,
  qd as DumbbellIcon,
  ff as TargetIcon,
  mf as UsersIcon,
  lf as ShieldCheckIcon,
  Gd as ClockIcon,
  Hd as ChevronLeftIcon,
  Ud as ChevronRightIcon,
  vf as ZoomInIcon,
  $d as Maximize2Icon,
  _f as ZapIcon,
  Vd as CheckIcon,
  Bd as CalendarIcon,
  df as SunIcon,
  nf as MoonIcon,
  Wd as CircleQuestionMarkIcon,
  tf as MessageCircleIcon,
  Xd as InstagramIcon,
  Jd as ExternalLinkIcon,
  sf as PlayIcon,
  uf as SparklesIcon,
  Qd as MapPinIcon,
  Kd as CopyIcon,
  of as PhoneIcon,
  af as NavigationIcon,
  Rd as ArrowUpIcon,
  X as Volume2Icon,
  hf as VolumeXIcon,
  pf as TypeIcon,
  zd as BookOpenIcon,
  Yd as EyeIcon,
  Fd as ActivityIcon,
  Zd as Link2Icon,
  rf as MousePointerIcon,
  cf as RotateCcwIcon,
  Td as ReactDOM,
} from "../vendor/runtime.js";
import { siteConfig } from "./site-config.js";
const ScrollProgress = () => {
  let { scrollYProgress: e } = useScroll(),
    t = useSpring(e, {
      stiffness: 120,
      damping: 30,
      restDelta: 0.001,
    });
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A80F15] via-[#D71920] to-[#FF3B43] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(215,25,32,0.6)]`}
      style={{
        scaleX: t,
      }}
      aria-hidden={`true`}
    />
  );
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
  return r === 0
    ? {
        isOpen: !1,
        isPaused: !1,
        statusLabel: `Horario no confirmado`,
        nextEventDescription: `Consulta disponibilidad dominical por WhatsApp`,
        badgeColorClass: `text-amber-400 bg-amber-400/10 border-amber-400/20`,
      }
    : r === 6
      ? o >= 480 && o < 780
        ? {
            isOpen: !0,
            isPaused: !1,
            statusLabel: `Abierto ahora`,
            nextEventDescription: `Cierra hoy a la 1:00 p. m.`,
            badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`,
          }
        : o < 480
          ? {
              isOpen: !1,
              isPaused: !1,
              statusLabel: `Próxima apertura`,
              nextEventDescription: `Abre hoy a las 8:00 a. m.`,
              badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`,
            }
          : {
              isOpen: !1,
              isPaused: !1,
              statusLabel: `Cerrado por hoy`,
              nextEventDescription: `Próxima apertura: Lunes a las 7:00 a. m.`,
              badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`,
            }
      : o >= 420 && o < 780
        ? {
            isOpen: !0,
            isPaused: !1,
            statusLabel: `Abierto ahora · Turno Mañana`,
            nextEventDescription: `Pausa a la 1:00 p. m. (reapertura 3:00 p. m.)`,
            badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`,
          }
        : o >= 780 && o < 900
          ? {
              isOpen: !1,
              isPaused: !0,
              statusLabel: `Pausa intermedia`,
              nextEventDescription: `Reabre en turno tarde a las 3:00 p. m.`,
              badgeColorClass: `text-amber-400 bg-amber-400/10 border-amber-400/20`,
            }
          : o >= 900 && o < 1260
            ? {
                isOpen: !0,
                isPaused: !1,
                statusLabel: `Abierto ahora · Turno Tarde`,
                nextEventDescription: `Cierra a las 9:00 p. m.`,
                badgeColorClass: `text-emerald-400 bg-emerald-400/10 border-emerald-400/20`,
              }
            : o < 420
              ? {
                  isOpen: !1,
                  isPaused: !1,
                  statusLabel: `Próxima apertura`,
                  nextEventDescription: `Abre hoy a las 7:00 a. m.`,
                  badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`,
                }
              : {
                  isOpen: !1,
                  isPaused: !1,
                  statusLabel: `Cerrado por hoy`,
                  nextEventDescription:
                    r === 5
                      ? `Abre mañana sábado a las 8:00 a. m.`
                      : `Abre mañana a las 7:00 a. m.`,
                  badgeColorClass: `text-neutral-400 bg-neutral-800 border-neutral-700`,
                };
}
var AccessibilityContext = (0, React.createContext)(void 0),
  AccessibilityProvider = ({ children: e }) => {
    let [t, n] = (0, React.useState)(`normal`),
      [r, i] = (0, React.useState)(!1),
      [a, o] = (0, React.useState)(!1),
      [s, c] = (0, React.useState)(!1),
      [l, u] = (0, React.useState)(!1),
      [d, f] = (0, React.useState)(!1),
      [p, m] = (0, React.useState)(!1),
      [h, g] = (0, React.useState)(!1),
      [_, v] = (0, React.useState)(!1);
    ((0, React.useEffect)(() => {
      let e = document.documentElement,
        n = t === `xlarge` ? `1.3` : t === `large` ? `1.15` : `1`;
      (e.style.setProperty(`--a11y-font-scale`, n),
        e.classList.toggle(`a11y-high-contrast`, r),
        e.classList.toggle(`a11y-grayscale`, a),
        e.classList.toggle(`a11y-dyslexia`, s),
        e.classList.toggle(`a11y-reduced-motion`, l),
        e.classList.toggle(`a11y-highlight-links`, d),
        e.classList.toggle(`a11y-big-cursor`, p));
    }, [t, r, a, s, l, d, p]),
      (0, React.useEffect)(() => {
        let e = (e) => {
          e.altKey && (e.key === `a` || e.key === `A`) && (e.preventDefault(), g((e) => !e));
        };
        return (
          window.addEventListener(`keydown`, e),
          () => window.removeEventListener(`keydown`, e)
        );
      }, []));
    let y = (e) => n(e),
      b = () => i((e) => !e),
      x = () => o((e) => !e),
      ee = () => c((e) => !e),
      te = () => u((e) => !e),
      C = () => f((e) => !e),
      ne = () => m((e) => !e),
      w = () => {
        (n(`normal`), i(!1), o(!1), c(!1), u(!1), f(!1), m(!1), re());
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
        let e =
          new SpeechSynthesisUtterance(`Bienvenido a 7 Strength Center, gimnasio de fuerza y rendimiento en Cajamarca, Perú. 
Ubicación: Los Leones 164, Cajamarca.
Planes oficiales: Pase Diario a 15 soles y Plan Mensual a 120 soles.
Horarios de atención: De lunes a viernes, turno mañana de 7:00 a. m. a 1:00 p. m. y turno tarde de 3:00 p. m. a 9:00 p. m. Sábados de 8:00 a. m. a 1:00 p. m. Domingos con horario por confirmar por WhatsApp.
WhatsApp oficial: +51 976 795 498. Escríbenos para unirte hoy.`);
        ((e.lang = `es-PE`), (e.rate = 0.95));
        let t = window.speechSynthesis.getVoices().find((e) => e.lang.startsWith(`es`));
        (t && (e.voice = t),
          (e.onend = () => v(!1)),
          (e.onerror = () => v(!1)),
          v(!0),
          window.speechSynthesis.speak(e));
      }, [_, re]);
    return (
      <AccessibilityContext.Provider
        value={{
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
          stopSpeaking: re,
        }}
      >
        {e}
      </AccessibilityContext.Provider>
    );
  },
  useAccessibility = () => {
    let e = (0, React.useContext)(AccessibilityContext);
    if (!e) throw Error(`useAccessibility must be used within an AccessibilityProvider`);
    return e;
  },
  Header = ({ activeSection: e }) => {
    let [t, n] = (0, React.useState)(!1),
      [r, i] = (0, React.useState)(!1);
    (0, React.useEffect)(() => {
      let e = () => {
        n(window.scrollY > 25);
      };
      return (
        window.addEventListener(`scroll`, e, {
          passive: !0,
        }),
        () => window.removeEventListener(`scroll`, e)
      );
    }, []);
    let a = [
        {
          label: `Inicio`,
          href: `#inicio`,
        },
        {
          label: `Nosotros`,
          href: `#nosotros`,
        },
        {
          label: `Instalaciones`,
          href: `#instalaciones`,
        },
        {
          label: `Planes`,
          href: `#planes`,
        },
        {
          label: `Horarios`,
          href: `#horarios`,
        },
        {
          label: `Comunidad`,
          href: `#comunidad`,
        },
        {
          label: `Contacto`,
          href: `#contacto`,
        },
      ],
      { setIsOpen: o } = useAccessibility(),
      s = (e, t) => {
        (e.preventDefault(), i(!1));
        let n = document.querySelector(t);
        if (n) {
          let e = n.getBoundingClientRect().top + window.pageYOffset - 76;
          window.scrollTo({
            top: e,
            behavior: `smooth`,
          });
        }
      };
    return (
      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${t ? `liquid-glass border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3` : `bg-transparent py-5 sm:py-6`}`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={`flex items-center justify-between gap-4 md:gap-8`}>
            <a
              href={`#inicio`}
              onClick={(e) => s(e, `#inicio`)}
              className={`flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] rounded-lg p-1`}
              aria-label={`7 Strength Center - Volver al inicio`}
            >
              <div
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-[#D71920] transition-colors shrink-0 shadow-lg`}
              >
                <img
                  src={siteConfig.logoPath}
                  alt={`Logo oficial 7 Strength Center`}
                  className={`w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300`}
                  loading={`eager`}
                />
              </div>
              <div className={`flex flex-col`}>
                <span
                  className={`font-display text-xl sm:text-2xl text-white tracking-wider leading-none font-bold`}
                >{`7 STRENGTH`}</span>
                <span
                  className={`text-[10px] sm:text-xs text-[#D71920] tracking-widest uppercase font-semibold leading-none mt-0.5 group-hover:tracking-[0.2em] transition-all duration-300`}
                >{`CENTER`}</span>
              </div>
            </a>
            <nav
              className={`hidden lg:flex items-center gap-8 text-sm font-medium`}
              aria-label={`Navegación principal`}
            >
              {a.map((t) => {
                let n = e === t.href.substring(1);
                return (
                  <a
                    href={t.href}
                    onClick={(e) => s(e, t.href)}
                    className={`relative py-1 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D71920] rounded ${n ? `text-white font-bold` : `text-neutral-400 hover:text-white`}`}
                    key={t.href}
                  >
                    {t.label}
                    {n && (
                      <motion.span
                        layoutId={`navActiveLine`}
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D71920] rounded-full shadow-[0_0_8px_rgba(215,25,32,0.8)]`}
                        transition={{
                          type: `spring`,
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
            <div className={`flex items-center gap-2 sm:gap-3 shrink-0`}>
              <button
                onClick={() => o(!0)}
                className={`p-2 sm:p-2.5 rounded-xl liquid-glass text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]`}
                aria-label={`Abrir panel de accesibilidad (Alt + A)`}
                title={`Accesibilidad universal`}
              >
                <AccessibilityIcon
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-200 hover:text-[#D71920] transition-colors`}
                />
              </button>
              <a
                href={whatsappUrl()}
                target={`_blank`}
                rel={`noopener noreferrer`}
                className={`group relative overflow-hidden inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#D71920] hover:bg-[#A80F15] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-900/40 hover:shadow-red-900/70 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/30`}
              >
                <span
                  className={`absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`}
                />
                <span className={`relative z-10`}>{`ÚNETE AHORA`}</span>
                <ArrowUpRightIcon
                  className={`relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200`}
                />
              </a>
              <button
                onClick={() => i(!r)}
                className={`lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]`}
                aria-label={r ? `Cerrar menú` : `Abrir menú de navegación`}
                aria-expanded={r}
              >
                {r ? <XIcon className={`w-6 h-6`} /> : <MenuIcon className={`w-6 h-6`} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {r && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: `auto`,
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: `easeInOut`,
              }}
              className={`lg:hidden bg-[#0B0B0C]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl overflow-hidden px-6 py-6`}
            >
              <div className={`flex flex-col gap-3`}>
                <div className={`flex items-center gap-3 pb-3 border-b border-neutral-800/80`}>
                  <img
                    src={siteConfig.logoPath}
                    alt={`Logo 7 Strength`}
                    className={`w-8 h-8 object-contain`}
                  />
                  <span
                    className={`text-xs uppercase tracking-widest text-neutral-400 font-semibold`}
                  >{`Cajamarca, Perú`}</span>
                </div>
                {a.map((t) => {
                  let n = e === t.href.substring(1);
                  return (
                    <a
                      href={t.href}
                      onClick={(e) => s(e, t.href)}
                      className={`text-base py-2 px-3 rounded-lg transition-all ${n ? `bg-neutral-900 text-[#D71920] font-bold border-l-2 border-[#D71920]` : `text-neutral-300 hover:bg-neutral-900/60 hover:text-white`}`}
                      key={t.href}
                    >
                      {t.label}
                    </a>
                  );
                })}
                <div className={`pt-4 border-t border-neutral-800/80 flex flex-col gap-2`}>
                  <a
                    href={whatsappUrl()}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    className={`w-full text-center py-3.5 bg-[#D71920] hover:bg-[#A80F15] text-white font-bold tracking-wider uppercase text-sm rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2`}
                  >
                    <span>{`ÚNETE AHORA POR WHATSAPP`}</span>
                    <ArrowUpRightIcon className={`w-4 h-4`} />
                  </a>
                  <p
                    className={`text-center text-xs text-neutral-400 mt-1`}
                  >{`Atención directa: +51 976 795 498`}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    );
  },
  Hero = () => {
    let e = (e) => {
      let t = document.querySelector(e);
      if (t) {
        let e = t.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({
          top: e,
          behavior: `smooth`,
        });
      }
    };
    return (
      <section
        id={`inicio`}
        className={`relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden bg-[#0B0B0C]`}
      >
        <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none`}>
          <motion.img
            initial={{
              scale: 1.08,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 0.85,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            src={`/assets/aistudio/image_cab5cadb.png`}
            alt={`Instalaciones oficiales de 7 Strength Center en Cajamarca`}
            className={`w-full h-full object-cover object-center filter brightness-65 contrast-125`}
            loading={`eager`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/75 to-[#0B0B0C]/40`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent`}
          />
          <div
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/15 blur-[160px] rounded-full pointer-events-none`}
          />
        </div>
        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center`}
        >
          <div className={`max-w-4xl`}>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full liquid-glass-subtle text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6 text-neutral-300 border border-white/10 shadow-lg`}
            >
              <span className={`w-2 h-2 rounded-full bg-[#D71920] animate-pulse`} />
              <span className={`text-white`}>{`7 STRENGTH CENTER`}</span>
              <span aria-hidden={`true`} className={`text-neutral-500`}>{`·`}</span>
              <span className={`text-[#D71920]`}>{`CAJAMARCA`}</span>
            </motion.div>
            <div className={`font-display tracking-tight leading-[0.9] mb-8 select-none`}>
              <div className={`overflow-hidden`}>
                <motion.h1
                  initial={{
                    y: `100%`,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-6xl sm:text-8xl lg:text-9xl text-white block font-bold`}
                >{`NO HAY LÍMITES.`}</motion.h1>
              </div>
              <div className={`overflow-hidden mt-1 sm:mt-2`}>
                <motion.div
                  initial={{
                    y: `100%`,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-6xl sm:text-8xl lg:text-9xl text-white font-bold flex items-baseline gap-3 sm:gap-5 flex-wrap`}
                >
                  <span>{`SOLO`}</span>
                  <span
                    className={`relative text-[#D71920] drop-shadow-[0_0_35px_rgba(215,25,32,0.45)]`}
                  >
                    {`FUERZA.`}
                    <motion.span
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `100%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 1.1,
                        ease: `easeOut`,
                      }}
                      className={`absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-2 bg-[#D71920] rounded-full`}
                    />
                  </span>
                </motion.div>
              </div>
            </div>
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.8,
              }}
              className={`text-neutral-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-10`}
            >{`En 7 Strength Center, cada entrenamiento es una oportunidad para superar tus límites y convertirte en tu mejor versión.`}</motion.p>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 1,
              }}
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5`}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => e(`#planes`)}
                className={`group relative overflow-hidden px-8 py-4.5 liquid-glass-red text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl shadow-[0_15px_40px_rgba(215,25,32,0.4)] hover:shadow-[0_20px_50px_rgba(215,25,32,0.6)] text-center cursor-pointer flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/50`}
              >
                <span
                  className={`absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-800 pointer-events-none`}
                />
                <span className={`relative z-10`}>{`CONOCE NUESTROS PLANES`}</span>
                <ArrowRightIcon
                  className={`relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200`}
                />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => e(`#instalaciones`)}
                className={`group px-8 py-4.5 liquid-glass hover:border-[#D71920]/80 text-neutral-200 hover:text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl transition-all duration-300 text-center cursor-pointer shadow-xl flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] border border-white/15`}
              >
                <span>{`EXPLORA EL GIMNASIO`}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1.3,
          }}
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pt-8`}
        >
          <button
            onClick={() => e(`#nosotros`)}
            className={`group flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none`}
            aria-label={`Deslizar hacia abajo para explorar el gimnasio`}
          >
            <span
              className={`text-[11px] font-semibold tracking-[0.25em]`}
            >{`DESLIZA PARA EXPLORAR`}</span>
            <div
              className={`w-5 h-8 rounded-full border border-neutral-700 group-hover:border-[#D71920] flex items-start justify-center p-1 transition-colors`}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: 1 / 0,
                  duration: 1.6,
                  ease: `easeInOut`,
                }}
                className={`w-1 h-2 bg-[#D71920] rounded-full`}
              />
            </div>
          </button>
        </motion.div>
      </section>
    );
  },
  About = () => {
    let e = (0, React.useMemo)(() => getOpeningStatus(), []),
      t = [
        {
          icon: DumbbellIcon,
          title: `FUERZA`,
          text: `Cada entrenamiento es una oportunidad para avanzar.`,
          number: `01`,
        },
        {
          icon: TargetIcon,
          title: `DISCIPLINA`,
          text: `La constancia transforma tus objetivos en resultados.`,
          number: `02`,
        },
        {
          icon: UsersIcon,
          title: `COMUNIDAD`,
          text: `Comparte tu pasión por el entrenamiento.`,
          number: `03`,
        },
      ];
    return (
      <section
        id={`nosotros`}
        className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
      >
        <div
          className={`absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`}
        />
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: !0,
              margin: `-60px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`mb-16`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
            >
              <span className={`w-6 h-[2px] bg-[#D71920]`} />
              <span>{`FILOSOFÍA 7 STRENGTH`}</span>
              <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
              <span className={`text-neutral-400`}>{`CAJAMARCA`}</span>
            </div>
            <h2
              className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95] max-w-4xl`}
            >
              {`MÁS QUE UN GIMNASIO. `}
              <span className={`text-[#D71920]`}>{`UNA COMUNIDAD.`}</span>
            </h2>
          </motion.div>
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: !0,
                margin: `-60px`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`lg:col-span-5 relative`}
            >
              <div
                className={`group relative rounded-3xl overflow-hidden liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/30 transition-all duration-500`}
              >
                <div
                  className={`absolute -top-24 -left-24 w-60 h-60 bg-[#D71920]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D71920]/40 transition-all duration-700`}
                />
                <div
                  className={`absolute -bottom-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none`}
                />
                <div className={`relative z-10 flex flex-col`}>
                  <div
                    className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-6 group/img`}
                  >
                    <img
                      src={`/assets/aistudio/image_993ddb80.png`}
                      alt={`Interior real de 7 Strength Center en Cajamarca`}
                      className={`w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent`}
                    />
                    <div className={`absolute bottom-3 left-3 flex items-center gap-3`}>
                      <div
                        className={`w-14 h-14 rounded-xl liquid-glass p-1 shadow-2xl shrink-0 flex items-center justify-center border border-white/20`}
                      >
                        <img
                          src={siteConfig.logoPath}
                          alt={`Emblema oficial 7 Strength Center`}
                          className={`w-full h-full object-contain`}
                        />
                      </div>
                      <div>
                        <span
                          className={`text-[10px] text-[#D71920] font-bold tracking-[0.2em] uppercase block`}
                        >{`SEDE OFICIAL`}</span>
                        <h4
                          className={`font-display text-lg text-white leading-none`}
                        >{`7 STRENGTH CENTER`}</h4>
                      </div>
                    </div>
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full liquid-glass text-[10px] font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1 border border-white/20`}
                    >
                      <ShieldCheckIcon className={`w-3 h-3 text-[#D71920]`} />
                      <span>{`Instalación Real`}</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between px-1`}>
                    <div>
                      <h3
                        className={`font-display text-2xl text-white tracking-wide`}
                      >{`LOS LEONES 164`}</h3>
                      <p
                        className={`text-xs text-neutral-400 uppercase tracking-widest`}
                      >{`Cajamarca · Perú`}</p>
                    </div>
                    <span
                      className={`text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40`}
                    >{`2 NIVELES`}</span>
                  </div>
                  <div
                    className={`mt-5 w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-between shadow-inner ${e.badgeColorClass}`}
                  >
                    <span className={`flex items-center gap-2`}>
                      <ClockIcon className={`w-3.5 h-3.5`} />
                      <span>{e.statusLabel}</span>
                    </span>
                    <span className={`text-[11px] opacity-90`}>{e.nextEventDescription}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: !0,
                margin: `-60px`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`lg:col-span-7 flex flex-col justify-center`}
            >
              <p
                className={`text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed mb-10 border-l-2 border-[#D71920] pl-6 py-1`}
              >{`En 7 Strength Center creemos que la fuerza se construye con esfuerzo, disciplina y constancia. Somos un espacio dedicado a quienes buscan mejorar su condición física, superar sus propios límites y disfrutar del entrenamiento como parte de su estilo de vida.`}</p>
              <div className={`grid grid-cols-1 gap-4 sm:gap-5`}>
                {t.map((e, t) => {
                  let n = e.icon;
                  return (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: !0,
                        margin: `-40px`,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: t * 0.12,
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: {
                          type: `spring`,
                          stiffness: 400,
                          damping: 25,
                        },
                      }}
                      className={`group flex items-start gap-5 p-6 rounded-2xl liquid-glass liquid-glass-interactive shadow-lg hover:shadow-2xl hover:shadow-red-950/30`}
                      key={e.title}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl liquid-glass border border-white/15 group-hover:border-[#D71920] group-hover:bg-[#D71920]/20 flex items-center justify-center shrink-0 transition-all duration-300`}
                      >
                        {(0, jsxRuntime.jsx)(n, {
                          className: `w-7 h-7 text-[#D71920] group-hover:scale-110 transition-transform duration-300`,
                        })}
                      </div>
                      <div className={`flex-1`}>
                        <div className={`flex items-center justify-between`}>
                          <h4
                            className={`font-display text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#D71920] transition-colors`}
                          >
                            {e.title}
                          </h4>
                          <span className={`font-display text-sm text-neutral-500 tracking-wider`}>
                            {e.number}
                          </span>
                        </div>
                        <p className={`text-sm sm:text-base text-neutral-300 mt-1 leading-normal`}>
                          {e.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div
                className={`mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <span
                  className={`text-xs text-neutral-400`}
                >{`Instalaciones profesionales en Los Leones 164, Cajamarca`}</span>
                <a
                  href={whatsappUrl()}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-white uppercase tracking-wider transition-colors group`}
                >
                  <span>{`CONSULTAR POR WHATSAPP`}</span>
                  <ArrowRightIcon
                    className={`w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform`}
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
  GalleryLightbox = ({ slot: e, slots: t, onClose: n, onNavigate: r }) => {
    if (
      ((0, React.useEffect)(() => {
        if (!e) return;
        let t = (e) => {
          (e.key === `Escape` && n(), e.key === `ArrowLeft` && a(), e.key === `ArrowRight` && o());
        };
        return (
          window.addEventListener(`keydown`, t),
          () => window.removeEventListener(`keydown`, t)
        );
      }, [e]),
      !e)
    )
      return null;
    let i = t.findIndex((t) => t.id === e.id),
      a = () => {
        r(t[(i - 1 + t.length) % t.length]);
      },
      o = () => {
        r(t[(i + 1) % t.length]);
      };
    return (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6`}
          role={`dialog`}
          aria-modal={`true`}
          aria-label={`Visualizador: ${e.title}`}
        >
          <div
            className={`absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20`}
          >
            <div
              className={`flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400`}
            >
              <span className={`text-white font-bold`}>{i + 1}</span>
              <span>{`/`}</span>
              <span>{t.length}</span>
              <span className={`hidden sm:inline`}>{`·`}</span>
              <span className={`hidden sm:inline text-neutral-300`}>{e.category}</span>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={n}
              className={`p-3 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`}
              aria-label={`Cerrar visor`}
            >
              <XIcon className={`w-5 h-5`} />
            </motion.button>
          </div>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={a}
            className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`}
            aria-label={`Fotografía anterior`}
          >
            <ChevronLeftIcon className={`w-6 h-6`} />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={o}
            className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl`}
            aria-label={`Fotografía siguiente`}
          >
            <ChevronRightIcon className={`w-6 h-6`} />
          </motion.button>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center`}
            key={e.id}
          >
            <div
              className={`relative w-full max-h-[70vh] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex items-center justify-center`}
            >
              {e.sampleImage ? (
                <img
                  src={e.sampleImage}
                  alt={e.title}
                  className={`w-full max-h-[70vh] object-contain`}
                />
              ) : (
                <div
                  className={`w-full h-80 flex flex-col items-center justify-center p-8 text-center bg-neutral-900`}
                >
                  <ZoomInIcon className={`w-12 h-12 text-neutral-600 mb-3`} />
                  <p className={`text-white font-display text-2xl`}>{e.title}</p>
                  <p className={`text-sm text-neutral-400 max-w-md mt-2`}>{e.placeholderText}</p>
                </div>
              )}
              <div
                className={`absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2 text-xs text-neutral-200 shadow-lg`}
              >
                <span className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0`} />
                <span>{`Fotografía Oficial · Instalaciones reales de 7 Strength Center en Cajamarca`}</span>
              </div>
            </div>
            <div className={`mt-5 text-center max-w-2xl px-4`}>
              <h3 className={`font-display text-3xl sm:text-4xl text-white tracking-wide`}>
                {e.title}
              </h3>
              <p className={`text-sm text-neutral-300 mt-1.5 leading-relaxed`}>{e.description}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
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
    return (
      <section
        id={`instalaciones`}
        className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: !0,
              margin: `-60px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`}
          >
            <div className={`max-w-2xl`}>
              <div
                className={`flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
              >
                <span className={`w-6 h-[2px] bg-[#D71920]`} />
                <span>{`ESPACIOS DE ENTRENAMIENTO`}</span>
                <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
                <span className={`text-neutral-400`}>{`GALERÍA`}</span>
              </div>
              <h2
                className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`}
              >
                {`CONOCE DONDE COMIENZA `}
                <span className={`text-[#D71920]`}>{`TU TRANSFORMACIÓN.`}</span>
              </h2>
              <p
                className={`text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`}
              >{`Descubre los espacios de 7 Strength Center y conoce el lugar donde podrás llevar tu entrenamiento al siguiente nivel.`}</p>
            </div>
            <div
              className={`flex items-center gap-2.5 px-4 py-3 liquid-glass rounded-xl text-xs text-neutral-300 max-w-sm shrink-0 shadow-lg border border-white/15`}
            >
              <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0`} />
              <p className={`leading-snug`}>
                <strong className={`text-white`}>{`Fotografías 100% Reales:`}</strong>
                {` Conoce las instalaciones oficiales de nuestra sede en Los Leones 164, Cajamarca.`}
              </p>
            </div>
          </motion.div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5`}>
            {siteConfig.gallerySlots.map((e, r) => {
              let i = n(e.aspect, r);
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: !0,
                    margin: `-50px`,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: r * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.015,
                    transition: {
                      type: `spring`,
                      stiffness: 400,
                      damping: 25,
                    },
                  }}
                  onClick={() => t(e)}
                  onKeyDown={(n) => {
                    (n.key === `Enter` || n.key === ` `) && (n.preventDefault(), t(e));
                  }}
                  tabIndex={0}
                  role={`button`}
                  aria-label={`Ver detalle de ${e.title}`}
                  className={`group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive cursor-pointer shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col justify-end p-6 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] ${i}`}
                  key={e.id}
                >
                  {e.sampleImage ? (
                    <img
                      src={e.sampleImage}
                      alt={e.title}
                      className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-65 group-hover:brightness-85 group-hover:scale-105 transition-all duration-700 ease-out`}
                      loading={`lazy`}
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black`}
                    />
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300`}
                  />
                  <div
                    className={`absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none`}
                  />
                  <div className={`relative z-10 flex items-center justify-between mb-auto`}>
                    <span
                      className={`text-[11px] font-semibold tracking-wider uppercase text-neutral-200 px-3 py-1 rounded-full liquid-glass border border-white/20`}
                    >
                      {e.category}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-[#D71920] group-hover:border-[#D71920] group-hover:scale-110 transition-all duration-200`}
                    >
                      <Maximize2Icon className={`w-4 h-4`} />
                    </div>
                  </div>
                  <div className={`relative z-10 mt-6`}>
                    <div className={`flex items-center gap-2 mb-2`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-[#D71920] group-hover:animate-ping`}
                      />
                      <span
                        className={`text-[11px] text-[#D71920] font-bold tracking-[0.2em] uppercase`}
                      >{`Instalación Real`}</span>
                    </div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl text-white tracking-wide leading-none group-hover:text-[#D71920] transition-colors duration-200`}
                    >
                      {e.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 leading-relaxed`}
                    >
                      {e.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div
            className={`mt-10 text-center text-xs text-neutral-400`}
          >{`Haz clic en cualquier fotografía o espacio para ampliar a pantalla completa con navegación interactiva.`}</div>
        </div>
        <GalleryLightbox
          slot={e}
          slots={siteConfig.gallerySlots}
          onClose={() => t(null)}
          onNavigate={(e) => t(e)}
        />
      </section>
    );
  },
  Plans = () => (
    <section
      id={`planes`}
      className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/12 blur-[180px] pointer-events-none rounded-full`}
      />
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: !0,
            margin: `-60px`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`text-center max-w-3xl mx-auto mb-20`}
        >
          <div
            className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
          >
            <span className={`w-5 h-[2px] bg-[#D71920]`} />
            <span>{`MEMBRESÍAS OFICIALES`}</span>
            <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
            <span className={`text-neutral-400`}>{`TARIFAS CLARAS`}</span>
            <span className={`w-5 h-[2px] bg-[#D71920]`} />
          </div>
          <h2
            className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`}
          >
            {`ELIGE TU PLAN. `}
            <span className={`text-[#D71920]`}>{`EMPIEZA TU CAMBIO.`}</span>
          </h2>
          <p
            className={`text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`}
          >{`Encuentra la opción que mejor se adapte a tu entrenamiento.`}</p>
        </motion.div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch`}
        >
          {siteConfig.plans.map((e, t) => {
            let n = e.id === `plan-mensual`;
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: !0,
                  margin: `-50px`,
                }}
                transition={{
                  duration: 0.7,
                  delay: t * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.025,
                  transition: {
                    type: `spring`,
                    stiffness: 350,
                    damping: 25,
                  },
                }}
                className={`group relative rounded-3xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-400 ${n ? `liquid-glass-red shadow-[0_20px_50px_rgba(215,25,32,0.35)]` : `liquid-glass liquid-glass-interactive shadow-xl`}`}
                key={e.id}
              >
                {n && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#D71920] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-red-950/60 flex items-center gap-1.5 whitespace-nowrap border border-white/20`}
                  >
                    <ZapIcon className={`w-3.5 h-3.5 fill-current`} />
                    <span>{`PLAN RECOMENDADO`}</span>
                  </div>
                )}
                <div>
                  <div className={`flex items-center justify-between mb-4`}>
                    <span
                      className={`text-xs font-bold tracking-wider uppercase text-neutral-300 px-3 py-1 rounded-full liquid-glass-subtle border border-white/10`}
                    >
                      {e.period}
                    </span>
                    <span
                      className={`text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase`}
                    >{`7 STRENGTH`}</span>
                  </div>
                  <h3
                    className={`font-display text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#D71920] transition-colors duration-200`}
                  >
                    {e.name}
                  </h3>
                  <p className={`text-xs text-neutral-400 mt-1 mb-6`}>{e.tagline}</p>
                  <div
                    className={`pt-2 pb-6 border-y border-white/10 mb-6 group-hover:border-white/20 transition-colors`}
                  >
                    <div className={`flex items-baseline gap-2`}>
                      <span
                        className={`text-xs text-neutral-400 uppercase font-semibold`}
                      >{`PRECIO`}</span>
                      <span
                        className={`font-display text-5xl sm:text-6xl text-white tracking-tight font-bold tabular-nums`}
                      >
                        {e.formattedPrice}
                      </span>
                    </div>
                    <span className={`text-xs text-neutral-400 mt-1 block`}>
                      {`Duración oficial: `}
                      <strong className={`text-neutral-200`}>{e.period}</strong>
                    </span>
                  </div>
                  <p className={`text-sm text-neutral-300 mb-6 leading-relaxed`}>{e.description}</p>
                  <div className={`space-y-3.5 mb-8`}>
                    {e.features.map((e) => (
                      <div
                        className={`flex items-start gap-3 text-xs sm:text-sm text-neutral-300`}
                        key={e}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-[#D71920]/20 text-[#D71920] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}
                        >
                          <CheckIcon className={`w-3 h-3 stroke-[3]`} />
                        </div>
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`pt-5 border-t border-white/10 mt-auto`}>
                  <a
                    href={e.whatsappUrl}
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    className={`relative overflow-hidden w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group text-center cursor-pointer shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${n ? `bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-900/40 hover:shadow-red-900/70 border border-white/20` : `liquid-glass text-white hover:border-[#D71920]`}`}
                  >
                    <span
                      className={`absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`}
                    />
                    <span className={`relative z-10`}>{e.buttonText}</span>
                    <ArrowRightIcon
                      className={`relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200`}
                    />
                  </a>
                  <span
                    className={`text-[11px] text-neutral-400 text-center block mt-3`}
                  >{`Respuesta directa por WhatsApp sin intermediarios`}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: !0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className={`mt-16 max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-neutral-400`}
        >
          <ShieldCheckIcon className={`w-4 h-4 text-[#D71920] shrink-0`} />
          <span>{`Precios oficiales transparentes. Sin matrícula obligatoria ni cobros ocultos.`}</span>
        </motion.div>
      </div>
    </section>
  ),
  Schedule = () => (
    <section
      id={`horarios`}
      className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
    >
      <div
        className={`absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`}
      />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: !0,
            margin: `-60px`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`text-center max-w-3xl mx-auto mb-20`}
        >
          <div
            className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
          >
            <span className={`w-5 h-[2px] bg-[#D71920]`} />
            <span>{`DISPONIBILIDAD Y TURNOS`}</span>
            <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
            <span className={`text-neutral-400`}>{`HORARIOS OFICIALES`}</span>
            <span className={`w-5 h-[2px] bg-[#D71920]`} />
          </div>
          <h2
            className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`}
          >
            {`ENTRENA A `}
            <span className={`text-[#D71920]`}>{`TU RITMO.`}</span>
          </h2>
          <p
            className={`text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`}
          >{`Organiza tus entrenamientos y encuentra el mejor momento para dar lo máximo.`}</p>
        </motion.div>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch`}
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: !0,
              margin: `-50px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                type: `spring`,
                stiffness: 350,
                damping: 25,
              },
            }}
            className={`group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.2)]`}
          >
            <div>
              <div className={`flex items-center justify-between pb-6 border-b border-white/10`}>
                <div className={`flex items-center gap-3`}>
                  <div
                    className={`w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform`}
                  >
                    <CalendarIcon className={`w-6 h-6`} />
                  </div>
                  <div>
                    <h3
                      className={`font-display text-3xl sm:text-4xl text-white tracking-wide leading-none`}
                    >{`LUNES A VIERNES`}</h3>
                    <span
                      className={`text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block`}
                    >{`Entrenamiento entre semana`}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40 uppercase tracking-wider`}
                >{`2 Turnos`}</span>
              </div>
              <div className={`py-6 border-b border-white/10`}>
                <div
                  className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2`}
                >
                  <SunIcon className={`w-4 h-4`} />
                  <span>{`TURNO MAÑANA`}</span>
                </div>
                <div
                  className={`font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`}
                >{`7:00 a. m. – 1:00 p. m.`}</div>
                <p
                  className={`text-xs text-neutral-400 mt-2`}
                >{`Ideal para empezar el día con máxima energía antes de tus labores.`}</p>
              </div>
              <div
                className={`my-5 py-3 px-4 rounded-xl liquid-glass-subtle border border-white/10 flex items-center gap-3 text-xs text-neutral-300`}
              >
                <ClockIcon className={`w-4 h-4 text-[#D71920] shrink-0`} />
                <span className={`leading-snug`}>
                  {`Pausa intermedia de mantenimiento y descanso: `}
                  <strong className={`text-white`}>{`1:00 p. m. a 3:00 p. m.`}</strong>
                </span>
              </div>
              <div className={`py-4`}>
                <div
                  className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-400 mb-2`}
                >
                  <MoonIcon className={`w-4 h-4`} />
                  <span>{`TURNO TARDE`}</span>
                </div>
                <div
                  className={`font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`}
                >{`3:00 p. m. – 9:00 p. m.`}</div>
                <p
                  className={`text-xs text-neutral-400 mt-2`}
                >{`Horario de máxima intensidad para completar tu jornada de pesas.`}</p>
              </div>
            </div>
            <div
              className={`pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between`}
            >
              <span>{`Acceso permitido en ambos turnos con tu membresía.`}</span>
              <span className={`w-2 h-2 rounded-full bg-[#D71920]`} />
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: !0,
              margin: `-50px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                type: `spring`,
                stiffness: 350,
                damping: 25,
              },
            }}
            className={`group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
          >
            <div>
              <div className={`pb-8 border-b border-white/10`}>
                <div className={`flex items-center justify-between mb-4`}>
                  <div className={`flex items-center gap-3`}>
                    <div
                      className={`w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform`}
                    >
                      <ClockIcon className={`w-6 h-6`} />
                    </div>
                    <div>
                      <h3
                        className={`font-display text-3xl sm:text-4xl text-white tracking-wide leading-none`}
                      >{`SÁBADOS`}</h3>
                      <span
                        className={`text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block`}
                      >{`Fin de semana activo`}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold text-amber-400 px-3 py-1 rounded-full liquid-glass-subtle border border-amber-400/40 uppercase tracking-wider`}
                  >{`Matutino`}</span>
                </div>
                <div className={`pt-2`}>
                  <div
                    className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2`}
                  >
                    <SunIcon className={`w-4 h-4`} />
                    <span>{`TURNO CONTINUO`}</span>
                  </div>
                  <div
                    className={`font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none`}
                  >{`8:00 a. m. – 1:00 p. m.`}</div>
                  <p
                    className={`text-xs text-neutral-400 mt-2`}
                  >{`Entrena temprano en sábado y mantén tu constancia sin interrupciones.`}</p>
                </div>
              </div>
              <div className={`pt-6`}>
                <div className={`flex items-center gap-2.5 mb-3`}>
                  <div
                    className={`w-8 h-8 rounded-lg liquid-glass border border-white/15 flex items-center justify-center text-amber-400`}
                  >
                    <CircleQuestionMarkIcon className={`w-4 h-4`} />
                  </div>
                  <div>
                    <h4
                      className={`font-display text-2xl text-white tracking-wide`}
                    >{`DOMINGOS`}</h4>
                    <span
                      className={`text-[11px] text-amber-400 font-bold uppercase tracking-wider`}
                    >{`Horario no confirmado`}</span>
                  </div>
                </div>
                <p
                  className={`text-xs text-neutral-300 leading-relaxed mb-6`}
                >{`Para garantizar la exactitud de tu visita y evitar traslados innecesarios, consúltanos directamente por WhatsApp antes de acudir en domingo.`}</p>
                <a
                  href={whatsappUrl(
                    `Hola, quisiera consultar si 7 Strength Center abre este domingo.`,
                  )}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`w-full py-3.5 px-5 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/20 hover:border-[#D71920] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md group/btn`}
                >
                  <MessageCircleIcon
                    className={`w-4 h-4 text-[#D71920] group-hover/btn:text-white transition-colors`}
                  />
                  <span>{`CONSULTAR DISPONIBILIDAD DOMINICAL`}</span>
                  <ArrowRightIcon
                    className={`w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform`}
                  />
                </a>
              </div>
            </div>
            <div
              className={`pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between`}
            >
              <span>{`Respuestas directas por WhatsApp oficial.`}</span>
              <span className={`w-2 h-2 rounded-full bg-amber-400`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  ),
  Community = () => {
    let [e, t] = (0, React.useState)(null),
      n = (e) => {
        t((t) => (t === e ? null : e));
      };
    return (
      <section
        id={`comunidad`}
        className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
      >
        <div
          className={`absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full`}
        />
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: !0,
              margin: `-60px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`}
          >
            <div className={`max-w-2xl`}>
              <div
                className={`flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
              >
                <span className={`w-5 h-[2px] bg-[#D71920]`} />
                <InstagramIcon className={`w-3.5 h-3.5`} />
                <span>{`COMUNIDAD OFICIAL`}</span>
                <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
                <span className={`text-neutral-400`}>{`@7strength`}</span>
              </div>
              <h2
                className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`}
              >
                {`VIVE LA EXPERIENCIA `}
                <span className={`text-[#D71920]`}>{`7 STRENGTH.`}</span>
              </h2>
              <p
                className={`text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed`}
              >{`Entrenamientos, energía y momentos que forman parte de nuestra comunidad.`}</p>
            </div>
            <motion.a
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              href={siteConfig.social.instagramUrl}
              target={`_blank`}
              rel={`noopener noreferrer`}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#D71920] text-neutral-200 hover:text-white transition-all text-xs font-bold tracking-wider uppercase shrink-0 shadow-xl`}
            >
              <InstagramIcon className={`w-4 h-4 text-[#D71920]`} />
              <span>{`SÍGUENOS EN INSTAGRAM`}</span>
              <ExternalLinkIcon className={`w-3.5 h-3.5 text-neutral-400`} />
            </motion.a>
          </motion.div>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory`}
          >
            {siteConfig.reels.map((t, r) => {
              let i = e === t.id;
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: !0,
                    margin: `-50px`,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: r * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: `spring`,
                      stiffness: 350,
                      damping: 25,
                    },
                  }}
                  className={`group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive shadow-2xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col snap-center min-w-[280px]`}
                  key={t.id}
                >
                  <div
                    className={`relative w-full aspect-[9/16] max-h-[560px] bg-neutral-950/80 overflow-hidden flex flex-col items-center justify-center`}
                  >
                    {i ? (
                      <iframe
                        src={`https://www.instagram.com/reel/${t.reelCode}/embed/`}
                        className={`w-full h-full border-0`}
                        allow={`autoplay; encrypted-media`}
                        title={t.title}
                        loading={`lazy`}
                      />
                    ) : (
                      <div
                        className={`relative w-full h-full flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-neutral-900/60 via-neutral-950/80 to-black select-none`}
                      >
                        <div
                          className={`absolute inset-0 opacity-20 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none`}
                        />
                        <div className={`relative z-10 flex items-center justify-between`}>
                          <span
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-white/20 text-[11px] font-bold text-neutral-200 uppercase tracking-wider`}
                          >
                            <InstagramIcon className={`w-3.5 h-3.5 text-[#D71920]`} />
                            <span>
                              {`Reel `}
                              {r + 1}
                            </span>
                          </span>
                          <span className={`text-[11px] font-mono text-neutral-400`}>
                            {t.reelCode}
                          </span>
                        </div>
                        <div
                          className={`relative z-10 flex flex-col items-center text-center my-auto`}
                        >
                          <motion.button
                            whileHover={{
                              scale: 1.15,
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                            onClick={() => n(t.id)}
                            className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D71920] hover:bg-[#A80F15] text-white flex items-center justify-center shadow-[0_0_35px_rgba(215,25,32,0.6)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 mb-3 border border-white/20`}
                            aria-label={`Reproducir ${t.title}`}
                          >
                            <PlayIcon className={`w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1`} />
                          </motion.button>
                          <p
                            className={`text-xs uppercase tracking-widest text-neutral-300 font-semibold mt-1`}
                          >{`Toca para reproducir`}</p>
                        </div>
                        <div className={`relative z-10`}>
                          <div
                            className={`flex items-center gap-1.5 text-[10px] text-[#D71920] font-bold uppercase tracking-wider mb-1`}
                          >
                            <SparklesIcon className={`w-3 h-3`} />
                            <span>{`Contenido Oficial`}</span>
                          </div>
                          <h3
                            className={`font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-2 group-hover:text-[#D71920] transition-colors`}
                          >
                            {t.title}
                          </h3>
                          <p className={`text-xs text-neutral-300 line-clamp-2 leading-relaxed`}>
                            {t.description}
                          </p>
                        </div>
                      </div>
                    )}
                    {i && (
                      <button
                        onClick={() => n(t.id)}
                        className={`absolute top-3 right-3 z-30 px-3 py-1 rounded-full liquid-glass text-[11px] text-neutral-300 border border-white/20 hover:text-white cursor-pointer shadow-lg`}
                      >{`Cerrar reproductor`}</button>
                    )}
                  </div>
                  <div
                    className={`p-4 sm:p-5 liquid-glass-subtle border-t border-white/10 flex items-center justify-between gap-3`}
                  >
                    <div className={`flex flex-col`}>
                      <span
                        className={`text-[10px] text-[#D71920] font-bold uppercase tracking-wider`}
                      >{`Instagram Oficial`}</span>
                      <span
                        className={`text-xs font-semibold text-neutral-200`}
                      >{`@7strength`}</span>
                    </div>
                    <a
                      href={t.url}
                      target={`_blank`}
                      rel={`noopener noreferrer`}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/15 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow`}
                    >
                      <span>{`ABRIR EN IG`}</span>
                      <ExternalLinkIcon className={`w-3.5 h-3.5`} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: !0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className={`mt-16 rounded-3xl liquid-glass p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/15`}
          >
            <div className={`flex items-center gap-5`}>
              <div
                className={`w-14 h-14 rounded-2xl liquid-glass border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shrink-0`}
              >
                <InstagramIcon className={`w-7 h-7`} />
              </div>
              <div>
                <h4
                  className={`font-display text-2xl sm:text-3xl text-white tracking-wide`}
                >{`ÚNETE A NUESTRA COMUNIDAD EN REDES`}</h4>
                <p
                  className={`text-sm text-neutral-400 mt-1`}
                >{`Publicaciones, técnicas de levantamiento y novedades exclusivas en nuestro perfil oficial.`}</p>
              </div>
            </div>
            <div className={`flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto`}>
              <a
                href={siteConfig.social.featuredPostUrl}
                target={`_blank`}
                rel={`noopener noreferrer`}
                className={`w-full sm:w-auto text-center px-5 py-3.5 rounded-xl liquid-glass-subtle hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-bold tracking-wider uppercase transition-colors`}
              >{`VER PUBLICACIÓN DESTACADA`}</a>
              <a
                href={siteConfig.social.instagramUrl}
                target={`_blank`}
                rel={`noopener noreferrer`}
                className={`w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-[#D71920] hover:bg-[#A80F15] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 border border-white/20`}
              >
                <span>{`SEGUIR @7STRENGTH`}</span>
                <ArrowRightIcon className={`w-4 h-4`} />
              </a>
            </div>
          </motion.div>
          <div
            className={`mt-8 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center`}
          >
            <ShieldCheckIcon className={`w-4 h-4 text-[#D71920] shrink-0`} />
            <span>{`Integración directa con los tres reels verificados de 7 Strength Center en Instagram`}</span>
          </div>
        </div>
      </section>
    );
  },
  Contact = () => {
    let [e, t] = (0, React.useState)(null),
      n = (e, n) => {
        (navigator.clipboard.writeText(e), t(n), setTimeout(() => t(null), 2500));
      };
    return (
      <section
        id={`contacto`}
        className={`py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: !0,
              margin: `-60px`,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`mb-16`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3`}
            >
              <span className={`w-5 h-[2px] bg-[#D71920]`} />
              <span>{`ENCUÉNTRANOS EN CAJAMARCA`}</span>
              <span aria-hidden={`true`} className={`text-neutral-700`}>{`·`}</span>
              <span className={`text-neutral-400`}>{`UBICACIÓN Y CONTACTO`}</span>
            </div>
            <h2
              className={`font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]`}
            >
              {`ESTAMOS LISTOS `}
              <span className={`text-[#D71920]`}>{`PARA RECIBIRTE.`}</span>
            </h2>
            <p
              className={`text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl`}
            >{`Visítanos en nuestras instalaciones o escríbenos directamente por WhatsApp para coordinar tu primer día de entrenamiento.`}</p>
          </motion.div>
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch`}>
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: !0,
                margin: `-50px`,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`lg:col-span-5 flex flex-col justify-between rounded-3xl liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/25 transition-all duration-300`}
            >
              <div>
                <div className={`flex items-center gap-4 pb-6 border-b border-white/10`}>
                  <img
                    src={siteConfig.logoPath}
                    alt={`Logo 7 Strength Center`}
                    className={`w-14 h-14 object-contain rounded-xl liquid-glass p-1.5 border border-white/20 shadow`}
                  />
                  <div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl text-white tracking-wide leading-none`}
                    >
                      {siteConfig.name}
                    </h3>
                    <span
                      className={`text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase mt-1 block`}
                    >{`Cajamarca · Perú`}</span>
                  </div>
                </div>
                <div className={`space-y-6 my-8`}>
                  <div className={`flex items-start gap-4`}>
                    <div
                      className={`w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`}
                    >
                      <MapPinIcon className={`w-5 h-5`} />
                    </div>
                    <div className={`flex-1`}>
                      <span
                        className={`text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`}
                      >{`Dirección Oficial`}</span>
                      <p className={`text-sm font-semibold text-white mt-0.5`}>
                        {siteConfig.address}
                      </p>
                      <button
                        onClick={() => n(siteConfig.address, `address`)}
                        className={`mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer`}
                      >
                        {e === `address` ? (
                          <jsxRuntime.Fragment>
                            <CheckIcon className={`w-3.5 h-3.5 text-emerald-400`} />
                            <span
                              className={`text-emerald-400 font-bold`}
                            >{`Copiado al portapapeles`}</span>
                          </jsxRuntime.Fragment>
                        ) : (
                          <jsxRuntime.Fragment>
                            <CopyIcon className={`w-3.5 h-3.5`} />
                            <span>{`Copiar dirección`}</span>
                          </jsxRuntime.Fragment>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4`}>
                    <div
                      className={`w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5`}
                    >
                      <PhoneIcon className={`w-5 h-5`} />
                    </div>
                    <div className={`flex-1`}>
                      <span
                        className={`text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`}
                      >{`WhatsApp Oficial`}</span>
                      <a
                        href={whatsappUrl()}
                        target={`_blank`}
                        rel={`noopener noreferrer`}
                        className={`text-base font-bold text-white hover:text-emerald-400 transition-colors inline-block mt-0.5`}
                      >
                        {siteConfig.phone.display}
                      </a>
                      <button
                        onClick={() => n(siteConfig.phone.display, `phone`)}
                        className={`mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer ml-3`}
                      >
                        {e === `phone` ? (
                          <jsxRuntime.Fragment>
                            <CheckIcon className={`w-3.5 h-3.5 text-emerald-400`} />
                            <span className={`text-emerald-400 font-bold`}>{`Copiado`}</span>
                          </jsxRuntime.Fragment>
                        ) : (
                          <jsxRuntime.Fragment>
                            <CopyIcon className={`w-3.5 h-3.5`} />
                            <span>{`Copiar`}</span>
                          </jsxRuntime.Fragment>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4`}>
                    <div
                      className={`w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`}
                    >
                      <ClockIcon className={`w-5 h-5`} />
                    </div>
                    <div className={`flex-1`}>
                      <span
                        className={`text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`}
                      >{`Horarios Resumidos`}</span>
                      <p className={`text-xs text-neutral-300 mt-1`}>
                        <strong>{`L-V:`}</strong>
                        {` 7:00 am – 1:00 pm / 3:00 pm – 9:00 pm`}
                      </p>
                      <p className={`text-xs text-neutral-300 mt-0.5`}>
                        <strong>{`Sábados:`}</strong>
                        {` 8:00 am – 1:00 pm`}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4`}>
                    <div
                      className={`w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5`}
                    >
                      <InstagramIcon className={`w-5 h-5`} />
                    </div>
                    <div className={`flex-1`}>
                      <span
                        className={`text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block`}
                      >{`Instagram`}</span>
                      <a
                        href={siteConfig.social.instagramUrl}
                        target={`_blank`}
                        rel={`noopener noreferrer`}
                        className={`text-sm font-semibold text-white hover:text-[#D71920] transition-colors mt-0.5 inline-block`}
                      >
                        {siteConfig.social.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`pt-6 border-t border-white/10`}>
                <a
                  href={whatsappUrl()}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`group relative overflow-hidden w-full py-4 px-6 rounded-2xl bg-[#D71920] hover:bg-[#A80F15] text-white font-heading font-bold text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 text-center border border-white/20`}
                >
                  <span
                    className={`absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none`}
                  />
                  <span className={`relative z-10`}>{`CONTACTAR POR WHATSAPP`}</span>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: !0,
                margin: `-50px`,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`lg:col-span-7 flex flex-col rounded-3xl overflow-hidden liquid-glass border border-white/15 shadow-2xl`}
            >
              <div
                className={`p-4 sm:p-5 liquid-glass-subtle border-b border-white/10 flex items-center justify-between`}
              >
                <div className={`flex items-center gap-2.5`}>
                  <MapPinIcon className={`w-4 h-4 text-[#D71920]`} />
                  <span
                    className={`text-xs font-bold text-white tracking-wider uppercase`}
                  >{`Ubicación en Google Maps`}</span>
                </div>
                <span
                  className={`text-[11px] text-neutral-400`}
                >{`Los Leones 164, Cajamarca`}</span>
              </div>
              <div
                className={`relative w-full flex-1 min-h-[350px] sm:min-h-[420px] bg-neutral-950`}
              >
                <iframe
                  title={`Mapa oficial de ubicación 7 Strength Center en Cajamarca`}
                  width={`100%`}
                  height={`100%`}
                  className={`w-full h-full border-0 filter contrast-125 brightness-90 grayscale-[0.2]`}
                  loading={`lazy`}
                  allowFullScreen={!0}
                  referrerPolicy={`no-referrer-when-downgrade`}
                  src={`https://maps.google.com/maps?q=Los+Leones+164,+Cajamarca+06002,+Peru&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
              <div
                className={`p-6 sm:p-8 liquid-glass-subtle border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4`}
              >
                <div>
                  <h4
                    className={`font-display text-2xl text-white tracking-wide`}
                  >{`¿PLANEAS VISITARNOS?`}</h4>
                  <p
                    className={`text-xs text-neutral-400 mt-0.5`}
                  >{`Abre la ruta directa en tu aplicación de Google Maps y llega sin complicaciones.`}</p>
                </div>
                <a
                  href={siteConfig.googleMapsUrl}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-heading font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shrink-0 shadow-lg transform hover:-translate-y-0.5 active:scale-95`}
                >
                  <NavigationIcon className={`w-4 h-4 text-[#D71920]`} />
                  <span>{`CÓMO LLEGAR`}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
  Footer = () => (
    <footer className={`bg-[#070708] border-t border-neutral-900 text-neutral-400 text-sm`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-900`}
        >
          <div className={`lg:col-span-5 flex flex-col items-start`}>
            <div className={`flex items-center gap-3 mb-4`}>
              <div className={`w-12 h-12 rounded-lg bg-neutral-900 p-1 border border-neutral-800`}>
                <img
                  src={siteConfig.logoPath}
                  alt={`Logo oficial 7 Strength Center`}
                  className={`w-full h-full object-contain`}
                />
              </div>
              <div>
                <span
                  className={`font-display text-2xl text-white tracking-wider block font-bold leading-none`}
                >
                  {siteConfig.name}
                </span>
                <span
                  className={`text-xs text-[#D71920] font-semibold tracking-widest uppercase mt-0.5 block`}
                >{`Cajamarca · Perú`}</span>
              </div>
            </div>
            <p
              className={`text-neutral-400 text-base font-medium italic mt-2`}
            >{`"Fuerza, disciplina y superación."`}</p>
            <p
              className={`text-xs text-neutral-300 mt-3 max-w-sm leading-relaxed`}
            >{`Espacio de entrenamiento dedicado a quienes buscan mejorar su condición física, romper sus marcas y construir una versión más fuerte de sí mismos.`}</p>
          </div>
          <div className={`lg:col-span-3`}>
            <h4
              className={`font-display text-lg text-white tracking-wider uppercase mb-4`}
            >{`Navegación`}</h4>
            <ul className={`space-y-2 text-xs uppercase tracking-wider`}>
              {[
                {
                  label: `Inicio`,
                  href: `#inicio`,
                },
                {
                  label: `Nosotros`,
                  href: `#nosotros`,
                },
                {
                  label: `Instalaciones`,
                  href: `#instalaciones`,
                },
                {
                  label: `Planes`,
                  href: `#planes`,
                },
                {
                  label: `Horarios`,
                  href: `#horarios`,
                },
                {
                  label: `Comunidad`,
                  href: `#comunidad`,
                },
                {
                  label: `Contacto`,
                  href: `#contacto`,
                },
              ].map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    className={`hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform`}
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`lg:col-span-4`}>
            <h4
              className={`font-display text-lg text-white tracking-wider uppercase mb-4`}
            >{`Información Oficial`}</h4>
            <ul className={`space-y-3 text-xs text-neutral-400`}>
              <li className={`flex items-start gap-2.5`}>
                <MapPinIcon className={`w-4 h-4 text-[#D71920] shrink-0 mt-0.5`} />
                <span>{siteConfig.address}</span>
              </li>
              <li className={`flex items-center gap-2.5`}>
                <PhoneIcon className={`w-4 h-4 text-emerald-400 shrink-0`} />
                <a
                  href={whatsappUrl()}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`hover:text-white transition-colors font-medium text-neutral-300`}
                >
                  {`WhatsApp: `}
                  {siteConfig.phone.display}
                </a>
              </li>
              <li className={`flex items-center gap-2.5`}>
                <InstagramIcon className={`w-4 h-4 text-[#D71920] shrink-0`} />
                <a
                  href={siteConfig.social.instagramUrl}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`hover:text-white transition-colors font-medium text-neutral-300`}
                >
                  {`Instagram: `}
                  {siteConfig.social.instagramHandle}
                </a>
              </li>
            </ul>
            <div className={`mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2`}>
              <span className={`w-2 h-2 rounded-full bg-[#D71920]`} />
              <span
                className={`text-[11px] text-neutral-300`}
              >{`Atención presencial en Cajamarca`}</span>
            </div>
          </div>
        </div>
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300`}
        >
          <div>{`© 2026 7 Strength Center. Todos los derechos reservados.`}</div>
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: `smooth`,
              });
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800`}
            aria-label={`Volver al inicio de la página`}
          >
            <span>{`Subir al inicio`}</span>
            <ArrowUpIcon className={`w-3.5 h-3.5 text-[#D71920]`} />
          </button>
        </div>
      </div>
    </footer>
  ),
  WhatsAppButton = () => {
    let [e, t] = (0, React.useState)(!1),
      n = `https://wa.me/${siteConfig.phone.raw}?text=${encodeURIComponent(siteConfig.phone.whatsappMessageGeneral)}`;
    return (
      <div
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3`}
        onMouseEnter={() => t(!0)}
        onMouseLeave={() => t(!1)}
      >
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141416] border border-neutral-700 text-xs font-semibold text-white shadow-xl transition-all duration-200 ${e ? `opacity-100 translate-x-0` : `opacity-90 translate-x-1 pointer-events-none`}`}
        >
          <span className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`} />
          <span>{`¿Tienes alguna consulta?`}</span>
        </div>
        <a
          href={n}
          target={`_blank`}
          rel={`noopener noreferrer`}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-transform duration-200 transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50`}
          aria-label={`Contactar a 7 Strength Center por WhatsApp`}
        >
          <span
            className={`absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none`}
          />
          <MessageCircleIcon
            className={`w-7 h-7 sm:w-8 sm:h-8 fill-current text-white relative z-10`}
          />
        </a>
      </div>
    );
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
      resetAll: y,
    } = useAccessibility();
    return e ? (
      <AnimatePresence>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md`}
          role={`dialog`}
          aria-modal={`true`}
          aria-labelledby={`a11y-modal-title`}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass p-6 sm:p-8 text-neutral-200 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)]`}
          >
            <div className={`flex items-start justify-between pb-5 border-b border-white/10 mb-6`}>
              <div className={`flex items-center gap-3`}>
                <div
                  className={`w-11 h-11 rounded-2xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]`}
                >
                  <SparklesIcon className={`w-5 h-5 text-[#D71920]`} />
                </div>
                <div>
                  <h2
                    id={`a11y-modal-title`}
                    className={`font-display text-2xl sm:text-3xl text-white tracking-wide`}
                  >{`CENTRO DE ACCESIBILIDAD`}</h2>
                  <div className={`flex items-center gap-2 text-xs text-neutral-400 mt-0.5`}>
                    <span className={`text-emerald-400 font-semibold`}>{`WCAG 2.1 AA`}</span>
                    <span>{`·`}</span>
                    <span>{`Inclusión y confort visual universal`}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => t(!1)}
                className={`p-2.5 rounded-full bg-white/5 hover:bg-[#D71920] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                aria-label={`Cerrar panel de accesibilidad`}
              >
                <XIcon className={`w-5 h-5`} />
              </button>
            </div>
            <div
              className={`p-4 rounded-2xl liquid-glass-subtle border border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4`}
            >
              <div className={`flex items-center gap-3`}>
                <div
                  className={`w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#D71920]`}
                >
                  {g ? (
                    <Volume2Icon className={`w-5 h-5 animate-pulse text-[#D71920]`} />
                  ) : (
                    <Volume2Icon className={`w-5 h-5`} />
                  )}
                </div>
                <div>
                  <h3
                    className={`text-sm font-bold text-white leading-none`}
                  >{`Lector de Voz del Gimnasio`}</h3>
                  <p
                    className={`text-xs text-neutral-400 mt-1`}
                  >{`Escucha la narración hablada de planes, horarios y ubicación en español.`}</p>
                </div>
              </div>
              <button
                onClick={g ? v : _}
                className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-md ${g ? `bg-amber-500 hover:bg-amber-600 text-black` : `bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-950/50`}`}
              >
                {g ? (
                  <jsxRuntime.Fragment>
                    <VolumeXIcon className={`w-4 h-4`} />
                    <span>{`Pausar Lectura`}</span>
                  </jsxRuntime.Fragment>
                ) : (
                  <jsxRuntime.Fragment>
                    <Volume2Icon className={`w-4 h-4`} />
                    <span>{`Escuchar Resumen`}</span>
                  </jsxRuntime.Fragment>
                )}
              </button>
            </div>
            <div className={`space-y-6`}>
              <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10`}>
                <div className={`flex items-center justify-between mb-3`}>
                  <div className={`flex items-center gap-2`}>
                    <TypeIcon className={`w-4 h-4 text-[#D71920]`} />
                    <span className={`text-sm font-bold text-white`}>{`Tamaño de Texto`}</span>
                  </div>
                  <span className={`text-xs text-neutral-400`}>
                    {n === `normal`
                      ? `Normal (100%)`
                      : n === `large`
                        ? `Grande (115%)`
                        : `Extra Grande (130%)`}
                  </span>
                </div>
                <div className={`grid grid-cols-3 gap-2`}>
                  {[`normal`, `large`, `xlarge`].map((e) => (
                    <button
                      onClick={() => r(e)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${n === e ? `bg-[#D71920] text-white border-[#D71920] shadow-lg shadow-red-950/40` : `bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10`}`}
                      key={e}
                    >
                      {e === `normal` && `Normal A`}
                      {e === `large` && `Grande A+`}
                      {e === `xlarge` && `Muy Grande A++`}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                <button
                  onClick={a}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${i ? `bg-neutral-900 border-amber-400 text-amber-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <SunIcon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Alto Contraste`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Bordes nítidos y contraste reforzado WCAG AAA.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${i ? `bg-amber-400 border-amber-400 text-black` : `border-neutral-600`}`}
                  >
                    {i && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
                <button
                  onClick={l}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${c ? `bg-neutral-900 border-emerald-400 text-emerald-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <BookOpenIcon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Fuente para Dislexia`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Espaciado optimizado para facilitar la lectura fluida.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${c ? `bg-emerald-400 border-emerald-400 text-black` : `border-neutral-600`}`}
                  >
                    {c && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
                <button
                  onClick={s}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${o ? `bg-neutral-900 border-blue-400 text-blue-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <EyeIcon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Modo Monocromático`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Escala de grises para personas con sensibilidad al color.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${o ? `bg-blue-400 border-blue-400 text-black` : `border-neutral-600`}`}
                  >
                    {o && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
                <button
                  onClick={d}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${u ? `bg-neutral-900 border-purple-400 text-purple-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <ActivityIcon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Reducir Movimiento`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Pausa animaciones para evitar fatiga vestibular.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${u ? `bg-purple-400 border-purple-400 text-black` : `border-neutral-600`}`}
                  >
                    {u && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
                <button
                  onClick={p}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${f ? `bg-neutral-900 border-yellow-400 text-yellow-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <Link2Icon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Resaltar Enlaces`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Subraya todos los botones y enlaces interactivos.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${f ? `bg-yellow-400 border-yellow-400 text-black` : `border-neutral-600`}`}
                  >
                    {f && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
                <button
                  onClick={h}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${m ? `bg-neutral-900 border-pink-400 text-pink-300` : `bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300`}`}
                >
                  <div className={`flex items-start gap-3`}>
                    <MousePointerIcon className={`w-5 h-5 text-[#D71920] shrink-0 mt-0.5`} />
                    <div>
                      <span
                        className={`text-xs font-bold block text-white`}
                      >{`Cursor Agrandado`}</span>
                      <span
                        className={`text-[11px] text-neutral-400 mt-0.5 block`}
                      >{`Puntero ampliado de alto contraste visual.`}</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${m ? `bg-pink-400 border-pink-400 text-black` : `border-neutral-600`}`}
                  >
                    {m && <CheckIcon className={`w-3.5 h-3.5 stroke-[3]`} />}
                  </div>
                </button>
              </div>
            </div>
            <div
              className={`mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4`}
            >
              <button
                onClick={y}
                className={`inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer`}
              >
                <RotateCcwIcon className={`w-3.5 h-3.5`} />
                <span>{`Restablecer Todo`}</span>
              </button>
              <button
                onClick={() => t(!1)}
                className={`px-6 py-2.5 rounded-xl bg-white text-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg`}
              >{`Guardar y Cerrar`}</button>
            </div>
            <div className={`mt-4 text-center text-[11px] text-neutral-500`}>
              {`Atajo rápido de teclado: Pulsa `}
              <kbd
                className={`px-1.5 py-0.5 rounded bg-white/10 text-white font-mono`}
              >{`Alt + A`}</kbd>
              {` para abrir o cerrar este panel.`}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    ) : null;
  },
  AccessibilityWidget = () => {
    let { isOpen: e, setIsOpen: t, highContrast: n } = useAccessibility();
    return (
      <jsxRuntime.Fragment>
        <a
          href={`#main-content`}
          className={`sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#D71920] text-white font-bold rounded-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white`}
        >{`Saltar al contenido principal`}</a>
        <div className={`fixed bottom-6 left-6 z-40 flex items-center gap-2`}>
          <button
            onClick={() => t(!0)}
            className={`group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D71920]/60 ${n ? `bg-amber-400 text-black border-2 border-white` : `liquid-glass text-white border border-white/20 hover:border-[#D71920]`}`}
            aria-label={`Abrir opciones de accesibilidad universal (Alt + A)`}
            aria-haspopup={`dialog`}
            aria-expanded={e}
          >
            <span
              className={`absolute inset-0 rounded-full bg-[#D71920]/20 animate-pulse pointer-events-none`}
            />
            <AccessibilityIcon
              className={`w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-[#D71920] transition-colors relative z-10`}
            />
            <span
              className={`hidden sm:block absolute left-full ml-3 px-3 py-1.5 rounded-xl liquid-glass text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10`}
            >{`Accesibilidad (Alt + A)`}</span>
          </button>
        </div>
        <AccessibilityPanel />
      </jsxRuntime.Fragment>
    );
  };
function App() {
  let [e, t] = (0, React.useState)(`inicio`);
  return (
    (0, React.useEffect)(() => {
      let e = [
          `inicio`,
          `nosotros`,
          `instalaciones`,
          `planes`,
          `horarios`,
          `comunidad`,
          `contacto`,
        ],
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
      return (
        window.addEventListener(`scroll`, n, {
          passive: !0,
        }),
        n(),
        () => window.removeEventListener(`scroll`, n)
      );
    }, []),
    (
      <AccessibilityProvider>
        <div
          className={`min-h-screen bg-[#0B0B0C] text-[#F2F2F2] flex flex-col font-sans selection:bg-[#D71920] selection:text-white relative`}
        >
          <ScrollProgress />
          <Header activeSection={e} />
          <main id={`main-content`} className={`flex-1`} tabIndex={-1}>
            <Hero />
            <About />
            <Gallery />
            <Plans />
            <Schedule />
            <Community />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
          <AccessibilityWidget />
        </div>
      </AccessibilityProvider>
    )
  );
}
(0, ReactDOM.createRoot)(document.getElementById(`root`)).render(<App />);
