import request from "supertest";
import User from "../../src/models/User";
import Category from "../../src/models/Category";
import Product from "../../src/models/Product";
import {
  categoryPayload,
  productPayload,
  userPayload,
} from "../../src/common/constants/testData.constant";
import bcrypt from "bcrypt";
import { config } from "../../src/config/config";
import jwt from "jsonwebtoken";
import makeApp from "../../src/app";
import { join } from "path";
import { existsSync } from "fs";

let token: string;

beforeEach(async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();

  const admin = new User({
    ...userPayload,
    isAdmin: true,
    verifiedAt: new Date(),
    password: bcrypt.hashSync("password", Number(config.SALT)),
  });

  token = jwt.sign({ _id: admin._id }, config.ACCESS_SECRET);

  await admin.save();
});

afterEach(async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
});

describe("GET /products", () => {
  it("Should return 200 with a list of categories", async () => {
    const product = new Product(productPayload);
    await product.save();

    const response = await request(await makeApp())
      .get("/products")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);

    expect(response.body?.data.length).toBe(1);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });

  it("Should return 200 with a list of projected categories", async () => {
    const product = new Product(productPayload);
    await product.save();

    const response = await request(await makeApp()).get(
      "/products?project=name"
    );

    expect(response.status).toBe(200);

    expect(response.body?.data[0]?.name).toBeDefined();
    expect(response.body?.data[0]?.createdAt).toBeUndefined();

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });

  it("Should return 200 with a list of searched categories", async () => {
    const product = new Product(productPayload);
    await product.save();

    const productx = new Product({
      ...productPayload,
      name: "Hyperx origin alloy 60",
    });
    await productx.save();

    const response = await request(await makeApp()).get(
      "/products?search=product"
    );

    expect(response.status).toBe(200);

    expect(response.body.data.length).toBe(1);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });

  it("Should return 200 with a list of sorted categories", async () => {
    const productx = new Product({
      ...productPayload,
      name: "b",
    });
    await productx.save();

    const product = new Product({
      ...productPayload,
      name: "a",
    });
    await product.save();

    const response = await request(await makeApp()).get("/products?sort=name");

    expect(response.status).toBe(200);

    expect(response.body.data[0].name).toBe(product.name);
    expect(response.body.data[1].name).toBe(productx.name);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });

  it("Should return 200 with a list of sorted categories DESC", async () => {
    const product = new Product({
      ...productPayload,
      name: "a",
    });
    await product.save();

    const productx = new Product({
      ...productPayload,
      name: "b",
    });
    await productx.save();

    const response = await request(await makeApp()).get("/products?sort=name");

    expect(response.status).toBe(200);

    expect(response.body.data[0].name).toBe(product.name);
    expect(response.body.data[1].name).toBe(productx.name);

    expect(response.body?.skip).toBeDefined();
    expect(response.body?.limit).toBeDefined();
    expect(response.body?.page).toBeDefined();
    expect(response.body?.count).toBeDefined();
  });
});

describe("GET /products/:id", () => {
  it("SHould return 200 with product", async () => {
    const product = new Product(productPayload);
    await product.save();

    const response = await request(await makeApp()).get(
      `/products/${product._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name);
  });

  it("Should return 400 with id is invalid", async () => {
    const response = await request(await makeApp()).get(`/products/1`);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("Id is invalid");
    expect(response.body?.error).toBe("Bad Request");
  });
});

describe("POST /products", () => {
  it("Should return 201 with product", async () => {
    const category = new Category(categoryPayload);
    await category.save();
    const path = join(config.ROOT_DIR, "../__tests__/storage/img.jpg");

    const response = await request(await makeApp())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name)
      .field("price", 999)
      .field("discount", 20)
      .field("inStock", true)
      .field("shortDescription", "Short")
      .field("description", "Long")
      .field("categories", JSON.stringify([category._id]))
      .attach("images", path);

    expect(response.status).toBe(200);
    expect(response.body?.name).toBe(productPayload.name);
    expect(response.body?.images).toBeDefined();
  });

  it("Should return 400 with At least one category is required", async () => {
    const category = new Category(categoryPayload);
    await category.save();
    const path = join(config.ROOT_DIR, "../__tests__/storage/img.jpg");

    const response = await request(await makeApp())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name)
      .field("price", 999)
      .field("discount", 20)
      .field("inStock", true)
      .field("shortDescription", "Short")
      .field("description", "Long")
      .field("categories", "[]")
      .attach("images", path);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: "At least one category is required", path: ["categories"] },
    ]);
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 400 Name required", async () => {
    const category = new Category(categoryPayload);
    await category.save();
    const path = join(config.ROOT_DIR, "../__tests__/storage/img.jpg");

    const response = await request(await makeApp())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .field("price", 999)
      .field("discount", 20)
      .field("inStock", true)
      .field("shortDescription", "Short")
      .field("description", "Long")
      .field("categories", JSON.stringify([category._id]))
      .attach("images", path);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: "Required", path: ["name"] },
    ]);
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 400 Images are required", async () => {
    const category = new Category(categoryPayload);
    await category.save();

    const response = await request(await makeApp())
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name)
      .field("price", 999)
      .field("discount", 20)
      .field("inStock", true)
      .field("shortDescription", "Short")
      .field("description", "Long")
      .field("categories", JSON.stringify([category._id]));

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: "Required", path: ["images"] },
    ]);
    expect(response.body?.error).toBe("Bad Request");
  });
});

describe("PATCH /products/:id", () => {
  it("Should return 200 with product", async () => {
    const product = new Product(productPayload);
    await product.save();

    const response = await request(await makeApp())
      .patch(`/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name + 1);

    expect(response.status).toBe(200);
    expect(response.body?.name).toBe(productPayload.name + 1);
  });

  //

  it("Should return 404 with Invalid id", async () => {
    const product = new Product(productPayload);

    const response = await request(await makeApp())
      .patch(`/products/${product._id}1`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name + 1);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("Invalid id");
    expect(response.body?.error).toBe("Bad Request");
  });

  it("Should return 404 with product not found", async () => {
    const product = new Product(productPayload);

    const response = await request(await makeApp())
      .patch(`/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", productPayload.name + 1);

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe("Product not found");
    expect(response.body?.error).toBe("Not Found");
  });
});

describe("DELETE /products/:id", () => {
  it("Should return 204", async () => {
    const product = new Product(productPayload);
    await product.save();

    const response = await request(await makeApp())
      .delete(`/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("Should return 404 with Product not found", async () => {
    const product = new Product(productPayload);

    const response = await request(await makeApp())
      .delete(`/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe("Product not found");
    expect(response.body?.error).toBe("Not Found");
  });

  it("Should return 400 with Id is invalid", async () => {
    const response = await request(await makeApp())
      .delete(`/products/1`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe("Id is invalid");
    expect(response.body?.error).toBe("Bad Request");
  });
});
