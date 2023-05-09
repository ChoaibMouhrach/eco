import { ISeeder, Seeder } from "ash";
import ProductFactory from "../factories/product.factory";
import { IProduct } from "../../interfaces/Product";
import Product from "../../models/Product";

export default class ProductSeeder extends Seeder implements ISeeder {

  public async run() {

    const productFactory = new ProductFactory();
    let products: Promise<IProduct>[] = []

    for (let i = 0; i < 100; i++) {
      products.push(
        Product.create(await productFactory.definition())
      )
    }

    await Promise.all(products)

  }

}
