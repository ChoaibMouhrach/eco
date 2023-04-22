import { Response } from "supertest";
import tokens from "../../../setup";
import { register, send_confirmation_email } from "./endpoints";
import { parse } from "../../helpers/cookie"

describe("POST /send-confirmation-email", () => {
  it("Should return 204", async () => {

    const refreshResponse = await register({
      firstName: String(Math.random()),
      lastName: String(Math.random()),
      email: String(Math.random()) + "@gmail.com",
      password: "password",
      password_confirmation: "password"
    })

    const cookies = parse(refreshResponse.headers["set-cookie"] as string[])

    const response = await send_confirmation_email(cookies.accessToken);

    expect(response.status).toBe(204);
  });

  it("Should return 429", async () => {
    let requests: Promise<Response>[] = [];

    for (let i = 0; i < 6; i++) {
      requests.push(send_confirmation_email(tokens.accessToken));
    }

    await Promise.all(requests);

    const response = await send_confirmation_email(tokens.accessToken);

    expect(response.status).toBe(429);
  });
});
