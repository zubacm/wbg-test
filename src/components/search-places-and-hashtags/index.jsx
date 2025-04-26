/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef, useState } from "react";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import TextInput from "../text-input";
import ButtonTransparent from "../buttons/button-transparent";
import PlacesSearch from "./places-search";
import HorizontalLine from "../horizontal-line";
import HashtagsSearch from "./hashtags-search";

const SearchPlacesAndHashtags = forwardRef(
  ({ onSelectPlace = () => {} }, ref) => {
    const t = useTranslations("general");
    const inputRef = useRef();

    const [search, setSearch] = useState("");

    const currentFocusedIndex = useRef(0);

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

    return (
      <>
        <dialog ref={ref} className="search-dialog">
          <Wrapper>
            <div className="header">
              <div>{t("searchPlacesAndHashtags")}</div>
              {/* <TimesBtnWrapper> */}
              <ButtonTransparent
                size="small"
                onClick={() => ref.current.close()}
              >
                <i className="fi fi-rs-cross i-16" />
              </ButtonTransparent>
              {/* </TimesBtnWrapper> */}
            </div>
            <TextInput
              className="search-bar-txt"
              defVal={search}
              onChange={(e) => {
                setSearch(e?.target?.value);
                //   handleSearch(e?.target?.value);
              }}
              tabIndex={2}
              autoFocus
              showIcon={false}
              ref={inputRef}
              placeholder={t("enterPlaceOrHashtag")}
              // onKeyDown={handleKeyDown}
            />
            <PlacesSearch search={search} onSelectPlace={onSelectPlace} />
            <HashtagsSearch search={search}/>
          </Wrapper>
        </dialog>
      </>
    );
  }
);

export default SearchPlacesAndHashtags;
