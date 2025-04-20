/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const NewTourItemModal = forwardRef((props, ref) => {
  const [open, setIsOpen] = useState(false);

  const dialogRef= useRef();

  // Expose functions through ref
  useImperativeHandle(ref, () => ({
    open() {
        console.log("open dialog")
      // setIsOpen(true);
      dialogRef?.current?.showModal();
    },
    close() {
      dialogRef?.current?.close();
        // setIsOpen(false)
    },
  }));

  return (
    <>
      <dialog ref={dialogRef}>This is a dialog</dialog>
    </>
  );
});

export default NewTourItemModal;
