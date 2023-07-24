import { z } from "zod";

const schema = z.object({
  userId: z.number().int().positive().gt(0),
  items: z
    .array(
      z.object({
        product: z.object({
          id: z.number().int().positive().gt(0),
        }),
        quantity: z.number().int().positive().gt(0),
      })
    )
    .min(1),
});

export default schema;
