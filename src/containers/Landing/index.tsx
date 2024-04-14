'use client';
import React from 'react';
import HeaderLanding from '@/components/Header/HeaderLanding';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/redux';
import type { RootState } from '@/redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import SUPPORTED_LANGUAGES from '@/constants/supportedLang';
import { WORDCLOUD } from '@/constants/supportedLang';
import _ from 'lodash';
import { motion } from 'framer-motion';
const LandingContainer: React.FC = () => {
  const t = useTranslations('Landing');
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const locale = useLocale();
  const colors = ['#E66868', '#3EC1D3', '#FFB300', '#1E592F', '#d24014', '#BA066C'];
  const words = SUPPORTED_LANGUAGES.map((lang, index) => {
    const translation = WORDCLOUD[lang];
    const val = lang == locale ? '75px' : `${_.random(20, 50)}px`;
    const translateX = `${_.random(-150, 150)}px`;
    return {
      text: translation,
      fontSize: val,
      translateX: translateX,
      textColor: colors[index],
    };
  });

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
      <div className="h-full font-bold flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="max-w-[1000px]">
            {words.map((word) => {
              return (
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: word.translateX, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div
                    style={{
                      fontSize: word.fontSize,
                      color: word.textColor,
                    }}
                  >
                    {word.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
