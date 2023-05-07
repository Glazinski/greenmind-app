import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DeviceState {
  deviceId: string;
  deviceName: string;
  setDeviceId: (deviceId: string) => void;
  setDeviceName: (deviceName: string) => void;
}

export const useActiveDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      deviceId: '',
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
