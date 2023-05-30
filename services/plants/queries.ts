import { useQuery } from '@tanstack/react-query';

import { api } from 'api';
import { BackendPlant } from 'schemas/plants';

export const usePrivatePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'private' }],
    queryFn: () =>
      api.get('/plants/private').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const usePublicPlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'public' }],
    queryFn: () =>
      api.get('/plants/public').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const useFavoritePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'favorite' }],
    queryFn: () =>
      api.get('/plants/favorites').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const usePlant = (plantId: number | null) =>
  useQuery({
    queryKey: ['plants', plantId],
    queryFn: () =>
      api.get(`/plants/${plantId}`).then<BackendPlant>((res) => res.data),
    enabled: typeof plantId === 'number',
  });
