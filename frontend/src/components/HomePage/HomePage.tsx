import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { PointExpression } from 'leaflet';
import SearchField from '../SearchField/SearchField';
import * as styles from './styles';
import useEvents from '../../hooks/events/useEvents';
import React, { useEffect } from 'react';
import { Event } from '../../types/event';
import Loading from '../Loading/Loading';
import ReloadButton from '../ReloadButton/ReloadButton';
import EventSidebar from '../EventSidebar/EventSidebar';
import useHomeStore from '../../store/homeStore';

const DEFAUL_ICON_SIZE: PointExpression = [25, 41];
const DEFAULT_ICON_ANCHOR: PointExpression = [12, 41];
const DEFAULT_POPUP_ANCHOR: PointExpression = [1, -34];
const DEFAULT_SHADOW_SIZE: PointExpression = [41, 41];

const defaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: DEFAUL_ICON_SIZE,
  iconAnchor: DEFAULT_ICON_ANCHOR,
  popupAnchor: DEFAULT_POPUP_ANCHOR,
  shadowSize: DEFAULT_SHADOW_SIZE
});

const selectedIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: DEFAUL_ICON_SIZE,
  iconAnchor: DEFAULT_ICON_ANCHOR,
  popupAnchor: DEFAULT_POPUP_ANCHOR,
  shadowSize: DEFAULT_SHADOW_SIZE
});

const HomePage = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const selectedEvent = useHomeStore((state) => state.selectedEvent);
  const setSelectedEvent = useHomeStore((state) => state.setSelectedEvent);

  const { getEvents } = useEvents();
  const {
    data: events,
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
    isSuccess: isEventsSuccess
  } = getEvents(startPeriod, endPeriod, 'False');

  useEffect(() => {
    refetchEvents();
  }, [startPeriod, endPeriod]);

  if (!isEventsSuccess)
    return (
      <div className={styles.loadingContainer}>
        {isEventsLoading && <Loading />}
        {isEventsError && <ReloadButton onReload={refetchEvents} />}
      </div>
    );

  return (
    <div className={styles.homeContainer}>
      <MapContainer
        style={{ width: '100%', height: '100vh' }}
        center={[-23.559191, -46.725441]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchField />
        {events?.map((event: Event) => {
          if (event.lat != null && event.lng != null) {
            const isSelected = selectedEvent?.hashId === event.hashId;
            return (
              <Marker
                key={event.postLink}
                position={[event.lat, event.lng]}
                icon={isSelected ? selectedIcon : defaultIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedEvent(event);
                  }
                }}
              />
            );
          }
        })}
      </MapContainer>
      <EventSidebar />
    </div>
  );
};

export default HomePage;
