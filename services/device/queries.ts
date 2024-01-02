import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from 'api';
import {
  BackendDevice,
  BackendDeviceLog,
  BackendDeviceStat,
  BackendTask,
} from 'schemas/devices';
import { useActiveDeviceStore } from 'store/use-active-device-store';

export const useDevices = (onSuccess?: (data: BackendDevice[]) => void) =>
  useQuery({
    queryFn: () => api.get<BackendDevice[]>(`/devices`).then((res) => res.data),
    queryKey: ['devices'],
    onSuccess,
  });

export const useDevice = (
  deviceId: number | null | undefined,
  config?: UseQueryOptions<unknown, unknown, BackendDevice>
) =>
  useQuery({
    queryKey: ['devices', deviceId],
    queryFn: () =>
      api.get<BackendDevice>(`/devices/${deviceId}`).then((res) => res.data),
    enabled: typeof deviceId === 'number',
    ...config,
  });

export const useAssignedDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useDevice(deviceId);
};

export const useDeviceLogs = () => {
  const { deviceId, deviceUUID } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendDeviceLog[]>(`/python_microservice/data/${deviceUUID}`)
        .then((res) => res.data),
    queryKey: ['devices', deviceId, 'data'],
    refetchInterval: 1000 * 30,
    enabled: typeof deviceId === 'number',
  });
};

export const useDeviceTasks = () => {
  const { deviceId, deviceUUID } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendTask[]>(
          `/python_microservice/data/get_device_tasks/${deviceUUID}`
        )
        .then((res) => res.data),
    queryKey: ['devices', deviceId, 'tasks'],
    enabled: typeof deviceId === 'number',
  });
};

export const useDeviceStats = () => {
  const { deviceId, deviceUUID } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendDeviceStat[]>(
          `/python_microservice/data/get_device_data_history/${deviceUUID}`
        )
        .then((res) => res.data),
    queryKey: ['devices', deviceId, 'stats'],
    select: (data) =>
      data.map(
        ({ avg_air_hum, avg_soil_hum, avg_light, avg_temp, ...rest }) => ({
          avg_air_hum: avg_air_hum ?? 0,
          avg_soil_hum: avg_soil_hum ?? 0,
          avg_light: avg_light ?? 0,
          avg_temp: avg_temp ?? 0,
          ...rest,
        })
      ),
  });
};
