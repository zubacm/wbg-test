import { QueryClient as QC } from "@tanstack/react-query";

export const QueryClient = new QC({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
      cacheTime: Infinity, // do not delete stale data
    },
  },
});
