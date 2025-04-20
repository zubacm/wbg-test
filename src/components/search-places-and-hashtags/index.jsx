/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef } from "react";
import { Wrapper } from "./style";
import { useTranslations } from "next-intl";
import TextInput from "../text-input";
import ButtonTransparent from "../buttons/button-transparent";

const SearchPlacesAndHashtags = forwardRef(({}, ref) => {
  const t = useTranslations("general");
  const inputRef = useRef();

  return (
    <>
      <dialog ref={ref}>
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
            // defVal={search}
            onChange={(e) => {
              //   setSearch(e?.target?.value);
              //   handleSearch(e?.target?.value);
            }}
            tabIndex={2}
            autoFocus
            showIcon={false}
            ref={inputRef}
            placeholder={t("enterPlaceOrHashtag")}
            // onKeyDown={handleKeyDown}
          />
        </Wrapper>
      </dialog>
    </>
  );
});

export default SearchPlacesAndHashtags;
