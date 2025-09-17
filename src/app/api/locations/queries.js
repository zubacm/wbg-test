import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { isDefined } from "@/lib/util";

// ====================================================================================================

const getLocations = async (search) => {
  let path = `/location?`;
  if (search?.length > 0) {
    path += `search=${search}&_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`;
  } else {
    path += `_fields[]=id&_fields[]=name&_fields[]=slug&_fields[]=acf&acf_format=standard&per_page=100`;
  }
  const { data } = await api.get(path);

  return data;
};

export const useLocations = (search) => {
  return useQuery({
    queryKey: ["locations", search],
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
  locations,
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

  if (locations?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `location=${locations.join(",")}&`;
  }

  if (features?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `feature=${features.join(",")}&`;
  }

  if (types?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `_type=${types.join(",")}&`;
  }

  if (hashtags?.length > 0) {
    if (path != `/place?`) {
      path += `&`;
    }
    path += `hashtag=${hashtags.join(",")}&`;
  }

  path += `_fields[]=id&_fields[]=title&_fields[]=link&_fields[]=location&_fields[]=country_&_fields[]=hashtag&_fields[]=type_&_fields[]=feature&_fields[]=featured_media&_fields[]=acf&acf_format=standard&per_page=${perPage}`;
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
  locations,
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
      locations.toString(),
      perPage,
    ],
    queryFn: async () =>
      getPlaces({
        text,
        perPage,
        countries,
        features,
        types,
        hashtags,
        locations,
      }),
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
    `/place?include=${ids}&_fields[]=id&_fields[]=title&_fields[]=link&_fields[]=feature&_fields[]=featured_media&_fields[]=acf&acf_format=standard`
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
