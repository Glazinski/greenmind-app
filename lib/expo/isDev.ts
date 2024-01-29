import Constants from 'expo-constants';

export const isDev = (): boolean =>
  Constants.expoConfig?.extra?.ipAddress?.length > 0;
