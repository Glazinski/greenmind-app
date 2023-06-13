import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from 'api';
import { FormDevice } from 'schemas/devices';

import { convertDeviceToFormData } from './convertDeviceToFormData';

export const useDeviceWater = () =>
  useMutation({
    mutationFn: () =>
      axios.post('http://growbox.atthost24.pl/tasks', {
        device: 1,
        task_number: 0,
        status: 0,
      }),
  });

export const useEditDevice = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError,
    {
      deviceId: number | null | undefined;
      formDevice: Partial<FormDevice>;
    }
  >({
    mutationFn: ({ deviceId, formDevice }) => {
      const deviceFormData = convertDeviceToFormData(formDevice);

      return api.patch(`/devices/${deviceId}`, deviceFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['devices'] });
      onSuccess?.();
    },
  });
};

export const useDeleteDevice = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: number) => api.delete(`/devices/${deviceId}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['devices'] });
      onSuccess?.();
    },
  });
};
