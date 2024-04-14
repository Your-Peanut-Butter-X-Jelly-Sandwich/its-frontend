import type { Metadata } from 'next';
import HeaderTutor from '@/components/Header/HeaderTutor';
export const metadata: Metadata = {
  title: 'ITS Tutors',
  description: 'ITS Tutors',
};

export default function TutorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen max-h-screen flex flex-col">
      <HeaderTutor />
      <div className="flex-1 min-h-0 max-h-full">{children}</div>
    </div>
  );
}
