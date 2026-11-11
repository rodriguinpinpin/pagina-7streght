import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GYM_CONFIG } from '../config/gymInfo.ts';
import { buildWhatsAppLink } from '../utils/gymLogic.ts';
import { useAccessibility } from '../context/AccessibilityContext.tsx';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Instalaciones', href: '#instalaciones' },
    { label: 'Planes', href: '#planes' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'Comunidad', href: '#comunidad' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const { setIsOpen: openA11yModal } = useAccessibility();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 76;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        isScrolled
          ? 'liquid-glass border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Brand Zone: Official Logo + Wordmark */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] rounded-lg p-1"
            aria-label="7 Strength Center - Volver al inicio"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-[#D71920] transition-colors shrink-0 shadow-lg">
              <img
                src={GYM_CONFIG.logoPath}
                alt="Logo oficial 7 Strength Center"
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl text-white tracking-wider leading-none font-bold">
                7 STRENGTH
              </span>
              <span className="text-[10px] sm:text-xs text-[#D71920] tracking-widest uppercase font-semibold leading-none mt-0.5 group-hover:tracking-[0.2em] transition-all duration-300">
                CENTER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Animated Layout Active Line */}
          <nav
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D71920] rounded ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D71920] rounded-full shadow-[0_0_8px_rgba(215,25,32,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: WhatsApp CTA with interactive hover and glow */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Accessibility Button */}
            <button
              onClick={() => openA11yModal(true)}
              className="p-2 sm:p-2.5 rounded-xl liquid-glass text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"
              aria-label="Abrir panel de accesibilidad (Alt + A)"
              title="Accesibilidad universal"
            >
              <Accessibility className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-200 hover:text-[#D71920] transition-colors" />
            </button>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 bg-[#D71920] hover:bg-[#A80F15] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-900/40 hover:shadow-red-900/70 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/30"
            >
              {/* Subtle hover shine sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
              
              <span className="relative z-10">ÚNETE AHORA</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Animated Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0B0B0C]/98 backdrop-blur-xl border-b border-neutral-800 shadow-2xl overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800/80">
                <img
                  src={GYM_CONFIG.logoPath}
                  alt="Logo 7 Strength"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  Cajamarca, Perú
                </span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-base py-2 px-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-neutral-900 text-[#D71920] font-bold border-l-2 border-[#D71920]'
                        : 'text-neutral-300 hover:bg-neutral-900/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3.5 bg-[#D71920] hover:bg-[#A80F15] text-white font-bold tracking-wider uppercase text-sm rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>ÚNETE AHORA POR WHATSAPP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-neutral-400 mt-1">
                  Atención directa: +51 976 795 498
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
