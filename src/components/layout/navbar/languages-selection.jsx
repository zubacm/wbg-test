"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import Image from "next/image";
import { LanguageItem } from "./style";
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/dropdown";
import React, { useState } from "react";
import { DefaultLanguageKey, Languages } from "@/lib/consts/language";
import { isDefined } from "@/lib/util";

export default function LanguagesSelection() {
  const t = useTranslations("languages");
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([DefaultLanguageKey])
  );

  return (
    <Dropdown
      backdrop="transparent"
      offset={7}
      placement="bottom"
      radius="lg"
      shadow="md"
      size="md"
      triggerScaleOnOpen
    >
      <DropdownTrigger>
        <ButtonBasic>
          <Image src="/planet.svg" width="20" height="20" alt="" />
          <i className="fi-rs-earth-americas i-20" />
          {isDefined(Object.entries(selectedKeys)?.at(1)?.at(1))
            ? t(Object.entries(selectedKeys)?.at(1)?.at(1))
            : t(DefaultLanguageKey)}
          <Image src="/carousel.svg" width="7" height="4" alt="" />
        </ButtonBasic>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="srb">
          <LanguageItem>
            <Image src="/srb.svg" width="20" height="20" alt="" />
            <div>{t("srb")}</div>
          </LanguageItem>
        </DropdownItem>
        {Languages?.map((lan) => (
          <DropdownItem key={`lang__${lan?.code}`}>
            <LanguageItem>
              <Image src={lan?.img} width="20" height="20" alt="" />
              <div>{t(lan.code)}</div>
            </LanguageItem>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
