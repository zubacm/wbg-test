import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getMedia = async (media) => {
  if (media === 0) return null;

  const { data } = await api.get(
    `/media/${media}?_fields[]=id&_fields[]=media_details`
  );

  return data;
};

export const useMediaImg = (media) => {
  return useQuery({
    queryKey: ["media", media],
    queryFn: async () => getMedia(media),
    enabled: media !== null && media != undefined && media !== 0,
  });
};
