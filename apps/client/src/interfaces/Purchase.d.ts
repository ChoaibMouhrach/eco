import { IItem } from "./Order";
import { IUser } from "./User";

export interface IPurchase extends ITimeStamp {
  user: IUser;
  items: IItem[];
}
