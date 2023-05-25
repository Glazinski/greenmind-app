import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen } from 'screens/auth/SignInScreen';
import { SignUpScreen } from 'screens/auth/SignUpScreen';

import { UnauthenticatedRootStackParamList } from './types';

const AuthStack = createStackNavigator<UnauthenticatedRootStackParamList>();

export const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);
