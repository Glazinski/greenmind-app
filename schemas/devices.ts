import { z } from 'zod';

export const formDeviceSchema = z.object({
  name: z.string(),
  image: z.string(),
});

export const backendDeviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  user: z.number(),
  image_url: z.string().or(z.null()),
});

const backendDeviceLog = z.object({
  temp: z.number(),
  soil_hum: z.number(),
  air_hum: z.number(),
  light: z.number(),
});

const backendTask = z.object({
  id: z.number(),
  device: z.number(),
  task_number: z.number(),
  status: z.number(),
});

export type FormDevice = z.infer<typeof formDeviceSchema>;
export type BackendDevice = z.infer<typeof backendDeviceSchema>;
export type BackendDeviceLog = z.infer<typeof backendDeviceLog>;
export type BackendTask = z.infer<typeof backendTask>;
