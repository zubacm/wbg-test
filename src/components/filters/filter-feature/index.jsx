import { FEATURES_FILTER_NAME } from "@/lib/consts/style-consts";
import FilterFeaturesContent from "./content";
import { useFeatures } from "@/app/api/reference-data/features/queries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterFeature = ({ ...rest }) => {
  const { data: features, isLoading } = useFeatures();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const featuresFilter = searchParams?.get(FEATURES_FILTER_NAME) || "";

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);

    var selectedFeatures = featuresFilter?.split(",");

    if (selectedFeatures?.some((x) => x?.toString() === id?.toString())) {
      var filtered = selectedFeatures?.filter(
        (x) => x?.toString() !== id?.toString()
      );

      if (filtered?.length > 0) {
        params.set(FEATURES_FILTER_NAME, filtered?.toString());
      } else {
        params.delete(FEATURES_FILTER_NAME);
      }
    } else {
      var str = featuresFilter?.length > 0 ? `${featuresFilter},${id}` : id;
      params.set(FEATURES_FILTER_NAME, str);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterFeaturesContent
      onSelect={handleSelect}
      features={features}
      {...rest}
    />
  );
};

export default FilterFeature;
