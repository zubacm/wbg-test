import { useQuery } from "@tanstack/react-query";
import api from "../../api";

// ====================================================================================================

const getTypes = async () => {
  const { data } = await api.get(`/type_?_fields[]=id&_fields[]=name&_fields[]=count&_fields[]=acf&acf_format=standard&perPage=100`);

  return data;
};

export const useTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: async () => getTypes(),
  });
};
