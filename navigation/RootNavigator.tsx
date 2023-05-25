import { createStackNavigator } from '@react-navigation/stack';
import { Text, useTheme } from 'react-native-paper';

import { useDevices } from 'services/device/queries';
import { RootStackParamList } from 'navigation/types';

import { DrawerNavigator } from './DrawerNavigator';
import { PlantWizardNavigator } from './PlantWizardNavigator';
import { DeviceWizardNavigator } from './DeviceWizardNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { data: devices, isLoading } = useDevices();
  const {
    colors: { background },
  } = useTheme();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Stack.Screen name="Index" component={DrawerNavigator} />
      <Stack.Screen name="PlantWizard" component={PlantWizardNavigator} />
      <Stack.Screen name="DeviceWizard" component={DeviceWizardNavigator} />
    </Stack.Navigator>
  );
};
