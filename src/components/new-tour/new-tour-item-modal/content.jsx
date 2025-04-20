"use client";
import { useState } from "react";

export default function NewTourItemModalContent() {
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [open, setIsOpen] = useState(false);

  return (
    <>
      <dialog open={open}>This is a dialog</dialog>
    </>
  );
}
