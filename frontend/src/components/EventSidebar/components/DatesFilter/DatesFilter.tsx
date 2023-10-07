import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import useHomeStore from '../../../../store/homeStore';

interface DatesFilterProps {
  style?: React.CSSProperties;
}

const DatesFilter = ({ style }: DatesFilterProps) => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const setStartPeriod = useHomeStore((state) => state.setStartPeriod);
  const setEndPeriod = useHomeStore((state) => state.setEndPeriod);

  const [openPicker, setOpenPicker] = React.useState<string | null>(null);
  const defaultDateFormat = 'DD/MM/YYYY';

  return (
    <div style={style}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" flexDirection={{ xs: 'column', xl: 'row' }} gap={'20px'}>
          <DatePicker
            label="Início"
            value={startPeriod}
            onChange={(newDate) => setStartPeriod(newDate!)}
            format={defaultDateFormat}
            open={openPicker === 'start'}
            onOpen={() => setOpenPicker('start')}
            onClose={() => setOpenPicker(null)}
          />
          <DatePicker
            label="Fim"
            value={endPeriod}
            onChange={(newDate) => setEndPeriod(newDate!)}
            format={defaultDateFormat}
            open={openPicker === 'end'}
            onOpen={() => setOpenPicker('end')}
            onClose={() => setOpenPicker(null)}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default DatesFilter;
