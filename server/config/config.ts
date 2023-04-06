import { dirname } from "path";
import z from "zod";
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

const envSchema = z.object({
  ENV: z.enum(["development", "testing", "production"]),
  PORT: z.string().min(1).regex(/^[0-9]+$/ig),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().min(1).regex(/^[0-9]+$/ig),
  DATABASE_NAME: z.string().min(1),
  REFRESH_SECRET: z.string().min(1),
  ACCESS_SECRET: z.string().min(1),
  SALT: z.string().min(1).regex(/^[0-9]+$/ig),
  ACCESS_TOKEN_DURATION: z.string().min(1),
})

const validation = envSchema.safeParse(process.env);

if (!validation.success) {
  let firstIssue = validation.error.issues[0]
  throw Error(`${firstIssue.path[0]} ${firstIssue.message}`)
}

export const config = validation.data
export const ROOT_DIR = dirname(__dirname)
