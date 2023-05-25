import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from 'screens/auth/SignIn';
import { SignUp } from 'screens/auth/SignUp';

import { UnauthenticatedRootStackScreenProps } from './types';

const AuthStack = createStackNavigator<UnauthenticatedRootStackScreenProps>();

export const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);
