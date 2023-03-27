import express, { Express } from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config/config";
import authRoutes from "./routes/authRoutes";
import logger from "./middlewares/logger";

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
  app.use(logger)

  /* routes */
  app.use("/", authRoutes)

  return app
}

