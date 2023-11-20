import React from 'react';

import { setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';

export const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { accessToken, setAuthData, userId } = useAuthStore();

  React.useEffect(() => {
    setIsLoading(true);
    if (accessToken && userId) {
      setAuthToken(accessToken);
    }
    setIsLoading(false);
  }, [accessToken, userId, setAuthData]);

  return {
    isSignedIn: isLoading || !!accessToken,
    isLoading: false,
  };
};
