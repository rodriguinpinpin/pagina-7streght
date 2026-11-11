import React from 'react';
import {
  X,
  Type,
  Sun,
  Eye,
  BookOpen,
  Volume2,
  VolumeX,
  MousePointer,
  RotateCcw,
  Sparkles,
  Link2,
  Activity,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAccessibility, TextSize } from '../context/AccessibilityContext.tsx';

export const AccessibilityModal: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    textSize,
    setTextSize,
    highContrast,
    toggleHighContrast,
    grayscale,
    toggleGrayscale,
    dyslexiaFont,
    toggleDyslexiaFont,
    reducedMotion,
    toggleReducedMotion,
    highlightLinks,
    toggleHighlightLinks,
    bigCursor,
    toggleBigCursor,
    isSpeaking,
    speakOverview,
    stopSpeaking,
    resetAll,
  } = useAccessibility();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass p-6 sm:p-8 text-neutral-200 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shadow-[0_0_20px_rgba(215,25,32,0.3)]">
                <Sparkles className="w-5 h-5 text-[#D71920]" />
              </div>
              <div>
                <h2 id="a11y-modal-title" className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                  CENTRO DE ACCESIBILIDAD
                </h2>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                  <span className="text-emerald-400 font-semibold">WCAG 2.1 AA</span>
                  <span>·</span>
                  <span>Inclusión y confort visual universal</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#D71920] text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Cerrar panel de accesibilidad"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Audio Narration (Text to Speech) */}
          <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#D71920]">
                {isSpeaking ? <Volume2 className="w-5 h-5 animate-pulse text-[#D71920]" /> : <Volume2 className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">
                  Lector de Voz del Gimnasio
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Escucha la narración hablada de planes, horarios y ubicación en español.
                </p>
              </div>
            </div>

            <button
              onClick={isSpeaking ? stopSpeaking : speakOverview}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-md ${
                isSpeaking
                  ? 'bg-amber-500 hover:bg-amber-600 text-black'
                  : 'bg-[#D71920] hover:bg-[#A80F15] text-white shadow-red-950/50'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pausar Lectura</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Escuchar Resumen</span>
                </>
              )}
            </button>
          </div>

          {/* Accessibility Settings Grid */}
          <div className="space-y-6">
            
            {/* 1. Text Size Selector */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#D71920]" />
                  <span className="text-sm font-bold text-white">Tamaño de Texto</span>
                </div>
                <span className="text-xs text-neutral-400">
                  {textSize === 'normal' ? 'Normal (100%)' : textSize === 'large' ? 'Grande (115%)' : 'Extra Grande (130%)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['normal', 'large', 'xlarge'] as TextSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      textSize === size
                        ? 'bg-[#D71920] text-white border-[#D71920] shadow-lg shadow-red-950/40'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    }`}
                  >
                    {size === 'normal' && 'Normal A'}
                    {size === 'large' && 'Grande A+'}
                    {size === 'xlarge' && 'Muy Grande A++'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Visual Modifiers (Toggles) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* High Contrast */}
              <button
                onClick={toggleHighContrast}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  highContrast
                    ? 'bg-neutral-900 border-amber-400 text-amber-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Alto Contraste</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Bordes nítidos y contraste reforzado WCAG AAA.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${highContrast ? 'bg-amber-400 border-amber-400 text-black' : 'border-neutral-600'}`}>
                  {highContrast && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Dyslexia Friendly */}
              <button
                onClick={toggleDyslexiaFont}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  dyslexiaFont
                    ? 'bg-neutral-900 border-emerald-400 text-emerald-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Fuente para Dislexia</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Espaciado optimizado para facilitar la lectura fluida.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${dyslexiaFont ? 'bg-emerald-400 border-emerald-400 text-black' : 'border-neutral-600'}`}>
                  {dyslexiaFont && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Grayscale Mode */}
              <button
                onClick={toggleGrayscale}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  grayscale
                    ? 'bg-neutral-900 border-blue-400 text-blue-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Modo Monocromático</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Escala de grises para personas con sensibilidad al color.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${grayscale ? 'bg-blue-400 border-blue-400 text-black' : 'border-neutral-600'}`}>
                  {grayscale && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Reduced Motion */}
              <button
                onClick={toggleReducedMotion}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  reducedMotion
                    ? 'bg-neutral-900 border-purple-400 text-purple-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Reducir Movimiento</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Pausa animaciones para evitar fatiga vestibular.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${reducedMotion ? 'bg-purple-400 border-purple-400 text-black' : 'border-neutral-600'}`}>
                  {reducedMotion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Highlight Links */}
              <button
                onClick={toggleHighlightLinks}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  highlightLinks
                    ? 'bg-neutral-900 border-yellow-400 text-yellow-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Link2 className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Resaltar Enlaces</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Subraya todos los botones y enlaces interactivos.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${highlightLinks ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-neutral-600'}`}>
                  {highlightLinks && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Big Cursor */}
              <button
                onClick={toggleBigCursor}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  bigCursor
                    ? 'bg-neutral-900 border-pink-400 text-pink-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MousePointer className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block text-white">Cursor Agrandado</span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Puntero ampliado de alto contraste visual.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${bigCursor ? 'bg-pink-400 border-pink-400 text-black' : 'border-neutral-600'}`}>
                  {bigCursor && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Todo</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg"
            >
              Guardar y Cerrar
            </button>
          </div>

          <div className="mt-4 text-center text-[11px] text-neutral-500">
            Atajo rápido de teclado: Pulsa <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Alt + A</kbd> para abrir o cerrar este panel.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
