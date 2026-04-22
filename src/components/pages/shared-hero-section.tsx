export default function SharedHeroSection() {
  return (
    <section className="relative py-32 bg-primary-dark text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80"
          alt="Cusco"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <span className="inline-block px-4 py-1.5 border border-white/20 text-xs uppercase tracking-[0.2em] mb-6">
          Galería
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4">
          Qori Kallpa
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Explora nuestros espacios diseñados con elegancia colonial.
        </p>
      </div>
    </section>
  );
}
