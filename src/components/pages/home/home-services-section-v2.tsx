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
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-7 h-7 bg-stone-800/20 hover:bg-stone-800/50 rounded-full flex items-center justify-center text-stone-700 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <svg
            className="w-3.5 h-3.5"
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

        {/* Top accent bar */}
        <div className="h-1 w-full bg-accent" />

        <div className="p-6 flex gap-5">
          {/* Image — Polaroid style */}
          <div
            className="w-36 shrink-0 -rotate-3"
            style={{ filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))' }}
          >
            <div
              className="p-2 pb-0"
              style={{
                background:
                  'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
              }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={service.imageSrc}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {service.price && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                    {service.price}
                  </div>
                )}
              </div>
              <div className="py-2 px-1 text-center">
                <p className="font-serif text-[11px] font-semibold text-stone-700 truncate">
                  {service.title}
                </p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
              Servicio
            </p>
            <h2 className="font-serif text-xl font-bold text-stone-800 leading-tight">
              {service.title}
            </h2>
            {service.price && (
              <span className="inline-block mt-1.5 text-xs font-semibold text-accent">
                {service.price}
              </span>
            )}
            <div className="w-8 h-px bg-accent mt-2" />
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Details */}
        {service.details && (
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-stone-300" />
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Incluye
              </span>
              <div className="flex-1 h-px bg-stone-300" />
            </div>
            <div className="space-y-1.5">
              {service.details
                .split('\n')
                .filter(Boolean)
                .map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-stone-600"
                  >
                    <span className="text-accent shrink-0 text-[10px]">✦</span>
                    {line}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bottom accent bar */}
        <div className="h-1 w-full bg-accent" />
      </div>
    </div>
  );
}

interface Props {
  data: HomeServicesEntity;
}

const rotationDeg = [-2, 1, -1, 2, -3, 2];

export default function HomeServicesSectionV2({ data }: Props) {
  const [selected, setSelected] = useState<
    (ServiceEntity & { imageSrc: string }) | null
  >(null);

  return (
    <>
      <section
        className="py-8"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* ── Desktop (lg+): info left, polaroids right ── */}
          <div className="hidden lg:flex items-center gap-8">
            {/* LEFT — info panel */}
            <div className="w-64 shrink-0 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  Lo que ofrecemos
                </p>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-800 leading-tight mt-1">
                  Experiencia Completa
                </h2>
              </div>

              <div className="w-10 h-px bg-accent" />

              <p className="text-sm text-stone-600 leading-relaxed">
                Más allá del alojamiento, te ofrecemos servicios diseñados para
                hacer tu estancia en Cusco perfecta e inolvidable.
              </p>

              <div className="space-y-1.5 text-xs text-stone-600">
                {data.services.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="text-accent text-[10px]">✦</span>
                    <span>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — always 4 polaroid slots */}
            <div className="flex-1 flex items-center justify-between gap-3 py-6">
              {Array.from(
                { length: 4 },
                (_, i) => data.services[i] ?? null
              ).map((service, i) => {
                const deg = rotationDeg[i % rotationDeg.length];
                const imageSrc = service
                  ? `${environment.strapi.apiEndpoint}${service.image.url}`
                  : '';
                return (
                  <div
                    key={service?.id ?? `empty-${i}`}
                    className="flex-1 min-w-0 cursor-pointer"
                    style={{
                      transform: `rotate(${deg}deg)`,
                      transition: 'transform 0.3s',
                      filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))',
                      visibility: service ? 'visible' : 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (service)
                        (e.currentTarget as HTMLDivElement).style.transform =
                          'rotate(0deg) scale(1.05) translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        `rotate(${deg}deg)`;
                    }}
                    onClick={() => {
                      if (service) setSelected({ ...service, imageSrc });
                    }}
                  >
                    <div
                      className="p-2 pb-0"
                      style={{
                        background:
                          'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                      }}
                    >
                      <div className="aspect-square overflow-hidden relative">
                        {service && (
                          <img
                            src={imageSrc}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {service && (
                          <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                            {service.price}
                          </div>
                        )}
                      </div>
                      <div className="py-2 px-1 text-center">
                        <p className="font-serif text-[11px] font-semibold text-stone-700 truncate">
                          {service?.title ?? '\u00A0'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile / Tablet (< lg): stacked ── */}
          <div className="flex flex-col gap-8 lg:hidden">
            {/* Info */}
            <div className="max-w-xs mx-auto w-full space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  Lo que ofrecemos
                </p>
                <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1 leading-tight">
                  Experiencia Completa
                </h2>
              </div>
              <div className="w-10 h-px bg-accent" />
              <p className="text-sm text-stone-600 leading-relaxed">
                Servicios diseñados para hacer tu estancia en Cusco perfecta e
                inolvidable.
              </p>
            </div>

            {/* Polaroids 2×2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 py-4">
              {data.services.map((service, i) => {
                const imageSrc = `${environment.strapi.apiEndpoint}${service.image.url}`;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelected({ ...service, imageSrc })}
                    className="cursor-pointer"
                    style={{
                      filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.2))',
                    }}
                  >
                    <div
                      className="p-2 pb-0"
                      style={{
                        background:
                          'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                      }}
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={imageSrc}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                          {service.price}
                        </div>
                      </div>
                      <div className="py-2 px-1 text-center">
                        <p className="font-serif text-[11px] font-semibold text-stone-700 truncate">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
