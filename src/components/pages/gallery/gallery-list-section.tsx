'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 4;

const galleryImages = [
  {
    title: 'Fachada Principal',
    category: 'Exterior',
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=90',
  },
  {
    title: 'Recepción',
    category: 'Áreas comuns',
    src: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200&q=90',
  },
  {
    title: 'Sala de Estar',
    category: 'Áreas comuns',
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=90',
  },
  {
    title: 'Habitación Deluxe',
    category: 'Habitaciones',
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=90',
  },
  {
    title: 'Comedor',
    category: 'Restaurante',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90',
  },
  {
    title: 'Vista desde Terraza',
    category: 'Exterior',
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=90',
  },
  {
    title: 'Baño Privado',
    category: 'Habitaciones',
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=90',
  },
  {
    title: 'Escalera Colonial',
    category: 'Arquitectura',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90',
  },
  {
    title: 'Suite',
    category: 'Habitaciones',
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=90',
  },
  {
    title: 'Patio Interior',
    category: 'Exterior',
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
  },
  {
    title: 'Pasillo',
    category: 'Arquitectura',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
  },
  {
    title: 'Cusco atardecer',
    category: 'Ciudad',
    src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=90',
  },
];

export default function GalleryListSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const visibleImages = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, galleryImages.length)
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative mb-4 bg-primary/10 elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer break-inside-avoid aspect-square"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-white/70">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 border border-primary-dark text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-white transition-colors flex items-center gap-2"
            >
              <span>Ver más fotos</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={galleryImages.map((img) => ({
          src: img.src,
          title: img.title,
        }))}
      />
    </section>
  );
}
