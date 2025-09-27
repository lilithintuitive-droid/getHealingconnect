import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

// From javascript_log_in_with_replit integration
export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}