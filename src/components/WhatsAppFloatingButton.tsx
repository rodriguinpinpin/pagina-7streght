import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymInfo.ts';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappHref = `https://wa.me/${GYM_CONFIG.phone.raw}?text=${encodeURIComponent(
    GYM_CONFIG.phone.whatsappMessageGeneral
  )}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip with "¿Tienes alguna consulta?" */}
      <div
        className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141416] border border-neutral-700 text-xs font-semibold text-white shadow-xl transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-1 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>¿Tienes alguna consulta?</span>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-transform duration-200 transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
        aria-label="Contactar a 7 Strength Center por WhatsApp"
      >
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white relative z-10" />
      </a>
    </div>
  );
};
