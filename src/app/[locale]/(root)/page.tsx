import { getContentPage } from '@/src/api/strapi/get-content-page';
import HomeAboutSection from '@/src/components/pages/home/home-about-section';
import HomeFeaturedRoomsSection from '@/src/components/pages/home/home-featured-rooms-section';
import HomeHeroSection from '@/src/components/pages/home/home-hero-section';
import HomeServicesSection from '@/src/components/pages/home/home-services-section';
import { HomeBlocks, HomeContent } from '@/src/types/pages/home-page.entity';
import { setRequestLocale } from 'next-intl/server';

function renderComponent(component: HomeBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <HomeHeroSection key={key} />;
    case 'shared.section-about':
      return <HomeAboutSection key={key} />;
    case 'home.home-rooms':
      return <HomeFeaturedRoomsSection key={key} />;
    case 'home.home-services':
      return <HomeServicesSection key={key} />;
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
