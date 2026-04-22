const services = [
  {
    title: 'Desayuno Gourmet',
    description:
      'Desayuno buffet con productos locales y opciones internacionales.',
    price: 'S/25',
  },
  {
    title: 'Traslados',
    description: 'Servicio de transporte aeropuerto-hostal y tours turísticos.',
    price: 'Desde S/50',
  },
  {
    title: 'Tours Guiados',
    description:
      'Excursiones a Machu Picchu, Sacred Valley y principales atractivos.',
    price: 'Desde S/80',
  },
  {
    title: 'Lavandería',
    description: 'Servicio de lavandería y planchado exprés.',
    price: 'S/15',
  },
  {
    title: 'Conserjería',
    description: 'Asistencia 24 horas para reservas y recomendaciones.',
    price: 'Incluido',
  },
  {
    title: 'WiFi Premium',
    description: 'Conexión de alta velocidad en todas las áreas.',
    price: 'Incluido',
  },
];

export default function HomeServicesSection() {
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
            Além del alojamiento, te ofrezcemos servicios diseñados para hacer
            tu estancia perfecta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 border border-white/10 hover:border-white/20 transition-colors"
            >
              <h3 className="font-serif text-lg font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {service.description}
              </p>
              <span className="text-accent font-medium">{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
