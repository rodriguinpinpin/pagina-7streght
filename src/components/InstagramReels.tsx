import React, { useState } from 'react';
import { Instagram, Play, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { GYM_CONFIG } from '../config/gymInfo.ts';

export const InstagramReels: React.FC = () => {
  const [activeIframeId, setActiveIframeId] = useState<string | null>(null);

  const toggleIframe = (id: string) => {
    setActiveIframeId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="comunidad" className="py-28 bg-[#0B0B0C] border-b border-neutral-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-[#D71920]/8 blur-[180px] pointer-events-none rounded-full" />

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
              <span className="w-5 h-[2px] bg-[#D71920]" />
              <Instagram className="w-3.5 h-3.5" />
              <span>COMUNIDAD OFICIAL</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">@7strength</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95]">
              VIVE LA EXPERIENCIA <span className="text-[#D71920]">7 STRENGTH.</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
              Entrenamientos, energía y momentos que forman parte de nuestra comunidad.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={GYM_CONFIG.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#D71920] text-neutral-200 hover:text-white transition-all text-xs font-bold tracking-wider uppercase shrink-0 shadow-xl"
          >
            <Instagram className="w-4 h-4 text-[#D71920]" />
            <span>SÍGUENOS EN INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </motion.a>
        </motion.div>

        {/* 3 Reels Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
          {GYM_CONFIG.reels.map((reel, index) => {
            const isPlayingEmbed = activeIframeId === reel.id;

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                className="group relative rounded-3xl overflow-hidden liquid-glass liquid-glass-interactive shadow-2xl hover:shadow-[0_20px_50px_rgba(215,25,32,0.25)] flex flex-col snap-center min-w-[280px]"
              >
                {/* 9:16 Vertical Video Frame */}
                <div className="relative w-full aspect-[9/16] max-h-[560px] bg-neutral-950/80 overflow-hidden flex flex-col items-center justify-center">
                  
                  {isPlayingEmbed ? (
                    /* Official Instagram Embed Iframe */
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.reelCode}/embed/`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      title={reel.title}
                      loading="lazy"
                    />
                  ) : (
                    /* 9:16 Vertical Athletic Poster with Play Action */
                    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-neutral-900/60 via-neutral-950/80 to-black select-none">
                      
                      {/* Athletic Grid Pattern Texture */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                      {/* Header Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-white/20 text-[11px] font-bold text-neutral-200 uppercase tracking-wider">
                          <Instagram className="w-3.5 h-3.5 text-[#D71920]" />
                          <span>Reel {index + 1}</span>
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {reel.reelCode}
                        </span>
                      </div>

                      {/* Center Play Button Overlay with Pulse */}
                      <div className="relative z-10 flex flex-col items-center text-center my-auto">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleIframe(reel.id)}
                          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D71920] hover:bg-[#A80F15] text-white flex items-center justify-center shadow-[0_0_35px_rgba(215,25,32,0.6)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 mb-3 border border-white/20"
                          aria-label={`Reproducir ${reel.title}`}
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </motion.button>
                        <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mt-1">
                          Toca para reproducir
                        </p>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#D71920] font-bold uppercase tracking-wider mb-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Contenido Oficial</span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-2 group-hover:text-[#D71920] transition-colors">
                          {reel.title}
                        </h3>
                        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                          {reel.description}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* Toggle Mode button when iframe is active */}
                  {isPlayingEmbed && (
                    <button
                      onClick={() => toggleIframe(reel.id)}
                      className="absolute top-3 right-3 z-30 px-3 py-1 rounded-full liquid-glass text-[11px] text-neutral-300 border border-white/20 hover:text-white cursor-pointer shadow-lg"
                    >
                      Cerrar reproductor
                    </button>
                  )}

                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 liquid-glass-subtle border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#D71920] font-bold uppercase tracking-wider">
                      Instagram Oficial
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">
                      @7strength
                    </span>
                  </div>

                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass hover:bg-[#D71920] border border-white/15 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow"
                  >
                    <span>ABRIR EN IG</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Featured Post Highlight & Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-3xl liquid-glass p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/15"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl liquid-glass border border-[#D71920]/40 flex items-center justify-center text-[#D71920] shrink-0">
              <Instagram className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                ÚNETE A NUESTRA COMUNIDAD EN REDES
              </h4>
              <p className="text-sm text-neutral-400 mt-1">
                Publicaciones, técnicas de levantamiento y novedades exclusivas en nuestro perfil oficial.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={GYM_CONFIG.social.featuredPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-5 py-3.5 rounded-xl liquid-glass-subtle hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              VER PUBLICACIÓN DESTACADA
            </a>
            <a
              href={GYM_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-[#D71920] hover:bg-[#A80F15] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(215,25,32,0.3)] hover:shadow-[0_15px_40px_rgba(215,25,32,0.5)] transform hover:-translate-y-0.5 active:scale-95 border border-white/20"
            >
              <span>SEGUIR @7STRENGTH</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Technical Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center">
          <ShieldCheck className="w-4 h-4 text-[#D71920] shrink-0" />
          <span>Integración directa con los tres reels verificados de 7 Strength Center en Instagram</span>
        </div>

      </div>
    </section>
  );
};
