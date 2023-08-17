import * as styles from './styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import useHomeStore from '../../store/homeStore';

const Sidebar = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const setStartPeriod = useHomeStore((state) => state.setStartPeriod);
  const setEndPeriod = useHomeStore((state) => state.setEndPeriod);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.datePickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Início"
            value={startPeriod}
            onChange={(newDate) => setStartPeriod(newDate!)}
          />
          <DatePicker
            label="Fim"
            value={endPeriod}
            onChange={(newDate) => setEndPeriod(newDate!)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Sidebar;
