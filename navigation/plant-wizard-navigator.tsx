import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { PlantBasicInfoScreen } from 'screens/plant-wizard/plant-basic-info-screen';
import { PlantIdealConditionsScreen } from 'screens/plant-wizard/plant-ideal-conditions-screen';
import { PlantOtherInfoScreen } from 'screens/plant-wizard/plant-other-info-screen';
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
      <PlantWizardStack.Screen
        name="PlantBasicInfo"
        component={PlantBasicInfoScreen}
      />
      <PlantWizardStack.Screen
        name="PlantIdealConditions"
        component={PlantIdealConditionsScreen}
      />
      <PlantWizardStack.Screen
        name="PlantOtherInfo"
        component={PlantOtherInfoScreen}
      />
    </PlantWizardStack.Navigator>
  );
};
