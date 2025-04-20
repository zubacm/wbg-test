"use client";

import { useRef } from "react";
import ChooseLanguageModal from "../choose-language-modal";
import MainMenuDesktop from "./main-menu-desktop";
import OpenSavedToursModal from "../open-saved-tours-modal";
import Navbar from "../layout/navbar";
import SearchPlacesAndHashtags from "../search-places-and-hashtags";

export default function MainMenu({
  onOpenTour = () => {},
  onSaveTour = () => {},
  canSaveTour = false,
  onGetNavigationUrl = () => {},
}) {
  const languageModalRef = useRef();
  const openSavedTourModalRef = useRef();
  const searchRef = useRef();

  const onSearch = () => {
    searchRef?.current?.showModal();
  }

  return (
    <>
      <MainMenuDesktop
        onChangeLanguage={() => languageModalRef?.current?.showModal()}
        onOpenSavedTours={() => openSavedTourModalRef?.current?.showModal()}
        onShareTour={() => {}}
        onExitTourBuilder={() => {}}
        onSearch={onSearch}
      />

      {/* rename to mobile mainmenu */}
      <Navbar
        onChangeLanguage={() => languageModalRef?.current?.showModal()}
        onOpenSavedTours={() => openSavedTourModalRef?.current?.showModal()}
        onShareTour={() => {}}
        onExitTourBuilder={() => {}}
        onSaveTour={onSaveTour}
        canSaveTour={canSaveTour}
        onGetNavigationUrl={onGetNavigationUrl}
        onSearch={onSearch}
      />

      <ChooseLanguageModal ref={languageModalRef} />
      <OpenSavedToursModal
        ref={openSavedTourModalRef}
        onOpenTour={onOpenTour}
      />

      <SearchPlacesAndHashtags ref={searchRef}/>
    </>
  );
}
