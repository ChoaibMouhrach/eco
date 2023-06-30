import db from "@src/config/db";
import Unit from "../config/Unit";
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

describe("GET /units", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/units")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with v in the name", async () => {
    const unit1 = new Unit();
    const unit2 = new Unit();

    await unit1.createDB();
    await unit2.createDB();

    const response = await request()
      .get("/api/units?search=v")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);

    expect(
      response.body.data.filter(
        (data: any) => !data.name.toLowerCase().includes("v")
      ).length
    ).toBe(0);

    await unit1.destroy();
    await unit2.destroy();
  });
});

describe("GET /units/:id", () => {
  it("SHould return 200 with unit info", async () => {
    const unit = new Unit();

    await unit.createDB();

    const response = await request()
      .get(`/api/units/${unit.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(unit.instance!.id);

    await unit.destroy();
  });

  it("Should return 400 with unit not found", async () => {
    const response = await request()
      .get(`/api/units/10000000000`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Unit not found",
        }),
      ])
    );
  });
});

describe("POST /units", () => {
  it("Should return 201 with created unit", async () => {
    const unit = new Unit();

    const response = await request()
      .post("/api/units")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .send(unit.data);

    expect(response.status).toBe(201);

    await db.unit.delete({
      where: {
        id: response.body.id,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const response = await request()
      .post("/api/units")
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
    const unit = new Unit();

    await unit.createDB();

    const response = await request()
      .post("/api/units")
      .send(unit.data)
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

    await unit.destroy();
  });
});

describe("PATCH /units/:id", () => {
  it("Should return 204", async () => {
    const unit = new Unit();
    await unit.createDB();

    const name: string = `Vod${Math.random()}`;

    const response = await request()
      .patch(`/api/units/${unit.instance!.id}`)
      .send({
        name,
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect((await unit.checkDB())!.name).toBe(name);

    await unit.destroy();
  });

  it("Should return 400 with unit not found", async () => {
    const response = await request()
      .patch(`/api/units/999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Unit not found",
        }),
      ])
    );
  });

  it("Should return 400 with name already exists", async () => {
    const unit = new Unit();
    await unit.createDB();

    const response = await request()
      .patch(`/api/units/${unit.instance!.id}`)
      .send({
        name: unit.data.name,
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

    await unit.destroy();
  });
});

describe("DELETE /units/:id", () => {
  it("Should return 200", async () => {
    const unit = new Unit();
    await unit.createDB();

    const response = await request()
      .delete(`/api/units/${unit.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect(await unit.checkDB()).toBeFalsy();
  });

  it("Should return 400 with unit not found", async () => {
    const response = await request()
      .delete(`/api/units/99999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Unit not found",
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
      .post("/api/units")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .patch("/api/units/56654")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    response = await request()
      .delete("/api/units/2435")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(403);

    await user.destroy();
  });
});
