"use client";

import { useRef } from "react";
import ChooseLanguageModal from "../choose-language-modal";
import MainMenuDesktop from "./main-menu-desktop";
import OpenSavedToursModal from "../open-saved-tours-modal";
import Navbar from "../layout/navbar";
import SearchPlacesAndHashtags from "../search-places-and-hashtags";
import LoginModal from "../login-modal";

export default function MainMenu({
  onOpenTour = () => {},
  onSaveTour = () => {},
  canSaveTour = false,
  onGetNavigationUrl = () => {},
  onSearchSelectPlace = () => {},
  onSetUser = () => {},
  onLogout = () => {},
  authUser
}) {
  const loginModalRef = useRef();
  const languageModalRef = useRef();
  const openSavedTourModalRef = useRef();
  const searchRef = useRef();

  const onSearch = () => {
    searchRef?.current?.showModal();
  };

  return (
    <>
      <MainMenuDesktop
        onChangeLanguage={() => languageModalRef?.current?.showModal()}
        onOpenSavedTours={() => openSavedTourModalRef?.current?.showModal()}
        onShareTour={() => {}}
        onExitTourBuilder={() => {}}
        onSearch={onSearch}
        onLogin={() => loginModalRef?.current?.showModal()}
        authUser={authUser}
        onLogout={() => onLogout()}
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
        onLogin={() => loginModalRef?.current?.showModal()}
        authUser={authUser}
        onLogout={() => onLogout()}
      />

      <ChooseLanguageModal ref={languageModalRef} />
      <LoginModal ref={loginModalRef} onSetUser={onSetUser}/>
      <OpenSavedToursModal
        ref={openSavedTourModalRef}
        onOpenTour={onOpenTour}
        authUser={authUser}
      />

      <SearchPlacesAndHashtags
        ref={searchRef}
        onSelectPlace={(x) => {
          onSearchSelectPlace(x);
          searchRef?.current?.close();
        }}
      />
    </>
  );
}
