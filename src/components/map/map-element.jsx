/* eslint-disable @next/next/no-img-element */
import { CircleMarker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { MapElementTooltipWrapper, TooltipCardWrapper } from "./style";
import { ChipWrapperPrimary } from "@/app/style";
import { isDefined } from "@/lib/util";
import { usePlaceImage } from "@/app/api/locations/queries";
import { useRef, useState } from "react";
import PlaceCard from "../place-card";

const MapElement = ({
  ref,
  name,
  countryShort,
  city,
  featuredMedia,
  selectedIndex,
  onSelect,
  center,
  media,
  onZoomPlace,
  isSelected,
  onShowInfo,
  id,
}) => {
  const elementRef = useRef(null);
  const map = useMap();
  const { data } = usePlaceImage(media);
  const [hover, setHover] = useState(false);

  const closeCard = () => {
    setHover(false);
  };
  const isActionRef = useRef(false);
  const mapEvents = useMapEvents({
    click(e) {
      if (isActionRef.current === true) {
        isActionRef.current = false;
        return;
      } else {
        isActionRef.current = false;
        closeCard();
      }
    },
  });

  // map.addControl(searchControl);

  return (
    <>
      <CircleMarker
        {...map}
        center={center}
        eventHandlers={{
          click: (e) => {
            // console.log("KLIK", e);
            onZoomPlace?.(e?.latlng);
            isActionRef.current = true;
            setHover(true);
            // onSelect?.(data?.media_details?.sizes?.thumbnail?.source_url);
          },
          // mouseover: (e) => {
          //   setHover(true);
          // },
          // mouseout: () => {
          //   setHover(false);
          // },
        }}
        pathOptions={{
          zIndex: "9999",
          color: "transparent",
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
          fillColor: "transparent",
        }}
        radius={20}
        // id={`map-element-${id}`}
      >
        <>
          <Tooltip permanent direction="top" offset={[0, 40]} opacity={1}>
            <MapElementTooltipWrapper hover={hover}>
              <img
                src={
                  data?.media_details?.sizes?.thumbnail?.source_url ??
                  "/Vector.svg"
                }
                className="img-logo"
                alt=""
                id={`map-element-${id}`}
                onClick={() => {
                  isActionRef.current = true;
                  setHover(true);
                }}
              />

              {isDefined(selectedIndex) && (
                <ChipWrapperPrimary className="chip">
                  {selectedIndex}
                </ChipWrapperPrimary>
              )}

              {/* {hover === true && (
                <HoverCard>
                  <PlaceCard
                    name={name}
                    countryShort={countryShort}
                    city={city}
                    className="place-card"
                    onAdd={() => {}}
                    onRemove={() => {}}
                  />
                </HoverCard>
              )} */}
            </MapElementTooltipWrapper>
          </Tooltip>
        </>
      </CircleMarker>

      {hover === true && (
        <CircleMarker
          {...map}
          center={center}
          pathOptions={{
            zIndex: "9999",
            color: "transparent",
            weight: 2,
            opacity: 1,
            fillOpacity: 1,
            fillColor: "transparent",
          }}
          radius={20}
        >
          <>
            <Tooltip
              interactive={true}
              permanent
              direction="top"
              offset={[0, -10]}
              opacity={1}
            >
              <TooltipCardWrapper
                hover={hover}
                onClick={() => {
                  isActionRef.current = true;
                }}
              >
                <PlaceCard
                  name={name}
                  countryShort={countryShort}
                  city={city}
                  className="place-card"
                  onAdd={() =>
                    onSelect?.(
                      data?.media_details?.sizes?.thumbnail?.source_url
                    )
                  }
                  onRemove={() =>
                    onSelect?.(
                      data?.media_details?.sizes?.thumbnail?.source_url
                    )
                  }
                  onShowInfo={() =>
                    onShowInfo?.(
                      data?.media_details?.sizes?.medium_large?.source_url
                    )
                  }
                  thumbnail={data?.media_details?.sizes?.thumbnail?.source_url}
                  isSelected={isSelected}
                />
              </TooltipCardWrapper>
            </Tooltip>
          </>
        </CircleMarker>
      )}
    </>
  );
};

export default MapElement;
