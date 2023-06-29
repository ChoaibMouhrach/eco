import { GetServerSidePropsContext } from "next";
import { HttpError } from "./Common";

export interface IUser extends ITimeStamp {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  roleId: number;
  Role?: Role;
}

export type SignInData = {
  email: string;
};

export type SignInError = HttpError<keyof SignInData>;

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export type SignUpError = HttpError<keyof SignUpData>;

export interface AuthGetServerSidePropsContext
  extends GetServerSidePropsContext {
  auth?: IUser;
}
