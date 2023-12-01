import { create } from 'zustand';

import {
  PlantBasicInfoInputs,
  PlantIdealConditionsInputs,
  PlantOtherInfoInputs,
} from 'schemas/plants';

interface StepParams {
  plantId: number | undefined;
  type: string | undefined;
}

interface PlantFormStoreState {
  stepsData: [
    PlantBasicInfoInputs,
    PlantIdealConditionsInputs,
    PlantOtherInfoInputs
  ];
  setStepData: (
    index: number,
    stepData:
      | PlantBasicInfoInputs
      | PlantIdealConditionsInputs
      | PlantOtherInfoInputs
  ) => void;
  setStepsData: (
    stepsData: [
      PlantBasicInfoInputs,
      PlantIdealConditionsInputs,
      PlantOtherInfoInputs
    ]
  ) => void;
  resetStepsData: () => void;
  stepParams: StepParams;
  setStepParams: (stepParams: StepParams) => void;
}

const defaultStepsData: [
  PlantBasicInfoInputs,
  PlantIdealConditionsInputs,
  PlantOtherInfoInputs
] = [
  {
    image: '',
    status: 'private',
    name: '',
    appearance: '',
  },
  {
    light_min: '',
    light_max: '',
    temp_min: '',
    temp_max: '',
    air_humidity_min: '',
    air_humidity_max: '',
    soil_humidity_min: '',
    soil_humidity_max: '',
  },
  {
    blooming_time: '',
    pruning: '',
    common_diseases: '',
    repotting: '',
    fertilizing: '',
  },
];

export const usePlantFormStore = create<PlantFormStoreState>((set) => ({
  stepsData: defaultStepsData,
  setStepData: (index, stepData) =>
    set((state) => {
      const newStepsData = [...state.stepsData] as [
        PlantBasicInfoInputs,
        PlantIdealConditionsInputs,
        PlantOtherInfoInputs
      ];

      newStepsData[index] = stepData;

      return { stepsData: newStepsData };
    }),
  setStepsData: (stepsData) => set({ stepsData }),
  resetStepsData: () =>
    set({
      stepsData: defaultStepsData,
    }),
  stepParams: {
    plantId: undefined,
    type: undefined,
  },
  setStepParams: (stepParams) =>
    set({
      stepParams,
    }),
}));
