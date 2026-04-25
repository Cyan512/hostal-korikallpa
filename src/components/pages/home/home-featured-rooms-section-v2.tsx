'use client';
import { useState } from 'react';
import environment from '@/src/environment';
import { Link } from '@/src/i18n/navigation';
import { HomeRoomsEntity } from '@/src/types/pages/home-page.entity';
import RoomModal, { Room } from '@/src/components/pages/rooms/room-modal';

interface Props {
  data: HomeRoomsEntity;
}

export default function HomeFeaturedRoomsSectionV2({ data }: Props) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleRoomClick = (room: HomeRoomsEntity['rooms'][0]) => {
    setSelectedRoom({
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
    });
  };

  // Always 4 slots — fill with nulls if fewer rooms
  const featured = Array.from({ length: 4 }, (_, i) => data.rooms[i] ?? null);
  const rotationDeg = [-2, 1, -1, 2];

  return (
    <>
      <section
        className="py-8"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* ── Desktop (lg+): polaroids left, info right ── */}
          <div className="hidden lg:flex items-center gap-10">
            {/* LEFT — always 4 Polaroid slots */}
            <div className="flex-1 flex items-center justify-between gap-3 py-8">
              {featured.map((room, i) => {
                const deg = rotationDeg[i % rotationDeg.length];
                return (
                  <div
                    key={room?.id ?? `empty-${i}`}
                    className="flex-1 min-w-0 cursor-pointer"
                    style={{
                      transform: `rotate(${deg}deg)`,
                      transition: 'transform 0.3s',
                      filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))',
                      visibility: room ? 'visible' : 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (room)
                        (e.currentTarget as HTMLDivElement).style.transform =
                          'rotate(0deg) scale(1.05) translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        `rotate(${deg}deg)`;
                    }}
                    onClick={() => {
                      if (room) handleRoomClick(room);
                    }}
                  >
                    <div
                      className="p-2 pb-0"
                      style={{
                        background:
                          'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                      }}
                    >
                      <div className="aspect-square overflow-hidden relative">
                        {room ? (
                          <>
                            <img
                              src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                              S/{room.price}
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-stone-200/60 flex items-center justify-center">
                            <span className="text-stone-300 text-2xl">✦</span>
                          </div>
                        )}
                      </div>
                      <div className="py-2 px-1 text-center">
                        <p className="font-serif text-[11px] font-semibold text-stone-700 truncate">
                          {room ? room.name : '\u00A0'}
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 mt-0.5">
                          {room ? room.type : '\u00A0'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Info panel */}
            <div className="w-64 shrink-0 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                  Nuestras habitaciones
                </p>
                <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1 leading-tight">
                  Espacios de Ensueño
                </h2>
              </div>

              <div className="w-10 h-px bg-accent" />

              <p className="text-sm text-stone-600 leading-relaxed">
                Cada habitación ha sido diseñada combinando la calidez de la
                arquitectura colonial cusqueña con comodidades modernas. Un
                refugio auténtico en el corazón de los Andes.
              </p>

              <div className="space-y-2">
                {[
                  'Simples y Dobles',
                  'Matrimoniales Queen / King',
                  'Familiares',
                  'Vista interior o exterior',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-stone-600"
                  >
                    <span className="text-accent text-[10px]">✦</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="w-10 h-px bg-stone-300" />

              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-dark text-white text-xs font-semibold uppercase tracking-widest hover:bg-primary transition-colors"
              >
                Ver Todas
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Mobile / Tablet (< lg): stacked ── */}
          <div className="flex flex-col gap-8 lg:hidden">
            {/* Info */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                  Nuestras habitaciones
                </p>
                <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1">
                  Espacios de Ensueño
                </h2>
              </div>
              <div className="w-10 h-px bg-accent" />
              <p className="text-sm text-stone-600 leading-relaxed">
                Cada habitación combina la calidez colonial cusqueña con
                comodidades modernas.
              </p>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-dark text-white text-xs font-semibold uppercase tracking-widest hover:bg-primary transition-colors"
              >
                Ver Todas
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Polaroids always 4 slots in 2x2 */}
            <div className="grid grid-cols-2 gap-5 py-4">
              {featured.map((room, i) => (
                <div
                  key={room?.id ?? `empty-${i}`}
                  onClick={() => {
                    if (room) handleRoomClick(room);
                  }}
                  className={room ? 'cursor-pointer' : 'pointer-events-none'}
                  style={{
                    filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.2))',
                    visibility: room ? 'visible' : 'hidden',
                  }}
                >
                  <div
                    className="p-2 pb-0"
                    style={{
                      background:
                        'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                    }}
                  >
                    <div className="aspect-square overflow-hidden relative">
                      {room ? (
                        <>
                          <img
                            src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                            S/{room.price}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-stone-200/60 flex items-center justify-center">
                          <span className="text-stone-300 text-2xl">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="py-2 px-1 text-center">
                      <p className="font-serif text-[11px] font-semibold text-stone-700 truncate">
                        {room?.name ?? '\u00A0'}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-stone-400 mt-0.5">
                        {room?.type ?? '\u00A0'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}
