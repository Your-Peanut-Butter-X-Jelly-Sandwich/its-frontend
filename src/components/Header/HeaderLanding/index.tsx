import React from 'react';
import { usePathname } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
const HeaderLanding: React.FC = () => {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const t = useTranslations('Landing.Header');
  return (
    <div className="bg-black h-20 px-10 text-white">
      <div className="flex justify-between h-full">
        <div className="flex flex-col justify-center">
          <div className="text-xl">{t('its')}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center gap-10 font-semibold text-lg">
            <div className="text-center cursor-pointer hover:text-xl duration-150">
              <Link
                href={{
                  pathname: `/${locale}/auth`,
                  query: { action: 'login' },
                }}
              >
                {t('login')}
              </Link>
            </div>
            <div className="text-center cursor-pointer hover:text-xl duration-150">
              <Link
                href={{
                  pathname: `/${locale}/auth`,
                  query: { action: 'signup' },
                }}
              >
                {t('signup')}
              </Link>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;
