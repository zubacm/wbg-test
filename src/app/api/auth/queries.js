import { useQuery } from "@tanstack/react-query";
import api, { api2 } from "../api";

// ====================================================================================================

const getToken = async () => {
  const body = {
    username: "marina",
    password: "PKZt3*K39btfdq^Z7Tm$4v6H",
  }
  const { data } = await api2.post(
    `/token`, body
  );

  console.log("getToken", data);
  return data;
};

export const useToken = () => {
  return useQuery({
    queryKey: ["token"],
    queryFn: async () => getToken(),
  });
};
