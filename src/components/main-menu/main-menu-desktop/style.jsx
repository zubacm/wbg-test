import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const DesktopUserMenuWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;

  & .basic-btn-external-wrapper {
    padding: 8px;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    box-shadow: var(--box-shadow);
  }

  & .menu-btn-desktop-search {
    box-shadow: var(--box-shadow);
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: none;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray-100);
  font-size: 16px;
  font-weight: 500;
  gap: 8px;
  min-height: 44px;
  min-width: 144px;
`;

export const MobileDesktopWrapper = styled.div``;

export const SearchBarWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
  height: 60px;

  & .menu-btn-desktop {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    max-width: 60px;
    min-height: 60px;
    max-height: 60px;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    border-radius: 16px;
  }

  & .search-bar-txt {
    height: 100%;
    min-height: unset;
    max-height: unset;
    border: none !important;

    & input {
      flex: 1;
    }
  }
`;

export const SearchBarTxt = styled.div`
  transition: all 0.4s linear;
  overflow: hidden;
  width: ${(p) => (p.expanded === true ? "800px" : "0px")};
  background-color: var(--white);
  border-radius: 16px;
  box-shadow: var(--box-shadow);
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: end;
`;

export const SearchOptionsMenu = styled.div`
  transition: all 0.4s linear;
  background-color: var(--white);
  border-radius: 16px;
  box-shadow: var(--box-shadow);
  overflow-y: auto;
  width: ${(p) => (p.expanded === true ? "800px" : "0px")};
  max-height: ${(p) => (p.expanded === true ? "800px" : "0px")};
  overflow-x: hidden;
  overflow-y: auto;
`;

export const SearchOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;

  & i {
    display: flex;
  }

  &:hover {
    background-color: var(--button-primary-bg-hover);
    color: var(--button-primary-txt-hover);    
  }
`;