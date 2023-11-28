import { replaceLocalhostToIP } from 'api';

export const getImageUrl = (imageUrl: string | null | undefined) =>
  typeof imageUrl === 'string'
    ? { uri: replaceLocalhostToIP(imageUrl) }
    : require('../assets/images/icon.png');
