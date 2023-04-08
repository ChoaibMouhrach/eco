import expect from "expect";
import tokens from "../../../setup";
import { store } from "./endpoints";

describe("POST /categories", () => {
  const name = String(String(Math.random()));

  it("Should return 201 when the crdentials are valid", async () => {
    const response = await store(tokens.accessToken, { name });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(name);
  });

  it("Should return 400 with Category already exist", async () => {
    const response = await store(tokens.accessToken, {
      name,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exist");
  });

  it("Should return 400 with path name and message required", async () => {
    const response = await store(tokens.accessToken, {});

    expect(response.status).toBe(400);
    expect(response.body.errors[0].path[0]).toBe("name");
    expect(response.body.errors[0].message).toBe("Required");
  });
});
