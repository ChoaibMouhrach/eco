import { login, refresh } from "./endpoints"

describe("/refresh", () => {

  describe("with propper token", () => {

    it("return 200 status + refresh and access tokens", async () => {

      const loginResponse = await login({
        email: "jhon@gmail.com",
        password: "password"
      });

      const token = loginResponse.headers["set-cookie"][0].replace("refreshToken=", "");

      const response = await refresh(token);

      expect(response.status).toBe(200);
      expect(Object.keys(response.body)).toContain("refreshToken")
      expect(Object.keys(response.body)).toContain("accessToken")

    })

  })

  describe("without propper token", () => {

    it("return 401 with message unauthenticated", async () => {

      const response = await refresh("elfkzflkzlmfjkzelfjkze");

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        message: "unauthenticated"
      })

    })

  })

})


