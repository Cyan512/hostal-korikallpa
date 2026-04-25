export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #2a2420 0%, #1a1410 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col items-center text-center space-y-4">
        {/* Logo */}
        <img
          src="/logo.webp"
          alt="Qorikallpa"
          className="w-32 brightness-0 invert opacity-90"
        />

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
          Hospedaje boutique en el corazón del Cusco. Donde la elegancia se
          encuentra con la tradición andina.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 w-48">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[#C8860A] text-sm">✦</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Tagline */}
        <p className="font-serif text-sm text-white/40 italic">
          &ldquo;El espíritu andino hecho descanso&rdquo;
        </p>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-white/10"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 text-center">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Qorikallpa · Hotel Boutique · Cusco,
            Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
