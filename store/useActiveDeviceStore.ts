import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActiveDeviceState {
  deviceId: number;
  setDeviceId: (deviceId: number) => void;
}

export const useActiveDeviceStore = create<ActiveDeviceState>()(
  persist(
    (set) => ({
      deviceId: -1,
      setDeviceId: (deviceId) => set(() => ({ deviceId })),
    }),
    {
      name: 'device-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
