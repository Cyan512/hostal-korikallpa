'use client';
import { Link } from '@/src/i18n/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import environment from '@/src/environment';
import { getAllRooms } from '@/src/api/strapi/get-all-rooms';

interface Rooms {
  id: number;
  name: string;
  description: string;
  price: string;
  type: string;
  images: string;
  features: string;
  amenities: string;
  slug: string;
}

interface StrapiRooms {
  id: number;
  name: string;
  description: string;
  price: string;
  type: string;
  images: {
    url: string;
  }[];
  features: string;
  amenities: string;
  slug: string;
}

export default function HomeFeaturedRoomsSection() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const data = await getAllRooms<{ data: StrapiRooms[] }>(locale);
        const mappedRooms: Rooms[] = data.data.map((rooms) => ({
          id: rooms.id,
          name: rooms.name,
          description: rooms.description,
          price: rooms.price,
          type: rooms.type,
          features: rooms.features,
          amenities: rooms.amenities,
          images: rooms.images?.[0]?.url
            ? `${environment.strapi.apiEndpoint}${rooms.images[0].url}`
            : '',
          slug: rooms.slug,
        }));
        setRooms(mappedRooms);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [locale]);
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
          {rooms.slice(0, 4).map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-44 bg-primary/10 relative overflow-hidden">
                <img
                  src={room.images}
                  alt={room.name}
                  className="w-full h-full object-cover"
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
                    .split('\n') // 🔥 convierte a array
                    .slice(0, 2) // 🔥 toma solo 2
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
