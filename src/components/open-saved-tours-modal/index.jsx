/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef } from "react";
import OpenSavedToursModalContent from "./content";

const OpenSavedToursModal = forwardRef(({ onOpenTour = () => {} }, ref) => {
  return (
    <>
      <dialog ref={ref}>
        <OpenSavedToursModalContent
          onOpenTour={(tour) => {
            onOpenTour(tour);
            ref.current.close();
          }}
          onClose={() => ref.current.close()}
        />
      </dialog>
    </>
  );
});

export default OpenSavedToursModal;
