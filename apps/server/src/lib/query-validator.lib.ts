import { BadRequestException } from "@src/exceptions";
import { z } from "zod";

const formatSorting = (value: string): Record<string, 1 | -1 | 0> => {
  const result: Record<string, 1 | -1 | 0> = {};

  value.split(",").forEach((field) => {
    const [key, order] = field.split(":");
    result[key] = Number(order) as 1 | -1 | 0;
  });

  return result;
};

const schema = z.object({
  search: z.string().max(255).optional(),
  sort: z
    .string()
    .regex(/^(\w+:(1|0|-1)(,)?)+$/gi)
    .transform(formatSorting)
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/gi)
    .transform((v) => Number(v))
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
