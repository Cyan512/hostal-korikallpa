'use client';

import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2"
            aria-label="Open menu"
          >
            <div className="space-y-1.5 w-6">
              <span className="block w-6 h-px bg-primary-dark" />
              <span className="block w-6 h-px bg-primary-dark" />
              <span className="block w-6 h-px bg-primary-dark" />
            </div>
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2"
          >
            <img
              src="/logo.webp"
              alt="Qori Kallpa"
              className="w-16 h-16 object-contain"
            />
          </Link>
          <LanguageSelector />
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute top-0 left-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center px-6 py-5 border-b border-border pt-6">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.webp"
                  alt="Qori Kallpa"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-4 text-base font-medium text-primary-dark border-b border-border/30 hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
