'use client';

import environment from '@/src/environment';
import { GalleryListEntity } from '@/src/types/pages/gallery-page.entity';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
  data: GalleryListEntity;
}

export default function GalleryListSectionV2({ data }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = data.images.map((image) => ({
    src: `${environment.strapi.apiEndpoint}${image.src.url}`,
    alt: image.alt,
    title: image.alt,
    category: image.category,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6">
          {galleryImages.map((image, index) => {
            // Alternating slight rotations for a natural Polaroid spread feel
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
            const rotation = rotations[index % rotations.length];

            return (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative ${rotation}`}
                style={{ filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))' }}
              >
                {/* Polaroid frame */}
                <div className="bg-white p-3 pb-10">
                  {/* Image area */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-3">
                        <p className="text-xs text-white/80">{image.category}</p>
                      </div>
                    </div>
                  </div>
                  {/* Polaroid caption area */}
                  <div className="pt-2 pb-1 text-center">
                    <p className="font-handwriting text-sm text-gray-600 truncate">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={galleryImages.map((img) => ({
          src: img.src,
          title: img.title,
        }))}
        styles={{
          container: {
            width: '100vw',
            maxWidth: '100%',
          },
        }}
      />
    </section>
  );
}
