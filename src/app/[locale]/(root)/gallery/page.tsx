import GalleryListSection from '@/src/components/pages/gallery/gallery-list-section';
import SharedHeroSection from '@/src/components/pages/shared-hero-section';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Gallery({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  return (
    <>
      <SharedHeroSection />
      <GalleryListSection />
    </>
  );
}
