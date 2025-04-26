import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: none;
  border-radius: 16px 16px 0 0;
  background-color: var(--white);
  padding: 0 16px 16px 16px;
  box-shadow: var(--box-shadow);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100dvw;
  min-width: 100dvw;
  max-width: 100dvw;
  flex-direction: column;
  gap: 8px;
  z-index: 499;
  max-height: calc(100dvh - 70px);

  & .light-text {
    color: var(--gray-50);
    font-weight: 400;
    font-size: 14px;
  }
  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    display: flex;
  }
`;

export const SliderUpDown = styled.div`
  height: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & i {
    color: var(--gray-50);
    font-size: 16px;
    transition-duration: 0.4s;
    transition-property: transform;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);

    ${(p) =>
      p.isOpen === true &&
      `  transform: rotate(0deg);
    -webkit-transform: rotate(0deg);`}
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  position: relative;
  gap: 8px;
  & .chip {
    position: absolute;
    top: -10px;
    right: -10px;
  }

  & .header-txt {
    flex: 1;
    display: flex;
    align-items: center;
  }
`;
