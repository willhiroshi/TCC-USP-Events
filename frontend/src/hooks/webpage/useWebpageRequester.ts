import camelcaseKeys from 'camelcase-keys';
import useAxios from '../axios/useAxios';
import { Source, Webpage } from '../../types/webpage';

const useWebpageRequester = (baseURL: string) => {
  const axiosInstance = useAxios(baseURL);
  const endpoint = `/webpage`;

  const getWebpages = async (): Promise<Webpage[]> => {
    const requestParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axiosInstance(endpoint, requestParams);

    return camelcaseKeys(response.data.data, { deep: true });
  };

  const saveWebpage = async (link: string, source: Source): Promise<Webpage> => {
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        link,
        source
      }
    };

    const response = await axiosInstance(endpoint, requestParams);
    return camelcaseKeys(response.data.data, { deep: true });
  };

  const deleteWebpage = async (webpageId: string): Promise<Webpage> => {
    const deleteEndpoint = `${endpoint}/${webpageId}`;
    const requestParams = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axiosInstance(deleteEndpoint, requestParams);
    return response.data.data;
  };

  const editWebpage = async (id: string, link: string, source: Source): Promise<Webpage> => {
    const editEndpoint = `${endpoint}/${id}`;
    const requestParams = {
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        link,
        source
      }
    };

    const response = await axiosInstance(editEndpoint, requestParams);
    return response.data.data;
  };

  return { getWebpages, saveWebpage, deleteWebpage, editWebpage };
};

export default useWebpageRequester;
