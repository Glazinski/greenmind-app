import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  expirationTimestamp: number | null;
  setAuthData: (
    accessToken: string | null,
    expirationTimestamp: number | null
  ) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expirationTimestamp: null,
      setAuthData: (accessToken, expirationTimestamp) =>
        set(() => ({ accessToken, expirationTimestamp })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
