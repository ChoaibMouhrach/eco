import { ICategory } from "./Category";
import { HttpError, ITimeStamp } from "./Common";
import { IImage } from "./Image";
import { ITag } from "./Tag";
import { IUnit } from "./Unit";

export interface IProduct extends ITimeStamp {
  name: string;
  description: string;

  quantity: number;
  price: number;

  images: IImage[];

  tags: ITag[];
  category: ICategory;
  unit: IUnit;
}

// create
export interface IProductCreate {
  name: string;
  description: string;

  price: number;
  quantity: number;

  unitId: number;
  categoryId: number;

  tags: string;

  images: File[];
}

export type IProductCreateError = HttpError<keyof IProductCreate>;

// update
export type IProductUpdate = Partial<IProductCreate>;

export type IProductUpdateError = HttpError<keyof IProductUpdate>;
