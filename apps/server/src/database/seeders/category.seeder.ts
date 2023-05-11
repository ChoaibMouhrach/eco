import { ISeeder, Seeder } from 'ash';
import Category from '../../models/Category';
import CategoryFactory from '../factories/category.factory';
import { ICategory } from '../../interfaces/Category';

export default class CategorySeeder extends Seeder implements ISeeder {
  public async run() {
    const factory = new CategoryFactory();
    const definitions: Promise<ICategory>[] = [];

    for (let i = 0; i < 100; i++) {
      definitions.push(new Promise((res) => res(factory.definition())));
    }

    await Category.insertMany(await Promise.all(definitions));
  }
}
