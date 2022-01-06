import axios from "axios";

import { clearUserData, getToken } from "../localStorage/login.localStorage";

const { apiUrl } = __CONFIG__;
const instance = axios.create({ baseURL: apiUrl });

instance.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const {
      data: { errors, data },
    } = response;
    if (errors) {
      return Promise.reject(errors);
    }
    return data;
  },
  (error) => {
    if (error.response.status === 401) {
      clearUserData();
    }
    return Promise.reject(error);
  },
);

export const protectAPI = (query) => instance.post("graphql?", query);

export const unprotectedAPI = (query) => instance.post("graphql-auth/", query);
