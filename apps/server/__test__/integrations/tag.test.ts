import db from "@src/config/db";
import Tag from "../config/Tag";
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

describe("GET /tags", () => {
  it("Should return 200 with paginated data", async () => {
    const response = await request()
      .get("/api/tags")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.count).toBeDefined();
    expect(response.body.limit).toBeDefined();
    expect(response.body.page).toBeDefined();
  });

  it("Should return 200 with v in the name", async () => {
    const tag1 = new Tag();
    const tag2 = new Tag();

    await tag1.createDB();
    await tag2.createDB();

    const response = await request()
      .get("/api/tags?search=v")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);

    expect(
      response.body.data.filter(
        (data: any) => !data.name.toLowerCase().includes("v")
      ).length
    ).toBe(0);

    await tag1.destroy();
    await tag2.destroy();
  });
});

describe("GET /tags/:id", () => {
  it("Should return 200 with tag info", async () => {
    const tag = new Tag();

    await tag.createDB();

    const response = await request()
      .get(`/api/tags/${tag.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(tag.instance!.id);

    await tag.destroy();
  });

  it("Should return 400 with tag not found", async () => {
    const response = await request()
      .get(`/api/tags/10000000000`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Tag not found",
        }),
      ])
    );
  });
});

describe("POST /tags", () => {
  it("Should return 201 with created tag", async () => {
    const tag = new Tag();

    const response = await request()
      .post("/api/tags")
      .set("Cookie", `accessToken=${admin.tokens.access.token}`)
      .send(tag.data);

    expect(response.status).toBe(201);

    await db.tag.delete({
      where: {
        id: response.body.id,
      },
    });
  });

  it("Should return 400 with name required", async () => {
    const response = await request()
      .post("/api/tags")
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
    const tag = new Tag();

    await tag.createDB();

    const response = await request()
      .post("/api/tags")
      .send(tag.data)
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

    await tag.destroy();
  });
});

describe("PATCH /tags/:id", () => {
  it("Should return 204", async () => {
    const tag = new Tag();
    await tag.createDB();

    const name: string = `Vod${Math.random()}`;

    const response = await request()
      .patch(`/api/tags/${tag.instance!.id}`)
      .send({
        name,
      })
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect((await tag.checkDB())!.name).toBe(name);

    await tag.destroy();
  });

  it("Should return 400 with tag not found", async () => {
    const response = await request()
      .patch(`/api/tags/999999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Tag not found",
        }),
      ])
    );
  });

  it("Should return 400 with change someting first", async () => {
    const tag = new Tag();
    await tag.createDB();

    const response = await request()
      .patch(`/api/tags/${tag.instance!.id}`)
      .send({
        name: tag.data.name,
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

    await tag.destroy();
  });

  it("Should return 400 with name already exists", async () => {
    const tag = new Tag();
    await tag.createDB();

    const response = await request()
      .patch(`/api/tags/${tag.instance!.id}`)
      .send({
        name: tag.data.name,
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

    await tag.destroy();
  });
});

describe("DELETE /tags/:id", () => {
  it("Should return 200", async () => {
    const tag = new Tag();
    await tag.createDB();

    const response = await request()
      .delete(`/api/tags/${tag.instance!.id}`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(204);

    expect(await tag.checkDB()).toBeFalsy();
  });

  it("Should return 400 with tag not found", async () => {
    const response = await request()
      .delete(`/api/tags/99999`)
      .set("Cookie", `accessToken=${admin.tokens.access.token}`);

    expect(response.status).toBe(400);
    expect(response.body.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["xId"],
          message: "Tag not found",
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
      .post("/api/tags")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    response = await request()
      .patch("/api/tags/56654")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    response = await request()
      .delete("/api/tags/2435")
      .set("Cookie", `accessToken=${user.tokens.access.token}`);

    expect(response.status).toBe(401);

    await user.destroy();
  });
});
