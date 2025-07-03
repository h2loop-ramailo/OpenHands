import { routes } from "../constants/apiRoutes";
import axios from "axios";

function getEndpointInfo(endpoint) {
  const key = Object.keys(routes).find((key) => {
    const route = routes[key];
    if (typeof route === "function") {
      return endpoint.startsWith(route("").split("/").slice(0, -1).join("/"));
    }
    return route === endpoint;
  });

  const formattedKey = key
    ? key
        .split(/(?=[A-Z])/)
        .map((word) => word.toUpperCase())
        .join(" ")
    : endpoint;

  return formattedKey;
}

export function handleError(endpoint, error) {
  const endpointInfo = getEndpointInfo(endpoint);
  let errorDetail = error?.response?.data?.detail;

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNREFUSED") {
      errorDetail = "Unable to connect to the server. Please try again later.";
    } else {
      errorDetail = error?.response?.data?.detail || errorDetail;
    }
  }

  console.error(`
        [${endpointInfo}] -> ${errorDetail}
    `);
}
