"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import ButtonNeutral from "@/components/buttons/button-neutral";
import {
  Backdrop,
  MobileMenuDrawerContent,
  MobileNavigationWrapper,
  MobileWrapper,
} from "./style";
import { useTranslations } from "next-intl";
import { Drawer, DrawerContent, useDisclosure } from "@nextui-org/react";
import HorizontalLine from "@/components/horizontal-line";
import MobileMenuFooter from "./mobile-menu-footer";
import { MenuItem } from "@/components/main-menu/main-menu-desktop/style";
import ShareButton from "@/components/share-button";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu({
  onSaveTour = () => {},
  onShareTour = () => {},
  onExitTourBuilder = () => {},
  onOpenSavedTours = () => {},
  canSaveTour = false,
  onGetNavigationUrl = () => {},
  onSearch = () => {},
}) {
  const t = useTranslations("general");
  const shareButtonRef = useRef();
  // const generalTranslation = useTranslations("general");
  const [open, setOpen] = useState(false);
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <MobileWrapper className="sis">
        <div className="sfsf">
          <ButtonBasic
            onClick={(e) => {
              setOpen(!open);
            }}
          >
            <i
              className={
                open === true
                  ? "fi fi-rs-cross i-20"
                  : "fi fi-rs-bars-staggered i-20"
              }
            />
          </ButtonBasic>
        </div>

        <Drawer
          size="5xl"
          isOpen={open}
          // onOpenChange={onOpenChange}
          placement="top"
        >
          <DrawerContent>
            {(onClose) => (
              <>
                {/* <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader> */}
                {/* <DrawerBody> */}
                <MobileMenuDrawerContent>
                  {/* {open === true &&
                    createPortal(
                      <Backdrop
                        className="back"
                        onClick={() => setOpen(false)}
                      />,
                      document.body
                    )} */}

                  <div className="padded-div">
                    <ButtonNeutral className="login-btn" center={true}>
                      {t("login")}
                    </ButtonNeutral>
                  </div>
                  <HorizontalLine />
                  <div className="padded-div">
                    {canSaveTour === true && (
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          onSaveTour();
                          onClose();
                        }}
                      >
                        <i className="fi-rs-disk i-16" />
                        <div>{t("saveTour")}</div>
                      </MenuItem>
                    )}

                    <ShareButton ref={shareButtonRef}>
                      <MenuItem
                        className="menu-item"
                        onClick={() => {
                          const tourPath = onGetNavigationUrl();

                          shareButtonRef?.current?.toggle(tourPath);
                        }}
                      >
                        <i className="fi-rs-share i-16" />
                        <div>{t("shareTour")}</div>
                      </MenuItem>
                    </ShareButton>

                    <MenuItem
                      className="menu-item"
                      onClick={() => {
                        onOpenSavedTours();
                        onClose();
                      }}
                    >
                      <i className="fi-rs-folder-open i-16" />
                      <div>{t("openSavedTours")}</div>
                    </MenuItem>
                    <MenuItem
                      className="menu-item"
                      onClick={() => {
                        onExitTourBuilder();
                        onClose();
                      }}
                    >
                      <i className="fi-rs-cross i-16" />
                      <div>{t("exitTourBuilder")}</div>
                    </MenuItem>
                    {/* <MobileNavigationWrapper>
                    <NavbarItem>{generalTranslation("home")}</NavbarItem>
                    <NavbarItem isActive={true}>
                      {generalTranslation("discover")}
                    </NavbarItem>
                    <NavbarItem>{generalTranslation("tours")}</NavbarItem>
                    <NavbarItem>{generalTranslation("makeATour")}</NavbarItem>
                  </MobileNavigationWrapper> */}
                  </div>
                  <MobileMenuFooter />
                </MobileMenuDrawerContent>

                {/* </DrawerBody> */}
                {/* <DrawerFooter>og</DrawerFooter> */}
              </>
            )}
          </DrawerContent>
        </Drawer>
      </MobileWrapper>
    </>
  );
}
