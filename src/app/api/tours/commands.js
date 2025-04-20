// ===================================================================================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const addTour = async (data) => {
  console.log("add tour", data);
  let { data: responseData } = await api.post(`/user-tour`, data);

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
  let { data: responseData } = await api.put(`/user-tour`, data);

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
