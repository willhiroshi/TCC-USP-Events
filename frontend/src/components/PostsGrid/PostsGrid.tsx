import * as styles from './styles';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import moment from 'moment';
import 'moment/locale/pt';
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';
import useEvents from '../../hooks/events/useEvents';
import useHomeStore from '../../store/homeStore';

const LocationlessPostsGrid = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const typeFilter = useHomeStore((state) => state.typeFilter);

  const { getEvents } = useEvents();
  const { data: events } = getEvents(startPeriod, endPeriod, typeFilter, 'True');

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

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <Box className={styles.body}>
      <Paper className={styles.paper}>
        <Box className={styles.header}>
          <Typography variant="h5">Eventos sem localização</Typography>
        </Box>
        <Divider />

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
                sx={{ maxWidth: 350, maxHeight: 600, width: '100%', overflowY: 'auto' }}
                className={styles.cardItem}
                variant="outlined"
              >
                <CardActionArea>
                  <CardHeader
                    title={capitalizeFirstLetter(event.source)}
                    subheader={parseDateFromEvent(event.date as string)}
                    className={styles.cardHeader}
                  />
                  <CardContent className={styles.cardContent} style={{ padding: 0 }}>
                    {event.source == 'Instagram' ? (
                      <InstagramEmbed url={event.postLink} width={'100%'} />
                    ) : (
                      <FacebookEmbed url={event.postLink} width={'100%'} />
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default LocationlessPostsGrid;
