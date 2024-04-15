import createMiddleware from 'next-intl/middleware';
import SUPPORTED_LANGUAGES from './constants/supportedLang';
export default createMiddleware({
  // A list of all locales that are supported
  locales: SUPPORTED_LANGUAGES,

  // Used when no locale matches
  defaultLocale: 'en',
});
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|cz|de|kr|id)/:path*'],
};
