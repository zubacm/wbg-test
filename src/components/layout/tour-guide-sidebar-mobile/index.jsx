"use client";

import { Header, SliderUpDown, Wrapper } from "./style";
import { useTranslations } from "next-intl";
import FiltersContent from "@/components/filters/filters-content";
import HorizontalLine from "@/components/horizontal-line";
import TourItemsDnd from "@/components/tour-items-dnd";
import { ChipWrapper } from "@/app/style";
import { useSearchParams } from "next/navigation";
import {
  COUNTRIES_FILTER_NAME,
  FEATURES_FILTER_NAME,
  HASHTAGS_FILTER_NAME,
  TYPES_FILTER_NAME,
} from "@/lib/consts/style-consts";
import ButtonNeutral from "@/components/buttons/button-neutral";
import { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { EditableTourName } from "@/components/editable-tour-name";

const LIMIT_LOCATIONS_SHOWN = 2;

export default function TourGuideSidebarMobile({
  selectedLocations,
  onClearAll,
  onSwap,
  onRemoveLocation,
  onSaveTour = () => {},
  onChangeTourTitle,
  onToggleShowAll = () => {},
  tourName,
  onStartNavigation = () => {},
  onGetNavigationUrl,
}) {
  const t = useTranslations("general");
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
        <SliderUpDown
          className="draw-up-down-div"
          onClick={() => {
            if (selectedLocations?.length > 0) {
              onToggleShowAll?.();
              setShowFilters(false);
              setShowAll(!showAll);
            }
          }}
          isOpen={showAll}
        >
          {selectedLocations?.length > 0 && (
            <>
              <i className="fi fi-rs-angle-small-down" />
            </>
          )}
        </SliderUpDown>
        <Header>
          <EditableTourName
            key={`tour__name__${tourName}`}
            tourName={tourName}
            onChangeTourTitle={onChangeTourTitle}
            // chipsValue={selectedLocations?.length}
          />
          <ButtonNeutral
            onClick={() => {
              setShowAll(false);
              setShowFilters(!showFilters);
            }}
          >
            {showFilters === true ? (
              <i className="fi fi-rs-check i-20" />
            ) : (
              <i className="fi fi-rs-settings-sliders i-20" />
            )}
          </ButtonNeutral>

          {countriesFilterCount +
            featFilterCount +
            typesFilterCount +
            hashtFilterCount >
            0 && (
            <ChipWrapper className="chip">
              {countriesFilterCount +
                featFilterCount +
                typesFilterCount +
                hashtFilterCount}
            </ChipWrapper>
          )}
        </Header>

        {showFilters !== true && (
          <>
            {showAll !== true && (
              <>
                {selectedLocations?.length > 0 ? (
                  <TourItemsDnd
                    key={`dnd__${selectedLocations?.length}`}
                    selectedLocations={selectedLocations
                      ?.sort((a, b) => a?.displaySequence - b?.displaySequence)
                      ?.slice(0, LIMIT_LOCATIONS_SHOWN)}
                    onSaveTour={() => onSaveTour?.()}
                    onClearAll={(e) => {
                      onClearAll?.();
                      setShowAll(false);
                    }}
                    onSwap={onSwap}
                    onRemoveLocation={(e) => {
                      onRemoveLocation?.(e);
                      if (selectedLocations?.length === 1) {
                        onToggleShowAll?.();
                        setShowAll(false);
                      }
                    }}
                    showAll={showAll}
                    hideActions={true}
                    onGetNavigationUrl={onGetNavigationUrl}
                  />
                ) : (
                  <div className="light-text">
                    {t("selectLocationsFromTheMap")}
                  </div>
                )}
              </>
            )}

            <Accordion
              selectedKeys={
                showAll === true ? new Set(["dnd-items"]) : new Set([""])
              }
              className="accordion-items"
            >
              <AccordionItem className="accordion-item-wbg" key="dnd-items">
                <TourItemsDnd
                  key={`dnd__all__${selectedLocations?.length}`}
                  selectedLocations={selectedLocations?.sort(
                    (a, b) => a?.displaySequence - b?.displaySequence
                  )}
                  onSaveTour={() => onSaveTour?.()}
                  onClearAll={(e) => {
                    onClearAll?.();
                    setShowAll(false);
                  }}
                  onSwap={onSwap}
                  onRemoveLocation={(e) => {
                    onRemoveLocation?.(e);
                    if (selectedLocations?.length === 1) {
                      onToggleShowAll?.();
                      setShowAll(false);
                    }
                  }}
                  showAll={showAll}
                  onStartNavigation={onStartNavigation}
                  onGetNavigationUrl={onGetNavigationUrl}
                />
              </AccordionItem>
            </Accordion>
          </>
        )}
        {/* {showFilters === true && <FiltersContent />} */}

        <Accordion
          selectedKeys={
            showFilters === true ? new Set(["filters-content"]) : new Set([""])
          }
          className="accordion-items"
        >
          <AccordionItem className="accordion-item-wbg" key="filters-content">
            <FiltersContent />
          </AccordionItem>
        </Accordion>
      </Wrapper>
    </>
  );
}

const TourName = ({ onChangeName = () => {}, tourName }) => {};
