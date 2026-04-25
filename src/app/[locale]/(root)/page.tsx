import { getContentPage } from '@/src/api/strapi/get-content-page';
import { Metadata } from 'next';
import HomeAboutSection from '@/src/components/pages/home/home-about-section';
import HomeFeaturedRoomsSectionV2 from '@/src/components/pages/home/home-featured-rooms-section-v2';
import HomeHeroSection from '@/src/components/pages/home/home-hero-section';
import HomeServicesSectionV2 from '@/src/components/pages/home/home-services-section-v2';
import {
  HomeBlocks,
  HomeContent,
  HomeRoomsEntity,
  HomeServicesEntity,
} from '@/src/types/pages/home-page.entity';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Qorikallpa Hotel Boutique Cusco',
  description:
    'El espíritu andino hecho descanso. Hotel boutique en Cusco con arquitectura colonial cusqueña y comodidades modernas.',
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'fr' }];
}

function renderComponent(component: HomeBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <HomeHeroSection key={key} />;
    case 'shared.section-about':
      return <HomeAboutSection key={key} />;
    case 'home.home-rooms':
      return (
        <HomeFeaturedRoomsSectionV2
          key={key}
          data={component as HomeRoomsEntity}
        />
      );
    case 'home.home-services':
      return (
        <HomeServicesSectionV2
          key={key}
          data={component as HomeServicesEntity}
        />
      );
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const endpoint = 'home-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getContentPage<HomeContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: HomeBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
