import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActivePlantState {
  plantId: number | null;
  setPlantId: (plantId: number | null) => void;
}

export const useActivePlantStore = create<ActivePlantState>()(
  persist(
    (set) => ({
      plantId: null,
      setPlantId: (plantId) => set({ plantId }),
    }),
    {
      name: 'active-plant-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
