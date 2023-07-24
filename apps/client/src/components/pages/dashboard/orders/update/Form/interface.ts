import { IProduct } from "@/interfaces/Product";

export interface IItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderUpdate {
  items: { product: IProduct; quantity: number }[];
  stateId: number;
  userId: number;
}
