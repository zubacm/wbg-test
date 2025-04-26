"use client";

import { useTranslations } from "next-intl";
import React, { useImperativeHandle, useState } from "react";
import ButtonBasic from "../buttons/button-basic";
import { Popover } from "react-tiny-popover";
import { PopoverContentWrapper } from "./style";
import ButtonTransparent from "../buttons/button-transparent";

export default function ShareButton(props) {
  const { ref, children } = props;
  const t = useTranslations("general");

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("test");

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    toggle(text) {
      setText(text);
      setOpen(!open);
    },
  }));

  return (
    <Popover
      isOpen={open}
      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
      content={
        <PopoverContentWrapper>
          <div>{text}</div>
          <ButtonTransparent
            title={t("copyToClipboard")}
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(text);
              setOpen(false);
            }}
          >
            <i className="fi fi-rs-clipboard i-12" />
          </ButtonTransparent>
        </PopoverContentWrapper>
      }
    >
      {children || (
        <ButtonBasic>
          <i className="fi fi-rs-share i-16" />

          {t("share")}
        </ButtonBasic>
      )}
    </Popover>
  );
}
