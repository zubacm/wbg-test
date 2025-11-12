/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef, useState } from "react";
import { Wrapper } from "./styled";
import { isDefined } from "@/lib/util";
import ButtonTransparent from "../buttons/button-transparent";

const TextInput = forwardRef(
  ({ defVal, showIcon = true, icon, className = "", ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [val, setVal] = useState(defVal || "");

    const inputRef = useRef(null);

    const handleInput = (e) => {
      setVal(e?.target?.value);
    };

    const handleClear = () => {
      setVal("");
      inputRef?.current?.focus();
    };

    return (
      <Wrapper
        className={`input-wrapper ${className}`}
        isFocused={isFocused}
        ref={ref}
      >
        {showIcon === true && <i className={`fi ${icon ?? "fi-rs-route"} i-16`} />}
        <input
          ref={
            isDefined(ref?.current)
              ? (node) => {
                  ref.current = node;
                  inputRef.current = node;
                }
              : inputRef
          }
          value={val}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={handleInput}
          {...rest}
        />
        <TimesBtn inputLength={val?.length} onClear={handleClear} />
      </Wrapper>
    );
  }
);

export default TextInput;

const TimesBtn = ({ inputLength, onClear = () => {} }) => {
  return (
    <>
      {inputLength > 0 && (
        <ButtonTransparent size="small" onClick={onClear}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      )}
    </>
  );
};
