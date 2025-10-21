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
  overflow-y: auto;
  z-index: 998;

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
  /* height: 16px; */
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 12px;
  font-size: 16px;
  color: var(--button-primary-txt);
  padding-top: 4px;
  font-weight: 500;
  border-bottom: 1px solid var(--button-primary-txt);

  & .angle-icon {
    /* color: var(--gray-50); */
    font-size: 16px;
    transition-duration: 0.4s;
    transition-property: transform;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    animation: color-cycle 2s infinite alternate;

    ${(p) =>
      p.isOpen === true &&
      `  transform: rotate(0deg);
    -webkit-transform: rotate(0deg);`}
  }

  @keyframes color-cycle {
    0% {
      color: var(--button-primary-txt);
    }

    50% {
      color: var(--gray-50);
    }

    100% {
      color: var(--button-primary-txt);
    }
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

  & .filter-btn-wrap {
    position: relative;
  }

  & .filter-btn {
    position: relative;

    --border-angle: 0turn;
    --main-bg: conic-gradient(
      from var(--border-angle),
      white,
      white 5%,
      white 60%,
      white 95%
    );
    border: solid 2px transparent;
    --gradient-border: conic-gradient(
      from var(--border-angle),
      transparent 10%,
      #6fd46f,
      #d5e9d5 99%,
      transparent
    );
    background: var(--main-bg) padding-box, var(--gradient-border) border-box,
      var(--main-bg) border-box;
    background-position: center center;
    -webkit-animation: bg-spin 2s linear infinite;
    animation: bg-spin 2s linear infinite;
  }

  /* animation */
  @-webkit-keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }
  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  @property --border-angle {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0turn;
  }
`;
