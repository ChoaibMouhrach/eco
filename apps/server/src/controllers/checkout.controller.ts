import db from "@src/config/db";
import { getToken, pay } from "@src/lib/ycp.lib";
import { CheckOutRequest, CheckOutWebHookRequest } from "@src/requests";
import { Response } from "express";

const checkOut = async (request: CheckOutRequest, response: Response) => {
  const { user } = request.auth!;
  const { items, card } = request.body;
  let totalAmount = 0;

  const products = (
    await db.product.findMany({
      where: {
        OR: items.map(({ id }) => ({
          id,
        })),
      },
    })
  ).map((product) => {
    const item = items.find((orderItem) => orderItem.id === product.id)!;
    totalAmount += item.quantity * product.price;
    return {
      product,
      quantity: item.quantity,
    };
  });

  const tokenResponse = await getToken({
    amount: totalAmount,
    currency: "USD",
    order_id: 1,
  });

  const { id: tokenId } = tokenResponse.data.token;

  const payResponse = await pay({
    token_id: tokenId,
    credit_card: card.number,
    card_holder_name: card.holder,
    cvv: card.ccv,
    expire_date: card.expiration,
  });

  const ready = !("redirect_url" in payResponse.data);

  await db.order.create({
    data: {
      userId: user.id,
      tokenId,
      transactionId: payResponse.data.transaction_id,
      ready,
      items: {
        createMany: {
          data: products.map(({ quantity, product }) => ({
            productId: product.id,
            price: product.price,
            quantity,
          })),
        },
      },
    },
  });

  if ("redirect_url" in payResponse.data) {
    return response.json({ url: payResponse.data.redirect_url });
  }

  return response.sendStatus(201);
};

const webHook = async (request: CheckOutWebHookRequest, response: Response) => {
  const {
    event_name: eventName,
    payload: {
      token: { id: tokenId },
    },
  } = request.body;

  if (eventName === "transaction.paid") {
    await db.order.update({
      where: {
        tokenId,
      },
      data: {
        ready: true,
      },
    });
  } else {
    await db.order.delete({
      where: {
        tokenId,
      },
    });
  }

  return response.sendStatus(200);
};

export const checkOutController = {
  checkOut,
  webHook,
};
