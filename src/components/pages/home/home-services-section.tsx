'use client';

import { useState } from 'react';

interface Service {
  title: string;
  description: string;
  price: string;
  image: string;
  details: string[];
}

const services: Service[] = [
  {
    title: 'Desayuno Gourmet',
    description:
      'Desayuno buffet con productos locales y opciones internacionales.',
    price: 'S/25',
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    details: [
      'Buffet completo con productos locales',
      'Frutas frescas de la región',
      'Panadería artesanal cusqueña',
      'Huevos preparados a tu gusto',
      'Jugos naturales y café premium',
      'Horario: 7:00 AM - 10:00 AM',
    ],
  },
  {
    title: 'Traslados',
    description: 'Servicio de transporte aeropuerto-hostal y tours turísticos.',
    price: 'Desde S/50',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    details: [
      'Traslado Aeropuerto - Hostal',
      'Traslado Hostal - Aeropuerto',
      'Servicio disponible 24 horas',
      'Vehículos nyamanes y seguros',
      'Conductores profesionales',
      'Asistencia con equipaje',
    ],
  },
  {
    title: 'Tours Guiados',
    description:
      'Excursiones a Machu Picchu, Sacred Valley y principales atractivos.',
    price: 'Desde S/80',
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80',
    details: [
      'Machu Picchu día completo',
      'Valle Sagrado de los Incas',
      'City Tour por Cusco',
      'Tour por Montañas de Colores',
      'Guía certificado en español/inglés',
      'Incluye transporte y alimentación',
    ],
  },
  {
    title: 'Lavandería',
    description: 'Servicio de lavandería y planchado exprés.',
    price: 'S/15',
    image:
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80',
    details: [
      'Lavado por kilogramo',
      'Servicio de planchado',
      'Entrega en 24 horas',
      'Servicio exprés disponible',
      'Detergentes hipoalergénicos',
      'Secado y doblado incluido',
    ],
  },
  {
    title: 'Conserjería',
    description: 'Asistencia 24 horas para reservas y recomendaciones.',
    price: 'Incluido',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    details: [
      'Atención 24 horas',
      'Reserva de restaurantes',
      'Información turística',
      'Organización de tours',
      'Recomendaciones locales',
      'Asistencia médica si es necesario',
    ],
  },
  {
    title: 'WiFi Premium',
    description: 'Conexión de alta velocidad en todas las áreas.',
    price: 'Incluido',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    details: [
      'Internet de alta velocidad',
      'WiFi en todas las habitaciones',
      'WiFi en áreas comunes',
      'Red dedicada para trabajo',
      'Soporte técnico disponible',
      'Conexión estable y segura',
    ],
  },
];

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-sm max-w-2xl w-full shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-white/80 bg-black/40 rounded-full p-1"
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
          <div className="h-64 md:h-auto">
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
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-amber-700 font-semibold text-xl mb-6">
              Precio: {service.price}
            </p>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                Incluye:
              </h4>
              <ul className="space-y-2">
                {service.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-amber-700 mt-0.5">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-8 px-6 py-3 bg-primary-dark text-white font-medium hover:bg-amber-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
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
            Además del alojamiento, te ofrecemos servicios diseñados para hacer
            tu estancia perfecta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={() => setSelectedService(service)}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <div className="aspect-video">
                <img
                  src={service.image}
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
                <span className="text-accent font-medium">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
