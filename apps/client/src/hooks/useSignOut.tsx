import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

const useSignOut = () =>
  useMutation({
    mutationFn: () =>
      api({
        url: "/sign-out",
        method: "post",
      }),
  });

export default useSignOut;
