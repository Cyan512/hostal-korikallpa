'use client';

import { useState } from 'react';
import environment from '@/src/environment';
import { HomeServicesEntity } from '@/src/types/pages/home-page.entity';

interface Service {
  title: string;
  description: string;
  price: string;
  image: string;
  details: string;
}

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-sm max-w-3xl w-full shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-[4/3] md:aspect-auto">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h3 className="font-serif text-2xl font-semibold text-primary-dark mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <p className="text-accent font-semibold text-xl mb-6">
              Precio: {service.price}
            </p>

            {service.details && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Incluye:
                </h4>
                <ul className="space-y-2">
                  {service.details
                    .split('\n')
                    .filter(Boolean)
                    .map((line, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-accent mt-0.5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {line}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: HomeServicesEntity;
}

export default function HomeServicesSectionV2({ data }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <section className="py-24 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Servicios
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold mt-2">
              Experiencia Completa
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mt-4">
              Además del alojamiento, te ofrecemos servicios diseñados para
              hacer tu estancia perfecta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service) => (
              <div
                key={service.title}
                onClick={() =>
                  setSelectedService({
                    title: service.title,
                    description: service.description,
                    price: service.price,
                    image: `${environment.strapi.apiEndpoint}${service.image.url}`,
                    details: service.details ?? '',
                  })
                }
                className="group relative overflow-hidden rounded-sm cursor-pointer"
              >
                <div className="aspect-video">
                  <img
                    src={`${environment.strapi.apiEndpoint}${service.image.url}`}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-serif text-lg font-semibold mb-2 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {service.description}
                  </p>
                  <span className="text-accent font-medium">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
