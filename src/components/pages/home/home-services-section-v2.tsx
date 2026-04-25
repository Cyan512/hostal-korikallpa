'use client';

import { useState } from 'react';
import environment from '@/src/environment';
import { HomeServicesEntity } from '@/src/types/pages/home-page.entity';
import { ServiceEntity } from '@/src/types/bd/service.entity';

interface ServiceModalProps {
  service: ServiceEntity & { imageSrc: string };
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Cerrar"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 min-h-56 shrink-0">
            <img
              src={service.imageSrc}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="font-serif text-2xl font-bold text-white">
                {service.title}
              </h2>
              <p className="text-accent font-bold text-lg mt-1">
                {service.price}
              </p>
            </div>
          </div>
          <div
            className="flex-1 flex flex-col p-6 gap-4"
            style={{
              background:
                'linear-gradient(160deg, #faf6ee 0%, #f0ead8 60%, #e8dfc8 100%)',
            }}
          >
            <p className="text-sm text-stone-600 leading-relaxed">
              {service.description}
            </p>
            {service.details && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-stone-300" />
                  <span className="text-accent text-xs">✦</span>
                  <div className="flex-1 h-px bg-stone-300" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-700 uppercase tracking-widest mb-3">
                    Incluye
                  </h4>
                  <ul className="space-y-2">
                    {service.details
                      .split('\n')
                      .filter(Boolean)
                      .map((line, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-stone-700"
                        >
                          <span className="text-accent mt-0.5 shrink-0">✦</span>
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              </>
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
  const [selected, setSelected] = useState<
    (ServiceEntity & { imageSrc: string }) | null
  >(null);

  return (
    <>
      <section
        className="py-12"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
              Lo que ofrecemos
            </p>
            <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1">
              Experiencia Completa
            </h2>
            <div className="w-10 h-px bg-accent mt-3" />
          </div>

          {/* Service cards — square with overlay */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-6">
            {data.services.map((service) => {
              const imageSrc = `${environment.strapi.apiEndpoint}${service.image.url}`;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelected({ ...service, imageSrc })}
                  className="group relative cursor-pointer overflow-hidden aspect-square transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}
                >
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Permanent dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Content centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="font-serif text-white font-bold text-base md:text-lg leading-tight drop-shadow-lg">
                      {service.title}
                    </h3>
                    <div className="w-8 h-px bg-accent my-2" />
                    <span className="text-accent font-bold text-sm drop-shadow">
                      {service.price}
                    </span>
                  </div>

                  {/* Hover: show description */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif text-white font-bold text-sm leading-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed line-clamp-3 mb-3">
                      {service.description}
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 flex items-center gap-1">
                      Ver detalles
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
