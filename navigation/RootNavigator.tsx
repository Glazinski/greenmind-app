import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddPlant } from 'screens/AddPlant';
import { EditPlant } from 'screens/EditPlant';

import { DrawerNavigator } from './DrawerNavigator';

type RootStackParamList = {
  Index: undefined;
  AddPlant: undefined;
  EditPlant: { plantId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Index" component={DrawerNavigator} />
    <Stack.Screen name="AddPlant" component={AddPlant} />
    <Stack.Screen name="EditPlant" component={EditPlant} />
  </Stack.Navigator>
);
