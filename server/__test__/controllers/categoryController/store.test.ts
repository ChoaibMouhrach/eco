import { store } from "./endpoints"

describe("POST /categories", () => {

  describe("With randomly generated name only", () => {

    it("Return 201 with category", async () => {

      const name = Math.random()

      const response = await store(String(name))

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(String(name))

    })

  })

  describe("With already existing name", () => {
    it("Should return 400 with message category already exists", async () => {

      const name = Math.random()

      let response = await store(String(name));

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(String(name))

      response = await store(String(name));

      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined()

    })
  })

})
