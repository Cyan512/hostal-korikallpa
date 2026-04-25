'use client';
import { useState } from 'react';
import environment from '@/src/environment';
import { Link } from '@/src/i18n/navigation';
import { HomeRoomsEntity } from '@/src/types/pages/home-page.entity';
import RoomModal, { Room } from '@/src/components/pages/rooms/room-modal';

interface Props {
  data: HomeRoomsEntity;
}

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-2'];

export default function HomeFeaturedRoomsSectionV2({ data }: Props) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleRoomClick = (room: HomeRoomsEntity['rooms'][0]) => {
    const roomData: Room = {
      id: String(room.id),
      name: room.name,
      description: room.description,
      price: room.price,
      type: room.type,
      images: room.images.map(
        (img) => `${environment.strapi.apiEndpoint}${img.url}`
      ),
      features: (room.features ?? '').split('\n').filter(Boolean),
      amenities: (room.amenities ?? '').split('\n').filter(Boolean),
    };
    setSelectedRoom(roomData);
  };

  return (
    <>
      <section
        className="py-12"
        style={{
          background: 'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
              Nuestras habitaciones
            </p>
            <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1">
              Espacios de Ensueño
            </h2>
            <div className="w-10 h-px bg-accent mt-3" />
          </div>

          {/* Polaroid grid */}
          {/* Desktop: single row flex — same as about section */}
          <div className="hidden lg:flex items-end gap-4 py-8">
            {data.rooms.map((room, index) => (
              <RoomPolaroid
                key={room.id}
                room={room}
                index={index}
                onSelect={handleRoomClick}
              />
            ))}
          </div>

          {/* Mobile / tablet: 2-col grid — no rotation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 py-6 lg:hidden">
            {data.rooms.map((room, index) => (
              <div
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="group cursor-pointer relative"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.14)' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 leading-none">
                    S/{room.price}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <h3 className="font-serif text-white font-semibold text-xs leading-tight line-clamp-2">
                      {room.name}
                    </h3>
                    <p className="text-[9px] uppercase tracking-widest text-white/60 mt-0.5">{room.type}</p>
                  </div>
                </div>
                <div className="bg-white px-2.5 py-1.5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">Ver detalles</span>
                  <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-dark text-white text-sm font-semibold uppercase tracking-widest hover:bg-primary transition-colors"
            >
              Ver Todas las Habitaciones
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}

/* ─── Room Polaroid card ──────────────────────────────────────── */

interface RoomPolaroidProps {
  room: HomeRoomsEntity['rooms'][0];
  index: number;
  onSelect: (room: HomeRoomsEntity['rooms'][0]) => void;
}

function RoomPolaroid({ room, index, onSelect }: RoomPolaroidProps) {
  const rotationDeg = [-2, 1, -1, 2, -3, 2];
  const deg = rotationDeg[index % rotationDeg.length];

  return (
    <div
      className="w-full lg:w-52 lg:shrink-0"
      style={{ transform: `rotate(${deg}deg)`, transition: 'transform 0.3s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.05) translateY(-4px)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${deg}deg)`; }}
    >
      <div
        onClick={() => onSelect(room)}
        className="group w-full cursor-pointer relative"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)' }}
      >
        {/* Image — rectangular 3:4 */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Price badge — top left */}
          <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 leading-none">
            S/{room.price}
            <span className="font-normal opacity-80 ml-0.5 text-[10px]">/noche</span>
          </div>

          {/* Type badge — top right */}
          <div className="absolute top-3 right-3 bg-white/90 text-stone-700 text-[9px] font-semibold uppercase tracking-widest px-2 py-1 leading-none">
            {room.type}
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Room name */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-serif text-white font-semibold text-sm leading-tight line-clamp-2">
              {room.name}
            </h3>
          </div>
        </div>

        {/* Footer strip */}
        <div className="bg-white px-3 py-2 flex items-center justify-between border-t border-stone-100">
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
            Ver detalles
          </span>
          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
