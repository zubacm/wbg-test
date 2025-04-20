/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, startTransition } from "react";
import ChooseLanguageModalContent from "./content";
import { setUserLocale } from "@/services/locale";

const ChooseLanguageModal = forwardRef(({}, ref) => {
  const handleChangeLanguage = (code) => {

    startTransition(() => {
      setUserLocale(code);
    });

    ref.current.close();
  };

  return (
    <>
      <dialog ref={ref}>
        <ChooseLanguageModalContent
          onChange={handleChangeLanguage}
          onClose={() => ref.current.close()}
        />
      </dialog>
    </>
  );
});

export default ChooseLanguageModal;
