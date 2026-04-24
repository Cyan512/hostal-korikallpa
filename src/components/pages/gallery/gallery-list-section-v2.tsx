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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative mb-4 bg-primary/10 rounded-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
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
