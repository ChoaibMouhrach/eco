import { Response } from "supertest";
import { forgot_password } from "./endpoints";

describe("POST /forgot-password", () => {
  it("Should return 204", async () => {
    const response = await forgot_password("john@gmail.com");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("If the email address exists within our database an email will be sent to it");
  });

  it("Should return 400 with message Required", async () => {
    const response = await forgot_password();
    expect(response.status).toBe(400);
    expect(response.body.errors[0].path[0]).toBe("email");
    expect(response.body.errors[0].message).toBe("Required");
  });

  it("Should return 200 with message 'If the email address exists within our database an email will be sent to it' if the email does not exists within the database", async () => {
    const response = await forgot_password(`${Math.random()}@gmail.com`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("If the email address exists within our database an email will be sent to it");
  });

  it("Should return 429 if the number", async () => {
    const requests: Promise<Response>[] = [];

    for (let i = 0; i < 6; i++) {
      requests.push(forgot_password("john@gmail.com"));
    }
    await Promise.all(requests);

    const response = await forgot_password("john@gmail.com");
    expect(response.status).toBe(429);
  });
});
