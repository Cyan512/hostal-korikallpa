import DetailModal, {
  type ModalItem,
} from '@/src/components/organisms/detail-modal';
import { useState } from 'react';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
  features: unknown;
  amenities: unknown;
}

interface RoomsGridProps {
  rooms: Room[];
}

const parseList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (typeof value === 'string') {
    return value.split('\n').filter(Boolean);
  }

  return [];
};

export default function RoomsGridSection({ rooms }: RoomsGridProps) {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);

  const toModalItem = (room: Room): ModalItem => ({
    title: room.name,
    image: room.image,
    description: room.description,
    price: `S/${room.price}`,
    priceLabel: '/ noche',
    badge: room.type,
    features: parseList(room.features),
    amenities: parseList(room.amenities),
    ctaLabel: 'Ver habitación',
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedItem(toModalItem(room))}
              className="group block bg-white elegant-shadow elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-primary/10 relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
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
                  {parseList(room.features)
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

                <div className="flex items-center justify-between pt-4 border-t border-border">
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
      </div>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
