import { login, verify } from "./endpoints";
import { config } from "dotenv"
import jwt from "jsonwebtoken";

config()

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

      if (!process.env.ACCESS_SECRET) {
        throw Error("Access Secret Required")
      }

      const token = jwt.sign({ _id: 1 }, process.env.ACCESS_SECRET, { expiresIn: "100ms" });

      await new Promise((res) => setTimeout(() => { res("") }, 105))

      const response = await verify(token);

      expect(response.status).toBe(401)
      expect(response.body).toMatchObject({
        "message": "token expired"
      })

    })

  })

})


