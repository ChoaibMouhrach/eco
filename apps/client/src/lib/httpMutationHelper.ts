import { Toast } from "@/components/ui/use-toast";
import { HttpError } from "@/interfaces/Common";

export const handleError = (error: HttpError<any> | string): Toast => {
  let description: string;

  if (typeof error === "string") {
    description = error;
  } else if ("message" in error.response.data.content) {
    description = error.response.data.content.message;
  } else {
    description = "Something went wrong.";
  }

  return {
    variant: "destructive",
    title: "Oops!",
    description,
  };
};

export const handleSuccess = (description: string): Toast => {
  return {
    title: "Yaay!",
    description,
  };
};
