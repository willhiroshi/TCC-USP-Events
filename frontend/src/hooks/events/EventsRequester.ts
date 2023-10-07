import { Dayjs } from 'dayjs';
import camelcaseKeys from 'camelcase-keys';

export class EventsRequester {
  private readonly baseURL: string;

  constructor(baseHost: string) {
    this.baseURL = baseHost;
  }

  getEvents = async (
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

    const endpoint = `${this.baseURL}/events?${params.toString()}`;
    const requestParams = {
      method: 'GET'
    };

    const response = await fetch(endpoint, requestParams);
    const apiResponse = await response.json();
    return camelcaseKeys(apiResponse.data, { deep: true });
  };
}
