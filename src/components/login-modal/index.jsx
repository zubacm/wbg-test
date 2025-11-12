/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef } from "react";
import LoginModalContent from "./content";

const LoginModal = forwardRef(({}, ref) => {
  return (
    <>
      <dialog ref={ref}>
        <LoginModalContent
          //   onOpenTour={(tour) => {
          //     onOpenTour(tour);
          //     ref.current.close();
          //   }}
          onClose={() => ref.current.close()}
        />
      </dialog>
    </>
  );
});

export default LoginModal;
