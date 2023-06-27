import { AxiosError } from "axios";

interface TimeStamp {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends TimeStamp {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export interface HttpError<TDataKeys = string> extends AxiosError {
  response: {
    data: {
      statusCode: number;
      content:
        | {
            message: string;
          }
        | {
            path: TDataKeys[];
            message: string;
          }[];
      error: string;
    };
  };
}

export type SideNavLinkItem = {
  name: string;
  Icon: IconType;
  href: string;
};

// SING IN
type SignInDataKeys = "email";
export type SignInDataError = HttpError<SignInDataKeys>;
export type SignInData = Record<SignInDataKeys, string>;

// SIGN UP
type SignUpDataKeys = "firstName" | "lastName" | "email" | "address" | "phone";
export type SignUpDataError = HttpError<SignUpDataKeys>;
export type SignUpData = Record<SignUpDataKeys, string>;

// UPDATE PROFILE
type UpdateProfileDataKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address";
export type UpdateProfileDataError = HttpError<UpdateProfileDataKeys>;
export type UpdateProfileData = Partial<Record<UpdateProfileDataKeys, string>>;

// TAG
export interface Tag extends TimeStamp {
  name: string;
}

export interface Unit extends TimeStamp {
  name: string;
}

export interface Category extends TimeStamp {
  name: string;
}

export interface Product extends TimeStamp {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];

  category?: Category;
  unit?: Unit;
  tags: Tag[];
}

interface OrderState extends TimeStamp {
  name: string;
}

export interface Item {
  price: number;
  quantity: number;
  product: Product;
}

export interface Order extends TimeStamp {
  items: Item[];
  user: User;
  userId: number;
  orderState?: OrderState;
}

export interface Query {
  search?: string;
  page?: number;
}

export interface Paginate<TData> {
  data: TData[];
  count: number;
  limit: number;
  page: number;
}

// CREATE TAG
type StoreTagKeys = "name";
export type StoreTagError = HttpError<StoreTagKeys>;
export type StoreTagData = Record<StoreTagKeys, string>;

// UPDATE TAG
type UpdateTagKeys = "name";
export type UpdateTagData = Record<StoreTagKeys, string>;
export type UpdateTagError = HttpError<UpdateTagKeys>;

// CREATE CATEGORY
type CreateCategoryKeys = "name";
export type CreateCategoryData = Record<CreateCategoryKeys, string>;
export type CreateCategoryError = HttpError<CreateCategoryKeys>;

// UPDATE CATEGORY
type UpdateCategoryKeys = "name";
export type UpdateCategoryData = Record<UpdateCategoryKeys, string>;
export type UpdateCategoryError = HttpError<UpdateCategoryKeys>;

// CREATE UNIT
type CreateUnitKeys = "name";
export type CreateUnitData = Record<CreateUnitKeys, string>;
export type CreateUnitError = HttpError<CreateUnitKeys>;

// UPDATE UNIT
type UpdateUnitKeys = "name";
export type UpdateUnitData = Record<UpdateUnitKeys, string>;
export type UpdateUnitError = HttpError<UpdateUnitKeys>;
