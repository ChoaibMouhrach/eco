import db from "@src/config/db";
import request from "../config/request";
import User from "../config/User";
import Product from "../config/Product";
import Order from "../config/Order";

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

describe("GET /orders", () => {

  it("Should return 200 with paginated data", async () => {

    const response = await request()
      .get("/api/orders")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      data: expect.any(Array),
      count: expect.any(Number),
      page: expect.any(Number),
      limit: expect.any(Number),
    });

  });
});

describe("GET /orders/:id", () => {
  it("SHould return 200 with order info", async () => {

    const product: Product = new Product();
    await product.createDB();

    const order = new Order({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }]
    })

    await order.createDB();

    const response = await request()
      .get(`/api/orders/${order.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(200);

    await order.destroy();
    await product.destroy();
  });

  it("Should return 400 with order not found", async () => {

    const response = await request()
      .get("/api/orders/999999")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: ["xId"],
        message: "Order not found",
      })
    ]))

  });

});

describe("POST /orders", () => {

  it("Should return 201 with created order", async () => {

    const product = new Product();

    await product.createDB();

    const response = await request()
      .post("/api/orders")
      .send({
        userId: admin.instance!.id,
        products: [{ id: product.instance!.id, quantity: 10 }]
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    await db.order.delete({
      where: {
        id: response.body.id
      }
    })

    await product.destroy();

  });

  it("Should return 400 with name required", async () => {

    const response = await request()
      .post("/api/orders")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: ["userId"],
        message: "Required",
      })
    ]))

  });

});

describe("PATCH /orders/:id", () => {

  it("Should return 204", async () => {

    const product = new Product();
    await product.createDB();

    const order = new Order({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }]
    })

    await order.createDB();

    const response = await request()
      .patch("/api/orders/1")
      .send({
        products: [{ id: product.instance!.id, quantity: 20 }]
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(204);

    await product.destroy();
    await order.destroy();
  });

  it("Should return 400 with order not found", async () => {

    const response = await request()
      .patch("/api/orders/999999")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: ["xId"],
        message: "Order not found",
      })
    ]))

  });

  it("Should return 400 with change someting first", async () => {

    const response = await request()
      .patch("/api/orders/1")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(expect.arrayContaining([
      expect.objectContaining({
        message: "Change something first",
      })
    ]))

  });
});

describe("DELETE /orders/:id", () => {
  it("Should return 200", async () => {

    const product = new Product();
    await product.createDB();

    const order = new Order({
      userId: admin.instance!.id,
      products: [{ id: product.instance!.id, quantity: 10 }]
    })

    await order.createDB();

    const response = await request()
      .delete(`/api/orders/${order.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(204);

    await product.destroy();
  });

  it("Should return 400 with order not found", async () => {
    const response = await request()
      .delete(`/api/orders/9999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: ["xId"],
        message: "Order not found",
      })
    ]))
  });

});

describe("AUTHORIZATION", () => {
  it("Should return 401 with unauthorized", async () => {
    const user = new User();
    await user.createDB();

    let response = await request()
      .get("/api/orders")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`)

    expect(response.status).toBe(401);

    response = await request()
      .get("/api/orders/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`)

    expect(response.status).toBe(401);

    response = await request()
      .post("/api/orders")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`)

    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/orders/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`)

    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/orders/1")
      .set("Cookie", `accessToken=${user.tokens.access.token}1`)

    expect(response.status).toBe(401);

    await user.destroy();
  });
});
