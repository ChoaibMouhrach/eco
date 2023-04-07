import { Response } from "supertest"
import { login } from "./endpoints"

describe("/login", () => {

  describe("With correct credentials", () => {

    it("should return 200 status code, cookie tokens and user info", async () => {

      const response: Response = await login({
        email: "jhon@gmail.com",
        password: "password"
      });

      expect(response.status).toBe(200);
      expect(response.headers["set-cookie"].join(",")).toContain("refreshToken")
      expect(response.headers["set-cookie"].join(",")).toContain("accessToken")
      expect(response.body).toMatchObject({
        firstName: "jhon",
        lastName: "doe",
        email: "jhon@gmail.com",
      })
    })

  })

  describe("With invalid credentials", () => {

    it("should return 400, with messsage : 'Email Address or Password is incorrect' when email is not found ", async () => {

      const response = await login({
        email: "jhon1@gmail.com",
        password: "password"
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        message: "Email Address or Password is not correct"
      })

    })

    it("should return 400, with messsage : 'Email Address or Password is incorrect' when password is not correct ", async () => {

      const response = await login({
        email: "jhon@gmail.com",
        password: "password2"
      });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        message: "Email Address or Password is not correct"
      })

    })

  })

})

