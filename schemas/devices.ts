import { z } from 'zod';

export const deviceSchema = z.object({
  name: z.string(),
});

export const backendDeviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  user: z.number(),
});

export type BackendDevice = z.infer<typeof backendDeviceSchema>;
