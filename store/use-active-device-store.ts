import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './storage';

interface ActiveDeviceState {
  deviceId: number | null;
  deviceUUID: string | null;
  setDeviceId: (deviceId: number | null) => void;
  setDeviceUUID: (deviceUUID: string | null) => void;
}

export const useActiveDeviceStore = create<ActiveDeviceState>()(
  persist(
    (set) => ({
      deviceId: null,
      deviceUUID: null,
      setDeviceId: (deviceId) => set({ deviceId }),
      setDeviceUUID: (deviceUUID) => set({ deviceUUID }),
    }),
    {
      name: 'active-device-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
