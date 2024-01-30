import React from 'react';

import { setAuthToken } from 'services/api-service';
import { useAuthStore } from 'store/use-auth-store';

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
