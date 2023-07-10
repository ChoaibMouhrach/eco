import { HttpError, ITimeStamp } from "./Common";

export interface IUnit extends ITimeStamp {
  name: string;
}

// create
export interface IUnitUpdate {
  name: string;
}

export type IUnitUpdateError = HttpError<keyof IUnitUpdate>;

// update
export interface IUnitCreate {
  name: string;
}

export type IUnitCreateError = HttpError<keyof IUnitCreate>;

// deletea
export type IUnitDeleteError = HttpError<any>;
