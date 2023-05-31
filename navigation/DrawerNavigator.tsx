import { IconButton, useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from 'screens/HomeScreen';
import { DevicesScreen } from 'screens/DevicesScreen';
import { PlantsScreen } from 'screens/plants/PlantsScreen';
import { SettingsScreen } from 'screens/SettingsScreen';
import { DrawerContent } from 'components/DrawerContent';

import { HomeDrawerParamList } from './types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export const DrawerNavigator = () => {
  const {
    colors: { background },
  } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: background,
        },
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <IconButton icon="menu" onPress={() => navigation.toggleDrawer()} />
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Devices" component={DevicesScreen} />
      <Drawer.Screen name="Plants" component={PlantsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
