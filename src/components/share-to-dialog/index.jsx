/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { DialogContent, DialogWrapper, ShareOption } from "./style";
import { ExternalShareItems } from "@/lib/consts/data";
import ButtonBasic from "../buttons/button-basic";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const ShareToDialog = forwardRef(({}, ref) => {
  const dialogRef = useRef();
  const linkRef = useRef();
  const t = useTranslations("general");

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    open(tourLink) {
      linkRef.current = tourLink;
      dialogRef?.current?.showModal();
    },
    close() {
      dialogRef?.current?.close();
      // setIsOpen(false)
    },
  }));

  const handleShare = (link) => {
    const sharedUrl = link?.replace(/\[link\]/g, encodeURI(linkRef.current));

    window.open(sharedUrl, "_blank");
    ref?.current?.close();
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(linkRef.current).then(() => {
      toast.success(t("copiedToClipboard"));
      ref?.current?.close();
    });
  };

  return (
    <>
      <dialog ref={dialogRef}>
        <DialogWrapper>
          <div className="dialog-title">
            <div />
            <div>{t("shareThisTour")}</div>

            <ButtonBasic
              className="close-button"
              onClick={() => {
                ref?.current?.close();
              }}
            >
              <i className="fi fi-rs-cross i-16" />
            </ButtonBasic>
          </div>

          <DialogContent>
            <ShareOption onClick={handleCopyToClipboard}>
              <i class="fi fi-rs-clip" />
              <span>{t("copyToClipboard")}</span>
            </ShareOption>
            {ExternalShareItems?.map((item, index) => (
              <ShareOption key={index} onClick={() => handleShare(item?.link)}>
                <span>{item?.text}</span>
              </ShareOption>
            ))}
          </DialogContent>
        </DialogWrapper>
      </dialog>
    </>
  );
});

export default ShareToDialog;
