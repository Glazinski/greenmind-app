import { useQuery } from '@tanstack/react-query';

import { api } from 'api';

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

interface Device {
  id: number;
  name: string;
  user: number;
}

export const useDevices = () =>
  useQuery({
    // queryFn: () => api.get<Device[]>(`/devices`).then((res) => res.data),
    queryFn: () =>
      api.get<Device[]>(`/devices`).then((res) => [
        {
          id: 1,
          name: 'Device1',
          user: 1,
        },
        {
          id: 2,
          name: 'Device2',
          user: 1,
        },
      ]),
    queryKey: ['devices'],
    select: (data) =>
      data.map((device) => ({
        ...device,
        id: device.id.toString(),
      })),
  });

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
