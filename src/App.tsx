import React, { useState, useEffect } from 'react';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Gallery } from './components/Gallery.tsx';
import { MembershipPlans } from './components/MembershipPlans.tsx';
import { OpeningHours } from './components/OpeningHours.tsx';
import { InstagramReels } from './components/InstagramReels.tsx';
import { LocationContact } from './components/LocationContact.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';
import { AccessibilityProvider } from './context/AccessibilityContext.tsx';
import { AccessibilityWidget } from './components/AccessibilityWidget.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sectionIds = [
      'inicio',
      'nosotros',
      'instalaciones',
      'planes',
      'horarios',
      'comunidad',
      'contacto',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-[#0B0B0C] text-[#F2F2F2] flex flex-col font-sans selection:bg-[#D71920] selection:text-white relative">
        {/* 0. Top Scroll Progress Line */}
        <ScrollProgress />

        {/* 1. Fixed Header Navigation with Blur & Layout Animation */}
        <Header activeSection={activeSection} />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {/* 2. Cinematic Hero Section (cards removed, new headline, discrete scroll indicator) */}
          <Hero />

          {/* 3. About Section with 3 Pillars & Motion */}
          <About />

          {/* 4. Installations & Bento Grid with Lightbox */}
          <Gallery />

          {/* 5. Membership Plans with Staggered Entrance & Interactive Hover */}
          <MembershipPlans />

          {/* 6. Opening Hours (2 Large Athletic Blocks Composition) */}
          <OpeningHours />

          {/* 7. Instagram Reels & Community Showcase */}
          <InstagramReels />

          {/* 8. Location & Contact with Interactive Map */}
          <LocationContact />
        </main>

        {/* 9. Official Footer */}
        <Footer />

        {/* 10. Floating Interactive Tools */}
        <WhatsAppFloatingButton />
        <AccessibilityWidget />
      </div>
    </AccessibilityProvider>
  );
}

