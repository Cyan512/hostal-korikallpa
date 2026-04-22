import { Link } from '@/src/i18n/navigation';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                <span className="font-serif text-lg font-semibold text-white">
                  QK
                </span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Qori Kallpa
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Hospedaje boutique en el corazón del Cusco. Donde la elegancia se
              encuentra con la tradición.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg">Navegación</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/rooms', label: 'Habitaciones' },
                { href: '/gallery', label: 'Galería' },
                { href: '/contact', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-lg">Contacto</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>Cusco, Perú</li>
              <li>reservas@qorikallpa.com</li>
              <li>+51 984 123 456</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Qori Kallpa. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
