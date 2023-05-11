import { IFactory } from 'ash';
import { faker } from '@faker-js/faker';
import { ICategory } from '../../interfaces/Category';

export default class CategoryFactory implements IFactory {
  public async definition(): Promise<ICategory> {
    return {
      name: faker.helpers.unique(faker.word.noun),
    };
  }
}
