'use client';

import { useEffect } from 'react';
import { Link } from '@/src/i18n/navigation';

export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-sm w-full max-w-4xl max-h-[90vh] flex"
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

        <div className="lg:col-span-2 p-6 lg:p-8 overflow-y-auto max-h-[90vh] flex-1">
          <span className="text-xs px-2 py-1 bg-muted rounded-sm capitalize inline-block mb-4">
            {typeLabels[room.type] || room.type}
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-4">
            {room.name}
          </h2>

          <div className="bg-muted/30 rounded-sm overflow-hidden mb-6">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {room.description}
          </p>

          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold mb-4">
              Características
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-sm"
                >
                  <span className="text-xs w-6 h-6 bg-primary-dark text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">
              Comodidades
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-3 bg-muted/30 rounded-sm text-sm"
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

          <div className="bg-muted/20 p-6 lg:p-8 lg:w-80 shrink-0">
            <div className="sticky top-0">
              <div className="py-6 border-t border-b border-border mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-accent">
                    S/{room.price}
                  </span>
                  <span className="text-muted-foreground">/noche</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Impuestos incluidos
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Check-in: 14:00 Hrs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Check-out: 12:00 Hrs</span>
                </div>
              </div>

              <Link
                href={`/contact?room=${room.id}`}
                onClick={onClose}
                className="block w-full py-3.5 bg-primary-dark text-white text-center font-medium hover:bg-primary transition-colors"
              >
                Reservar Ahora
              </Link>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Cancelación gratuita hasta 24h antes
              </p>

              <div className="mt-6 p-4 bg-primary-dark/5 border border-primary-dark/10 rounded-sm">
                <h3 className="font-semibold mb-2 text-sm">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Nuestro equipo está disponible 24/7 para atenderte.
                </p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-sm font-medium text-primary-dark hover:underline"
                >
                  Contáctanos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
