import { useQuery } from '@tanstack/react-query';
import { EventsRequester } from './EventsRequester';
import { Event } from '../../types/event';
import { Dayjs } from 'dayjs';

const useEvents = () => {
  const eventsRequester = new EventsRequester('http://localhost:9000');

  const EVENTS_QUERY_KEY = 'events';

  const getEvents = (startPeriod: Dayjs, endPeriod: Dayjs) =>
    useQuery<Event[]>([EVENTS_QUERY_KEY], () => eventsRequester.getEvents(startPeriod, endPeriod));

  return {
    getEvents
  };
};

export default useEvents;
