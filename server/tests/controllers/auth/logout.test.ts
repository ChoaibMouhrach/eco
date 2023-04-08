import { login, logout } from "./endpoints";

describe("POST /logout", () => {
  it("Should return 204", async () => {
    const loginResponse = await login({
      email: "john@gmail.com",
      password: "password",
    });

    const cookies = loginResponse.headers["set-cookie"] as string[];
    let token = "";

    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].includes("refreshToken")) {
        token = cookies[i].replace("refreshToken=", "");
        break;
      }
    }

    const response = await logout(token);

    expect(response.status).toBe(204);
  });

  it("Should return 401 with message unauthenticated when token is invalid", async () => {
    const response = await logout("25456");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("unauthorized");
  });
});
