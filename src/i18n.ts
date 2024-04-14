import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import SUPPORTED_LANGUAGES from './constants/supportedLang';

// Can be imported from a shared config
const locales = SUPPORTED_LANGUAGES;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
