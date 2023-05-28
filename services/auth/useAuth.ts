import React from 'react';

import { setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';
import { useStoreHydration } from 'store/useStoreHydration';
import { isTokenExpired } from 'services/auth/tokenUtils';

export const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { accessToken, expirationTimestamp, setAuthData, email } =
    useAuthStore();
  const hydrated = useStoreHydration(useAuthStore.persist);

  React.useEffect(() => {
    setIsLoading(true);
    if (accessToken && expirationTimestamp && email && !hydrated) {
      const isExpired = isTokenExpired(expirationTimestamp as number);

      if (isExpired) {
        setAuthToken(null);
        setAuthData(null, null, null);
        setIsLoading(false);
        return;
      }

      setAuthToken(accessToken);
    }
    setIsLoading(false);
  }, [accessToken, expirationTimestamp, email, hydrated, setAuthData]);

  return {
    isSignedIn: !!accessToken,
    isLoading: isLoading || !hydrated,
  };
};
