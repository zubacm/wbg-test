import {
  ModalBarItem,
  Wrapper,
} from "@/components/choose-language-modal/style";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ButtonSecondary from "@/components/buttons/button-secondary";
import ButtonTransparent from "@/components/buttons/button-transparent";
import { ClipLoader } from "react-spinners";
import { useSavedToursHook } from "@/app/api/tours/queries";
import { ItemWrapper } from "./style";
import LoadMoreBtn from "../load-more-btn";
import { usePathname, useRouter } from "next/navigation";

export default function OpenSavedToursModalContent({
  onClose = () => {},
  onOpenTour = () => {},
  authUser,
}) {
  const t = useTranslations("general");
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTour, setSelectedTour] = useState(null);
  const [page, setPage] = useState(1);
  const {
    data: tours,
    isLoading,
    hasMore,
  } = useSavedToursHook({ page, perPage: 50, authUser });

  return (
    <Wrapper>
      <div className="modal-header">
        <div>{t("openSavedTour")}</div>
        <ButtonTransparent size="small" onClick={onClose}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      </div>
      <div className="small-txt">{t("chooseTourToOpen")}</div>
      <div className="items">
        {tours?.map((x) => (
          <ItemWrapper
            key={`saved__tour__${x?.id}`}
            onClick={() => setSelectedTour(x)}
          >
            <div className="item-txt">{x?.title?.rendered}</div>
            {selectedTour?.id === x?.id && (
              <i className="fi fi-rs-check i-20" />
            )}
          </ItemWrapper>
        ))}
        {/* {Languages?.map((lan) => (
          <ModalBarItem
            key={`lang__${lan?.code}`}
            onClick={() => setSelectedLang(lan.code)}
          >
            <Image src={lan?.img} width="20" height="20" alt="" />
            <div className="bar-item-txt">{t(lan.code)}</div>
            <i className="fi fi-rs-check i-16 check-icon" />
          </ModalBarItem>
        ))} */}
        <div className="center-loader-wrapper">
          <ClipLoader
            color="var(--primary-100)"
            loading={isLoading}
            size={"30px"}
          />
        </div>
        {hasMore === true && isLoading !== true && (
          <LoadMoreBtn onLoadMore={() => setPage(+page + 1)} />
        )}
      </div>
      <ButtonSecondary
        className="center-content-btn"
        onClick={() => {
          router.push(`${pathname}`);

          onOpenTour(selectedTour);
        }}
        disabled={isLoading || selectedTour === null}
      >
        <i className="fi fi-rs-check i-16" />
        <div>{t("open")}</div>
      </ButtonSecondary>
    </Wrapper>
  );
}
