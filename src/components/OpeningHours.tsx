import React from 'react';
import { Clock, Sun, Moon, Calendar, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { buildWhatsAppLink } from '../utils/gymLogic.ts';

export const OpeningHours: React.FC = () => {
  return (
    <section id="horarios" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3">
            <span className="w-5 h-[2px] bg-[#D71920]" />
            <span>DISPONIBILIDAD Y TURNOS</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">HORARIOS OFICIALES</span>
            <span className="w-5 h-[2px] bg-[#D71920]" />
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
            ENTRENA A <span className="text-[#D71920]">TU RITMO.</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Organiza tus entrenamientos y encuentra el mejor momento para dar lo máximo.
          </p>
        </motion.div>

        {/* 2 Large Athletic Blocks Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Bloque 1: LUNES A VIERNES (Shifts & Pause) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
            className="group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.2)]"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide leading-none">
                      LUNES A VIERNES
                    </h3>
                    <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block">
                      Entrenamiento entre semana
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40 uppercase tracking-wider">
                  2 Turnos
                </span>
              </div>

              {/* Turno Mañana */}
              <div className="py-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2">
                  <Sun className="w-4 h-4" />
                  <span>TURNO MAÑANA</span>
                </div>
                <div className="font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none">
                  7:00 a. m. – 1:00 p. m.
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  Ideal para empezar el día con máxima energía antes de tus labores.
                </p>
              </div>

              {/* Differentiated Pause Notice */}
              <div className="my-5 py-3 px-4 rounded-xl liquid-glass-subtle border border-white/10 flex items-center gap-3 text-xs text-neutral-300">
                <Clock className="w-4 h-4 text-[#D71920] shrink-0" />
                <span className="leading-snug">
                  Pausa intermedia de mantenimiento y descanso: <strong className="text-white">1:00 p. m. a 3:00 p. m.</strong>
                </span>
              </div>

              {/* Turno Tarde */}
              <div className="py-4">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-400 mb-2">
                  <Moon className="w-4 h-4" />
                  <span>TURNO TARDE</span>
                </div>
                <div className="font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none">
                  3:00 p. m. – 9:00 p. m.
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  Horario de máxima intensidad para completar tu jornada de pesas.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between">
              <span>Acceso permitido en ambos turnos con tu membresía.</span>
              <span className="w-2 h-2 rounded-full bg-[#D71920]" />
            </div>
          </motion.div>

          {/* Bloque 2: SÁBADOS Y DOMINGOS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
            className="group rounded-3xl liquid-glass liquid-glass-interactive p-8 sm:p-10 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <div>
              {/* Sábados Header & Shift */}
              <div className="pb-8 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide leading-none">
                        SÁBADOS
                      </h3>
                      <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-1 block">
                        Fin de semana activo
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-full liquid-glass-subtle border border-amber-400/40 uppercase tracking-wider">
                    Matutino
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-400 mb-2">
                    <Sun className="w-4 h-4" />
                    <span>TURNO CONTINUO</span>
                  </div>
                  <div className="font-display text-4xl sm:text-5xl text-white tracking-wide tabular-nums leading-none">
                    8:00 a. m. – 1:00 p. m.
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Entrena temprano en sábado y mantén tu constancia sin interrupciones.
                  </p>
                </div>
              </div>

              {/* Domingos (Unconfirmed Schedule as strictly requested) */}
              <div className="pt-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg liquid-glass border border-white/15 flex items-center justify-center text-amber-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-white tracking-wide">
                      DOMINGOS
                    </h4>
                    <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      Horario no confirmado
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  Para garantizar la exactitud de tu visita y evitar traslados innecesarios, consúltanos directamente por WhatsApp antes de acudir en domingo.
                </p>

                <a
                  href={buildWhatsAppLink('Hola, quisiera consultar si 7 Strength Center abre este domingo.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/20 hover:border-[#D71920] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md group/btn"
                >
                  <MessageCircle className="w-4 h-4 text-[#D71920] group-hover/btn:text-white transition-colors" />
                  <span>CONSULTAR DISPONIBILIDAD DOMINICAL</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-between">
              <span>Respuestas directas por WhatsApp oficial.</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
