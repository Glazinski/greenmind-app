import React from 'react';
import { DeepPartial, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

import {
  PlantBasicInfoSchema,
  PlantIdealConditionsInputsSchema,
} from 'schemas/plants';
import { usePlantFormStore } from 'store/use-plant-form-store';
import { useWizard } from 'components/wizard-form/use-wizard';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const getPlantSchema = (activeStep: number) => {
  switch (activeStep) {
    case 0:
      return PlantBasicInfoSchema;
    case 1:
      return PlantIdealConditionsInputsSchema;
  }
};

export const usePlantForm = <TFormValues extends FieldValues>() => {
  const { stepsData, setStepData } = usePlantFormStore();
  const { activeStep, prevStep } = useWizard();
  const stepData = stepsData[activeStep];

  const methods = useForm<TFormValues>({
    defaultValues: stepData as unknown as DeepPartial<TFormValues>,
    resolver: zodResolver(getPlantSchema(activeStep) as ZodType),
  });
  const { reset, getValues } = methods;

  React.useEffect(() => {
    reset(stepData as unknown as any);
  }, [stepData, reset]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log('onBackPress', activeStep, getValues());
        if (activeStep !== 0) {
          setStepData(activeStep, getValues() as any);
        }
        prevStep();
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [getValues, activeStep, setStepData, prevStep])
  );

  return methods;
};
