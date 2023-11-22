import { FormDevice } from 'schemas/devices';

import { createImageToUpload } from '../create-image-to-upload';

export const convertDeviceToFormData = (formDevice: Partial<FormDevice>) => {
  const deviceFormData = new FormData();

  if (formDevice?.name) {
    deviceFormData.append('device[name]', formDevice?.name);
  }

  if (
    formDevice.image &&
    formDevice.image?.length > 0 &&
    formDevice.image?.includes('file://')
  ) {
    deviceFormData.append(
      'device[image]',
      createImageToUpload(formDevice.image) as unknown as string
    );
  }

  return deviceFormData;
};
