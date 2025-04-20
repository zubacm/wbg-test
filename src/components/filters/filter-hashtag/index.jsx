import { useHashtags } from "@/app/api/reference-data/hashtags/queries";
import FilterHashtagsContent from "./content";
import { HASHTAGS_FILTER_NAME } from "@/lib/consts/style-consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PER_PAGE = 50;
const FilterHashtag = ({ ...rest }) => {
  const [page, setPage] = useState();
  const { data: hashtags, isLoading } = useHashtags();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hashtagsFilter = searchParams?.get(HASHTAGS_FILTER_NAME) || "";

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);

    var selectedHashtags = hashtagsFilter?.split(",");

    if (selectedHashtags?.some((x) => x?.toString() === id?.toString())) {
      var filtered = selectedHashtags?.filter(
        (x) => x?.toString() !== id?.toString()
      );
      if (filtered?.length > 0) {
        params.set(HASHTAGS_FILTER_NAME, filtered?.toString());
      } else {
        params.delete(HASHTAGS_FILTER_NAME);
      }
    } else {
      var str = hashtagsFilter?.length > 0 ? `${hashtagsFilter},${id}` : id;
      params.set(HASHTAGS_FILTER_NAME, str);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterHashtagsContent
      hashtags={hashtags}
      onSelect={handleSelect}
      {...rest}
    />
  );
};

export default FilterHashtag;
