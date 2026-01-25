/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useImperativeHandle, useRef } from "react";
import NewTourModalContent from "./content";
import { useAddTour, useEditTour } from "@/app/api/tours/commands";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const NewTourModal = forwardRef(
  ({ tourName, id, isEdit = false, places, authUser }, ref) => {
    const t = useTranslations("general");

    const dialogRef = useRef();
    const locationsRef = useRef([]);

    const { mutate: mutateAdd, isLoading: isLoadingAdd } = useAddTour(
      () => {
        toast.success(t("tourSuccessfullySaved"));
        dialogRef?.current?.close();
      },
      () => {
        toast.error(t("errorOccured"));
      }
    );

    const { mutate: mutateEdit, isLoading: isLoadingEdit } = useEditTour(
      () => {
        toast.success(t("tourSuccessfullySaved"));
        dialogRef?.current?.close();
      },
      () => {
        toast.error(t("errorOccured"));
      }
    );

    // Expose functions through ref
    useImperativeHandle(ref, () => ({
      open(locations) {
        locationsRef.current = locations?.map((x) => x.id);
        dialogRef?.current?.showModal();
      },
      close() {
        dialogRef?.current?.close();
      },
    }));

    const handleSaveTour = (tourName) => {
      if (isEdit === true) {
        mutateEdit({
          id,
          authUser,
          title: tourName,
          acf: { places: locationsRef?.current },
        });
      } else {
        mutateAdd({ authUser, title: tourName, acf: { places: locationsRef?.current } });
      }
    };

    return (
      <>
        <dialog ref={dialogRef} className="save-tour-dialog">
          <NewTourModalContent
            key={`tour__modal__${tourName}`}
            tourName={tourName}
            onClose={() => dialogRef.current.close()}
            onSave={handleSaveTour}
            isLoading={isLoadingAdd || isLoadingEdit}
          />
        </dialog>
      </>
    );
  }
);

export default NewTourModal;
