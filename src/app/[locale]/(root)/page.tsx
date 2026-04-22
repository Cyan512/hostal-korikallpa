import HomeAboutSection from '@/src/components/pages/home/home-about-section';
import HomeFeaturedRoomsSection from '@/src/components/pages/home/home-featured-rooms-section';
import HomeHeroSection from '@/src/components/pages/home/home-hero-section';
import HomeServicesSection from '@/src/components/pages/home/home-services-section';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  return (
    <>
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeFeaturedRoomsSection />
      <HomeServicesSection />
    </>
  );
}
