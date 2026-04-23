'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import environment from '@/src/environment';
import { getAllRooms } from '@/src/api/strapi/get-all-rooms';
import { Link } from '@/src/i18n/navigation';
import DetailModal, {
  type ModalItem,
} from '@/src/components/organisms/detail-modal';

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
  images: { url: string }[];
  features: string;
  amenities: string;
  slug: string;
}

export default function HomeFeaturedRoomsSection() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const data = await getAllRooms<{ data: StrapiRooms[] }>(locale);
        const mappedRooms: Rooms[] = data.data.map((room) => ({
          id: room.id,
          name: room.name,
          description: room.description,
          price: room.price,
          type: room.type,
          features: room.features,
          amenities: room.amenities,
          images: room.images?.[0]?.url
            ? `${environment.strapi.apiEndpoint}${room.images[0].url}`
            : '',
          slug: room.slug,
        }));
        setRooms(mappedRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [locale]);

  const toModalItem = (room: Rooms): ModalItem => ({
    title: room.name,
    image: room.images,
    description: room.description,
    price: `S/${room.price}`,
    priceLabel: '/ noche',
    badge: room.type,
    features: (room.features ?? '').split('\n').filter(Boolean),
    amenities: (room.amenities ?? '').split('\n').filter(Boolean),
    href: `/rooms/${room.slug}`,
    ctaLabel: 'Ver habitación',
  });

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
            <div
              key={room.id}
              onClick={() => setSelectedItem(toModalItem(room))}
              className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-44 bg-primary/10 relative overflow-hidden">
                <img
                  src={room.images}
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

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-dark text-white font-medium hover:bg-primary transition-colors"
          >
            Ver Todas las Habitaciones
          </Link>
        </div>
      </div>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
