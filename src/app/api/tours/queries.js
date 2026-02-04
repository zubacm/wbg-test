// ====================================================================================================

import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { useEffect, useState } from "react";
import { isDefined } from "@/lib/util";

const getSavedTours = async (page = 1, perPage = 100, authUser) => {
  // authUser
  const { data } = await api.get(
    `/user-tour?_fields[]=id&_fields[]=title&_fields[]=acf&per_page=${perPage}&page=${page}`,
    { 
      headers: {
        Authorization: `Bearer ${authUser?.token}`,
        // Authorization: `Basic ${btoa(authUser?.username + ":" + authUser?.password)}`,
      }
    }
  );

  return data;
};

export const useSavedTours = ({ page, perPage, authUser }) => {
  return useQuery({
    queryKey: ["saved-tours", page, perPage, authUser?.username ?? ""],
    queryFn: async () => getSavedTours(page, perPage, authUser),
    enabled: page > 0,
  });
};

// ===================================================================================

export const useSavedToursHook = ({ page, perPage, authUser }) => {
  const { data, isLoading, isFetching, error } = useSavedTours({
    page,
    perPage,
    authUser
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
