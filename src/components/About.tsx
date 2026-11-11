import React, { useMemo } from 'react';
import { Dumbbell, Target, Users, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONFIG } from '../config/gymInfo.ts';
import { calculateGymStatus, buildWhatsAppLink } from '../utils/gymLogic.ts';

export const About: React.FC = () => {
  const currentStatus = useMemo(() => calculateGymStatus(), []);

  const corePillars = [
    {
      icon: Dumbbell,
      title: 'FUERZA',
      text: 'Cada entrenamiento es una oportunidad para avanzar.',
      number: '01',
    },
    {
      icon: Target,
      title: 'DISCIPLINA',
      text: 'La constancia transforma tus objetivos en resultados.',
      number: '02',
    },
    {
      icon: Users,
      title: 'COMUNIDAD',
      text: 'Comparte tu pasión por el entrenamiento.',
      number: '03',
    },
  ];

  return (
    <section id="nosotros" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      {/* Subtle background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Staggered Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3">
            <span className="w-6 h-[2px] bg-[#D71920]" />
            <span>FILOSOFÍA 7 STRENGTH</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">CAJAMARCA</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95] max-w-4xl">
            MÁS QUE UN GIMNASIO. <span className="text-[#D71920]">UNA COMUNIDAD.</span>
          </h2>
        </motion.div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Visual Identity & Official Logo Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="group relative rounded-3xl overflow-hidden liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/30 transition-all duration-500">
              
              {/* Subtle liquid athletic glow */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#D71920]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D71920]/40 transition-all duration-700" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                
                {/* Real Gym Photo Showcase with Logo Badge Overlay */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-6 group/img">
                  <img
                    src="/assets/aistudio/image_993ddb80.png"
                    alt="Interior real de 7 Strength Center en Cajamarca"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Floating Official Emblem Shield */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl liquid-glass p-1 shadow-2xl shrink-0 flex items-center justify-center border border-white/20">
                      <img
                        src={GYM_CONFIG.logoPath}
                        alt="Emblema oficial 7 Strength Center"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D71920] font-bold tracking-[0.2em] uppercase block">
                        SEDE OFICIAL
                      </span>
                      <h4 className="font-display text-lg text-white leading-none">
                        7 STRENGTH CENTER
                      </h4>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full liquid-glass text-[10px] font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1 border border-white/20">
                    <ShieldCheck className="w-3 h-3 text-[#D71920]" />
                    <span>Instalación Real</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="font-display text-2xl text-white tracking-wide">
                      LOS LEONES 164
                    </h3>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest">
                      Cajamarca · Perú
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#D71920] px-3 py-1 rounded-full liquid-glass-subtle border border-[#D71920]/40">
                    2 NIVELES
                  </span>
                </div>

                {/* Live Shift Indicator */}
                <div className={`mt-5 w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-between shadow-inner ${currentStatus.badgeColorClass}`}>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentStatus.statusLabel}</span>
                  </span>
                  <span className="text-[11px] opacity-90">{currentStatus.nextEventDescription}</span>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Column 2: Narrative & The 3 Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed mb-10 border-l-2 border-[#D71920] pl-6 py-1">
              En 7 Strength Center creemos que la fuerza se construye con esfuerzo, disciplina y constancia. Somos un espacio dedicado a quienes buscan mejorar su condición física, superar sus propios límites y disfrutar del entrenamiento como parte de su estilo de vida.
            </p>

            {/* The 3 Core Pillars with Liquid Glass & Spring Physics */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {corePillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="group flex items-start gap-5 p-6 rounded-2xl liquid-glass liquid-glass-interactive shadow-lg hover:shadow-2xl hover:shadow-red-950/30"
                  >
                    <div className="w-14 h-14 rounded-xl liquid-glass border border-white/15 group-hover:border-[#D71920] group-hover:bg-[#D71920]/20 flex items-center justify-center shrink-0 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-[#D71920] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-2xl sm:text-3xl text-white tracking-wide group-hover:text-[#D71920] transition-colors">
                          {pillar.title}
                        </h4>
                        <span className="font-display text-sm text-neutral-500 tracking-wider">
                          {pillar.number}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-300 mt-1 leading-normal">
                        {pillar.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Contact Link below narrative */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">
                Instalaciones profesionales en Los Leones 164, Cajamarca
              </span>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-white uppercase tracking-wider transition-colors group"
              >
                <span>CONSULTAR POR WHATSAPP</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
