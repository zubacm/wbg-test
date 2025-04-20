import { useState } from "react";
import TextInput from "../text-input";
import { ChipWrapper } from "@/app/style";
import { useTranslations } from "next-intl";
import { FiltersTitle } from "../layout/tour-guide-sidebar-desktop/style";

export const EditableTourName = ({
  onChangeTourTitle = () => {},
  tourName,
  chipsValue,
}) => {
  const t = useTranslations("general");

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(tourName || t("newTour"));

  return (
    <FiltersTitle onClick={() => setEditMode(true)}>
      {editMode === true ? (
        <TextInput
          key={`txt__input__${tourName}`}
          defVal={tourName || t("newTour")}
          onChange={(e) => setName(e?.target?.value)}
          tabIndex={2}
          autoFocus
          onBlur={() => {
            setEditMode(false);
            onChangeTourTitle(name);
          }}
        />
      ) : (
        <>
          <i className="fi fi-rs-route" />
          <span className="title-txt">{name}</span>
          {chipsValue > 0 && <ChipWrapper>{chipsValue}</ChipWrapper>}
        </>
      )}
    </FiltersTitle>
  );
};
