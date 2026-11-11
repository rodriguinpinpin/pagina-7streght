import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      const navHeight = 76;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 overflow-hidden bg-[#0B0B0C]"
    >
      {/* Background Image with Cinematic Dark Gradients & Parallax Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src="/assets/aistudio/image_cab5cadb.png"
          alt="Instalaciones oficiales de 7 Strength Center en Cajamarca"
          className="w-full h-full object-cover object-center filter brightness-65 contrast-125"
          loading="eager"
        />
        {/* Layered cinematic vignettes and dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/75 to-[#0B0B0C]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
        
        {/* Subtle atmospheric crimson radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/15 blur-[160px] rounded-full pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">

          {/* Clean Athletic Kicker with Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full liquid-glass-subtle text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6 text-neutral-300 border border-white/10 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
            <span className="text-white">7 STRENGTH CENTER</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="text-[#D71920]">CAJAMARCA</span>
          </motion.div>

          {/* New Requested Display Headline: NO HAY LÍMITES. SOLO FUERZA. */}
          <div className="font-display tracking-tight leading-[0.9] mb-8 select-none">
            
            {/* Line 1: NO HAY LÍMITES. */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-8xl lg:text-9xl text-white block font-bold"
              >
                NO HAY LÍMITES.
              </motion.h1>
            </div>

            {/* Line 2: SOLO FUERZA. with special animation & red highlight */}
            <div className="overflow-hidden mt-1 sm:mt-2">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-8xl lg:text-9xl text-white font-bold flex items-baseline gap-3 sm:gap-5 flex-wrap"
              >
                <span>SOLO</span>
                <span className="relative text-[#D71920] drop-shadow-[0_0_35px_rgba(215,25,32,0.45)]">
                  FUERZA.
                  {/* Subtle underline stroke accent */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-2 bg-[#D71920] rounded-full"
                  />
                </span>
              </motion.div>
            </div>

          </div>

          {/* Secondary Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-neutral-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-10"
          >
            En 7 Strength Center, cada entrenamiento es una oportunidad para superar tus límites y convertirte en tu mejor versión.
          </motion.p>

          {/* Action CTAs with Liquid Glass & Spring Microinteractions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            {/* Primary Liquid Glass Red Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#planes')}
              className="group relative overflow-hidden px-8 py-4.5 liquid-glass-red text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl shadow-[0_15px_40px_rgba(215,25,32,0.4)] hover:shadow-[0_20px_50px_rgba(215,25,32,0.6)] text-center cursor-pointer flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-red-500/50"
            >
              {/* Refraction sheen */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-800 pointer-events-none" />
              
              <span className="relative z-10">CONOCE NUESTROS PLANES</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
            </motion.button>

            {/* Secondary Liquid Glass Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#instalaciones')}
              className="group px-8 py-4.5 liquid-glass hover:border-[#D71920]/80 text-neutral-200 hover:text-white font-heading font-bold text-base sm:text-lg tracking-wider uppercase rounded-2xl transition-all duration-300 text-center cursor-pointer shadow-xl flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] border border-white/15"
            >
              <span>EXPLORA EL GIMNASIO</span>
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Discrete Scroll Indicator: "DESLIZA PARA EXPLORAR" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pt-8"
      >
        <button
          onClick={() => scrollTo('#nosotros')}
          className="group flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none"
          aria-label="Deslizar hacia abajo para explorar el gimnasio"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em]">
            DESLIZA PARA EXPLORAR
          </span>
          <div className="w-5 h-8 rounded-full border border-neutral-700 group-hover:border-[#D71920] flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1 h-2 bg-[#D71920] rounded-full"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
