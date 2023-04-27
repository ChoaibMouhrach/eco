import { Request } from "express";
import { Authorize, Validate } from "../../interfaces/Request";
import { User } from "../../interfaces/User";
import { z } from "zod";
import { parseObject } from "../../utils/request";
import { isValidObjectId } from "mongoose";
import Category from "../../models/Category";

export interface UpdateProductRequest extends Request {
  body: {
    name?: string;
    price?: number;
    discount?: number;
    inStock?: boolean;
    description?: string;
    shortDescription?: string;
    categories?: string[];
  };
}

const authorize: Authorize = (user?: User) => {
  return user && user.isAdmin;
};

const validate: Validate = (request: Request) => {
  const schema = z
    .object({
      name: z.string().min(1).max(255).optional(),
      price: z.number().min(1).optional(),
      discount: z.number().min(0).max(100).optional(),
      inStock: z.boolean().optional(),
      description: z.string().min(3).optional(),
      shortDescription: z.string().min(1).max(255).optional(),
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
        })
        .optional(),
    })
    .refine(
      (data) => {
        return Object.keys(data).length;
      },
      { message: "Nothing to update", path: ["root"] }
    );

  return schema.safeParseAsync(parseObject(request));
};

export default {
  authorize,
  validate,
};
