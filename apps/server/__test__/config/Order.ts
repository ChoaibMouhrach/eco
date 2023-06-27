import { Order as TOrder } from "@prisma/client"
import { Resource } from "./Resource";
import db from "@src/config/db";

interface OrderData {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[]
}

export default class Order extends Resource<OrderData, TOrder> {

  public constructor(data: OrderData) {
    super(data)
  }

  public async createDB() {
    const products = await db.product.findMany({
      where: {
        OR: this.data.products.map((product) => ({
          id: product.id
        }))
      }
    })

    const order = await db.order.create({
      data: {
        userId: this.data.userId,
        items: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: this.data.products.find((p) => p.id === product.id)!.quantity,
              price: product.price
            }))
          }
        }
      }
    })

    this.instance = order

    return order
  }

  public async checkDB() {
    return await db.order.findUnique({
      where: {
        id: this.instance!.id
      }
    })
  }

  public async destroy() {
    await db.order.delete({
      where: {
        id: this.instance!.id
      }
    })
  }

}
