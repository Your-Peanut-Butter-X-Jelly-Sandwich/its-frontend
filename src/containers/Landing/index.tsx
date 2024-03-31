'use client';
import React from 'react';
import HeaderLanding from '@/components/Header/HeaderLanding';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/redux';
import type { RootState } from '@/redux';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';
const LandingContainer: React.FC = () => {
  const t = useTranslations('Landing');
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      if (user.is_manager) {
        router.push(`\\${locale}\\manager`);
      } else if (user.is_tutor) {
        router.push(`\\${locale}\\tutor`);
      } else {
        router.push(`\\${locale}\\student`);
      }
    }
  });
  return (
    <div className="h-screen flex flex-col">
      <HeaderLanding />
      <div className="h-full text-4xl font-bold flex justify-center">
        <div className="flex flex-col justify-center">
          <div>
            <strong>{t('title')}</strong> !
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
