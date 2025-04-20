import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1px;
  height: 100%;
  min-height: ${p => p.height || "100px"};
  background: ${p => p.color || "var(--gray-90)"};
`;
