'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import environment from '@/src/environment';
import { getAllRooms } from '@/src/api/strapi/get-all-rooms';
import { StrapiResponse } from '@/src/types/strapi.entity';
import { RoomEntity } from '@/src/types/bd/room.entity';
import RoomModal, { Room } from './room-modal';

export default function RoomList() {
  const locale = useLocale();
  const [rooms, setRooms] = useState<RoomEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response =
          await getAllRooms<StrapiResponse<RoomEntity[]>>(locale);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [locale]);

  const handleRoomClick = (room: RoomEntity) => {
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

  if (loading) {
    return (
      <section
        className="py-24"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-stone-400 text-sm">
          Cargando...
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="py-6 overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {rooms.map((room, index) => {
              const rotations = [-2, 1, -1, 2, -3, 2, 1, -2];
              const deg = rotations[index % rotations.length];
              return (
                <div
                  key={room.id}
                  className="cursor-pointer"
                  style={{
                    transform: `rotate(${deg}deg)`,
                    transition: 'transform 0.3s',
                    filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      'rotate(0deg) scale(1.05) translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      `rotate(${deg}deg)`;
                  }}
                  onClick={() => handleRoomClick(room)}
                >
                  <div
                    className="p-2 pb-0"
                    style={{
                      background:
                        'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                    }}
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                        S/{room.price}
                      </div>
                      <div className="absolute top-2 right-2 bg-white/90 text-stone-700 text-[8px] font-semibold uppercase tracking-widest px-1.5 py-0.5 leading-none">
                        {room.type}
                      </div>
                    </div>
                    <div className="py-3 px-1 text-center space-y-0.5">
                      <p className="font-serif text-sm font-semibold text-stone-800 truncate leading-tight">
                        {room.name}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-stone-400">
                        {room.type}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}
