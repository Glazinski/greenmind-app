import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Constants from 'expo-constants';

import { api } from 'api';
import { BackendDevice, BackendDeviceLog, BackendTask } from 'schemas/devices';
import { useActiveDeviceStore } from 'store/use-active-device-store';

export const useDevices = () =>
  useQuery({
    queryFn: () => api.get<BackendDevice[]>(`/devices`).then((res) => res.data),
    queryKey: ['devices'],
  });

export const useDevice = (
  deviceId: number | null | undefined,
  config?: UseQueryOptions<unknown, unknown, BackendDevice>
) =>
  useQuery({
    queryKey: ['devices', deviceId],
    queryFn: () =>
      api.get<BackendDevice>(`/devices/${deviceId}`).then((res) => res.data),
    ...config,
  });

export const useAssignedDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useDevice(deviceId);
};

export const useDeviceLogs = () => {
  // TODO: Use when API changes
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendDeviceLog[]>(
          // TODO: Reload .env and add slash
          `${Constants.expoConfig?.extra?.microserviceUrl}/devices/data/${deviceId}`
        )
        .then((res) => res.data),
    queryKey: ['devices', 1, 'data'],
    refetchInterval: 1000 * 30,
  });
};

export const useDeviceTasks = () => {
  // TODO: Use when API changes
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendTask[]>(
          // TODO: Reload .env and add slash
          `${Constants.expoConfig?.extra?.microserviceUrl}/devices/tasks/${deviceId}`
        )
        .then((res) => res.data),
    queryKey: ['devices', 1, 'tasks'],
  });
};
