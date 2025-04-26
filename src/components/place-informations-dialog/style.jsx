import { MEDIUM_SIZE_PX } from "@/lib/consts/style-consts";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 640px;
  max-width: calc(100dvw - 50px);
  overflow-y: auto;
  border-radius: 16px;
  background-color: var(--white);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  color: var(--text);

  & .head-img {
    border-radius: 16px;
    max-height: 300px;
    min-height: 300px;
    object-fit: cover;
  }
`;

export const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  & .feature-item {
    min-width: calc(50% - 4px);
    max-width: calc(50% - 4px);
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    & .feature-item {
      min-width: 100%;
      max-width: 100%;
    }
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 2px;
  min-height: 32px;
  max-height: 32px;

  & .feature-block {
    background-color: ${(p) =>
      p.available === true ? "var(--primary-30)" : "var(--gray-10)"};

    padding: 8px;
  }

  & .feature-left {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 8px 0 0 8px;
  }

  & .feature-right {
    width: 56px;
    border-radius: 0 8px 8px 0;
    display: flex;
    align-items: center;
  }
`;

export const FooterWrapper = styled.div`
  padding-top: 21px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  
  & button {
    max-height: 36px;
    min-height: 36px;
  }

  @media (max-width: ${MEDIUM_SIZE_PX + "px"}) {
    & button {
      flex: 1;
      justify-content: center;
    }
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  & .head-main-txt {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    line-height: 21px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .head-text {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .tour-item-txt {
    font-weight: 400;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    & i {
      color: var(--gray-50);
      display: flex;
    }
  }
`;

export const TimesBtnWrapper = styled.div`
  position: fixed;
  right: 36px;
  top: 36px;
`;
