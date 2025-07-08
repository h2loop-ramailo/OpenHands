export function isAuthenticated() {
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
