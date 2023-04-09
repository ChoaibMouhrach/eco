import { dirname, join } from "path";
import z from "zod";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const envSchema = z.object({
  /* ENVIRONMENT */
  ENV: z.enum(["development", "testing", "production"]),

  /* SERVER PORT */
  PORT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),

  /* DATABASE HOST */
  DATABASE_HOST: z.string().min(1),

  /* DATABASE CONNECTION PORT */
  DATABASE_PORT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),

  /* DATABASE CONNECTION NAME */
  DATABASE_NAME: z.string().min(1),

  /* REFRESH TOKEN SECRET */
  REFRESH_SECRET: z.string().min(1),

  /* ACCESS TOKEN SECRET */
  ACCESS_SECRET: z.string().min(1),

  /* PASSWORD HASHING SALT */
  SALT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),

  /* THE DURATION AN ACCESS TOKEN WILL LAST */
  ACCESS_TOKEN_DURATION: z.string().min(1),

  /* TESTING DATABASE NAME */
  TESTING_DATABASE: z.string().min(1),
});

const validation = envSchema.safeParse(process.env);

if (!validation.success) {
  let firstIssue = validation.error.issues[0];
  throw Error(`${firstIssue.path[0]} ${firstIssue.message}`);
}

const ROOT_DIR = dirname(__dirname);
const STORAGE = join(ROOT_DIR, "storage");

const internalVariables = {
  ROOT_DIR,
  STORAGE,
  PUBLIC_STORAGE: join(STORAGE, "public"),
  PRIVATE_STORAGE: join(STORAGE, "private")
}

export const config = { ...validation.data, ...internalVariables };
