import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { HomeScreen } from 'screens/home-screen';
import { AccountScreen } from 'screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
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
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => {
          return <Icon name="account" size={size} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);
