import { StrapiImage } from './strapi-image.entity';

export interface SharedHeroEntity {
  __component: 'shared.section-hero';
  id: number;
}

export interface SharedAboutEntity {
  __component: 'shared.section-about';
  id: number;
}

export interface ImgEntity {
  id: number;
  categary: string;
  src: StrapiImage;
  alt: string;
}
