import db from "@src/config/db";
import { Category as TCategory } from "@prisma/client";
import { Resource } from "./Resource";

export default class Category extends Resource<{ name: string }, TCategory> {
  public constructor(name?: string) {
    super({ name: name ?? String(Math.random()) });
  }

  public checkDB() {
    return db.category.findUnique({
      where: {
        id: this.instance!.id,
      },
    });
  }

  public async createDB(): Promise<TCategory> {
    const category = await db.category.create({
      data: this.data,
    });

    this.instance = category;

    return category;
  }

  public async destroy() {
    await db.category.delete({
      where: {
        id: this.instance!.id,
      },
    });
  }
}
