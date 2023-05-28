import React from 'react';

import { setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';
import { useStoreHydration } from 'store/useStoreHydration';
import { isTokenExpired } from 'services/auth/tokenUtils';

export const useAuth = () => {
  const { accessToken, expirationTimestamp, setAuthData } = useAuthStore();
  const hydrated = useStoreHydration(useAuthStore.persist);

  React.useEffect(() => {
    if ((!accessToken && !expirationTimestamp) || !hydrated) return;

    const isExpired = isTokenExpired(expirationTimestamp as number);

    if (isExpired) {
      setAuthData(null, null, null);
      setAuthToken(null);
      return;
    }

    setAuthToken(accessToken);
  }, [accessToken, expirationTimestamp, hydrated, setAuthData]);

  return {
    isSignedIn: !!accessToken,
  };
};
