import tokens from "../../../setup";
import { Category } from "../../types/category";
import { destroy, store } from "./endpoints";

describe("DELETE /categories/:id", () => {
  let category: Category;

  beforeAll(async () => {
    const response = await store(tokens.accessToken, {
      name: String(Math.random()),
    });
    category = response.body;
  });

  it("Should return 204", async () => {
    const response = await destroy(tokens.accessToken, category._id);
    expect(response.status).toBe(204);
  });

  it("Should return 400 with  The provided id is invalid", async () => {
    const response = await destroy(tokens.accessToken, "546564654");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("The provided id is invalid");
  });
});
