import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { useLanguageStore } from 'store/use-language-store';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'pl',
  debug: true,
  lng: useLanguageStore.getState().language,
  resources: {
    en: {
      translation: require('../../locales/en/translation.json'),
    },
    pl: {
      translation: require('../../locales/pl/translation.json'),
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
