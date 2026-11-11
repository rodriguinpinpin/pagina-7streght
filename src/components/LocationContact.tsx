import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Clock, Navigation, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONFIG } from '../config/gymInfo.ts';
import { buildWhatsAppLink } from '../utils/gymLogic.ts';

export const LocationContact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contacto" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3">
            <span className="w-5 h-[2px] bg-[#D71920]" />
            <span>ENCUÉNTRANOS EN CAJAMARCA</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">UBICACIÓN Y CONTACTO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
            ESTAMOS LISTOS <span className="text-[#D71920]">PARA RECIBIRTE.</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
            Visítanos en nuestras instalaciones o escríbenos directamente por WhatsApp para coordinar tu primer día de entrenamiento.
          </p>
        </motion.div>

        {/* 2-Column Split with Staggered Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Gym Info & Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl liquid-glass p-8 sm:p-10 shadow-2xl hover:border-white/25 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <img
                  src={GYM_CONFIG.logoPath}
                  alt="Logo 7 Strength Center"
                  className="w-14 h-14 object-contain rounded-xl liquid-glass p-1.5 border border-white/20 shadow"
                />
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-none">
                    {GYM_CONFIG.name}
                  </h3>
                  <span className="text-xs text-[#D71920] font-bold tracking-[0.2em] uppercase mt-1 block">
                    Cajamarca · Perú
                  </span>
                </div>
              </div>

              {/* Information Rows */}
              <div className="space-y-6 my-8">
                
                {/* Address Item */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Dirección Oficial
                    </span>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {GYM_CONFIG.address}
                    </p>
                    <button
                      onClick={() => handleCopy(GYM_CONFIG.address, 'address')}
                      className="mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedField === 'address' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copiado al portapapeles</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar dirección</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      WhatsApp Oficial
                    </span>
                    <a
                      href={buildWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-emerald-400 transition-colors inline-block mt-0.5"
                    >
                      {GYM_CONFIG.phone.display}
                    </a>
                    <button
                      onClick={() => handleCopy(GYM_CONFIG.phone.display, 'phone')}
                      className="mt-1.5 text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer ml-3"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Opening Hours Summary */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Horarios Resumidos
                    </span>
                    <p className="text-xs text-neutral-300 mt-1">
                      <strong>L-V:</strong> 7:00 am – 1:00 pm / 3:00 pm – 9:00 pm
                    </p>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      <strong>Sábados:</strong> 8:00 am – 1:00 pm
                    </p>
                  </div>
                </div>

                {/* Instagram Handle */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl liquid-glass border border-white/15 flex items-center justify-center text-[#D71920] shrink-0 mt-0.5">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Instagram
                    </span>
                    <a
                      href={GYM_CONFIG.social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-[#D71920] transition-colors mt-0.5 inline-block"
                    >
                      {GYM_CONFIG.social.instagramHandle}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-6 border-t border-white/10">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden w-full py-4 px-6 rounded-2xl bg-[#D71920] hover:bg-[#A80F15] text-white font-heading font-bold text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 text-center border border-white/20"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                <span className="relative z-10">CONTACTAR POR WHATSAPP</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Interactive Map & Directions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden liquid-glass border border-white/15 shadow-2xl"
          >
            {/* Map Header Bar */}
            <div className="p-4 sm:p-5 liquid-glass-subtle border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D71920]" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  Ubicación en Google Maps
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">
                Los Leones 164, Cajamarca
              </span>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="relative w-full flex-1 min-h-[350px] sm:min-h-[420px] bg-neutral-950">
              <iframe
                title="Mapa oficial de ubicación 7 Strength Center en Cajamarca"
                width="100%"
                height="100%"
                className="w-full h-full border-0 filter contrast-125 brightness-90 grayscale-[0.2]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Los+Leones+164,+Cajamarca+06002,+Peru&t=&z=16&ie=UTF8&iwloc=&output=embed"
              />
            </div>

            {/* Bottom Map Action: "CÓMO LLEGAR" */}
            <div className="p-6 sm:p-8 liquid-glass-subtle border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-2xl text-white tracking-wide">
                  ¿PLANEAS VISITARNOS?
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Abre la ruta directa en tu aplicación de Google Maps y llega sin complicaciones.
                </p>
              </div>

              <a
                href={GYM_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-heading font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shrink-0 shadow-lg transform hover:-translate-y-0.5 active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#D71920]" />
                <span>CÓMO LLEGAR</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
