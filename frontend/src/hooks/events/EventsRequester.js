export class EventsRequester {
  constructor(baseHost) {
    this.baseURL = baseHost;
  }

  getEvents = () => {
    const endpoint = `${this.baseURL}/events`;
    const requestParams = {
      method: 'GET'
    };

    return fetch(endpoint, requestParams).then((response) =>
      response.json().then((apiResponse) => apiResponse.data)
    );
  };
}
