import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONFIG } from '../config/gymInfo.ts';

export const MembershipPlans: React.FC = () => {
  return (
    <section id="planes" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      {/* Background radial crimson aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/12 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            <span>MEMBRESÍAS OFICIALES</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">TARIFAS CLARAS</span>
            <span className="w-5 h-[2px] bg-[#D71920]" />
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
            ELIGE TU PLAN. <span className="text-[#D71920]">EMPIEZA TU CAMBIO.</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Encuentra la opción que mejor se adapte a tu entrenamiento.
          </p>
        </motion.div>

        {/* 2 Plans Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
          
          {GYM_CONFIG.plans.map((plan, index) => {
            const isMonthly = plan.id === 'plan-mensual';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.025, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                className={`group relative rounded-3xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-400 ${
                  isMonthly
                    ? 'liquid-glass-red shadow-[0_20px_50px_rgba(215,25,32,0.35)]'
                    : 'liquid-glass liquid-glass-interactive shadow-xl'
                }`}
              >
                {/* Popular Badge for Monthly Plan */}
                {isMonthly && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#D71920] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-red-950/60 flex items-center gap-1.5 whitespace-nowrap border border-white/20">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>PLAN RECOMENDADO</span>
                  </div>
                )}

                <div>
                  {/* Plan Top Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-wider uppercase text-neutral-300 px-3 py-1 rounded-full liquid-glass-subtle border border-white/10">
                      {plan.period}
                    </span>
                    <span className="text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase">
                      7 STRENGTH
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#D71920] transition-colors duration-200">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="pt-2 pb-6 border-y border-white/10 mb-6 group-hover:border-white/20 transition-colors">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-neutral-400 uppercase font-semibold">PRECIO</span>
                      <span className="font-display text-5xl sm:text-6xl text-white tracking-tight font-bold tabular-nums">
                        {plan.formattedPrice}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      Duración oficial: <strong className="text-neutral-200">{plan.period}</strong>
                    </span>
                  </div>

                  {/* Plan Description */}
                  <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Official confirmed features with animated check icons */}
                  <div className="space-y-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <div className="w-4 h-4 rounded-full bg-[#D71920]/20 text-[#D71920] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Action Button with Hover Sweep & Tactile Press */}
                <div className="pt-5 border-t border-white/10 mt-auto">
                  <a
                    href={plan.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative overflow-hidden w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group text-center cursor-pointer shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isMonthly
                        ? 'bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-900/40 hover:shadow-red-900/70 border border-white/20'
                        : 'liquid-glass text-white hover:border-[#D71920]'
                    }`}
                  >
                    {/* Hover light sheen */}
                    <span className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                    
                    <span className="relative z-10">{plan.buttonText}</span>
                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </a>
                  <span className="text-[11px] text-neutral-400 text-center block mt-3">
                    Respuesta directa por WhatsApp sin intermediarios
                  </span>
                </div>

              </motion.div>
            );
          })}

        </div>

        {/* Security & Direct Enrollment Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs text-neutral-400"
        >
          <ShieldCheck className="w-4 h-4 text-[#D71920] shrink-0" />
          <span>Precios oficiales transparentes. Sin matrícula obligatoria ni cobros ocultos.</span>
        </motion.div>

      </div>
    </section>
  );
};
