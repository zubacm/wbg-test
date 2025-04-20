"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TourBuilderContent from "./tour-builder/page-content";
import { QueryClient } from "./api/query-client";

export default function TourBuilder() {
  return (
    <QueryClientProvider client={QueryClient}>
      <TourBuilderContent />

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
