import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from 'api';

interface ErrorResponse {
  error: string[];
}

export const useAddPlant = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ErrorResponse>, FormData>({
    mutationFn: (newPlant) =>
      api.post('/plants', newPlant, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
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
      plant: FormData;
      plantId: number;
    }
  >({
    mutationFn: ({ plant, plantId }) =>
      api.patch(`/plants/${plantId}`, plant, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
