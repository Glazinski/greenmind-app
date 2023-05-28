import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  expirationTimestamp: number | null;
  email: string | null;
  setAuthData: (
    accessToken: string | null,
    expirationTimestamp: number | null,
    email: string | null
  ) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expirationTimestamp: null,
      email: null,
      setAuthData: (accessToken, expirationTimestamp, email) =>
        set({ accessToken, expirationTimestamp, email }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
