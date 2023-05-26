import { useQuery } from '@tanstack/react-query';

import { api } from 'api';
import { BackendDevice } from 'schemas/devices';
import { useActiveDeviceStore } from '../../store/useActiveDeviceStore';

interface DeviceLog {
  temp: number;
  soil_hum: number;
  air_hum: number;
  light: number;
}

interface Task {
  id: number;
  device: number;
  task_number: number;
  status: number;
}

export const useDevices = () =>
  useQuery({
    queryFn: () => api.get<BackendDevice[]>(`/devices`).then((res) => res.data),
    // queryFn: () =>
    //   api.get<BackendDevice[]>(`/devices`).then((res) => [
    //     {
    //       id: 1,
    //       name: 'Device1',
    //       user: 1,
    //     },
    //     {
    //       id: 2,
    //       name: 'Device2',
    //       user: 1,
    //     },
    //   ]),
    queryKey: ['devices'],
    // select: (data) =>
    //   data.map((device) => ({
    //     ...device,
    //     id: device.id.toString(),
    //   })),
  });

export const useDevice = (id: number) =>
  useQuery({
    queryKey: ['devices', id],
    queryFn: () =>
      api.get<BackendDevice>(`/devices`).then((res) => ({
        id: 1,
        name: 'Device1',
        user: 1,
      })),
    // queryFn: () =>
    //   api.get<BackendDevice>(`/devices/${id}`).then((res) => res.data),
  });

export const useAssignedDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryKey: ['devices', deviceId],
    // queryFn: () =>
    // api.get<BackendDevice>(`/devices/${deviceId}`).then((res) => ({
    //   id: 1,
    //   name: 'Device1',
    //   user: 1,
    // })),
    queryFn: () =>
      api.get<BackendDevice>(`/devices/${deviceId}`).then((res) => res.data),
  });
};

export const useDeviceLogs = () =>
  useQuery({
    queryFn: () =>
      api.get<DeviceLog[]>('/python_microservice/data').then((res) => res.data),
    queryKey: ['devices', 1, 'data'],
    refetchInterval: 1000 * 30,
  });

export const useDeviceTasks = () =>
  useQuery({
    queryFn: () =>
      api
        .get<Task[]>('http://growbox.atthost24.pl/tasks')
        .then((res) => res.data),
    queryKey: ['devices', 1, 'tasks'],
  });
