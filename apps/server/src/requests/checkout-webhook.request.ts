import z from "zod";
import db from "@src/config/db";
import { AuthRequest, Validate } from "..";

const validate: Validate = (request: AuthRequest) => {
  const schema = z.object({
    event_name: z.enum(["transaction.paid", "transaction.failed"]),
    payload: z.object({
      token: z.object({
        id: z
          .string()
          .nonempty()
          .refine(
            async (tokenId) =>
              await db.order.findUnique({
                where: {
                  tokenId,
                },
              }),
            { message: "Token does not exists" }
          ),
      }),
    }),
  });

  return schema.safeParseAsync(request.body);
};

interface CheckOutWebHookRequestBody {
  event_name: "transaction.paid" | "transaction.failed";
  payload: {
    token: {
      id: string;
    };
  };
}

export interface CheckOutWebHookRequest {
  body: CheckOutWebHookRequestBody;
}

export const checkOutWebHookRequest = {
  validate,
};
