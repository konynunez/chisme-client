"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react"; // We need useState to create the QueryClient on the client

export default function QueryProvider({ children }) {
  // Create the QueryClient only on the client side using useState
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
