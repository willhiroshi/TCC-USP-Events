import { useQuery } from '@tanstack/react-query';
import { EventsRequester } from './EventsRequester';
import { Event } from './Types';

const useEvents = () => {
  const eventsRequester = new EventsRequester('http://localhost:9000');

  const EVENTS_QUERY_KEY = 'events';

  const getEvents = () => useQuery<Event[]>([EVENTS_QUERY_KEY], () => eventsRequester.getEvents());

  return {
    getEvents
  };
};

export default useEvents;
