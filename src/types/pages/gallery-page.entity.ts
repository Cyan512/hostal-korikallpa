import { StrapiEntity } from '@/src/types/strapi.entity';
import { ImgEntity, SharedHeroEntity } from '../shared.entity';

export interface GalleryListEntity {
  __component: 'gallery.gallery-list';
  id: number;
  images: ImgEntity[];
}
export type GalleryBlocks = SharedHeroEntity | GalleryListEntity;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
