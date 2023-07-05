import { HttpError, ITimeStamp } from "./Common";

export interface ITag extends ITimeStamp {
  name: string;
}

// create
export interface ITagCreate {
  name: string;
}

export type ITagCreateError = HttpError<keyof ITagCreate>;

// update
export interface ITagUpdate {
  name: string;
}

export type ITagUpdateError = HttpError<keyof ITagUpdate>;
