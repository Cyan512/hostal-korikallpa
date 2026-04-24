import { StrapiImage } from '../strapi-image.entity';

export interface ServiceEntity {
  id: number;
  title: string;
  description: string;
  price: string;
  image: StrapiImage;
  details: string;
}
