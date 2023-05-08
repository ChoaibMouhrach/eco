import { dirname, join } from "path";
import z from "zod";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const envSchema = z.object({
  /* ENVIRONMENT */
  ENV: z.enum(["development", "production"]),

  /* SERVER PORT */
  PORT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),

  /* App Name */
  NAME: z.string().min(1),

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

  /* FORGOT PASSWORD TOKEN SECRET */
  FORGOT_PASSWORD_SECRET: z.string().min(1),

  /* EMAIL CONFIRMATION TOKEN SECRET */
  CONFIRM_EMAIL_SECRET: z.string().min(1),

  /* PASSWORD HASHING SALT */
  SALT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),

  /* THE DURATION AN ACCESS TOKEN WILL LAST */
  ACCESS_TOKEN_DURATION: z.string().min(1),

  /* TESTING DATABASE NAME */
  TESTING_DATABASE: z.string().min(1),

  /* SMTP */
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z
    .string()
    .regex(/^[0-9]+$/gi)
    .min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  SMTP_FROM_NAME: z.string().min(1),
  SMTP_FROM_ADDRESS: z.string().min(1),

  /* CLIENT */
  CLIENT_PORT: z
    .string()
    .min(1)
    .regex(/^[0-9]+$/gi),
  CLIENT_HOST: z.string().min(1),
});

const validation = envSchema.safeParse(process.env);

if (!validation.success) {
  let firstIssue = validation.error.issues[0];
  throw Error(`${firstIssue.path[0]} ${firstIssue.message}`);
}

const ROOT_DIR = dirname(__dirname);
const STORAGE = join(ROOT_DIR, "storage");

const internalVariables = {
  /* The root directory of the project */
  ROOT_DIR,

  /* The Storage directory */
  STORAGE,

  /* The Public directory in the Storage */
  PUBLIC_STORAGE: join(STORAGE, "public"),

  /* The Private directory in the Storage */
  PRIVATE_STORAGE: join(STORAGE, "private"),

  /* Expiration time */
  FORGOT_PASSWORD_TOKEN_EXPIRATION_PERIODE: "15m",
  EMAIL_CONFIRMATION_TOKEN_EXPIRATION_PERIOD: "15m",

  /* In Minutes */
  EMAIL_CONFIRMATION_RATE_LIMIT: 60,
  FORGOT_PASSWORD_RATE_LIMIT: 60,
};

export const config = { ...validation.data, ...internalVariables };
