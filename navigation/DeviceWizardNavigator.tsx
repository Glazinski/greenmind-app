import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DeviceStep1 } from 'screens/device-wizard/DeviceStep1';
import { DeviceStep2 } from 'screens/device-wizard/DeviceStep2';

export type DeviceWizardStackParamList = {
  DeviceStep1: undefined;
  DeviceStep2: undefined;
};

const DeviceWizardStack =
  createNativeStackNavigator<DeviceWizardStackParamList>();

export const DeviceWizardNavigator = () => {
  return (
    <DeviceWizardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DeviceWizardStack.Screen name="DeviceStep1" component={DeviceStep1} />
      <DeviceWizardStack.Screen name="DeviceStep2" component={DeviceStep2} />
    </DeviceWizardStack.Navigator>
  );
};
