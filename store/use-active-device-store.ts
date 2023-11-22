import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from './storage';

interface ActiveDeviceState {
  deviceId: number | null;
  setDeviceId: (deviceId: number | null) => void;
}

export const useActiveDeviceStore = create<ActiveDeviceState>()(
  persist(
    (set) => ({
      deviceId: null,
      setDeviceId: (deviceId) => set({ deviceId }),
    }),
    {
      name: 'active-device-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
