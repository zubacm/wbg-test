import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";

const MapGeosearch = () => {
  const map = useMap();

  const searchControl = new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
    style: "bar",
  });

  map.addControl(searchControl);

  return <></>;
};

export default MapGeosearch;
