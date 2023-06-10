import "express-async-errors";
import express from "express";
import { join } from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import config from "./config/config";
import router from "./routes";
import { errorHandler } from "./middlewares";

const makeApp = () => {
  const app = express();

  // configurations
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

  app.use(helmet());
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(cookieParser());

  // middlewares

  // routes
  app.use("/public", express.static(join(config.ROOT_DIR, "public")));
  app.use("/api", router);

  // error handler
  app.use(errorHandler);

  return app;
};

export default makeApp;
