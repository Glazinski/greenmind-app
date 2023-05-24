import { z } from 'zod';

export const step1Schema = z.object({
  name: z.string().nonempty(),
  appearance: z.string().nonempty(),
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
  humidity_min: minMaxSchema,
  humidity_max: minMaxSchema,
});

export const step3Schema = z.object({
  fertilizing: z.string().nonempty(),
  repotting: z.string().nonempty(),
  pruning: z.string().nonempty(),
  common_diseases: z.string().nonempty(),
  blooming_time: z.string().nonempty(),
});

export const plantSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape);

const backendPlant = step1Schema
  .extend(
    z.object({
      light_min: z.number(),
      light_max: z.number(),
      temp_min: z.number(),
      temp_max: z.number(),
      humidity_min: z.number(),
      humidity_max: z.number(),
    }).shape
  )
  .extend(step3Schema.shape);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type StepFormData = Step1FormData | Step2FormData | Step3FormData;
export type PlantFormData = z.infer<typeof plantSchema>;
export type BackendPlant = z.infer<typeof backendPlant> & { id: number };
