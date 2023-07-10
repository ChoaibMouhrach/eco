import { Toast } from "@/components/ui/use-toast";
import { HttpError } from "@/interfaces/Common";

export const handleError = (error: HttpError<any>): Toast => {
  return {
    variant: "destructive",
    title: "Oops!",
    description:
      "message" in error.response.data.content
        ? error.response.data.content.message
        : "Something went wrong.",
  };
};

export const handleSuccess = (description: string): Toast => {
  return {
    title: "Yaay!",
    description,
  };
};
