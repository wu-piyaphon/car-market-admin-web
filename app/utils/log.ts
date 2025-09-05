import { ApiError } from "~/lib/api/types/axios.types";

export const log = {
  error: (error: ApiError | Error | unknown) => {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 400:
          console.error("Bad Request:", error.formattedMessage);
          break;
        case 401:
          console.error("Unauthorized:", error.primaryMessage);
          break;
        case 403:
          console.error("Forbidden:", error.primaryMessage);
          break;
        case 404:
          console.error("Not Found:", error.primaryMessage);
          break;
        case 500:
          console.error("Server Error:", error.primaryMessage);
          break;
        default:
          console.error("API Error:", error.primaryMessage);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
  },
};
