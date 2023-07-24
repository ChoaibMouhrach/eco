import { GetServerSidePropsContext } from "next";
import { HttpError, ITimeStamp } from "./Common";
import { IRole } from "./Role";

export interface IUser extends ITimeStamp {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  roleId: number;
  role: IRole;
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

// create
export interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  roleId: string;
}

export type IUserCreateError = HttpError<keyof IUserCreate>;

// update
export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  roleId?: string;
}

export type IUserUpdateError = HttpError<keyof IUserUpdate>;

// delete
export type IUserDeleteError = HttpError<any>;

// sign out
export type ISignOutError = HttpError<any>;
