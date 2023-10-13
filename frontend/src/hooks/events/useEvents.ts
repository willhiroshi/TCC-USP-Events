import { useQuery } from '@tanstack/react-query';
import { Event } from '../../types/event';
import { Dayjs } from 'dayjs';
import { getAPIBaseUrl } from '../../utils/utils';
import { useEventsRequester } from './useEventsRequester';

const EVENTS_QUERY_KEY = 'events';

const useEvents = () => {
  const eventsRequester = useEventsRequester(getAPIBaseUrl());

  const getEvents = (
    startPeriod: Dayjs,
    endPeriod: Dayjs,
    typeFilter: string,
    locationless: string
  ) =>
    useQuery<Event[]>([EVENTS_QUERY_KEY, startPeriod, endPeriod, typeFilter, locationless], () =>
      eventsRequester.getEvents(startPeriod, endPeriod, typeFilter, locationless)
    );

  return { getEvents };
};

export default useEvents;
