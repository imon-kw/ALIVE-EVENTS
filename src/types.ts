export interface PackageItem {
  id: string;
  name: string;
  nameEn: string;
  pricePerDay: number;
  badge?: string;
  popular?: boolean;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  teamSize: string;
  deliverables: string[];
  isLowest?: boolean;
  isHighest?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'wedding' | 'haldi' | 'birthday' | 'corporate' | 'cinematic';
  categoryLabel: string;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  client: string;
  date: string;
}

export interface DriveDelivery {
  id: string;
  clientName: string;
  clientPhone: string;
  eventTitle: string;
  eventDate: string;
  packagePrice: number;
  packageType: string;
  driveLink: string;
  totalPhotos: number;
  totalVideos: number;
  status: string;
  expiryDate: string;
  highlightReel?: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventLocation: string;
  eventType: string;
  packageId: string;
  days: number;
  totalPrice: number;
  needDrone: boolean;
  needAlbum: boolean;
  additionalNotes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  eventType: string;
  rating: number;
  comment: string;
  avatar: string;
}
