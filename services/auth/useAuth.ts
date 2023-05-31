import React from 'react';

import { setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';
import { useStoreHydration } from 'store/useStoreHydration';

export const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { accessToken, setAuthData, userId } = useAuthStore();
  const hydrated = useStoreHydration(useAuthStore.persist);

  React.useEffect(() => {
    setIsLoading(true);
    if (accessToken && userId && !hydrated) {
      setAuthToken(accessToken);
    }
    setIsLoading(false);
  }, [accessToken, userId, hydrated, setAuthData]);

  return {
    isSignedIn: isLoading || !!accessToken,
    isLoading: !hydrated,
  };
};
