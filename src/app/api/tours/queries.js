// ====================================================================================================

import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { useEffect, useState } from "react";
import { isDefined } from "@/lib/util";

const getSavedTours = async (page = 1, perPage = 100) => {
  const { data } = await api.get(
    `/user-tour?_fields[]=id&_fields[]=title&_fields[]=acf&per_page=${perPage}&page=${page}`
  );

  return data;
};

export const useSavedTours = ({ page, perPage }) => {
  return useQuery({
    queryKey: ["saved-tours", page, perPage],
    queryFn: async () => getSavedTours(page, perPage),
    enabled: page > 0,
  });
};

// ===================================================================================

export const useSavedToursHook = ({ page, perPage }) => {
  const { data, isLoading, isFetching, error } = useSavedTours({
    page,
    perPage,
  });

  const [tours, setTours] = useState([]);

  useEffect(() => {
    if (page > 1 && isDefined(data)) {
      setTours([...tours, ...(data || [])]);
    } else if (page === 1) {
      setTours(isDefined(data) ? data : []);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("has wrror", error);
  // }, [error]);

  return {
    data: tours,
    // data,
    isLoading: isFetching || isLoading,
    hasMore:
      error?.status === 400 ? false : data?.length < perPage ? false : true,
  };
};
