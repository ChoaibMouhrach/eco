import { join } from "path";
import db from "@src/config/db";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import request from "../config/request";
import User from "../config/User";
import Product from "../config/Product";
import Category from "../config/Category";
import Unit from "../config/Unit";

const admin: User = new User({
  data: {
    roleId: 2,
  },
});

beforeAll(async () => {
  await admin.createDB();
});

afterAll(async () => {
  await admin.destroy();
});

describe("GET /products", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/products")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with v in the name", async () => {
    const product1 = new Product({ name: "v1" });
    const product2 = new Product();

    await product1.createDB();
    await product2.createDB();

    const response = await request()
      .get("/api/products?search=v")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(
      response.body.data.filter(
        (data: any) =>
          !data.name.toLowerCase().includes("v") &&
          !data.description.toLowerCase().includes("v")
      ).length
    ).toBe(0);

    await product1.destroy();
    await product2.destroy();
  });
});

describe("GET /products/:id", () => {
  it("SHould return 200 with product info", async () => {
    const product = new Product();

    await product.createDB();

    const response = await request()
      .get(`/api/products/${product.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(product.instance!.id);

    await product.destroy();
  });

  it("Should return 400 with product not found", async () => {
    const response = await request()
      .get(`/api/products/10000000000`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Product not found",
        }),
      ])
    );
  });
});

describe("POST /products", () => {
  it("Should return 201 with created product", async () => {
    const product = new Product();
    const category = new Category();
    const unit = new Unit();

    await unit.createDB();
    await category.createDB();

    const response = await request()
      .post("/api/products")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .field("name", product.data.name)
      .field("price", product.data.price)
      .field("quantity", product.data.quantity)
      .field("description", product.data.description)
      .field("unitId", unit.instance!.id)
      .field("categoryId", category.instance!.id)
      .field("tags", "tag1,tag2")
      .attach("images", join(__dirname, "../assets/small_cement.png"));

    expect(response.status).toBe(201);
    expect(
      await db.product.findUnique({
        where: {
          id: response.body.id,
        },
      })
    ).toBeTruthy();

    await category.destroy();
    await unit.destroy();
  });

  it("Should return 400 with name required", async () => {
    const response = await request()
      .post("/api/products")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["description"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["price"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["quantity"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["unitId"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["categoryId"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["tags"],
          message: "Required",
        }),
      ])
    );
  });
});

describe("PATCH /products/:id", () => {
  it("Should return 204", async () => {
    const product = new Product();

    await product.createDB();

    const response = await request()
      .patch(`/api/products/${product.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .field("name", "Product Name")
      .attach("images", join(__dirname, "../assets/small_cement.png"));

    expect(response.status).toBe(204);
    expect(
      fileExistsSync(
        join(__dirname, "../../", (await product.checkDB())!.images[0].path)
      )
    ).toBeTruthy();

    await product.destroy();
  });

  it("Should return 400 with product not found", async () => {
    const response = await request()
      .patch(`/api/products/999999`)
      .send({ name: "jck" })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Product not found",
        }),
      ])
    );
  });

  it("Should return 400 with change someting first", async () => {
    const product = new Product();

    await product.createDB();

    const response = await request()
      .patch(`/api/products/${product.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Change something first",
        }),
      ])
    );

    await product.destroy();
  });
});

describe("DELETE /products/:id", () => {
  it("Should return 200", async () => {
    const product = new Product();

    await product.createDB();

    const response = await request()
      .delete(`/api/products/${product.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    await product.destroy();
  });

  it("Should return 400 with product not found", async () => {
    const response = await request()
      .delete(`/api/products/999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Product not found",
        }),
      ])
    );
  });
});

describe("AUTHORIZATION", () => {
  it("Should return 401 with unauthorized", async () => {
    const user = new User();
    await user.createDB();

    let response = await request()
      .post("/api/products")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .patch(`/api/products/99999`)
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .delete(`/api/products/99999`)
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    await user.destroy();
  });
});
