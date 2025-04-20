import { Suspense } from "react";
import TourGuideSidebarDesktop from "@/components/layout/tour-guide-sidebar-desktop/tour-guide-sidebar-desktop";
import TourGuideSidebarMobile from "./tour-guide-sidebar-mobile";
import useIsSmallScreen from "@/app/hooks/useIsSmallScreen";

export default function TourGuideSidebar({
  selectedLocationsRef,
  selectedLocations,
  onClearAll,
  onSwap,
  onRemoveLocation,
  onSaveTour,
  tourName,
  onToggleShowAll,
  onStartNavigation,
  onChangeTourTitle,
  onGetNavigationUrl,
}) {
  const isSmallScreen = useIsSmallScreen();

  return (
    <>
      <Suspense>
        {isSmallScreen === true ? (
          <TourGuideSidebarMobile
            selectedLocationsRef={selectedLocationsRef}
            selectedLocations={selectedLocations}
            onClearAll={onClearAll}
            onSwap={onSwap}
            onRemoveLocation={onRemoveLocation}
            onSaveTour={onSaveTour}
            onToggleShowAll={onToggleShowAll}
            tourName={tourName}
            onStartNavigation={onStartNavigation}
            onChangeTourTitle={onChangeTourTitle}
            onGetNavigationUrl={onGetNavigationUrl}
          />
        ) : (
          <TourGuideSidebarDesktop
            selectedLocations={selectedLocations}
            onClearAll={onClearAll}
            onSwap={onSwap}
            onRemoveLocation={onRemoveLocation}
            onSaveTour={onSaveTour}
            tourName={tourName}
            onStartNavigation={onStartNavigation}
            onChangeTourTitle={onChangeTourTitle}
            onGetNavigationUrl={onGetNavigationUrl}
          />
        )}
      </Suspense>
    </>
  );
}
