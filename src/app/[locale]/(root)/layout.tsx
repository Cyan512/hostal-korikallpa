import MainLayout from '@/src/components/templates/main-layout';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <MainLayout>{children}</MainLayout>;
}
