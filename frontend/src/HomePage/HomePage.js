import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const centerMapLocation = {
  lat: 44,
  lng: -80
};

const markerLocation = {
  lat: 44,
  lng: -80
};

const mapContainerStyle = { width: '100%', height: '100vh' };

function HomePage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div> Loading the map... </div>;
  return (
    <GoogleMap zoom={10} center={centerMapLocation} mapContainerStyle={mapContainerStyle}>
      <Marker position={markerLocation}></Marker>
    </GoogleMap>
  );
}

export default HomePage;
