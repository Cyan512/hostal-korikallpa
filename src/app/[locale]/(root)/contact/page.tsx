import { getContentPage } from '@/src/api/strapi/get-content-page';
import { Metadata } from 'next';
import ContactContactSection from '@/src/components/pages/contact/contact-contact-section';
import SharedHeroSection from '@/src/components/pages/shared-hero-section';
import {
  ContactBlocks,
  ContactContent,
} from '@/src/types/pages/contact-page.entity';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Contacto | Qorikallpa Hotel Boutique Cusco',
  description: 'Contáctanos para reservas y consultas.otel boutique en Cusco.',
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'fr' }];
}

function renderComponent(component: ContactBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SharedHeroSection key={key} />;
    case 'contact.contact-info':
      return <ContactContactSection key={key} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const endpoint = 'contact-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getContentPage<ContactContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: ContactBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
