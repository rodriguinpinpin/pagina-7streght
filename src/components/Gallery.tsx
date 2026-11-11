import React, { useState } from 'react';
import { Maximize2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONFIG, GallerySlot } from '../config/gymInfo.ts';
import { LightboxModal } from './LightboxModal.tsx';

export const Gallery: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<GallerySlot | null>(null);

  // Helper for Bento grid column spans
  const getBentoClasses = (aspect: GallerySlot['aspect'], index: number) => {
    switch (index) {
      case 0:
        return 'md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[480px]';
      case 1:
        return 'md:col-span-1 md:row-span-2 min-h-[320px] md:min-h-[480px]';
      case 2:
        return 'md:col-span-1 md:row-span-1 min-h-[250px]';
      case 3:
        return 'md:col-span-1 md:row-span-1 min-h-[250px]';
      case 4:
        return 'md:col-span-2 md:row-span-1 min-h-[250px]';
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[250px]';
    }
  };

  return (
    <section id="instalaciones" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-3">
              <span className="w-6 h-[2px] bg-[#D71920]" />
              <span>ESPACIOS DE ENTRENAMIENTO</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">GALERÍA</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
              CONOCE DONDE COMIENZA <span className="text-[#D71920]">TU TRANSFORMACIÓN.</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
              Descubre los espacios de 7 Strength Center y conoce el lugar donde podrás llevar tu entrenamiento al siguiente nivel.
            </p>
          </div>

          {/* Official Verification Badge */}
          <div className="flex items-center gap-2.5 px-4 py-3 liquid-glass rounded-xl text-xs text-neutral-300 max-w-sm shrink-0 shadow-lg border border-white/15">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="leading-snug">
              <strong className="text-white">Fotografías 100% Reales:</strong> Conoce las instalaciones oficiales de nuestra sede en Los Leones 164, Cajamarca.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GYM_CONFIG.gallerySlots.map((slot, index) => {
            const bentoSpan = getBentoClasses(slot.aspect, index);
            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                onClick={() => setSelectedSlot(slot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedSlot(slot);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalle de ${slot.title}`}
                className={`group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive cursor-pointer shadow-xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col justify-end p-6 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] ${bentoSpan}`}
              >
                {/* Background Image with Slow Smooth Zoom on Hover */}
                {slot.sampleImage ? (
                  <img
                    src={slot.sampleImage}
                    alt={slot.title}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-65 group-hover:brightness-85 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
                )}

                {/* Dark Vignette Overlay with Specular sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none" />

                {/* Top Badge: Category & Expand Icon */}
                <div className="relative z-10 flex items-center justify-between mb-auto">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-200 px-3 py-1 rounded-full liquid-glass border border-white/20">
                    {slot.category}
                  </span>
                  <div className="w-9 h-9 rounded-full liquid-glass border border-white/20 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-[#D71920] group-hover:border-[#D71920] group-hover:scale-110 transition-all duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-10 mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] group-hover:animate-ping" />
                    <span className="text-[11px] text-[#D71920] font-bold tracking-[0.2em] uppercase">
                      Instalación Real
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-none group-hover:text-[#D71920] transition-colors duration-200">
                    {slot.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                    {slot.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Footer Action Note */}
        <div className="mt-10 text-center text-xs text-neutral-400">
          Haz clic en cualquier fotografía o espacio para ampliar a pantalla completa con navegación interactiva.
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        slot={selectedSlot}
        slots={GYM_CONFIG.gallerySlots}
        onClose={() => setSelectedSlot(null)}
        onNavigate={(slot) => setSelectedSlot(slot)}
      />
    </section>
  );
};
