import { z } from 'zod';

export const deviceSchema = z.object({
  name: z.string(),
});

export const backendDeviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  user: z.number(),
});

const backendDeviceLog = z.object({
  temp: z.number(),
  soil_hum: z.number(),
  air_hum: z.number(),
  light: z.number(),
});

export type BackendDevice = z.infer<typeof backendDeviceSchema>;
export type BackendDeviceLog = z.infer<typeof backendDeviceLog>;
