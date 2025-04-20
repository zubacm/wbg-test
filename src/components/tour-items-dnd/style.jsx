import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const DndContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease-out;
  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    gap: 8px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;

  & button {
    font-size: 14px;
    white-space: nowrap;
    flex: 1;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
