import db from "@src/config/db";
import { ROLES } from "@src/constants";
import request from "../config/request";
import User from "../config/User";
import Product from "../config/Product";
import Purchase from "../config/Purchase";

const admin: User = new User({
  data: {
    roleId: ROLES.ADMIN,
  },
});

beforeAll(async () => {
  await admin.createDB();
});

afterAll(async () => {
  await admin.destroy();
});

describe("GET /purchases", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/purchases")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: expect.any(Array),
      count: expect.any(Number),
      page: expect.any(Number),
      limit: expect.any(Number),
    });
  });
});

describe("GET /purchases/:id", () => {
  it("SHould return 200 with purchase info", async () => {
    const product: Product = new Product();
    await product.createDB();

    const purchase = new Purchase({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }],
    });

    await purchase.createDB();

    const response = await request()
      .get(`/api/purchases/${purchase.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);

    await purchase.destroy();
    await product.destroy();
  });

  it("Should return 400 with purchase not found", async () => {
    const response = await request()
      .get("/api/purchases/999999")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Purchase not found",
        }),
      ])
    );
  });
});

describe("POST /purchases", () => {
  it("Should return 201 with created purchase", async () => {
    const product = new Product();

    await product.createDB();

    const response = await request()
      .post("/api/purchases")
      .send({
        userId: admin.instance!.id,
        products: [{ id: product.instance!.id, quantity: 10 }],
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    await db.purchase.delete({
      where: {
        id: response.body.id,
      },
    });

    await product.destroy();
  });

  it("Should return 400 with name required", async () => {
    const response = await request()
      .post("/api/purchases")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["userId"],
          message: "Required",
        }),
      ])
    );
  });
});

describe("PATCH /purchases/:id", () => {
  it("Should return 204", async () => {
    const product = new Product();
    await product.createDB();

    const purchase = new Purchase({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }],
    });

    await purchase.createDB();

    const response = await request()
      .patch(`/api/purchases/${purchase.instance!.id}`)
      .send({
        products: [{ id: product.instance!.id, quantity: 20 }],
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    await product.destroy();
    await purchase.destroy();
  });

  it("Should return 400 with purchase not found", async () => {
    const response = await request()
      .patch("/api/purchases/999999")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Purchase not found",
        }),
      ])
    );
  });

  it("Should return 400 with change someting first", async () => {
    const response = await request()
      .patch("/api/purchases/1")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Change something first",
        }),
      ])
    );
  });
});

describe("DELETE /purchases/:id", () => {
  it("Should return 200", async () => {
    const product = new Product();
    await product.createDB();

    const purchase = new Purchase({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }],
    });

    await purchase.createDB();

    const response = await request()
      .delete(`/api/purchases/${purchase.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    await product.destroy();
  });

  it("Should return 400 with purchase not found", async () => {
    const response = await request()
      .delete(`/api/purchases/9999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Purchase not found",
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
      .get("/api/purchases")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`);

    expect(response.status).toBe(401);

    response = await request()
      .get("/api/purchases/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`);

    expect(response.status).toBe(401);

    response = await request()
      .post("/api/purchases")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`);

    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/purchases/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`);

    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/purchases/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`);

    expect(response.status).toBe(401);

    await user.destroy();
  });
});
