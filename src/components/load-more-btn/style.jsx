import styled from "@emotion/styled";

export const Wrapper = styled.div`
  color: var(--primary-100);
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.4s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: var(--primary-30);
    font-size: 14px;
  }
`;
