import * as styles from './styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import useHomeStore from '../../store/homeStore';
import { FacebookEmbed } from 'react-social-media-embed';
import { Divider, Link, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LinkIcon from '@mui/icons-material/Link';
import IconText from '../IconText/IconText';

const Sidebar = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const setStartPeriod = useHomeStore((state) => state.setStartPeriod);
  const setEndPeriod = useHomeStore((state) => state.setEndPeriod);

  const selectedEvent = useHomeStore((state) => state.selectedEvent);

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

      <Divider variant="middle" />

      {selectedEvent && (
        <div className={styles.eventInfoContainer}>
          <Typography variant="h6">Informações do evento</Typography>

          <div className={styles.iconsEventInfoContainer}>
            <IconText IconComponent={PlaceIcon}>{selectedEvent?.address}</IconText>
            <IconText IconComponent={CalendarMonthIcon}>{selectedEvent?.date}</IconText>
            <IconText IconComponent={AttachMoneyIcon}>{selectedEvent?.price}</IconText>
            <IconText IconComponent={LinkIcon}>
              <Link href={selectedEvent.postLink} target="_blank" rel="noreferrer">
                Ver publicação original
              </Link>
            </IconText>
          </div>

          <FacebookEmbed url={selectedEvent.postLink} width={'100%'} linkText="Carregando Evento" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
