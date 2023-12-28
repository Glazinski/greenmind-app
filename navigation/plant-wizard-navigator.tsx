import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { PlantBasicInfoScreen } from 'screens/plant-wizard/plant-basic-info-screen';
import { PlantIdealConditionsScreen } from 'screens/plant-wizard/plant-ideal-conditions-screen';

import { PlantWizardStackParamList } from './types';
import { WizardContainer } from 'components/wizard-form/wizard-container';
import { usePlantFormStore } from 'store/use-plant-form-store';
import { PlantOtherInfoScreen } from 'screens/plant-wizard/plant-other-info-screen';
import { useWizard } from 'components/wizard-form/use-wizard';

const PlantWizardStack = createStackNavigator<PlantWizardStackParamList>();

const PlantWizard = () => {
  const {
    colors: { background },
  } = useTheme();
  const { prevStep } = useWizard();
  const resetStepsData = usePlantFormStore((state) => state.resetStepsData);

  React.useEffect(() => {
    return () => {
      resetStepsData();
    };
  }, [resetStepsData]);

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
            {...props}
            icon="arrow-left"
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

export const PlantWizardNavigator = () => {
  return (
    <WizardContainer stepCount={3}>
      <PlantWizard />
    </WizardContainer>
  );
};
