import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  BottomNavigation,
  Drawer as PaperDrawer,
  useTheme,
  Text,
} from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { Home } from './screens/Home';
import { Account } from './screens/Account';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) =>
          descriptors[route.key].options.tabBarIcon?.({
            focused,
            color,
            size: 24,
          }) || null
        }
        getLabelText={({ route }) =>
          descriptors[route.key].options.tabBarLabel as string
        }
      />
    )}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="account" size={size} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);

const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => {
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

  const renderDrawerItems = (names: string[]) =>
    names.map((name) => (
      <PaperDrawer.Item
        key={name}
        label={name}
        onPress={() => navigation.navigate(name)}
        active={currentRouteName.includes(name)}
        icon="home"
      />
    ));

  return (
    <>
      <PaperDrawer.Section style={{ marginTop: insets.top + 20 }}>
        {renderDrawerItem('Home', 'home')}
        {renderDrawerItem('Devices', 'devices')}
        {renderDrawerItem('Account', 'account')}
        {renderDrawerItem('Settings', 'cog')}
      </PaperDrawer.Section>
    </>
  );
};

function Settings() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

const DrawerNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      {/*<Drawer.Screen name="Tabs" component={TabNavigator} />*/}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Devices" component={Settings} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export const AuthenticatedApp = () => {
  return <DrawerNavigator />;
};
