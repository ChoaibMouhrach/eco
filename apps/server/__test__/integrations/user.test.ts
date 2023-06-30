import db from "@src/config/db";
import request from "../config/request";
import User from "../config/User";

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

describe("GET /users", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/users")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with v in the name", async () => {
    const user1 = new User({ data: { firstName: "any" } });
    const user2 = new User({ data: { firstName: "vim" } });

    await user1.createDB();
    await user2.createDB();

    const response = await request()
      .get("/api/users?search=v")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);

    expect(
      response.body.data.filter((data: any) => !data.firstName.includes("v"))
        .length
    ).toBe(0);

    await user1.destroy();
    await user2.destroy();
  });
});

describe("GET /users/:id", () => {
  it("SHould return 200 with user info", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .get(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.instance!.id);

    await user.destroy();
  });

  it("Should return 400 with user not found", async () => {
    const response = await request()
      .get(`/api/users/10000000000`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "User not found",
        }),
      ])
    );
  });
});

describe("POST /users", () => {
  it("Should return 201 with created user", async () => {
    const user = new User();

    const response = await request()
      .post("/api/users")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .send(user.data);

    expect(response.status).toBe(201);

    await db.user.delete({
      where: {
        id: response.body.id,
      },
    });
  });

  it("Should return 400 with fields required", async () => {
    const response = await request()
      .post("/api/users")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["firstName"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["lastName"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["email"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["address"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["phone"],
          message: "Required",
        }),
      ])
    );
  });

  it("Should return 400 with email address is taken", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .post("/api/users")
      .send(user.data)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Email Address already exists",
        }),
      ])
    );

    await user.destroy();
  });
});

describe("PATCH /users/:id", () => {
  it("Should return 204", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .patch(`/api/users/${user.instance!.id}`)
      .send({
        firstName: "VVV",
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect((await user.checkDB())!.firstName).toBe("VVV");

    await user.destroy();
  });

  it("Should return 400 with user not found", async () => {
    const response = await request()
      .patch(`/api/users/999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "User not found",
        }),
      ])
    );
  });

  it("Should return 400 with change something first", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .patch(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Change something first",
        }),
      ])
    );

    await user.destroy();
  });

  it("Should return 400 with email already exists", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .patch(`/api/users/${user.instance!.id}`)
      .send({
        email: user.data.email,
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);

    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Email Address already exists",
        }),
      ])
    );

    await user.destroy();
  });
});

describe("DELETE /users/:id", () => {
  it("Should return 204", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .delete(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect(await user.checkDB()).toBeFalsy();
  });

  it("Should return 400 with user not found", async () => {
    const response = await request()
      .delete(`/api/users/99999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "User not found",
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
      .get("/api/users")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .get(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .post("/api/users")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .patch(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .delete(`/api/users/${user.instance!.id}`)
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    await user.destroy();
  });
});
