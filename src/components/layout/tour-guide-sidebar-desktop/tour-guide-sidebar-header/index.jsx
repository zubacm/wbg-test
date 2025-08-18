"use client";

import Image from "next/image";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import HorizontalLine from "@/components/horizontal-line";
import ButtonTransparent from "@/components/buttons/button-transparent";
import ButtonNeutral from "@/components/buttons/button-neutral";

export default function TourGuideSidebarHeader({
  hasSelectedLocations,
  onToggleShowOnlySelected,
}) {
  const t = useTranslations("general");

  const handleNavigate = () => {
    window.open(`https://westbalkanguide.com/`, "_blank");
  };

  const [showSelected, setShowSelected] = useState(false);
  const handleShowAll = () => {
    setShowSelected(!showSelected);
    onToggleShowOnlySelected();
  };

  return (
    <>
      <Wrapper onClick={handleNavigate}>
        <Image
          src="/Vector.svg"
          width="32"
          height="44"
          className="img-logo"
          alt=""
        />
        <div className="app-name">{t("appName")}</div>
        <div className="page-name">{t("tourBuilder")?.toUpperCase()}</div>
        <div>
          <i className="fi fi-rs-home i-20" />
        </div>
      </Wrapper>
      <HorizontalLine color="var(--gray-20)" />
      {hasSelectedLocations && (
        <ButtonNeutral size="small" onClick={handleShowAll}>
          <i className="fi fi-rs-eye i-16" />
          &nbsp;{" "}
          {showSelected === true
            ? t("showAllPlaces")
            : t("showOnlyPlacesFromRoute")}
        </ButtonNeutral>
      )}
    </>
  );
}
