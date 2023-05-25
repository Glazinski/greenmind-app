import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type UnauthenticatedRootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type UnauthenticatedRootStackScreenProps<
  T extends keyof UnauthenticatedRootStackParamList
> = StackScreenProps<UnauthenticatedRootStackParamList, T>;

export type RootStackParamList = {
  Index: NavigatorScreenParams<HomeDrawerParamList>;
  PlantWizard: NavigatorScreenParams<PlantWizardStackParamList>;
  DeviceWizard: NavigatorScreenParams<DeviceWizardStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeDrawerParamList = {
  Home: undefined;
  Devices: undefined;
  Plants: undefined;
  Account: undefined;
};

export type HomeDrawerScreenProps<T extends keyof HomeDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

type PlantStepParams = {
  type: 'add' | 'edit';
  plantId?: number;
};

export type PlantWizardStackParamList = {
  PlantStep1: PlantStepParams;
  PlantStep2: PlantStepParams;
  PlantStep3: PlantStepParams;
};

export type PlantWizardStackScreenProps<
  T extends keyof PlantWizardStackParamList
> = CompositeScreenProps<
  StackScreenProps<PlantWizardStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type DeviceWizardStackParamList = {
  DeviceStep1: undefined;
  DeviceStep2: undefined;
};

export type DeviceWizardStackScreenProps<
  T extends keyof DeviceWizardStackParamList
> = CompositeScreenProps<
  StackScreenProps<DeviceWizardStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
