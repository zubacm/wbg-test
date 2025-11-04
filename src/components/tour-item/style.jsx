import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import { truncateTextInRows } from "@/lib/util";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  padding: 0 4px;
  width: 100%;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid var(--gray-20);
  cursor: pointer;
  height: 60px;
  color: var(--gray-100);
  &:hover {
    border: 1px solid var(--gray-50);
  }

  &:focus {
    border: 1px solid var(--primary-100);
  }

  & .tour-item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding-left: 4px;
  }

  & .gray-txt {
    color: var(--gray-50);
  }
  & .tour-item-main-txt {
    font-size: 14px;
    font-weight: 700;
    ${truncateTextInRows(2)}
  }

  & .tour-item-txt {
    font-weight: 400;
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    & i {
      display: flex;
    }
  }

  & .times-btn {
    max-height: 32px;
    max-width: 32px;
    padding: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    min-width: 32px;
    min-height: 32px;
    margin-top: 4px;
  }

  & .chevron-icons {
    height: 100%;
    display: flex;
    align-items: center;
    & i {
      font-size: 13px;
      color: var(--gray-20);
    }
  }

  & .mobile-swapy-handle {
    border-right: 1px solid var(--gray-20);
    padding: 0 12px;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    height: 44px;
    align-items: center;

    & .place-img,
    .tour-item-txt {
      display: none;
    }

    & .times-btn {
      margin-top: 0;
    }

    & .chevron-icons {
      pointer-events: none;

      & i {
        font-size: 26px;
        pointer-events: none;
      }
    }
  }
`;
