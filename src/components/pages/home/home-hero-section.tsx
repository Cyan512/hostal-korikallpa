import { Link } from '@/src/i18n/navigation';

export default function HomeHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fondo-hero.jpg"
          alt="Qorikallpa Cusco"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient left-to-right — foto visible a la derecha */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(240,232,208,0.75) 0%, rgba(237,229,204,0.4) 50%, rgba(237,229,204,0.0) 100%)',
          }}
        />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="max-w-lg">

          {/* Logo */}
          <img
            src="/logo.webp"
            alt="Qorikallpa"
            className="w-40 md:w-48 mb-4"
          />
          {/* Divider */}
          <div className="w-16 h-0.5 bg-[#C8860A] mb-5" />

          {/* Tagline */}
          <p className="font-serif text-lg md:text-xl text-stone-700 italic mb-10 leading-relaxed">
            &ldquo;El espíritu andino hecho descanso&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C8860A] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#a86e08] transition-colors"
            >
              Ver Habitaciones
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-stone-700 text-stone-800 text-sm font-semibold uppercase tracking-widest hover:bg-stone-800/10 transition-all"
            >
              Contactar
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
