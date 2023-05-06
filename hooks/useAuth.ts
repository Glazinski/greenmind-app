import React from 'react';

import { useAuthStore } from '../store/useAuthStore';
import { isTokenExpired } from '../services/auth/tokenUtils';

export const useAuth = () => {
  const { accessToken, expirationTimestamp, setAuthData, _hasHydrated } =
    useAuthStore();

  React.useEffect(() => {
    if ((!accessToken && !expirationTimestamp) || !_hasHydrated) return;

    const isExpired = isTokenExpired(expirationTimestamp as number);

    if (isExpired) {
      setAuthData(null, null);
    }
  }, [accessToken, expirationTimestamp, _hasHydrated]);

  return {
    isSignedIn: !!accessToken,
  };
};
