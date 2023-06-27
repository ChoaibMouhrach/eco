import db from "@src/config/db";
import { Tag as TTag } from "@prisma/client";
import { Resource } from "./Resource";

export default class Tag extends Resource<{ name: string }, TTag> {
  public constructor(name?: string) {
    super({ name: name ?? String(Math.random()) });
  }

  public async createDB(): Promise<TTag> {
    const tag = await db.tag.create({
      data: this.data,
    });

    this.instance = tag;

    return tag;
  }

  public async checkDB() {
    return await db.tag.findUnique({
      where: {
        id: this.instance!.id,
      },
    });
  }

  public async destroy() {
    await db.tag.delete({
      where: {
        id: this.instance!.id,
      },
    });
  }
}
