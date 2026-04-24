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

const typeLabels: Record<string, string> = {
  familiar: 'Familiar',
  matrimonial: 'Parejas',
  doble: 'Doble',
  individual: 'Individual',
};

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <svg
            className="w-6 h-6"
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

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-muted">
              <img
                src={room.images[activeImage]}
                alt={`${room.name} - imagen ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {room.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {room.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                      index === activeImage
                        ? 'border-accent'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8">
            <span className="text-xs px-3 py-1 bg-muted rounded-sm capitalize inline-block mb-4">
              {typeLabels[room.type] || room.type}
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-4">
              {room.name}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {room.description}
            </p>

            <div className="mb-6">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Características
              </h3>
              <div className="flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-sm px-3 py-1.5 bg-muted/50 rounded-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-serif text-lg font-semibold mb-3">
                Comodidades
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-accent shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/30 p-5 rounded-sm">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-accent">
                  S/{room.price}
                </span>
                <span className="text-muted-foreground">/noche</span>
              </div>

              <Link
                href={`/contact?room=${room.id}`}
                onClick={onClose}
                className="block w-full py-3 bg-primary-dark text-white text-center font-medium hover:bg-primary transition-colors rounded-sm"
              >
                Reservar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
