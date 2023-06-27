import db from "@src/config/db";
import { Unit as TUnit } from "@prisma/client";
import { Resource } from "./Resource";

export default class Unit extends Resource<{ name: string }, TUnit> {
  public constructor(name?: string) {
    super({ name: name ?? String(Math.random()) });
  }

  public async createDB() {
    const unit = await db.unit.create({
      data: this.data,
    });

    this.instance = unit;

    return unit;
  }

  public async checkDB() {
    return await db.unit.findUnique({
      where: {
        id: this.instance!.id,
      },
    });
  }

  public async destroy() {
    await db.unit.delete({
      where: {
        id: this.instance!.id,
      },
    });
  }
}
