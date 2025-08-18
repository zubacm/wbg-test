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
         
          <PlaceInformationsDialogContent
            {...data}
            selectedLocations={selectedLocations}
            onSelect={() => onSelectPlace?.(data)}
            onClose={() => dialogRef.current.close()}
          />
        </dialog>
      </>
    );
  }
);

export default PlaceInformationsDialog;
