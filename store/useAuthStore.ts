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
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: null,
//   setAccessToken: (accessToken) => set({ accessToken }),
// }));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expirationTimestamp: null,
      setAuthData: (accessToken, expirationTimestamp) =>
        set(() => ({ accessToken, expirationTimestamp })),
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true);
      },
    }
  )
);
