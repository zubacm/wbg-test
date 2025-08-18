"use client";

import Image from "next/image";
import { FiltersTitle, Wrapper } from "./style";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import FiltersContent from "@/components/filters/filters-content";
import HorizontalLine from "@/components/horizontal-line";
import TourItemsDnd from "@/components/tour-items-dnd";
import TourGuideSidebarHeader from "./tour-guide-sidebar-header";
import { ChipWrapper } from "@/app/style";
import { useSearchParams } from "next/navigation";
import {
  COUNTRIES_FILTER_NAME,
  FEATURES_FILTER_NAME,
  HASHTAGS_FILTER_NAME,
  TYPES_FILTER_NAME,
} from "@/lib/consts/style-consts";
import { EditableTourName } from "@/components/editable-tour-name";

export default function TourGuideSidebarDesktop({
  selectedLocations,
  onClearAll,
  onSwap,
  onRemoveLocation,
  onSaveTour = () => {},
  onChangeTourTitle,
  tourName,
  onGetNavigationUrl,
  onStartNavigation = () => {},
  onToggleShowOnlySelected = () => {},
}) {
  const t = useTranslations("general");

  const searchParams = useSearchParams();
  const countriesFilterCount =
    searchParams?.get(COUNTRIES_FILTER_NAME)?.split(",")?.length || 0;
  const featFilterCount =
    searchParams?.get(FEATURES_FILTER_NAME)?.split(",")?.length || 0;
  const typesFilterCount =
    searchParams?.get(TYPES_FILTER_NAME)?.split(",")?.length || 0;
  const hashtFilterCount =
    searchParams?.get(HASHTAGS_FILTER_NAME)?.split(",")?.length || 0;

  return (
    <>
      <Wrapper>
        <TourGuideSidebarHeader
          hasSelectedLocations={selectedLocations?.length > 0}
          onToggleShowOnlySelected={onToggleShowOnlySelected}
        />
        <EditableTourName
          key={`tour__name__${tourName}`}
          tourName={tourName}
          chipsValue={selectedLocations?.length}
          onChangeTourTitle={onChangeTourTitle}
        />
        {selectedLocations?.length > 0 ? (
          <TourItemsDnd
            key={`dnd__${selectedLocations?.length}`}
            selectedLocations={selectedLocations}
            onSaveTour={() => onSaveTour?.()}
            onClearAll={onClearAll}
            onSwap={onSwap}
            onRemoveLocation={onRemoveLocation}
            onGetNavigationUrl={onGetNavigationUrl}
            onStartNavigation={onStartNavigation}
          />
        ) : (
          <div className="light-text">{t("selectLocationsFromTheMap")}</div>
        )}
        <HorizontalLine color="var(--gray-20)" />
        <FiltersTitle>
          <span className="title-txt">
            <i className="fi fi-rs-settings-sliders i-20" />
            <span>{t("filters")}</span>
          </span>
          {countriesFilterCount +
            featFilterCount +
            typesFilterCount +
            hashtFilterCount >
            0 && (
            <ChipWrapper>
              {countriesFilterCount +
                featFilterCount +
                typesFilterCount +
                hashtFilterCount}
            </ChipWrapper>
          )}
        </FiltersTitle>
        <FiltersContent />
      </Wrapper>
    </>
  );
}
