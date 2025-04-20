import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  color: var(--gray-100);
  background-color: var(--white);
  min-width: 320px;

  & .small-txt {
    font-size: 14px;
    font-weight: 400;
  }

  & .items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ModalBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 12px;
  border-radius: 20px;

  & .bar-item-txt {
    flex: 1;
  }

  & .check-icon {
    transition: all 0.4s ease-out;
    opacity: 0;
  }

  background-color: ${(p) =>
    p.selected === true ? "var(--gray-10)" : "transparent"};

  & .check-icon {
    opacity: ${(p) => (p.selected === true ? "1" : "0")};
  }
  &:hover {
    background-color: var(--gray-10);
  }
`;
