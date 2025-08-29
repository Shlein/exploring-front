import axios from 'axios';
import { USER_AUTH_KEY } from 'shared/const/localStorage';

export const $api = axios.create({
  baseURL: __API__
});

$api.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_AUTH_KEY) || '';
  }
  return config;
});
