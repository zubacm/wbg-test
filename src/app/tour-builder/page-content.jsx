import Map from "@/components/map";
import { TourBuilderMainStyled } from "../style";
import { Suspense, useEffect, useRef, useState } from "react";
import PlaceInformationsDialog from "@/components/place-informations-dialog";
import NewTourModal from "@/components/new-tour/new-tour-modal";
import MainMenu from "@/components/main-menu";
import TourGuideSidebarMobile from "@/components/layout/tour-guide-sidebar-mobile";
import useSelectedTour from "../hooks/useSelectedTour";
import TourGuideSidebarDesktop from "@/components/layout/tour-guide-sidebar-desktop/tour-guide-sidebar-desktop";
import TourGuideSidebar from "@/components/layout/tour-guide-sidebar";
import { ToastContainer } from "react-toastify";
// import TourGuideSidebar from "@/components/layout/tour-guide-sidebar";

export default function TourBuilderContent() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const selectedLocationsRef = useRef([]);

  const {
    tour,
    tourTitle,
    data: tourPlaces,
    onSelectNewTour,
    isLoading: isLoadingSelectedTour, // full page loader
    onChangeTourTitle,
  } = useSelectedTour();

  useEffect(() => {
    // if > 0 // set selected locations
    if (tourPlaces?.length > 0) {
      selectedLocationsRef.current = tourPlaces?.map((x, index) => {
        return {
          id: x?.id,
          shortDescription: x?.acf?.short_description,
          city: x?.acf?.location?.city,
          countryShort: x?.acf?.location?.country_short,
          lat: x?.acf?.location?.lat,
          lng: x?.acf?.location?.lng,
          name: x?.acf?.location?.name,
          displaySequence: index,
          // thumbnail:
          featuredMedia: x?.featured_media,
        };
      });
      setSelectedLocations([...selectedLocationsRef?.current]);
      mapRef?.current?.onChangeLocations(selectedLocationsRef?.current);

      const minLat = Math.min(
        ...selectedLocationsRef?.current?.map((x) => x?.lat)
      );
      const minLng = Math.min(
        ...selectedLocationsRef?.current?.map((x) => x?.lng)
      );
      const maxLat = Math.max(
        ...selectedLocationsRef?.current?.map((x) => x?.lat)
      );
      const maxLng = Math.max(
        ...selectedLocationsRef?.current?.map((x) => x?.lng)
      );
      mapRef?.current?.onChangeBounds([
        [minLat, minLng],
        [maxLat, maxLng],
      ]);

      // reset filters
    }
  }, [tourPlaces]);

  const infoModalRef = useRef();
  const mapRef = useRef();
  const mapLocationsRef = useRef();
  const saveTourRef = useRef();

  const handleSelectPlace = (newPlace) => {
    if (!selectedLocations?.some((x) => x?.id === newPlace?.id)) {
      selectedLocationsRef.current = [
        ...(selectedLocationsRef?.current || []),
        { ...newPlace, displaySequence: selectedLocations?.length },
      ];
      setSelectedLocations([...selectedLocationsRef?.current]);
    } else {
      selectedLocationsRef.current = [
        ...(selectedLocationsRef?.current || [])?.filter(
          (x) => x?.id !== newPlace?.id
        ),
      ];
      setSelectedLocations([...selectedLocationsRef?.current]);
    }

    // inform map change
    mapRef?.current?.onChangeLocations(selectedLocationsRef?.current);
  };

  // to service
  const handleSwap = (draggingItem, swappedWithItem) => {
    var draggingLocation = selectedLocationsRef?.current?.find(
      (x) => x.id === +draggingItem
    );
    const dragginDispSequence = draggingLocation?.displaySequence;
    var swappedLocation = selectedLocationsRef?.current?.find(
      (x) => x.id === +swappedWithItem
    );
    const swappedDisSequence = swappedLocation?.displaySequence;

    // console.log(
    //   "dragging locsss ",
    //   draggingLocation,
    //   swappedLocation,
    //   dragginDispSequence,
    //   swappedDisSequence
    // );
    // console.log("before", selectedLocationsRef?.current);

    // draggingLocation.displaySequence = swappedDisSequence;
    // swappedLocation.displaySequence = dragginDispSequence;

    selectedLocationsRef.current = selectedLocationsRef?.current?.map((x) => {
      if (x.id === +draggingItem) {
        return {
          ...x,
          displaySequence: swappedDisSequence,
        };
      } else if (x.id === +swappedWithItem) {
        return { ...x, displaySequence: dragginDispSequence };
      }

      return x;
    });

    // inform map change
    mapRef?.current?.onChangeLocations(selectedLocationsRef?.current);
  };

  const onRemoveLocation = (id) => {
    selectedLocationsRef.current = selectedLocationsRef.current?.filter(
      (x) => x.id !== +id
    );

    setSelectedLocations([...selectedLocationsRef?.current]);

    // inform map change
    mapRef?.current?.onChangeLocations(selectedLocationsRef?.current);
  };

  const handleShowInfo = (data) => {
    infoModalRef?.current?.open?.(data);
  };

  const handleClearAll = () => {
    selectedLocationsRef.current = [];
    setSelectedLocations([]);
    // inform map change
    mapRef?.current?.onChangeLocations(selectedLocationsRef?.current);
  };

  //   useEffect(() => {
  //     console.log("selektovana tura", selectedTour);
  //   }, [selectedTour]);

  const getNavigationUrl = () => {
    if (selectedLocationsRef?.current?.length) {
      let mapPath = selectedLocationsRef?.current
        ?.sort((a, b) => a?.displaySequence - b?.displaySequence)
        ?.map((x) => {
          return `/${x?.lat},${x?.lng}`;
        });
      const tourPath = "https://www.google.com/maps/dir" + mapPath;

      return tourPath;
    }
  };

  const handleStartNavigation = () => {
    if (
      selectedLocationsRef?.current?.length > 0 &&
      typeof window !== "undefined"
    ) {
      const tourPath = getNavigationUrl();

      window.open(tourPath, "_blank");
    }
  };

  return (
    <>
      <TourBuilderMainStyled>
        <Suspense>
          <MainMenu
            onOpenTour={(tour) => {
              onSelectNewTour(tour);
              // console.log("open tour", tour);
            }}
            onSaveTour={() =>
              saveTourRef?.current?.open(selectedLocationsRef?.current)
            }
            canSaveTour={selectedLocations?.length > 0}
            onGetNavigationUrl={getNavigationUrl}
            onSearchSelectPlace={(x) => {
              mapLocationsRef?.current?.addSearchedPlace(x);
            }}
          />
        </Suspense>

        <Suspense>
          <TourGuideSidebar
            selectedLocationsRef={selectedLocationsRef}
            selectedLocations={selectedLocations}
            onClearAll={handleClearAll}
            onSwap={handleSwap}
            onRemoveLocation={onRemoveLocation}
            onSaveTour={() =>
              saveTourRef?.current?.open(selectedLocationsRef?.current)
            }
            onToggleShowAll={() => {
              setSelectedLocations([...selectedLocationsRef?.current]);
            }}
            tourName={tourTitle}
            onStartNavigation={handleStartNavigation}
            onChangeTourTitle={onChangeTourTitle}
            onGetNavigationUrl={getNavigationUrl}
          />
        </Suspense>
        <Suspense>
          <Map
            ref={mapRef}
            onSelectPlace={handleSelectPlace}
            selectedLocations={selectedLocations}
            onShowInfo={handleShowInfo}
            mapLocationsRef={mapLocationsRef}
          />
        </Suspense>

        <NewTourModal
          ref={saveTourRef}
          tourName={tourTitle}
          id={tour?.id}
          isEdit={tour?.id !== null && tour?.id !== undefined}
        />
      </TourBuilderMainStyled>

      <PlaceInformationsDialog
        ref={infoModalRef}
        selectedLocations={selectedLocations}
        onSelectPlace={handleSelectPlace}
      />

      <ToastContainer />
    </>
  );
}
