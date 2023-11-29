import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from 'api';
import { BackendDevice, BackendDeviceLog, BackendTask } from 'schemas/devices';
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
    ...config,
  });

export const useAssignedDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useDevice(deviceId);
};

export const useDeviceLogs = () => {
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendDeviceLog[]>(`/python_microservice/data/${deviceId}`)
        .then((res) => res.data),
    queryKey: ['devices', deviceId, 'data'],
    refetchInterval: 1000 * 30,
  });
};

export const useDeviceTasks = () => {
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryFn: () =>
      api
        .get<BackendTask[]>(
          `/python_microservice/data/get_device_tasks/${deviceId}`
        )
        .then((res) => res.data),
    queryKey: ['devices', deviceId, 'tasks'],
  });
};
