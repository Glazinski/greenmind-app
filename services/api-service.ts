import axios, { AxiosError } from 'axios';
import Constants from 'expo-constants';

import { useAuthStore } from 'store/use-auth-store';

/**
 * An Axios instance configured with a predefined base URL.
 */
export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
});

/**
 * An Axios interceptor for clearing user auth data
 * when 401 status code occurs
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.setState({
        accessToken: null,
        userId: null,
      });
      setAuthToken(null);
    }

    return Promise.reject(error);
  }
);

/**
 * Sets token in axios headers
 * @param token - JWT authorization token
 */
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
