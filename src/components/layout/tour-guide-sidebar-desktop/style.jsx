import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 100dvh;
  top: 0;
  left: 0;
  z-index: 500;
  box-shadow: var(--box-shadow);
  overflow-y: auto;
  width: 360px;
  background-color: var(--white);
  color: var(--gray-100);
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 0 16px 16px 0;
  padding: 16px;

  & .filter-title {
    padding: 0;
  }
  & .filtering-secition {
    padding-right: 0;
    padding-left: 0;
  }

  & .light-text {
    color: var(--gray-50);
    font-weight: 400;
    font-size: 16px;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: none;
  }
`;

export const FiltersTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 18px;
  font-weight: 500;
  color: var(--gray-100);
  cursor: pointer;
  & .title-txt {
    flex: 1;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  & .trash-btn {
    position: relative;

    & .chip {
      position: absolute;
      top: -8px;
      right: -8px;
    }
  }

  & .input-wrapper {
    width: 100%;
  }
  & input {
    width: 100%;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    flex: 1;
  }
`;
