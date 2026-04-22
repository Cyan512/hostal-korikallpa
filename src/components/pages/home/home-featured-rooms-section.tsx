import { Link } from '@/src/i18n/navigation';

const rooms = [
  {
    id: 'habitacion-familiar',
    name: 'Habitación Familiar',
    description:
      'Espaciosa habitación para toda la familia con vista a la ciudad.',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1631049307264-da0c9bd9b7f0?w=400&h=300&fit=crop',
    features: ['4 personas', 'Cama doble + individuales', 'Baño privado'],
  },
  {
    id: 'habitacion-matrimonial',
    name: 'Suite Matrimonial',
    description:
      'Elegante suite con zona de estar y balcón con vista panorámica.',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
    features: ['2 personas', 'Cama queen', 'Zona de estar', 'Balcón'],
  },
  {
    id: 'habitacion-doble',
    name: 'Habitación Doble',
    description: 'Habitación acogedora con dos camas queen.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop',
    features: ['2 personas', '2 camas queen', 'Baño privado'],
  },
  {
    id: 'habitacion-individual',
    name: 'Habitación Individual',
    description: 'Habitación elegante para viajeros solos.',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=300&fit=crop',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
  },
];

export default function HomeFeaturedRoomsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Nuestras habitaciones
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mt-2">
            Espacios de Ensueño
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Cada habitación ha sido diseñada pensando en tu comfort, combinando
            elementos coloniales con comodidades contemporáneas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-44 bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/15" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-4xl text-primary/30">
                    Hab.
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {room.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {room.description}
                </p>
                <div className="flex gap-2 mb-4">
                  {room.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
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
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-dark text-white font-medium hover:bg-primary transition-colors"
          >
            Ver Todas las Habitaciones
          </Link>
        </div>
      </div>
    </section>
  );
}
