import { QueryClient, QueryFunction } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export const apiRequest = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a method to handle different HTTP methods with proper error handling
export function apiRequestMethod(method: string, url: string, data?: any) {
  return apiRequest({
    method,
    url,
    data,
  }).then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        // For 401 errors, we might want to handle them differently
        if (axiosError.response?.status === 401) {
          throw new Error("Please sign in to continue");
        }
        
        throw new Error(
          (axiosError.response?.data as { message?: string })?.message || 
          `Request failed with status ${axiosError.response?.status || 'unknown'}`
        );
      }
      throw error;
    });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await apiRequest.get(queryKey[0] as string);
      return res.data;
    } catch (error) {
      // Handle axios errors properly
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        // Handle 401 errors based on configuration
        if (axiosError.response?.status === 401 && unauthorizedBehavior === "returnNull") {
          return null;
        }
        
        // For other errors, throw with meaningful message
        throw new Error(
          (axiosError.response?.data as { message?: string })?.message || 
          `API request failed with status ${axiosError.response?.status || 'unknown'}`
        );
      }
      
      // Re-throw non-axios errors
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});