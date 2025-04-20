"use client";
import Image from "next/image";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import ButtonBasic from "../buttons/button-basic";

export default function PlaceCard({
  name,
  thumbnail,
  countryShort,
  city,
  onSelect = () => {},
  onAdd = () => {},
  onRemove = () => {},
  onShowInfo = () => {},
  isSelected = false,
}) {
  const t = useTranslations("general");

  return (
    <Wrapper className="place-card">
      <Image
        className="cover-img"
        src={thumbnail || "/Vector.svg"}
        width="212"
        height="140"
        alt=""
      />
      <div className="txt-content">
        <div className="head-text">{name}</div>
        <div className="tour-item-txt">
          {countryShort}&nbsp; <i className="fi fi-rs-arrow-small-right" />
          &nbsp;{city}
        </div>
        <div className="card-footer">
          {isSelected !== true ? (
            <ButtonBasic
              id="add-place-btn"
              size="small"
              className=""
              onClick={onAdd}
            >
              <i className="fi fi-rs-plus i-16" />
              {t("add")}
            </ButtonBasic>
          ) : (
            <ButtonBasic
              id="add-place-btn"
              size="small"
              className=""
              onClick={onRemove}
            >
              <i className="fi fi-rs-minuss i-16" />
              {t("remove")}
            </ButtonBasic>
          )}
          <i className="fi fi-rs-info i-16" onClick={() => onShowInfo?.()} />
        </div>
      </div>
    </Wrapper>
  );
}
