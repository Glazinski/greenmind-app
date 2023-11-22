import { IconButton, useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from 'screens/home-screen';
import { DevicesScreen } from 'screens/devices-screen';
import { PlantsScreen } from 'screens/plants/plants-screen';
import { SettingsScreen } from 'screens/settings-screen';
import { DrawerContent } from 'components/drawer-content';

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
