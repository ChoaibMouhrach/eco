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

export interface NavigationData {
  trigger: string;
  elements: {
    name: string;
    href: string;
    description: string;
  }[];
}
