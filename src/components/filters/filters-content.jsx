"use client";
import React from "react";
import { FiltersContentWrapper } from "./style";
import FilterCountry from "./filter-country";
import FilterFeature from "./filter-feature";
import FilterHashtag from "./filter-hashtag";
import FilterType from "./filter-type";
import FilterLocations from "./filter-locations";

export default function FiltersContent({ onSelectLocations = () => {} }) {
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <FiltersContentWrapper>
        <FilterCountry />
        <FilterFeature />
        <FilterType />
        <FilterLocations onSelect={onSelectLocations} />
        <FilterHashtag />
      </FiltersContentWrapper>
    </>
  );
}
