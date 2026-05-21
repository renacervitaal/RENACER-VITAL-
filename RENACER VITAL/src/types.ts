export interface Experience {
  id: string;
  title: string;
  type: 'Individual' | 'Dúo' | 'Virtual';
  duration: string;
  price: string;
  priceValue: number;
  description: string;
  longDescription: string;
  bullets: string[];
  image: string;
  bgDecorative?: string;
}

export interface Booking {
  id: string;
  experienceId: string;
  experienceTitle: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  participants: number;
  aromaPreference: 'Lavanda' | 'Romero/Eucalipto' | 'Rosas/Jazmín' | 'Sin aroma';
  specialRequests?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'En calma' | 'Agotado/a' | 'Con energía' | 'Reflexivo/a' | 'Abrumado/a';
  content: string;
  habits: {
    meditation: boolean;
    herbalTea: boolean;
    consciousBreathing: boolean;
    gratitude: boolean;
  };
  stressLevel: number; // 1-10
}

export interface BrandValue {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}
