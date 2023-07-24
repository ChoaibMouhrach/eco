import { IProduct } from "@/interfaces/Product";

export interface IItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderCreate {
  items: IItem[];
  userId: number;
}
