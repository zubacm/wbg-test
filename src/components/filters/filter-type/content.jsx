import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AccordionWrapper, FilteringSection, FilterSecItem } from "../style";
import FilterAccordionTitle from "../filter-accordion-title";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import FilterTitle from "../filter-title";
import { TYPES_FILTER_NAME } from "@/lib/consts/style-consts";
import Image from "next/image";

const FilterTypesContent = ({ types, onSelect = () => {}, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("general");

  const searchParams = useSearchParams();
  const typesFilterArray =
    searchParams?.get(TYPES_FILTER_NAME)?.split(",") || [];

  return (
    <AccordionWrapper>
      <FilterAccordionTitle
        className="filter-title"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterTitle name={t("type")} showDot={typesFilterArray?.length > 0} />
        <i className="fi fi-rs-angle-up chevron-accordion" />
      </FilterAccordionTitle>
      <Accordion
        selectedKeys={isOpen === true ? new Set(["types"]) : new Set([""])}
        className="accordion-wbg"
      >
        <AccordionItem
          className="accordion-item-wbg"
          key="types"
          // title={
          //   <FilterAccordionTitle
          //     className="filter-title"
          //     isOpen={isOpen}
          //     onClick={() => setIsOpen(!isOpen)}
          //   >
          //     <FilterTitle
          //       name={t("features")}
          //       showDot={featuresFilterArray?.length > 0}
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
            {types?.map((x) => (
              <FilterSecItem
                key={`filter__item__tp__${x?.id}`}
                onClick={() => onSelect?.(x?.id)}
                selected={typesFilterArray?.some(
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
            ))}
          </FilteringSection>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default FilterTypesContent;
