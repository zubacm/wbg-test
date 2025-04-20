/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PlaceInformationsDialogContent from "./content";
import { TimesBtnWrapper } from "./style";
import ButtonTransparent from "../buttons/button-transparent";

const PlaceInformationsDialog = forwardRef(
  ({ selectedLocations, onSelectPlace }, ref) => {
    const dialogRef = useRef();

    const [data, setData] = useState({});
    // Expose functions through ref
    useImperativeHandle(ref, () => ({
      open(data) {
        setData(data);
        dialogRef?.current?.showModal();
      },
      close() {
        dialogRef?.current?.close();
      },
    }));

    return (
      <>
        <dialog ref={dialogRef}>
          <TimesBtnWrapper>
            <ButtonTransparent size="small" onClick={() => dialogRef.current.close()}>
              <i className="fi fi-rs-cross i-16" />
            </ButtonTransparent>
          </TimesBtnWrapper>
          <PlaceInformationsDialogContent
            {...data}
            selectedLocations={selectedLocations}
            onSelect={() => onSelectPlace?.(data)}
          />
        </dialog>
      </>
    );
  }
);

export default PlaceInformationsDialog;
