"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "../api/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TourBuilderContent from "./page-content";

export default function TourBuilder() {
  return (
    <QueryClientProvider client={QueryClient}>
      <TourBuilderContent />

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
