import { login, logout } from "./endpoints"

describe("/logout", () => {

  describe("with propper token", () => {

    it("should return 204", async () => {

      const loginResponse = await login({
        email: "jhon@gmail.com",
        password: "password"
      });

      const token = loginResponse.headers["set-cookie"][0].replace("refreshToken=", "")

      const response = await logout(token);

      expect(response.status).toBe(204);
      expect(response.headers["set-cookie"].join(",")).toContain("refreshToken");
      expect(response.headers["set-cookie"].join(",")).toContain("accessToken");

    })

  })

  describe("without propper token", () => {

    it("should return 204", async () => {

      const response = await logout("zjzhefjzhefhzekf54654z");

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        message: "unauthenticated"
      })

    })

  })

})

