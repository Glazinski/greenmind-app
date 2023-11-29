import axios, { AxiosError } from 'axios';
import Constants from 'expo-constants';

import { useAuthStore } from 'store/use-auth-store';

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl,
});

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

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// export const replaceLocalhostToIP = (str: string) =>
//   str.replace('localhost', Constants.expoConfig?.extra?.myIpAddress);

export const replaceLocalhostToIP = (str: string) => str;
