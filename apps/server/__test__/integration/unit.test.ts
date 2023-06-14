import { User } from "@prisma/client";
import config from "@src/config/config";
import db from "@src/config/db";
import { ROLES } from "@src/constants";
import jwt from "jsonwebtoken";
import { makeUnit, makeUser } from "../config/test-data";
import request from "../config/request";

let user: User;
let userAccessToken: string;

let admin: User;
let adminAccessToken: string;

beforeAll(async () => {
  user = await db.user.create({
    data: makeUser(),
  });

  admin = await db.user.create({
    data: makeUser(ROLES.ADMIN),
  });

  userAccessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);
  adminAccessToken = jwt.sign({ id: admin.id }, config.SECRET_ACCESS);
});

afterAll(async () => {
  await db.user.deleteMany({
    where: {
      OR: [{ id: user.id }, { id: admin.id }],
    },
  });
});

describe("GET /units", () => {
  it("Should return 200 with paginated body", async () => {
    const response = await request().get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return units", async () => {
    const response = await request().get("/api/units");
    expect(response.status).toBe(200);
  });

  it("Should return units with v in in the unit name", async () => {
    const response = await request().get("/api/units?search=v");
    expect(response.status).toBe(200);
    expect(
      response.body.data.every((item: { name: string }) =>
        item.name.includes("v")
      )
    ).toBe(true);
  });
});

describe("POST /units", () => {
  const storeunit = () =>
    request()
      .post("/api/units")
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 201 with the unit", async () => {
    const unit = makeUnit();
    const response = await storeunit().send(unit);

    expect(response.status).toBe(201);
    expect(
      await db.unit.findUnique({
        where: {
          name: unit.name,
        },
      })
    ).toBeTruthy();

    await db.unit.delete({
      where: {
        name: unit.name,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const response = await storeunit();
    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["name"],
        }),
      ])
    );
  });

  it("Should return 400 with unit already exists", async () => {
    // generates a random { name : random }
    const unit = makeUnit();

    // store unit
    await db.unit.create({
      data: {
        name: unit.name,
      },
    });

    // send http store request
    const response = await storeunit().send(unit);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["name"],
          message: "Unit already exists",
        }),
      ])
    );

    await db.unit.delete({
      where: {
        name: unit.name,
      },
    });
  });
});

describe("UPDATE /units/:id", () => {
  const updateunit = (id: number) =>
    request()
      .patch(`/api/units/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const unitPayload = makeUnit();

    const unit = await db.unit.create({
      data: unitPayload,
    });

    const newName = `cam${Math.random()}`;

    const response = await updateunit(unit.id).send({
      name: newName,
    });

    expect(response.status).toBe(204);

    expect(
      (
        await db.unit.findUnique({
          where: {
            id: unit.id,
          },
        })
      )?.name
    ).toBe(newName);

    await db.unit.delete({
      where: {
        id: unit.id,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const unitPaylaod = makeUnit();

    const unit = await db.unit.create({
      data: unitPaylaod,
    });

    const response = await updateunit(unit.id);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          path: ["name"],
        }),
      ])
    );

    await db.unit.delete({
      where: {
        id: unit.id,
      },
    });
  });

  it("Should return 401 with unit already exists", async () => {
    const unitPayload = makeUnit();

    const unit = await db.unit.create({
      data: unitPayload,
    });

    const response = await updateunit(unit.id).send({
      name: unit.name,
    });

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Unit already exists",
          path: ["name"],
        }),
      ])
    );

    await db.unit.delete({
      where: {
        id: unit.id,
      },
    });
  });
});

describe("DELETE /units/:id", () => {
  const deleteunit = (id: number) =>
    request()
      .delete(`/api/units/${id}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);

  it("Should return 204", async () => {
    const unitPayload = makeUnit();
    const unit = await db.unit.create({
      data: unitPayload,
    });

    const response = await deleteunit(unit.id);

    expect(response.status).toBe(204);
  });

  it("Should return 400 with unit not found", async () => {
    const response = await deleteunit(Math.random());

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Invalid",
          path: ["xId"],
        }),
      ])
    );
  });
});

describe("AUTHORIZATION", () => {
  it("Should return 401 when user is not admin", async () => {
    let response = await request()
      .post("/api/units")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/units/xxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/units/xxx")
      .set("Cookie", `accessToken=${userAccessToken}`);
    expect(response.status).toBe(401);
  });
});
