import { connect } from "mongoose";
import { config } from "./config";

export default async function connectDB() {
  const dbName = config.ENV === "testing" ? config.TESTING_DATABASE : config.DATABASE_NAME;

  await connect(`${config.DATABASE_HOST}:${config.DATABASE_PORT}`, { dbName });

  if (config.ENV !== "testing") {
    console.log(`The Database is connected on port ${config.DATABASE_PORT}`);
  }
}
