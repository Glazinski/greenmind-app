import { useMutation } from '@tanstack/react-query';

import { api, setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';
import { SignInUser, SignUpUser } from 'schemas/auth';

interface AuthResponse {
  token: string;
}

const defaultMutationConfig = (
  setAuthData: (
    accessToken: string | null,
    expirationTimestamp: number | null
  ) => void
) => ({
  onSuccess: (data: AuthResponse) => {
    const expirationTimestamp = new Date().getTime() + 1800 * 1000; // 30 minutes

    setAuthToken(data.token);
    setAuthData(data.token, expirationTimestamp);
  },
});

export const useSignIn = () => {
  const { setAuthData } = useAuthStore();

  return useMutation({
    mutationFn: (user: SignInUser) =>
      api.post<AuthResponse>('/login', user).then((res) => res.data),
    ...defaultMutationConfig(setAuthData),
  });
};

export const useSignUp = () => {
  const { setAuthData } = useAuthStore();

  return useMutation({
    mutationFn: (newUser: SignUpUser) =>
      api
        .post('/users', {
          user: { ...newUser },
        })
        .then((res) => res.data),
    ...defaultMutationConfig(setAuthData),
  });
};

export const useSignOut = () => {
  const { setAuthData } = useAuthStore();

  return useMutation({
    mutationFn: () => new Promise((resolve) => resolve(undefined)),
    onSuccess: async () => {
      try {
        setAuthData(null, null);
        setAuthToken(null);
      } catch (error) {
        console.error(error);
      }
    },
  });
};
