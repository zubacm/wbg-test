import { MEDIUM_SIZE_PX, MOBILE_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const FiltersMobileWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100dvw;
  z-index: 9999;
  width: 100dvw;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: block;
  }
`;

export const FiltersMobileHeader = styled.div`
  width: 100%;
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 20px 0px #0d2f2b33;
  background-color: var(--white);
  padding: 16px;
  display: flex;
  gap: 16px;
  z-index: 9999;

  & .filters {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }
`;

export const FilterItem = styled.div`
  color: var(--button-neutral-txt);
  background: var(--button-neutral-bg);
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  min-height: 44px;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  & .item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & .chevron-accordion {
    overflow: hidden;
    transition-duration: 0.4s;
    transition-property: transform;
    ${(p) =>
      p.isOpen === true &&
      `  transform: rotate(180deg);
    -webkit-transform: rotate(180deg);`}
  }
  &:hover {
    color: var(--button-neutral-txt-hover);
    background: var(--button-neutral-bg-hover);
  }
`;

export const FiltersContentWrapper = styled.div`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

export const FilterAccordionTitleWrapper = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  color: var(--gray-100);
  padding: 0 20px;

  & .chevron-accordion {
    overflow: hidden;
    transition-duration: 0.4s;
    transition-property: transform;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    color: var(--gray-40);

    ${(p) =>
      p.isOpen === true &&
      `  transform: rotate(0deg);
    -webkit-transform: rotate(0deg);`}
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    padding: 0;
  }
`;

export const FilteringSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 20px 0 20px;

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    padding: 8px 0 0 0;
  }
`;

export const FilterSecItem = styled.div`
  border-radius: 12px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid black;
  }
  line-height: 16.94px;
  max-height: 36px;
  box-sizing: border-box;
  cursor: pointer;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => p?.color || "var(--button-neutral-txt)"};
  background-color: ${(p) =>
    p.selected === true ? "var(--button-neutral-bg)" : "transparent"};

  & .country-icon {
    height: 16px;
    width: 16px;
    object-fit: cover;
  }
`;

export const FiltersDekstopWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: var(--box-shadow);
  padding: 16px;
  border-radius: 16px;
  z-index: 999;
  background-color: var(--white);
  width: 310px;
  max-width: 310px;

  & .filter-title {
    padding: 0;
  }

  & .filtering-secition {
    padding-right: 0;
    padding-left: 0;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: none;
  }
`;

export const FiltersHeaderDesktopWrapper = styled.div`
  display: flex;
  gap: 16px;

  & .filters {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }
`;

export const FilterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & .dot {
    font-size: 16px;
    color: var(--gray-50);
  }
`;

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
