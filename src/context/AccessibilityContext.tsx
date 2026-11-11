import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityState {
  textSize: TextSize;
  highContrast: boolean;
  grayscale: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  isOpen: boolean;
  isSpeaking: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  setTextSize: (size: TextSize) => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleDyslexiaFont: () => void;
  toggleReducedMotion: () => void;
  toggleHighlightLinks: () => void;
  toggleBigCursor: () => void;
  setIsOpen: (open: boolean) => void;
  resetAll: () => void;
  speakOverview: () => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply classes to root HTML
  useEffect(() => {
    const root = document.documentElement;

    // Font scale
    const scale = textSize === 'xlarge' ? '1.3' : textSize === 'large' ? '1.15' : '1';
    root.style.setProperty('--a11y-font-scale', scale);

    // Classes
    root.classList.toggle('a11y-high-contrast', highContrast);
    root.classList.toggle('a11y-grayscale', grayscale);
    root.classList.toggle('a11y-dyslexia', dyslexiaFont);
    root.classList.toggle('a11y-reduced-motion', reducedMotion);
    root.classList.toggle('a11y-highlight-links', highlightLinks);
    root.classList.toggle('a11y-big-cursor', bigCursor);
  }, [textSize, highContrast, grayscale, dyslexiaFont, reducedMotion, highlightLinks, bigCursor]);

  // Keyboard shortcut: Alt + A opens accessibility panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setTextSize = (size: TextSize) => setTextSizeState(size);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleGrayscale = () => setGrayscale((prev) => !prev);
  const toggleDyslexiaFont = () => setDyslexiaFont((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);
  const toggleHighlightLinks = () => setHighlightLinks((prev) => !prev);
  const toggleBigCursor = () => setBigCursor((prev) => !prev);

  const resetAll = () => {
    setTextSizeState('normal');
    setHighContrast(false);
    setGrayscale(false);
    setDyslexiaFont(false);
    setReducedMotion(false);
    setHighlightLinks(false);
    setBigCursor(false);
    stopSpeaking();
  };

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakOverview = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta el sintetizador de voz nativo.');
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();

    const narration = `Bienvenido a 7 Strength Center, gimnasio de fuerza y rendimiento en Cajamarca, Perú. 
Ubicación: Los Leones 164, Cajamarca.
Planes oficiales: Pase Diario a 15 soles y Plan Mensual a 120 soles.
Horarios de atención: De lunes a viernes, turno mañana de 7:00 a. m. a 1:00 p. m. y turno tarde de 3:00 p. m. a 9:00 p. m. Sábados de 8:00 a. m. a 1:00 p. m. Domingos con horario por confirmar por WhatsApp.
WhatsApp oficial: +51 976 795 498. Escríbenos para unirte hoy.`;

    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = 'es-PE';
    utterance.rate = 0.95;

    // Pick Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, stopSpeaking]);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        highContrast,
        grayscale,
        dyslexiaFont,
        reducedMotion,
        highlightLinks,
        bigCursor,
        isOpen,
        isSpeaking,
        setTextSize,
        toggleHighContrast,
        toggleGrayscale,
        toggleDyslexiaFont,
        toggleReducedMotion,
        toggleHighlightLinks,
        toggleBigCursor,
        setIsOpen,
        resetAll,
        speakOverview,
        stopSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
