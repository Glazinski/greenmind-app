import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from 'api';
import { BackendPlant, PlantFormData } from 'schemas/plants';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

import { convertPlantToFormData } from './convertPlantToFormData';
import { mapBackendPlantToPlantFormData } from './mapBackendPlantToPlantFormData';

interface ErrorResponse {
  error: string[];
}

export const useAddPlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ErrorResponse>, PlantFormData>({
    mutationFn: (plant) => {
      const newPlant = convertPlantToFormData(plant);

      return api.post('/plants', newPlant, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      onSuccess?.();
      await queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
};

export const useEditPlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<ErrorResponse>,
    {
      plant: PlantFormData;
      plantId: number;
    }
  >({
    mutationFn: ({ plant, plantId }) => {
      const newPlant = convertPlantToFormData(plant);

      return api.patch(`/plants/${plantId}`, newPlant, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['plants'] });
      onSuccess?.();
    },
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/plants/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
};

export const useAddPlantToFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plantId: number) => api.post(`/plants/${plantId}/favorite`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['plants', { type: 'favorite' }],
      });
    },
  });
};

export const useDeletePlantFromFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plantId: number) => api.delete(`/plants/${plantId}/favorite`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['plants', { type: 'favorite' }],
      });
    },
  });
};

export const useAssignPlantToDevice = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<ErrorResponse>,
    {
      plant: BackendPlant;
      deviceId: number;
    }
  >({
    mutationFn: ({ plant, deviceId }) => {
      const mappedPlant = mapBackendPlantToPlantFormData(plant);
      const newPlant = convertPlantToFormData(mappedPlant, deviceId);

      return api.post('/plants', newPlant, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async (_, { deviceId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['devices', deviceId, 'plants'],
      });
    },
  });
};
