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
    <div className="h-screen max-h-screen flex flex-col">
      <HeaderManager />
      <div className="flex-1 min-h-0 max-h-full">{children}</div>
    </div>
  );
}
