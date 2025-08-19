import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AccordionWrapper, FilteringSection, FilterSecItem } from "../style";
import FilterAccordionTitle from "../filter-accordion-title";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import FilterTitle from "../filter-title";
import { HASHTAGS_FILTER_NAME } from "@/lib/consts/style-consts";

const FilterHashtagsContent = ({ hashtags, onSelect = () => {}, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("general");

  const searchParams = useSearchParams();
  const hashtagsFilterArray =
    searchParams?.get(HASHTAGS_FILTER_NAME)?.split(",") || [];

  return (
    <AccordionWrapper>
      <FilterAccordionTitle
        className="filter-title"
        isOpen={isOpen}
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
      >
        <FilterTitle
          name={t("hashtag")}
          showDot={hashtagsFilterArray?.length > 0}
        />
        <i className="fi fi-rs-angle-up chevron-accordion" />
      </FilterAccordionTitle>
      <Accordion
        selectedKeys={isOpen === true ? new Set(["hashtags"]) : new Set([""])}
        className="accordion-wbg"
      >
        <AccordionItem
          className="accordion-item-wbg"
          key="hashtags"
          // title={
          //   <FilterAccordionTitle
          //     className="filter-title"
          //     isOpen={isOpen}
          //     onClick={(e) => {
          //       setIsOpen(!isOpen);
          //     }}
          //   >
          //     <FilterTitle
          //       name={t("hashtag")}
          //       showDot={hashtagsFilterArray?.length > 0}
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
            {hashtags?.map((x) => (
              <FilterSecItem
                color="var(--primary-100)"
                key={`filter__item__ht__${x?.id}`}
                onClick={() => onSelect?.(x?.id)}
                selected={hashtagsFilterArray?.some(
                  (y) => y?.toString() === x?.id?.toString()
                )}
              >
                {x?.name}
              </FilterSecItem>
            ))}
          </FilteringSection>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default FilterHashtagsContent;
