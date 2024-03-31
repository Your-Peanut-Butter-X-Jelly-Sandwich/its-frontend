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
    <>
      <HeaderTutor />
      {children}
    </>
  );
}
