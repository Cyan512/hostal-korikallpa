import { ReactNode } from 'react';
import Header from '@/src/components/organisms/header';
import Footer from '@/src/components/organisms/footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main className="flex-1 pt-20">
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
