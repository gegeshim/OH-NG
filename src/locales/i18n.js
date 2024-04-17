import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langKo from './lang.ko.json';
import langEn from './lang.en.json';

i18n.use(initReactI18next).init({
  resources: {
    'ko-KR': { translation: langKo },
    'en-US': { translation: langEn },
  },
  lng: 'ko-KR', // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
  fallbackLng: { 'en-US': ['en-US'], default: ['ko-KR'] }, // 번역 파일에서 찾을 수 없는 경우 기본 언어
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
