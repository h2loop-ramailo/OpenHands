import { useState, useEffect } from "react";

export function getValidToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      isAuthenticated: false,
      token: null,
      message: "No authentication token found",
    };
  }
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (!decoded.exp) {
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        token: null,
        message: "Invalid authentication token (no expiry)",
      };
    }
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        token: null,
        message: "Token has expired",
      };
    }
    return {
      isAuthenticated: true,
      token,
      message: "Authenticated",
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      token: null,
      message: "Authentication check failed",
    };
  }
}

export function useAuthTokenStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const result = getValidToken();
      setIsAuthenticated(result.isAuthenticated);
      setToken(result.token);
      setMessage(result.message);
    } catch {
      setIsAuthenticated(false);
      setToken(null);
      setMessage("Authentication check failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isAuthenticated, isLoading, token, message };
}
