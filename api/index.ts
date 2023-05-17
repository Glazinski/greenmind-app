import axios, { AxiosError } from 'axios';
import Constants from 'expo-constants';

import { useAuthStore } from 'store/useAuthStore';

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.setState({
        accessToken: null,
        expirationTimestamp: null,
      });
      setAuthToken(null);
    }

    return Promise.reject(error);
  }
);

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
