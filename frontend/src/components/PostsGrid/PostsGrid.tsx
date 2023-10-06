import * as styles from './styles';

import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import { FacebookEmbed } from 'react-social-media-embed';
import useEvents from '../../hooks/events/useEvents';
import useHomeStore from '../../store/homeStore';

const LocationlessPostsGrid = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);
  const { getEvents } = useEvents();
  const { data: events } = getEvents(startPeriod, endPeriod, 'True');

  moment().locale('pt-br');
  const eventsSortedByDate = events?.sort((a, b) => {
    const firstDate = new Date(a.date as string);
    const secondDate = new Date(b.date as string);
    return firstDate.getTime() - secondDate.getTime();
  });

  const parseDateFromEvent = (date: string) => {
    const momentDate = new Date(date);

    return moment(momentDate).format('LL');
  };

  return (
    <div className={styles.body}>
      <Grid
        container
        spacing={1}
        className={styles.gridContainer}
        alignItems="flex-start"
        justifyContent="center"
        rowGap={0}
      >
        {eventsSortedByDate?.map((event) => (
          <Grid key={event.hashId} xs={12} sm={6} md={6} className={styles.gridItem}>
            <Card
              sx={{ maxWidth: 350, maxHeight: 600 }}
              className={styles.cardItem}
              variant="outlined"
            >
              <CardActionArea>
                <CardHeader
                  title="Pró-Reitoria de Graduação USP"
                  subheader={parseDateFromEvent(event.date as string)}
                  className={styles.cardHeader}
                />
                <CardContent className={styles.cardContent} style={{ padding: 0 }}>
                  <FacebookEmbed url={event.postLink as string} width={'100%'} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LocationlessPostsGrid;
