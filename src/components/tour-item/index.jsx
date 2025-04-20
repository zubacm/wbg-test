"use client";

import Image from "next/image";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import React from "react";
import ButtonTransparent from "../buttons/button-transparent";
import { usePlaceImage } from "@/app/api/locations/queries";

export default function TourItem({
  id,
  thumbnail,
  name,
  city,
  countryShort,
  displaySequence = 1,
  onRemoveLocation = () => {},
  featuredMedia,
}) {
  const t = useTranslations("general");
  const { data } = usePlaceImage(featuredMedia);

  return (
    <Wrapper>
      <div className="chevron-icons">
        <i className="fi fi-rs-sort" />
      </div>
      <Image
        src={
          thumbnail ||
          data?.media_details?.sizes?.thumbnail?.source_url ||
          "/Vector.svg"
        }
        width="64"
        height="60"
        className="place-img"
        alt=""
      />
      <div className="tour-item-content">
        <div className="tour-item-main-txt">
          {/* <span className="gray-txt">{(index + 1)}.</span> */}
          &nbsp;{name}
        </div>
        <div className="tour-item-txt">
          {countryShort}&nbsp; <i className="fi fi-rs-arrow-small-right" />
          &nbsp;{city}
        </div>
      </div>
      <ButtonTransparent
        className="times-btn"
        size="small"
        onClick={() => onRemoveLocation(id)}
      >
        <i className="fi fi-rs-cross i-16" />
      </ButtonTransparent>
    </Wrapper>
  );
}
