import { useEffect, useState } from "react";
import { usePlacesByIds } from "../api/locations/queries";

const useSelectedTour = () => {
  const [placesIds, setPlacesIds] = useState([]);
  const [tour, setTour] = useState();
  const [tourTitle, setTourTitle] = useState("");

  const { data: places, isLoading } = usePlacesByIds(placesIds);

  const onSelectNewTour = (tour) => {
    setTour({
      title: tour?.title?.rendered || "",
      id: tour?.id,
      places: tour?.acf?.places || [],
    });
    setTourTitle(tour?.title?.rendered || "");
    setPlacesIds(tour?.acf.places || []);
  };


  useEffect(() => {
    console.log("places ids", placesIds)
  }, [placesIds])

  const onChangeTourTitle = (value) => {
    setTourTitle(value || "");
  }

  return {
    tour,
    tourTitle,
    data: places,
    isLoading,
    onSelectNewTour,
    onChangeTourTitle,
  };
};

export default useSelectedTour;
