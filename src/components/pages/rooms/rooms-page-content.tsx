'use client';

import { useMemo, useState } from 'react';
import SharedHeroSection from '../shared-hero-section';
import RoomsFilterSection from './rooms-filter-section';
import RoomsGridSection from './rooms-grid-section';

const allRooms = [
  {
    id: 'habitacion-familiar',
    name: 'Habitación Familiar',
    description:
      'Espaciosa habitación para toda la familia con vista a la ciudad. Incluye sala de estar y baño privado.',
    price: 120,
    type: 'familiar',
    features: [
      '4 personas',
      'Cama doble + individuales',
      'Baño privado',
      'Sala de estar',
    ],
    amenities: ['WiFi', 'TV', 'Calefacción'],
  },
  {
    id: 'habitacion-matrimonial',
    name: 'Suite Matrimonial',
    description:
      'Elegante suite con zona de estar y balcón con vista panorámica a la ciudad.',
    price: 95,
    type: 'matrimonial',
    features: ['2 personas', 'Cama queen', 'Zona de estar', 'Balcón'],
    amenities: ['WiFi', 'TV', 'Calefacción', 'Minibar'],
  },
  {
    id: 'habitacion-doble',
    name: 'Habitación Doble',
    description: 'Habitación acogedora con dos camas queen y baño privado.',
    price: 65,
    type: 'doble',
    features: ['2 personas', '2 camas queen', 'Baño privado'],
    amenities: ['WiFi', 'Calefacción'],
  },
  {
    id: 'habitacion-individual',
    name: 'Habitación Individual',
    description: 'Habitación elegante para viajeros solos.',
    price: 45,
    type: 'individual',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
    amenities: ['WiFi', 'Calefacción'],
  },
  {
    id: 'suite-presidencial',
    name: 'Suite Presidencial',
    description: 'Suite de lujo con salón privado, chimenea y terraza.',
    price: 200,
    type: 'matrimonial',
    features: ['4 personas', '2 habitaciones', 'Salón privado', 'Terraza'],
    amenities: ['WiFi', 'TV', 'Calefacción', 'Minibar', 'Caja fuerte'],
  },
  {
    id: 'habitacion-economica',
    name: 'Habitación Económica',
    description: 'Opción cómoda y funcional para viajeros.',
    price: 35,
    type: 'individual',
    features: ['1 persona', 'Cama twin', 'Baño compartido'],
    amenities: ['WiFi'],
  },
];

export type SortOption = 'price-asc' | 'price-desc' | 'name';

export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
  amenities: string[];
};

export default function RoomsPageContent() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const filteredRooms = useMemo(() => {
    let rooms = [...allRooms];

    if (typeFilter !== 'all') {
      rooms = rooms.filter((room) => room.type === typeFilter);
    }

    switch (sortBy) {
      case 'price-asc':
        rooms.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        rooms.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        rooms.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return rooms;
  }, [typeFilter, sortBy]);

  return (
    <>
      <SharedHeroSection />

      <RoomsFilterSection
        checkIn={checkIn}
        checkOut={checkOut}
        typeFilter={typeFilter}
        sortBy={sortBy}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        setTypeFilter={setTypeFilter}
        setSortBy={setSortBy}
      />

      <RoomsGridSection rooms={filteredRooms} />
    </>
  );
}
