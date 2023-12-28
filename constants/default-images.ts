import { ImageSourcePropType } from 'react-native';

interface DefaultImages {
  plant: ImageSourcePropType;
  device: ImageSourcePropType;
}

export const DEFAULT_IMAGES: DefaultImages = {
  plant: require('../assets/images/default-plant.jpg'),
  device: require('../assets/images/default-device.jpg'),
};
