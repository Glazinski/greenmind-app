import axios from 'axios';
import Constants from 'expo-constants';

export const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
