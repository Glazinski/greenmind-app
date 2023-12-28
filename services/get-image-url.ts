import type { ImageURISource } from 'react-native';

import { replaceLocalhostToIP } from 'api';

export const getImageUrl = (
  imageUrl: string | null | undefined,
  defaultImage: ImageURISource
): ImageURISource => ({
  uri: replaceLocalhostToIP(imageUrl ?? defaultImage.uri ?? undefined),
});
