import axios from "axios";
import { routes } from "../constants/apiRoutes";
import { isAuthenticated } from "../utils/isAuth";
import { handleError } from "../utils/handleError";

export const createWorkspace = async (name, description) => {
  try {
    const { authenticated, error, message, token } = await isAuthenticated();

    if (!authenticated) {
      return {
        errorMessage: error ?? message,
        success: false,
      };
    }

    if (!name) {
      return {
        errorMessage: "Workspace name and description are required",
        success: false,
      };
    }

    const response = await axios.post(
      routes.createWorkspaces,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    handleError(routes.createWorkspaces, error);
    return {
      errorMessage: error?.response?.data?.detail,
      success: false,
    };
  }
};

export const getAllWorkspaces = async () => {
  try {
    const { authenticated, error, message, token } = await isAuthenticated();

    if (!authenticated) {
      return {
        errorMessage: error ?? message,
        success: false,
      };
    }

    const res = await axios.get(routes.getAllWorkspaces, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    handleError(routes.getAllWorkspaces, error);
    return {
      errorMessage:
        error?.response?.data?.detail || "Failed to fetch workspaces",
      success: false,
    };
  }
};

export const getASingleWorkspace = async (workspaceId) => {
  try {
    const { authenticated, error, message, token } = await isAuthenticated();

    if (!authenticated) {
      return {
        errorMessage: error ?? message,
        success: false,
      };
    }

    if (!workspaceId) {
      return {
        errorMessage: "Workspace ID is required",
        success: false,
      };
    }

    const res = await axios.get(routes.getWorkspace(workspaceId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    handleError(routes.getWorkspace(workspaceId), error);
    return {
      errorMessage: error?.response?.data?.detail,
      success: false,
    };
  }
};

export const generateRepoDocumentationForAWorkspace = async (workspaceId) => {
  try {
    const { authenticated, error, message, token } = await isAuthenticated();

    if (!authenticated) {
      return {
        errorMessage: error ?? message,
        success: false,
      };
    }

    if (!workspaceId) {
      return {
        errorMessage: "Workspace ID is required",
        success: false,
      };
    }

    const res = await axios.put(
      routes.generateRepoDocumentation(workspaceId),
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    handleError(routes.generateRepoDocumentation(workspaceId), error);
    return {
      errorMessage: error?.response?.data?.detail,
      success: false,
    };
  }
};
