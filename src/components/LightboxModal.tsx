import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GallerySlot } from '../config/gymInfo.ts';

interface LightboxModalProps {
  slot: GallerySlot | null;
  slots: GallerySlot[];
  onClose: () => void;
  onNavigate: (slot: GallerySlot) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  slot,
  slots,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!slot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slot]);

  if (!slot) return null;

  const currentIndex = slots.findIndex((s) => s.id === slot.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + slots.length) % slots.length;
    onNavigate(slots[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % slots.length;
    onNavigate(slots[nextIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`Visualizador: ${slot.title}`}
      >
        {/* Top Bar with counter & close button */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
            <span className="text-white font-bold">{currentIndex + 1}</span>
            <span>/</span>
            <span>{slots.length}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-neutral-300">{slot.category}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl"
            aria-label="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Prev Navigation Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Next Navigation Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-neutral-900/90 hover:bg-[#D71920] text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl"
          aria-label="Fotografía siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Main Image Container with Motion scale */}
        <motion.div
          key={slot.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex items-center justify-center">
            {slot.sampleImage ? (
              <img
                src={slot.sampleImage}
                alt={slot.title}
                className="w-full max-h-[70vh] object-contain"
              />
            ) : (
              <div className="w-full h-80 flex flex-col items-center justify-center p-8 text-center bg-neutral-900">
                <ZoomIn className="w-12 h-12 text-neutral-600 mb-3" />
                <p className="text-white font-display text-2xl">{slot.title}</p>
                <p className="text-sm text-neutral-400 max-w-md mt-2">{slot.placeholderText}</p>
              </div>
            )}

            {/* Official Photo Verification Tag */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2 text-xs text-neutral-200 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Fotografía Oficial · Instalaciones reales de 7 Strength Center en Cajamarca</span>
            </div>
          </div>

          {/* Caption below */}
          <div className="mt-5 text-center max-w-2xl px-4">
            <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
              {slot.title}
            </h3>
            <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed">
              {slot.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
