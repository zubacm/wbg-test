import { useQuery } from "@tanstack/react-query";
import api from "../../api";

// ====================================================================================================

const getFeatures = async () => {
  const { data } = await api.get(`/feature?_fields[]=id&_fields[]=name&_fields[]=count&_fields[]=acf&acf_format=standard&perPage=100`);

  return data;
};

export const useFeatures = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: async () => getFeatures(),
  });
};


// ====================================================================================================

const getFeaturesByIds = async (ids) => {
  const idsString = ids?.toString();
  const { data } = await api.get(`/feature?include=${idsString}`);

  return data;
};

export const useFeaturesByIds = (ids) => {
  return useQuery({
    queryKey: ["features-by-ids", ids?.toString()],
    queryFn: async () => getFeaturesByIds(ids),
    enabled: ids?.length > 0,
  });
};
