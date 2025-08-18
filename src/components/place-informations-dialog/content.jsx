"use client";
import Image from "next/image";
import { FooterWrapper, HeadWrapper, TimesBtnWrapper, Wrapper } from "./style";
import { useTranslations } from "next-intl";
import ButtonBasic from "../buttons/button-basic";
import ButtonNeutral from "../buttons/button-neutral";
import ButtonSecondary from "../buttons/button-secondary";
import PlaceFeatures from "./place-features";
import ButtonTransparent from "../buttons/button-transparent";

export default function PlaceInformationsDialogContent({
  id,
  name,
  thumbnail,
  countryShort,
  city,
  onSelect = () => {},
  shortDescription,
  feature,
  selectedLocations,
  link,
  onClose = () => {},
}) {
  const t = useTranslations("general");

  return (
    <Wrapper>
      <TimesBtnWrapper>
        <ButtonTransparent size="small" onClick={onClose}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      </TimesBtnWrapper>

      <Image
        className="head-img"
        src={thumbnail || "/Vector.svg"}
        width="600"
        height="3000"
        alt=""
      />
      <HeadWrapper>
        <div className="head-main-txt">{name}</div>
        <div className="tour-item-txt">
          {countryShort}&nbsp; <i className="fi fi-rs-arrow-small-right" />
          &nbsp;{city}
        </div>
      </HeadWrapper>
      <div>{shortDescription}</div>
      {feature?.length > 0 && <PlaceFeatures featuresIds={feature} />}
      <FooterWrapper>
        {!selectedLocations?.some((y) => y?.id === id) ? (
          <ButtonSecondary
            className="add-place-btn"
            size="small"
            onClick={onSelect}
          >
            <i className="fi fi-rs-plus i-16" />
            {t("add")}
          </ButtonSecondary>
        ) : (
          <ButtonNeutral
            className="add-place-btn"
            size="small"
            onClick={onSelect}
          >
            <i className="fi fi-rs-minuss i-16" />
            {t("remove")}
          </ButtonNeutral>
        )}
        <ButtonBasic
          size="small"
          className=""
          onClick={() => window.open(link, "_blank")}
        >
          <i className="fi fi-rs-info i-16" />
          &nbsp;
          {t("readMore")}
        </ButtonBasic>
      </FooterWrapper>
    </Wrapper>
  );
}
