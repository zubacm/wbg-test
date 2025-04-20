import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 1px;
  width: 100%;

  background: ${p => p.color || "var(--gray-20)"};
`;
