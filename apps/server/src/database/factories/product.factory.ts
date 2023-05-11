import { IFactory } from 'ash';
import { faker } from '@faker-js/faker/locale/de';
import { IProduct } from '../../interfaces/Product';

export default class ProductFactory implements IFactory {
  public async definition(categories: string[]): Promise<IProduct> {
    return {
      name: faker.name.firstName(),
      images: ['image'],
      price: Math.floor(Math.random() * 1000) + 100,
      discount: Math.floor(Math.random() * 100) + 1,
      inStock: Math.floor(Math.random() * 10) + 1 > 5,
      shortDescription: faker.random.words(8),
      description: faker.random.words(22),
      categories,
    };
  }
}
