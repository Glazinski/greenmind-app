import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from 'screens/auth/SignIn';
import { SignUp } from 'screens/auth/SignUp';

export type UnauthenticatedAppParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<UnauthenticatedAppParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      // options={{ headerShown: false }}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
