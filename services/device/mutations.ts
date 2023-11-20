import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';

import { api } from 'api';
import { FormDevice } from 'schemas/devices';

import { convertDeviceToFormData } from './convertDeviceToFormData';
import { useActiveDeviceStore } from '../../store/useActiveDeviceStore';

export const useDeviceWater = () => {
  const { deviceId } = useActiveDeviceStore();

  return useMutation({
    mutationFn: () =>
      axios.post(
        `${Constants.expoConfig?.extra?.microserviceUrl}/devices/tasks`,
        {
          device_id: deviceId,
          task_number: 0,
          status: 0,
          task_id: 0,
        }
      ),
  });
};

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
