import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import useUserStore from '../../store/userStore';
import { getAuthAPIBaseUrl } from '../../utils/utils';

const useAxios = (baseURL: string) => {
  const authTokens = useUserStore((state) => state.authTokens);
  const setAuthTokens = useUserStore((state) => state.setAuthTokens);
  const setUser = useUserStore((state) => state.setUser);

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (authTokens) {
      req.headers.Authorization = `Bearer ${authTokens.access}`;

      const baseAuthUrl = getAuthAPIBaseUrl();
      const user = jwt_decode<{ exp: number }>(authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;

      const response = await axios.post(`${baseAuthUrl}/auth/token/refresh`, {
        refresh: authTokens.refresh
      });

      localStorage.setItem('authTokens', JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
