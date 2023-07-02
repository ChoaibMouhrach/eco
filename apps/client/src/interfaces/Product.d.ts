import { ICategory } from "./Category";
import { ITimeStamp } from "./Common";
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
  category: ICategory[];
  unit: IUnit;
}
