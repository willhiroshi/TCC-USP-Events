import styles from './styles';
import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LinkIcon from '@mui/icons-material/Link';
import IconText from '../../../IconText/IconText';
import useHomeStore from '../../../../store/homeStore';
import { InstagramEmbed } from 'react-social-media-embed/dist/components/embeds/InstagramEmbed';
import { FacebookEmbed } from 'react-social-media-embed/dist/components/embeds/FacebookEmbed';

const EventsInformation = () => {
  const selectedEvent = useHomeStore((state) => state.selectedEvent);

  if (!selectedEvent) return null;

  return (
    <div style={styles.eventInfoContainer}>
      <Typography variant="h6">Informações do evento</Typography>

      <div style={styles.iconsEventInfoContainer}>
        <IconText IconComponent={PlaceIcon}>{selectedEvent?.address}</IconText>
        <IconText IconComponent={CalendarMonthIcon}>{selectedEvent?.date}</IconText>
        <IconText IconComponent={AttachMoneyIcon}>{selectedEvent?.price}</IconText>
        <IconText IconComponent={LinkIcon}>
          <Link href={selectedEvent.postLink} target="_blank" rel="noreferrer">
            Ver publicação original
          </Link>
        </IconText>
      </div>

      {selectedEvent.source == 'Instagram' ? (
        <InstagramEmbed url={selectedEvent.postLink} width={'100%'} linkText="Carregando Evento" />
      ) : (
        <FacebookEmbed url={selectedEvent.postLink} width={'100%'} linkText="Carregando Evento" />
      )}
    </div>
  );
};

export default EventsInformation;
