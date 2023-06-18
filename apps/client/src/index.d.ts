import { AxiosError } from "axios";

interface TimeStamp {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends TimeStamp {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export interface HttpError<TDataKeys = string> extends AxiosError {
  response: {
    data: {
      statusCode: number;
      content:
        | {
            message: string;
          }
        | {
            path: TDataKeys[];
            message: string;
          }[];
      error: string;
    };
  };
}

// SING IN
type SignInDataKeys = "email";
export type SignInDataError = HttpError<SignInDataKeys>;
export type SignInData = Record<SignInDataKeys, string>;

// SIGN UP
type SignUpDataKeys = "firstName" | "lastName" | "email" | "address" | "phone";
export type SignUpDataError = HttpError<SignUpDataKeys>;
export type SignUpData = Record<SignUpDataKeys, string>;
