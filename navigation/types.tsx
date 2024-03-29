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
  Plant: {
    plantId: number;
  };
  Stats: {
    typeOfSensor: 'avg_air_hum' | 'avg_temp' | 'avg_soil_hum' | 'avg_light';
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeDrawerParamList = {
  Home: undefined;
  Devices: undefined;
  Plants?: {
    tab: 'assigned' | 'myOwn' | 'community' | 'favorite';
  };
  Settings: undefined;
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
  PlantBasicInfo: PlantStepParams;
  PlantIdealConditions: undefined;
  PlantOtherInfo: undefined;
};

export type PlantWizardStackScreenProps<
  T extends keyof PlantWizardStackParamList
> = CompositeScreenProps<
  StackScreenProps<PlantWizardStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

type DeviceStepParams = {
  type: 'add' | 'edit';
  deviceId?: number;
};

export type DeviceWizardStackParamList = {
  DevicePairing: DeviceStepParams;
  DeviceForm: DeviceStepParams;
};

export type DeviceWizardStackScreenProps<
  T extends keyof DeviceWizardStackParamList
> = CompositeScreenProps<
  StackScreenProps<DeviceWizardStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
