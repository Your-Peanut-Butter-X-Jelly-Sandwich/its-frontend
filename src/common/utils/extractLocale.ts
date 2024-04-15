import SUPPORTED_LANGUAGES from '@/constants/supportedLang';

const getLocale = (pathname: string) => {
  return (pathname.match(`${SUPPORTED_LANGUAGES.join('|')}`) as RegExpMatchArray)[0];
};

export default getLocale;
