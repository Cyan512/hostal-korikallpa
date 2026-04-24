import { StrapiEntity } from '@/src/types/strapi.entity';
import { SharedHeroEntity } from '../shared.entity';

export interface GalleryListEntity {
  __component: 'gallery.gallery-list';
  id: number;
}
export type GalleryBlocks = SharedHeroEntity | GalleryListEntity;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
