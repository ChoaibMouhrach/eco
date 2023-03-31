import express, { Express } from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config/config";
import authRouter from "./routes/authRouter";
import logger from "./middlewares/logger";
import categoryRouter from "./routes/categoryRouter";

dotenvConfig();

/**
* this function returns and instance of express
* */
export const app = async (): Promise<Express> => {

  /* CONFIG FILES */
  await config()

  /* express instance */
  const app = express();

  /* middlewares */
  app.use(express.json())
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));
  app.use(cookieParser())
  if (process.env.ENV !== "testing") app.use(logger)

  /* routes */
  app.use("/", authRouter)
  app.use("/categories", categoryRouter)

  return app
}

