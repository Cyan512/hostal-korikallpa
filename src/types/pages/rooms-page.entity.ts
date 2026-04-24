import { StrapiEntity } from '@/src/types/strapi.entity';
import { SharedHeroEntity } from '../shared.entity';

export interface RoomListEntity {
  __component: 'room.room-list';
  id: number;
}
export type RoomBlocks = SharedHeroEntity | RoomListEntity;

export type RoomContent = StrapiEntity<{
  content: RoomBlocks[];
}>;
