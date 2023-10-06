export const getAPIBaseUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:9000';
  }

  return 'https://uspevents.ix.tc/api';
};
