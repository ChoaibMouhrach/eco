import { parse } from "../../helpers/cookie"
import { deleteAccount, register } from "./endpoints"

describe("DELETE /me", () => {
  it("Should return 204", async () => {

    const registerResponse = await register({
      firstName: String(Math.random()),
      lastName: String(Math.random()),
      email: `${Math.random()}@gmail.com`,
      password: "password",
      password_confirmation: "password"
    })

    let cookies = parse(registerResponse.headers["set-cookie"] as string[])
    expect(registerResponse.status).toBe(201)

    const response = await deleteAccount(cookies.accessToken)
    expect(response.status).toBe(204)

  })
})
