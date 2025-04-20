import { FilterAccordionTitleWrapper } from "./style";

const FilterAccordionTitle = ({ isOpen, children, ...rest }) => {
  return (
    <FilterAccordionTitleWrapper tabIndex={1} isOpen={isOpen} {...rest}>
      {children}
    </FilterAccordionTitleWrapper>
  );
};

export default FilterAccordionTitle;
