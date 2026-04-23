'use client';

import { useEffect } from 'react';
import { Link } from '@/src/i18n/navigation';

export interface ModalItem {
  title: string;
  image: string;
  description: string;
  price: string;
  priceLabel?: string;
  badge?: string;
  features?: string[];
  amenities?: string[];
  href?: string;
  ctaLabel?: string;
}

interface DetailModalProps {
  item: ModalItem | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0f0c0a]/85 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-[#faf8f5] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
        style={{ borderRadius: '2px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors text-[#3d3530]"
          style={{ borderRadius: '1px' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-auto min-h-[260px]">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-transparent" />
          {item.badge && (
            <div
              className="absolute top-5 left-5 bg-black/65 backdrop-blur-sm px-3 py-1.5"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: '#d4a96a',
                textTransform: 'uppercase',
              }}
            >
              {item.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-8 bg-[#faf8f5]">
          <div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9b8878',
                marginBottom: '8px',
              }}
            >
              Detalle
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 400,
                color: '#1a1410',
                lineHeight: 1.15,
                marginBottom: '10px',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '13px',
                lineHeight: 1.7,
                color: '#6b5f57',
                marginBottom: '16px',
              }}
            >
              {item.description}
            </p>

            {item.features && item.features.length > 0 && (
              <>
                <div
                  style={{
                    height: '1px',
                    background:
                      'linear-gradient(to right, #d4c4b8, transparent)',
                    margin: '16px 0',
                  }}
                />
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.features.map((f, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#7a6a60',
                        border: '0.5px solid #d4c4b8',
                        padding: '4px 10px',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </>
            )}

            {item.amenities && item.amenities.length > 0 && (
              <ul className="flex flex-col gap-1.5 mb-2">
                {item.amenities.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '12px',
                      color: '#5a4e46',
                    }}
                  >
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        background: '#c4954a',
                        borderRadius: '50%',
                        flexShrink: 0,
                        display: 'inline-block',
                      }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '0.5px solid #e2d8d0', marginTop: '20px' }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '26px',
                  fontWeight: 300,
                  color: '#1a1410',
                }}
              >
                {item.price}
              </span>
              {item.priceLabel && (
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '11px',
                    color: '#9b8878',
                    marginLeft: '4px',
                  }}
                >
                  {item.priceLabel}
                </span>
              )}
            </div>
            <button
              className="relative px-5 py-2.5 overflow-hidden group"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: '0.5px solid #d4a96a',
                color: '#1a1410',
                background: 'transparent',
              }}
            >
              {/* Fondo animado */}
              <span className="absolute inset-0 bg-[#1a1410] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              {/* Texto */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Reservar
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
