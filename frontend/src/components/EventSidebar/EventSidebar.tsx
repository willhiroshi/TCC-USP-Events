import * as styles from './styles';
import React from 'react';
import { Divider, Typography } from '@mui/material';
import TypesFilter from './components/TypesFilter/TypesFilter';
import DatesFilter from './components/DatesFilter/DatesFilter';
import EventsInformation from './components/EventsInformation/EventsInformation';

const EventSidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <Typography variant="h6">Filtros de eventos</Typography>
      <DatesFilter />
      <TypesFilter />
      <Divider />

      <EventsInformation />
    </div>
  );
};

export default EventSidebar;
