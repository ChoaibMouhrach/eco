import { AxiosResponse } from "axios";
import { HttpError, ITimeStamp } from "./Common";
import { IProduct } from "./Product";
import { IUser } from "./User";

export interface IItem {
  quantity: number;
  price: number;
  product: IProduct;
}

export interface IOrder extends ITimeStamp {
  user: IUser;
  items: IItem[];
}

// create
export interface IOrderCreate {
  userId: number;
  products: (IProduct & { orderQuantity: number })[];
}

export type IOrderCreateError = HttpError<keyof IOrderCreate>;

// update
export interface IOrderUpdate {
  userId?: number;
  products?: (IProduct & { orderQuantity: number })[];
}

export type IOrderUpdateError = HttpError<keyof IOrderUpdate>;

// delete
export type IOrderDeleteError = HttpError<any>;

// checkout
export interface CardData {
  holder: string;
  number: string;
  expiration: string;
  ccv: string;
}

export interface CheckOutData {
  card: Card;
  items: {
    id: number;
    quantity: number;
  }[];
}

export type CheckOutResponse = AxiosResponse<{ url: string }>;

export type CheckOutError = HttpError<keyof CardData>;
