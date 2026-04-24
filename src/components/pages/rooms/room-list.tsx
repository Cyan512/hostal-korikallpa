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
    return <section className="py-24 bg-muted/30">Cargando...</section>;
  }

  return (
    <>
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-44 bg-primary/10 relative overflow-hidden">
                  <img
                    src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {room.description}
                  </p>
                  <div className="flex gap-2 mb-4">
                    {(room.features ?? '')
                      .split('\n')
                      .slice(0, 2)
                      .map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-muted rounded-sm"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>
                  <div className="flex items-end justify-between pt-4 border-t border-border">
                    <span className="text-xl font-semibold text-accent">
                      S/{room.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /noche
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}
