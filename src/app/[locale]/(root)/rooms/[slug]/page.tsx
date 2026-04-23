'use client';

import { use } from 'react';
import { useState } from 'react';
import { Link } from '@/src/i18n/navigation';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const roomsData: Record<
  string,
  {
    id: string;
    name: string;
    description: string;
    price: number;
    type: string;
    features: string[];
    amenities: string[];
    images: string[];
  }
> = {
  'habitacion-familiar': {
    id: 'habitacion-familiar',
    name: 'Habitación Familiar',
    description:
      'Espaciosa habitación ideal para familias. Cuenta con sala de estar privada, baño completo con bañera y ventanas con vista a la ciudad. El espacio perfecto para compartir momentos juntos.',
    price: 120,
    type: 'familiar',
    features: [
      '4 personas',
      'Cama doble + individuales',
      'Baño privado',
      'Sala de estar',
      'Vista a la ciudad',
    ],
    amenities: ['WiFi', 'TV', 'Calefacción', 'Agua caliente'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    ],
  },
  'habitacion-matrimonial': {
    id: 'habitacion-matrimonial',
    name: 'Suite Matrimonial',
    description:
      'Elegante suite diseñada para parejas. Con zona de estar, balcón privado y baño completo. El espacio perfecto para una escapada romántica.',
    price: 95,
    type: 'matrimonial',
    features: [
      '2 personas',
      'Cama queen',
      'Zona de estar',
      'Balcón',
      'Baño privado',
    ],
    amenities: ['WiFi', 'TV', 'Calefacción', 'Minibar', 'Caja fuerte'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    ],
  },
  'habitacion-doble': {
    id: 'habitacion-doble',
    name: 'Habitación Doble',
    description:
      'Habitación cómoda con dos camas queen. Ideal para amigos o compañeros de viaje que buscan comfort sin renunciar al espacio.',
    price: 65,
    type: 'doble',
    features: ['2 personas', '2 camas queen', 'Baño privado', 'Escritorio'],
    amenities: ['WiFi', 'Calefacción', 'Agua caliente'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    ],
  },
  'habitacion-individual': {
    id: 'habitacion-individual',
    name: 'Habitación Individual',
    description:
      'Habitación acogedora para viajeros solos. Compacta pero completa, con todo lo necesario para una estancia placentera.',
    price: 45,
    type: 'individual',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
    amenities: ['WiFi', 'Calefacción'],
    images: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
    ],
  },
  'suite-presidencial': {
    id: 'suite-presidencial',
    name: 'Suite Presidencial',
    description:
      'La mejor experiencia de hospedaje. Suite de dos niveles con salón privado, chimenea, terraza y servicios premium. Una experiencia única.',
    price: 200,
    type: 'matrimonial',
    features: [
      '4 personas',
      '2 habitaciones',
      'Salón privado',
      'Chimenea',
      'Terraza',
    ],
    amenities: [
      'WiFi',
      'TV',
      'Calefacción',
      'Minibar',
      'Caja fuerte',
      'Servicio a cuarto',
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    ],
  },
  'habitacion-economica': {
    id: 'habitacion-economica',
    name: 'Habitación Económica',
    description:
      'Opción funcional y cómoda para viajeros conscientes del presupuesto. Todas las essentials para un descanso adecuado.',
    price: 35,
    type: 'individual',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
    amenities: ['WiFi'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
    ],
  },
};

const typeLabels: Record<string, string> = {
  familiar: 'Familiar',
  matrimonial: 'Parejas',
  doble: 'Doble',
  individual: 'Individual',
};

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const room = roomsData[slug];
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!room) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Habitación no encontrada
          </h1>
          <Link href="/rooms" className="text-accent hover:underline">
            ← Volver a habitaciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a habitaciones
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white elegant-shadow elegant-border rounded-sm overflow-hidden">
              <div
                className="aspect-3/2 bg-primary/10 cursor-pointer"
                onClick={() => {
                  setLightboxIndex(activeImage);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={room.images[activeImage]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {room.images.length > 1 && (
                <div className="flex gap-2 p-2 bg-muted/20 overflow-x-auto">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                        activeImage === index
                          ? 'border-primary-dark'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${room.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
              <span className="text-xs px-2 py-1 bg-muted rounded-sm capitalize inline-block mb-4">
                {typeLabels[room.type] || room.type}
              </span>
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">
                {room.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {room.description}
              </p>
            </div>

            <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
              <h2 className="font-serif text-xl font-semibold mb-6">
                Características
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
              <h2 className="font-serif text-xl font-semibold mb-6">
                Comodidades
              </h2>
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
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
                <h2 className="font-serif text-2xl font-semibold mb-2">
                  {room.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Habitación {typeLabels[room.type] || room.type}
                </p>

                <div className="py-6 border-t border-b border-border">
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

                <div className="py-6 space-y-4">
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
                  className="block w-full py-3.5 bg-primary-dark text-white text-center font-medium hover:bg-primary transition-colors"
                >
                  Reservar Ahora
                </Link>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Cancelación gratuita hasta 24h antes
                </p>
              </div>

              <div className="bg-primary-dark/5 border border-primary-dark/10 rounded-sm p-6">
                <h3 className="font-semibold mb-3">¿Necesitas ayuda?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nuestro equipo está disponible 24/7 para atenderte.
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-primary-dark hover:underline"
                >
                  Contáctanos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={room.images.map((src) => ({ src }))}
      />
    </div>
  );
}
