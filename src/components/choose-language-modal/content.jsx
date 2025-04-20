import { ModalBarItem, Wrapper } from "./style";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ButtonSecondary from "@/components/buttons/button-secondary";
import { DefaultLanguageKey, Languages } from "@/lib/consts/language";
import Image from "next/image";
import ButtonTransparent from "../buttons/button-transparent";

export default function ChooseLanguageModalContent({
  onClose = () => {},
  onChange = () => {},
}) {
  const t = useTranslations("languages");
  const tGeneral = useTranslations("general");

  const [selectedLang, setSelectedLang] = useState(DefaultLanguageKey);

  return (
    <Wrapper>
      <div className="modal-header">
        <div>{t("chooseLanguage")}</div>
        <ButtonTransparent size="small" onClick={onClose}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      </div>
      <div>
        {Languages?.map((lan) => (
          <ModalBarItem
            key={`lang__${lan?.code}`}
            onClick={() => setSelectedLang(lan.code)}
            selected={lan?.code === selectedLang}
          >
            <Image src={lan?.img} width="20" height="20" alt="" />
            <div className="bar-item-txt">{t(lan.code)}</div>
            <i className="fi fi-rs-check i-16 check-icon" />
          </ModalBarItem>
        ))}
      </div>
      <ButtonSecondary
        className="center-content-btn"
        onClick={() => {
          onChange(selectedLang);
        }}
      >
        <i className="fi fi-rs-disk i-16" />
        <div>{tGeneral("save")}</div>
      </ButtonSecondary>
    </Wrapper>
  );
}
