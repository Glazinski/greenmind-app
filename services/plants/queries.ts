import { useQuery } from '@tanstack/react-query';

import { api } from 'api';
import { BackendPlant } from 'schemas/plants';

export const usePrivatePlants = (onSuccess?: (data: BackendPlant[]) => void) =>
  useQuery({
    queryKey: ['plants'],
    queryFn: () =>
      api.get('/plants/private').then<BackendPlant[]>((res) => res.data),
    // queryFn: () => api.get('/plants/private').then<BackendPlant[]>((res) => []),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
