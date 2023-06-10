import db from "@src/config/db";

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
