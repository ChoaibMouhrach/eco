import { z } from "zod";
import { ICategory } from "@/interfaces/Category";
import { IUnit } from "@/interfaces/Unit";

export interface CreateProductProps {
  categories: ICategory[];
  units: IUnit[];
}

export const schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(200).max(2000),
  price: z
    .string()
    .regex(/^\d+$/gi)
    .pipe(z.string().transform((v) => Number(v))),
  quantity: z
    .string()
    .regex(/^\d+$/gi)
    .pipe(z.string().transform((v) => Number(v))),
  unitId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  tags: z.string().min(1),
  images: z.array(z.any()),
});
