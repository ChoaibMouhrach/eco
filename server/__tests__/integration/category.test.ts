import makeApp from "../../src/app";
import request from "supertest";
import { config } from "../../src/config/config";
import Category from "../../src/models/Category";
import {
  categoryPayload,
  userPayload,
} from "../../src/common/constants/testData.constant";
import User from "../../src/models/User";
import jwt from "jsonwebtoken";

let token: string;

beforeEach(async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
  jest.clearAllMocks();

  const user = new User({
    ...userPayload,
    isAdmin: true,
    verifiedAt: new Date(),
  });

  token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);

  await user.save();
});

afterEach(async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
});

describe("GET /categories", () => {
  it("Should return 200 with a list of categories", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp()).get("/categories");

    expect(response.status).toBe(200);

    expect(response.body?.data[0]?.name).toBe(category.name);

    expect(response.body?.limit).toBeDefined();
    expect(response.body?.skip).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });

  it("Should return 200 with a list of projected categories", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp()).get(
      `/categories?project=name`
    );

    expect(response.status).toBe(200);

    expect(response.body?.data.length).toBe(1);

    expect(response.body?.data[0]?.name).toBeDefined();
    expect(response.body?.data[0]?.createdAt).toBeUndefined();

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.count).toBeDefined();
    expect(response.body?.page).toBeDefined();
  });

  it("Should return 200 with a list of searched categories", async () => {
    const category1 = new Category(categoryPayload);
    await category1.save();

    const category = new Category({ name: "mouse" });
    await category.save();

    const response = await request(await makeApp()).get(
      "/categories?search=cat"
    );

    expect(response.status).toBe(200);

    expect(response.body?.data.length).toBe(1);
    expect(response.body?.data[0].name).toBe(category1.name);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.count).toBeDefined();
    expect(response.body?.page).toBeDefined();
  });

  it("Should return 200 with a list of sorted categories", async () => {
    const category = new Category({ name: "b" });
    await category.save();

    const category1 = new Category({ name: "a" });
    await category1.save();

    const response = await request(await makeApp()).get(
      "/categories?sort=name"
    );

    expect(response.status).toBe(200);

    expect(response.body?.data[0].name).toBe(category1.name);
    expect(response.body?.data[1].name).toBe(category.name);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.count).toBeDefined();
    expect(response.body?.page).toBeDefined();
  });

  it("Should return 200 with a list of sorted categories DESC", async () => {
    const category1 = new Category({ name: "a" });
    await category1.save();

    const category = new Category({ name: "b" });
    await category.save();

    const response = await request(await makeApp()).get(
      "/categories?sort=name:desc"
    );

    expect(response.status).toBe(200);

    expect(response.body?.data[0].name).toBe(category.name);
    expect(response.body?.data[1].name).toBe(category1.name);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.count).toBeDefined();
    expect(response.body?.page).toBeDefined();
  });
});

describe("POST /categories", () => {
  it("Should return 201 with Category", async () => {
    const response = await request(await makeApp())
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryPayload);

    console.log(response.body)

    expect(response.status).toBe(201);
  });

  it("Should return 400 with name required", async () => {
    const response = await request(await makeApp())
      .post("/categories")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: "Required", path: ["name"] },
    ]);
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 409 with Category already exist", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp())
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryPayload);

    expect(response.status).toBe(409);

    expect(response.body?.statusCode).toBe(409);
    expect(response.body?.message).toBe("Category already exist");
    expect(response.body?.error).toBe("Conflict");
  });
});

describe("PATCH /categories/:id", () => {
  it("Should return 204", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp())
      .patch(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(204);
  });

  it("Should return 400 with The provided id is invalid", async () => {
    const response = await request(await makeApp())
      .patch(`/categories/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("The provided id is invalid");
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 404 with Category not found", async () => {
    const category = new Category(categoryPayload);

    const response = await request(await makeApp())
      .patch(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(categoryPayload);

    expect(response.status).toBe(404);

    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe("Category Not Found");
    expect(response.body?.error).toBe("Not Found");
  });

  it("Should return 400 with Nothing to update", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp())
      .patch(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);

    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("Nothing to update");
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 409 with Name already exists", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const categoryx = new Category({ name: categoryPayload.name + 1 });
    await categoryx.save();

    const response = await request(await makeApp())
      .patch(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(409);

    expect(response.body?.statusCode).toBe(409);
    expect(response.body?.message).toBe("Name already exists");
    expect(response.body?.error).toBe("Conflict");
  });
});

describe("DELETE /categories/:id", () => {
  it("Should return 204", async () => {
    const category = new Category({ name: categoryPayload.name + 1 });
    await category.save();

    const response = await request(await makeApp())
      .delete(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(204);
  });

  it("Should return 404 with Category not found", async () => {
    const category = new Category({ name: categoryPayload.name + 1 });

    const response = await request(await makeApp())
      .delete(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe("Category Not Found");
    expect(response.body?.error).toBe("Not Found");
  });

  it("Should return 400 with The provided id is invalid", async () => {
    const response = await request(await makeApp())
      .delete(`/categories/1`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: categoryPayload.name + 1 });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("The provided id is invalid");
    expect(response.body?.error).toBe("Bad Request");
  });
});
