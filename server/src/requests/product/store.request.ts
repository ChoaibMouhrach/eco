import { z } from "zod";
import { Authorize, Validate } from "../../interfaces/Request";
import { User } from "../../interfaces/User";
import { Request } from "express";
import Category from "../../models/Category";
import { parseObject } from "../../utils/request";
import { isValidObjectId } from "mongoose";

export interface StoreProductRequest extends Request {
  body: {
    name: string;
    price: number;
    discount?: number;
    inStock?: boolean;
    categories: string[];
    shortDescription: string;
    description: string;
  };
}

const authorize: Authorize = (user?: User) => {
  return user && user.isAdmin;
};

const validate: Validate = (request: Request) => {
  const fields = {
    name: z.string().min(1).max(255),
    price: z.number().min(1),
    discount: z.number().min(0).max(100).default(0),
    inStock: z.boolean().default(true),
    shortDescription: z.string().min(1).max(255),
    description: z.string().min(3),
    categories: z
      .array(
        z.string().refine(
          async (_id) => {
            return isValidObjectId(_id) && (await Category.exists({ _id }));
          },
          { message: "Category does not exists" }
        )
      )
      .refine((categories) => categories.length, {
        message: "At least one category is required",
      }),
  };

  const schema = z.object(fields).refine(() => request.files?.length, {
    message: "Images are required",
    path: ["images"],
  });

  return schema.safeParseAsync(parseObject(request));
};

export default {
  authorize,
  validate,
};
