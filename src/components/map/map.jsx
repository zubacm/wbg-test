"use client";

import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import MapLocations from "./map-locations";
import { useState } from "react";
import PlacesPolylines from "./places-polylines";

const Map = ({
  ref,
  className = "",
  size = "regular",
  children,
  onSelectPlace,
  selectedLocations,
  onShowInfo,
  mapLocationsRef,
  ...rest
}) => {
  const [mapData, setMapData] = useState({
    center: [44.7722, 17.191],
    zoomLevel: 15,
    key: 0,
  });

  return (
    <MapContainer
      key={`map__${mapData?.zoomLevel}__${mapData?.center?.at(
        0
      )}___${mapData?.center?.at(1)}`}
      className="map-container"
      center={mapData?.center}
      zoom={mapData?.zoomLevel}
    >
      <TileLayer
        attribution="<a href='https://www.wbg.com/'>WBG</a>"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MapGeosearch /> */}
      {/* <MapElement center={[44.7722, 17.191]} />
      <MapElement center={[44.8722, 17.391]} /> */}
      <MapLocations
        ref={mapLocationsRef}
        onSelectPlace={(data) => {
          onSelectPlace(data);
        }}
        selectedLocations={selectedLocations}
        onShowInfo={(data) => onShowInfo?.(data)}
      />
      <PlacesPolylines ref={ref} />
    </MapContainer>
  );
};

export default Map;
