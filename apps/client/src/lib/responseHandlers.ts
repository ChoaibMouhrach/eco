import { ResponseError } from "@/types/Errors";
import { ErrorOption } from "react-hook-form";

/**
 *Set response Errors
 * */
export const handleResponseErrors = <T>(
  errors: ResponseError<T>,
  setError: (name: T | "root", error: ErrorOption) => void
) => {
  if (errors.data?.errors) {
    for (let error of errors.data.errors) {
      setError(error.path[0], {
        message: error.message,
      });
    }
  }

  if (errors.data?.message) {
    setError("root", {
      message: errors.data.message,
    });
  }
};
