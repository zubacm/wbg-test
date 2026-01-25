// ===================================================================================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const addTour = async (data) => {
  console.log("add tour", data);
  const body = { ...data, places: data?.places || data?.acf?.places };

  delete body.authUser;
  delete body.acf;

  let { data: responseData } = await api.post(`/user-tour`, body, {
    headers: {
      Authorization: `Basic ${btoa(data?.authUser?.username + ":" + data?.authUser?.password)}`,
      "Content-Type": "application/json",
    },
  });

  return responseData;
};

export const useAddTour = (successCallbackFn, errorCallbackFn) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTour,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-tours"],
      });

      successCallbackFn();
    },
    onError: (response) => {
      errorCallbackFn(response);
    },
  });
};

// ===================================================================================================

const editTour = async (data) => {
  const body = { ...data, places: data?.places || data?.acf?.places };

  delete body.authUser;
  delete body.acf;

  let { data: responseData } = await api.put(`/user-tour`, body, {
    headers: {
      Authorization: `Basic ${btoa(data?.authUser?.username + ":" + data?.authUser?.password)}`,
      "Content-Type": "application/json",
    },
  });

  return responseData;
};

export const useEditTour = (successCallbackFn, errorCallbackFn) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTour,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-tours"],
      });

      successCallbackFn();
    },
    onError: (response) => {
      errorCallbackFn(response);
    },
  });
};

// ===================================================================================================
