import express from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import logger from "../middlewares/logger";
import config from "../config/config";
import authRoutes from "../routes/authRoutes";

dotenvConfig();

const port = process.env.PORT ?? 3000

const run = async () => {

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

  /* start the server */
  app.listen(port, () => console.log(`The server is running on port ${port}`))

}

run()

