"use client";

import { useTranslations } from "next-intl";
import React, { Fragment, useEffect, useRef } from "react";
import TourItem from "@/components/tour-item";
import { createSwapy } from "swapy";
import { ActionsContainer, DndContainer, ExternalContainer } from "./style";
import ButtonBasic from "../buttons/button-basic";
import ButtonNeutral from "../buttons/button-neutral";
import ShareButton from "../share-button";
import ShareToDialog from "../share-to-dialog";

const DEFAULT = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
};

export default function TourItemsDnd(props) {
  const {
    onSaveTour,
    selectedLocations,
    onClearAll,
    onSwap,
    onRemoveLocation,
    showAll,
    hideActions = false,
    onStartNavigation = () => {},
    onGetNavigationUrl = () => {},
  } = props;
  const t = useTranslations("general");
  const shareButtonRef = useRef();

  const slotItems = selectedLocations?.reduce(
    (a, v, index) => ({
      ...a,
      [index]: v?.id,
    }),
    {}
  );

  // const ItemComponents = {
  //   a: <TourItem id="a" />,
  //   b: <TourItem id="b" />,
  //   c: <TourItem id="c" />,
  //   d: <TourItem id="d" />,
  // };

  const ItemComponents = selectedLocations?.reduce(
    (a, v, index) => ({
      ...a,
      [v?.id]: (
        <TourItem
          id={v?.id}
          thumbnail={v?.thumbnail}
          name={v?.name}
          city={v?.city}
          countryShort={v?.countryShort}
          displaySequence={v?.displaySequence}
          index={index}
          onRemoveLocation={onRemoveLocation}
          featuredMedia={v?.featuredMedia}
        />
      ),
    }),
    {}
  );

  // const ItemComponents = {

  // }

  useEffect(() => {
    const container = document.querySelector("#dnd-container");

    const swapy = createSwapy(container);
    swapy.onSwap((data) => {
      console.log("on swap", data);
      onSwap?.(data?.draggingItem, data?.swappedWithItem);
      localStorage.setItem("slotItem", JSON.stringify(data?.object));
    });

    swapy.enable(true);
  }, []);

  return (
    <ExternalContainer>
      <DndContainer id="dnd-container" showAll={showAll}>
        {Object.entries(slotItems).map(([key, value], index) => (
          <Fragment key={`tour__item__${value}`}>
            <div data-swapy-slot={`slot-${value}`}>
              <div data-swapy-item={value}>{ItemComponents[`${value}`]}</div>
            </div>
          </Fragment>
        ))}
      </DndContainer>

      {hideActions !== true && (
        <>
          <ActionsContainer>
            <ButtonBasic onClick={() => onSaveTour?.()}>
              <i className="fi fi-rs-disk i-16" />
              {t("save")}
            </ButtonBasic>

            {/* <ShareButton ref={shareButtonRef}> */}
              <ButtonBasic
                onClick={() => {
                  const tourPath = onGetNavigationUrl();

                  shareButtonRef?.current?.open(tourPath);
                }}
              >
                <i className="fi fi-rs-share i-16" />
                {t("share")}
              </ButtonBasic>
            {/* </ShareButton> */}
            <ShareToDialog ref={shareButtonRef} />
            <ButtonBasic onClick={() => onClearAll?.()}>
              <i className="fi fi-rs-cross i-16" />

              {t("clearAll")}
            </ButtonBasic>
          </ActionsContainer>

          <ButtonNeutral center={true} onClick={onStartNavigation}>
            <i className="fi fi-rs-location-arrow i-20" />
            {t("startNavigation")}
          </ButtonNeutral>
        </>
      )}
    </ExternalContainer>
  );
}
