'use client';
import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Select } from 'antd';
import { SUPPORTED_LANGUAGE_OPTIONS } from '@/constants/supportedLang';
import { useLocale } from 'next-intl';
const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const locale = useLocale();
  const handleChangeLang = (value: string) => {
    startTransition(() => {
      const newPath = pathname.replace(params.locale as string, value);
      router.replace(newPath);
    });
  };
  return (
    <div>
      <Select
        defaultValue={locale}
        style={{ width: 180 }}
        onChange={handleChangeLang}
        options={SUPPORTED_LANGUAGE_OPTIONS}
        disabled={isPending}
      />
    </div>
  );
};
export default LanguageSelector;
