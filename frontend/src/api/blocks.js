// "use server";
import { routes } from "../constants/apiRoutes";
import { isAuthenticated } from "../utils/isAuth";
import axios from "axios";
import { handleError } from "../utils/handleError";

export const updateBlock = async (docId, blockId, prompt) => {
  try {
    const { authenticated, error, message, token } = await isAuthenticated();

    if (!authenticated) {
      return {
        errorMessage: error ?? message,
        success: false,
      };
    }

    const res = await axios.put(
      routes.editBlock(docId, blockId),
      {
        type: "TEXT",
        prompt,
      },
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
    handleError(routes.editBlock(docId, blockId), error);
    return {
      errorMessage: error?.response?.data?.detail,
      success: false,
    };
  }
};
