'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/src/i18n/navigation';

export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  images: string[];
  features: string[];
  amenities: string[];
};

interface RoomModalProps {
  room: Room;
  onClose: () => void;
}

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

export default function RoomModal({ room, onClose }: RoomModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const slots = Array.from({ length: 4 }, (_, i) => room.images[i] ?? null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
          scrollbarWidth: 'none',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 bg-black/20 hover:bg-black/50 rounded-full flex items-center justify-center text-stone-700 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ── HEADER: 4 Polaroids full width ── */}
        <div className="px-8 pt-8 pb-2">
          <div className="flex items-end justify-between gap-3">
            {slots.map((src, i) => {
              const rotation = rotations[i % rotations.length];
              return (
                <div
                  key={i}
                  className={`flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative ${rotation}`}
                  style={{
                    filter: src
                      ? 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))'
                      : 'none',
                    visibility: src ? 'visible' : 'hidden',
                    cursor: src ? 'pointer' : 'default',
                  }}
                  onClick={() => src && setActiveImage(i)}
                >
                  <div
                    className="p-2 pb-0"
                    style={{
                      background:
                        'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                    }}
                  >
                    <div
                      className={`aspect-square overflow-hidden ${i === activeImage ? 'ring-2 ring-accent' : ''}`}
                    >
                      {src && (
                        <img
                          src={src}
                          alt={`${room.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="py-1.5 text-center">
                      <p className="text-[10px] text-stone-400">
                        {i === activeImage ? '✦' : '\u00A0'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-8 py-4">
          <div className="flex-1 h-px bg-stone-300" />
          <span className="text-accent text-xs">✦</span>
          <div className="flex-1 h-px bg-stone-300" />
        </div>

        {/* ── BODY: info left + amenities right ── */}
        <div className="px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT — name, description, features, price, CTA */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                {room.type}
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-800 leading-tight mt-0.5">
                {room.name}
              </h2>
            </div>

            <div className="w-10 h-px bg-accent" />

            <p className="text-sm text-stone-600 leading-relaxed">
              {room.description}
            </p>

            {room.features.length > 0 && (
              <div className="space-y-1.5">
                {room.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-stone-600"
                  >
                    <span className="text-accent text-[10px]">✦</span>
                    {f}
                  </div>
                ))}
              </div>
            )}

            <div className="w-10 h-px bg-stone-300" />
          </div>

          {/* RIGHT — amenities */}
          {room.amenities.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                Comodidades
              </p>
              <div className="w-10 h-px bg-accent" />
              <div className="grid grid-cols-1 gap-2">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-xs text-stone-600 bg-white/50 px-3 py-2"
                  >
                    <span className="text-accent shrink-0">✦</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── STICKY BOTTOM BAR: price + CTA ── */}
        <div
          className="sticky bottom-0 flex items-center justify-between px-8 py-4 border-t border-stone-300/60"
          style={{
            background: 'linear-gradient(160deg, #ede8d0 0%, #e0d8c0 100%)',
          }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">
              Precio por noche
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-serif text-3xl font-bold text-accent leading-none">
                S/{room.price}
              </span>
              <span className="text-xs text-stone-500">/noche</span>
            </div>
          </div>
          <Link
            href={`/contact?room=${room.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-dark text-white text-xs font-semibold uppercase tracking-widest hover:bg-primary transition-colors shadow-lg"
          >
            Reservar Ahora
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
    </div>
  );
}
