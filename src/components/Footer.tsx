import React from 'react';
import { ArrowUp, Instagram, Phone, MapPin } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymInfo.ts';
import { buildWhatsAppLink } from '../utils/gymLogic.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Instalaciones', href: '#instalaciones' },
    { label: 'Planes', href: '#planes' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'Comunidad', href: '#comunidad' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="bg-[#070708] border-t border-neutral-900 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-900">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-900 p-1 border border-neutral-800">
                <img
                  src={GYM_CONFIG.logoPath}
                  alt="Logo oficial 7 Strength Center"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl text-white tracking-wider block font-bold leading-none">
                  {GYM_CONFIG.name}
                </span>
                <span className="text-xs text-[#D71920] font-semibold tracking-widest uppercase mt-0.5 block">
                  Cajamarca · Perú
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-base font-medium italic mt-2">
              "Fuerza, disciplina y superación."
            </p>

            <p className="text-xs text-neutral-300 mt-3 max-w-sm leading-relaxed">
              Espacio de entrenamiento dedicado a quienes buscan mejorar su condición física, romper sus marcas y construir una versión más fuerte de sí mismos.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg text-white tracking-wider uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-lg text-white tracking-wider uppercase mb-4">
              Información Oficial
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                <span>{GYM_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-neutral-300"
                >
                  WhatsApp: {GYM_CONFIG.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#D71920] shrink-0" />
                <a
                  href={GYM_CONFIG.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-neutral-300"
                >
                  Instagram: {GYM_CONFIG.social.instagramHandle}
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D71920]" />
              <span className="text-[11px] text-neutral-300">
                Atención presencial en Cajamarca
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300">
          <div>
            © 2026 7 Strength Center. Todos los derechos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
            aria-label="Volver al inicio de la página"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D71920]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
