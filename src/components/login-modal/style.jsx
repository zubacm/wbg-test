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

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;

  & .titl {
    text-align: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0 0 0.5rem 0;
    color: var(--button-primary-txt-hover);
  }
  & .center-content-btn {
    margin-top: 0.5rem;
  }
`;
