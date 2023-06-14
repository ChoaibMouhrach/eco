import { User } from "@prisma/client";
import config from "@src/config/config";
import db from "@src/config/db";
import { ROLES } from "@src/constants";
import jwt from "jsonwebtoken";
import { makeCategory, makeUser } from "../config/test-data";
import request from "../config/request";

let user: User;
let userAccessToken: string;

let admin: User;
let adminAccessToken: string;

beforeAll(async () => {
  user = await db.user.create({
    data: makeUser(),
  });

  admin = await db.user.create({
    data: makeUser(ROLES.ADMIN),
  });

  userAccessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);
  adminAccessToken = jwt.sign({ id: admin.id }, config.SECRET_ACCESS);
});

afterAll(async () => {
  await db.user.deleteMany({
    where: {
      OR: [{ id: user.id }, { id: admin.id }],
    },
  });
});

describe("GET /categories", () => {
  it("Should return 200 with paginated body", async () => {
    const response = await request().get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return categories", async () => {
    const response = await request().get("/api/categories");
    expect(response.status).toBe(200);
  });

  it("Should return categories with v in in the category name", async () => {
    const response = await request().get("/api/categories?search=v");
    expect(response.status).toBe(200);
    expect(
      response.body.data.every((item: { name: string }) =>
        item.name.includes("v")
      )
    ).toBe(true);
  });
});

describe("POST /categories", () => {
  const storeCategory = () =>
    request()
      .post("/api/categories")
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 201 with the category", async () => {
    const category = makeCategory();
    const response = await storeCategory().send(category);

    expect(response.status).toBe(201);
    expect(
      await db.category.findUnique({
        where: {
          name: category.name,
        },
      })
    ).toBeTruthy();

    await db.category.delete({
      where: {
        name: category.name,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const response = await storeCategory();
    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["name"],
        }),
      ])
    );
  });

  it("Should return 400 with category already exists", async () => {
    // generates a random { name : random }
    const category = makeCategory();

    // store category
    await db.category.create({
      data: {
        name: category.name,
      },
    });

    // send http store request
    const response = await storeCategory().send(category);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Category already exists",
        }),
      ])
    );

    await db.category.delete({
      where: {
        name: category.name,
      },
    });
  });
});

describe("UPDATE /categories/:id", () => {
  const updateCategory = (id: number) =>
    request()
      .patch(`/api/categories/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const categoryPayload = makeCategory();

    const category = await db.category.create({
      data: categoryPayload,
    });

    const newName = `cam${Math.random()}`;

    const response = await updateCategory(category.id).send({
      name: newName,
    });

    expect(response.status).toBe(204);

    expect(
      (
        await db.category.findUnique({
          where: {
            id: category.id,
          },
        })
      )?.name
    ).toBe(newName);

    await db.category.delete({
      where: {
        id: category.id,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const categoryPayload = makeCategory();

    const category = await db.category.create({
      data: categoryPayload,
    });

    const response = await updateCategory(category.id);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["name"],
        }),
      ])
    );

    await db.category.delete({
      where: {
        id: category.id,
      },
    });
  });

  it("Should return 401 with category already exists", async () => {
    const categoryPayload = makeCategory();

    const category = await db.category.create({
      data: categoryPayload,
    });

    const response = await updateCategory(category.id).send({
      name: category.name,
    });

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Category already exists",
          path: ["name"],
        }),
      ])
    );

    await db.category.delete({
      where: {
        id: category.id,
      },
    });
  });
});

describe("DELETE /categories/:id", () => {
  const deleteCategory = (id: number) =>
    request()
      .delete(`/api/categories/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const categoryPayload = makeCategory();
    const category = await db.category.create({
      data: categoryPayload,
    });

    const response = await deleteCategory(category.id);

    expect(response.status).toBe(204);
  });

  it("Should return 400 with category not found", async () => {
    const response = await deleteCategory(Math.random());

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Invalid",
          path: ["xId"],
        }),
      ])
    );
  });
});

describe("AUTHORIZATION", () => {
  it("Should return 401 when user is not admin", async () => {
    let response = await request()
      .post("/api/categories")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/categories/xxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/categories/xxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);
  });
});
