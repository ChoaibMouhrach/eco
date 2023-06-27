import db from "@src/config/db";
import request from "../config/request";
import User from "../config/User";
import Category from "../config/Category";

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

describe("GET /categories", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/categories")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with v in the name", async () => {
    const category1 = new Category();
    const category2 = new Category();

    await category1.createDB();
    await category2.createDB();

    const response = await request()
      .get("/api/categories?search=v")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);

    expect(
      response.body.data.filter(
        (data: any) => !data.name.toLowerCase().includes("v")
      ).length
    ).toBe(0);

    await category1.destroy();
    await category2.destroy();
  });
});

describe("GET /categories/:id", () => {
  it("SHould return 200 with category info", async () => {
    const category = new Category();

    await category.createDB();

    const response = await request()
      .get(`/api/categories/${category.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(category.instance!.id);

    await category.destroy();
  });

  it("Should return 400 with Category not found", async () => {
    const response = await request()
      .get(`/api/categories/10000000000`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Category not found",
        }),
      ])
    );
  });
});

describe("POST /categories", () => {
  it("Should return 201 with created category", async () => {
    const category = new Category();

    const response = await request()
      .post("/api/categories")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .send(category.data);

    expect(response.status).toBe(201);

    await db.category.delete({
      where: {
        id: response.body.id,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const response = await request()
      .post("/api/categories")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Required",
        }),
      ])
    );
  });

  it("Should return 400 with name errors", async () => {
    const category = new Category();

    await category.createDB();

    const response = await request()
      .post("/api/categories")
      .send(category.data)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Name already exists",
        }),
      ])
    );

    await category.destroy();
  });
});

describe("PATCH /categories/:id", () => {
  it("Should return 204", async () => {
    const category = new Category();
    await category.createDB();

    const name: string = `Vod${Math.random()}`;

    const response = await request()
      .patch(`/api/categories/${category.instance!.id}`)
      .send({
        name,
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect((await category.checkDB())!.name).toBe(name);

    await category.destroy();
  });

  it("Should return 400 with category not found", async () => {
    const response = await request()
      .patch(`/api/categories/999999`)
      .send({ name: "jck" })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Category not found",
        }),
      ])
    );
  });

  it("Should return 400 with Name already exists", async () => {
    const category = new Category();
    await category.createDB();

    const response = await request()
      .patch(`/api/categories/${category.instance!.id}`)
      .send({
        name: category.data.name,
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Name already exists",
        }),
      ])
    );

    await category.destroy();
  });
});

describe("DELETE /categories/:id", () => {
  it("Should return 200", async () => {
    const category = new Category();
    await category.createDB();

    const response = await request()
      .delete(`/api/categories/${category.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect(await category.checkDB()).toBeFalsy();
  });

  it("Should return 400 with category not found", async () => {
    const response = await request()
      .delete(`/api/categories/99999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Category not found",
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
      .post("/api/categories")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/categories/56654")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/categories/2435")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    await user.destroy();
  });
});
