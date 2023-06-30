import { dirname, join } from "path";
import { z } from "zod";
import { config as dotenv } from "dotenv";

dotenv();

const schema = z.object({
  // APP
  APP_NAME: z.string().min(1),
  APP_PORT: z
    .string()
    .min(1)
    .transform((value) => Number(value)),

  // CLIENT
  APP_CLIENT_URL: z.string().min(1),

  // SECRETS
  SECRET_ACCESS: z.string().min(1),
  SECRET_REFRESH: z.string().min(1),
  SECRET_AUTH_EMAIL: z.string().min(1),

  // DURATIONS
  DURATION_ACCESS: z.string().min(1),
  DURATION_REFRESH: z.string().min(1),
  DURATION_AUTH_EMAIL: z.string().min(1),

  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z
    .string()
    .min(1)
    .transform((v) => Number(v)),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),

  // INTERNALS
  ROOT_DIR: z.string().min(1),
});

const env = {
  ...process.env,
  ROOT_DIR: join(dirname(__dirname), "../"),
};

const validation = schema.safeParse(env);

if (!validation.success) {
  throw Error(JSON.stringify(validation.error.issues));
}

const config = validation.data;

export default config;
