import { Suspense } from "react";
import TourGuideSidebarDesktop from "@/components/layout/tour-guide-sidebar-desktop/tour-guide-sidebar-desktop";
import TourGuideSidebarMobile from "./tour-guide-sidebar-mobile";
import useIsSmallScreen from "@/app/hooks/useIsSmallScreen";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COUNTRIES_FILTER_NAME, FEATURES_FILTER_NAME, HASHTAGS_FILTER_NAME, TYPES_FILTER_NAME } from "@/lib/consts/style-consts";

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
  onToggleShowOnlySelected = () => {},
  onSelectLocations = () => {},
}) {
  const isSmallScreen = useIsSmallScreen();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    onSelectLocations([]);
    const params = new URLSearchParams(searchParams);

    params.delete(TYPES_FILTER_NAME);
    params.delete(COUNTRIES_FILTER_NAME);
    params.delete(FEATURES_FILTER_NAME);
    params.delete(HASHTAGS_FILTER_NAME);

    router.push(`${pathname}?${params.toString()}`);
  };

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
            onToggleShowOnlySelected={onToggleShowOnlySelected}
            onSelectLocations={onSelectLocations}
            onClearFilters={handleClearFilters}
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
            onToggleShowOnlySelected={onToggleShowOnlySelected}
            onSelectLocations={onSelectLocations}
            onClearFilters={handleClearFilters}
          />
        )}
      </Suspense>
    </>
  );
}
