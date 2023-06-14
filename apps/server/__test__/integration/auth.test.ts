import makeApp from "@src/app";
import db from "@src/config/db";
import request from "supertest";
import jwt from "jsonwebtoken";
import config from "@src/config/config";
import { makeUser } from "../config/test-data";

jest.mock("../../src/lib/mailer.lib", () => ({
  sendMail: () => Promise.resolve(),
}));

describe("POST /sign-in", () => {
  it("Should return 200 with message check your inbox", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const response = await request(makeApp()).post("/api/sign-in").send({
      email: user.email,
    });

    const expectedStatusCode = 200;

    expect(response.status).toBe(expectedStatusCode);
    expect(response.body.message).toBe("Check your inbox");

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 404 with user not found", async () => {
    const response = await request(makeApp()).post("/api/sign-in").send({
      email: "example@example.com",
    });

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.content).toBe("User not found");
    expect(response.body.error).toBe("Not Found");
  });

  it("Should return 400 email required", async () => {
    const response = await request(makeApp()).post("/api/sign-in");

    expect(response.status).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["email"],
        }),
      ])
    );
    expect(response.body.error).toBe("Bad Request");
  });
});

describe("POST /sign-up", () => {
  it("Should return 200 with message Check your inbox", async () => {
    const userPayload = makeUser();
    const response = await request(makeApp())
      .post("/api/sign-up")
      .send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Check your inbox");

    await db.user.delete({
      where: {
        email: userPayload.email,
      },
    });
  });

  it("Should return 400 with email already exists", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const response = await request(makeApp())
      .post("/api/sign-up")
      .send(userPayload);

    expect(response.status).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Email address already exists",
          path: ["email"],
        }),
      ])
    );
    expect(response.body.error).toBe("Bad Request");

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 400 with email required", async () => {
    const response = await request(makeApp()).post("/api/sign-up");

    expect(response.status).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["email"],
        }),
      ])
    );
    expect(response.body.error).toBe("Bad Request");
  });
});

describe("POST /sign-out", () => {
  it("Should return 204", async () => {
    const userPayload = makeUser();
    const user = await db.user.create({
      data: userPayload,
    });

    const refreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH);

    await db.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        ip: "243",
      },
    });

    const response = await request(makeApp())
      .post("/api/sign-out")
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(204);

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 401 when token is missing", async () => {
    const response = await request(makeApp()).post("/api/sign-out");
    expect(response.status).toBe(401);
  });
});

describe("POST /auth", () => {
  it("Should return 200 with tokens and user info", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const token = jwt.sign({ id: user.id }, config.SECRET_AUTH_EMAIL);

    const response = await request(makeApp()).post(`/api/auth/${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      email: user.email,
    });

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 404 when user is not found", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const token = jwt.sign({ id: user.id }, config.SECRET_AUTH_EMAIL);

    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    const response = await request(makeApp()).post(`/api/auth/${token}`);

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.error).toBe("Not Found");
    expect(response.body.content).toBe("User not found");
  });

  it("Should return 401 when token does not exists", async () => {
    const response = await request(makeApp()).post(`/api/auth/354654654`);
    expect(response.status).toBe(401);
  });
});

describe("POST /refresh", () => {
  it("Should return 200 with new tokens", async () => {
    const userPayload = makeUser();

    const user = await db.user.create({
      data: userPayload,
    });

    const refreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH);

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        ip: "100",
        userId: user.id,
      },
    });

    const response = await request(makeApp())
      .post("/api/refresh")
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(204);
    expect(response.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken")])
    );

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });

  it("Should return 401 when token is not provided", async () => {
    const response = await request(makeApp()).post("/api/refresh");
    expect(response.status).toBe(401);
  });

  it("Should return 404 when user does not exists", async () => {
    const refreshToken = jwt.sign({ id: Math.random() }, config.SECRET_REFRESH);
    const response = await request(makeApp())
      .post("/api/refresh")
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.content).toBe("User not found");
    expect(response.body.error).toBe("Not Found");
  });
});

describe("GET /me", () => {
  it("Should return user info", async () => {
    const user = await db.user.create({
      data: makeUser(),
    });

    const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);
    const response = await request(makeApp())
      .get("/api/me")
      .set("Cookie", `accessToken=${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.id);

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  });
});

describe("PATCH /me", () => {
  it("Should return 204 and firstName should be changed", async () => {
    const user = await db.user.create({
      data: makeUser(),
    });

    const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);
    const response = await request(makeApp())
      .patch("/api/me")
      .set("Cookie", `accessToken=${accessToken}`)
      .send({
        firstName: "camado",
      });

    expect(response.status).toBe(204);
    expect(await db.user.findUnique({ where: { id: user.id } })).toMatchObject({
      firstName: "camado",
    });
  });
});

describe("DELETE /me", () => {
  it("Should return 204", async () => {
    const user = await db.user.create({
      data: makeUser(),
    });

    const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);

    const response = await request(makeApp())
      .delete("/api/me")
      .set("Cookie", `accessToken=${accessToken}`);

    expect(response.status).toBe(204);
    expect(await db.user.findUnique({ where: { id: user.id } })).toBe(null);
  });
});
