import { z } from 'zod';

const PlantStatus = z.enum(['public', 'private', 'assigned']);

export const PlantBasicInfoSchema = z.object({
  image: z.string(),
  status: PlantStatus,
  name: z.string().nonempty(),
  appearance: z.string(),
});

const MinMaxSchema = z
  .string()
  .nonempty({ message: 'Must not be empty' })
  .refine((value) => !isNaN(parseFloat(value)), {
    message: 'Must be a number',
  });

export const PlantBasicInfoInputsSchema = z.object({
  image: z.string(),
  status: PlantStatus,
  name: z.string().nonempty(),
  appearance: z.string(),
});

export const PlantIdealConditionsInputsSchema = z.object({
  light_min: MinMaxSchema,
  light_max: MinMaxSchema,
  temp_min: MinMaxSchema,
  temp_max: MinMaxSchema,
  air_humidity_min: MinMaxSchema,
  air_humidity_max: MinMaxSchema,
  soil_humidity_min: MinMaxSchema,
  soil_humidity_max: MinMaxSchema,
});

export const PlantOtherInfoInputsSchema = z.object({
  fertilizing: z.string(),
  repotting: z.string(),
  pruning: z.string(),
  common_diseases: z.string(),
  blooming_time: z.string(),
});

export const PlantCompleteInfoInputsSchema = PlantBasicInfoInputsSchema.extend(
  PlantIdealConditionsInputsSchema.shape
).extend(PlantOtherInfoInputsSchema.shape);

const BackendPlantSchema = z
  .object({
    id: z.number(),
    status: PlantStatus,
    attached_image_url: z.string(),
    image_url: z.string(),
    name: z.string(),
    appearance: z.string(),
    light_min: z.number(),
    light_max: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    air_humidity_min: z.number(),
    air_humidity_max: z.number(),
    soil_humidity_min: z.number(),
    soil_humidity_max: z.number(),
    user_id: z.string(),
    device_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .extend(PlantOtherInfoInputsSchema.shape);

export type PlantBasicInfoInputs = z.infer<typeof PlantBasicInfoInputsSchema>;
export type PlantIdealConditionsInputs = z.infer<
  typeof PlantIdealConditionsInputsSchema
>;
export type PlantOtherInfoInputs = z.infer<typeof PlantOtherInfoInputsSchema>;
export type PlantFormStepData =
  | PlantBasicInfoInputs
  | PlantIdealConditionsInputs
  | PlantOtherInfoInputs;
export type PlantCompleteInfoInputs = z.infer<
  typeof PlantCompleteInfoInputsSchema
>;
export type BackendPlant = z.infer<typeof BackendPlantSchema>;
export type PlantStatus = z.infer<typeof PlantStatus>;
