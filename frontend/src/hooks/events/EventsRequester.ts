export class EventsRequester {
  private readonly baseURL: string;

  constructor(baseHost: string) {
    this.baseURL = baseHost;
  }

  getEvents = async () => {
    const endpoint = `${this.baseURL}/events`;
    const requestParams = {
      method: 'GET'
    };

    const response = await fetch(endpoint, requestParams);
    const apiResponse = await response.json();
    return apiResponse.data;
  };
}
