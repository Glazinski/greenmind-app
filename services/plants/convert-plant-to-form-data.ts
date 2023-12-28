import { PlantCompleteInfoInputs } from 'schemas/plants';

import { createImageToUpload } from '../create-image-to-upload';

export const convertPlantToFormData = (
  plant: PlantCompleteInfoInputs,
  deviceId?: number | null
) => {
  const newPlant = new FormData();
  Object.keys(plant).forEach((key) => {
    if (key !== 'image') {
      newPlant.append(
        `plant[${key}]`,
        plant[key as keyof PlantCompleteInfoInputs].toString()
      );
    }
  });

  console.log('convertPlantToFormData', plant.image);
  // TODO: Implement for image_url
  if (plant?.image?.length > 0) {
    if (plant.image.includes('file://')) {
      newPlant.append(
        'plant[image]',
        createImageToUpload(plant?.image) as unknown as string
      );
    } else {
      newPlant.append('plant[image_url]', plant?.image);
    }
  }

  if (typeof deviceId === 'number') {
    newPlant.append('plant[device_id]', deviceId.toString());
  }

  return newPlant;
};
