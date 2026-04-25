'use client';

import { Link, usePathname } from '@/src/i18n/navigation';
import { LanguageSelector } from '@/src/components/molecules/language-selector';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/rooms', label: 'Habitaciones' },
  { href: '/gallery', label: 'Galería' },
  { href: '/contact', label: 'Contacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/60"
        style={{
          background: 'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 flex flex-col gap-1.5 group"
              aria-label="Abrir menú"
            >
              <span className="block w-6 h-px bg-stone-700 transition-all duration-300 group-hover:w-4" />
              <span className="block w-6 h-px bg-stone-700" />
              <span className="block w-4 h-px bg-stone-700 transition-all duration-300 group-hover:w-6" />
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src="/logo.webp"
                alt="Qorikallpa"
                className="w-12 h-12 object-contain"
              />
            </Link>

            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,8,5,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Drawer ── */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 z-50 flex flex-col transform transition-transform duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background:
            'linear-gradient(175deg, #f8f3ea 0%, #ede8d8 70%, #e4dbc8 100%)',
          backgroundImage: 'url(/fondo-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay sobre la imagen */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'rgba(245,240,232,0.88)' }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-7 py-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="Qorikallpa"
              className="w-8 h-8 object-contain"
            />
            <div>
              <p className="font-serif text-sm font-bold text-stone-800 leading-none">
                Qorikallpa
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 mt-0.5">
                Hotel Boutique · Cusco
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Línea dorada */}
        <div className="relative z-10 mx-7 h-px bg-[#C8860A]/40 mb-8" />

        {/* Nav */}
        <nav className="relative z-10 flex-1 px-7 flex flex-col justify-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center py-3.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#C8860A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mx-2 rounded" />
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#C8860A] rounded-full" />
                )}
                <span
                  className={`relative font-serif text-3xl font-bold tracking-tight transition-colors duration-200 pl-4 ${
                    isActive
                      ? 'text-[#C8860A]'
                      : 'text-stone-800 group-hover:text-[#C8860A]'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="relative z-10 px-7 py-6">
          <div className="h-px bg-[#C8860A]/30 mb-5" />
          <div className="space-y-1 mb-5">
            <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-2">
              Contacto
            </p>
            <p className="text-xs text-stone-600">+51 084 123 456</p>
            <p className="text-xs text-stone-600">reservas@qorikallpa.com</p>
          </div>
          <p className="font-serif text-xs text-stone-400 italic">
            &ldquo;El espíritu andino hecho descanso&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}
