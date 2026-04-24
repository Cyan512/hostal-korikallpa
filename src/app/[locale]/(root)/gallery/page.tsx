import { getContentPage } from '@/src/api/strapi/get-content-page';
import GalleryListSection from '@/src/components/pages/gallery/gallery-list-section';
import SharedHeroSection from '@/src/components/pages/shared-hero-section';
import {
  GalleryBlocks,
  GalleryContent,
  GalleryListEntity,
} from '@/src/types/pages/gallery-page.entity';
import { setRequestLocale } from 'next-intl/server';

function renderComponent(component: GalleryBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SharedHeroSection key={key} />;
    case 'gallery.gallery-list':
      return (
        <GalleryListSection key={key} data={component as GalleryListEntity} />
      );
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const endpoint = 'gallery-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getContentPage<GalleryContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: GalleryBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
