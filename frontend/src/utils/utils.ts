export const getAPIBaseUrl = () => {
  if (!process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'development') {
    return 'http://localhost:9000';
  }

  return 'https://uspevents.ix.tc/api';
};

export const getAuthAPIBaseUrl = () => {
  if (!process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'development') {
    return 'http://localhost:9000';
  }

  return 'https://uspevents.ix.tc/api';
};
