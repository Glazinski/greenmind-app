import { useQuery } from '@tanstack/react-query';

import { api } from 'api';
import { BackendPlant } from 'schemas/plants';

export const usePrivatePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { public: false }],
    queryFn: () =>
      api.get('/plants/private').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const usePublicPlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { public: true }],
    queryFn: () =>
      api.get('/plants/public').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
