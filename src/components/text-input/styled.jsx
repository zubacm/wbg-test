import styled from "@emotion/styled";

export const Wrapper = styled.div`
  border-radius: 8px;
  background-color: var(--white);
  padding: 12px;
  border: ${(p) =>
    p.isFocused === true
      ? "1px solid var(--gray-50)"
      : "1px solid var(--gray-30)"};

  display: flex;
  gap: 8px;
  align-items: center;
  & .times-btn {
    display: flex;
    min-height: 30px;
    max-height: 0px;
    background-color: transparent !important;
    padding: 0 2px;

    & i {
      transition: all 0.2s ease-out;
      color: var(--gray-100);
      opacity: ${(p) =>
        p.isFocused === true
          ? "1"
          : "0"};
    }
    &:hover {
      i {
        font-size: 18px;
      }
    }
  }
  & i {
    color: var(--gray-30);
  }
  min-height: 40px;
  max-height: 40px;
  & input {
    border: none;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
    max-width: calc(100% - 58px);;
  }
  & input:focus {
    outline: none;
  }
`;
