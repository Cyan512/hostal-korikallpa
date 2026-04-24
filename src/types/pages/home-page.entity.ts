import { StrapiEntity } from '@/src/types/strapi.entity';
import { SharedAboutEntity, SharedHeroEntity } from '../shared.entity';
import { RoomEntity } from '../bd/room.entity';
import { ServiceEntity } from '../bd/service.entity';

export interface HomeRoomsEntity {
  __component: 'home.home-rooms';
  id: number;
  rooms: RoomEntity[];
}

export interface HomeServicesEntity {
  __component: 'home.home-services';
  id: number;
  services: ServiceEntity[];
}

export type HomeBlocks =
  | SharedHeroEntity
  | SharedAboutEntity
  | HomeRoomsEntity
  | HomeServicesEntity;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
