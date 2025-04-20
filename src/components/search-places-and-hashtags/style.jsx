import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 640px;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px #0d2f2b33;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--gray-100);
  font-size: 20px;
  font-weight: 500;

  & .header {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    gap: 8px;
  }
`;

export const SearchPlacesContent = styled.div`
  width: 100%;
  max-height: 428px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SearchPlacesItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;

  & .bld {
    font-weight: 700;
  }

  & .thumbnail-img {
    max-width: 36px;
    min-width: 36px;
    max-height: 36px;
    min-height: 36px;
    object-fit: cover;
    border-radius: 16px;
  }
`;
