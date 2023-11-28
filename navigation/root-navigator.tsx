import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, useTheme } from 'react-native-paper';

import { RootStackParamList } from 'navigation/types';
import { PlantScreen } from 'screens/plants/plant-screen';
import { StatsScreen } from 'screens/stats-screen';

import { DrawerNavigator } from './drawer-navigator';
import { PlantWizardNavigator } from './plant-wizard-navigator';
import { DeviceWizardNavigator } from './device-wizard-navigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {
    colors: { background },
  } = useTheme();

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
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: (props) => <IconButton icon="arrow-left" {...props} />,
        }}
        name="Plant"
        component={PlantScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: (props) => <IconButton icon="arrow-left" {...props} />,
        }}
        name="Stats"
        component={StatsScreen}
      />
    </Stack.Navigator>
  );
};
