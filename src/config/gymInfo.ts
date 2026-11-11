/**
 * 7 Strength Center - Centralized Gym Configuration
 * All official business details, pricing, hours, reels and contact links are strictly maintained here.
 */

export interface GymPlan {
  id: 'pase-diario' | 'plan-mensual';
  name: string;
  tagline: string;
  price: number;
  currency: string;
  formattedPrice: string;
  period: string;
  description: string;
  buttonText: string;
  whatsappUrl: string;
  isFeatured?: boolean;
  features: string[];
}

export interface GymHoursShift {
  name: string;
  timeRange: string;
  openHour: number; // 24h format
  openMinute: number;
  closeHour: number;
  closeMinute: number;
}

export interface GymHoursDay {
  dayName: string;
  dayType: 'weekday' | 'saturday' | 'sunday';
  shifts: GymHoursShift[];
  statusNote?: string;
}

export interface GallerySlot {
  id: string;
  title: string;
  category: string;
  aspect: 'large' | 'tall' | 'wide' | 'standard';
  description: string;
  placeholderText: string;
  sampleImage?: string;
  isRealOfficialPhoto: boolean;
}

export interface InstagramReelItem {
  id: string;
  reelCode: string;
  url: string;
  title: string;
  description: string;
}

export const GYM_CONFIG = {
  name: '7 STRENGTH CENTER',
  shortName: '7 Strength',
  tagline: 'CONSTRUYE TU FUERZA. SUPERA TUS LÍMITES.',
  description:
    'En 7 Strength Center creemos que la fuerza se construye con esfuerzo, disciplina y constancia. Un espacio de alto rendimiento en Cajamarca dedicado a superar límites.',
  city: 'Cajamarca, Perú',
  address: 'Los Leones 164, Cajamarca 06002, Perú',
  shortAddress: 'Los Leones 164, Cajamarca, Perú',
  googleMapsUrl: 'https://maps.app.goo.gl/91C9xZZZKMYR4APv5',
  googleMapsEmbedQuery: 'Los+Leones+164,+Cajamarca+06002,+Peru',
  
  phone: {
    display: '+51 976 795 498',
    raw: '51976795498',
    whatsappMessageGeneral:
      'Hola, vengo de la página web de 7 Strength Center y quisiera recibir información sobre sus planes.',
  },

  social: {
    instagramHandle: '@7strength',
    instagramUrl: 'https://www.instagram.com/7strength',
    featuredPostUrl: 'https://www.instagram.com/p/DGLxhrDMFSn/',
  },

  logoPath: '/assets/aistudio/image_9a92408f.png',

  brandColors: {
    primary: '#D71920',
    primaryDark: '#A80F15',
    bgDark: '#0B0B0C',
    surfaceDark: '#19191B',
    surfaceCard: '#141416',
    white: '#FFFFFF',
    textLight: '#F2F2F2',
  },

  plans: [
    {
      id: 'pase-diario',
      name: 'PASE DIARIO',
      tagline: 'Flexibilidad total para tu entrenamiento',
      price: 15.0,
      currency: 'S/',
      formattedPrice: 'S/ 15.00',
      period: '1 día',
      description: 'Entrena por un día y conoce la experiencia 7 Strength Center.',
      buttonText: 'CONSULTAR PASE',
      whatsappUrl:
        'https://wa.me/51976795498?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20el%20pase%20diario%20de%20S%2F%2015.',
      isFeatured: false,
      features: [
        'Acceso completo por el día seleccionado',
        'Uso de zona de peso libre y barras',
        'Uso de máquinas de entrenamiento',
        'Sin contratos ni compromisos de permanencia',
      ],
    },
    {
      id: 'plan-mensual',
      name: 'PLAN MENSUAL',
      tagline: 'Constancia y progreso garantizado',
      price: 120.0,
      currency: 'S/',
      formattedPrice: 'S/ 120.00',
      period: '1 mes',
      description: 'Continúa trabajando en tus objetivos con nuestra membresía mensual.',
      buttonText: 'INSCRIBIRME AHORA',
      whatsappUrl:
        'https://wa.me/51976795498?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20el%20plan%20mensual%20de%20S%2F%20120.',
      isFeatured: true,
      features: [
        'Acceso ilimitado durante todo el mes',
        'Horarios en turno mañana y turno tarde',
        'Uso total de instalaciones y equipamiento',
        'Ambiente enfocado en fuerza y disciplina',
      ],
    },
  ] as GymPlan[],

  hours: {
    weekdays: {
      days: 'Lunes a Viernes',
      shifts: [
        {
          name: 'Turno mañana',
          timeRange: '7:00 a. m. – 1:00 p. m.',
          openHour: 7,
          openMinute: 0,
          closeHour: 13,
          closeMinute: 0,
        },
        {
          name: 'Turno tarde',
          timeRange: '3:00 p. m. – 9:00 p. m.',
          openHour: 15,
          openMinute: 0,
          closeHour: 21,
          closeMinute: 0,
        },
      ],
      pauseNotice: 'Pausa intermedia de 1:00 p. m. a 3:00 p. m.',
    },
    saturday: {
      days: 'Sábados',
      shifts: [
        {
          name: 'Turno mañana',
          timeRange: '8:00 a. m. – 1:00 p. m.',
          openHour: 8,
          openMinute: 0,
          closeHour: 13,
          closeMinute: 0,
        },
      ],
    },
    sunday: {
      days: 'Domingos',
      statusNote: 'Horario no confirmado',
      advice: 'Consulta disponibilidad dominical a través de nuestro WhatsApp oficial.',
    },
  },

  reels: [
    {
      id: 'reel-1',
      reelCode: 'DeP0p8tSFfN',
      url: 'https://www.instagram.com/reel/DeP0p8tSFfN/',
      title: 'Fuerza y Rendimiento en Acción',
      description: 'Superando marcas y entrenando con técnica en 7 Strength Center.',
    },
    {
      id: 'reel-2',
      reelCode: 'Ddrl4dhhNeu',
      url: 'https://www.instagram.com/reel/Ddrl4dhhNeu/',
      title: 'Disciplina e Intensidad',
      description: 'El ambiente donde cada repetición cuenta. Comunidad 7 Strength.',
    },
    {
      id: 'reel-3',
      reelCode: 'DcXfxM_OR3g',
      url: 'https://www.instagram.com/reel/DcXfxM_OR3g/',
      title: 'Transformación Constante',
      description: 'La energía del entrenamiento en equipo. Vive la experiencia.',
    },
  ] as InstagramReelItem[],

  gallerySlots: [
    {
      id: 'slot-1',
      title: 'Vista General del Interior',
      category: 'Instalaciones y 2 Niveles',
      aspect: 'large', // 2 cols on desktop
      description: 'Vista panorámica con estructura en dos niveles, pista verde funcional y equipamiento de alto impacto.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Vista General del Interior',
      sampleImage: '/assets/aistudio/image_993ddb80.png',
      isRealOfficialPhoto: true,
    },
    {
      id: 'slot-2',
      title: 'Racks de Potencia y Fuerza',
      category: 'Power Racks y Barras',
      aspect: 'tall',
      description: 'Racks de sentadilla de uso rudo, barras olímpicas y zona de césped para empuje de trineos.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Racks de Potencia',
      sampleImage: '/assets/aistudio/image_f8a8200a.png',
      isRealOfficialPhoto: true,
    },
    {
      id: 'slot-3',
      title: 'Discos Olímpicos y Peso Libre',
      category: 'Discos Calibrados',
      aspect: 'standard',
      description: 'Discos bumper olímpicos de competición, agarres ergonómicos y plataformas con suelo técnico.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Discos Olímpicos',
      sampleImage: '/assets/aistudio/image_e767c3d6.png',
      isRealOfficialPhoto: true,
    },
    {
      id: 'slot-4',
      title: 'Máquinas de Biomecánica',
      category: 'Aislamiento Muscular',
      aspect: 'standard',
      description: 'Prensa inclinada de piernas, hack squat y estaciones de poleas con espejos panorámicos.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Máquinas de Biomecánica',
      sampleImage: '/assets/aistudio/image_19a15b40.png',
      isRealOfficialPhoto: true,
    },
    {
      id: 'slot-5',
      title: 'Estación Central de Powerlifting',
      category: 'Press de Banca Oficial',
      aspect: 'wide',
      description: 'Banco de competición oficial con el emblema de 7 Strength Center sobre pared de ladrillo rústico.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Estación Central de Powerlifting',
      sampleImage: '/assets/aistudio/image_cab5cadb.png',
      isRealOfficialPhoto: true,
    },
    {
      id: 'slot-6',
      title: 'Zona de Entrenamiento Pesado',
      category: 'Alto Rendimiento',
      aspect: 'standard',
      description: 'Iluminación hexagonal sobre vigas rojas con discos Rogue y plataformas para peso muerto.',
      placeholderText: 'Fotografía oficial de 7 Strength Center: Zona de Entrenamiento Pesado',
      sampleImage: '/assets/aistudio/image_e767c3d6.png',
      isRealOfficialPhoto: true,
    },
  ] as GallerySlot[],
};
