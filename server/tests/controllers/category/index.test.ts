import { Category } from "../../types/category";
import { Paginate } from "../../types/paginate";
import { index, store } from "./endpoints";
import tokens from "../../../setup";

describe("GET /categories", () => {
  const category = {
    name: String(Math.random()),
  };

  beforeAll(async () => {
    await store(tokens.accessToken, category);
  });

  it("Should get a list of categories", async () => {
    /* Get All categories */
    const response = await index({});

    /* Extract Categories */
    const body = response.body as Paginate<Category>;

    expect(response.status).toBe(200);

    /* Check that the pagination exists  */
    expect(body.data).toBeDefined();
    expect(body.limit).toBeDefined();
    expect(body.page).toBeDefined();
    expect(body.skip).toBeDefined();

    let newCategory: undefined | Category;

    for (let piece of body.data) {
      if (piece.name === category.name) {
        newCategory = piece;
      }
    }

    /* check that the category exists */
    expect(newCategory).toBeDefined();
  });

  it("Should return 200 with categories having only name and _id", async () => {
    const response = await index({ fields: "name" });

    expect(response.status).toBe(200);
    expect(response.body.data[0].createdAt).toBeUndefined();
    expect(response.body.data[0].name).toBeDefined();
  });

  it("Should return 200 with categories that have a v in the name", async () => {
    const response = await index({ search: "v" });

    const categories = response.body.data as Category[];

    let vInEachCategory = true;

    for (let category of categories) {
      if (!category.name.includes("v")) {
        vInEachCategory = false;
        break;
      }
    }

    expect(vInEachCategory).toBe(true);
  });

  it("Should return 200 with categories sorted by name", async () => {
    const response = await index({ sort: "name" });

    const categories = response.body.data as Category[];

    expect(response.status).toBe(200);
    expect(categories).toEqual(
      categories.sort((a, b) => {
        if (a > b) {
          return 1;
        }

        return -1;
      })
    );
  });

  it("Should return 200 with categories sorted by name", async () => {
    const response = await index({ sort: "name" });

    const categories = response.body.data as Category[];

    expect(response.status).toBe(200);
    expect(categories).toEqual(
      categories.sort((a, b) => {
        if (a > b) {
          return 1;
        }

        return -1;
      })
    );
  });
});
