// ====================================================================================================

import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getHashtags = async () => {
  const { data } = await api.get(
    `/hashtag?_fields[]=id&_fields[]=name&_fields[]=count&_fields[]=acf&acf_format=standard&perPage=100`
  );

  return data;
};

export const useHashtags = () => {
  return useQuery({
    queryKey: ["hashtags"],
    queryFn: async () => getHashtags(),
  });
};
