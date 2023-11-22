import { BackendPlant, PlantFormData, PlantStatus } from 'schemas/plants';

export const mapBackendPlantToPlantFormData = (
  plant: BackendPlant,
  newStatus?: PlantStatus
): PlantFormData => ({
  image: plant.attached_image_url,
  status: newStatus || plant.status,
  name: plant.name,
  appearance: plant.appearance,
  light_min: plant.light_min.toString(),
  light_max: plant.light_max.toString(),
  temp_min: plant.temp_min.toString(),
  temp_max: plant.temp_max.toString(),
  air_humidity_min: plant.air_humidity_min.toString(),
  air_humidity_max: plant.air_humidity_max.toString(),
  soil_humidity_min: plant.soil_humidity_min.toString(),
  soil_humidity_max: plant.soil_humidity_max.toString(),
  fertilizing: plant.fertilizing,
  repotting: plant.repotting,
  pruning: plant.pruning,
  common_diseases: plant.common_diseases,
  blooming_time: plant.blooming_time,
});
