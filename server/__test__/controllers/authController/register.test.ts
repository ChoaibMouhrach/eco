import { register } from "./endpoints";

describe("/register", () => {

  //describe("with correct data", () => {

  //  it("should return 200 with tokens in a cookie + user info", async () => {

  //    const response = await register({
  //      firstName: "jhon.j",
  //      lastName: "doe.j",
  //      email: "jhon.j@gmail.com",
  //      password: "password",
  //      password_confirmation: "password"
  //    });

  //    expect(response.status).toBe(200);

  //    expect(response.headers["set-cookie"].join(",")).toContain("refreshToken");
  //    expect(response.headers["set-cookie"].join(",")).toContain("accessToken");

  //    expect(response.body).toMatchObject({
  //      firstName: "jhon",
  //      lastName: "doe",
  //      email: "jhon.j@gmail.com",
  //    })

  //  })

  //})

  describe("with incorrect data", () => {

    it("should return 400 with message Email Address is already taken", async () => {

      const response = await register({
        firstName: "jhon.j",
        lastName: "doe.j",
        email: "jhon.j@gmail.com",
        password: "password",
        password_confirmation: "password"
      })

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        message: "Email Address is already taken"
      })

    })

  })

})

