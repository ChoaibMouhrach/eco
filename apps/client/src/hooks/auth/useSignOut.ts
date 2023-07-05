import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "@/api";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = useMutation({
    mutationFn: () => {
      return api({
        url: "/sign-out",
        method: "POST",
      });
    },
    onSuccess: () => router.push("/"),
  });

  return signOut;
};
