/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useImperativeHandle, useState } from "react";
import { Polyline, useMap } from "react-leaflet";

const PlacesPolylines = forwardRef((props, ref) => {
  const [locations, setLocations] = useState([]);

  const map = useMap();

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    onChangeLocations(loc) {
      setLocations([...loc]);
    },
    onChangeBounds(bounds) {
      if (bounds) {
        map.fitBounds(bounds);
      }
    },
    onZoom(zoomLevel) {
      
    }
  }));

  return (
    <>
      <Polyline
        positions={[
          ...locations
            ?.sort((a, b) => a?.displaySequence - b?.displaySequence)
            ?.map((x) => [x?.lat, x?.lng]),
        ]}
        color={"#0D2F2B"}
        lineCap="round"
        lineJoin="round"
        stroke={true}
        weight={3}
        dashArray={[12, 12]}
      />
    </>
  );
});

export default PlacesPolylines;
