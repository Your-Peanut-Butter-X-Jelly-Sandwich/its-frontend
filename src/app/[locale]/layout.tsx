import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import AuthGuard from '@/common/HOCs/AuthGuard';
import IdentityGuard from '@/common/HOCs/IdentityGuard';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ITS',
  description: 'ITS System',
};

function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StoreProvider>
          <AuthGuard>
            <IdentityGuard>
              <div className="h-screen max-h-screen bg-gray-100 ">{children}</div>
            </IdentityGuard>
          </AuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
