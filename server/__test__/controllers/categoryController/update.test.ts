import { index, update } from "./endpoints"


describe('PATCH /categories/:id', () => {

  describe("With existing category and non existing name", () => {
    it("Should return 204", async () => {

      let response = await index({});

      const categories = response.body.data;

      if (categories.length) {

        let response = await update(categories[0]._id, String(Math.random()));

        expect(response.status).toBe(204)

      }

    })
  })

  describe("With invalid id", () => {

    it("Should return 400", async () => {

      let response = await update("100", "name");

      expect(response.status).toBe(400)

    })

  })

})
