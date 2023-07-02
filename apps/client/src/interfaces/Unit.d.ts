import { AxiosError } from "axios";

export interface IUnit extends ITimeStamp {
  name: string;
}

// create
export interface HttpError<TKeys> {
  statusCode: number;
  error: string;
  content: { message: string } | { message: string; path: TKeys[] }[];
}

export interface IUnitUpdate {
  name: string;
}

export interface IUnitUpdateError extends AxiosError {
  response: {
    data: HttpError<keyof IUnitUpdate>;
  };
}

export interface IUnitCreate {
  name: string;
}

export interface IUnitCreateError extends AxiosError {
  response: {
    data: HttpError<keyof IUnitCreate>;
  };
}
