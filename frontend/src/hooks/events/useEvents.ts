import { useQuery } from 'react-query';
import { EventsRequester } from './EventsRequester';

const useEvents = () => {
  const eventsRequester = new EventsRequester('http://localhost:9000');

  const EVENTS_QUERY_KEY = 'events';

  const getEvents = () => useQuery(EVENTS_QUERY_KEY, () => eventsRequester.getEvents());

  return {
    getEvents
  };
};

export default useEvents;
