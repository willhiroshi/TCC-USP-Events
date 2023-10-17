import camelcaseKeys from 'camelcase-keys';
import useAxios from '../axios/useAxios';
import { Source, Webpage } from '../../types/webpage';

const useWebpageRequester = (baseURL: string) => {
  const axiosInstance = useAxios(baseURL);

  const saveWebpage = async (link: string, source: Source): Promise<Webpage> => {
    const endpoint = `/webpage`;
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
    return camelcaseKeys(response.data, { deep: true });
  };

  return { saveWebpage };
};

export default useWebpageRequester;
