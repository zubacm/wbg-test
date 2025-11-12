import styled from "@emotion/styled";

export const DialogWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 14px;
  min-width: 68px;
  padding: 24px;
  min-width: 68px;

  & .close-button {
    max-width: 28px;
  }

  & .dialog-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
  }
`;
export const DialogContent = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

export const ShareOption = styled.div`
  width: 100%;
  background-color: var(--gray-10);
  color: var(--gray-100);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    background-color: var(--gray-20);
  }
`;
