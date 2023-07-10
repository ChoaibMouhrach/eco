import { HttpError, ITimeStamp } from "./Common";

export interface ICategory extends ITimeStamp {
  name: string;
}

// update
export interface ICategoryUpdate {
  name: string;
}

export type ICategoryUpdateError = HttpError<keyof ICategoryUpdate>;

// create
export interface ICategoryStore {
  name: string;
}

export type ICategoryStoreError = HttpError<keyof ICategoryStore>;

// delete
export type ICategoryDeleteError = HttpError<any>;
