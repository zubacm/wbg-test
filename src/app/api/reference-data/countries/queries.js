import { useQuery } from "@tanstack/react-query";
import api from "../../api";

// ====================================================================================================

const getCountries = async () => {
  const { data } = await api.get(`/country_?_fields[]=id&_fields[]=name&_fields[]=featured_media&_fields[]=title&_fields[]=count&_fields[]=acf&acf_format=standard`);

  return data;
};

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => getCountries(),
  });
};


// ====================================================================================================

const getCountry = async () => {
  const { data } = await api.get(`/country_/${id}?_fields=acf&acf_format=standard&perPage=100`);

  return data;
};

export const useCountry = (id) => {
  return useQuery({
    queryKey: ["country", id],
    queryFn: async () => getCountry(),
  });
};