import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthTokenStatus } from "#/hooks/use-auth-token";
import HomeScreen from "./home";

export default function IndexRoute() {
  const { isAuthenticated, isLoading } = useAuthTokenStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <HomeScreen />;
}
