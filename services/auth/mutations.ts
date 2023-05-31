import { useMutation } from '@tanstack/react-query';
import jwtDecode from 'jwt-decode';

import { api, setAuthToken } from 'api';
import { useAuthStore } from 'store/useAuthStore';
import { SignInUser, SignUpUser } from 'schemas/auth';

interface DecodedJwtPayload {
  exp: number;
  user_id: string;
}

interface AuthResponse {
  token: string;
}

const defaultMutationConfig = (
  setAuthData: (accessToken: string | null, userId: string | null) => void
) => ({
  onSuccess: (data: AuthResponse) => {
    const decodedToken = jwtDecode<DecodedJwtPayload>(data.token);

    setAuthToken(data.token);
    setAuthData(data.token, decodedToken.user_id);
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
        setAuthToken(null);
        setAuthData(null, null);
      } catch (error) {
        console.error(error);
      }
    },
  });
};
