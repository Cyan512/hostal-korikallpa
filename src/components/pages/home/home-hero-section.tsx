import { Link } from '@/src/i18n/navigation';
export default function HomeHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80"
          alt="Qori Kallpa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(180,83,9,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 border border-white/20 text-white/60 text-xs uppercase tracking-[0.25em] mb-8">
          Hostal Boutique
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-tight">
          Qori Kallpa
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-10 font-light max-w-2xl mx-auto">
          Un refugio elegante en el corazón del Cusco. Donde la tradición andina
          se encuentra con el confort moderno.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-dark font-medium hover:bg-white/90 transition-colors"
          >
            Ver Habitaciones
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  );
}
