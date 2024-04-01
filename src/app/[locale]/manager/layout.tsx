import type { Metadata } from 'next';
import HeaderManager from '@/components/Header/HeaderManager';
export const metadata: Metadata = {
  title: 'ITS Manager',
  description: 'ITS Managers',
};

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderManager />
      {children}
    </>
  );
}
