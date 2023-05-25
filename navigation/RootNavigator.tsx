import { createStackNavigator } from '@react-navigation/stack';
import { Text, useTheme } from 'react-native-paper';

import { DeviceStep1 } from 'screens/device-wizard/DeviceStep1';
import { DeviceStep2 } from 'screens/device-wizard/DeviceStep2';
import { useDevices } from 'services/device/queries';
import { RootStackParamList } from 'navigation/types';

import { DrawerNavigator } from './DrawerNavigator';
import { PlantWizardNavigator } from './PlantWizardNavigator';

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
      {devices && devices?.length > 0 ? (
        <>
          <Stack.Screen name="Index" component={DrawerNavigator} />
          <Stack.Screen name="PlantWizard" component={PlantWizardNavigator} />
          <Stack.Group screenOptions={{ headerShown: true }}>
            <Stack.Screen name="DeviceStep1" component={DeviceStep1} />
            <Stack.Screen name="DeviceStep2" component={DeviceStep2} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="DeviceStep1" component={DeviceStep1} />
            <Stack.Screen
              name="DeviceStep2"
              component={DeviceStep2}
              options={{ headerShown: true }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};
