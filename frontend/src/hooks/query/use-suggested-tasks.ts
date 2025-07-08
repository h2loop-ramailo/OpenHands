import { useQuery } from "@tanstack/react-query";
import { SuggestionsService } from "#/api/suggestions-service/suggestions-service.api";
import { groupSuggestedTasks } from "#/utils/group-suggested-tasks";
import { useAuthTokenStatus } from "#/hooks/use-auth-token";

export const useSuggestedTasks = () => {
  const { isAuthenticated: userIsAuthenticated } = useAuthTokenStatus();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: SuggestionsService.getSuggestedTasks,
    select: groupSuggestedTasks,
    enabled: !!userIsAuthenticated,
  });
};
