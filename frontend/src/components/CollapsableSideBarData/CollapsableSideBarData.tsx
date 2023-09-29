import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import LocationOffIcon from '@mui/icons-material/LocationOff';

const CollapsableSideBarData = [
  {
    title: 'Mapa',
    path: '/',
    icon: <MapIcon />
  },
  {
    title: 'Eventos sem localização',
    path: '/locationless',
    icon: <LocationOffIcon />
  }
];

export default CollapsableSideBarData;
