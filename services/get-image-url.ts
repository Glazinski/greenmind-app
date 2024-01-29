import type { ImageURISource } from 'react-native';
import Constants from 'expo-constants';

import { isDev } from 'lib/expo/isDev';

export const getImageUrl = (
  imageUrl: string | null | undefined,
  defaultImage: ImageURISource
): ImageURISource => {
  const uri = imageUrl ?? defaultImage.uri ?? undefined;

  return {
    uri: isDev()
      ? uri?.replace('localhost', Constants.expoConfig?.extra?.ipAddress)
      : uri,
  };
};
