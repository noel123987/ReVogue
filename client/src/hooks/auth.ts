
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { API_ENDPOINTS } from "@/lib/constants";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ME);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    },
  });

  const isAuthenticated = Boolean(user);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    },
  });

  const isAuthenticated = Boolean(user);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
