import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const MainStyled = styled.div`
  height: 100dvh;
  width: 100dvw;
  /* overflow: hidden; */
  overflow: auto;
  background-color: var(--gray-10);

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    & .no-medium {
      display: none;
    }
  }
`;

export const TourBuilderMainStyled = styled.div`
  height: 100dvh;
  width: 100dvw;
  /* overflow: hidden; */
  overflow: auto;
  display: flex;

  & .map-container {
    width: unset;
    flex: 1;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    & .no-medium {
      display: none;
    }

    & .leaflet-control-zoom {
      margin-top: 75px !important;
    }
  }
`;

export const ChipWrapper = styled.div`
  min-width: 20px;
  min-height: 20px;
  max-height: 20px;
  border-radius: 50%;
  background-color: ${p => p.color || "var(--gray-50)"};
  color: var(--white);
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ChipWrapperPrimary = styled.div`
  min-width: 24px;
  min-height: 24px;
  max-height: 24px;
  border-radius: 50%;
  background-color: ${p => p.color || "var(--primary-100)"};
  color: var(--gray-100);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
