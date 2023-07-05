import { IItem } from "./Order";
import { IUser } from "./User";
import { ITimeStamp } from "./Common";

export interface IPurchase extends ITimeStamp {
  user: IUser;
  items: IItem[];
}
