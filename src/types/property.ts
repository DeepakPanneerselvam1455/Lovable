
export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  available: boolean;
  featured: boolean;
  amenities: string[];
  type: 'apartment' | 'house' | 'condo' | 'townhouse';
}
