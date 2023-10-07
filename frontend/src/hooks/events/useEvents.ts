import { useQuery } from '@tanstack/react-query';
import { EventsRequester } from './EventsRequester';
import { Event } from '../../types/event';
import { Dayjs } from 'dayjs';
import { getAPIBaseUrl } from '../../utils';

const eventsRequester = new EventsRequester(getAPIBaseUrl());

const EVENTS_QUERY_KEY = 'events';

export const getEvents = (
  startPeriod: Dayjs,
  endPeriod: Dayjs,
  typeFilter: string,
  locationless: string
) =>
  useQuery<Event[]>([EVENTS_QUERY_KEY, startPeriod, endPeriod, typeFilter, locationless], () =>
    eventsRequester.getEvents(startPeriod, endPeriod, typeFilter, locationless)
  );
