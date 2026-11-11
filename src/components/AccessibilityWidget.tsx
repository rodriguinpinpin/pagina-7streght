import React from 'react';
import { Accessibility } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext.tsx';
import { AccessibilityModal } from './AccessibilityModal.tsx';

export const AccessibilityWidget: React.FC = () => {
  const { isOpen, setIsOpen, highContrast } = useAccessibility();

  return (
    <>
      {/* Skip to Main Content Link for screen readers and keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#D71920] text-white font-bold rounded-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white"
      >
        Saltar al contenido principal
      </a>

      {/* Floating Accessibility Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D71920]/60 ${
            highContrast
              ? 'bg-amber-400 text-black border-2 border-white'
              : 'liquid-glass text-white border border-white/20 hover:border-[#D71920]'
          }`}
          aria-label="Abrir opciones de accesibilidad universal (Alt + A)"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          {/* Subtle liquid glow */}
          <span className="absolute inset-0 rounded-full bg-[#D71920]/20 animate-pulse pointer-events-none" />
          
          <Accessibility className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-[#D71920] transition-colors relative z-10" />

          {/* Tooltip for desktop */}
          <span className="hidden sm:block absolute left-full ml-3 px-3 py-1.5 rounded-xl liquid-glass text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
            Accesibilidad (Alt + A)
          </span>
        </button>
      </div>

      {/* Accessible Control Center Modal */}
      <AccessibilityModal />
    </>
  );
};
