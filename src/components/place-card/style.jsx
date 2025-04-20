import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  background-color: var(--white);
  border-radius: 16px;
  box-shadow: var(--box-shadow);
  min-height: 231px;
  max-height: 231px;
  min-width: 220px;
  max-width: 220px;
  color: var(--gray-100);
  box-shadow: var(--box-shadow);

  & .cover-img {
    max-width: 212px;
    min-width: 212px;
    max-height: 140px;
    min-height: 140px;
    object-fit: cover;
    border-radius: 16px;
  }

  & .txt-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 4px;
  }

  & .head-text {
    font-size: 14px;
    font-weight: 700;
    line-height:21px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .tour-item-txt {
    font-weight: 400;
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    & i {
      color: var(--gray-50);
      display: flex;
    }
  }

  & .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-height: 36px;

    & button {
      max-height: 32px;
      min-height: 32px;
    }
  }


  & .light-txt {
    color: var(--gray-50)
  }
`;
