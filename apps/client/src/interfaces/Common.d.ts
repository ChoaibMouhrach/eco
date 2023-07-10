import { AxiosError } from "axios";

export interface ITimeStamp {
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface HttpError<TKeys> extends AxiosError {
  response: {
    data: {
      statusCode: number;
      content: { message: string } | { path: TKeys[]; message: string }[];
      error: string;
    };
  };
}

export type NavigationData = {
  name: string;
  href: string;
};

export interface SideBarNavigation {
  name: string;
  href?: string;
  icon: IconType;
  children?: Omit<SideBarNavigation, "children">[];
}

export interface IPaginate<TData> {
  data: TData[];
  limit: number;
  count: number;
  page: number;
}
