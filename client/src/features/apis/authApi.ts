import {
  ChangePassword,
  Credentials,
  UpdateUserInfo,
  UserSignUp,
} from "@/types/Auth";
import api from "./api";
import { User } from "@/types/Auth";
import Cookies from "js-cookie";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendConfirmationEmail: build.mutation<void, void>({
      query: () => ({
        url: "/send-confirmation-email",
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
    }),
    fetchProfile: build.query<User, void>({
      query: () => ({
        url: "/get",
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
    }),
    signIn: build.mutation<User, Credentials>({
      query: (crendetials: Credentials) => ({
        url: "/login",
        method: "post",
        body: crendetials,
      }),
    }),
    signUp: build.mutation<User, UserSignUp>({
      query: (crendetials: UserSignUp) => ({
        url: "/register",
        method: "post",
        body: crendetials,
      }),
    }),
    signOut: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "post",
        headers: {
          Authorization: `Bearer ${Cookies.get("refreshToken")}`,
        },
      }),
    }),
    forgotPassword: build.mutation<
      {
        message: "If the email address exists within our database an email will be sent to it";
      },
      { email: string }
    >({
      query: (data) => ({
        url: "/forgot-password",
        method: "post",
        body: data,
      }),
    }),
    confirmEmail: build.mutation<void, { token: string }>({
      query: ({ token }: { token: string }) => ({
        url: `/confirm-email/${token}`,
        method: "post",
      }),
    }),
    changePassword: build.mutation<void, ChangePassword>({
      query: (data) => ({
        url: "/change-password",
        method: "post",
        body: data,
        headers: {
          "camado": "choaib",
          "Authorization": `Bearer ${Cookies.get("accessToken")}`
        }
      }),
    }),
    resetPassword: build.mutation<
      void,
      { token: string; password: string; password_confirmation: string }
    >({
      query: ({
        token,
        password,
        password_confirmation,
      }: {
        token: string;
        password: string;
        password_confirmation: string;
      }) => ({
        url: `/reset-password/${token}`,
        method: "post",
        body: {
          password,
          password_confirmation,
        },
      }),
    }),
    deleteAccout: build.mutation<void, void>({
      query: () => ({
        url: "/me",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
    }),
    updateUserInfo: build.mutation<User, UpdateUserInfo>({
      query: (data: UpdateUserInfo) => ({
        url: "/me",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useSignOutMutation,
  useSignInMutation,
  useSignUpMutation,
  useResetPasswordMutation,
  useConfirmEmailMutation,
  useFetchProfileQuery,
  useSendConfirmationEmailMutation,
  useChangePasswordMutation,
  useUpdateUserInfoMutation,
  useDeleteAccoutMutation,
} = authApi;
