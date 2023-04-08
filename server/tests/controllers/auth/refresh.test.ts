import { login, refresh } from "./endpoints";

describe("POST /refresh", () => {
  it("Should return 200 with tokens", async () => {
    const credentials = {
      email: "john@gmail.com",
      password: "password",
    };

    const loginResponse = await login(credentials);

    const cookies = loginResponse.headers["set-cookie"] as string[];
    let token = "";

    for (let cookie of cookies) {
      if (cookie.includes("refreshToken")) {
        token = cookie.replace("refreshToken=", "");
        break;
      }
    }

    const response = await refresh(token);

    expect(response.status).toBe(200);
    expect(response.body.refreshToken).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
  });

  it("Should return 401 with unauthorized", async () => {
    const response = await refresh("sflzkmfklzmlfk");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("unauthorized");
  });
});
