const SUPPORTED_LANGUAGES = ['de', 'cz', 'en', 'es', 'kr', 'id'];
export const SUPPORTED_LANGUAGE_OPTIONS: { value: string; label: string }[] = [
  { value: 'de', label: 'de | Deutsch' },
  { value: 'cz', label: 'cz | 中文' },
  { value: 'en', label: 'en | English' },
  { value: 'es', label: 'es | Español' },
  { value: 'kr', label: 'kr | 한국인' },
  { value: 'id', label: 'id | bahasa Indonesia' },
];

export const WORDCLOUD: { [locale: string]: string } = {
  cz: '欢迎来到智能辅导系统',
  de: 'WILLKOMMEN BEI Intelligentes Nachhilfesystem',
  en: 'WELCOME TO ITS',
  es: 'BIENVENIDO A ITS',
  id: 'Selamat datang di Sistem Bimbingan Belajar Cerdas',
  kr: 'ITS에 환영합니다',
};

export default SUPPORTED_LANGUAGES;
