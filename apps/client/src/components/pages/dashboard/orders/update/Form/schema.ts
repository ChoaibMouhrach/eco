import { z } from "zod";

export const schema = z.object({
  items: z.array(
    z.object({
      product: z.object({
        id: z.number().positive().int().gt(0),
      }),
      quantity: z.number().positive().int().gt(0),
    })
  ),
  userId: z.number().positive().int().gt(0),
  stateId: z.number().positive().int().gt(0),
});
