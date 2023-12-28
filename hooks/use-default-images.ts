import { ImageURISource } from 'react-native';
import { useAssets } from 'expo-asset';
import type { Asset } from 'expo-asset';

export function useDefaultImages() {
  const [assets, error] = useAssets([
    require('../assets/images/default-plant.jpg'),
    require('../assets/images/default-device.jpg'),
  ]);

  function getDefaultImage(asset: Asset | undefined): ImageURISource {
    if (error) {
      throw new Error('Error while loading assets', error);
    }

    return {
      uri: asset?.localUri ?? undefined,
    };
  }

  return {
    assets,
    error,
    plantURISource: getDefaultImage(assets?.[0]),
    deviceURISource: getDefaultImage(assets?.[1]),
  };
}
