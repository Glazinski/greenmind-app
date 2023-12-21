import { z } from 'zod';

import { RequiredStringSchema } from './utils/required';

export const DeviceInputScheme = z.object({
  name: RequiredStringSchema,
  image: z.string(),
});

export const DeviceBackendSchema = z.object({
  id: z.number(),
  name: z.string(),
  user: z.number(),
  image_url: z.string().or(z.null()),
});

const DeviceBackendLogSchema = z.object({
  temp: z.number(),
  soil_hum: z.number(),
  air_hum: z.number(),
  light: z.number(),
});

enum Task {
  WATER_PLANT = 0,
}

enum TaskStatus {
  TODO = 0,
}

const DeviceBackendTaskSchema = z.object({
  id: z.number(),
  device: z.number(),
  task_number: z.nativeEnum(Task),
  status: z.nativeEnum(TaskStatus),
});

export type FormDevice = z.infer<typeof DeviceInputScheme>;
export type BackendDevice = z.infer<typeof DeviceBackendSchema>;
export type BackendDeviceLog = z.infer<typeof DeviceBackendLogSchema>;
export type BackendTask = z.infer<typeof DeviceBackendTaskSchema>;
