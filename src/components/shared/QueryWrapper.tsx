"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
 type QueryWrapperProps = {
     children: React.ReactNode
 }

 const QueryWrapper: React.FC<QueryWrapperProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

export default QueryWrapper;

