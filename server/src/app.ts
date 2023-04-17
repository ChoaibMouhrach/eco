import express, { Express } from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import logger from "./middlewares/logger";
import categoryRouter from "./routes/category.route";
import connectDB from "./config/database";
import { config } from "./config/config";

dotenvConfig();

/**
 * this function returns and instance of express
 * */
export const app = async (): Promise<Express> => {
  /* Database connection */
  connectDB();

  /* express instance */
  const app = express();

  if (config.ENV !== "testing") app.use(express.static(config.PUBLIC_STORAGE));

  /* middlewares */
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3001",
    })
  );
  app.use(cookieParser());
  if (config.ENV !== "testing") app.use(logger);

  /* routes */
  app.use("/", authRouter);
  app.use("/categories", categoryRouter);

  return app;
};
