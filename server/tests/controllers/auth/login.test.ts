import { login } from "./endpoints";

describe("POST /login", () => {
  it("Should return 200 status , user and tokens", async () => {
    const response = await login({
      email: "john@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
  });

  it("Should return 400 status with email is required", async () => {
    const response = await login({
      password: "password",
    });

    expect(response.status).toBe(400);

    const issue = response.body.errors[0];

    expect(issue.path[0]).toBe("email");
    expect(issue.message).toBe("Required");
  });

  it("Should return 400 with Email Address or Password is not correct", async () => {
    const response = await login({
      email: Math.random() + "@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email Address or Password is not correct");
  });

  it("Should return 400 with Email Address or Password is not correct when password is not correct", async () => {
    const response = await login({
      email: "john@gmail.com",
      password: "password1",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email Address or Password is not correct");
  });
});
