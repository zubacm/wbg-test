"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import Image from "next/image";
import { MainTab, NavbarSection, NavbarWrapper, VerticalLine } from "./style";
import { useTranslations } from "next-intl";
import React from "react";
import MobileMenu from "./mobile-menu";

export default function Navbar({
  onSaveTour,
  onShareTour,
  onExitTourBuilder,
  onOpenSavedTours,
  canSaveTour = false,
  onGetNavigationUrl,
  onSearch
}) {
  const t = useTranslations("general");

  return (
    <NavbarWrapper>
      <MainTab>
        <Image
          src="/Vector.svg"
          width="32"
          height="44"
          className="img-logo"
          alt=""
        />
        <div>{t("appName")}</div>
      </MainTab>
      <VerticalLine className="no-medium" />

      <NavbarSection>
        {/* search */}
        <ButtonBasic
          className="menu-btn-desktop menu-btn-desktop-search"
          // onClick={toggleExpand}
          onClick={() => onSearch()}
        >
          <i className="fi-rs-search i-20" />
        </ButtonBasic>
        <VerticalLine />
        {/* <ButtonBasic className="no-medium">{t("login")}</ButtonBasic> */}
        <MobileMenu
          onSaveTour={onSaveTour}
          onShareTour={onShareTour}
          onExitTourBuilder={onExitTourBuilder}
          onOpenSavedTours={onOpenSavedTours}
          canSaveTour={canSaveTour}
          onGetNavigationUrl={onGetNavigationUrl}
          onSearch={onSearch}
        />
      </NavbarSection>
    </NavbarWrapper>
  );
}
