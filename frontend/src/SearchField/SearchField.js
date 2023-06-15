import { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import '../../node_modules/leaflet-geosearch/dist/geosearch.css';

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel: 'Procure uma localização...',
    style: 'bar',
    showPopup: false,
    retainZoomLevel: false,
    animateZoom: true
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);

    const handleLocationFound = (e) => {
      const { latlng } = e;
      map.setView(latlng, 15);
    };

    map.on('geosearch/showlocation', handleLocationFound);

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation', handleLocationFound);
    };
  }, [map, searchControl]);

  return null;
};

export default SearchField;
