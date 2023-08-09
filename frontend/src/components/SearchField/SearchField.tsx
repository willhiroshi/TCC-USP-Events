import { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';
import { LeafletEvent, LocationEvent } from 'leaflet';

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    animateZoom: true,
    provider: provider,
    retainZoomLevel: false,
    searchLabel: 'Procure uma localização...',
    showPopup: false,
    style: 'bar'
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);

    const handleLocationFound = (e: LeafletEvent) => {
      const { latlng } = e as LocationEvent;
      if (latlng) map.setView(latlng, 15);
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
