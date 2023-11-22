import {
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from 'api';
import { BackendPlant, PlantFormData } from 'schemas/plants';

import { convertPlantToFormData } from './convert-plant-to-form-data';
import { mapBackendPlantToPlantFormData } from './map-backend-plant-to-plant-form-data';

interface ErrorResponse {
  error: string[];
}

const invalidatePlantQueries = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({
    queryKey: ['plants', { type: 'public' }],
  });
  await queryClient.invalidateQueries({
    queryKey: ['plants', { type: 'private' }],
  });
  await queryClient.invalidateQueries({
    queryKey: ['plants', { type: 'favorite' }],
  });
  await queryClient.invalidateQueries({
    queryKey: ['plants', { type: 'assigned' }],
  });
};

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
      await invalidatePlantQueries(queryClient);
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
      await invalidatePlantQueries(queryClient);
      onSuccess?.();
    },
  });
};

export const useDeletePlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/plants/${id}`),
    onSuccess: async () => {
      onSuccess?.();
      await invalidatePlantQueries(queryClient);
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

export const useAssignPlantToDevice = (onSuccess?: () => void) => {
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
      const mappedPlant = mapBackendPlantToPlantFormData(plant, 'assigned');
      const newPlant = convertPlantToFormData(mappedPlant, deviceId);

      return api.post('/plants', newPlant, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async (_, { deviceId }) => {
      await invalidatePlantQueries(queryClient);
      await queryClient.invalidateQueries({
        queryKey: ['devices', deviceId, 'plants'],
      });
      onSuccess?.();
    },
  });
};
