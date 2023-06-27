import { Purchase as TPurchase } from "@prisma/client";
import db from "@src/config/db";
import { Resource } from "./Resource";

interface PurchaseData {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
}

export default class Purchase extends Resource<PurchaseData, TPurchase> {
  public constructor(data: PurchaseData) {
    super(data);
  }

  public async createDB() {
    const products = await db.product.findMany({
      where: {
        OR: this.data.products.map((product) => ({
          id: product.id,
        })),
      },
    });

    const purchase = await db.purchase.create({
      data: {
        userId: this.data.userId,
        items: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: this.data.products.find((p) => p.id === product.id)!
                .quantity,
              price: product.price,
            })),
          },
        },
      },
    });

    this.instance = purchase;

    return purchase;
  }

  public async checkDB() {
    return await db.purchase.findUnique({
      where: {
        id: this.instance!.id,
      },
    });
  }

  public async destroy() {
    await db.purchase.delete({
      where: {
        id: this.instance!.id,
      },
    });
  }
}
