import styled from "@emotion/styled";

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  padding: 0 12px;
  min-height: 44px;
  border-radius: 8px;
  transition: all 0.4s ease-out;
  cursor: pointer;
  & .item-txt {
    flex: 1;
  }

  &:hover {
    background-color: var(--gray-10);
  }
`;
