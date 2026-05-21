import { Experience, BrandValue } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'ritual-calma',
    title: 'Ritual de calma profunda',
    type: 'Individual',
    duration: '90 minutos',
    price: '$120.000 COP',
    priceValue: 120000,
    description: 'Sesión integral individual contra el ruido interno y el agotamiento acumulado.',
    longDescription: 'Descubre un refugio de paz diseñado únicamente para ti. Esta sesión combina múltiples técnicas sensoriales para apagar la mente sobreactivada, regular el sistema nervioso y restaurar tu centro.',
    bullets: [
      'Meditación guiada de enraizamiento',
      'Aromaterapia personalizada con aceites botánicos puros',
      'Té de hierbas adaptógenas y flores medicinales',
      'Terapia de sonido suave con cuencos'
    ],
    // Let's use a beautiful wellness image fallback or generated image
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'conexion-soltar',
    title: 'Conexión y soltar',
    type: 'Dúo',
    duration: '2 horas',
    price: '$200.000 COP',
    priceValue: 200000,
    description: 'Ritual ceremonial consciente diseñado para compartir, liberar tensiones y profundizar lazos.',
    longDescription: 'Un espacio sagrado para dos personas (amigos, pareja, familia). Un viaje meditativo y sensorial enfocado en liberar bloqueos emocionales y sembrar intenciones de paz común.',
    bullets: [
      'Ejercicios de respiración consciente en sintonía',
      'Movimientos suaves lúdicos y estiramiento restaurativo',
      'Cacao ceremonial puro de origen agroecológico',
      'Compartir reflexivo final bajo luz cálida'
    ],
    // Let's use our generated cacao ceremony image!
    image: '/src/assets/images/cacao_ceremony_1779220411812.png'
  },
  {
    id: 'calma-casa',
    title: 'Calma desde casa',
    type: 'Virtual',
    duration: '60 minutos',
    price: '$60.000 COP',
    priceValue: 60000,
    description: 'Sesión en línea con guía en tiempo real para cultivar pausas efectivas desde tu propio hogar.',
    longDescription: 'Aprende a transformar la vibración de tus rincones cotidianos. Una sesión digital en vivo enfocada en brindarte técnicas prácticas y duraderas de autorregulación y relajación.',
    bullets: [
      'Transmisión HD con audio inmersivo de alta calidad',
      'Guía en vivo personalizada uno-a-uno',
      'E-book digital descargable con rituales diarios de 5 minutos',
      'Lista de reproducción curada para continuar tu práctica'
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  }
];

export const BRAND_VALUES: BrandValue[] = [
  {
    id: 'amor-propio',
    title: 'Amor Propio',
    subtitle: 'Autocuidado genuino',
    description: 'Cultivamos el respeto hacia tu ritmo natural, aprendiendo a poner límites saludables y cuidando de tu templo físico.',
    icon: 'Heart'
  },
  {
    id: 'perseverancia',
    title: 'Perseverancia',
    subtitle: 'Sostener en la densidad',
    description: 'Te brindamos las herramientas y la fuerza interna para atravesar momentos densos con gracia, resiliencia y presencia.',
    icon: 'Compass'
  },
  {
    id: 'renovacion',
    title: 'Renovación',
    subtitle: 'Nuevas raíces, nuevas ramas',
    description: 'La vida es cíclica. Te apoyamos en tu capacidad innata para soltar lo marchito, renacer y madurar con sabiduría.',
    icon: 'Sprout'
  },
  {
    id: 'equilibrio',
    title: 'Equilibrio',
    subtitle: 'Armonía vital',
    description: 'Alineamos el cuerpo físico, el flujo mental y tu espacio espiritual para que experimentes coherencia y paz integral.',
    icon: 'TrendingUp'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Valentina Martínez',
    age: 28,
    text: 'El "Ritual de calma profunda" fue un antes y un después en mi mes. Llegué abrumada por el trabajo y salí sintiendo que toqué tierra de nuevo. El té de hierbas es sagrado.',
    rating: 5,
    tag: 'Calma Profunda',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Sebastián Restrepo',
    age: 32,
    text: 'Hicimos "Conexión y soltar" con mi compañera y fue hermoso. El cacao ceremonial nos permitió hablar desde el corazón en un ambiente lleno de hojas verdes y aceites deliciosos.',
    rating: 5,
    tag: 'Sesión Dúo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Camila Toro',
    age: 25,
    text: 'No creía que una sesión virtual pudiera relajarme tanto. "Calma desde casa" me dio trucos de respiración que ahora hago cada día al mediodía para no abrumarme. ¡10/10!',
    rating: 5,
    tag: 'Sesión Virtual',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't4',
    name: 'Martín Gómez',
    age: 30,
    text: 'Formo parte del Círculo de Renacer mensual. Encontré una comunidad de jóvenes adultos que también buscan desacelerar la marcha. Sentirte acompañado en este caos no tiene precio.',
    rating: 5,
    tag: 'Círculo Grupal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];
