import { z } from 'zod';

const plantStatus = z.enum(['public', 'private', 'assigned']);

export const step1Schema = z.object({
  image: z.string(),
  status: plantStatus,
  name: z.string().nonempty(),
  appearance: z.string(),
});

const minMaxSchema = z
  .string()
  .nonempty()
  .refine((value) => !isNaN(parseFloat(value)), {
    message: 'Must be a number',
  });

export const step2Schema = z.object({
  light_min: minMaxSchema,
  light_max: minMaxSchema,
  temp_min: minMaxSchema,
  temp_max: minMaxSchema,
  air_humidity_min: minMaxSchema,
  air_humidity_max: minMaxSchema,
  soil_humidity_min: minMaxSchema,
  soil_humidity_max: minMaxSchema,
});

export const step3Schema = z.object({
  fertilizing: z.string(),
  repotting: z.string(),
  pruning: z.string(),
  common_diseases: z.string(),
  blooming_time: z.string(),
});

export const plantSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape);

const backendPlant = z
  .object({
    id: z.number(),
    status: plantStatus,
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
  .extend(step3Schema.shape);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type StepFormData = Step1FormData | Step2FormData | Step3FormData;
export type PlantFormData = z.infer<typeof plantSchema>;
export type BackendPlant = z.infer<typeof backendPlant>;
export type PlantStatus = z.infer<typeof plantStatus>;
