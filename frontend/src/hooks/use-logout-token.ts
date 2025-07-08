import { useCallback } from "react";
import { useNavigate } from "react-router";

export function useLogoutToken() {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }, [navigate]);

  return { logout };
}
