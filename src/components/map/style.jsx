import styled from "@emotion/styled";

export const MapElementTooltipWrapper = styled.div`
  height: 56px;
  width: 56px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & img {
    max-height: 40px;
    min-height: 40px;
    max-width: 40px;
    min-width: 40px;
    padding: 1px;
    background-color: ${(p) =>
      p.hover === true ? "var(--text)" : "var(--white)"};

    border: ${(p) =>
      p.hover === true ? "1px solid var(--text)" : "1px solid var(--white)"};
    border-radius: 16px;
    transition: all 0.4s ease-out;
  }

  & img:hover {
    max-height: 44px;
    min-height: 44px;
    max-width: 44px;
    min-width: 44px;
  }

  & .chip {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const HoverCard = styled.div`
  position: relative;
  height: 220px;
  width: 231px;
`;

export const TooltipCardWrapper = styled.div`
  width: 220px;
  height: 231px;
  position: relative;

  & .zoom-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    max-width: 24px;
    min-width: 24px;
    max-height: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
