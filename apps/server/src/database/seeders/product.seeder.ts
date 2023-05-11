import { ISeeder, Seeder } from 'ash';
import ProductFactory from '../factories/product.factory';
import Category from '../../models/Category';
import { IProduct } from '../../interfaces/Product';
import Product from '../../models/Product';

export default class ProductSeeder extends Seeder implements ISeeder {
  public async run() {
    const category = new Category({
      name: String(Math.random()),
    });
    await category.save();

    const factory = new ProductFactory();
    const definitions: Promise<IProduct>[] = [];

    for (let i = 0; i < 100; i++) {
      definitions.push(new Promise((res) => res(factory.definition([String(category._id)]))));
    }

    await Product.insertMany(await Promise.all(definitions));
  }
}
