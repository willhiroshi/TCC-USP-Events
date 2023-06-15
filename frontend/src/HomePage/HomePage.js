import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchField from '../SearchField/SearchField';
import { useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const mockdata = [
  {
    post_link: 'https://example.com/event-1',
    date: '2023-06-15',
    address: '123 Main St, Cityville',
    price: 'Free',
    lat: -24,
    lng: -47
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
        <Marker key={event.post_link} position={[event.lat, event.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HomePage;
