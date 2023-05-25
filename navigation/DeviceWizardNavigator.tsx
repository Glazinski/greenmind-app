import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { DeviceStep1 } from 'screens/device-wizard/DeviceStep1';
import { DeviceStep2 } from 'screens/device-wizard/DeviceStep2';
import { DeviceWizardStackParamList } from 'navigation/types';

const DeviceWizardStack = createStackNavigator<DeviceWizardStackParamList>();

export const DeviceWizardNavigator = () => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <DeviceWizardStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: background,
        },
        headerLeft: (props) => <IconButton icon="arrow-left" {...props} />,
      }}
    >
      <DeviceWizardStack.Screen name="DeviceStep1" component={DeviceStep1} />
      <DeviceWizardStack.Screen name="DeviceStep2" component={DeviceStep2} />
    </DeviceWizardStack.Navigator>
  );
};
