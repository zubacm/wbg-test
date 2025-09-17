"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AccordionWrapper, FilteringSection, FilterSecItem } from "../style";
import FilterAccordionTitle from "../filter-accordion-title";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import FilterTitle from "../filter-title";
import { LOCATIONS_FILTER_NAME } from "@/lib/consts/style-consts";
import ReactSelectWrapper from "@/components/react-select-wrapper";

// Example async function to fetch options
const loadOptions = async (inputValue) => {
  try {
    const response = await fetch(
      `https://westbalkanguide.com/wp-json/wp/v2/location?search=${inputValue}&_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`
    );
    const data = await response.json();

    // Map data into react-select format: { value, label }
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

const FilterLocationsContent = ({ onSelect = () => {}, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("general");

  // const searchParams = useSearchParams();
  // const locationsFilterArray =
  //   searchParams?.get(LOCATIONS_FILTER_NAME)?.split(",") || [];

  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <AccordionWrapper>
      <FilterAccordionTitle
        className="filter-title"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterTitle
          name={t("locations")}
          // showDot={locationsFilterArray?.length > 0}
          showDot={selectedOptions?.length  > 0}
        />
        <i className="fi fi-rs-angle-up chevron-accordion" />
      </FilterAccordionTitle>
      <Accordion
        selectedKeys={isOpen === true ? new Set(["locations"]) : new Set([""])}
        className="accordion-wbg"
      >
        <AccordionItem className="accordion-item-wbg" key="locations">
          <FilteringSection className="filtering-secition">
            {/* {types?.map((x) => (
              <FilterSecItem
                key={`filter__item__lc__${x?.id}`}
                onClick={() => onSelect?.(x?.id)}
                selected={locationsFilterArray?.some(
                  (y) => y?.toString() === x?.id?.toString()
                )}
              >
                <Image
                  className="cover-img"
                  src={x?.acf?.icon?.sizes?.thumbnail || "/Vector.svg"}
                  width="14"
                  height="14"
                  alt=""
                />
                {x?.name}
              </FilterSecItem>
            ))} */}

            <ReactSelectWrapper
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={selectedOptions}
              onChange={(v) => {
                setSelectedOptions(v);
                onSelect(v);
              }}
              placeholder={t("selectLocations")}
            />
          </FilteringSection>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default FilterLocationsContent;
