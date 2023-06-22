import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const db = new PrismaClient();

const main = async () => {
  const tags: Prisma.TagCreateInput[] = [];

  for (let i = 0; i < 10; i += 1) {
    tags.push({
      name: faker.commerce.productMaterial(),
    });
  }

  await db.tag.createMany({
    data: tags,
  });
};

main();
