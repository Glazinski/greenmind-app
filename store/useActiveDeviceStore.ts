import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActiveDeviceState {
  deviceId: number;
  deviceName: string;
  setDeviceId: (deviceId: number) => void;
  setDeviceName: (deviceName: string) => void;
}

export const useActiveDeviceStore = create<ActiveDeviceState>()(
  persist(
    (set) => ({
      deviceId: -1,
      deviceName: '',
      setDeviceId: (deviceId) => set(() => ({ deviceId })),
      setDeviceName: (deviceName) => set(() => ({ deviceName })),
    }),
    {
      name: 'device-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
