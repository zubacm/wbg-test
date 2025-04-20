"use client";

import { useTranslations } from "next-intl";
import { Wrapper } from "./style";

export default function LoadMoreBtn({ onLoadMore = () => {} }) {
  const t = useTranslations("general");

  return <Wrapper onClick={onLoadMore}>{t("loadMore")}</Wrapper>;
}
