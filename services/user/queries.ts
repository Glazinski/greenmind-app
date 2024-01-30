import { useQuery } from '@tanstack/react-query';

import { api } from 'services/api-service';
import { useAuthStore } from 'store/use-auth-store';

interface PairingCode {
  code: string;
}

export const useUserPairingCode = () => {
  const userId = useAuthStore((state) => state.userId);

  return useQuery({
    queryKey: ['users', userId, 'code'],
    queryFn: () =>
      api
        .get<PairingCode>(`/users/${userId}/show_code`)
        .then((res) => res.data),
    select: (data) => data.code,
  });
};
