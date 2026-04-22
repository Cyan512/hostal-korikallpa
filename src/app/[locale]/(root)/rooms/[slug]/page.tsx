'use client';

import { use } from 'react';
import { Link } from '@/src/i18n/navigation';
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
  },
  'habitacion-matrimonial': {
    id: 'habitacion-matrimonial',
    name: 'Suite Matrimonial',
    description:
      'Elegante suite diseñada para parejas. Con zona de estar, balcón privado y baño completo. El espacioperfecto para una escapada romántica.',
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
  },
  'habitacion-individual': {
    id: 'habitacion-individual',
    name: 'Habitación Individual',
    description:
      'Habitación acogedora para viajeros solos. Compacta pero completa,.con todo lo necesario para una estancia placentera.',
    price: 45,
    type: 'individual',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
    amenities: ['WiFi', 'Calefacción'],
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
  },
};

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const room = roomsData[slug];

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          ← Volver a habitaciones
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-4/3 bg-primary/10 flex items-center justify-center">
              <span className="font-serif text-8xl text-primary/20">Hab.</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 bg-muted rounded-sm capitalize">
                {room.type}
              </span>
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl font-semibold">
              {room.name}
            </h1>

            <p className="text-muted-foreground leading-relaxed">
              {room.description}
            </p>

            <div className="py-4">
              <h3 className="font-semibold text-lg mb-4">Características</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Comodidades</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-sm px-3 py-1.5 bg-muted rounded-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-border">
              <div>
                <span className="text-4xl font-semibold text-accent">
                  S/{room.price}
                </span>
                <span className="text-muted-foreground">/noche</span>
              </div>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-primary-dark text-white font-medium hover:bg-primary transition-colors"
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
