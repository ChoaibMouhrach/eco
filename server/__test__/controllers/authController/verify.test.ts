import { login, verify } from "./endpoints";

describe("/verify", () => {

  describe("with propper token", () => {

    it("should return 200 with user info", async () => {
      const loginResponse = await login({
        email: "jhon@gmail.com",
        password: "password",
      })

      const token = loginResponse.headers["set-cookie"][1] as string;

      const response = await verify(token.replace("accessToken=", ""));

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        firstName: "jhon",
        lastName: "doe",
        email: "jhon@gmail.com",
      })

    })

  })

  describe("without propper token", () => {

    it("should return 401 with user info", async () => {

      const response = await verify("ekzjdlzekjf546465465efzlfkzje");

      expect(response.status).toBe(401)
      expect(response.body).toMatchObject({
        "message": "unauthenticated"
      })

    })

  })

  describe("with expired token", () => {

    it("should return 401 with user info", async () => {

      const response = await verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkMmJlMmNmYjcxNGNmNzhhMDJmNGUiLCJpYXQiOjE2Nzk4MjUwNzUsImV4cCI6MTY3OTgyNTA5MH0.EpbxMVOtNUnCS63IPEmbujOMnp52qmq4DT9NZuv_xWs");

      expect(response.status).toBe(401)
      expect(response.body).toMatchObject({
        "message": "token expired"
      })

    })

  })

})


