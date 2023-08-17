import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface HomeStore {
  startPeriod: Dayjs;
  endPeriod: Dayjs;
  setStartPeriod: (startPeriod: Dayjs) => void;
  setEndPeriod: (endPeriod: Dayjs) => void;
}

const useHomeStore = create<HomeStore>((set) => ({
  startPeriod: dayjs(),
  endPeriod: dayjs().add(30, 'day'),
  setStartPeriod: (startPeriod: Dayjs) => set({ startPeriod: startPeriod }),
  setEndPeriod: (endPeriod: Dayjs) => set({ endPeriod: endPeriod })
}));

export default useHomeStore;
