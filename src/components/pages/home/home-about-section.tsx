export default function HomeAboutSection() {
  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      alt: 'Cena elegante',
      rotate: '-rotate-3',
    },
    {
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80',
      alt: 'Brindis',
      rotate: 'rotate-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      alt: 'Paisaje Cusco',
      rotate: '-rotate-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
      alt: 'Ambiente',
      rotate: 'rotate-2',
    },
  ];

  return (
    <section
      className="py-8"
      style={{
        background:
          'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Desktop (lg+): side-by-side ── */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Contact card */}
          <div className="w-64 shrink-0 space-y-4">
            <ContactCard />
          </div>
          {/* Polaroids row */}
          <div className="flex-1 flex items-center justify-between gap-3 py-6">
            {photos.map((photo, i) => (
              <Polaroid key={i} photo={photo} />
            ))}
          </div>
        </div>

        {/* ── Mobile / Tablet (< lg): stacked ── */}
        <div className="flex flex-col gap-8 lg:hidden">
          {/* Contact card — centered on mobile */}
          <div className="max-w-xs mx-auto w-full space-y-4">
            <ContactCard />
          </div>

          {/* Polaroids — 2×2 grid on sm, single row on md */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 py-4">
            {photos.map((photo, i) => (
              <Polaroid key={i} photo={photo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function ContactCard() {
  return (
    <>
      {/* Brand */}
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-800 leading-tight">
          QORI <span className="text-accent">✦</span> KALLPA
        </h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">
          Hostal Boutique · Cusco
        </p>
      </div>

      <div className="w-10 h-px bg-accent" />

      {/* Agent */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white"
          style={{ filter: 'drop-shadow(1px 3px 6px rgba(0,0,0,0.2))' }}
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
            alt="Agente de reservas"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-serif text-sm font-semibold text-stone-800 leading-tight">
            Qori Kallpa
          </p>
          <p className="text-[10px] uppercase tracking-widest text-stone-500">
            Agente de Reservas
          </p>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-1.5 text-xs text-stone-700">
        <p>
          <span className="font-semibold text-accent mr-1">C.</span>+ 51 084 123
          456
        </p>
        <p className="leading-relaxed">
          Portal de las Carnes #236, 1° piso,
          <br />
          Plaza de Armas, Cusco – Perú.
        </p>
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-widest font-bold text-stone-600 mb-0.5">
            Visita nuestra web
          </p>
          <a
            href="https://www.qorikalpa.com"
            className="text-accent font-medium hover:underline"
          >
            www.qorikalpa.com
          </a>
        </div>
      </div>
    </>
  );
}

interface PhotoItem {
  src: string;
  alt: string;
  rotate: string;
}

function Polaroid({ photo }: { photo: PhotoItem }) {
  return (
    <div
      className={`flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative ${photo.rotate}`}
      style={{ filter: 'drop-shadow(3px 6px 12px rgba(0,0,0,0.25))' }}
    >
      <div
        className="p-2 pb-0"
        style={{
          background:
            'linear-gradient(160deg, #faf6ee 0%, #f0ead8 50%, #e8dfc8 100%)',
        }}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="py-2 px-1 text-center">
          <p className="font-serif text-[11px] text-stone-600 truncate">
            {photo.alt}
          </p>
        </div>
      </div>
    </div>
  );
}
