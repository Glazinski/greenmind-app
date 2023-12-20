import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { i18n } from 'i18next';

import { zustandStorage } from './storage';

interface LanguageState {
  language: 'en' | 'pl';
  setLanguage: (lang: 'en' | 'pl', i18nInstance: i18n) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, getState) => ({
      language: 'pl',
      setLanguage: async (lang: 'en' | 'pl', i18nInstance: i18n) => {
        const state = getState();
        if (lang !== state.language && i18nInstance) {
          await i18nInstance.changeLanguage(lang);
          set({ language: lang });
        }
      },
    }),
    {
      name: 'language-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
