import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AccordionWrapper, FilteringSection, FilterSecItem } from "../style";
import FilterAccordionTitle from "../filter-accordion-title";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { usePlaceImage } from "@/app/api/locations/queries";
import FilterTitle from "../filter-title";
import { useSearchParams } from "next/navigation";
import { COUNTRIES_FILTER_NAME } from "@/lib/consts/style-consts";
import { useMediaImg } from "@/app/api/reference-data/media";

const FilterCountryContent = ({ countries, onSelect = () => {}, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("general");

  const searchParams = useSearchParams();
  const countriesFilterArray =
    searchParams?.get(COUNTRIES_FILTER_NAME)?.split(",") || [];

  return (
    <AccordionWrapper>
      <FilterAccordionTitle
        className="filter-title"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterTitle
          name={t("country")}
          showDot={countriesFilterArray?.length > 0}
        />
        <i className="fi fi-rs-angle-up chevron-accordion" />
      </FilterAccordionTitle>
      <Accordion
        selectedKeys={isOpen === true ? new Set(["countries"]) : new Set([""])}
        className="accordion-wbg"
      >
        <AccordionItem
          className="accordion-item-wbg"
          key="countries"
          // title={
          //   <FilterAccordionTitle
          //     className="filter-title"
          //     isOpen={isOpen}
          //     onClick={() => setIsOpen(!isOpen)}
          //   >
          //     <FilterTitle
          //       name={t("country")}
          //       showDot={countriesFilterArray?.length > 0}
          //     />
          //     <Image
          //       className="chevron-accordion"
          //       height="6"
          //       width="11"
          //       src="/chevron-up.svg"
          //       alt=""
          //     />
          //   </FilterAccordionTitle>
          // }
        >
          <FilteringSection className="filtering-secition">
            {countries?.map((x) => (
              <CountryItem
                key={`f__country__item__${x?.id}`}
                onSelect={() => onSelect?.(x?.id)}
                id={x?.id}
                name={x?.name}
                // featuredMedia={x?.featured_media}
                featuredMedia={x?.acf?.flag}
                selected={countriesFilterArray?.some(
                  (y) => y?.toString() === x?.id?.toString()
                )}
                img={x?.acf?.flag?.sizes?.thumbnail}
              />
            ))}
          </FilteringSection>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default FilterCountryContent;

const CountryItem = ({
  id,
  name,
  img,
  featuredMedia,
  onSelect = () => {},
  selected = false,
}) => {
  // const { data } = useMediaImg(featuredMedia);

  return (
    <FilterSecItem onClick={onSelect} selected={selected}>
      <Image className="country-icon" height="24" width="24" src={img} alt="" />
      {name}
    </FilterSecItem>
  );
};
