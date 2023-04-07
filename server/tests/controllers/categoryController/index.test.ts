import { Category } from "../../../src/types/category";
import { index } from "./endpoints"

describe("GET /categories", () => {

  describe("Without params", () => {
    it("should return a list of categories", async () => {

      const response = await index({});
      expect(response.status).toBe(200);

      if (response.body.data.length) {
        expect(response.body.data[0]._id).toBeDefined()
        expect(response.body.data[0].name).toBeDefined()
      }

    })
  })

  describe("With sort", () => {
    it("Should return a list of sorted categories by name", async () => {
      const response = await index({ sort: "name" });
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0)

      if (response.body.data.length) {

        expect(response.body.data[0]._id).toBeDefined()
        expect(response.body.data[0].name).toBeDefined()
        const categories = response.body.data as Category[]
        const nonSortedResponse = await index({});

        expect(categories).toEqual(nonSortedResponse.body.data.sort((a: Category & { name: string | number }, b: Category & { name: string | number }) => {
          if (Number(a["name"]) && Number(b["name"])) {
            return Number(a["name"]) - Number(b["name"])
          }
          let ma = a["name"].toLowerCase();
          let mb = b["name"].toLowerCase();
          if (ma < mb) {
            return -1
          }
          return 1
        }))
      }
    })
  })

  describe("With fields", () => {
    it("Should return a list of categories with name and _id only", async () => {
      const response = await index({ fields: "name" });
      expect(response.status).toBe(200);
      if (response.body.data.length) {
        expect(response.body.data[0]._id).toBeDefined()
        expect(response.body.data[0].name).toBeDefined()
        expect(response.body.data[0].image).toBeUndefined()
      }
    })
  })

})
