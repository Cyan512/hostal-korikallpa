const features = [
  {
    title: 'Ubicación Privilegiada',
    description:
      'En el corazón del casco histórico de Cusco, a pasos de la Plaza de Armas y principales atractivos.',
  },
  {
    title: 'Diseño Elegante',
    description:
      'Espacios diseñados con toques coloniales y materiales nobles del altiplano.',
  },
  {
    title: 'Servicio Excepcional',
    description:
      'Atención personalizada para hacer de tu estancia una experiencia inolvidable.',
  },
];

export default function HomeAboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-112.5 lg:h-137.5 bg-muted rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80"
              alt="Recepción de Qori Kallpa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent">
                Sobre Nosotros
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold mt-2">
                Tradición y Elegancia
              </h2>
            </div>

            <p className="text-primary leading-relaxed">
              Qori Kallpa significa{' '}
              <span className="text-accent">&quot;Edificio Dorado&quot;</span>{' '}
              en Quechua. Nuestro hostal combina la-calidad de la arquitectura
              colonial cusqueña con comodidades modernas, creando un
              espaciodonde la historia y el confort se unen.
            </p>

            <div className="space-y-6 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-px bg-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
