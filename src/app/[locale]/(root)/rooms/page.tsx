import RoomsPageContent from '@/src/components/pages/rooms/rooms-page-content';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function rooms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('HomePage');

  return (
    <>
      <RoomsPageContent />
    </>
  );
}
