import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./routes";
import { errorHandler } from "./middlewares";
import config from "./config/config";

const makeApp = (env: "prod" | "dev" | "test" = "dev") => {
  const app = express();

  // cors config
  app.use(
    cors({
      credentials: true,
      origin: [config.APP_CLIENT_URL],
    })
  );

  app.use(helmet());
  if (env !== "test") app.use(morgan("combined"));
  app.use(express.json());
  app.use(cookieParser());

  // routes
  //  app.use("/storage", express.static(ROOT_DIR));
  app.use("/api", router);

  // error handler
  app.use(errorHandler);

  return app;
};

export default makeApp;
