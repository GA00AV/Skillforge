import { fetchUserDetails } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function useUserQuery() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["User"],
    queryFn: () => fetchUserDetails(`${API_URL}/user`),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: 1000 * 60 * 30, // 30 minutes
  });
  return { isLoading, isError, error, data };
}
