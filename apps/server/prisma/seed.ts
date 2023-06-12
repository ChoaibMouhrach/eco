import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
  await db.role.createMany({
    data: [
      {
        name: "member",
      },
      {
        name: "admin",
      },
    ],
  });

  console.log("Done");
};

main();
