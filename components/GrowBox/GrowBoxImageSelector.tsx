import React from 'react';

import { useEditDevice } from 'services/device/mutations';
import { BackendDevice } from 'schemas/devices';

import { ImageSelector } from '../ImageSelector';

interface GrowBoxImageSelectorProps {
  device: BackendDevice;
}

export const GrowBoxImageSelector = ({ device }: GrowBoxImageSelectorProps) => {
  const { id, name, image_url } = device;
  const { mutate: editDevice } = useEditDevice();
  const [selectedImage, setSelectedImage] = React.useState<string>(
    image_url ?? ''
  );

  const handleOnChange = async (image: string) => {
    setSelectedImage(image);
    await editDevice({
      formDevice: { image, name },
      deviceId: id,
    });
  };

  return <ImageSelector value={selectedImage} onChange={handleOnChange} />;
};
