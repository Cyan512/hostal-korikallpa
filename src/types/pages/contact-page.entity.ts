import { StrapiEntity } from '@/src/types/strapi.entity';
import { SharedHeroEntity } from '../shared.entity';

export interface ContactInfoEntity {
  __component: 'contact.contact-info';
  id: number;
}
export type ContactBlocks = SharedHeroEntity | ContactInfoEntity;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
