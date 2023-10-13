import { Dayjs } from 'dayjs';
import camelcaseKeys from 'camelcase-keys';
import useAxios from '../axios/useAxios';

export const useEventsRequester = (baseURL: string) => {
  const axiosInstance = useAxios(baseURL);

  const getEvents = async (
    startPeriod: Dayjs,
    endPeriod: Dayjs,
    typeFilter: string,
    locationless: string
  ) => {
    const params = new URLSearchParams();
    params.append('start_date', startPeriod.format('YYYY-MM-DD'));
    params.append('end_date', endPeriod.format('YYYY-MM-DD'));
    params.append('locationless', locationless);
    typeFilter && params.append('types', typeFilter);

    const endpoint = `/events?${params.toString()}`;

    const response = await axiosInstance.get(endpoint);
    return camelcaseKeys(response.data.data, { deep: true });
  };

  return { getEvents };
};
