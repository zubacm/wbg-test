/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef } from "react";
import LoginModalContent from "./content";

const LoginModal = forwardRef(({ onSetUser = () => {} }, ref) => {
  return (
    <>
      <dialog ref={ref}>
        <LoginModalContent
          //   onOpenTour={(tour) => {
          //     onOpenTour(tour);
          //     ref.current.close();
          //   }}
          onSetUser={onSetUser}
          onClose={() => ref.current.close()}
        />
      </dialog>
    </>
  );
});

export default LoginModal;
