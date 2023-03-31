import { destroy, index } from "./endpoints";


describe("DELETE /categories/:id", () => {

  describe("With valid id", () => {
    it("Should return 204", async () => {
      const response = await index({});
      if (response.body.data && response.body.data.length) {
        const deleteResponse = await destroy(response.body.data[0]._id);
        expect(deleteResponse.status).toBe(204)
      }
    })
  })

  describe("With invalid id", () => {
    it("Should return 400", async () => {
      const response = await destroy("1");
      expect(response.status).toBe(400)
    })
  })

})
