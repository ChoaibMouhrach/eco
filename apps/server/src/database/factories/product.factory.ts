import { IFactory } from "ash";
import Category from "../../models/Category";
import { faker } from "@faker-js/faker"
import { IProduct } from "../../interfaces/Product";

export default class ProductFactory implements IFactory {

  public async definition(): Promise<IProduct> {

    const category = new Category({
      name: faker.helpers.unique(faker.name.firstName)
    });

    await category.save()

    return {
      name: faker.name.firstName(),
      images: ["image"],
      price: Math.floor(Math.random() * 1000) + 100,
      discount: Math.floor(Math.random() * 100) + 1,
      inStock: Math.floor(Math.random() * 10) + 1 > 5,
      shortDescription: faker.random.words(8),
      description: faker.random.words(22),
      categories: [String(category._id)]
    }
  }

}
