/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef } from "react";
import { TagsSearchWrapper } from "./style";
import { ClipLoader } from "react-spinners";
import { useHashtagsSearch } from "@/app/api/reference-data/hashtags/queries";
import { FilterSecItem } from "../filters/style";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HASHTAGS_FILTER_NAME } from "@/lib/consts/style-consts";
import HorizontalLine from "../horizontal-line";

const HashtagsSearch = forwardRef(({ search }, ref) => {
  const { data, isLoading } = useHashtagsSearch({
    text: search,
    disabled: !(search?.length > 0),
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hashtagsFilter = searchParams?.get(HASHTAGS_FILTER_NAME) || "";
  const hashtagsFilterArray =
    searchParams?.get(HASHTAGS_FILTER_NAME)?.split(",") || [];

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
    <>
      {data?.length > 0 && <HorizontalLine color="var(--gray-20)" />}

      <TagsSearchWrapper>
        <div className="center-loader-wrapper">
          <ClipLoader
            color="var(--primary-100)"
            loading={isLoading}
            size={"30px"}
          />
        </div>
        {data?.map((x) => (
          <FilterSecItem
            key={`hashtag-item-${x?.id}`}
            color="var(--primary-100)"
            onClick={() => handleSelect?.(x?.id)}
            selected={hashtagsFilterArray?.some(
              (y) => y?.toString() === x?.id?.toString()
            )}
          >
            #{x?.name}
          </FilterSecItem>
        ))}
      </TagsSearchWrapper>
    </>
  );
});

export default HashtagsSearch;
