import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './storage';

export type ColorScheme = 'light' | 'dark' | 'system';

interface ColorSchemeState {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

export const useColorSchemeStore = create<ColorSchemeState>()(
  persist(
    (set) => ({
      colorScheme: 'light',
      setColorScheme: (colorScheme) => set({ colorScheme }),
    }),
    {
      name: 'color-scheme-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
