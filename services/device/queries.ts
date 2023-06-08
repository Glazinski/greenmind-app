import { useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';

import { api } from 'api';
import { BackendDevice, BackendDeviceLog, BackendTask } from 'schemas/devices';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

export const useDevices = () =>
  useQuery({
    queryFn: () => api.get<BackendDevice[]>(`/devices`).then((res) => res.data),
    queryKey: ['devices'],
  });

export const useAssignedDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryKey: ['devices', deviceId],
    queryFn: () =>
      api.get<BackendDevice>(`/devices/${deviceId}`).then((res) => res.data),
  });
};

export const useDeviceLogs = () =>
  useQuery({
    queryFn: () =>
      api
        .get<BackendDeviceLog[]>(
          `${Constants.expoConfig?.extra?.microserviceUrl}/data`
        )
        .then((res) => res.data),
    queryKey: ['devices', 1, 'data'],
    refetchInterval: 1000 * 30,
  });

export const useDeviceTasks = () =>
  useQuery({
    queryFn: () =>
      api
        .get<BackendTask[]>(
          `${Constants.expoConfig?.extra?.microserviceUrl}/tasks`
        )
        .then((res) => res.data),
    queryKey: ['devices', 1, 'tasks'],
  });
