import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchField from '../SearchField/SearchField';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LinkIcon from '@mui/icons-material/Link';
import * as styles from './styles';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const mockdata = [
  {
    postLink: 'https://example.com/event-1',
    date: '2023-06-15',
    address: '123 Main St, Cityville',
    price: 'Free',
    lat: -23.559191,
    lng: -46.725441
  }
];

const HomePage = () => {
  return (
    <MapContainer
      style={{ width: '100wh', height: '100vh' }}
      center={[-23.559191, -46.725441]}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchField />
      {mockdata.map((event) => (
        <Marker key={event.postLink} position={[event.lat, event.lng]}>
          <Popup>
            <div className={styles.popupContainer}>
              <div className={styles.textIcon}>
                <PlaceIcon />
                {event.address}
              </div>
              <div className={styles.textIcon}>
                <CalendarMonthIcon />
                {event.date}
              </div>
              <div className={styles.textIcon}>
                <AttachMoneyIcon />
                {event.price}
              </div>
              <div className={styles.textIcon}>
                <LinkIcon />
                <a href={event.postLink} target="_blank" rel="noreferrer">
                  {event.postLink}
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HomePage;
