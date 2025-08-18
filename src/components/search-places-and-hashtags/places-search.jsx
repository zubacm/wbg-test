/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef } from "react";
import { SearchPlacesContent, SearchPlacesItem, Wrapper } from "./style";
import { usePlaceImage, usePlacesSearch } from "@/app/api/locations/queries";
import { ClipLoader } from "react-spinners";
import { Image } from "@nextui-org/react";

const PlacesSearch = forwardRef(({ search, onSelectPlace = () => {} }, ref) => {
  const { data, isLoading } = usePlacesSearch({
    text: search,
    disabled: !(search?.length > 0),
  });

  return (
    <SearchPlacesContent>
      <div className="center-loader-wrapper">
        <ClipLoader
          color="var(--primary-100)"
          loading={isLoading}
          size={"30px"}
        />
      </div>
      {data?.map((x, index) => (
        <PlaceSearch
          id={`option-item-${index + 1}`}
          key={`place__search__${x?.id}`}
          name={x?.title?.rendered}
          countryShort={x?.acf?.location?.country_short}
          featuredMedia={x?.featured_media}
          boldStaringIndex={
            x?.title?.rendered?.length >= 0
              ? x?.title?.rendered?.indexOf(search)
              : 0
          }
          boldEndingIndex={
            x?.title?.rendered?.length >= 0
              ? x?.title?.rendered?.indexOf(search) + search?.length
              : 0
          }
          onSelectPlace={() => onSelectPlace(x)}
        />
      ))}
    </SearchPlacesContent>
  );
});

export default PlacesSearch;

const PlaceSearch = forwardRef(
  (
    {
      id,
      name,
      boldStaringIndex,
      boldEndingIndex,
      countryShort,
      featuredMedia,
      onSelectPlace = () => {},
    },
    ref
  ) => {
    const { data } = usePlaceImage(featuredMedia);

    return (
      <SearchPlacesItem onClick={onSelectPlace}>
        <div className="thumbnail-img" id={id}>
          <img
            src={
              data?.media_details?.sizes?.thumbnail?.source_url || "/Vector.svg"
            }
          />
          {/* <Image
            src={
              data?.media_details?.sizes?.thumbnail?.source_url || "/Vector.svg"
            }
            width="20"
            height="20"
            alt=""
          /> */}
        </div>
        <Image
          src={"/" + countryShort?.toLowerCase() + ".svg"}
          width="16"
          height="16"
          alt=""
        />
        <div className="name">
          {boldStaringIndex >= 0 && boldEndingIndex >= 0 ? (
            <>
              {boldStaringIndex === 0 ? (
                <>
                  <span className="bld">{name?.slice(boldEndingIndex)}</span>
                  <span>{name?.slice(boldEndingIndex, name?.length)}</span>
                </>
              ) : (
                <>
                  {" "}
                  <span>{name?.slice(0, boldStaringIndex)}</span>
                  <span className="bld">
                    {name?.slice(boldStaringIndex, boldEndingIndex)}
                  </span>
                  <span>{name?.slice(boldEndingIndex, name?.length)}</span>
                </>
              )}
            </>
          ) : (
            name
          )}
        </div>
        <i className="fi fi-rs-arrow-small-right arrow-icon" />
      </SearchPlacesItem>
    );
  }
);
