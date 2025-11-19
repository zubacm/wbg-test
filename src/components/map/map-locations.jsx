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
import { useImperativeHandle, useMemo, useState } from "react";
import unionBy from "lodash.unionby";

const MapLocations = ({
  ref,
  onSelectPlace,
  selectedIndex,
  onAction,
  onZoomPlace,
  selectedLocations,
  onShowInfo,
  placesFiler,
  ...rest
}) => {
  // const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchedPlace, setSearchedPlace] = useState();

  const textFilter = searchParams?.get(TEXT_FILTER_NAME) || "";
  const countriesFilter = searchParams?.get(COUNTRIES_FILTER_NAME)?.split(",");
  const featFilter = searchParams?.get(FEATURES_FILTER_NAME)?.split(",");
  const typesFilter = searchParams?.get(TYPES_FILTER_NAME)?.split(",");
  const hashtFilter = searchParams?.get(HASHTAGS_FILTER_NAME)?.split(",");

  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const { data, isLoading } = usePlaces({
    countries: countriesFilter,
    features: featFilter,
    types: typesFilter,
    hashtags: hashtFilter,
    locations: placesFiler?.map((x) => x?.value),
    text: textFilter,
  });
  const map = useMap();

  const uniquePlaces = useMemo(() => {
    if (showOnlySelected === true) return selectedLocations;

    let result = unionBy(data || [], selectedLocations || [], "id");

    // const arr2 = Object.fromEntries(
    //   (selectedLocations || []).map((o) => [o.id, o])
    // );
    // const result = data?.map((o) => arr2[o.id] || o);

    // let arr = [...(data || []), ...(selectedLocations || [])];
    // const result = Array.from(arr)
    //   .reduce((m, o) => m.set(o.id, o), new Map())
    //   .values();

    return result;
  }, [data, selectedLocations, showOnlySelected]);

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    addSearchedPlace(newPlace) {
      if (uniquePlaces?.some((x) => x?.id === newPlace?.id)) {
        map.setView([
          +newPlace?.acf?.location?.lat,
          +newPlace?.acf?.location?.lng,
        ]);
        document.getElementById(`map-element-${newPlace?.id}`)?.click();
      } else {
        setSearchedPlace(newPlace);
        map.setView([
          newPlace?.acf?.location?.lat,
          newPlace?.acf?.location?.lng,
        ]);
      }
    },
    toggleShowOnlySelectedLocations() {
      setShowOnlySelected(!showOnlySelected);
    },
  }));

  return (
    <>
      {uniquePlaces?.map((x, index) => (
        <MapElement
          key={`location__${index}`}
          id={x?.id}
          countryShort={x?.acf?.location?.country_short}
          city={x?.acf?.location?.city}
          media={x?.featured_media}
          center={[x?.acf?.location?.lat, x?.acf?.location?.lng]}
          selectedIndex={selectedIndex}
          thumbnail={x?.acf?.marker?.sizes?.medium}
          // name={x?.acf?.location?.name}
          name={x?.title?.rendered}
          onSelect={(thumbnail) =>
            onSelectPlace?.({
              id: x?.id,
              // thumbnail: thumbnail,
              thumbnail: x?.acf?.marker?.sizes?.medium,
              countryShort: x?.acf?.location?.country_short,
              city: x?.acf?.location?.city,
              name: x?.title?.rendered,
              lat: x?.acf?.location?.lat,
              lng: x?.acf?.location?.lng,
              shortDescription: x?.acf?.short_description,
              ...x,
            })
          }
          onZoomPlace={() => {
            // console.log("xxx", x)
            map.setView([+x?.acf?.location?.lat, +x?.acf?.location?.lng]);
            // map.setZoom(12);
            setTimeout(() => {
              map.setZoom(15);
            }, [500]);
          }}
          isSelected={selectedLocations?.some((y) => y?.id === x?.id)}
          onShowInfo={(thumbnail) =>
            onShowInfo?.({
              ...x,
              id: x?.id,
              // thumbnail: thumbnail,
              thumbnail: x?.acf?.marker?.sizes?.medium,
              countryShort: x?.acf?.location?.country_short,
              city: x?.acf?.location?.city,
              name: x?.title?.rendered,
              lat: x?.acf?.location?.lat,
              lng: x?.acf?.location?.lng,
              shortDescription: x?.acf?.short_description,
              feature: x?.feature,
            })
          }
        />
      ))}

      {searchedPlace?.id !== null && searchedPlace?.id !== undefined && (
        <MapElement
          id={searchedPlace?.id}
          countryShort={searchedPlace?.acf?.location?.country_short}
          city={searchedPlace?.acf?.location?.city}
          media={searchedPlace?.featured_media}
          center={[
            searchedPlace?.acf?.location?.lat,
            searchedPlace?.acf?.location?.lng,
          ]}
          selectedIndex={selectedIndex}
          name={searchedPlace?.title?.rendered}
          onSelect={(thumbnail) =>
            onSelectPlace?.({
              id: searchedPlace?.id,
              thumbnail: searchedPlace?.acf?.marker?.sizes?.medium,
              countryShort: searchedPlace?.acf?.location?.country_short,
              city: searchedPlace?.acf?.location?.city,
              name: searchedPlace?.title?.rendered,
              lat: searchedPlace?.acf?.location?.lat,
              lng: searchedPlace?.acf?.location?.lng,
              shortDescription: searchedPlace?.acf?.short_description,
              ...searchedPlace,
            })
          }
          onZoomPlace={() => {
            map.setView([
              searchedPlace?.acf?.location?.lat,
              searchedPlace?.acf?.location?.lng,
            ]);
            // map.setZoom(20);
          }}
           thumbnail={x?.acf?.marker?.sizes?.medium}
          isSelected={selectedLocations?.some((y) => y?.id === x?.id)}
          onShowInfo={(thumbnail) =>
            onShowInfo?.({
              id: searchedPlace?.id,
              thumbnail: searchedPlace?.acf?.marker?.sizes?.medium,
              countryShort: searchedPlace?.acf?.location?.country_short,
              city: searchedPlace?.acf?.location?.city,
              name: searchedPlace?.title?.rendered,
              lat: searchedPlace?.acf?.location?.lat,
              lng: searchedPlace?.acf?.location?.lng,
              shortDescription: searchedPlace?.acf?.short_description,
              feature: searchedPlace?.feature,
            })
          }
        />
      )}
      {/* <MapElement center={[44.7722, 17.191]} />
      <MapElement center={[44.8722, 17.391]} /> */}
    </>
  );
};

export default MapLocations;
