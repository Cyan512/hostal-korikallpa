import Link from 'next/link';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
  amenities: string[];
}

interface RoomsGridProps {
  rooms: Room[];
}

export default function RoomsGridSection({ rooms }: RoomsGridProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <span className="font-serif text-5xl text-primary/30">
                  Hab.
                </span>
              </div>

              <div className="p-6">
                <span className="text-xs px-2 py-1 bg-muted rounded-sm capitalize">
                  {room.type}
                </span>

                <h3 className="font-serif text-lg font-semibold mt-3 mb-2">
                  {room.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {room.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-muted rounded-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-semibold text-accent">
                    S/{room.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /noche
                    </span>
                  </span>

                  <span className="text-sm text-primary group-hover:underline">
                    Detalles →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
