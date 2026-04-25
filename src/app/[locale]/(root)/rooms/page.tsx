import { getContentPage } from '@/src/api/strapi/get-content-page';
import { Metadata } from 'next';
import RoomList from '@/src/components/pages/rooms/room-list';
import SharedHeroSection from '@/src/components/pages/shared-hero-section';
import { RoomBlocks, RoomContent } from '@/src/types/pages/rooms-page.entity';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Habitaciones | Qorikallpa Hotel Boutique Cusco',
  description:
    'Nuestras habitaciones: simples, dobles, matrimoniales y familiares. Arquitectura colonial cusqueña con comodidades modernas.',
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'fr' }];
}

function renderComponent(component: RoomBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SharedHeroSection key={key} />;
    case 'room.room-list':
      return <RoomList key={key} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const endpoint = 'room-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getContentPage<RoomContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: RoomBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
