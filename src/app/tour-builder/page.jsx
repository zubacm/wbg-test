"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "../api/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TourBuilderContent from "./page-content";
import { AuthProvider } from "../contexts/auth-provider";

export default function TourBuilder() {
  return (
    <QueryClientProvider client={QueryClient}>
      <AuthProvider>
        <TourBuilderContent />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
