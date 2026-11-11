import { GYM_CONFIG } from '../config/gymInfo.ts';

/**
 * Builds a direct WhatsApp web/mobile URL with encoded message
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const message = customMessage || GYM_CONFIG.phone.whatsappMessageGeneral;
  return `https://wa.me/${GYM_CONFIG.phone.raw}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats soles currency
 */
export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export interface GymStatusResult {
  isOpen: boolean;
  isPaused: boolean;
  statusLabel: string;
  nextEventDescription: string;
  badgeColorClass: string;
}

/**
 * Determines open/pause/closed status based on official schedule
 * Note: uses Peru timezone (UTC-5)
 */
export function calculateGymStatus(date: Date = new Date()): GymStatusResult {
  // Convert current UTC time to Peru local time (UTC-5)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const peruTime = new Date(utc - 5 * 3600000);

  const dayOfWeek = peruTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const hour = peruTime.getHours();
  const minute = peruTime.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // Sunday
  if (dayOfWeek === 0) {
    return {
      isOpen: false,
      isPaused: false,
      statusLabel: 'Horario no confirmado',
      nextEventDescription: 'Consulta disponibilidad dominical por WhatsApp',
      badgeColorClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    };
  }

  // Saturday: 8:00 a.m. – 1:00 p.m. (480 to 780 minutes)
  if (dayOfWeek === 6) {
    const openMin = 8 * 60;
    const closeMin = 13 * 60;
    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      return {
        isOpen: true,
        isPaused: false,
        statusLabel: 'Abierto ahora',
        nextEventDescription: 'Cierra hoy a la 1:00 p. m.',
        badgeColorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      };
    } else if (currentMinutes < openMin) {
      return {
        isOpen: false,
        isPaused: false,
        statusLabel: 'Próxima apertura',
        nextEventDescription: 'Abre hoy a las 8:00 a. m.',
        badgeColorClass: 'text-neutral-400 bg-neutral-800 border-neutral-700',
      };
    } else {
      return {
        isOpen: false,
        isPaused: false,
        statusLabel: 'Cerrado por hoy',
        nextEventDescription: 'Próxima apertura: Lunes a las 7:00 a. m.',
        badgeColorClass: 'text-neutral-400 bg-neutral-800 border-neutral-700',
      };
    }
  }

  // Monday to Friday
  // Morning shift: 7:00 (420) to 13:00 (780)
  // Afternoon shift: 15:00 (900) to 21:00 (1260)
  const morningOpen = 7 * 60;
  const morningClose = 13 * 60;
  const afternoonOpen = 15 * 60;
  const afternoonClose = 21 * 60;

  if (currentMinutes >= morningOpen && currentMinutes < morningClose) {
    return {
      isOpen: true,
      isPaused: false,
      statusLabel: 'Abierto ahora · Turno Mañana',
      nextEventDescription: 'Pausa a la 1:00 p. m. (reapertura 3:00 p. m.)',
      badgeColorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    };
  }

  if (currentMinutes >= morningClose && currentMinutes < afternoonOpen) {
    return {
      isOpen: false,
      isPaused: true,
      statusLabel: 'Pausa intermedia',
      nextEventDescription: 'Reabre en turno tarde a las 3:00 p. m.',
      badgeColorClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    };
  }

  if (currentMinutes >= afternoonOpen && currentMinutes < afternoonClose) {
    return {
      isOpen: true,
      isPaused: false,
      statusLabel: 'Abierto ahora · Turno Tarde',
      nextEventDescription: 'Cierra a las 9:00 p. m.',
      badgeColorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    };
  }

  if (currentMinutes < morningOpen) {
    return {
      isOpen: false,
      isPaused: false,
      statusLabel: 'Próxima apertura',
      nextEventDescription: 'Abre hoy a las 7:00 a. m.',
      badgeColorClass: 'text-neutral-400 bg-neutral-800 border-neutral-700',
    };
  }

  // After 21:00
  const isFriday = dayOfWeek === 5;
  return {
    isOpen: false,
    isPaused: false,
    statusLabel: 'Cerrado por hoy',
    nextEventDescription: isFriday ? 'Abre mañana sábado a las 8:00 a. m.' : 'Abre mañana a las 7:00 a. m.',
    badgeColorClass: 'text-neutral-400 bg-neutral-800 border-neutral-700',
  };
}
