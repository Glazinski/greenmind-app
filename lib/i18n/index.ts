import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation: require('../../locales/en/translation.json'),
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
