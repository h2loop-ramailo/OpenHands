import { useQuery } from "@tanstack/react-query";
import OpenHands from "#/api/open-hands";
import { useAuthTokenStatus } from "#/hooks/use-auth-token";

export const useUserConversations = () => {
  const { isAuthenticated: userIsAuthenticated } = useAuthTokenStatus();

  return useQuery({
    queryKey: ["user", "conversations"],
    queryFn: OpenHands.getUserConversations,
    enabled: !!userIsAuthenticated,
  });
};
