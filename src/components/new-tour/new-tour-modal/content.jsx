"use client";
import { FormField, ModalHeaderBar, Wrapper } from "./style";
import { useTranslations } from "next-intl";
import TextInput from "@/components/text-input";
import { useEffect, useState } from "react";
import ButtonSecondary from "@/components/buttons/button-secondary";
import { ClipLoader } from "react-spinners";
import ButtonTransparent from "@/components/buttons/button-transparent";

export default function NewTourModalContent({
  tourName,
  onSave = () => {},
  onClose = () => {},
  isLoading
}) {
  const t = useTranslations("general");

  const [tourNameInput, setTourNameInput] = useState(tourName);

  useEffect(() => {
    console.log("tourname", tourName)
  }, [tourName])

  return (
    <Wrapper>
      <ModalHeaderBar>
        <div>{t("saveTour")}</div>
        <ButtonTransparent size="small" onClick={onClose}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      </ModalHeaderBar>
      <FormField>
        <div>{t("tourName")}</div>
        <TextInput
          key={`txt__input__${tourName}`}
          defVal={tourName}
          onChange={(e) => setTourNameInput(e?.target?.value)}
          tabIndex={2}
          autoFocus
        />
      </FormField>
      <div>{t("tourDescription")}</div>
      <ButtonSecondary
        className="center-content-btn"
        onClick={() => onSave(tourNameInput)}
        disabled={!tourNameInput?.length > 0 || isLoading}
      >
        <i className="fi fi-rs-disk i-16" />
        <div>{t("save")}</div>
        <ClipLoader color="var(--white)" loading={isLoading === true} size={"20px"} />
      </ButtonSecondary>
    </Wrapper>
  );
}
