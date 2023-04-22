import { register } from "./endpoints";

describe("POST /register", () => {
  const user = {
    firstName: "John.J",
    lastName: "Doe",
    email: "john.j@gmail.com",
    password: "password",
    password_confirmation: "password",
  };

  it("Should return 201 with user and tokens", async () => {
    const response = await register(user);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(user.email);
    expect(response.headers["set-cookie"].length).toBe(2);
  });

  it("Should return 400 with path not found email", async () => {
    const user = {
      firstName: "John.j",
      lastName: "Doe",
      password: "password",
      password_confirmation: "password",
    };

    const response = await register(user);
    expect(response.status).toBe(400);
  });

  it("Should return 400 with Email Address is already taken", async () => {
    const response = await register(user);
    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe("Email Address is already taken");
  });
});
