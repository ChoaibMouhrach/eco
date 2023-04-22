import tokens from "../../../setup";
import { Category } from "../../types/category";
import { store, update } from "./endpoints";

describe("PATCH /categories/:id", () => {
  let category: Category;

  beforeAll(async () => {
    const response = await store(tokens.accessToken, {
      name: String(Math.random()),
    });
    category = response.body;
  });

  it("Should return 204", async () => {
    const response = await update(tokens.accessToken, category._id, {
      name: `${Math.random()} ${Math.random()}`,
    });

    expect(response.status).toBe(204);
  });

  it("Should return 400 with The provided id is invalid", async () => {
    const response = await update(tokens.accessToken, "56545645", { name: "mdlm" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("The provided id is invalid");
  });

  it("Should return 400 with Nothing to update", async () => {
    let response = await update(tokens.accessToken, category._id, {});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nothing to update");
  });
});
