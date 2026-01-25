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
  onSearch,
  authUser,
  onLogin,
  onLogout,
}) {
  const t = useTranslations("general");

  const handleNavigate = () => {
    window.open(`https://westbalkanguide.com/`, "_blank");
  };

  return (
    <NavbarWrapper>
      <MainTab onClick={handleNavigate}>
        <Image
          src="/Vector.svg"
          width="32"
          height="44"
          className="img-logo"
          alt=""
        />
        <div>{t("appName")}</div>
        <div className="page-name-mob">{t("tourBuilder")?.toUpperCase()}</div>
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
          onLogin={onLogin}
          authUser={authUser}
          onLogout={onLogout}
        />
      </NavbarSection>
    </NavbarWrapper>
  );
}
