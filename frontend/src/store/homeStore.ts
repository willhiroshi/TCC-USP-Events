import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types/event';

interface HomeStore {
  startPeriod: Dayjs;
  endPeriod: Dayjs;
  setStartPeriod: (startPeriod: Dayjs) => void;
  setEndPeriod: (endPeriod: Dayjs) => void;

  typeFilter: string;
  setTypeFilter: (typeFilter: string) => void;

  selectedEvent: Event | null;
  setSelectedEvent: (selectedEvent: Event) => void;
}

const getTypesFromLocalStorage = () => {
  const rawTypes = localStorage.getItem('selectedTypes');

  if (rawTypes) {
    const types = JSON.parse(rawTypes);
    const selectedTypes = Object.entries(types)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const selectedTypesString = selectedTypes.join(',');
    return selectedTypesString;
  }

  return '';
};

const useHomeStore = create<HomeStore>((set) => ({
  startPeriod: dayjs(),
  endPeriod: dayjs().add(30, 'day'),
  setStartPeriod: (startPeriod: Dayjs) => set({ startPeriod: startPeriod }),
  setEndPeriod: (endPeriod: Dayjs) => set({ endPeriod: endPeriod }),

  typeFilter: getTypesFromLocalStorage(),
  setTypeFilter: (typeFilter: string) => set({ typeFilter: typeFilter }),

  selectedEvent: null,
  setSelectedEvent: (selectedEvent: Event) => set({ selectedEvent: selectedEvent })
}));

export default useHomeStore;
