import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  & .app-name {
    font-size: 28px;
    font-weight: 800;
    color: var(--gray-100);
  }

  & .page-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-100);
    flex: 1;
    word-spacing: 9999999px;
    line-height: 15px;
  }
`;
