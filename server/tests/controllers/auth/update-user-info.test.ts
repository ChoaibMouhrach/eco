import { updateUserInfo } from "./endpoints";

describe("PATCH /me", () => {
  it("Should return 200 with the updated user", async () => {
    const info = {
      firstName: "Mark",
      lastName: "BArk",
      password: "password",
    };

    const response = await updateUserInfo(info);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(info.firstName);
    expect(response.body.lastName).toBe(info.lastName);
  });

  it("Should return 400 with password is not correct", async () => {
    const response = await updateUserInfo({ firstName: "camadi", password: "password1111" });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe("Password is not correct");
    expect(response.body.errors[0].path[0]).toBe("password");
  });
});
