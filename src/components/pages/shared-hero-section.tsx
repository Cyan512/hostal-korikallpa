export default function SharedHeroSection() {
  return (
    <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80"
          alt="Cusco"
          className="w-full h-full object-cover object-center"
        />
        {/* Uniform cream overlay over entire section */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(237,229,204,0.65)' }}
        />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/logo.webp"
            alt="Qorikallpa"
            className="w-16 mb-3 drop-shadow"
          />

          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-medium">
            Hotel Boutique · Cusco
          </p>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none mt-1">
            <span className="text-stone-800">Qori</span>
            <span className="text-[#C8860A]">kallpa</span>
          </h1>

          {/* Divider */}
          <div className="w-10 h-0.5 bg-[#C8860A] mt-3 mb-3" />

          {/* Tagline */}
          <p className="font-serif text-sm text-stone-600 italic">
            &ldquo;El espíritu andino hecho descanso&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
