const galleryImages = [
  { id: 1, title: 'Fachada Principal', category: 'Exterior', size: 'large' },
  { id: 2, title: 'Recepción', category: 'Áreas comuns', size: 'normal' },
  { id: 3, title: 'Sala de Estar', category: 'Áreas comuns', size: 'normal' },
  {
    id: 4,
    title: 'Habitación Deluxe',
    category: 'Habitaciones',
    size: 'normal',
  },
  { id: 5, title: 'Comedor', category: 'Restaurante', size: 'normal' },
  { id: 6, title: 'Vista desde Terraza', category: 'Exterior', size: 'large' },
  { id: 7, title: 'Baño Privado', category: 'Habitaciones', size: 'normal' },
  {
    id: 8,
    title: 'Escalera Colonial',
    category: 'Arquitectura',
    size: 'normal',
  },
  { id: 9, title: 'Suite', category: 'Habitaciones', size: 'normal' },
  { id: 10, title: 'Patio Interior', category: 'Exterior', size: 'normal' },
  { id: 11, title: 'Pasillo', category: 'Arquitectura', size: 'normal' },
  { id: 12, title: 'Cusco atardecer', category: 'Ciudad', size: 'large' },
];

export default function GalleryListSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`group relative bg-primary/10 elegant-border rounded-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                image.size === 'large' ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="aspect-square flex items-center justify-center">
                <span className="font-serif text-5xl text-primary/20">
                  {image.title.charAt(0)}
                </span>
              </div>
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
    </section>
  );
}
