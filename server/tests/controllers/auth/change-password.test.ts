import tokens from "../../../setup";
import { changePassword, register } from "./endpoints"

describe("POST /change-password", () => {

  it("Should return 204", async () => {

    const register_response = await register({
      firstName: String(Math.random()),
      lastName: String(Math.random()),
      email: String(Math.random()) + "@gmail.com",
      password: "password",
      password_confirmation: "password"
    })


    expect(register_response.status).toBe(201);
    const cookies = register_response.headers["set-cookie"] as string[];

    let accessToken = "";

    for (let cookie of cookies) {
      if (cookie.includes("accessToken")) {
        accessToken = cookie.split("=")[1]
      }
    }

    const response = await changePassword({ old_password: "password", password: "password5454", password_confirmation: "password5454" }, accessToken)

    expect(response.status).toBe(204)
  })

  it("Should return 400 with Password is not correct", async () => {
    const response = await changePassword({ old_password: "password4654", password: "password5454", password_confirmation: "password5454" }, tokens.accessToken)

    expect(response.status).toBe(400)
    expect(response.body.errors[0].message).toBe("Old Password is not correct")
  })

})
