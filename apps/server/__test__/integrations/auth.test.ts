import User from "../config/User";
import request from "../config/request";

jest.mock("../../src/lib/mailer.lib", () => ({
  sendMail: jest.fn().mockResolvedValue({}),
}));

describe("POST /sign-in", () => {
  it("Should return 200 with message 'Check your Iibox'", async () => {
    const user = new User();

    await user.createDB();

    const response = await request().post("/api/sign-in").send({
      email: user.data.email,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Check your inbox");

    await user.destroy();
  });

  it("Should return 400 with email required", async () => {
    const response = await request().post("/api/sign-in");

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["email"],
        }),
      ])
    );
  });

  it("Should return 400 with Email address does not exists", async () => {
    const user = new User();

    const response = await request().post("/api/sign-in").send({
      email: user.data.email,
    });

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Email address does not exists",
        }),
      ])
    );
  });
});

describe("POST /sign-up", () => {
  it("Should return 201 with check your inbox", async () => {
    const user = new User();
    const response = await request().post("/api/sign-up").send(user.data);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Check your inbox");

    await user.destroy();
  });

  it("Should return 400 with fields are required", async () => {
    const response = await request().post("/api/sign-up");

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["firstName"],
          message: "Required",
        }),
        expect.objectContaining({
          path: ["lastName"],
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

  it("Should return 400 email already taken", async () => {
    const user = new User();

    await user.createDB();

    const response = await request().post("/api/sign-up").send(user.data);
    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["email"],
          message: "Email Address is taken",
        }),
      ])
    );

    await user.destroy();
  });
});

describe("POST /auth/:token", () => {
  it("Should return 200 with new tokens", async () => {
    const user = new User();

    await user.createDB();

    const response = await request().post(
      `/api/auth/${user.tokens.email.token}`
    );
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.instance!.id);
    expect(response.body.email).toBe(user.instance!.email);
    expect(response.headers["set-cookie"]).toBeDefined();

    await user.destroy();
  });

  it("Should return 400 with token expired", async () => {
    const user = new User({ durations: { emailToken: "0s" } });

    await user.createDB();

    const response = await request().post(
      `/api/auth/${user.tokens.email.token}`
    );

    expect(response.status).toBe(401);

    expect(response.body.content.message).toBe("jwt expired");

    await user.destroy();
  });
});

describe("POST /sign-out", () => {
  it("Should return 204", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .post("/api/sign-out")
      .set("Cookie", `refreshToken=${user.tokens.refresh.token}`);

    expect(response.status).toBe(204);

    await user.destroy();
  });
});

describe("POST /refresh", () => {
  it("Should return 200 with new tokens", async () => {
    const user = new User();
    await user.createDB();

    const response = await request()
      .post("/api/refresh")
      .set("Cookie", `refreshToken=${user.tokens.refresh.token}`);

    expect(response.status).toBe(204);
    expect(response.headers["set-cookie"]).toBeDefined();

    await user.destroy();
  });

  it("Should return 401 with jwt expired", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .post("/api/refresh")
      .set("Cookie", `refreshToken${user.tokens.refresh.token}`);

    expect(response.status).toBe(401);

    await user.destroy();
  });
});

describe("GET /me", () => {
  it("Should return 200 with user", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .get("/api/me")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.instance!.id);

    await user.destroy();
  });
});

describe("PATCH /me", () => {
  it("Should return 204", async () => {
    const user = new User();

    await user.createDB();

    const payload = { firstName: `test ${Math.random()}` };

    const response = await request()
      .patch("/api/me")
      .set("Cookie", `accessToken=${user.tokens.access.token}`)
      .send(payload);

    expect(response.status).toBe(204);

    await user.destroy();
  });

  it("Should return 400 with change something first", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .patch("/api/me")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "At least one field is required",
        }),
      ])
    );

    await user.destroy();
  });
});

describe("DELETE /me", () => {
  it("Should return 204", async () => {
    const user = new User();

    await user.createDB();

    const response = await request()
      .delete("/api/me")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(204);
  });
});
