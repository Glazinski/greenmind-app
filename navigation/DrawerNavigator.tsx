import {
  Drawer as PaperDrawer,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreen } from 'screens/HomeScreen';
import { DevicesScreen } from 'screens/DevicesScreen';
import { PlantsScreen } from 'screens/PlantsScreen';
import { AccountScreen } from 'screens/AccountScreen';

import { HomeDrawerParamList } from './types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => {
  const {
    colors: { background },
  } = useTheme();
  const currentRouteName = state.routes[state.index].name;
  const insets = useSafeAreaInsets();

  const renderDrawerItem = (name: string, icon: string) => (
    <PaperDrawer.Item
      label={name}
      onPress={() => navigation.navigate(name)}
      active={currentRouteName.includes(name)}
      icon={icon}
    />
  );

  return (
    <PaperDrawer.Section
      style={{
        flex: 1,
        height: '130%',
        paddingTop: insets.top + 20,
        marginBottom: 0,
        backgroundColor: background,
      }}
    >
      {renderDrawerItem('Home', 'home')}
      {renderDrawerItem('Devices', 'devices')}
      {renderDrawerItem('Plants', 'leaf')}
      {renderDrawerItem('Account', 'account')}
    </PaperDrawer.Section>
  );
};

export const DrawerNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <IconButton icon="menu" onPress={() => navigation.toggleDrawer()} />
        ),
      })}
    >
      {/*<Drawer.Screen name="Tabs" component={TabNavigator} />*/}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Devices" component={DevicesScreen} />
      <Drawer.Screen name="Plants" component={PlantsScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};
