"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  SearchBarTxt,
  SearchBarWrapper,
  SearchContainer,
  SearchOption,
  SearchOptionsMenu,
} from "./style";
import TextInput from "@/components/text-input";
import { usePlaces } from "@/app/api/locations/queries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TEXT_FILTER_NAME } from "@/lib/consts/style-consts";

export default function SearchBarDesktop({
  onExitTourBuilder,
  onChangeLanguage,
  onOpenSavedTours,
  onSearch = () => {},
}) {
  const t = useTranslations("general");
  const [expand, setExpand] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const textFilter = searchParams?.get(TEXT_FILTER_NAME) || "";
  const [search, setSearch] = useState(textFilter);

  // const { data, isLoading } = usePlaces({
  //   text: search,
  //   disabled: !(search?.length > 0),
  // });

  const inputRef = useRef(null);
  const currentFocusedIndex = useRef(-1);

  const toggleExpand = () => {
    if (expand === false) {
      inputRef?.current?.focus();
    }
    setExpand(!expand);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      currentFocusedIndex.current = currentFocusedIndex.current + 1;
      document
        .getElementById(`option-item-${currentFocusedIndex.current}`)
        ?.focus();
    } else if (e.key === "ArrowUp") {
      currentFocusedIndex.current = currentFocusedIndex.current - 1;
      if (currentFocusedIndex.current >= 0) {
        document
          .getElementById(`option-item-${currentFocusedIndex.current}`)
          ?.focus();
      }
    } else if (e.key === "Escape") {
      //exitFullScreenRef?.current?.click();
    } else if (e.key === "Enter") {
      //exitFullScreenRef?.current?.click();
    }
  };

  const handleSearch = (txt) => {
    const params = new URLSearchParams(searchParams);
    params.set(TEXT_FILTER_NAME, txt);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <SearchContainer>
      <SearchBarWrapper>
        <SearchBarTxt expanded={expand}>
          <TextInput
            className="search-bar-txt"
            defVal={search}
            onChange={(e) => {
              setSearch(e?.target?.value);
              handleSearch(e?.target?.value);
            }}
            tabIndex={2}
            autoFocus
            showIcon={false}
            ref={inputRef}
            // onKeyDown={handleKeyDown}
          />
        </SearchBarTxt>
        <ButtonBasic
          className="menu-btn-desktop menu-btn-desktop-search"
          // onClick={toggleExpand}
          onClick={() => onSearch()}
        >
          <i className="fi-rs-search i-20" />
        </ButtonBasic>
      </SearchBarWrapper>
      {/* {data?.length > 0 && (
        <SearchOptionsMenu expanded={expand}>
          {data?.map((x, index) => (
            <SearchOption key={`search__place__${index}`}>
              <i className="fi-rs-map-pin i-20" />
              test
            </SearchOption>
          ))}
        </SearchOptionsMenu>
      )} */}
    </SearchContainer>
  );
}
