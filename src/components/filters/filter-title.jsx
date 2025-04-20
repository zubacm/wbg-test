import { FilterTitleWrapper } from "./style";

const FilterTitle = ({ name, showDot }) => {
  return (
    <FilterTitleWrapper>
      {showDot === true && <span className="dot">●</span>}
      <div>{name}:</div>
    </FilterTitleWrapper>
  );
};

export default FilterTitle;
