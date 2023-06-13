import { useQuery } from '@tanstack/react-query';

import { api } from 'api';
import { BackendPlant } from 'schemas/plants';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';

export const usePrivatePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'private' }],
    queryFn: () =>
      api.get('/plants/private').then<BackendPlant[]>((res) => res.data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const usePublicPlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'public' }],
    queryFn: () =>
      api.get('/plants/public').then<BackendPlant[]>((res) => res.data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const useFavoritePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants', { type: 'favorite' }],
    queryFn: () =>
      api.get('/plants/favorites').then<BackendPlant[]>((res) => res.data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export const useAssignedPlants = () =>
  useQuery({
    queryKey: ['plants', { type: 'assigned' }],
    queryFn: () =>
      api.get('/plants/assigned').then<BackendPlant[]>((res) => res.data),
  });

export const usePlantsAssignedToDevice = () => {
  const { deviceId } = useActiveDeviceStore();

  return useQuery({
    queryKey: ['devices', deviceId, 'plants'],
    queryFn: () =>
      api
        .get(`/devices/${deviceId}/plants`)
        .then<BackendPlant[]>((res) => res.data),
  });
};

export const usePlant = (
  plantId: number | null | undefined,
  onSuccess?: (plant: BackendPlant) => void
) =>
  useQuery({
    queryKey: ['plants', plantId],
    queryFn: () =>
      api.get(`/plants/${plantId}`).then<BackendPlant>((res) => res.data),
    enabled: typeof plantId === 'number',
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
