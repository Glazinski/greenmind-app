import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { PlantStep1Screen } from 'screens/plant-wizard/plant-step-1-screen';
import { PlantStep2Screen } from 'screens/plant-wizard/plant-step-2-screen';
import { PlantStep3Screen } from 'screens/plant-wizard/plant-step-3-screen';
import { usePlantFormStore } from 'store/use-plant-form-store';

import { PlantWizardStackParamList } from './types';

const PlantWizardStack = createStackNavigator<PlantWizardStackParamList>();

export const PlantWizardNavigator = () => {
  const {
    colors: { background },
  } = useTheme();
  const resetSteps = usePlantFormStore((state) => state.resetSteps);
  const resetStepsData = usePlantFormStore((state) => state.resetStepsData);
  const prevStep = usePlantFormStore((state) => state.prevStep);

  React.useEffect(() => {
    return () => {
      resetSteps();
      resetStepsData();
    };
  }, [resetSteps, resetStepsData]);

  return (
    <PlantWizardStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: background,
        },
        headerLeft: (props) => (
          <IconButton
            icon="arrow-left"
            {...props}
            onPress={() => {
              prevStep();
              props?.onPress?.();
            }}
          />
        ),
      }}
    >
      <PlantWizardStack.Screen name="PlantStep1" component={PlantStep1Screen} />
      <PlantWizardStack.Screen name="PlantStep2" component={PlantStep2Screen} />
      <PlantWizardStack.Screen name="PlantStep3" component={PlantStep3Screen} />
    </PlantWizardStack.Navigator>
  );
};
