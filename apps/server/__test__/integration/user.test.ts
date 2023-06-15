import { User } from "@prisma/client";
import config from "@src/config/config";
import db from "@src/config/db";
import { ROLES } from "@src/constants";
import jwt from "jsonwebtoken";
import { makeUser } from "../config/test-data";
import request from "../config/request";

let userAccount: User;
let userAccessToken: string;

let adminAccount: User;
let adminAccessToken: string;

beforeAll(async () => {
  userAccount = await db.user.create({
    data: makeUser(),
  });

  adminAccount = await db.user.create({
    data: makeUser(ROLES.ADMIN),
  });

  userAccessToken = jwt.sign({ id: userAccount.id }, config.SECRET_ACCESS);
  adminAccessToken = jwt.sign({ id: adminAccount.id }, config.SECRET_ACCESS);
});

afterAll(async () => {
  await db.user.deleteMany({
    where: {
      OR: [{ id: userAccount.id }, { id: adminAccount.id }],
    },
  });
});

describe("GET /users", () => {
  const getUsers = () =>
    request()
      .get("/api/users")
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 200 with paginated users", async () => {
    const response = await getUsers();

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with users having v in data", async () => {
    const response = await getUsers();

    expect(
      response.body.data.every((item: User) => {
        return (
          item.firstName.includes("v") ||
          item.lastName.includes("v") ||
          item.email.includes("v") ||
          item.address.includes("v")
        );
      })
    ).toBe(true);
  });
});

describe("GET /users/:id", () => {
  const getUser = (id: number) =>
    request()
      .get(`/api/users/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 200 with user", async () => {
    const userPayload = makeUser();
    const user = await db.user.create({
      data: userPayload,
    });

    const response = await getUser(user.id);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.id);

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 400 with user not found", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    const response = await getUser(user.id);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "User not found",
          path: ["xId"],
        }),
      ])
    );
  });
});

describe("POST /users", () => {
  const storeUser = () =>
    request()
      .post("/api/users")
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 201 with user", async () => {
    const userPayload = makeUser();

    const response = await storeUser().send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(userPayload.email);

    await db.user.delete({
      where: {
        id: response.body.id,
      },
    });
  });

  it("Should return 400 with data required", async () => {
    const response = await storeUser();
    expect(response.status).toBe(400);

    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["firstName"],
        }),
        expect.objectContaining({
          message: "Required",
          path: ["firstName"],
        }),
        expect.objectContaining({
          message: "Required",
          path: ["email"],
        }),
        expect.objectContaining({
          message: "Required",
          path: ["phone"],
        }),
        expect.objectContaining({
          message: "Required",
          path: ["address"],
        }),
      ])
    );
  });

  it("Should return 400 with user already exists", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({ data: userPayload });

    const response = await storeUser().send(userPayload);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Email Address already exists",
          path: ["email"],
        }),
      ])
    );

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });
});

describe("PATCH /users/:id", () => {
  const updateUser = (id: number) =>
    request()
      .patch(`/api/users/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({ data: userPayload });
    const response = await updateUser(user.id).send({ firstName: "cam" });

    expect(response.status).toBe(204);
    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 400 email and phone already exists", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({ data: userPayload });
    const response = await updateUser(user.id).send(user);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Email Address already exists",
        }),
        expect.objectContaining({
          path: ["phone"],
          message: "Phone already exists",
        }),
      ])
    );

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 400 with user not found", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({ data: userPayload });

    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    const response = await updateUser(user.id).send(user);

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

describe("DELETE /users/:id", () => {
  const deleteUser = (id: number) =>
    request()
      .delete(`/api/users/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const response = await deleteUser(user.id);

    expect(response.status).toBe(204);
  });

  it("Should return 400 with user not found", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    const response = await deleteUser(user.id);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "User not found",
          path: ["xId"],
        }),
      ])
    );
  });
});

describe("AUTHORIZATION", () => {
  it("Should return 401", async () => {
    let response = await request()
      .get("/api/users")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .get("/api/users/xxxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .post("/api/users")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/users/xxxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/users/xxxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);
  });
});
