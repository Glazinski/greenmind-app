import { PlantFormData } from 'schemas/plants';

import { createImageToUpload } from '../createImageToUpload';

export const convertPlantToFormData = (
  plant: PlantFormData,
  deviceId?: number | null
) => {
  const newPlant = new FormData();
  Object.keys(plant).forEach((key) => {
    if (key !== 'image') {
      newPlant.append(
        `plant[${key}]`,
        plant[key as keyof PlantFormData].toString()
      );
    }
  });

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
