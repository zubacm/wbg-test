import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  color: var(--text);
  width: 320px;
  min-width: 320px;
  border-radius: 16px;
  background-color: var(--white);
  font-size: 14px;
  font-weight: 400;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ModalHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 500;
`;
