import camelcaseKeys from 'camelcase-keys';

export class UserRequester {
  private readonly baseURL: string;

  constructor(baseHost: string) {
    this.baseURL = baseHost;
  }

  postLogin = async (username: string, password: string) => {
    const endpoint = `${this.baseURL}/auth/token`;
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    };

    const response = await fetch(endpoint, requestParams);
    const apiResponse = await response.json();
    return camelcaseKeys(apiResponse, { deep: true });
  };

  postRegister = async (username: string, email: string, password: string, name: string) => {
    const endpoint = `${this.baseURL}/auth/register`;
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        name
      })
    };

    const response = await fetch(endpoint, requestParams);
    const apiResponse = await response.json();
    return camelcaseKeys(apiResponse.data, { deep: true });
  };
}
