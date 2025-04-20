"use client";

import { useTranslations } from "next-intl";
import { FeatureItem, FeaturesGrid } from "./style";
import { useFeatures } from "@/app/api/reference-data/features/queries";

export default function PlaceFeatures({ featuresIds }) {
  const t = useTranslations("general");
  // const { data, isLoading } = useFeaturesByIds(featuresIds);

  const { data, isLoading } = useFeatures();

  return (
    <FeaturesGrid>
      {data?.map((feature) => (
        <FeatureItem
          key={`feature__${feature.id}`}
          className="feature-item"
          available={featuresIds?.includes(+feature?.id)}
        >
          <div className="feature-block feature-left">
            <i className="fi fi-rs-route i-16" />
            <span>{feature?.name}</span>
          </div>
          <div className="feature-block feature-right">{featuresIds?.includes(+feature?.id) ? t("yes") : t("no")}</div>
        </FeatureItem>
      ))}
    </FeaturesGrid>
  );
}
