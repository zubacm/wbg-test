"use client";

import Image from "next/image";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import React from "react";
import HorizontalLine from "@/components/horizontal-line";

export default function TourGuideSidebarHeader() {
  const t = useTranslations("general");

  return (
    <>
      <Wrapper>
        <Image
          src="/Vector.svg"
          width="32"
          height="44"
          className="img-logo"
          alt=""
        />
        <div className="app-name">{t("appName")}</div>
        <div className="page-name">{t("tourBuilder")?.toUpperCase()}</div>
        <div><i className="fi fi-rs-home i-20"/></div>
      </Wrapper>
      <HorizontalLine color="var(--gray-20)" />
    </>
  );
}
