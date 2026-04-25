'use client';

import { useState } from 'react';

interface RoomsFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onClearFilters: () => void;
}

const CalendarIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-stone-400 pointer-events-none"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

export default function RoomsFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  priceRange,
  onPriceRangeChange,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onClearFilters,
}: RoomsFiltersProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice ||
    checkIn !== '' ||
    checkOut !== '';

  const pct = (val: number) =>
    ((val - minPrice) / (maxPrice - minPrice || 1)) * 100;

  const allOptions = [
    { value: 'all', label: 'Todas las habitaciones' },
    ...categories.map((c) => ({ value: c, label: c })),
  ];
  const selectedLabel =
    allOptions.find((o) => o.value === selectedCategory)?.label ??
    'Todas las habitaciones';

  return (
    <aside className="flex flex-col gap-7">
      {/* ── Título ── */}
      <div className="flex items-center gap-3">
        <div className="w-0.5 h-5 bg-[#C8860A]" />
        <p className="font-serif text-base font-bold text-stone-800 tracking-wide">
          Filtros
        </p>
      </div>

      {/* ── Tipo de habitación (dropdown custom) ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
          Tipo de habitación
        </label>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-stone-700 border transition-all bg-white/50 ${
              dropdownOpen
                ? 'border-[#C8860A]'
                : 'border-stone-200 hover:border-stone-400'
            }`}
          >
            <span
              className={
                selectedCategory !== 'all' ? 'text-[#C8860A] font-semibold' : ''
              }
            >
              {selectedLabel}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Opciones */}
          {dropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 z-20 border border-stone-200 border-t-0 overflow-hidden shadow-lg"
              style={{
                background: 'linear-gradient(160deg, #faf6ee 0%, #f0ead8 100%)',
              }}
            >
              {allOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onCategoryChange(opt.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-all text-left ${
                    selectedCategory === opt.value
                      ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold'
                      : 'text-stone-600 hover:bg-white/60 hover:text-stone-900'
                  }`}
                >
                  {opt.label}
                  {selectedCategory === opt.value && (
                    <svg
                      className="w-3 h-3 text-[#C8860A] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-stone-200/80" />

      {/* ── Precio ── */}
      <div className="flex flex-col gap-4">
        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
          Precio por noche
        </label>

        {/* Rango */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex flex-col items-center gap-0.5 bg-white/50 border border-stone-200 py-2">
            <span className="text-[8px] uppercase tracking-widest text-stone-400">
              Desde
            </span>
            <span className="font-serif text-sm font-bold text-stone-800">
              S/{priceRange[0]}
            </span>
          </div>
          <div className="w-4 h-px bg-stone-300" />
          <div className="flex-1 flex flex-col items-center gap-0.5 bg-white/50 border border-stone-200 py-2">
            <span className="text-[8px] uppercase tracking-widest text-stone-400">
              Hasta
            </span>
            <span className="font-serif text-sm font-bold text-stone-800">
              S/{priceRange[1]}
            </span>
          </div>
        </div>

        {/* Slider dual */}
        <div className="relative h-5 flex items-center px-1">
          <div className="absolute inset-x-1 h-0.5 bg-stone-200 rounded-full" />
          <div
            className="absolute h-0.5 bg-[#C8860A] rounded-full"
            style={{
              left: `calc(${pct(priceRange[0])}% + 4px)`,
              right: `calc(${100 - pct(priceRange[1])}% + 4px)`,
            }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= priceRange[1])
                onPriceRangeChange([val, priceRange[1]]);
            }}
            className="absolute inset-x-0 w-full opacity-0 cursor-pointer h-5"
            style={{ zIndex: priceRange[0] > maxPrice - 10 ? 5 : 3 }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= priceRange[0])
                onPriceRangeChange([priceRange[0], val]);
            }}
            className="absolute inset-x-0 w-full opacity-0 cursor-pointer h-5"
            style={{ zIndex: 4 }}
          />
          <div
            className="absolute w-3.5 h-3.5 bg-white border-2 border-[#C8860A] rounded-full shadow pointer-events-none"
            style={{ left: `calc(${pct(priceRange[0])}% - 3px)` }}
          />
          <div
            className="absolute w-3.5 h-3.5 bg-white border-2 border-[#C8860A] rounded-full shadow pointer-events-none"
            style={{ left: `calc(${pct(priceRange[1])}% - 11px)` }}
          />
        </div>
      </div>

      <div className="h-px bg-stone-200/80" />

      {/* ── Disponibilidad ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
          Disponibilidad
        </label>

        <div className="flex flex-col gap-2">
          {/* Check-in */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest text-stone-400 pl-0.5">
              Llegada
            </span>
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none">
                <CalendarIcon />
              </div>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => onCheckInChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs text-stone-700 border border-stone-200 bg-white/50 focus:outline-none focus:border-[#C8860A] transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest text-stone-400 pl-0.5">
              Salida
            </span>
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none">
                <CalendarIcon />
              </div>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs text-stone-700 border border-stone-200 bg-white/50 focus:outline-none focus:border-[#C8860A] transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Limpiar ── */}
      {hasActiveFilters && (
        <>
          <div className="h-px bg-stone-200/80" />
          <button
            onClick={onClearFilters}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-[#C8860A] transition-colors font-semibold"
          >
            <svg
              className="w-3 h-3 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Limpiar filtros
          </button>
        </>
      )}
    </aside>
  );
}
