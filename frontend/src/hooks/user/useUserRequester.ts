import camelcaseKeys from 'camelcase-keys';
import useAxios from '../axios/useAxios';

const useUserRequester = (baseURL: string) => {
  const axiosInstance = useAxios(baseURL);

  const postLogin = async (username: string, password: string) => {
    const endpoint = `/auth/token`;
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username,
        password
      }
    };

    const response = await axiosInstance(endpoint, requestParams);
    return camelcaseKeys(response.data, { deep: true });
  };

  const postLogout = async (refreshToken: string) => {
    const endpoint = `/auth/token/invalidate`;
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        refresh: refreshToken
      }
    };

    return await axiosInstance(endpoint, requestParams);
  };

  const postRegister = async (username: string, email: string, password: string, name: string) => {
    const endpoint = `/auth/register`;
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username,
        email,
        password,
        name
      }
    };

    const response = await axiosInstance(endpoint, requestParams);
    return camelcaseKeys(response.data.data, { deep: true });
  };

  return { postLogin, postLogout, postRegister };
};

export default useUserRequester;
