import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from 'api';
import { BackendPlant, PlantFormData } from 'schemas/plants';

interface ErrorResponse {
  error: string[];
}

export const useAddPlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ErrorResponse>, PlantFormData>({
    mutationFn: (newPlant) =>
      api.post('/plants', {
        plant: {
          ...newPlant,
          public: false,
        },
      }),
    onSuccess: async () => {
      onSuccess?.();
      await queryClient.invalidateQueries({ queryKey: ['plants'] });
    },
  });
};

export const useEditPlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ErrorResponse>, BackendPlant>({
    mutationFn: (plant) =>
      api.patch(`/plants/${plant.id}`, {
        plant,
      }),
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
