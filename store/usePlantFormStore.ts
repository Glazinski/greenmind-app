import { create } from 'zustand';

import { StepFormData } from 'schemas/plants';

interface PlantFormState {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  steps: Record<string, StepFormData>;
  setSteps: (step: string | number, formData: StepFormData) => void;
  resetStepsData: () => void;
}

const MAX_STEP = 2;
const MIN_STEP = 0;
const DEFAULT_STEPS = {
  '0': {
    image: '',
    name: '',
    appearance: '',
  },
  '1': {
    light_min: '',
    light_max: '',
    temp_min: '',
    temp_max: '',
    air_humidity_min: '',
    air_humidity_max: '',
    soil_humidity_min: '',
    soil_humidity_max: '',
  },
  '2': {
    blooming_time: '',
    pruning: '',
    common_diseases: '',
    repotting: '',
    fertilizing: '',
  },
};

export const usePlantFormStore = create<PlantFormState>((set) => ({
  activeStep: MIN_STEP,
  steps: DEFAULT_STEPS,
  setSteps: (step, formData) =>
    set((state) => ({
      steps: {
        ...state.steps,
        [step]: {
          ...state.steps[step],
          ...formData,
        },
      },
    })),
  nextStep: () =>
    set(({ activeStep }) => ({
      activeStep: Math.min(activeStep + 1, MAX_STEP),
    })),
  prevStep: () =>
    set(({ activeStep }) => ({
      activeStep: Math.max(activeStep - 1, MIN_STEP),
    })),
  resetSteps: () => set({ activeStep: MIN_STEP }),
  resetStepsData: () => set({ steps: DEFAULT_STEPS }),
}));
