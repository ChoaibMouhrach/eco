import { Response } from "supertest";
import tokens from "../../../setup";
import { send_confirmation_email } from "./endpoints";

describe("POST /send-confirmation-email", () => {
  it("Should return 204", async () => {
    const response = await send_confirmation_email(tokens.accessToken);
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
