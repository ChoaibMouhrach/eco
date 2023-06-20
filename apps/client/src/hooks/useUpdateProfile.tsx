import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { UpdateProfileData, UpdateProfileDataError } from "..";

const useUpdateProfile = () =>
  useMutation<AxiosResponse, UpdateProfileDataError, UpdateProfileData>({
    mutationFn: (data: UpdateProfileData) =>
      api({
        url: "/me",
        method: "PATCH",
        data,
      }),
  });

export default useUpdateProfile;
