'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import environment from '@/src/environment';
import { getAllRooms } from '@/src/api/strapi/get-all-rooms';
import { StrapiResponse } from '@/src/types/strapi.entity';
import { RoomEntity } from '@/src/types/bd/room.entity';
import RoomModal, { Room } from './room-modal';
import RoomsFilters from './rooms-filters';

export default function RoomList() {
  const locale = useLocale();
  const [rooms, setRooms] = useState<RoomEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response =
          await getAllRooms<StrapiResponse<RoomEntity[]>>(locale);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [locale]);

  const minPrice = useMemo(
    () => (rooms.length ? Math.min(...rooms.map((r) => r.price)) : 0),
    [rooms]
  );
  const maxPrice = useMemo(
    () => (rooms.length ? Math.max(...rooms.map((r) => r.price)) : 9999),
    [rooms]
  );

  useEffect(() => {
    if (rooms.length) setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const categories = useMemo(
    () => Array.from(new Set(rooms.map((r) => r.type))).filter(Boolean),
    [rooms]
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (selectedCategory !== 'all' && room.type !== selectedCategory)
        return false;
      if (room.price < priceRange[0] || room.price > priceRange[1])
        return false;
      return true;
    });
  }, [rooms, selectedCategory, priceRange]);

  const activeFilterCount = [
    selectedCategory !== 'all',
    priceRange[0] !== minPrice || priceRange[1] !== maxPrice,
    checkIn !== '',
    checkOut !== '',
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([minPrice, maxPrice]);
    setCheckIn('');
    setCheckOut('');
  };

  const handleRoomClick = (room: RoomEntity) => {
    setSelectedRoom({
      id: String(room.id),
      name: room.name,
      description: room.description,
      price: room.price,
      type: room.type,
      images: room.images.map(
        (img) => `${environment.strapi.apiEndpoint}${img.url}`
      ),
      features: (room.features ?? '').split('\n').filter(Boolean),
      amenities: (room.amenities ?? '').split('\n').filter(Boolean),
    });
  };

  const filtersProps = {
    categories,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
    minPrice,
    maxPrice,
    priceRange,
    onPriceRangeChange: setPriceRange,
    checkIn,
    checkOut,
    onCheckInChange: setCheckIn,
    onCheckOutChange: setCheckOut,
    onClearFilters: handleClearFilters,
  };

  return (
    <>
      <section
        className="min-h-screen"
        style={{
          background:
            'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          {/* ── Botón filtros mobile ── */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2.5 px-5 py-3 border border-stone-300 bg-white/50 text-xs uppercase tracking-widest font-semibold text-stone-700 hover:border-[#C8860A] hover:text-[#C8860A] transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filtrar
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C8860A] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* ── Layout desktop: sidebar + cards ── */}
          <div className="flex gap-12 xl:gap-16 items-start">
            {/* Sidebar — solo desktop */}
            <div className="hidden lg:block w-52 shrink-0 sticky top-20">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-7 bg-stone-200/60 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <RoomsFilters {...filtersProps} />
              )}
            </div>

            {/* Divisor vertical */}
            <div className="hidden lg:block w-px self-stretch bg-stone-200 shrink-0" />

            {/* Grid de cards */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-stone-200/60 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredRooms.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="font-serif text-xl text-stone-400 italic">
                    No hay habitaciones con esos filtros.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 text-[11px] uppercase tracking-widest text-[#C8860A] hover:underline font-semibold"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {filteredRooms.map((room, index) => {
                    const rotations = [-2, 1, -1, 2, -3, 2, 1, -2];
                    const deg = rotations[index % rotations.length];
                    return (
                      <div
                        key={room.id}
                        className="cursor-pointer"
                        style={{
                          transform: `rotate(${deg}deg)`,
                          transition: 'transform 0.3s',
                          filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform =
                            'rotate(0deg) scale(1.05) translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform =
                            `rotate(${deg}deg)`;
                        }}
                        onClick={() => handleRoomClick(room)}
                      >
                        <div
                          className="p-2 pb-0"
                          style={{
                            background:
                              'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
                          }}
                        >
                          <div className="aspect-square overflow-hidden relative">
                            <img
                              src={`${environment.strapi.apiEndpoint}${room.images[0]?.url}`}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 leading-none">
                              S/{room.price}
                            </div>
                            <div className="absolute top-2 right-2 bg-white/90 text-stone-700 text-[8px] font-semibold uppercase tracking-widest px-1.5 py-0.5 leading-none">
                              {room.type}
                            </div>
                          </div>
                          <div className="py-3 px-1 text-center space-y-0.5">
                            <p className="font-serif text-sm font-semibold text-stone-800 truncate leading-tight">
                              {room.name}
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-stone-400">
                              {room.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Drawer filtros mobile ── */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          filtersOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setFiltersOpen(false)}
      />
      {/* Panel */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-y-auto max-h-[85vh] transform transition-transform duration-300 ease-in-out ${
          filtersOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          background: 'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 100%)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-stone-300 rounded-full" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <p className="font-serif text-lg font-bold text-stone-800">Filtrar</p>
          <button
            onClick={() => setFiltersOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
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
          </button>
        </div>
        {/* Contenido filtros */}
        <div className="px-6 py-6">
          <RoomsFilters {...filtersProps} />
        </div>
        {/* Botón aplicar */}
        <div className="px-6 pb-8 pt-2">
          <button
            onClick={() => setFiltersOpen(false)}
            className="w-full py-3.5 bg-[#C8860A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#a86e08] transition-colors"
          >
            Ver {filteredRooms.length} habitación
            {filteredRooms.length !== 1 ? 'es' : ''}
          </button>
        </div>
      </div>

      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}
