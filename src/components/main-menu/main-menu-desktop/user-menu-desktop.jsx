"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useState } from "react";
import { MenuItem } from "./style";
import { isDefined } from "@/lib/util";

const KEY = {
  OPEN_SAVED_TOURS: "open-saved-tours",
  CHANGE_LANGUAGE: "change-language",
  EXIT_TOUR_BUILDER: "exit-tour-builder",
  LOGIN: "login",
  LOGOUT: "logout",
};

export default function UserMenuDesktop({
  onExitTourBuilder,
  onChangeLanguage,
  onOpenSavedTours,
  onLogin,
  onLogout,
  authUser,
}) {
  const t = useTranslations("general");
  const [selectedKeys, setSelectedKeys] = useState(new Set("0"));

  const handleAction = (key) => {
    if (key === KEY.LOGOUT) {
      onLogout?.();
    } else if (key === KEY.LOGIN) {
      onLogin?.();
    } else if (key === KEY.OPEN_SAVED_TOURS) {
      onOpenSavedTours?.();
    } else if (key === KEY.CHANGE_LANGUAGE) {
      onChangeLanguage?.();
    } else if (key === KEY.EXIT_TOUR_BUILDER) {
      onExitTourBuilder?.();
    }
  };

  return (
    <Dropdown
      className="dropdown"
      backdrop="transparent"
      offset={7}
      placement="bottom"
      radius="lg"
      shadow="md"
      size="md"
      triggerScaleOnOpen
    >
      <DropdownTrigger className="dropdown-trigger-user-menu">
        <div className="basic-btn-external-wrapper">
          <ButtonBasic className="menu-btn-desktop">
            <i className="fi-rs-user i-20" />
            &nbsp;
            {authUser?.username}
            <i className="fi-rs-angle-small-down i-16" />
          </ButtonBasic>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
        onAction={(key) => handleAction(key)}
      >
        {isDefined(authUser?.username) ? (
          <DropdownItem key={KEY.LOGOUT}>
            <MenuItem>
              <i className="fi-rs-user i-16" />
              &nbsp;
              <div>{t("logout")}</div>
            </MenuItem>
          </DropdownItem>
        ) : (
          <DropdownItem key={KEY.LOGIN}>
            <MenuItem>
              <i className="fi-rs-user i-16" />
              &nbsp;
              <div>{t("login")}</div>
            </MenuItem>
          </DropdownItem>
        )}

        <DropdownItem key={KEY.OPEN_SAVED_TOURS}>
          <MenuItem>
            <i className="fi-rs-folder-open i-16" />
            &nbsp;
            <div>{t("openSavedTours")}</div>
          </MenuItem>
        </DropdownItem>
        <DropdownItem key={KEY.CHANGE_LANGUAGE}>
          <MenuItem>
            <i className="fi-rs-earth-americas i-16" />
            &nbsp;
            <div>{t("changeLanguage")}</div>
          </MenuItem>
        </DropdownItem>
        <DropdownItem key={KEY.EXIT_TOUR_BUILDER}>
          <MenuItem>
            <i className="fi-rs-cross i-16" />
            &nbsp;
            <div>{t("exitTourBuilder")}</div>
          </MenuItem>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
