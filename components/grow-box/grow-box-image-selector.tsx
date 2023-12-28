import React from 'react';

import { useEditDevice } from 'services/device/mutations';
import { BackendDevice } from 'schemas/devices';
import { DEFAULT_IMAGES } from 'constants/default-images';

import { ImageSelector } from '../image-selector';

interface GrowBoxImageSelectorProps {
  device: BackendDevice;
}

export const GrowBoxImageSelector = ({ device }: GrowBoxImageSelectorProps) => {
  const { id, name, image_url } = device;
  const { mutate: editDevice } = useEditDevice();
  const [selectedImage, setSelectedImage] = React.useState<string>(
    image_url ?? ''
  );

  const handleOnChange = (image: string): void => {
    setSelectedImage(image);
    editDevice({
      formDevice: { image, name },
      deviceId: id,
    });
  };

  return (
    <ImageSelector
      value={selectedImage}
      onChange={handleOnChange}
      defaultImage={DEFAULT_IMAGES.device}
    />
  );
};
