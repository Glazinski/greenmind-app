import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './storage';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  setAuthData: (accessToken: string | null, userId: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      setAuthData: (accessToken, userId) => set({ accessToken, userId }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
