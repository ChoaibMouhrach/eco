import { Prisma } from "@prisma/client";
import db from "@src/config/db";
import { NotFoundException } from "@src/exceptions";

export const findUser = (id: number) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const findUserOrThrow = async (where: Prisma.UserWhereUniqueInput) => {
  const user = await db.user.findUnique({
    where,
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new NotFoundException(`User not found`);
  }

  return user;
};
