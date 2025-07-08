import React from "react";
import { useAuthTokenStatus } from "#/hooks/use-auth-token";
import Login from "./login";
import HomeScreen from "./home";

export default function IndexRoute() {
  const { isAuthenticated, isLoading } = useAuthTokenStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <HomeScreen />;
}
