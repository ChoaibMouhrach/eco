import { BadRequestException } from "@src/exceptions";
import { z } from "zod";

const formatSorting = (value: string): Record<string, "asc" | "desc"> => {
  const result: Record<string, "asc" | "desc"> = {};

  const fields = value.split(",");

  if (fields[0] === "") {
    fields.shift();
  }

  if (fields[fields.length - 1] === "") {
    fields.pop();
  }

  fields.forEach((field) => {
    const [key, order] = field.split("-");
    result[key] = order as "asc" | "desc";
  });

  return result;
};

const schema = z.object({
  search: z.string().max(255).optional(),
  sort: z
    .string()
    .regex(/^(\w+-(asc|desc),?)+$/gi)
    .transform(formatSorting)
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/gi)
    .transform((v) => Number(v))
    .optional(),
  price: z
    .string()
    .regex(/^\d+-\d+$/gi)
    .transform((v) => v.split("-").map((price) => Number(price)))
    .optional(),
});

const validateQuery = (data: any) => {
  const validation = schema.safeParse(data);

  if (!validation.success) {
    throw new BadRequestException(validation.error.issues);
  }

  return validation.data;
};

export default validateQuery;
