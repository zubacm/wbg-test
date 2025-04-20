import {
  MEDIUM_SIZE_PX,
  MOBILE_SIZE_PX,
  NavbarHeight,
} from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const MobileWrapper = styled.div`
  display: none;

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: block;
  }
`;

export const NavbarWrapper = styled.div`
  width: 100%;
  color: var(--text);
  background: var(--background);
  box-shadow: var(--box-shadow);

  position: absolute;
  z-index: 1001;
  align-items: center;
  gap: 20px;

  height: ${NavbarHeight.MOBILE};
  max-width: 100dvw;
  transform: translate(0, 0);
  left: 0;
  top: 0;
  border-radius: 0 0 16px 16px;

  padding: 10px 20px;

  & button {
    font-size: 14px;
  }

  & .img-logo {
    height: 40px;
    width: 29px;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    height: ${NavbarHeight.MOBILE};
    max-width: 100dvw;
    transform: translate(0, 0);
    left: 0;
    top: 0;
    border-radius: 0 0 16px 16px;

    padding: 10px 20px;
  }

  display: none;

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: flex;
  }
`;

export const VerticalLine = styled.div`
  height: 100%;
  min-height: 44px;
  width: 1px;
  background-color: var(--gray-20);
`;

export const NavigationList = styled.div`
  display: flex;
  flex: 1;
  gap: 40px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: none;
  }
`;

export const MainTab = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 34px;
  cursor: pointer;
  gap: 6.5px;
  &:hover {
    color: var(--gray-50);
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    flex: 1;
  }
`;

export const LanguageItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const NavbarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  & .section-2 {
    display: flex;
    align-items: center;
    gap: 0;
  }
`;

export const NavbarItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;

  & .item-underline {
    transition: 0.2s;
    background-color: var(--primary-100);
    height: 2px;
    width: 40px;
    opacity: ${(p) => (p.isActive === true ? "1" : "0")};
  }

  ${(p) => p.isActive === true && `color: var(--primary-100);`}

  &:hover {
    color: var(--gray-50);
  }
`;

export const MobileMenuDrawerContent = styled.div`
  margin-top: ${NavbarHeight.MOBILE};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;

  & .padded-div {
    padding: 0 20px;
  }

  & .login-btn {
    width: 100%;
  }

  & h2 {
    display: none;
  }

  & button {
    min-height: 32px;
  }


  & .menu-item {
    cursor: pointer;
    padding: 14px 12px;
    border-radius: 8px;
    &:hover {
      background-color: var(--gray-10);
    }
  }
`;

export const MobileNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  & .tab-item {
    font-size: 24px;
    font-weight: 500;
  }
`;

export const MobileNavigationFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 0 8px;
  & button {
  }

  & .group {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const MobileSelectLanguagesWrapper = styled.div`
  min-height: ${(p) => (p.isOpen === true ? "24px" : "0")};
  max-height: ${(p) => (p.isOpen === true ? "24px" : "0")};

  transition: all 0.4s ease-out;
  overflow: hidden;
  height: 100%;
`;

export const LanguagesMobileWrap = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
`;
