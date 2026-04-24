import { StrapiImage } from '../strapi-image.entity';

export interface RoomEntity {
  id: number;
  name: string;
  description: string;
  type: string;
  images: StrapiImage[];
  features: string;
  amenities: string;
  slug: string;
  price: number;
}
