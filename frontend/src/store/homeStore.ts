import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types/event';

interface HomeStore {
  startPeriod: Dayjs;
  endPeriod: Dayjs;
  setStartPeriod: (startPeriod: Dayjs) => void;
  setEndPeriod: (endPeriod: Dayjs) => void;

  selectedEvent: Event | null;
  setSelectedEvent: (selectedEvent: Event) => void;
}

const useHomeStore = create<HomeStore>((set) => ({
  startPeriod: dayjs(),
  endPeriod: dayjs().add(30, 'day'),
  setStartPeriod: (startPeriod: Dayjs) => set({ startPeriod: startPeriod }),
  setEndPeriod: (endPeriod: Dayjs) => set({ endPeriod: endPeriod }),

  selectedEvent: null,
  setSelectedEvent: (selectedEvent: Event) => set({ selectedEvent: selectedEvent })
}));

export default useHomeStore;
