import { Product as TProduct } from "@prisma/client";
import db from "@src/config/db";
import { faker } from "@faker-js/faker";
import { Resource } from "./Resource";

interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default class Product extends Resource<ProductData, TProduct> {
  public constructor(data?: Partial<ProductData>) {
    super({
      name: data?.name ?? `Product${Math.random()}`,
      description: data?.description ?? faker.lorem.lines(5),
      price: data?.price ?? Math.floor(Math.random() * 100) + 1,
      quantity: data?.price ?? Math.floor(Math.random() * 100) + 1,
    });
  }

  public async createDB() {
    const category = await db.category.create({
      data: {
        name: `Cat${Math.random()}}`,
      },
    });

    const unit = await db.unit.create({
      data: {
        name: `Unit${Math.random()}}`,
      },
    });

    const product = await db.product.create({
      data: {
        ...this.data,
        categoryId: category.id,
        unitId: unit.id,
      },
    });

    this.instance = product;

    return product;
  }

  public async checkDB() {
    return await db.product.findUnique({
      where: {
        id: this.instance!.id,
      },
      include: {
        images: true,
      },
    });
  }

  public async destroy(): Promise<void> {
    // deleting the product will resolve in product deleting
    await db.category.delete({
      where: {
        id: this.instance!.categoryId,
      },
    });

    await db.unit.delete({
      where: {
        id: this.instance!.unitId,
      },
    });
  }
}
