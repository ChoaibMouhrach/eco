import { login, verify } from "./endpoints";

describe("GET /verify", () => {
  it("Should return 200 with user", async () => {
    const credentials = {
      email: "john@gmail.com",
      password: "password",
    };

    const loginResponse = await login(credentials);

    const cookies = loginResponse.headers["set-cookie"] as string[];
    let token = "";

    for (let cookie of cookies) {
      if (cookie.includes("accessToken=")) {
        token = cookie.replace("accessToken=", "");
        break;
      }
    }

    const response = await verify(token);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(credentials.email);
  });

  it("Should return 401 unauthorized when the token is not valid", async () => {
    const response = await verify("e;mfzf");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("unauthorized");
  });
});
