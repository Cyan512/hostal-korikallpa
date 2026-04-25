'use client';

import { Link } from '@/src/i18n/navigation';
import { LanguageSelector } from '@/src/components/molecules/language-selector';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio', num: '01' },
  { href: '/rooms', label: 'Habitaciones', num: '02' },
  { href: '/gallery', label: 'Galería', num: '03' },
  { href: '/contact', label: 'Contacto', num: '04' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header bar */}
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
              <span className="block w-6 h-px bg-stone-700 transition-all group-hover:w-4" />
              <span className="block w-6 h-px bg-stone-700" />
              <span className="block w-4 h-px bg-stone-700 transition-all group-hover:w-6" />
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

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 60%, #e8dfc8 100%)',
        }}
      >
        {/* Drawer top */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-300/50">
          <img
            src="/logo.webp"
            alt="Qorikallpa"
            className="w-10 h-10 object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="px-6 pt-8 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-5 border-b border-stone-300/40 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-stone-400 font-mono tracking-widest">
                  {link.num}
                </span>
                <span className="font-serif text-xl font-bold text-stone-800 group-hover:text-accent transition-colors">
                  {link.label}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-stone-300 group-hover:text-accent group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Drawer bottom */}
        <div className="px-6 py-6 border-t border-stone-300/50 space-y-3">
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              Contacto
            </p>
            <p className="text-xs text-stone-600">+51 084 123 456</p>
            <p className="text-xs text-stone-600">reservas@qorikallpa.com</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-300/60" />
            <span className="text-accent text-xs">✦</span>
            <div className="flex-1 h-px bg-stone-300/60" />
          </div>
          <p className="font-serif text-xs text-stone-400 italic text-center">
            &ldquo;El espíritu andino hecho descanso&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}
