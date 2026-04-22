import ContactContactSection from '@/src/components/pages/contact/contact-contact-section';
import SharedHeroSection from '@/src/components/pages/shared-hero-section';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Contact({
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
      <ContactContactSection />
    </>
  );
}
