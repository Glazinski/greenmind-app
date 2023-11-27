import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { DevicePairingScreen } from 'screens/device-wizard/device-pairing-screen';
import { DeviceStep2 } from 'screens/device-wizard/device-step-2';
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
      <DeviceWizardStack.Screen
        name="DevicePairing"
        component={DevicePairingScreen}
      />
      <DeviceWizardStack.Screen name="DeviceStep2" component={DeviceStep2} />
    </DeviceWizardStack.Navigator>
  );
};
