"use client";

import { useMap } from "react-leaflet";
import MapElement from "./map-element";
import { usePlaces } from "@/app/api/locations/queries";
import { useSearchParams } from "next/navigation";
import {
  COUNTRIES_FILTER_NAME,
  FEATURES_FILTER_NAME,
  HASHTAGS_FILTER_NAME,
  TEXT_FILTER_NAME,
  TYPES_FILTER_NAME,
} from "@/lib/consts/style-consts";
import { useMemo } from "react";
import unionBy from "lodash.unionby";

const MapLocations = ({
  onSelectPlace,
  selectedIndex,
  onAction,
  onZoomPlace,
  selectedLocations,
  onShowInfo,
  ...rest
}) => {
  // const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();

  const textFilter = searchParams?.get(TEXT_FILTER_NAME) || "";
  const countriesFilter = searchParams?.get(COUNTRIES_FILTER_NAME)?.split(",");
  const featFilter = searchParams?.get(FEATURES_FILTER_NAME)?.split(",");
  const typesFilter = searchParams?.get(TYPES_FILTER_NAME)?.split(",");
  const hashtFilter = searchParams?.get(HASHTAGS_FILTER_NAME)?.split(",");

  const { data, isLoading } = usePlaces({
    countries: countriesFilter,
    features: featFilter,
    types: typesFilter,
    hashtags: hashtFilter,
    text: textFilter,
  });
  const map = useMap();

  const uniquePlaces = useMemo(() => {
    let result = unionBy((data || []), (selectedLocations || []), 'id');

    // const arr2 = Object.fromEntries(
    //   (selectedLocations || []).map((o) => [o.id, o])
    // );
    // const result = data?.map((o) => arr2[o.id] || o);

    // let arr = [...(data || []), ...(selectedLocations || [])];
    // const result = Array.from(arr)
    //   .reduce((m, o) => m.set(o.id, o), new Map())
    //   .values();

    return result;
  }, [data, selectedLocations]);

  return (
    <>
      {uniquePlaces?.map((x, index) => (
        <MapElement
          key={`location__${index}`}
          countryShort={x?.acf?.location?.country_short}
          city={x?.acf?.location?.city}
          media={x?.featured_media}
          center={[x?.acf?.location?.lat, x?.acf?.location?.lng]}
          selectedIndex={selectedIndex}
          name={x?.acf?.location?.name}
          onSelect={(thumbnail) =>
            onSelectPlace?.({
              id: x?.id,
              thumbnail: thumbnail,
              countryShort: x?.acf?.location?.country_short,
              city: x?.acf?.location?.city,
              name: x?.acf?.location?.name,
              lat: x?.acf?.location?.lat,
              lng: x?.acf?.location?.lng,
              shortDescription: x?.acf?.short_description,
              ...x,
            })
          }
          onZoomPlace={() => {
            map.setView([x?.acf?.location?.lat, x?.acf?.location?.lng]);
            // map.setZoom(20);
          }}
          isSelected={selectedLocations?.some((y) => y?.id === x?.id)}
          onShowInfo={(thumbnail) =>
            onShowInfo?.({
              id: x?.id,
              thumbnail: thumbnail,
              countryShort: x?.acf?.location?.country_short,
              city: x?.acf?.location?.city,
              name: x?.acf?.location?.name,
              lat: x?.acf?.location?.lat,
              lng: x?.acf?.location?.lng,
              shortDescription: x?.acf?.short_description,
              feature: x?.feature,
            })
          }
        />
      ))}
      {/* <MapElement center={[44.7722, 17.191]} />
      <MapElement center={[44.8722, 17.391]} /> */}
    </>
  );
};

export default MapLocations;
