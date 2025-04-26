import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { isDefined } from "@/lib/util";

// ====================================================================================================

const getLocations = async () => {
  const { data } = await api.get(
    `/location?_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`
  );

  return data;
};

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => getLocations(),
  });
};

// ====================================================================================================

const getPlaces = async ({
  text,
  perPage = 100,
  countries,
  features,
  types,
  hashtags,
}) => {
  let path = `/place?`;

  if (isDefined(text) && text.length > 0) {
    path += `search=${text}&`;
  }

  if (countries?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `country_=${countries.join(",")}&`;
  }

  if (features?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `feature=${features.join(",")}&`;
  }

  if (features?.types > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `_type=${types.join(",")}&`;
  }

  if (features?.hashtags > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `hashtag=${hashtags.join(",")}&`;
  }

  path += `_fields[]=id&_fields[]=link&_fields[]=country_&_fields[]=hashtag&_fields[]=type_&_fields[]=feature&_fields[]=featured_media&_fields[]=acf&acf_format=standard&per_page=${perPage}`;
  // const { data } = await api.get(`/place?_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`);

  const { data } = await api.get(path);
  return data;
};

export const usePlaces = ({
  text,
  perPage,
  countries,
  hashtags,
  features,
  types,
  disabled,
}) => {
  return useQuery({
    queryKey: [
      "places",
      text,
      countries?.toString(),
      hashtags?.toString(),
      features?.toString(),
      types?.toString(),
      perPage,
    ],
    queryFn: async () =>
      getPlaces({ text, perPage, countries, features, types, hashtags }),
    enabled: disabled !== true,
  });
};


export const usePlacesSearch = ({
  text,
  perPage,
  countries,
  hashtags,
  features,
  types,
  disabled,
}) => {
  return useQuery({
    queryKey: [
      "places-search",
      text,
      countries?.toString(),
      hashtags?.toString(),
      features?.toString(),
      types?.toString(),
      perPage,
    ],
    queryFn: async () =>
      getPlaces({ text, perPage, countries, features, types, hashtags }),
    enabled: disabled !== true,
  });
};

// ====================================================================================================

const getPlacesByIds = async (ids) => {
  // const { data } = await api.get(`/place?_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`);
  const { data } = await api.get(
    `/place?include=${ids}&_fields[]=id&_fields[]=link&_fields[]=feature&_fields[]=featured_media&_fields[]=acf&acf_format=standard`
  );

  return data;
};

export const usePlacesByIds = (ids) => {
  return useQuery({
    queryKey: ["places-ids", ids?.join(",")],
    queryFn: async () => getPlacesByIds(ids?.join(",")),
    enabled: ids?.length > 0,
  });
};

// ====================================================================================================

const getPlaceImage = async (media) => {
  const { data } = await api.get(
    `/media/${media}?_fields[]=id&_fields[]=media_details`
  );

  return data;
};

export const usePlaceImage = (media) => {
  return useQuery({
    queryKey: ["place-image", media],
    queryFn: async () => getPlaceImage(media),
    enabled: media !== null && media != undefined,
  });
};
