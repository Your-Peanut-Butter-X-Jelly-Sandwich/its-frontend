import type { Metadata } from 'next';
import HeaderStudent from '@/components/Header/HeaderStudent';
import { Layout } from 'antd';
export const metadata: Metadata = {
  title: 'ITS Students',
  description: 'ITS Students',
};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen max-h-screen flex flex-col">
      <HeaderStudent />
      <div className="flex-1 min-h-0 max-h-full">{children}</div>
    </div>
  );
}
