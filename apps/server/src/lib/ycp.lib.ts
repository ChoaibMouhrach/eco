import config from "@src/config/config";
import { BadRequestException } from "@src/exceptions";
import axios, { AxiosError, AxiosResponse } from "axios";

const ycpApi = axios.create({
  baseURL: config.URL_YOUCANPAY,
});

export interface TokenResponseBody {
  token: {
    id: string;
  };
}

export interface TokenRequestBody {
  amount: number;
  currency: string;
  pri_key: string;
  order_id: number;
}

// retrive token id from ycp servers
export const getToken = async (
  data: Omit<TokenRequestBody, "pri_key">
): Promise<AxiosResponse<TokenResponseBody, TokenRequestBody>> => {
  try {
    return await ycpApi<TokenResponseBody, AxiosResponse, TokenRequestBody>({
      url: "/tokenize",
      method: "POST",
      data: {
        ...data,
        amount: data.amount * 100,
        pri_key: config.KEY_PRIVATE,
      },
    });
  } catch (err) {
    throw new BadRequestException({ message: "Something went wrong" });
  }
};

export interface PayRequestBody {
  pub_key: string;
  token_id: string;
  credit_card: string;
  card_holder_name: string;
  cvv: string;
  expire_date: string;
}

export type PayResponse =
  | {
      success: boolean;
      is_success: boolean;
      message: string;
      code: string;
      transaction_id: string;
      order_id: string;
    }
  | {
      redirect_url: string;
      return_url: string;
      transaction_id: string;
    };

interface Issue {
  message?: string;
  fields?: {
    token_id?: string[];
    expire_date?: string[];
    credit_card?: string[];
    cvv?: string[];
    card_holder_name?: string[];
  };
}

// create payment
export const pay = async (
  data: Omit<PayRequestBody, "pub_key">
): Promise<AxiosResponse<PayResponse, PayRequestBody>> => {
  try {
    return await ycpApi<PayResponse, AxiosResponse, PayRequestBody>({
      url: "/pay",
      method: "POST",
      data: {
        ...data,
        pub_key: config.KEY_PUBLIC,
      },
    });
  } catch (err) {
    const error = err as AxiosError<Issue>;
    const { data: errorData } = error.response!;

    if (errorData.fields) {
      const issues = [];

      if (errorData.fields?.credit_card) {
        issues.push({
          path: ["number"],
          message: errorData.fields.credit_card[0]
            .replaceAll(".", " ")
            .replace("credit_card", "number"),
        });
      }

      if (errorData.fields?.expire_date) {
        issues.push({
          path: ["expiration"],
          message: errorData.fields.expire_date[0]
            .replaceAll(".", " ")
            .replace("expire_date", "expiration"),
        });
      }

      if (errorData.fields?.cvv) {
        issues.push({
          path: ["cvv"],
          message: errorData.fields.cvv[0].replaceAll(".", " "),
        });
      }

      if (errorData.fields?.card_holder_name) {
        issues.push({
          path: ["holder"],
          message: errorData.fields.card_holder_name[0]
            .replaceAll(".", " ")
            .replace("card_holder_name", "holder"),
        });
      }

      throw new BadRequestException(issues);
    }

    if (errorData.message) {
      throw new BadRequestException({ message: errorData.message });
    }

    throw new BadRequestException({ message: "Something went wrong" });
  }
};

export default ycpApi;
