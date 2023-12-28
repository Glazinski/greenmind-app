import { ImageSourcePropType } from 'react-native';

import { replaceLocalhostToIP } from 'api';

export const getImageUrl = (
  imageUrl: string | null | undefined,
  defaultImage: ImageSourcePropType
) =>
  typeof imageUrl === 'string'
    ? { uri: replaceLocalhostToIP(imageUrl) }
    : defaultImage;
